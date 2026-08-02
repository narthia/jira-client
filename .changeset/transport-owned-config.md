---
"@narthia/jira-client": major
---

Transport-owned configuration (breaking). `baseUrl` and `auth` now live **on the transport** instead of the SDK factory config, and `transport` is required.

Upgraded `@narthia/openapi-sdk-generator` to `^1.0.0`, whose major release moves backend-specific settings onto the transport. The factory config now carries only cross-cutting options (`headers`, `onRequest`, `onResponse`); where the request goes and how it authenticates are configured on the `http` transport you pass in.

**Migration**

- Wrap `baseUrl` + `auth` in the `http` transport and pass it as `transport`.
- Import `http` from the SDK's own `transports/http` subpath - its `auth` is typed to Jira's `{ email, apiToken }` scheme (previously the transport was `httpTransport` from the shared `@narthia/jira-client/transports/http` subpath, which no longer exists).

```ts
// before
import { createPlatformV3Sdk } from "@narthia/jira-client/jira-platform-v3";

const jira = createPlatformV3Sdk({
  baseUrl: "https://your-domain.atlassian.net",
  auth: { email, apiToken },
});

// after
import { createPlatformV3Sdk } from "@narthia/jira-client/jira-platform-v3";
import { http } from "@narthia/jira-client/jira-platform-v3/transports/http";

const jira = createPlatformV3Sdk({
  transport: http({
    baseUrl: "https://your-domain.atlassian.net",
    auth: { email, apiToken },
  }),
});
```

The deep-import path changes the same way: build the context with `createClient` from `<sdk>/config` and pass it the same `http` transport. `fetch` and `fetchOptions` are now options of `http(...)` rather than of a separate transport factory.
