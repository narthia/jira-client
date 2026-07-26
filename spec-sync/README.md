# spec-sync

Keeps `@narthia/jira-client` in sync with the four upstream Atlassian OpenAPI
specs. Runs daily as the `spec-sync` job in
[`.github/workflows/publish.yml`](../.github/workflows/publish.yml) - the single
workflow that publishes the package, so both the human path (push to `main`) and
this bot path share one npm trusted publisher and publish via OIDC with no token.

This directory is **repo tooling** - it is not part of the published package
(`package.json` `files` does not include it).

## How it works

[`sync.ts`](sync.ts) runs these phases:

1. **Fetch** the four specs (URLs live in [`../jira-rest-api-urls.ts`](../jira-rest-api-urls.ts)).
2. **Sanity-gate** each: must be valid JSON with an `openapi`/`swagger` field and
   a `paths` count that has not collapsed vs the lock (guards against a truncated
   CDN response producing a hollow SDK).
3. **Compare** sha256 against [`locks.json`](locks.json). Unchanged → exit, no-op.
4. **Regenerate** `src/` (`vp run generate`; `clean: "generated"` prunes deleted
   endpoints) and normalize formatting (`vp run check:fix`).
5. **Check the generated output actually changed.** A spec can change in a way the
   generator ignores, leaving `src/` identical. Then there is nothing to release -
   the lock is advanced (so the change is not re-detected forever) and the run
   ends. No version, no publish.
6. **Diff the public API surface** against [`api-surface.txt`](api-surface.txt):
   - an export removed → **major**
   - only additions → **minor**
   - output changed but no surface change (e.g. JSDoc/descriptions) → **patch**
7. **Write a changeset**, and (for non-major bumps) advance `locks.json` +
   `api-surface.txt`.

The run emits an `action` - `none` | `lock` | `release` | `major` - that the
workflow branches on.

The bump is derived from our own surface because the specs' `info.version` is a
useless build snapshot. A **major** is never auto-published: the workflow opens a
PR and leaves the lock stale so the change keeps being re-detected until a human
resolves it.

### State files (committed)

- **`locks.json`** - per-spec `{ url, sha256, pathCount, infoVersion }`.
- **`api-surface.txt`** - sorted `<subpath>#<exportName>` for every published
  subpath. Its git diff is the audit trail of what appeared or vanished.

Regenerate both from the current tree with:

```bash
npm run spec-sync:baseline
```

### Known limitation

Diffing export **names** does not catch a type whose _shape_ changed without its
name changing (e.g. a new required field). Such a change lands as minor/patch.
Atlassian's changes are overwhelmingly additive, so this is rare in practice.

## Local use

```bash
npm run spec-sync:dry-run   # detect + report the bump, write nothing
npm run spec-sync           # full run (regenerates src, writes changeset + state)
```

## One-time setup

1. **npm trusted publisher** - nothing new to do. Publishing lives entirely in
   `publish.yml`, which is already the package's trusted publisher, so the bot
   path publishes via OIDC under the same registration. (npm allows only one
   trusted publisher per package, matched by workflow filename - which is exactly
   why everything is in one file.)
2. **Kill switch** - create repo variable `SPEC_SYNC_ENABLED` and set it to
   `true`. Scheduled runs are skipped unless it is `true` (manual
   `workflow_dispatch` runs always work, so you can dry-run before enabling).
3. **Branch protection** - the `spec-sync` job pushes the version commit and tags
   straight to `main` with `GITHUB_TOKEN`. If `main` requires PRs/reviews, that
   push is rejected; grant the Actions bot bypass, or switch the push to a GitHub
   App token (`actions/create-github-app-token`). An App token also makes the
   gated-major PR trigger CI, which `GITHUB_TOKEN` does not.
