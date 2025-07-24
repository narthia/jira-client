import type { StatusDetails } from "./common";
/** Details about the project. */
export interface CreateProjectDetails {
  /** The default assignee when creating issues for this project. */
  assigneeType?: "PROJECT_LEAD" | "UNASSIGNED";
  /** An integer value for the project's avatar. */
  avatarId?: number;
  /**
   * The ID of the project's category. A complete list of category IDs is found
   * using the [Get all project categories](#api-rest-api-3-projectCategory-get)
   * operation.
   */
  categoryId?: number;
  /** A brief description of the project. */
  description?: string;
  /**
   * The ID of the field configuration scheme for the project. Use the [Get all
   * field configuration schemes](#api-rest-api-3-fieldconfigurationscheme-get)
   * operation to get a list of field configuration scheme IDs. If you specify the
   * field configuration scheme you cannot specify the project template key.
   */
  fieldConfigurationScheme?: number;
  /**
   * The ID of the issue security scheme for the project, which enables you to
   * control who can and cannot view issues. Use the [Get issue security
   * schemes](#api-rest-api-3-issuesecurityschemes-get) resource to get all issue
   * security scheme IDs.
   */
  issueSecurityScheme?: number;
  /**
   * The ID of the issue type scheme for the project. Use the [Get all issue type
   * schemes](#api-rest-api-3-issuetypescheme-get) operation to get a list of issue
   * type scheme IDs. If you specify the issue type scheme you cannot specify the
   * project template key.
   */
  issueTypeScheme?: number;
  /**
   * The ID of the issue type screen scheme for the project. Use the [Get all issue
   * type screen schemes](#api-rest-api-3-issuetypescreenscheme-get) operation to
   * get a list of issue type screen scheme IDs. If you specify the issue type
   * screen scheme you cannot specify the project template key.
   */
  issueTypeScreenScheme?: number;
  /**
   * Project keys must be unique and start with an uppercase letter followed by one
   * or more uppercase alphanumeric characters. The maximum length is 10 characters.
   */
  key: string;
  /**
   * This parameter is deprecated because of privacy changes. Use `leadAccountId`
   * instead. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. The user name of the project lead. Either `lead` or
   * `leadAccountId` must be set when creating a project. Cannot be provided with
   * `leadAccountId`.
   */
  lead?: string;
  /**
   * The account ID of the project lead. Either `lead` or `leadAccountId` must be
   * set when creating a project. Cannot be provided with `lead`.
   */
  leadAccountId?: string;
  /** The name of the project. */
  name: string;
  /**
   * The ID of the notification scheme for the project. Use the [Get notification
   * schemes](#api-rest-api-3-notificationscheme-get) resource to get a list of
   * notification scheme IDs.
   */
  notificationScheme?: number;
  /**
   * The ID of the permission scheme for the project. Use the [Get all permission
   * schemes](#api-rest-api-3-permissionscheme-get) resource to see a list of all
   * permission scheme IDs.
   */
  permissionScheme?: number;
  /**
   * A predefined configuration for a project. The type of the `projectTemplateKey`
   * must match with the type of the `projectTypeKey`.
   */
  projectTemplateKey?:
    | "com.pyxis.greenhopper.jira:gh-simplified-agility-kanban"
    | "com.pyxis.greenhopper.jira:gh-simplified-agility-scrum"
    | "com.pyxis.greenhopper.jira:gh-simplified-basic"
    | "com.pyxis.greenhopper.jira:gh-simplified-kanban-classic"
    | "com.pyxis.greenhopper.jira:gh-simplified-scrum-classic"
    | "com.pyxis.greenhopper.jira:gh-cross-team-template"
    | "com.pyxis.greenhopper.jira:gh-cross-team-planning-template"
    | "com.atlassian.servicedesk:simplified-it-service-management"
    | "com.atlassian.servicedesk:simplified-it-service-management-basic"
    | "com.atlassian.servicedesk:simplified-it-service-management-operations"
    | "com.atlassian.servicedesk:simplified-general-service-desk"
    | "com.atlassian.servicedesk:simplified-general-service-desk-it"
    | "com.atlassian.servicedesk:simplified-general-service-desk-business"
    | "com.atlassian.servicedesk:simplified-internal-service-desk"
    | "com.atlassian.servicedesk:simplified-external-service-desk"
    | "com.atlassian.servicedesk:simplified-hr-service-desk"
    | "com.atlassian.servicedesk:simplified-facilities-service-desk"
    | "com.atlassian.servicedesk:simplified-legal-service-desk"
    | "com.atlassian.servicedesk:simplified-marketing-service-desk"
    | "com.atlassian.servicedesk:simplified-finance-service-desk"
    | "com.atlassian.servicedesk:simplified-analytics-service-desk"
    | "com.atlassian.servicedesk:simplified-design-service-desk"
    | "com.atlassian.servicedesk:simplified-sales-service-desk"
    | "com.atlassian.servicedesk:simplified-halp-service-desk"
    | "com.atlassian.servicedesk:simplified-blank-project-it"
    | "com.atlassian.servicedesk:simplified-blank-project-business"
    | "com.atlassian.servicedesk:next-gen-it-service-desk"
    | "com.atlassian.servicedesk:next-gen-hr-service-desk"
    | "com.atlassian.servicedesk:next-gen-legal-service-desk"
    | "com.atlassian.servicedesk:next-gen-marketing-service-desk"
    | "com.atlassian.servicedesk:next-gen-facilities-service-desk"
    | "com.atlassian.servicedesk:next-gen-general-service-desk"
    | "com.atlassian.servicedesk:next-gen-general-it-service-desk"
    | "com.atlassian.servicedesk:next-gen-general-business-service-desk"
    | "com.atlassian.servicedesk:next-gen-analytics-service-desk"
    | "com.atlassian.servicedesk:next-gen-finance-service-desk"
    | "com.atlassian.servicedesk:next-gen-design-service-desk"
    | "com.atlassian.servicedesk:next-gen-sales-service-desk"
    | "com.atlassian.jira-core-project-templates:jira-core-simplified-content-management"
    | "com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval"
    | "com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking"
    | "com.atlassian.jira-core-project-templates:jira-core-simplified-process-control"
    | "com.atlassian.jira-core-project-templates:jira-core-simplified-procurement"
    | "com.atlassian.jira-core-project-templates:jira-core-simplified-project-management"
    | "com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment"
    | "com.atlassian.jira-core-project-templates:jira-core-simplified-task-";
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes),
   * which defines the application-specific feature set. If you don't specify the
   * project template you have to specify the project type.
   */
  projectTypeKey?: "software" | "service_desk" | "business";
  /** A link to information about this project, such as project documentation */
  url?: string;
  /**
   * The ID of the workflow scheme for the project. Use the [Get all workflow
   * schemes](#api-rest-api-3-workflowscheme-get) operation to get a list of
   * workflow scheme IDs. If you specify the workflow scheme you cannot specify the
   * project template key.
   */
  workflowScheme?: number;
}
/** Details of an issue type. */
export interface IssueTypeInfo {
  /** The avatar of the issue type. */
  avatarId?: number;
  /** The ID of the issue type. */
  id?: number;
  /** The name of the issue type. */
  name?: string;
}
/** Status details for an issue type. */
export interface IssueTypeWithStatus {
  /** The ID of the issue type. */
  id: string;
  /** The name of the issue type. */
  name: string;
  /** The URL of the issue type's status details. */
  self: string;
  /** List of status details for the issue type. */
  statuses: StatusDetails[];
  /** Whether this issue type represents subtasks. */
  subtask: boolean;
}
/** Identifiers for a project. */
export interface ProjectIdentifiers {
  /** The ID of the created project. */
  id: number;
  /** The key of the created project. */
  key: string;
  /** The URL of the created project. */
  self: string;
}
/** The hierarchy of issue types within a project. */
export interface ProjectIssueTypeHierarchy {
  /** Details of an issue type hierarchy level. */
  hierarchy?: ProjectIssueTypesHierarchyLevel[];
  /** The ID of the project. */
  projectId?: number;
}
/** Details of an issue type hierarchy level. */
export interface ProjectIssueTypesHierarchyLevel {
  /**
   * The ID of the issue type hierarchy level. This property is deprecated, see
   * [Change notice: Removing hierarchy level IDs from next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  entityId?: string;
  /** The list of issue types in the hierarchy level. */
  issueTypes?: IssueTypeInfo[];
  /** The level of the issue type hierarchy level. */
  level?: number;
  /** The name of the issue type hierarchy level. */
  name?: string;
}
export interface StringList {}
/** Details about the project. */
export interface UpdateProjectDetails {
  /** The default assignee when creating issues for this project. */
  assigneeType?: "PROJECT_LEAD" | "UNASSIGNED";
  /** An integer value for the project's avatar. */
  avatarId?: number;
  /**
   * The ID of the project's category. A complete list of category IDs is found
   * using the [Get all project categories](#api-rest-api-3-projectCategory-get)
   * operation. To remove the project category from the project, set the value to
   * `-1.`
   */
  categoryId?: number;
  /** A brief description of the project. */
  description?: string;
  /**
   * The ID of the issue security scheme for the project, which enables you to
   * control who can and cannot view issues. Use the [Get issue security
   * schemes](#api-rest-api-3-issuesecurityschemes-get) resource to get all issue
   * security scheme IDs.
   */
  issueSecurityScheme?: number;
  /**
   * Project keys must be unique and start with an uppercase letter followed by one
   * or more uppercase alphanumeric characters. The maximum length is 10 characters.
   */
  key?: string;
  /**
   * This parameter is deprecated because of privacy changes. Use `leadAccountId`
   * instead. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. The user name of the project lead. Cannot be provided with
   * `leadAccountId`.
   */
  lead?: string;
  /** The account ID of the project lead. Cannot be provided with `lead`. */
  leadAccountId?: string;
  /** The name of the project. */
  name?: string;
  /**
   * The ID of the notification scheme for the project. Use the [Get notification
   * schemes](#api-rest-api-3-notificationscheme-get) resource to get a list of
   * notification scheme IDs.
   */
  notificationScheme?: number;
  /**
   * The ID of the permission scheme for the project. Use the [Get all permission
   * schemes](#api-rest-api-3-permissionscheme-get) resource to see a list of all
   * permission scheme IDs.
   */
  permissionScheme?: number;
  /**
   * Previous project keys to be released from the current project. Released keys
   * must belong to the current project and not contain the current project key
   */
  releasedProjectKeys?: string[];
  /** A link to information about this project, such as project documentation */
  url?: string;
}
