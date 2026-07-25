---
"@narthia/jira-client": minor
---

Added a `config` subpath to each SDK, exposing that SDK's own `createClient`.

Deep-import users previously had to build a client context with the core runtime `createClient` from `@narthia/jira-client/client`, which takes the raw `{ type: "basic", username, password }` auth shape. Each SDK now exports its own `createClient`, which accepts the same `{ email, apiToken }` auth the SDK factory does:

```ts
import { createClient } from "@narthia/jira-client/jira-platform-v3/config";
import { getIssue } from "@narthia/jira-client/jira-platform-v3/services/issues";

const ctx = createClient({
  baseUrl: "https://your-domain.atlassian.net",
  auth: { email, apiToken },
});

const issue = await getIssue(ctx, { issueIdOrKey: "PROJ-123" });
```

New subpaths, one per SDK:

- `@narthia/jira-client/jira-platform-v2/config`
- `@narthia/jira-client/jira-platform-v3/config`
- `@narthia/jira-client/jira-service-desk/config`
- `@narthia/jira-client/jira-software/config`

Each exports `createClient` and `ApiError`, plus that SDK's `SdkConfig`, `ClientContext`, `ClientConfig`, and `Transport` types. These files already shipped in `dist` but no subpath reached them.

`@narthia/jira-client/client` is unchanged and still available for the generic runtime client.
