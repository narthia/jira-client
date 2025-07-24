import type {
  SecurityScheme,
  PermissionScheme,
  IdBean,
  ProjectIssueSecurityLevels,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents permission schemes for a project. Use this resource to:
 *
 *  *  get details of a project's issue security levels available to the calling
 * user.
 *  *  get the permission scheme associated with the project or assign different
 * permission scheme to the project.
 *  *  get details of a project's issue security scheme.
 *
 * See [Managing project permissions](https://confluence.atlassian.com/x/yodKLg)
 * for more information about permission schemes.
 */
export default function projectPermissionSchemes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Assigns a permission scheme with a project. See [Managing project
     * permissions](https://confluence.atlassian.com/x/yodKLg) for more information
     * about permission schemes.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg)
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "description",
     *   "id": 10000,
     *   "name": "Example permission scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/10000"
     * }
     * ```
     */
    assignPermissionScheme: async ({
      projectKeyOrId,
      expand,
      idBean,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectKeyOrId: string;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Note that permissions are
       * included when you specify any value. Expand options include:
       *
       *  *  `all` Returns all expandable information.
       *  *  `field` Returns information about the custom field granted the permission.
       *  *  `group` Returns information about the group that is granted the permission.
       *  *  `permissions` Returns all permission grants for each permission scheme.
       *  *  `projectRole` Returns information about the project role granted the
       * permission.
       *  *  `user` Returns information about the user who is granted the permission.
       */
      expand?: string;
      /**
       * @example
       * {
       *   "id": 10000
       * }
       */
      idBean: IdBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PermissionScheme>> => {
      return jiraRequest<PermissionScheme>({
        path: "/rest/api/3/project/{projectKeyOrId}/permissionscheme",
        method: "PUT",
        pathParams: {
          projectKeyOrId
        },
        queryParams: {
          expand
        },
        body: JSON.stringify(idBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Gets the [permission scheme](https://confluence.atlassian.com/x/yodKLg)
     * associated with the project.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "description",
     *   "id": 10000,
     *   "name": "Example permission scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/10000"
     * }
     * ```
     */
    getAssignedPermissionScheme: async ({
      projectKeyOrId,
      expand,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectKeyOrId: string;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Note that permissions are
       * included when you specify any value. Expand options include:
       *
       *  *  `all` Returns all expandable information.
       *  *  `field` Returns information about the custom field granted the permission.
       *  *  `group` Returns information about the group that is granted the permission.
       *  *  `permissions` Returns all permission grants for each permission scheme.
       *  *  `projectRole` Returns information about the project role granted the
       * permission.
       *  *  `user` Returns information about the user who is granted the permission.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PermissionScheme>> => {
      return jiraRequest<PermissionScheme>({
        path: "/rest/api/3/project/{projectKeyOrId}/permissionscheme",
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
     * Returns the [issue security scheme](https://confluence.atlassian.com/x/J4lKLg)
     * associated with the project.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or the *Administer
     * Projects* [project permission](https://confluence.atlassian.com/x/yodKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultSecurityLevelId": 10021,
     *   "description": "Description for the default issue security scheme",
     *   "id": 10000,
     *   "levels": [
     *     {
     *       "description": "Only the reporter and internal staff can see this issue.",
     *       "id": "10021",
     *       "name": "Reporter Only",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/securitylevel/10021"
     *     }
     *   ],
     *   "name": "Default Issue Security Scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issuesecurityschemes/10000"
     * }
     * ```
     */
    getProjectIssueSecurityScheme: async ({
      projectKeyOrId,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectKeyOrId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SecurityScheme>> => {
      return jiraRequest<SecurityScheme>({
        path: "/rest/api/3/project/{projectKeyOrId}/issuesecuritylevelscheme",
        method: "GET",
        pathParams: {
          projectKeyOrId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all [issue security](https://confluence.atlassian.com/x/J4lKLg) levels
     * for the project that the user has access to.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) for the project,
     * however, issue security levels are only returned for authenticated user with
     * *Set Issue Security* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "levels": [
     *     {
     *       "description": "Only the reporter and internal staff can see this issue.",
     *       "id": "100000",
     *       "name": "Reporter Only",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/securitylevel/100000"
     *     },
     *     {
     *       "description": "Only internal staff can see this issue.",
     *       "id": "100001",
     *       "name": "Staff Only",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/securitylevel/100001"
     *     }
     *   ]
     * }
     * ```
     */
    getSecurityLevelsForProject: async ({
      projectKeyOrId,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectKeyOrId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectIssueSecurityLevels>> => {
      return jiraRequest<ProjectIssueSecurityLevels>({
        path: "/rest/api/3/project/{projectKeyOrId}/securitylevel",
        method: "GET",
        pathParams: {
          projectKeyOrId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
