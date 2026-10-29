---
"@narthia/jira-client": minor
---

Synced jira-platform-v2, jira-platform-v3 with upstream Atlassian OpenAPI specs.

- Added 67 export(s).
- Changed 12 existing export signature(s).

Added:

- `./jira-platform-v2/services/issue-custom-field-contexts#setContextDefaultValues`
- `./jira-platform-v2/services/jql#getAuditEntries`
- `./jira-platform-v2/services/policies#addPolicyToProjects`
- `./jira-platform-v2/services/policies#createPoliciesService`
- `./jira-platform-v2/services/policies#getPolicyState`
- `./jira-platform-v2/services/policies#getProjectRules`
- `./jira-platform-v2/services/policies#listPolicies`
- `./jira-platform-v2/services/policies#removePolicyFromProjects`
- `./jira-platform-v2/services/policies#setProjectPolicies`
- `./jira-platform-v2/services/policies#validatePolicyApplication`
- `./jira-platform-v2#AddIssueTypesToContext`
- `./jira-platform-v2#AuditEntry`
- `./jira-platform-v2#AuditPage`
- `./jira-platform-v2#AuditUser`
- `./jira-platform-v2#AuditUserAvatarUrls`
- `./jira-platform-v2#BulkPolicyOperationResponse`
- `./jira-platform-v2#BulkProjectPolicyRequest`
- `./jira-platform-v2#CustomFieldContextDefaultValueLongText`
- `./jira-platform-v2#CustomFieldContextDefaultValuesUpdate`
- `./jira-platform-v2#ErrorResponse`
- `./jira-platform-v2#IssueTypeDefaultValueUpdate`
- `./jira-platform-v2#PolicyApplicationViolation`
- `./jira-platform-v2#PolicySummary`
- `./jira-platform-v2#PolicySummaryResponse`
- `./jira-platform-v2#ProjectResult`
- `./jira-platform-v2#SetProjectPoliciesRequest`
- `./jira-platform-v2#StatePolicyDocument`
- `./jira-platform-v2#StatePolicyRule`
- `./jira-platform-v2#ValidatePolicyRequest`
- `./jira-platform-v3/services/agents#createAgentsService`
- `./jira-platform-v3/services/agents#startBatch`
- `./jira-platform-v3/services/agents#startUniform`
- `./jira-platform-v3/services/issue-custom-field-contexts#setContextDefaultValues`
- `./jira-platform-v3/services/jql#getAuditEntries`
- `./jira-platform-v3/services/policies#addPolicyToProjects`
- `./jira-platform-v3/services/policies#createPoliciesService`
- `./jira-platform-v3/services/policies#getPolicyState`
- `./jira-platform-v3/services/policies#getProjectRules`
- `./jira-platform-v3/services/policies#listPolicies`
- `./jira-platform-v3/services/policies#removePolicyFromProjects`
- `./jira-platform-v3/services/policies#setProjectPolicies`
- `./jira-platform-v3/services/policies#validatePolicyApplication`
- `./jira-platform-v3#AddIssueTypesToContext`
- `./jira-platform-v3#AuditEntry`
- `./jira-platform-v3#AuditPage`
- `./jira-platform-v3#AuditUser`
- `./jira-platform-v3#AuditUserAvatarUrls`
- `./jira-platform-v3#BulkAgentSessionInvocation`
- `./jira-platform-v3#BulkAgentSessionItemError`
- `./jira-platform-v3#BulkAgentSessionOutcome`
- `./jira-platform-v3#BulkAgentSessionsResponse`
- `./jira-platform-v3#BulkPolicyOperationResponse`
- `./jira-platform-v3#BulkProjectPolicyRequest`
- `./jira-platform-v3#BulkStartAgentSessionsBatchRequest`
- `./jira-platform-v3#BulkStartUniformAgentSessionsRequest`
- `./jira-platform-v3#CustomFieldContextDefaultValueLongText`
- `./jira-platform-v3#CustomFieldContextDefaultValuesUpdate`
- `./jira-platform-v3#ErrorResponse`
- `./jira-platform-v3#IssueTypeDefaultValueUpdate`
- `./jira-platform-v3#PolicyApplicationViolation`
- `./jira-platform-v3#PolicySummary`
- `./jira-platform-v3#PolicySummaryResponse`
- `./jira-platform-v3#ProjectResult`
- `./jira-platform-v3#SetProjectPoliciesRequest`
- `./jira-platform-v3#StatePolicyDocument`
- `./jira-platform-v3#StatePolicyRule`
- `./jira-platform-v3#ValidatePolicyRequest`

Changed:

- `./jira-platform-v2/services/issue-custom-field-contexts#addIssueTypesToContext`
- `./jira-platform-v2/services/issue-custom-field-contexts#createIssueCustomFieldContextsService`
- `./jira-platform-v2/services/jql#createJqlService`
- `./jira-platform-v2/services/labels#createLabelsService`
- `./jira-platform-v2/services/labels#getAllLabels`
- `./jira-platform-v2#createPlatformV2Sdk`
- `./jira-platform-v3/services/issue-custom-field-contexts#addIssueTypesToContext`
- `./jira-platform-v3/services/issue-custom-field-contexts#createIssueCustomFieldContextsService`
- `./jira-platform-v3/services/jql#createJqlService`
- `./jira-platform-v3/services/labels#createLabelsService`
- `./jira-platform-v3/services/labels#getAllLabels`
- `./jira-platform-v3#createPlatformV3Sdk`

`createPlatformV2Sdk` and `createPlatformV3Sdk` expose new `policies` services (list, inspect, apply, and validate project policies) and `jql.getAuditEntries` for paginated invalid-JQL access logs. jira-platform-v3 also adds an `agents` service (`startBatch`, `startUniform`) for bulk agent session invocation.

`setContextDefaultValues` updates custom-field default values per context and issue type (EAP-only). `addIssueTypesToContext` now takes `AddIssueTypesToContext`, supporting optional `isAnyIssueType`, `defaultValue`, and revised any-issue-type mapping behaviour. `CustomFieldContextDefaultValueLongText` covers plain-text paragraph field defaults.

`getAllLabels` accepts optional `query` (case-insensitive prefix filter) and `scope` (`RECENT_PROJECTS` or `ALL_BROWSEABLE_PROJECTS`). Field association scheme operation docs now document request body limits (100 fields / 50 schemes per item).
