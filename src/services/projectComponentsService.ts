import type {
  ProjectComponent,
  PageBean2ComponentJsonBean,
  ComponentIssuesCount,
  PageBeanComponentWithIssueCount,
  DefaultJiraConfig,
  ForgeJiraConfig,
  ClientType,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents project components. Use it to get, create, update, and
 * delete project components. Also get components for project and get a count of
 * issues by component.
 */
export default function projectComponents<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a component. Use components to provide containers for issues within a
     * project. Use components to provide containers for issues within a project.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project in which
     * the component is created or *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "ari": "ari:cloud:compass:fdb3fdec-4e70-be56-11ee-0242ac120002:component/fdb3fdec-4e70-11ee-be56-0242ac120002/fdb3fdec-11ee-4e70-be56-0242ac120002",
     *   "assignee": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "assigneeType": "PROJECT_LEAD",
     *   "description": "This is a Jira component",
     *   "id": "10000",
     *   "isAssigneeTypeValid": false,
     *   "lead": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "metadata": {
     *     "icon": "https://www.example.com/icon.png"
     *   },
     *   "name": "Component 1",
     *   "project": "HSP",
     *   "projectId": 10000,
     *   "realAssignee": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "realAssigneeType": "PROJECT_LEAD",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     * }
     * ```
     */
    createComponent: async ({
      projectComponent,
      opts
    }: {
      /**
       * @example
       * {
       *   "assigneeType": "PROJECT_LEAD",
       *   "description": "This is a Jira component",
       *   "isAssigneeTypeValid": false,
       *   "leadAccountId": "5b10a2844c20165700ede21g",
       *   "name": "Component 1",
       *   "project": "HSP"
       * }
       */
      projectComponent: ProjectComponent;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectComponent>> => {
      return jiraRequest({
        path: "/rest/api/3/component",
        method: "POST",
        body: JSON.stringify(projectComponent),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a component.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the component or *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteComponent: async ({
      id,
      moveIssuesTo,
      opts
    }: {
      /** The ID of the component. */
      id: string;
      /**
       * The ID of the component to replace the deleted component. If this value is null
       * no replacement is made.
       */
      moveIssuesTo?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest({
        path: "/rest/api/3/component/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          moveIssuesTo
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of all components in a project,
     * including global (Compass) components when applicable.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "description": "This is a component",
     *       "id": "10000",
     *       "name": "Component1",
     *       "self": "http://www.example.com/jira/rest/api/2/component/10000"
     *     },
     *     {
     *       "ari": "ari:cloud:graph::integration-context/ecda99d9-9b42-4bf7-8b4f-ecb5fcf5868c/component/10001",
     *       "description": "This is a global component",
     *       "id": "10001",
     *       "metadata": {
     *         "key1": "value1",
     *         "key2": "value2"
     *       },
     *       "name": "Component2",
     *       "self": "http://www.example.com/jira/rest/api/2/component/10001"
     *     }
     *   ]
     * }
     * ```
     */
    findComponentsForProjects: async ({
      projectIdsOrKeys,
      startAt,
      maxResults,
      orderBy,
      query,
      opts
    }: {
      /** The project IDs and/or project keys (case sensitive). */
      projectIdsOrKeys?: string[];
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `description` Sorts by the component description.
       *  *  `name` Sorts by component name.
       */
      orderBy?: "description" | "-description" | "+description" | "name" | "-name" | "+name";
      /**
       * Filter the results using a literal string. Components with a matching `name` or
       * `description` are returned (case insensitive).
       */
      query?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBean2ComponentJsonBean>> => {
      return jiraRequest({
        path: "/rest/api/3/component",
        method: "GET",
        queryParams: {
          projectIdsOrKeys,
          startAt,
          maxResults,
          orderBy,
          query
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a component.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for project containing
     * the component.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "ari": "ari:cloud:compass:fdb3fdec-4e70-be56-11ee-0242ac120002:component/fdb3fdec-4e70-11ee-be56-0242ac120002/fdb3fdec-11ee-4e70-be56-0242ac120002",
     *   "assignee": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "assigneeType": "PROJECT_LEAD",
     *   "description": "This is a Jira component",
     *   "id": "10000",
     *   "isAssigneeTypeValid": false,
     *   "lead": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "metadata": {
     *     "icon": "https://www.example.com/icon.png"
     *   },
     *   "name": "Component 1",
     *   "project": "HSP",
     *   "projectId": 10000,
     *   "realAssignee": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "realAssigneeType": "PROJECT_LEAD",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     * }
     * ```
     */
    getComponent: async ({
      id,
      opts
    }: {
      /** The ID of the component. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectComponent>> => {
      return jiraRequest({
        path: "/rest/api/3/component/{id}",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the counts of issues assigned to the component.
     *
     * This operation can be accessed anonymously.
     *
     * **Deprecation notice:** The required OAuth 2.0 scopes will be updated on June
     * 15, 2024.
     *
     *  *  **Classic**: `read:jira-work`
     *  *  **Granular**: `read:field:jira`, `read:project.component:jira`
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "issueCount": 23,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     * }
     * ```
     */
    getComponentRelatedIssues: async ({
      id,
      opts
    }: {
      /** The ID of the component. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ComponentIssuesCount>> => {
      return jiraRequest({
        path: "/rest/api/3/component/{id}/relatedIssueCounts",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all components in a project. See the [Get project components
     * paginated](#api-rest-api-3-project-projectIdOrKey-component-get) resource if
     * you want to get a full list of components with pagination.
     *
     * If your project uses Compass components, this API will return a paginated list
     * of Compass components that are linked to issues in that project.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "ari": "ari:cloud:compass:fdb3fdec-4e70-be56-11ee-0242ac120002:component/fdb3fdec-4e70-11ee-be56-0242ac120002/fdb3fdec-11ee-4e70-be56-0242ac120002",
     *     "assignee": {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "accountType": "atlassian",
     *       "active": false,
     *       "avatarUrls": {
     *         "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *         "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *         "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *         "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *       },
     *       "displayName": "Mia Krystof",
     *       "key": "",
     *       "name": "",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *     },
     *     "assigneeType": "PROJECT_LEAD",
     *     "description": "This is a Jira component",
     *     "id": "10000",
     *     "isAssigneeTypeValid": false,
     *     "lead": {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "accountType": "atlassian",
     *       "active": false,
     *       "avatarUrls": {
     *         "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *         "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *         "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *         "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *       },
     *       "displayName": "Mia Krystof",
     *       "key": "",
     *       "name": "",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *     },
     *     "metadata": {
     *       "icon": "https://www.example.com/icon.png"
     *     },
     *     "name": "Component 1",
     *     "project": "HSP",
     *     "projectId": 10000,
     *     "realAssignee": {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "accountType": "atlassian",
     *       "active": false,
     *       "avatarUrls": {
     *         "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *         "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *         "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *         "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *       },
     *       "displayName": "Mia Krystof",
     *       "key": "",
     *       "name": "",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *     },
     *     "realAssigneeType": "PROJECT_LEAD",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     *   },
     *   {
     *     "ari": "ari:cloud:compass:fdb3fdec-4e70-be56-11ee-0242ac120002:component/fdb3fdec-11ee-4e70-be56-0242ac120002/fdb3fdec-4e70-11ee-be56-0242ac120002",
     *     "assignee": {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "accountType": "atlassian",
     *       "active": false,
     *       "avatarUrls": {
     *         "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *         "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *         "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *         "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *       },
     *       "displayName": "Mia Krystof",
     *       "key": "",
     *       "name": "",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *     },
     *     "assigneeType": "PROJECT_LEAD",
     *     "description": "This is a another Jira component",
     *     "id": "10050",
     *     "isAssigneeTypeValid": false,
     *     "lead": {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "accountType": "atlassian",
     *       "active": false,
     *       "avatarUrls": {
     *         "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *         "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *         "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *         "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *       },
     *       "displayName": "Mia Krystof",
     *       "key": "",
     *       "name": "",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *     },
     *     "metadata": {
     *       "icon": "https://www.example.com/icon.png"
     *     },
     *     "name": "PXA",
     *     "project": "PROJECTKEY",
     *     "projectId": 10000,
     *     "realAssignee": {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "accountType": "atlassian",
     *       "active": false,
     *       "avatarUrls": {
     *         "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *         "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *         "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *         "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *       },
     *       "displayName": "Mia Krystof",
     *       "key": "",
     *       "name": "",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *     },
     *     "realAssigneeType": "PROJECT_LEAD",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     *   }
     * ]
     * ```
     *
     */
    getProjectComponents: async ({
      projectIdOrKey,
      componentSource,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * The source of the components to return. Can be `jira` (default), `compass` or
       * `auto`. When `auto` is specified, the API will return connected Compass
       * components if the project is opted into Compass, otherwise it will return Jira
       * components. Defaults to `jira`.
       */
      componentSource?: "jira" | "compass" | "auto";
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectComponent[]>> => {
      return jiraRequest({
        path: "/rest/api/3/project/{projectIdOrKey}/components",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        queryParams: {
          componentSource
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of all components in a project. See the
     * [Get project components](#api-rest-api-3-project-projectIdOrKey-components-get)
     * resource if you want to get a full list of versions without pagination.
     *
     * If your project uses Compass components, this API will return a list of Compass
     * components that are linked to issues in that project.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "nextPage": "https://your-domain.atlassian.net/rest/api/3/project/PR/component?startAt=2&maxResults=2",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/project/PR/component?startAt=0&maxResults=2",
     *   "startAt": 0,
     *   "total": 7,
     *   "values": [
     *     {
     *       "assignee": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "accountType": "atlassian",
     *         "active": false,
     *         "avatarUrls": {
     *           "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *           "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *           "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *           "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *         },
     *         "displayName": "Mia Krystof",
     *         "key": "",
     *         "name": "",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "assigneeType": "PROJECT_LEAD",
     *       "componentBean": {
     *         "ari": "ari:cloud:compass:fdb3fdec-4e70-be56-11ee-0242ac120002:component/fdb3fdec-4e70-11ee-be56-0242ac120002/fdb3fdec-11ee-4e70-be56-0242ac120002",
     *         "assignee": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "accountType": "atlassian",
     *           "active": false,
     *           "avatarUrls": {
     *             "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *             "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *             "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *             "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *           },
     *           "displayName": "Mia Krystof",
     *           "key": "",
     *           "name": "",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "assigneeType": "PROJECT_LEAD",
     *         "description": "This is a Jira component",
     *         "id": "10000",
     *         "isAssigneeTypeValid": false,
     *         "lead": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "accountType": "atlassian",
     *           "active": false,
     *           "avatarUrls": {
     *             "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *             "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *             "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *             "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *           },
     *           "displayName": "Mia Krystof",
     *           "key": "",
     *           "name": "",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "metadata": {
     *           "icon": "https://www.example.com/icon.png"
     *         },
     *         "name": "Component 1",
     *         "project": "HSP",
     *         "projectId": 10000,
     *         "realAssignee": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "accountType": "atlassian",
     *           "active": false,
     *           "avatarUrls": {
     *             "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *             "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *             "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *             "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *           },
     *           "displayName": "Mia Krystof",
     *           "key": "",
     *           "name": "",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "realAssigneeType": "PROJECT_LEAD",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     *       },
     *       "description": "This is a Jira component",
     *       "id": "10000",
     *       "isAssigneeTypeValid": false,
     *       "issueCount": 1,
     *       "lead": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "accountType": "atlassian",
     *         "active": false,
     *         "avatarUrls": {
     *           "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *           "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *           "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *           "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *         },
     *         "displayName": "Mia Krystof",
     *         "key": "",
     *         "name": "",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "name": "Component 1",
     *       "project": "HSP",
     *       "projectId": 10000,
     *       "realAssignee": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "accountType": "atlassian",
     *         "active": false,
     *         "avatarUrls": {
     *           "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *           "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *           "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *           "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *         },
     *         "displayName": "Mia Krystof",
     *         "key": "",
     *         "name": "",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "realAssigneeType": "PROJECT_LEAD",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     *     },
     *     {
     *       "assignee": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "accountType": "atlassian",
     *         "active": false,
     *         "avatarUrls": {
     *           "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *           "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *           "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *           "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *         },
     *         "displayName": "Mia Krystof",
     *         "key": "",
     *         "name": "",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "assigneeType": "PROJECT_LEAD",
     *       "componentBean": {
     *         "ari": "ari:cloud:compass:fdb3fdec-4e70-be56-11ee-0242ac120002:component/fdb3fdec-11ee-4e70-be56-0242ac120002/fdb3fdec-4e70-11ee-be56-0242ac120002",
     *         "assignee": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "accountType": "atlassian",
     *           "active": false,
     *           "avatarUrls": {
     *             "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *             "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *             "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *             "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *           },
     *           "displayName": "Mia Krystof",
     *           "key": "",
     *           "name": "",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "assigneeType": "PROJECT_LEAD",
     *         "description": "This is a another Jira component",
     *         "id": "10050",
     *         "isAssigneeTypeValid": false,
     *         "lead": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "accountType": "atlassian",
     *           "active": false,
     *           "avatarUrls": {
     *             "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *             "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *             "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *             "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *           },
     *           "displayName": "Mia Krystof",
     *           "key": "",
     *           "name": "",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "metadata": {
     *           "icon": "https://www.example.com/icon.png"
     *         },
     *         "name": "PXA",
     *         "project": "PROJECTKEY",
     *         "projectId": 10000,
     *         "realAssignee": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "accountType": "atlassian",
     *           "active": false,
     *           "avatarUrls": {
     *             "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *             "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *             "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *             "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *           },
     *           "displayName": "Mia Krystof",
     *           "key": "",
     *           "name": "",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "realAssigneeType": "PROJECT_LEAD",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     *       },
     *       "description": "This is a another Jira component",
     *       "id": "10050",
     *       "isAssigneeTypeValid": false,
     *       "issueCount": 5,
     *       "lead": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "accountType": "atlassian",
     *         "active": false,
     *         "avatarUrls": {
     *           "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *           "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *           "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *           "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *         },
     *         "displayName": "Mia Krystof",
     *         "key": "",
     *         "name": "",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "name": "PXA",
     *       "project": "PROJECTKEY",
     *       "projectId": 10000,
     *       "realAssignee": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "accountType": "atlassian",
     *         "active": false,
     *         "avatarUrls": {
     *           "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *           "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *           "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *           "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *         },
     *         "displayName": "Mia Krystof",
     *         "key": "",
     *         "name": "",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "realAssigneeType": "PROJECT_LEAD",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     *     }
     *   ]
     * }
     * ```
     */
    getProjectComponentsPaginated: async ({
      projectIdOrKey,
      startAt,
      maxResults,
      orderBy,
      componentSource,
      query,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `description` Sorts by the component description.
       *  *  `issueCount` Sorts by the count of issues associated with the component.
       *  *  `lead` Sorts by the user key of the component's project lead.
       *  *  `name` Sorts by component name.
       */
      orderBy?:
        | "description"
        | "-description"
        | "+description"
        | "issueCount"
        | "-issueCount"
        | "+issueCount"
        | "lead"
        | "-lead"
        | "+lead"
        | "name"
        | "-name"
        | "+name";
      /**
       * The source of the components to return. Can be `jira` (default), `compass` or
       * `auto`. When `auto` is specified, the API will return connected Compass
       * components if the project is opted into Compass, otherwise it will return Jira
       * components. Defaults to `jira`.
       */
      componentSource?: "jira" | "compass" | "auto";
      /**
       * Filter the results using a literal string. Components with a matching `name` or
       * `description` are returned (case insensitive).
       */
      query?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanComponentWithIssueCount>> => {
      return jiraRequest({
        path: "/rest/api/3/project/{projectIdOrKey}/component",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        queryParams: {
          startAt,
          maxResults,
          orderBy,
          componentSource,
          query
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a component. Any fields included in the request are overwritten. If
     * `leadAccountId` is an empty string ("") the component lead is removed.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the component or *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "ari": "ari:cloud:compass:fdb3fdec-4e70-be56-11ee-0242ac120002:component/fdb3fdec-4e70-11ee-be56-0242ac120002/fdb3fdec-11ee-4e70-be56-0242ac120002",
     *   "assignee": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "assigneeType": "PROJECT_LEAD",
     *   "description": "This is a Jira component",
     *   "id": "10000",
     *   "isAssigneeTypeValid": false,
     *   "lead": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "metadata": {
     *     "icon": "https://www.example.com/icon.png"
     *   },
     *   "name": "Component 1",
     *   "project": "HSP",
     *   "projectId": 10000,
     *   "realAssignee": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "realAssigneeType": "PROJECT_LEAD",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/component/10000"
     * }
     * ```
     */
    updateComponent: async ({
      id,
      projectComponent,
      opts
    }: {
      /** The ID of the component. */
      id: string;
      /**
       * @example
       * {
       *   "assigneeType": "PROJECT_LEAD",
       *   "description": "This is a Jira component",
       *   "isAssigneeTypeValid": false,
       *   "leadAccountId": "5b10a2844c20165700ede21g",
       *   "name": "Component 1"
       * }
       */
      projectComponent: ProjectComponent;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectComponent>> => {
      return jiraRequest({
        path: "/rest/api/3/component/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(projectComponent),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
