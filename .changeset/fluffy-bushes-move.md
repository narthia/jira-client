---
"@narthia/jira-client": patch
---

Synced jira-platform-v2, jira-platform-v3 with upstream Atlassian OpenAPI specs.

- Changed 2 existing export signature(s).

Changed:

- `./jira-platform-v2/types/ui-modifications-apps#UiModificationContextDetails`
- `./jira-platform-v3/types/ui-modifications-apps#UiModificationContextDetails`

`UiModificationContextDetails.viewType` now includes Agent view variants (`GICAgentView`, `IssueViewAgentView`, `IssueTransitionAgentView`), with updated context docs for optional `requestTypeId` scoping. `createUser` JSDoc clarifies 201/400 response behavior when granting Jira product access.
