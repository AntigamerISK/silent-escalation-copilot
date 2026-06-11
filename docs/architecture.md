# Architecture – Silent Escalation Copilot

## Overview

Silent Escalation Copilot is a Declarative Agent (DA) deployed inside Microsoft 365 Copilot Chat. It leverages the Microsoft 365 Graph-grounded context to surface hidden project risks and generate escalation-ready outputs — without requiring any external infrastructure.

---

## High-Level Architecture

```
+----------------------------------------------------------+
|              Microsoft 365 Tenant                        |
|                                                          |
|  +------------------+     +-------------------------+   |
|  |  User (PM/Lead)  | --> | M365 Copilot Chat (BYO) |   |
|  +------------------+     +----------+--------------+   |
|                                       |                  |
|                          +------------v-----------+      |
|                          | Silent Escalation Agent|      |
|                          | (Declarative Agent)    |      |
|                          +------------+-----------+      |
|                                       |                  |
|            +---------------------+---+                  |
|            |                     |                      |
|   +--------v------+   +----------v--------+             |
|   | Microsoft      |   | SharePoint /      |            |
|   | Teams Messages |   | Project Files     |            |
|   +---------------+   +-------------------+             |
|                                                          |
+----------------------------------------------------------+
```

---

## Component Breakdown

| Component | Role |
|---|---|
| Microsoft 365 Copilot Chat | Host interface for the agent |
| Declarative Agent (DA) | Custom agent with instructions + conversation starters |
| M365 Graph Context | Provides grounding in real tenant data (Teams, SharePoint) |
| Agent Instructions | System prompt defining behavior, tone, and output format |
| Conversation Starters | 4 pre-built prompts guiding the demo flow |

---

## Data Flow

1. User opens Silent Escalation Copilot in M365 Copilot Chat
2. User selects a conversation starter or types a custom prompt
3. The Declarative Agent processes the request using its system instructions
4. The agent grounds its response in available M365 context (Teams threads, SharePoint docs)
5. Structured output is returned: risk table, escalation checklist, executive summary, or draft escalation email
6. User reviews the output and decides whether to escalate — **no automated sending occurs**

---

## Security & Compliance

- All processing happens within the Microsoft 365 tenant boundary
- No external API calls or data exfiltration
- Agent cannot send emails or create tasks autonomously
- Outputs must be reviewed and approved by a human before any action
- No PII or confidential data is stored outside of M365
- Complies with tenant-level DLP and access control policies

---

## Deployment Model

| Method | Description |
|---|---|
| M365 Agent Builder | Primary deployment (no-code, instant) |
| M365 Agents Toolkit + VS Code | Developer deployment (declarative agent package) |
| Copilot Studio | Alternative low-code deployment path |

---

## Evaluation Criteria Mapping

| Criterion | Status | Implementation |
|---|---|---|
| M365 Copilot Chat Agent | Required | Declarative Agent deployed in Copilot Chat |
| External MCP Server | Optional | Not included in MVP (future enhancement) |
| OAuth for MCP | Optional | Not included in MVP (future enhancement) |
| Adaptive Cards | Optional | Not included in MVP (future enhancement) |
| Connected Agents | Optional | Not included in MVP (future enhancement) |

---

## Future Enhancements

1. **MCP Server Integration** (>0 pts) – Connect to external project management APIs (Jira, Azure DevOps)
2. **Adaptive Cards Output** – Rich interactive escalation cards in Teams
3. **Connected Agents** – Delegate summarization to a specialized sub-agent
4. **OAuth-secured MCP** – Authenticated real-time data retrieval from project tools
5. **Power Automate Integration** – Trigger approval workflows from escalation drafts

---

## Repository Structure

```
silent-escalation-copilot/
├── README.md
├── agent/
│   ├── declarativeAgent.json
│   ├── manifest.json
│   └── instructions.md
├── docs/
│   ├── architecture.md      <- this file
│   └── demo-script.md
└── .gitignore
```

---

*Built for the Microsoft Enterprise Agents Hackathon 2025 — Agents League Track*
