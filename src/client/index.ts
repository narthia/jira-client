import type { DefaultJiraConfig, ForgeJiraConfig } from "../types/global";
import JiraClientImpl from "./JiraClientImpl";

export interface JiraClient {
  new (config: DefaultJiraConfig): JiraClientImpl<"default">;
  new (config: ForgeJiraConfig): JiraClientImpl<"forge">;
}

/**
 * Jira API client with dual ESM/CJS support, designed for both standard Jira REST API
 * and Atlassian Forge applications.
 *
 * @example
 * ```typescript
 * // Initialize the client once and reuse across your application
 * // jira-client-default.ts
 * const client = new JiraClient({
 *   type: "default",
 *   auth: {
 *     email: "your-email@example.com",
 *     apiToken: "your-api-token",
 *     baseUrl: "https://your-domain.atlassian.net"
 *   }
 * });
 *
 * // Use any of the available services
 * // some-file.ts
 * const issue = await client.issues.getIssue({
 *   issueKeyOrId: "PROJ-123",
 *   fields: ["summary", "description", "status"]
 * });
 * ```
 *
 * @example
 * ```typescript
 * // For Atlassian Forge applications
 * // jira-client-forge.ts
 * import api from "@forge/api";
 *
 * const client = new JiraClient({
 *   type: "forge",
 *   auth: { api }
 * });
 *
 * // Execute as app for elevated permissions
 * // some-file.ts
 * const issue = await client.issues.getIssue({
 *   issueKeyOrId: "PROJ-123",
 *   opts: { as: "app" } // by default, its "user"
 * });
 * ```
 */
export const JiraClient: JiraClient = JiraClientImpl;
