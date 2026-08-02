# @narthia/jira-client

## 2.0.0

### Major Changes

- 5586d2d: Transport-owned configuration (breaking). `baseUrl` and `auth` now live **on the transport** instead of the SDK factory config, and `transport` is required.

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

## 1.1.3

### Patch Changes

- f32d766: Drop Atlassian's volatile build id from the generated API-version JSDoc.

  Upgraded `@narthia/openapi-sdk-generator` to `^0.6.0` and enabled its
  `normalizeVersion` option, so each SDK factory now documents `API version
1001.0.0` instead of `1001.0.0-SNAPSHOT-<git-sha>`. The suffix was a per-deploy
  build id (different across CDN edges, unrelated to the API), so removing it makes
  the generated output deterministic. No public API changes.

## 1.1.2

### Patch Changes

- Synced with upstream Atlassian OpenAPI specs (jira-platform-v2).

  No public API changes - regenerated from updated spec content (descriptions, docs, or non-surface details).

## 1.1.1

### Patch Changes

- d4f2546: Docs: state the release cadence as "within 24 hours" of an upstream spec change.

  This accompanies a new automated spec-sync pipeline (repo tooling, not shipped in
  the package) that fetches the four Atlassian OpenAPI specs daily, regenerates the
  SDK when they change, derives the semver bump from the package's own exported API
  surface, and publishes - holding major bumps for human review.

## 1.1.0

### Minor Changes

- ea751c2: Added a `config` subpath to each SDK, exposing that SDK's own `createClient`.

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

## 1.0.0

### Major Changes

- 27312c6: Added per-service subpath exports for tree-shaking, plus a root entry and public transports.

  **Deep-import a single operation.** Every operation now ships as a standalone module under `<sdk>/services/*`, so you can pull in one endpoint instead of a whole SDK:

  ```ts
  import { createClient } from "@narthia/jira-client/client";
  import { getIssue } from "@narthia/jira-client/jira-platform-v3/services/issues";

  const ctx = createClient({
    baseUrl,
    auth: { type: "basic", username: email, password: apiToken },
  });
  const issue = await getIssue(ctx, { issueIdOrKey: "PROJ-123" });
  ```

  Bundling `createPlatformV3Sdk` costs roughly 171 KB minified; importing `getIssue` on its own is roughly 0.2 KB. Each service module also exports its `create<Name>Service` factory if you want a bound group without the full SDK.

  **New exports:**

  - `.` - package metadata (`packageName`, `subpaths`, `poke`). The root subpath previously pointed at a file that was never built.
  - `<sdk>/services/*` - standalone operations and service factories for all four SDKs.
  - `transports/*` - `httpTransport` and `HttpTransportOptions`, so a custom `fetch` or `fetchOptions` can be supplied. It shipped in `dist` before but was untyped and unreachable.

  **Output layout now mirrors the source tree.** Shared types previously landed in 185 hash-named chunks at the root of `dist`; they now sit at stable paths such as `dist/jira-platform-v3/types/issues.d.mts`. Bundled output is byte-identical, and no public subpath changed.

  **Docs and metadata.** The README has been rewritten for the current generated API: it documents `create<Name>Sdk` factories, the `ApiError` throwing model (methods return data directly, with no `success` flag), configuration, hooks, transports, and links to Atlassian's reference for each API. The package description and keywords no longer claim CJS or Atlassian Forge support; the client is ESM-only and has no Forge-specific entry point.

## 0.4.0

### Minor Changes

- 8ce07e3: Added Jira Software APIs

## 0.3.1

### Patch Changes

- 9d4afb5: Added JSM services in main method

## 0.3.0

### Minor Changes

- 9ad2184: Added Jira Service Management rest api

## 0.2.9

### Patch Changes

- b389ac4: Exported default and forge jira client types

## 0.2.8

### Patch Changes

- f37927f: updated getBulkChangelogs method to accept individual parameters

## 0.2.7

### Patch Changes

- db788ea: Updated dependecies to latest version.

## 0.2.6

### Patch Changes

- 74b6139: Added SECURITY.md to outline security policies, reporting procedures, and best practices and enhanced README.md with a security section linking to SECURITY.md and detailing network access.

## 0.2.5

### Patch Changes

- 5f3d13e: Added jsdoc to jiraclient class

## 0.2.4

### Patch Changes

- 5b601b0: Fixed some jira type issues

## 0.2.3

### Patch Changes

- 484261c: Using getters instead of public property and added caching to getter services.

## 0.2.2

### Patch Changes

- 644b886: Updated Readme

## 0.2.1

### Patch Changes

- 6c7dfd3: Flattened parameters in searchAndReconsileIssuesUsingJqlPost

## 0.2.0

### Minor Changes

- a232021: Generated type defs and docs from OpenApi Schema and Added all rest api's from Jira Platform

## 0.1.2

### Patch Changes

- 6177edb: Made asUser default for forge type and updated readme on information about headers

## 0.1.1

### Patch Changes

- aec4756: Removed function and Added Class export

## 0.1.0

### Initial Release

- a3da6d0: Initial Release
