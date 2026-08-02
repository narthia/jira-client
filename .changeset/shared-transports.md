---
"@narthia/jira-client": minor
---

Shared transports + Atlassian Forge support (breaking). Transports are no longer per-SDK; there is now a single shared set imported from the top-level `transports/*` subpath.

Upgraded `@narthia/openapi-sdk-generator` to `^1.2.0`, which emits one shared transport set for all SDKs instead of a copy under each. The `http` transport keeps its typed `{ email, apiToken }` auth; a new `forge` transport runs the same SDKs inside an [Atlassian Forge](https://developer.atlassian.com/platform/forge/) app (backed by the optional `@forge/api` peer dependency).

**Breaking: the transport import path moved.**

```ts
// before (2.x)
import { http } from "@narthia/jira-client/jira-platform-v3/transports/http";

// after
import { http } from "@narthia/jira-client/transports/http";
```

The per-SDK `@narthia/jira-client/<sdk>/transports/*` subpaths are removed; use `@narthia/jira-client/transports/http` (and `@narthia/jira-client/transports/forge`) instead. The transport shape is unchanged - only the import specifier changes.

**New: Forge transport.** Forge owns URL resolution and auth, so there's no `baseUrl`/`auth` - just the identity to run as:

```ts
import { forge, forgeAs } from "@narthia/jira-client/transports/forge";

const jira = createPlatformV3Sdk({ transport: forge({ as: "app" }) });

// per-call override via the method's second argument
await jira.issues.getIssue({ issueIdOrKey: "PROJ-123" }, forgeAs("user"));
```

`@forge/api` is an optional peer dependency, required only when using the `forge` transport.
