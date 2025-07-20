import type { AvatarUrls } from "./common";
import type { ProjectCategory } from "./projectCategory";
import type { IssueType } from "./issuetype";
import type { ProjectComponent } from "./projectComponent";
import type { User } from "./user";
import type { ProjectVersion } from "./projectVersion";
import type { ClientType, JiraRequestGeneric } from "../global";

export type FullProject = {
  expand: string;
  self: string;
  id: string;
  key: string;
  description: string;
  lead: User;
  components?: ProjectComponent[];
  issueTypes: IssueType[];
  assigneeType: AssigneeType;
  versions?: ProjectVersion[];
  name: string;
  avatarUrls: AvatarUrls;
  projectTypeKey: string;
  simplified: boolean;
  style: string;
  isPrivate: boolean;
  roles: Record<string, string>;
  url: string;
  properties: Record<string, unknown>;
  projectCategory: ProjectCategory;
  insight: {
    lastIssueUpdateTime: string;
    totalIssueCount: number;
  };
  email: string;
};

type AssigneeType = "PROJECT_LEAD" | "UNASSIGNED";

export type ProjectTypeKey = "software" | "service_desk" | "business";

// Project template keys for each project type
export type BusinessProjectTemplateKey =
  | "com.atlassian.jira-core-project-templates:jira-core-simplified-content-management"
  | "com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval"
  | "com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking"
  | "com.atlassian.jira-core-project-templates:jira-core-simplified-process-control"
  | "com.atlassian.jira-core-project-templates:jira-core-simplified-procurement"
  | "com.atlassian.jira-core-project-templates:jira-core-simplified-project-management"
  | "com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment"
  | "com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking";

export type ServiceDeskProjectTemplateKey =
  | "com.atlassian.servicedesk:simplified-it-service-management"
  | "com.atlassian.servicedesk:simplified-general-service-desk-it"
  | "com.atlassian.servicedesk:simplified-general-service-desk-business"
  | "com.atlassian.servicedesk:simplified-external-service-desk"
  | "com.atlassian.servicedesk:simplified-hr-service-desk"
  | "com.atlassian.servicedesk:simplified-facilities-service-desk"
  | "com.atlassian.servicedesk:simplified-legal-service-desk"
  | "com.atlassian.servicedesk:simplified-analytics-service-desk"
  | "com.atlassian.servicedesk:simplified-marketing-service-desk"
  | "com.atlassian.servicedesk:simplified-design-service-desk"
  | "com.atlassian.servicedesk:simplified-sales-service-desk"
  | "com.atlassian.servicedesk:simplified-blank-project-business"
  | "com.atlassian.servicedesk:simplified-blank-project-it"
  | "com.atlassian.servicedesk:simplified-finance-service-desk"
  | "com.atlassian.servicedesk:next-gen-it-service-desk"
  | "com.atlassian.servicedesk:next-gen-hr-service-desk"
  | "com.atlassian.servicedesk:next-gen-legal-service-desk"
  | "com.atlassian.servicedesk:next-gen-marketing-service-desk"
  | "com.atlassian.servicedesk:next-gen-facilities-service-desk"
  | "com.atlassian.servicedesk:next-gen-general-it-service-desk"
  | "com.atlassian.servicedesk:next-gen-general-business-service-desk"
  | "com.atlassian.servicedesk:next-gen-analytics-service-desk"
  | "com.atlassian.servicedesk:next-gen-finance-service-desk"
  | "com.atlassian.servicedesk:next-gen-design-service-desk"
  | "com.atlassian.servicedesk:next-gen-sales-service-desk";

export type SoftwareProjectTemplateKey =
  | "com.pyxis.greenhopper.jira:gh-simplified-agility-kanban"
  | "com.pyxis.greenhopper.jira:gh-simplified-agility-scrum"
  | "com.pyxis.greenhopper.jira:gh-simplified-basic"
  | "com.pyxis.greenhopper.jira:gh-simplified-kanban-classic"
  | "com.pyxis.greenhopper.jira:gh-simplified-scrum-classic";

// Union type for all project template keys
export type ProjectTemplateKey =
  | BusinessProjectTemplateKey
  | ServiceDeskProjectTemplateKey
  | SoftwareProjectTemplateKey;

export type ProjectCreateBody = {
  key: string;
  name: string;
  projectTypeKey: ProjectTypeKey;
  projectTemplateKey: ProjectTemplateKey;
  leadAccountId: string;
  assigneeType: AssigneeType;
  avatarId?: number;
  categoryId?: number;
  description?: string;
  issueSecurityScheme?: number;
  notificationScheme?: number;
  permissionScheme?: number;
  url?: string;
  fieldConfigurationScheme?: number;
  workflowScheme?: number;
  issueTypeScreenScheme?: number;
  issueTypeScheme?: string;
};

export type ProjectEditBody = {
  assigneeType?: AssigneeType;
  avatarId?: number;
  categoryId?: number;
  description?: string;
  issueSecurityScheme?: number;
  key?: string;
  lead?: string;
  leadAccountId?: string;
  name?: string;
  notificationScheme?: number;
  permissionScheme?: number;
  releasedProjectKeys?: string[];
  url?: string;
};

export type GetProjectRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { projectIdOrKey: string },
  {
    expand?: string;
    properties?: string;
  }
>;

export type DeleteProjectRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { projectIdOrKey: string },
  { enableUndo?: boolean }
>;

export type CreateProjectRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  undefined,
  ProjectCreateBody
>;

export type EditProjectRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { projectIdOrKey: string },
  { expand?: string },
  ProjectEditBody
>;
