---
"@narthia/jira-client": minor
---

Synced jira-platform-v2, jira-platform-v3 with upstream Atlassian OpenAPI specs.

- Added 12 export(s).
- Changed 4 existing export signature(s).

Added:

- `./jira-platform-v2/services/issue-panels#getBulkPinStatus`
- `./jira-platform-v3/services/issue-panels#getBulkPinStatus`
- `./jira-platform-v2/services/workflows#copyWorkflow`
- `./jira-platform-v3/services/workflows#copyWorkflow`
- `./jira-platform-v2#ForgePanelProjectPinStatus`
- `./jira-platform-v2#ForgePanelProjectPinStatusRequest`
- `./jira-platform-v2#ForgePanelProjectPinStatusResponse`
- `./jira-platform-v2#WorkflowCopyRequest`
- `./jira-platform-v3#ForgePanelProjectPinStatus`
- `./jira-platform-v3#ForgePanelProjectPinStatusRequest`
- `./jira-platform-v3#ForgePanelProjectPinStatusResponse`
- `./jira-platform-v3#WorkflowCopyRequest`

Changed:

- `./jira-platform-v2/services/issue-panels#createIssuePanelsService`
- `./jira-platform-v3/services/issue-panels#createIssuePanelsService`
- `./jira-platform-v2/services/workflows#createWorkflowsService`
- `./jira-platform-v3/services/workflows#createWorkflowsService`

`getBulkPinStatus` reads the pin status of a Forge issue panel across multiple projects (synchronous bulk status). `copyWorkflow` copies an existing workflow and its statuses into a new workflow in the same scope.

`CreateProjectDetails.projectTypeKey` now includes `customer_service` for Jira Customer Service projects. Issue search docs clarify that checking issues against JQL accepts up to 10 JQL queries and 50 issue IDs. Project and `getProject` docs clarify that `properties` in responses only includes keys requested via the `properties` query parameter.
