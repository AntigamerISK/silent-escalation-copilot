# Demo Script — Silent Escalation Copilot

> **Hackathon Demo | Enterprise Agents Track | Agents League 2026**  
> Duration: 3–5 minutes | 4 prompts in sequence

---

## Demo Setup

**Before starting:**
1. Open [Microsoft 365 Copilot](https://m365.cloud.microsoft/chat)
2. Select **Silent Escalation Copilot** from the left sidebar under Agents
3. Have a realistic scenario context ready (emails, tasks, Teams messages in your M365 account)
4. Screen share ready

**Demo Scenario:**  
A fictional project (e.g., "Q3 Product Launch") with unresolved blockers, overdue tasks, and frustrated stakeholders that haven’t been escalated.

---

## Video Structure (3–5 min)

| Segment | Duration | Content |
|---|---|---|
| 1. Hook / Problem | 30 sec | Why silent risks destroy projects |
| 2. Agent intro | 20 sec | What Silent Escalation Copilot does |
| 3. Live demo — 4 prompts | 2–3 min | Run prompts in sequence |
| 4. Closing | 20 sec | Business impact + call to action |

---

## Prompt 1 — Detect Hidden Risks

**What to say:**  
> "Let me ask the agent to scan the available context and find risks that haven’t been escalated."

**Prompt to type:**
```
Analyze the available business context and identify hidden risks that have not been escalated yet.
```

**Expected output format:**
```
RISK LEVEL: HIGH

RISK SUMMARY:
The Q3 Product Launch project has multiple unresolved blockers and no clear escalation path.

EVIDENCE FOUND:
- Email thread (3 days ago): Repeated mention of "API integration still broken" with no resolution
- Planner: 4 tasks marked overdue, 2 with no owner assigned
- Teams message: Stakeholder expressed frustration about launch timeline

BUSINESS IMPACT:
If not escalated in the next 48 hours, the Q3 launch date will likely be missed, impacting revenue and partner commitments.

SUGGESTED ESCALATION OWNER:
Engineering Lead / VP of Product

RECOMMENDED NEXT ACTION:
Schedule an emergency sync with the Engineering Lead and VP of Product today to review blockers and assign resolution owners.
```

---

## Prompt 2 — Escalation Check

**What to say:**  
> "Now let me ask specifically if anything needs to go to leadership today."

**Prompt to type:**
```
Is there anything in my current work context that should be escalated to leadership right now?
```

**Expected output format:**
```
RISK LEVEL: CRITICAL

Yes. Based on available context, there are 2 situations that require immediate leadership attention:

1. Q3 Product Launch — API blocker unresolved for 3+ days
2. Client Acme Corp — No response to contract revision request (5 business days)

Both exceed the standard escalation threshold and require executive decision or intervention.
```

---

## Prompt 3 — Generate Executive Summary

**What to say:**  
> "Let’s generate a full executive escalation report."

**Prompt to type:**
```
Generate an executive escalation summary with risk level, evidence found, business impact, and recommended next action.
```

**Expected output format:**
```
RISK LEVEL: HIGH

RISK SUMMARY:
Critical Q3 launch blocker unescalated for 72 hours with no assigned resolution owner.

EVIDENCE FOUND:
- Email (June 9): "The API gateway is still returning 503 errors on the production endpoint."
- Planner Task "API Fix - PROD": Overdue by 4 days, owner: unassigned
- Teams thread (June 10): "We really need someone to take ownership of this"

BUSINESS IMPACT:
Missed Q3 launch = estimated $180K revenue impact and breach of partner SLA agreement.

SUGGESTED ESCALATION OWNER:
VP of Engineering

RECOMMENDED NEXT ACTION:
Escalate to VP of Engineering with a 4-hour response deadline and reassign the Planner task immediately.
```

---

## Prompt 4 — Draft Escalation

**What to say:**  
> "Now let me generate the actual escalation message ready to send."

**Prompt to type:**
```
Draft a Teams message and an email to escalate the most critical risk identified to the right owner.
```

**Expected output format:**
```
TEAMS MESSAGE DRAFT:
Hi [VP of Engineering], I need to escalate an urgent blocker on the Q3 Product Launch. The API gateway issue has been unresolved for 72 hours with no assigned owner. Can we connect in the next 2 hours to align on a resolution path?

EMAIL SUBJECT: [Urgent] Risk Alert - Q3 Launch Blocker Unescalated - API Gateway

EMAIL DRAFT:
Subject: [Urgent] Risk Alert - Q3 Launch Blocker Unescalated

Hi [Name],

I am escalating a critical blocker on the Q3 Product Launch that has not been formally addressed. The API gateway production issue (503 errors) has persisted for 72 hours with no assigned resolution owner, despite multiple mentions across team communications.

This is directly impacting our ability to meet the launch deadline. Based on current trajectory, a delay of 5+ business days is likely, which conflicts with our partner SLA and the projected Q3 revenue targets.

I am requesting an urgent sync today to assign ownership and define a resolution timeline. Please confirm your availability for the next 2 hours, or delegate to someone who can make this decision immediately.

Best regards,
[Your Name]

---
Please review all drafts before sending. Escalation decisions should be validated before action is taken.
```

---

## Closing Script (20 sec)

> "In under 3 minutes, Silent Escalation Copilot detected a critical unescalated risk, produced an executive summary with evidence, and generated a ready-to-send Teams message and email — all from inside Microsoft 365 Copilot, with no extra tools and no manual analysis."

> "This is what enterprise AI agents should do: work quietly in the background, surface what matters, and put the right information in front of the right people at the right time."

---

## Tips for Recording

- Use realistic data in your M365 account (even simple test emails/tasks work)
- Keep prompts visible on screen as you type them
- Pause 2-3 seconds between typing and sending to let viewers read
- Show the output being generated in real-time
- Optional: Use OBS Studio or Xbox Game Bar (Win+G) to record
