import type { DefaultJiraConfig, ForgeJiraConfig } from "../types/global";
import JiraClientImpl from "./JiraClientImpl";

// Constructor overloads for type inference
export interface JiraClient {
  new (config: DefaultJiraConfig): JiraClientImpl<"default">;
  new (config: ForgeJiraConfig): JiraClientImpl<"forge">;
}

/**
 * The Jira Cloud REST API
 *
 * @version 0.1.3
 */
export const JiraClient: JiraClient = JiraClientImpl;
