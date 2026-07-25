---
"@narthia/jira-client": major
---

Added per-service subpath exports for tree-shaking, plus a root entry and public transports.

**Deep-import a single operation.** Every operation now ships as a standalone module under `<sdk>/services/*`, so you can pull in one endpoint instead of a whole SDK:

```ts
import { createClient } from "@narthia/jira-client/client";
import { getIssue } from "@narthia/jira-client/jira-platform-v3/services/issues";

const ctx = createClient({ baseUrl, auth: { type: "basic", username: email, password: apiToken } });
const issue = await getIssue(ctx, { issueIdOrKey: "PROJ-123" });
```

Bundling `createPlatformV3Sdk` costs roughly 171 KB minified; importing `getIssue` on its own is roughly 0.2 KB. Each service module also exports its `create<Name>Service` factory if you want a bound group without the full SDK.

**New exports:**

- `.` - package metadata (`packageName`, `subpaths`, `poke`). The root subpath previously pointed at a file that was never built.
- `<sdk>/services/*` - standalone operations and service factories for all four SDKs.
- `transports/*` - `httpTransport` and `HttpTransportOptions`, so a custom `fetch` or `fetchOptions` can be supplied. It shipped in `dist` before but was untyped and unreachable.

**Output layout now mirrors the source tree.** Shared types previously landed in 185 hash-named chunks at the root of `dist`; they now sit at stable paths such as `dist/jira-platform-v3/types/issues.d.mts`. Bundled output is byte-identical, and no public subpath changed.

**Docs and metadata.** The README has been rewritten for the current generated API: it documents `create<Name>Sdk` factories, the `ApiError` throwing model (methods return data directly, with no `success` flag), configuration, hooks, transports, and links to Atlassian's reference for each API. The package description and keywords no longer claim CJS or Atlassian Forge support; the client is ESM-only and has no Forge-specific entry point.
