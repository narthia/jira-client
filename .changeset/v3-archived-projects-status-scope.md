---
"@narthia/jira-client": patch
---

Added optional `includeArchivedProjects` to jira-platform-v3 issue search and `scope` to project template status payloads.

- Changed 4 existing export signature(s).

Changed:

- `./jira-platform-v3/services/issue-search#searchAndReconsileIssuesUsingJql`
- `./jira-platform-v3#SearchAndReconcileRequestBean`
- `./jira-platform-v2/types/project-templates#StatusPayload`
- `./jira-platform-v3/types/project-templates#StatusPayload`

`searchAndReconsileIssuesUsingJql` and `SearchAndReconcileRequestBean` in jira-platform-v3 now accept optional `includeArchivedProjects` to also return issues from archived projects. Archived projects are excluded by default; setting this to `true` includes them alongside active projects and still requires _Browse projects_ on the archived project.

`StatusPayload` now accepts optional `scope` set to `GLOBAL` to make a status shared across projects. Leave unset for the default project-scoped behaviour.
