# @narthia/jira-client

A fully typed Jira API client for TypeScript, generated from Atlassian's official OpenAPI specs. Zero runtime dependencies, ESM-only, and built so you can import a single endpoint without pulling in the rest.

## Features

- 📚 **Generated from Atlassian's OpenAPI specs** - types and docs stay accurate to the real API
- 🔄 **Tracks upstream closely** - when Atlassian publishes a spec change, a matching release follows within 12-16 hours
- 🌲 **Tree-shakeable** - import one operation and ship ~0.2 KB instead of ~171 KB
- 🛡️ **Fully typed** - every request and response, with JSDoc carried over from the spec
- ⚡ **Zero runtime dependencies**
- 🔌 **Pluggable transport** - swap `fetch` for anything that can move a request

## Installation

```bash
npm install @narthia/jira-client
```

Requires Node.js 18 or later. The package is **ESM-only**.

## The four SDKs

Each Atlassian API is a separate subpath, so you only load the ones you use.

| Subpath                                  | Factory                | Covers                                                                                                                 | Service groups |
| ---------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------- |
| `@narthia/jira-client/jira-platform-v2`  | `createPlatformV2Sdk`  | [Jira Platform v2](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro) · `/rest/api/2`                  | 98             |
| `@narthia/jira-client/jira-platform-v3`  | `createPlatformV3Sdk`  | [Jira Platform v3](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro) · `/rest/api/3`                  | 99             |
| `@narthia/jira-client/jira-service-desk` | `createServiceDeskSdk` | [Jira Service Management](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro) · `/rest/servicedeskapi` | 9              |
| `@narthia/jira-client/jira-software`     | `createSoftwareSdk`    | [Jira Software](https://developer.atlassian.com/cloud/jira/software/rest/intro) · `/rest/agile/1.0`                    | 13             |

Each link goes to Atlassian's reference for that API - the operation names in this client match the operation IDs there. Those specs are the source this client is generated from, and a matching release follows within 12-16 hours of Atlassian publishing a change, so what you see in their docs is what you get here.

Use **v3** for new work - it's the current platform API and returns rich text in ADF. **v2** is the same surface with plain-text bodies.

## Quick start

```typescript
// jira.ts - create once, reuse everywhere
import { createPlatformV3Sdk } from "@narthia/jira-client/jira-platform-v3";

export const jira = createPlatformV3Sdk({
  baseUrl: "https://your-domain.atlassian.net",
  auth: {
    email: "you@example.com",
    apiToken: process.env.JIRA_API_TOKEN!,
  },
});
```

```typescript
// anywhere.ts
import { jira } from "./jira.ts";

const issue = await jira.issues.getIssue({
  issueIdOrKey: "PROJ-123",
  fields: ["summary", "status"],
});

console.log(issue.fields?.summary);
```

Operations are grouped by resource - `jira.issues`, `jira.projects`, `jira.issueComments`, and so on. Your editor's autocomplete on `jira.` is the fastest way to browse them.

## Error handling

Methods **return the response data directly** and **throw `ApiError`** on any non-2xx status. There is no `success` flag to check - a returned value is always a successful one.

```typescript
import { ApiError } from "@narthia/jira-client/jira-platform-v3";

try {
  const issue = await jira.issues.getIssue({ issueIdOrKey: "PROJ-123" });
  console.log(issue.fields?.summary);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.status); // 404
    console.error(error.body); // parsed JSON error payload from Jira
    console.error(error.request); // { method: "get", path: "/rest/api/3/issue/PROJ-123" }
  } else {
    throw error; // network failure, abort, etc.
  }
}
```

`ApiError` carries `status`, `statusText`, `headers`, `body`, and `request`.

## Tree-shaking: import one operation

Every operation also ships as a standalone function under a `services/*` subpath. These take a client context as their first argument instead of being bound to an SDK object.

Build the context with `createClient` from that SDK's own `config` subpath, so it takes the same `{ email, apiToken }` auth the SDK factory does:

```typescript
import { createClient } from "@narthia/jira-client/jira-platform-v3/config";
import { getIssue } from "@narthia/jira-client/jira-platform-v3/services/issues";

const ctx = createClient({
  baseUrl: "https://your-domain.atlassian.net",
  auth: {
    email: "you@example.com",
    apiToken: process.env.JIRA_API_TOKEN!,
  },
});

const issue = await getIssue(ctx, { issueIdOrKey: "PROJ-123" });
```

Each `<sdk>/config` subpath also exports `ApiError` and that SDK's `SdkConfig` and `ClientContext` types. Use the `config` subpath belonging to the same SDK as the service you are importing.

**Why bother:** bundling `createPlatformV3Sdk` pulls in every service it wires up - about **171 KB** minified. Importing `getIssue` on its own is about **0.2 KB**. If you only touch a handful of endpoints, deep imports are worth it.

Each service module also exports a factory if you want a bound group without the whole SDK:

```typescript
import { createIssuesService } from "@narthia/jira-client/jira-platform-v3/services/issues";

const issues = createIssuesService(ctx);
await issues.getIssue({ issueIdOrKey: "PROJ-123" });
```

## Types

Every request and response type is re-exported from its SDK subpath:

```typescript
import type { IssueBean, Project, User } from "@narthia/jira-client/jira-platform-v3";
import type { CustomerRequestDto } from "@narthia/jira-client/jira-service-desk";
import type { SprintBean } from "@narthia/jira-client/jira-software";
```

Two things to know:

- Types live on the **SDK subpath**, not the service subpath. Pull types from `.../jira-platform-v3` and functions from `.../jira-platform-v3/services/issues`. Since `import type` is erased at compile time, this costs nothing at runtime.
- Acronyms are normalized to PascalCase - it's `CustomerRequestDto`, not `CustomerRequestDTO`.

## Configuration

```typescript
interface SdkConfig {
  /** Your Jira site, e.g. https://your-domain.atlassian.net */
  baseUrl?: string;
  /** Basic auth via Atlassian API token. */
  auth?: { email: string; apiToken: string };
  /** Default headers merged into every request; per-operation headers win. */
  headers?: Record<string, string>;
  /** Swap the request executor. Defaults to a fetch-based HTTP transport. */
  transport?: Transport;
  /** Inspect or replace the prepared request before it is sent. */
  onRequest?: (req: TransportRequest) => TransportRequest | void | Promise<TransportRequest | void>;
  /** Observe the raw response before it is decoded. */
  onResponse?: (res: TransportResponse, req: TransportRequest) => void | Promise<void>;
}
```

Create an API token at [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens). Keep it in an environment variable - never commit it.

### Per-request options

Every method takes an optional second argument for request-level concerns:

```typescript
const controller = new AbortController();

const issue = await jira.issues.getIssue(
  { issueIdOrKey: "PROJ-123" },
  {
    headers: { "X-Custom-Header": "value" },
    signal: controller.signal,
  }
);
```

### Hooks

```typescript
const jira = createPlatformV3Sdk({
  baseUrl: "https://your-domain.atlassian.net",
  auth: { email, apiToken },
  onRequest: (req) => {
    console.log(`→ ${req.method.toUpperCase()} ${req.path}`);
  },
  onResponse: (res, req) => {
    console.log(`← ${res.status} ${req.path}`);
  },
});
```

`onRequest` may return a modified request to replace the original, or nothing to leave it alone.

### Transports

Requests are executed by a transport. The default is a `fetch`-based HTTP transport, applied automatically - you only need to touch this to customize `fetch` behavior or to target a non-HTTP backend.

Import it to pass options through to `fetch`:

```typescript
import { httpTransport } from "@narthia/jira-client/transports/http";

const jira = createPlatformV3Sdk({
  baseUrl: "https://your-domain.atlassian.net",
  auth: { email, apiToken },
  transport: httpTransport({
    // custom fetch implementation - polyfill, mock, or instrumented
    fetch: myFetch,
    // merged into every request
    fetchOptions: { credentials: "include", cache: "no-store" },
  }),
});
```

The client core does all the OpenAPI work - path interpolation, query serialization, body encoding, auth, response decoding. A transport just moves a prepared request and returns a response:

```typescript
interface Transport {
  request: (req: TransportRequest) => Promise<TransportResponse>;
}
```

That small surface makes non-HTTP backends drop-in: implement `request` and pass it as `transport`.

## Subpath reference

| Subpath                                 | Contents                                                |
| --------------------------------------- | ------------------------------------------------------- |
| `@narthia/jira-client`                  | Package metadata (`packageName`, `subpaths`)            |
| `@narthia/jira-client/<sdk>`            | SDK factory, `ApiError`, and all types for that API     |
| `@narthia/jira-client/<sdk>/config`     | `createClient` for that SDK, `ApiError`, `SdkConfig`    |
| `@narthia/jira-client/<sdk>/services/*` | Standalone operations and service factories             |
| `@narthia/jira-client/transports/*`     | Transports; `transports/http` is the default            |
| `@narthia/jira-client/client`           | Core runtime: generic `createClient`, `ApiError`, types |

## License

MIT - see [LICENSE](LICENSE).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting and security practices.

### Network access disclosure

This package makes HTTPS requests only to the Jira instance you configure via `baseUrl`.

## Support

- 📧 Email: jeevanreddy1999@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/narthia/jira-client/issues)
- 📖 Repository: [GitHub](https://github.com/narthia/jira-client)
