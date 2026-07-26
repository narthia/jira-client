// Atlassian OpenAPI spec URLs, one per generated SDK.
//
// These are intentionally unpinned: the `?_v=<deploy>` query Atlassian's docs
// site appends is a docs-site deploy number (identical across all four specs),
// and a stale value 404s once that deploy is garbage-collected. The query-free
// URLs serve the current spec and are what the spec-sync pipeline fetches.

export const JIRA_PLATFORM_V2_URL =
  "https://dac-static.atlassian.com/cloud/jira/platform/swagger.v3.json";

export const JIRA_PLATFORM_V3_URL =
  "https://dac-static.atlassian.com/cloud/jira/platform/swagger-v3.v3.json";

export const JIRA_SERVICE_DESK_URL =
  "https://dac-static.atlassian.com/cloud/jira/service-desk/swagger.v3.json";

export const JIRA_SOFTWARE_URL =
  "https://dac-static.atlassian.com/cloud/jira/software/swagger.v3.json";
