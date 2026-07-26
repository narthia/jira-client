---
"@narthia/jira-client": patch
---

Docs: state the release cadence as "within 24 hours" of an upstream spec change.

This accompanies a new automated spec-sync pipeline (repo tooling, not shipped in
the package) that fetches the four Atlassian OpenAPI specs daily, regenerates the
SDK when they change, derives the semver bump from the package's own exported API
surface, and publishes - holding major bumps for human review.
