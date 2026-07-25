// Hand-written. Unlike the rest of `src/`, this file is NOT emitted by
// @narthia/openapi-sdk-generator - it survives `bun run generate` because the
// generator config sets `clean: false`.

export const packageName = "@narthia/jira-client" as const;

export const subpaths = [
  "client",
  "jira-platform-v2",
  "jira-platform-v3",
  "jira-service-desk",
  "jira-software",
] as const;

const fortunes = [
  "Zero runtime dependencies. Nothing to audit, nothing to patch.",
  "Import the service, not the suite. Your bundle will thank you.",
  "Have you tried `@narthia/jira-client/jira-platform-v3` lately?",
  "Every issue has a transition. Every build has a green check.",
  "The sprint ends. The types remain.",
] as const;

/** Poke the client. It might poke back with advice. */
export function poke(): string {
  return fortunes[Math.floor(Math.random() * fortunes.length)] ?? fortunes[0];
}
