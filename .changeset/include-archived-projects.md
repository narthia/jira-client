---
"@narthia/jira-client": patch
---

Added optional `includeArchivedProjects` to jira-platform-v2 issue search.

- Changed 2 existing export signature(s).

Changed:

- `./jira-platform-v2/services/issue-search#searchAndReconsileIssuesUsingJql`
- `./jira-platform-v2#SearchAndReconcileRequestBean`

`searchAndReconsileIssuesUsingJql` and `SearchAndReconcileRequestBean` now accept optional `includeArchivedProjects` to also return issues from archived projects. Archived projects are excluded by default; setting this to `true` includes them alongside active projects and still requires *Browse projects* on the archived project.
