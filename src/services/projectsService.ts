import type {
  Project,
  NotificationScheme,
  PageBeanProject,
  CreateProjectDetails,
  ProjectIdentifiers,
  ProjectIssueTypeHierarchy,
  UpdateProjectDetails,
  IssueTypeWithStatus,
  StringList,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents projects. Use it to get, create, update, and delete
 * projects. Also get statuses available to a project, a project's notification
 * schemes, and update a project's type.
 */
export default function projects<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Archives a project. You can't delete a project if it's archived. To delete an
     * archived project, restore the project and then delete it. To restore a project,
     * use the Jira UI.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    archiveProject: async ({
      projectIdOrKey,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectIdOrKey}/archive",
        method: "POST",
        pathParams: {
          projectIdOrKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates a project based on a project type template, as shown in the following
     * table:
     *
     * | Project Type Key | Project Template Key |
     * |--|--|
     * | `business` |
     * `com.atlassian.jira-core-project-templates:jira-core-simplified-content-management`,
     * `com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval`,
     * `com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking`,
     * `com.atlassian.jira-core-project-templates:jira-core-simplified-process-control`,
     * `com.atlassian.jira-core-project-templates:jira-core-simplified-procurement`,
     * `com.atlassian.jira-core-project-templates:jira-core-simplified-project-management`,
     * `com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment`,
     * `com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking` |
     * | `service_desk` |
     * `com.atlassian.servicedesk:simplified-it-service-management`,
     * `com.atlassian.servicedesk:simplified-general-service-desk-it`,
     * `com.atlassian.servicedesk:simplified-general-service-desk-business`,
     * `com.atlassian.servicedesk:simplified-external-service-desk`,
     * `com.atlassian.servicedesk:simplified-hr-service-desk`,
     * `com.atlassian.servicedesk:simplified-facilities-service-desk`,
     * `com.atlassian.servicedesk:simplified-legal-service-desk`,
     * `com.atlassian.servicedesk:simplified-analytics-service-desk`,
     * `com.atlassian.servicedesk:simplified-marketing-service-desk`,
     * `com.atlassian.servicedesk:simplified-design-service-desk`,
     * `com.atlassian.servicedesk:simplified-sales-service-desk`,
     * `com.atlassian.servicedesk:simplified-blank-project-business`,
     * `com.atlassian.servicedesk:simplified-blank-project-it`,
     * `com.atlassian.servicedesk:simplified-finance-service-desk`,
     * `com.atlassian.servicedesk:next-gen-it-service-desk`,
     * `com.atlassian.servicedesk:next-gen-hr-service-desk`,
     * `com.atlassian.servicedesk:next-gen-legal-service-desk`,
     * `com.atlassian.servicedesk:next-gen-marketing-service-desk`,
     * `com.atlassian.servicedesk:next-gen-facilities-service-desk`,
     * `com.atlassian.servicedesk:next-gen-general-service-desk`,
     * `com.atlassian.servicedesk:next-gen-general-it-service-desk`,
     * `com.atlassian.servicedesk:next-gen-general-business-service-desk`,
     * `com.atlassian.servicedesk:next-gen-analytics-service-desk`,
     * `com.atlassian.servicedesk:next-gen-finance-service-desk`,
     * `com.atlassian.servicedesk:next-gen-design-service-desk`,
     * `com.atlassian.servicedesk:next-gen-sales-service-desk` |
     * | `software` | `com.pyxis.greenhopper.jira:gh-simplified-agility-kanban`,
     * `com.pyxis.greenhopper.jira:gh-simplified-agility-scrum`,
     * `com.pyxis.greenhopper.jira:gh-simplified-basic`,
     * `com.pyxis.greenhopper.jira:gh-simplified-kanban-classic`,
     * `com.pyxis.greenhopper.jira:gh-simplified-scrum-classic` |
     * The project types are available according to the installed Jira features as
     * follows:
     *
     *  *  Jira Core, the default, enables `business` projects.
     *  *  Jira Service Management enables `service_desk` projects.
     *  *  Jira Software enables `software` projects.
     *
     * To determine which features are installed, go to **Jira settings** > **Apps** >
     * **Manage apps** and review the System Apps list. To add Jira Software or Jira
     * Service Management into a JIRA instance, use **Jira settings** > **Apps** >
     * **Finding new apps**. For more information, see [ Managing
     * add-ons](https://confluence.atlassian.com/x/S31NLg).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    createProject: async ({
      createProjectDetails,
      opts
    }: {
      /**
       * The JSON representation of the project being created.
       *
       * @example
       * {
       *   "assigneeType": "PROJECT_LEAD",
       *   "avatarId": 10200,
       *   "categoryId": 10120,
       *   "description": "Cloud migration initiative",
       *   "issueSecurityScheme": 10001,
       *   "key": "EX",
       *   "leadAccountId": "5b10a0effa615349cb016cd8",
       *   "name": "Example",
       *   "notificationScheme": 10021,
       *   "permissionScheme": 10011,
       *   "projectTemplateKey": "com.atlassian.jira-core-project-templates:jira-core-simplified-process-control",
       *   "projectTypeKey": "business",
       *   "url": "http://atlassian.com"
       * }
       */
      createProjectDetails: CreateProjectDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectIdentifiers>> => {
      return jiraRequest<ProjectIdentifiers>({
        path: "/rest/api/3/project",
        method: "POST",
        body: JSON.stringify(createProjectDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a project asynchronously.
     *
     * This operation is performed asynchronously. The `projectIdOrKey` is
     * immediately deleted, however the project may not be fully deleted for a short
     * period of time. This means the project may still appear in queries during
     * this period. Eventually the project will be fully deleted from the system.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deleteProject: async ({
      projectIdOrKey,
      enableUndo,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * Whether this project is placed in the Jira recycle bin where it will be
       * available for restoration.
       */
      enableUndo?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectIdOrKey}",
        method: "DELETE",
        pathParams: {
          projectIdOrKey
        },
        queryParams: {
          enableUndo
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes a project asynchronously.
     *
     * This operation is performed asynchronously. The `projectIdOrKey` is
     * immediately deleted, however the project may not be fully deleted for a short
     * period of time. This means the project may still appear in queries during
     * this period. Eventually the project will be fully deleted from the system.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deleteProjectAsynchronously: async ({
      projectIdOrKey,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectIdOrKey}",
        method: "DELETE",
        pathParams: {
          projectIdOrKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns all projects visible to the user. Deprecated, use [ Get projects
     * paginated](#api-rest-api-3-project-search-get) that supports search and
     * pagination.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Projects are only returned where the
     * user has one of:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns Returned if the request is successful.
     */
    getAllProjects: async ({
      expand,
      recent,
      properties,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expanded options include:
       *
       *  *  `description` Returns the project description.
       *  *  `issueTypes` Returns all issue types associated with the project.
       *  *  `lead` Returns information about the project lead.
       *  *  `projectKeys` Returns all project keys associated with the project.
       */
      expand?: string;
      /**
       * Returns the user's most recently accessed projects. You may specify the number
       * of results to return up to a maximum of 20. If access is anonymous, then the
       * recently accessed projects are based on the current HTTP session.
       */
      recent?: number;
      /**
       * A list of project properties to return for the project. This parameter accepts
       * a comma-separated list.
       */
      properties?: string[];
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<Project[]>> => {
      return jiraRequest<Project[]>({
        path: "/rest/api/3/project",
        method: "GET",
        queryParams: {
          expand,
          recent,
          properties
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all statuses for a project.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     */
    getAllStatuses: async ({
      projectIdOrKey,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeWithStatus[]>> => {
      return jiraRequest<IssueTypeWithStatus[]>({
        path: "/rest/api/3/project/{projectIdOrKey}/statuses",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the [project issue type
     * hierarchy](https://confluence.atlassian.com/x/Vg1Lpw#Managingprojects-Smartcommits-Projectissuesfornextgenprojects)
     * for a project.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     */
    getHierarchy: async ({
      projectId,
      opts
    }: {
      /** The ID of the project. */
      projectId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectIssueTypeHierarchy>> => {
      return jiraRequest<ProjectIssueTypeHierarchy>({
        path: "/rest/api/3/project/{projectId}/hierarchy",
        method: "GET",
        pathParams: {
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Gets a [notification
     * scheme](https://confluence.atlassian.com/x/8A9L/B) associated with the
     * project. Deprecated, use [Get project notification scheme by
     * project](#api-rest-api-3-project-projectKeyOrId-notificationscheme-get).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer
     * projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for
     * the project.
     *
     * @deprecated
     * @returns Returned if the request is successful.
     */
    getNotificationSchemeForProject: async ({
      projectKeyOrId,
      expand,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectKeyOrId: string;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `all` Returns all expandable information
       *  *  `field` Returns information about any custom fields assigned to receive an
       * event
       *  *  `group` Returns information about any groups assigned to receive an event
       *  *  `notificationSchemeEvents` Returns a list of event associations. This list
       * is returned for all expandable information
       *  *  `projectRole` Returns information about any project roles assigned to
       * receive an event
       *  *  `user` Returns information about any users assigned to receive an event
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<NotificationScheme>> => {
      return jiraRequest<NotificationScheme>({
        path: "/rest/api/3/project/{projectKeyOrId}/notificationscheme",
        method: "GET",
        pathParams: {
          projectKeyOrId
        },
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the [project](https://confluence.atlassian.com/x/ahoyp) for the given
     * `projectIdOrKey`.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** The project is returned where the
     * user has one of:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    getProject: async ({
      projectIdOrKey,
      expand,
      properties,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Note that the project
       * description, issue types, and project lead are included in all responses by
       * default. Expand options include:
       *
       *  *  `description` The project description.
       *  *  `issueTypes` The issue types associated with the project.
       *  *  `lead` The project lead.
       *  *  `projectKeys` All project keys associated with the project.
       *  *  `issueTypeHierarchy` The project issue type hierarchy.
       */
      expand?: string;
      /**
       * A list of project properties to return for the project. This parameter accepts
       * a comma-separated list.
       */
      properties?: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<Project>> => {
      return jiraRequest<Project>({
        path: "/rest/api/3/project/{projectIdOrKey}",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        queryParams: {
          expand,
          properties
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all projects visible to the user, for the most recently accessed
     * projects. Deprecated, use [ Get projects
     * paginated](#api-rest-api-3-project-search-get) that supports search and
     * pagination.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Projects are only returned where the
     * user has one of:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns Returned if the request is successful.
     */
    getRecent: async ({
      expand,
      properties,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expanded options include:
       *
       *  *  `description` Returns the project description.
       *  *  `projectKeys` Returns all project keys associated with a project.
       *  *  `lead` Returns information about the project lead.
       *  *  `issueTypes` Returns all issue types associated with the project.
       *  *  `url` Returns the URL associated with the project.
       *  *  `permissions` Returns the permissions associated with the project.
       *  *  `insight` EXPERIMENTAL. Returns the insight details of total issue count
       * and last issue update time for the project.
       *  *  `*` Returns the project with all available expand options.
       */
      expand?: string;
      /**
       * EXPERIMENTAL. A list of project properties to return for the project. This
       * parameter accepts a comma-separated list. Invalid property names are ignored.
       */
      properties?: StringList[];
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<Project[]>> => {
      return jiraRequest<Project[]>({
        path: "/rest/api/3/project/recent",
        method: "GET",
        queryParams: {
          expand,
          properties
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Restores a project that has been archived or placed in the Jira recycle bin.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    restore: async ({
      projectIdOrKey,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Project>> => {
      return jiraRequest<Project>({
        path: "/rest/api/3/project/{projectIdOrKey}/restore",
        method: "POST",
        pathParams: {
          projectIdOrKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of projects visible to the user.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Projects are only returned where the
     * user has one of:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    searchProjects: async ({
      startAt,
      maxResults,
      orderBy,
      id,
      keys,
      query,
      typeKey,
      categoryId,
      action,
      expand,
      status,
      properties,
      propertyQuery,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /**
       * The maximum number of items to return per page. Must be less than or equal to
       * 100. If a value greater than 100 is provided, the `maxResults` parameter will
       * default to 100.
       */
      maxResults?: number;
      /**
       * [Order](#ordering) the results by a field.
       *
       *  *  `category` Sorts by project category. A complete list of category IDs is
       * found using [Get all project categories](#api-rest-api-3-projectCategory-get).
       *  *  `issueCount` Sorts by the total number of issues in each project.
       *  *  `key` Sorts by project key.
       *  *  `lastIssueUpdatedTime` Sorts by the last issue update time.
       *  *  `name` Sorts by project name.
       *  *  `owner` Sorts by project lead.
       *  *  `archivedDate` EXPERIMENTAL. Sorts by project archived date.
       *  *  `deletedDate` EXPERIMENTAL. Sorts by project deleted date.
       */
      orderBy?:
        | "category"
        | "-category"
        | "+category"
        | "key"
        | "-key"
        | "+key"
        | "name"
        | "-name"
        | "+name"
        | "owner"
        | "-owner"
        | "+owner"
        | "issueCount"
        | "-issueCount"
        | "+issueCount"
        | "lastIssueUpdatedDate"
        | "-lastIssueUpdatedDate"
        | "+lastIssueUpdatedDate"
        | "archivedDate"
        | "+archivedDate"
        | "-archivedDate"
        | "deletedDate"
        | "+deletedDate"
        | "-deletedDate";
      /**
       * The project IDs to filter the results by. To include multiple IDs, provide an
       * ampersand-separated list. For example, `id=10000&id=10001`. Up to 50 project
       * IDs can be provided.
       */
      id?: number[];
      /**
       * The project keys to filter the results by. To include multiple keys, provide an
       * ampersand-separated list. For example, `keys=PA&keys=PB`. Up to 50 project keys
       * can be provided.
       */
      keys?: string[];
      /**
       * Filter the results using a literal string. Projects with a matching `key` or
       * `name` are returned (case insensitive).
       */
      query?: string;
      /**
       * Orders results by the [project
       * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes).
       * This parameter accepts a comma-separated list. Valid values are `business`,
       * `service_desk`, and `software`.
       */
      typeKey?: string;
      /**
       * The ID of the project's category. A complete list of category IDs is found
       * using the [Get all project categories](#api-rest-api-3-projectCategory-get)
       * operation.
       */
      categoryId?: number;
      /**
       * Filter results by projects for which the user can:
       *
       *  *  `view` the project, meaning that they have one of the following permissions:
       *
       *      *  *Browse projects* [project
       * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
       *      *  *Administer projects* [project
       * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
       *      *  *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg).
       *  *  `browse` the project, meaning that they have the *Browse projects* [project
       * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
       *  *  `edit` the project, meaning that they have one of the following permissions:
       *
       *      *  *Administer projects* [project
       * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
       *      *  *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg).
       *  *  `create` the project, meaning that they have the *Create issues* [project
       * permission](https://confluence.atlassian.com/x/yodKLg) for the project in which
       * the issue is created.
       */
      action?: "view" | "browse" | "edit" | "create";
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expanded options include:
       *
       *  *  `description` Returns the project description.
       *  *  `projectKeys` Returns all project keys associated with a project.
       *  *  `lead` Returns information about the project lead.
       *  *  `issueTypes` Returns all issue types associated with the project.
       *  *  `url` Returns the URL associated with the project.
       *  *  `insight` EXPERIMENTAL. Returns the insight details of total issue count
       * and last issue update time for the project.
       */
      expand?: string;
      /**
       * EXPERIMENTAL. Filter results by project status:
       *
       *  *  `live` Search live projects.
       *  *  `archived` Search archived projects.
       *  *  `deleted` Search deleted projects, those in the recycle bin.
       */
      status?: ("live" | "archived" | "deleted")[];
      /**
       * EXPERIMENTAL. A list of project properties to return for the project. This
       * parameter accepts a comma-separated list.
       */
      properties?: StringList[];
      /**
       * EXPERIMENTAL. A query string used to search properties. The query string cannot
       * be specified using a JSON object. For example, to search for the value of
       * `nested` from `{"something":{"nested":1,"other":2}}` use
       * `[thepropertykey].something.nested=1`. Note that the propertyQuery key is
       * enclosed in square brackets to enable searching where the propertyQuery key
       * includes dot (.) or equals (=) characters. Note that `thepropertykey` is only
       * returned when included in `properties`.
       */
      propertyQuery?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanProject>> => {
      return jiraRequest<PageBeanProject>({
        path: "/rest/api/3/project/search",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          orderBy,
          id,
          keys,
          query,
          typeKey,
          categoryId,
          action,
          expand,
          status,
          properties,
          propertyQuery
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates the [project](https://confluence.atlassian.com/x/ahoyp) details for a
     * given `projectIdOrKey`.
     *
     * **[Permissions](#permissions) required:** *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project or
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateProject: async ({
      projectIdOrKey,
      expand,
      updateProjectDetails,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Note that the project
       * description, issue types, and project lead are included in all responses by
       * default. Expand options include:
       *
       *  *  `description` The project description.
       *  *  `issueTypes` The issue types associated with the project.
       *  *  `lead` The project lead.
       *  *  `projectKeys` All project keys associated with the project.
       */
      expand?: string;
      /**
       * The project details to be updated.
       *
       * @example
       * {
       *   "assigneeType": "PROJECT_LEAD",
       *   "avatarId": 10200,
       *   "categoryId": 10120,
       *   "description": "Cloud migration initiative",
       *   "issueSecurityScheme": 10001,
       *   "key": "EX",
       *   "leadAccountId": "5b10a0effa615349cb016cd8",
       *   "name": "Example",
       *   "notificationScheme": 10021,
       *   "permissionScheme": 10011,
       *   "url": "http://atlassian.com"
       * }
       */
      updateProjectDetails: UpdateProjectDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Project>> => {
      return jiraRequest<Project>({
        path: "/rest/api/3/project/{projectIdOrKey}",
        method: "PUT",
        pathParams: {
          projectIdOrKey
        },
        queryParams: {
          expand
        },
        body: JSON.stringify(updateProjectDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
