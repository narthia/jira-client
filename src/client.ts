import type { ClientType, DefaultJiraConfig, ForgeJiraConfig } from "./types/global";
import issue from "./services/issue";
import project from "./services/project";
import status from "./services/status";
import issueType from "./services/issuetype";

class JiraClientImpl<TClient extends ClientType = ClientType> {
  public issue: ReturnType<typeof issue<TClient>>;
  public project: ReturnType<typeof project<TClient>>;
  public status: ReturnType<typeof status<TClient>>;
  public issueType: ReturnType<typeof issueType<TClient>>;

  constructor(config: DefaultJiraConfig | ForgeJiraConfig) {
    this.issue = issue(config);
    this.project = project(config);
    this.status = status(config);
    this.issueType = issueType(config);
  }
}

// Constructor overloads for type inference
export interface JiraClient {
  new (config: DefaultJiraConfig): JiraClientImpl<"default">;
  new (config: ForgeJiraConfig): JiraClientImpl<"forge">;
}

export const JiraClient: JiraClient = JiraClientImpl;
