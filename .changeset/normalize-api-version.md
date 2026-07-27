---
"@narthia/jira-client": patch
---

Drop Atlassian's volatile build id from the generated API-version JSDoc.

Upgraded `@narthia/openapi-sdk-generator` to `^0.6.0` and enabled its
`normalizeVersion` option, so each SDK factory now documents `API version
1001.0.0` instead of `1001.0.0-SNAPSHOT-<git-sha>`. The suffix was a per-deploy
build id (different across CDN edges, unrelated to the API), so removing it makes
the generated output deterministic. No public API changes.
