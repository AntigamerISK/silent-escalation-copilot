/**
 * Jira MCP Server - External Risk Detection
 * Connects Silent Escalation Copilot to Jira for cross-platform risk analysis
 * 
 * @author Silent Escalation Copilot Team
 * @version 2.0 Enterprise
 */

import { MCPServer } from '@microsoft/mcp-sdk';
import JiraClient from 'jira-connector';
import { ConfidentialClientApplication } from '@azure/msal-node';

interface JiraConfig {
  host: string;
  email: string;
  apiToken: string;
}

interface BlockedIssue {
  key: string;
  summary: string;
  assignee: string | null;
  updated: string;
  daysBlocked: number;
  priority: string;
  status: string;
}

// OAuth configuration for Azure AD authentication
const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET || ''
  }
};

const cca = new ConfidentialClientApplication(msalConfig);

// Initialize MCP Server
const server = new MCPServer({
  name: 'jira-risk-detector',
  version: '2.0.0',
  description: 'Detects project risks in Jira and Azure DevOps',
  capabilities: [
    'read_issues',
    'detect_blockers', 
    'cross_reference_teams',
    'oauth_secured'
  ]
});

/**
 * Authenticate user via Azure AD OAuth
 */
async function authenticateUser(userId: string): Promise<string> {
  try {
    const account = await cca.getAccountByHomeId(userId);
    
    const tokenRequest = {
      scopes: ['https://graph.microsoft.com/.default'],
      account: account || undefined
    };
    
    const response = await cca.acquireTokenSilent(tokenRequest);
    return response.accessToken;
  } catch (error) {
    console.error('OAuth authentication failed:', error);
    throw new Error('Failed to authenticate user');
  }
}

/**
 * Calculate days since last update
 */
function calculateDaysBlocked(updatedDate: string): number {
  const updated = new Date(updatedDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - updated.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Tool: Get blocked Jira issues
 * Detects issues stuck for >48 hours
 */
server.registerTool('get-blocked-issues', async (params: any) => {
  const config: JiraConfig = {
    host: params.jiraUrl || process.env.JIRA_HOST || '',
    email: params.email || process.env.JIRA_EMAIL || '',
    apiToken: params.apiToken || process.env.JIRA_API_TOKEN || ''
  };
  
  const jira = new JiraClient({
    host: config.host,
    basic_auth: {
      email: config.email,
      api_token: config.apiToken
    }
  });
  
  try {
    // Search for blocked issues not updated in 48+ hours
    const searchResult = await jira.search.search({
      jql: 'status = Blocked AND updated < -48h ORDER BY updated ASC',
      fields: ['summary', 'assignee', 'updated', 'priority', 'status']
    });
    
    const blockedIssues: BlockedIssue[] = searchResult.issues.map((issue: any) => ({
      key: issue.key,
      summary: issue.fields.summary,
      assignee: issue.fields.assignee?.displayName || 'Unassigned',
      updated: issue.fields.updated,
      daysBlocked: calculateDaysBlocked(issue.fields.updated),
      priority: issue.fields.priority?.name || 'Unknown',
      status: issue.fields.status?.name || 'Unknown'
    }));
    
    return {
      success: true,
      count: blockedIssues.length,
      issues: blockedIssues,
      summary: `Found ${blockedIssues.length} blocked issues requiring escalation`
    };
  } catch (error) {
    console.error('Failed to fetch Jira issues:', error);
    return {
      success: false,
      error: 'Failed to connect to Jira. Check credentials and permissions.'
    };
  }
});

/**
 * Tool: Cross-reference with Teams activity
 * Correlates Jira blockers with Teams silence
 */
server.registerTool('cross-reference-teams', async (params: any) => {
  const { userId, jiraIssues } = params;
  
  try {
    // Get M365 Graph token
    const graphToken = await authenticateUser(userId);
    
    // Fetch Teams activity (placeholder - would use Microsoft Graph API)
    const teamsActivity = await fetch('https://graph.microsoft.com/v1.0/me/chats', {
      headers: {
        'Authorization': `Bearer ${graphToken}`
      }
    });
    
    const data = await teamsActivity.json();
    
    // Cross-reference logic
    const silentOwners = jiraIssues.filter((issue: BlockedIssue) => {
      // Check if assignee has been silent in Teams
      const hasRecentTeamsActivity = data.value.some((chat: any) => 
        chat.lastMessagePreview?.from?.user?.displayName === issue.assignee
      );
      
      return !hasRecentTeamsActivity;
    });
    
    return {
      success: true,
      silentOwners,
      message: `${silentOwners.length} issue owners have been silent in Teams`
    };
  } catch (error) {
    console.error('Teams cross-reference failed:', error);
    return {
      success: false,
      error: 'Failed to cross-reference with Teams activity'
    };
  }
});

/**
 * Tool: Generate escalation report
 * Combines Jira + Teams data into actionable escalation
 */
server.registerTool('generate-escalation', async (params: any) => {
  const { blockedIssues, silentOwners } = params;
  
  const highPriorityBlocked = blockedIssues.filter(
    (issue: BlockedIssue) => issue.priority === 'High' || issue.priority === 'Highest'
  );
  
  const escalationReport = {
    timestamp: new Date().toISOString(),
    riskLevel: highPriorityBlocked.length > 0 ? 'HIGH' : 'MEDIUM',
    summary: {
      totalBlocked: blockedIssues.length,
      highPriority: highPriorityBlocked.length,
      silentOwners: silentOwners.length,
      avgDaysBlocked: blockedIssues.reduce((sum: number, i: BlockedIssue) => 
        sum + i.daysBlocked, 0) / blockedIssues.length
    },
    topRisks: highPriorityBlocked.slice(0, 5),
    recommendations: [
      `Escalate ${highPriorityBlocked.length} high-priority blocked issues`,
      `Contact ${silentOwners.length} silent team members`,
      `Review blockers older than ${Math.max(...blockedIssues.map((i: BlockedIssue) => i.daysBlocked))} days`
    ]
  };
  
  return escalationReport;
});

// Health check endpoint
server.registerTool('health-check', async () => {
  return {
    status: 'healthy',
    version: '2.0.0',
    uptime: process.uptime(),
    capabilities: server.capabilities
  };
});

// Start server
const PORT = process.env.MCP_PORT || 3000;

server.listen(PORT, () => {
  console.log(`\n✅ Jira MCP Server running on port ${PORT}`);
  console.log(`\n🔗 Capabilities:`);
  console.log(`   - OAuth-secured authentication`);
  console.log(`   - Jira blocker detection`);
  console.log(`   - Teams cross-reference`);
  console.log(`   - Automated escalation reports`);
  console.log(`\n⚡ Ready for Silent Escalation Copilot integration\n`);
});

export default server;
