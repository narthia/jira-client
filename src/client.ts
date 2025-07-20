import type { ClientType, DefaultJiraConfig, ForgeJiraConfig } from "./types/global";
import issue from "./services/issue";
import project from "./services/project";
import status from "./services/status";
import issueType from "./services/issuetype";

class JiraClient<TClient extends ClientType> {
  public issue: ReturnType<typeof issue<TClient>>;
  public project: ReturnType<typeof project<TClient>>;
  public status: ReturnType<typeof status<TClient>>;
  public issueType: ReturnType<typeof issueType<TClient>>;
  constructor(config: TClient extends "default" ? DefaultJiraConfig : ForgeJiraConfig) {
    this.issue = issue(config);
    this.project = project(config);
    this.status = status(config);
    this.issueType = issueType(config);
  }
}

export function createJiraClient(config: DefaultJiraConfig): JiraClient<"default">;
export function createJiraClient(config: ForgeJiraConfig): JiraClient<"forge">;
export function createJiraClient(
  config: DefaultJiraConfig | ForgeJiraConfig
): JiraClient<ClientType> {
  return new JiraClient(config);
}
