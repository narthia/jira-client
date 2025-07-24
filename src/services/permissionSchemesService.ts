import type {
  PermissionScheme,
  PermissionSchemes,
  PermissionGrants,
  PermissionGrant,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents permission schemes. Use it to get, create, update, and
 * delete permission schemes as well as get, create, update, and delete details of
 * the permissions granted in those schemes.
 */
export default function permissionSchemes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a permission grant in a permission scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the scheme permission is created.
     *
     * example:
     * ```
     * {
     *   "holder": {
     *     "expand": "group",
     *     "parameter": "jira-core-users",
     *     "type": "group",
     *     "value": "ca85fac0-d974-40ca-a615-7af99c48d24f"
     *   },
     *   "id": 10000,
     *   "permission": "ADMINISTER_PROJECTS",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/permission/10000"
     * }
     * ```
     */
    createPermissionGrant: async ({
      schemeId,
      expand,
      permissionGrant,
      opts
    }: {
      /** The ID of the permission scheme in which to create a new permission grant. */
      schemeId: number;
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Note that permissions are always included when
       * you specify any value. Expand options include:
       *
       *  *  `permissions` Returns all permission grants for each permission scheme.
       *  *  `user` Returns information about the user who is granted the permission.
       *  *  `group` Returns information about the group that is granted the permission.
       *  *  `projectRole` Returns information about the project role granted the
       * permission.
       *  *  `field` Returns information about the custom field granted the permission.
       *  *  `all` Returns all expandable information.
       */
      expand?: string;
      /**
       * The permission grant to create.
       *
       * @example
       * {
       *   "holder": {
       *     "parameter": "jira-core-users",
       *     "type": "group",
       *     "value": "ca85fac0-d974-40ca-a615-7af99c48d24f"
       *   },
       *   "permission": "ADMINISTER_PROJECTS"
       * }
       */
      permissionGrant: PermissionGrant;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PermissionGrant>> => {
      return jiraRequest<PermissionGrant>({
        path: "/rest/api/3/permissionscheme/{schemeId}/permission",
        method: "POST",
        pathParams: {
          schemeId
        },
        queryParams: {
          expand
        },
        body: JSON.stringify(permissionGrant),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates a new permission scheme. You can create a permission scheme with or
     * without defining a set of permission grants.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the permission scheme is created.
     *
     * example:
     * ```
     * {
     *   "description": "description",
     *   "id": 10000,
     *   "name": "Example permission scheme",
     *   "permissions": [
     *     {
     *       "holder": {
     *         "expand": "group",
     *         "parameter": "jira-core-users",
     *         "type": "group",
     *         "value": "ca85fac0-d974-40ca-a615-7af99c48d24f"
     *       },
     *       "id": 10000,
     *       "permission": "ADMINISTER_PROJECTS",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/permission/10000"
     *     }
     *   ],
     *   "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/10000"
     * }
     * ```
     */
    createPermissionScheme: async ({
      expand,
      permissionScheme,
      opts
    }: {
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Note that permissions are always included when
       * you specify any value. Expand options include:
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
       * The permission scheme to create.
       *
       * @example
       * {
       *   "description": "description",
       *   "name": "Example permission scheme",
       *   "permissions": [
       *     {
       *       "holder": {
       *         "parameter": "jira-core-users",
       *         "type": "group",
       *         "value": "ca85fac0-d974-40ca-a615-7af99c48d24f"
       *       },
       *       "permission": "ADMINISTER_PROJECTS"
       *     }
       *   ]
       * }
       */
      permissionScheme: PermissionScheme;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PermissionScheme>> => {
      return jiraRequest<PermissionScheme>({
        path: "/rest/api/3/permissionscheme",
        method: "POST",
        queryParams: {
          expand
        },
        body: JSON.stringify(permissionScheme),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a permission scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deletePermissionScheme: async ({
      schemeId,
      opts
    }: {
      /** The ID of the permission scheme being deleted. */
      schemeId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/permissionscheme/{schemeId}",
        method: "DELETE",
        pathParams: {
          schemeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes a permission grant from a permission scheme. See [About permission
     * schemes and
     * grants](../api-group-permission-schemes/#about-permission-schemes-and-grants)
     * for more details.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deletePermissionSchemeEntity: async ({
      schemeId,
      permissionId,
      opts
    }: {
      /** The ID of the permission scheme to delete the permission grant from. */
      schemeId: number;
      /** The ID of the permission grant to delete. */
      permissionId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/permissionscheme/{schemeId}/permission/{permissionId}",
        method: "DELETE",
        pathParams: {
          schemeId,
          permissionId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns all permission schemes.
     *
     * ### About permission schemes and grants ###
     *
     * A permission scheme is a collection of permission grants. A permission grant
     * consists of a `holder` and a `permission`.
     *
     * #### Holder object ####
     *
     * The `holder` object contains information about the user or group being granted
     * the permission. For example, the *Administer projects* permission is granted to
     * a group named *Teams in space administrators*. In this case, the type is
     * `"type": "group"`, and the parameter is the group name, `"parameter": "Teams in
     * space administrators"` and the value is group ID, `"value":
     * "ca85fac0-d974-40ca-a615-7af99c48d24f"`.
     *
     * The `holder` object is defined by the following properties:
     *
     *  *  `type` Identifies the user or group (see the list of types below).
     *  *  `parameter` As a group's name can change, use of `value` is recommended.
     * The value of this property depends on the `type`. For example, if the `type` is
     * a group, then you need to specify the group name.
     *  *  `value` The value of this property depends on the `type`. If the `type` is
     * a group, then you need to specify the group ID. For other `type` it has the
     * same value as `parameter`
     *
     * The following `types` are available. The expected values for `parameter` and
     * `value` are given in parentheses (some types may not have a `parameter` or
     * `value`):
     *
     *  *  `anyone` Grant for anonymous users.
     *  *  `applicationRole` Grant for users with access to the specified application
     * (application name, application name). See [Update product access
     * settings](https://confluence.atlassian.com/x/3YxjL) for more information.
     *  *  `assignee` Grant for the user currently assigned to an issue.
     *  *  `group` Grant for the specified group (`parameter` : group name, `value` :
     * group ID).
     *  *  `groupCustomField` Grant for a user in the group selected in the specified
     * custom field (`parameter` : custom field ID, `value` : custom field ID).
     *  *  `projectLead` Grant for a project lead.
     *  *  `projectRole` Grant for the specified project role (`parameter` :project
     * role ID, `value` : project role ID).
     *  *  `reporter` Grant for the user who reported the issue.
     *  *  `sd.customer.portal.only` Jira Service Desk only. Grants customers
     * permission to access the customer portal but not Jira. See [Customizing Jira
     * Service Desk permissions](https://confluence.atlassian.com/x/24dKLg) for more
     * information.
     *  *  `user` Grant for the specified user (`parameter` : user ID - historically
     * this was the userkey but that is deprecated and the account ID should be used,
     * `value` : user ID).
     *  *  `userCustomField` Grant for a user selected in the specified custom field
     * (`parameter` : custom field ID, `value` : custom field ID).
     *
     * #### Built-in permissions ####
     *
     * The [built-in Jira permissions](https://confluence.atlassian.com/x/yodKLg) are
     * listed below. Apps can also define custom permissions. See the [project
     * permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/)
     * and [global
     * permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/)
     * module documentation for more information.
     *
     * **Administration permissions**
     *
     *  *  `ADMINISTER_PROJECTS`
     *  *  `EDIT_WORKFLOW`
     *  *  `EDIT_ISSUE_LAYOUT`
     *
     * **Project permissions**
     *
     *  *  `BROWSE_PROJECTS`
     *  *  `MANAGE_SPRINTS_PERMISSION` (Jira Software only)
     *  *  `SERVICEDESK_AGENT` (Jira Service Desk only)
     *  *  `VIEW_DEV_TOOLS` (Jira Software only)
     *  *  `VIEW_READONLY_WORKFLOW`
     *
     * **Issue permissions**
     *
     *  *  `ASSIGNABLE_USER`
     *  *  `ASSIGN_ISSUES`
     *  *  `CLOSE_ISSUES`
     *  *  `CREATE_ISSUES`
     *  *  `DELETE_ISSUES`
     *  *  `EDIT_ISSUES`
     *  *  `LINK_ISSUES`
     *  *  `MODIFY_REPORTER`
     *  *  `MOVE_ISSUES`
     *  *  `RESOLVE_ISSUES`
     *  *  `SCHEDULE_ISSUES`
     *  *  `SET_ISSUE_SECURITY`
     *  *  `TRANSITION_ISSUES`
     *
     * **Voters and watchers permissions**
     *
     *  *  `MANAGE_WATCHERS`
     *  *  `VIEW_VOTERS_AND_WATCHERS`
     *
     * **Comments permissions**
     *
     *  *  `ADD_COMMENTS`
     *  *  `DELETE_ALL_COMMENTS`
     *  *  `DELETE_OWN_COMMENTS`
     *  *  `EDIT_ALL_COMMENTS`
     *  *  `EDIT_OWN_COMMENTS`
     *
     * **Attachments permissions**
     *
     *  *  `CREATE_ATTACHMENTS`
     *  *  `DELETE_ALL_ATTACHMENTS`
     *  *  `DELETE_OWN_ATTACHMENTS`
     *
     * **Time tracking permissions**
     *
     *  *  `DELETE_ALL_WORKLOGS`
     *  *  `DELETE_OWN_WORKLOGS`
     *  *  `EDIT_ALL_WORKLOGS`
     *  *  `EDIT_OWN_WORKLOGS`
     *  *  `WORK_ON_ISSUES`
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "permissionSchemes": [
     *     {
     *       "description": "description",
     *       "id": 10000,
     *       "name": "Example permission scheme",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/10000"
     *     }
     *   ]
     * }
     * ```
     */
    getAllPermissionSchemes: async ({
      expand,
      opts
    }: {
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Note that permissions are included when you
       * specify any value. Expand options include:
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
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PermissionSchemes>> => {
      return jiraRequest<PermissionSchemes>({
        path: "/rest/api/3/permissionscheme",
        method: "GET",
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a permission scheme.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "description",
     *   "id": 10000,
     *   "name": "Example permission scheme",
     *   "permissions": [
     *     {
     *       "holder": {
     *         "expand": "group",
     *         "parameter": "jira-core-users",
     *         "type": "group",
     *         "value": "ca85fac0-d974-40ca-a615-7af99c48d24f"
     *       },
     *       "id": 10000,
     *       "permission": "ADMINISTER_PROJECTS",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/permission/10000"
     *     }
     *   ],
     *   "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/10000"
     * }
     * ```
     */
    getPermissionScheme: async ({
      schemeId,
      expand,
      opts
    }: {
      /** The ID of the permission scheme to return. */
      schemeId: number;
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Note that permissions are included when you
       * specify any value. Expand options include:
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
        path: "/rest/api/3/permissionscheme/{schemeId}",
        method: "GET",
        pathParams: {
          schemeId
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
     * Returns a permission grant.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "holder": {
     *     "expand": "group",
     *     "parameter": "jira-core-users",
     *     "type": "group",
     *     "value": "ca85fac0-d974-40ca-a615-7af99c48d24f"
     *   },
     *   "id": 10000,
     *   "permission": "ADMINISTER_PROJECTS",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/permission/10000"
     * }
     * ```
     */
    getPermissionSchemeGrant: async ({
      schemeId,
      permissionId,
      expand,
      opts
    }: {
      /** The ID of the permission scheme. */
      schemeId: number;
      /** The ID of the permission grant. */
      permissionId: number;
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Note that permissions are always included when
       * you specify any value. Expand options include:
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
    } & WithRequestOpts<TClient>): Promise<JiraResult<PermissionGrant>> => {
      return jiraRequest<PermissionGrant>({
        path: "/rest/api/3/permissionscheme/{schemeId}/permission/{permissionId}",
        method: "GET",
        pathParams: {
          schemeId,
          permissionId
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
     * Returns all permission grants for a permission scheme.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "expand": "user,group,projectRole,field,all",
     *   "permissions": [
     *     {
     *       "holder": {
     *         "expand": "group",
     *         "parameter": "jira-core-users",
     *         "type": "group",
     *         "value": "ca85fac0-d974-40ca-a615-7af99c48d24f"
     *       },
     *       "id": 10000,
     *       "permission": "ADMINISTER_PROJECTS",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/permission/10000"
     *     }
     *   ]
     * }
     * ```
     */
    getPermissionSchemeGrants: async ({
      schemeId,
      expand,
      opts
    }: {
      /** The ID of the permission scheme. */
      schemeId: number;
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Note that permissions are always included when
       * you specify any value. Expand options include:
       *
       *  *  `permissions` Returns all permission grants for each permission scheme.
       *  *  `user` Returns information about the user who is granted the permission.
       *  *  `group` Returns information about the group that is granted the permission.
       *  *  `projectRole` Returns information about the project role granted the
       * permission.
       *  *  `field` Returns information about the custom field granted the permission.
       *  *  `all` Returns all expandable information.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PermissionGrants>> => {
      return jiraRequest<PermissionGrants>({
        path: "/rest/api/3/permissionscheme/{schemeId}/permission",
        method: "GET",
        pathParams: {
          schemeId
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
     * Updates a permission scheme. Below are some important things to note when using
     * this resource:
     *
     *  *  If a permissions list is present in the request, then it is set in the
     * permission scheme, overwriting *all existing* grants.
     *  *  If you want to update only the name and description, then do not send a
     * permissions list in the request.
     *  *  Sending an empty list will remove all permission grants from the permission
     * scheme.
     *
     * If you want to add or delete a permission grant instead of updating the whole
     * list, see [Create permission
     * grant](#api-rest-api-3-permissionscheme-schemeId-permission-post) or [Delete
     * permission scheme
     * entity](#api-rest-api-3-permissionscheme-schemeId-permission-permissionId-delete).
     *
     * See [About permission schemes and
     * grants](../api-group-permission-schemes/#about-permission-schemes-and-grants)
     * for more details.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the scheme is updated.
     *
     * example:
     * ```
     * {
     *   "description": "description",
     *   "id": 10000,
     *   "name": "Example permission scheme",
     *   "permissions": [
     *     {
     *       "holder": {
     *         "expand": "group",
     *         "parameter": "jira-core-users",
     *         "type": "group",
     *         "value": "ca85fac0-d974-40ca-a615-7af99c48d24f"
     *       },
     *       "id": 10000,
     *       "permission": "ADMINISTER_PROJECTS",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/permission/10000"
     *     }
     *   ],
     *   "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/10000"
     * }
     * ```
     */
    updatePermissionScheme: async ({
      schemeId,
      expand,
      permissionScheme,
      opts
    }: {
      /** The ID of the permission scheme to update. */
      schemeId: number;
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Note that permissions are always included when
       * you specify any value. Expand options include:
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
       *   "description": "description",
       *   "name": "Example permission scheme",
       *   "permissions": [
       *     {
       *       "holder": {
       *         "parameter": "jira-core-users",
       *         "type": "group",
       *         "value": "ca85fac0-d974-40ca-a615-7af99c48d24f"
       *       },
       *       "permission": "ADMINISTER_PROJECTS"
       *     }
       *   ]
       * }
       */
      permissionScheme: PermissionScheme;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PermissionScheme>> => {
      return jiraRequest<PermissionScheme>({
        path: "/rest/api/3/permissionscheme/{schemeId}",
        method: "PUT",
        pathParams: {
          schemeId
        },
        queryParams: {
          expand
        },
        body: JSON.stringify(permissionScheme),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
