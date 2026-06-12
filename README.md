# 🚨 Silent Escalation Copilot

> **Agents League Hackathon — Track: Enterprise Agents (Battle #3)**  
> Built with Microsoft 365 Copilot · Declarative Agent · M365 Agent Builder

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Track](https://img.shields.io/badge/track-Enterprise%20Agents-red)
![Platform](https://img.shields.io/badge/platform-Microsoft%20365%20Copilot-0078D4)
![Status](https://img.shields.io/badge/status-Live%20%E2%9C%85-brightgreen)
![MCP Server](https://img.shields.io/badge/MCP_Server-Jira%20%2B%20OAuth-FF6B35)  
![Version](https://img.shields.io/badge/version-2.0_Enterprise-blue)

---

## 🧩 The Problem

In enterprise environments, critical risks often go unescalated — not because they don’t exist, but because no one had time to surface them clearly. Projects fall behind, stakeholders grow frustrated, decisions remain unresolved, and by the time leadership hears about it, the damage is done.

**Silent risks kill projects. And nobody reports them in time.**

---

## 💡 The Solution

**Silent Escalation Copilot** is a declarative agent for Microsoft 365 Copilot that automatically detects hidden business risks across your organization's communications, documents, and tasks — and generates ready-to-send executive escalation drafts in seconds.

It reads signals from emails, Teams chats, meeting notes, SharePoint documents, and Planner tasks to identify patterns that indicate escalation-worthy risks: repeated blockers, delayed decisions, ambiguous ownership, and unhappy stakeholders.

---

## ✅ What It Does

| Capability | Description |
|---|---|
| 🔍 Risk Detection | Identifies hidden signals of unresolved issues across M365 |
| 📊 Risk Classification | Rates severity: CRITICAL / HIGH / MEDIUM / LOW |
| 🧠 Evidence Gathering | Surfaces specific signals from emails, chats, and docs |
| 📝 Executive Summary | Generates structured escalation summaries for leadership |
| 📧 Draft Generation | Creates ready-to-send Teams messages and email drafts |
| 🎯 Owner Suggestion | Recommends the right escalation owner based on context |

---

## ⚡ v2.0 Enterprise Features

### External Integration (MCP Server)
- ✅ **Jira Connector** — Detects blocked tickets >48h, cross-references with Teams activity
- ✅ **OAuth-Secured** — Azure AD authentication for enterprise compliance
- ✅ **Cross-Platform Risk Detection** — Combines Jira + M365 signals in single analysis
- 🟡 **Azure DevOps Integration** — Roadmap for PR/pipeline risk detection

### Production-Ready Code
- ✅ **TypeScript MCP Server** (234 lines) — `mcp-server/jira-connector.ts`
- ✅ **Full Dependencies** — `package.json` with all npm packages
- ✅ **Error Handling** — Health checks + graceful fallbacks
- ✅ **Environment Config** — `.env.example` template included

### Enterprise Roadmap
See [`IMPROVEMENT_PLAN.md`](IMPROVEMENT_PLAN.md) for:
- Power Automate approval workflows
- Power BI real-time dashboards
- Sentiment analysis + predictive ML
- Voice interface for Teams meetings
- ROI: 1,556% year 1 ($828k savings)

**Status:** See [`IMPLEMENTATION_STATUS.md`](IMPLEMENTATION_STATUS.md) for complete deployment status.


## 🏗️ Architecture

```
User (Microsoft 365 Copilot Chat)
        │
        ▼
┌──────────────────────────┐
│  Silent Escalation Copilot  │
│  (Declarative Agent)        │
│  agent/declarativeAgent.json│
└───────────┤─────────────┘
           │ reads context from
           ▼
┌──────────────────────────────────────┐
│       Microsoft 365 Workloads        │
│ 📧 Outlook  💬 Teams  📄 SharePoint  │
│ 📅 Calendar ✅ Planner 📓 OneNote    │
└──────────────────────────────────────┘
           │ produces
           ▼
┌─────────────────────────────────────┐
│         Structured Output           │
│ Risk Level · Evidence · Impact      │
│ Owner · Next Action · Draft Email   │
└─────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Agent Type | Declarative Agent (DA) |
| Platform | Microsoft 365 Copilot Chat |
| Development | M365 Agent Builder |
| Manifest | `agent/declarativeAgent.json` |
| Knowledge Sources | M365 Copilot grounding (email, Teams, SharePoint, Planner) |
| Security | Microsoft Entra ID (organizational auth) |
| License | MIT |

---

## 🚀 Quick Start

### Prerequisites
- Microsoft 365 account (Copilot Free or licensed)
- Access to [Microsoft 365 Copilot](https://m365.cloud.microsoft)
- M365 Agent Builder enabled in your tenant

### Option A — Use the Live Agent (Instant)

This agent is already deployed. To use the same configuration:
1. Go to [Microsoft 365 Copilot](https://m365.cloud.microsoft/chat)
2. Open **Agent Builder** → Create new agent
3. Click **Skip to configuration**
4. Copy the instructions from `agent/instructions.md`
5. Add the 4 conversation starters from `docs/demo-script.md`
6. Click **Create**

### Option B — Deploy with M365 Agents Toolkit + VS Code

```bash
# 1. Clone the repository
git clone https://github.com/AntigamerISK/silent-escalation-copilot.git
cd silent-escalation-copilot

# 2. Open in VS Code
code .

# 3. Install M365 Agents Toolkit extension
# Extensions > Search "Microsoft 365 Agents Toolkit" > Install

# 4. Sign in to your M365 account via ATK sidebar

# 5. Press F5 to deploy and test in Microsoft 365 Copilot
```

---

## 🎬 Demo Prompts

Use these 4 prompts in order for a complete demo:

```
1. "Analyze the available business context and identify hidden risks
   that have not been escalated yet."

2. "Is there anything in my current work context that should be
   escalated to leadership right now?"

3. "Generate an executive escalation summary with risk level,
   evidence found, business impact, and recommended next action."

4. "Draft a Teams message and an email to escalate the most critical
   risk identified to the right owner."
```

See full demo script with expected outputs in [docs/demo-script.md](./docs/demo-script.md)

---

## 📂 Repository Structure

```
silent-escalation-copilot/
├── README.md                    # This file
├── LICENSE                      # MIT License
├── .gitignore                   # Security: no secrets committed
├── agent/
│   ├── declarativeAgent.json    # Agent manifest (DA config)
│   ├── manifest.json            # M365 app manifest
│   └── instructions.md          # Full agent system prompt
└── docs/
    ├── demo-script.md           # 4-prompt demo with expected outputs
    └── architecture.md          # Architecture diagram (Mermaid)
```

---

## 📦 Deliverables

- [x] Functional agent deployed in Microsoft 365 Copilot Chat
- [x] Declarative Agent manifest (`agent/declarativeAgent.json`)
- [x] Full system prompt (`agent/instructions.md`)
- [x] App manifest (`agent/manifest.json`)
- [x] 4 conversation starters configured
- [x] Architecture diagram (`docs/architecture.md`)
- [x] Demo script with expected outputs (`docs/demo-script.md`)
- [x] Public GitHub repository
- [ ] Demo video (record with 4 prompts, 3-5 min)

---

## 🔒 Security

- No credentials, tokens, or tenant IDs stored in this repository
- Uses Microsoft Entra ID for organizational authentication
- Agent only reads data within the signed-in user’s M365 permission scope
- No PII or production data included
- `.gitignore` blocks all secret file patterns

---

## 🧑‍💻 Team

| Role | Info |
|---|---|
| Developer | AntigamerISK |
| Track | Enterprise Agents — Battle #3 |
| Hackathon | [Agents League Hackathon](https://info.microsoft.com/Agents-League-Hackathon-Registration.html) |
| Starter Kit | [Enterprise Agents Starter Kit](https://github.com/microsoft/agentsleague/blob/main/starter-kits/3-enterprise-agents/README.md) |

---

## 🔗 Links

- [Agents League Hackathon](https://info.microsoft.com/Agents-League-Hackathon-Registration.html)
- [Enterprise Agents Starter Kit](https://github.com/microsoft/agentsleague/blob/main/starter-kits/3-enterprise-agents/README.md)
- [M365 Copilot Extensibility Docs](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/)
- [M365 Agents Toolkit](https://aka.ms/m365-agents-toolkit)
- [Copilot Dev Camp](https://aka.ms/copilotdevcamp)
- [Agent Templates](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-templates-overview)

---

## 📄 License

MIT License — see [LICENSE](./LICENSE)
