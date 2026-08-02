# @narthia/jira-client

A fully typed Jira API client for TypeScript, generated from Atlassian's official OpenAPI specs. Zero runtime dependencies, ESM-only, and built so you can import a single endpoint without pulling in the rest.

## Features

- 📚 **Generated from Atlassian's OpenAPI specs** - types and docs stay accurate to the real API
- 🔄 **Tracks upstream closely** - when Atlassian publishes a spec change, a matching release follows within 24 hours
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

Each link goes to Atlassian's reference for that API - the operation names in this client match the operation IDs there. Those specs are the source this client is generated from, and a matching release follows within 24 hours of Atlassian publishing a change, so what you see in their docs is what you get here.

Use **v3** for new work - it's the current platform API and returns rich text in ADF. **v2** is the same surface with plain-text bodies.

## Quick start

```typescript
// jira.ts - create once, reuse everywhere
import { createPlatformV3Sdk } from "@narthia/jira-client/jira-platform-v3";
import { http } from "@narthia/jira-client/jira-platform-v3/transports/http";

export const jira = createPlatformV3Sdk({
  transport: http({
    baseUrl: "https://your-domain.atlassian.net",
    auth: {
      email: "you@example.com",
      apiToken: process.env.JIRA_API_TOKEN!,
    },
  }),
});
```

Where the request goes (`baseUrl`) and how it authenticates (`auth`) are configured **on the transport**, which you pass to the factory. The `http` transport is imported from that same SDK's `transports/http` subpath, so its `auth` is typed to Jira's `{ email, apiToken }` scheme.

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

Build the context with `createClient` from that SDK's own `config` subpath, passing the same `http` transport the SDK factory takes:

```typescript
import { createClient } from "@narthia/jira-client/jira-platform-v3/config";
import { http } from "@narthia/jira-client/jira-platform-v3/transports/http";
import { getIssue } from "@narthia/jira-client/jira-platform-v3/services/issues";

const ctx = createClient({
  transport: http({
    baseUrl: "https://your-domain.atlassian.net",
    auth: {
      email: "you@example.com",
      apiToken: process.env.JIRA_API_TOKEN!,
    },
  }),
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

The factory config carries only cross-cutting concerns. Everything backend-specific - `baseUrl` and `auth` - lives on the transport (see [Transports](#transports)).

```typescript
interface SdkConfig {
  /** Transport that executes requests, configured with its own baseUrl + auth. Required. */
  transport: Transport;
  /** Default headers merged into every request; per-operation headers win. */
  headers?: Record<string, string>;
  /** Inspect or replace the prepared request before it is sent. */
  onRequest?: (req: TransportRequest) => TransportRequest | void | Promise<TransportRequest | void>;
  /** Observe the raw response before it is decoded. */
  onResponse?: (res: TransportResponse, req: TransportRequest) => void | Promise<void>;
}
```

The `http` transport takes the connection details:

```typescript
interface HttpOptions {
  /** Your Jira site, e.g. https://your-domain.atlassian.net */
  baseUrl: string;
  /** Basic auth via Atlassian API token. */
  auth?: { email: string; apiToken: string };
  /** Custom fetch implementation (polyfill, mock, or instrumented). */
  fetch?: typeof globalThis.fetch;
  /** Extra fetch options merged into every request (e.g. `cache`, `credentials`). */
  fetchOptions?: Omit<RequestInit, "method" | "headers" | "body" | "signal">;
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
  transport: http({
    baseUrl: "https://your-domain.atlassian.net",
    auth: { email, apiToken },
  }),
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

Requests are executed by a transport, and the transport is **required** - it owns `baseUrl` and `auth`, so passing it is how you configure the connection. Each SDK ships a typed `http` transport under its own `transports/http` subpath; its `auth` is typed to that API's scheme (Jira's `{ email, apiToken }`).

The same import point also lets you customize `fetch` or merge options into every request:

```typescript
import { http } from "@narthia/jira-client/jira-platform-v3/transports/http";

const jira = createPlatformV3Sdk({
  transport: http({
    baseUrl: "https://your-domain.atlassian.net",
    auth: { email, apiToken },
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

| Subpath                                   | Contents                                                      |
| ----------------------------------------- | ------------------------------------------------------------- |
| `@narthia/jira-client`                    | Package metadata (`packageName`, `subpaths`)                  |
| `@narthia/jira-client/<sdk>`              | SDK factory, `ApiError`, and all types for that API           |
| `@narthia/jira-client/<sdk>/config`       | `createClient` for that SDK, `ApiError`, `SdkConfig`          |
| `@narthia/jira-client/<sdk>/services/*`   | Standalone operations and service factories                   |
| `@narthia/jira-client/<sdk>/transports/*` | That SDK's typed transports; `transports/http` is the default |
| `@narthia/jira-client/client`             | Core runtime: generic `createClient`, `ApiError`, types       |

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
