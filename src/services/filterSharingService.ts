import type {
  SharePermission,
  SharePermissionInputBean,
  DefaultShareScope,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents options for sharing [filters](#api-group-Filters). Use
 * it to get share scopes as well as add and remove share scopes from filters.
 */
export default function filterSharing<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Add a share permissions to a filter. If you add a global share permission (one
     * for all logged-in users or the public) it will overwrite all share permissions
     * for the filter.
     *
     * Be aware that this operation uses different objects for updating share
     * permissions compared to [Update filter](#api-rest-api-3-filter-id-put).
     *
     * **[Permissions](#permissions) required:** *Share dashboards and filters*
     * [global permission](https://confluence.atlassian.com/x/x4dKLg) and the user
     * must own the filter.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "id": 10000,
     *     "type": "global"
     *   },
     *   {
     *     "id": 10010,
     *     "project": {
     *       "avatarUrls": {
     *         "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *         "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *         "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *         "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *       },
     *       "id": "10000",
     *       "insight": {
     *         "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *         "totalIssueCount": 100
     *       },
     *       "key": "EX",
     *       "name": "Example",
     *       "projectCategory": {
     *         "description": "First Project Category",
     *         "id": "10000",
     *         "name": "FIRST",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *       },
     *       "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *       "simplified": false,
     *       "style": "classic"
     *     },
     *     "type": "project"
     *   },
     *   {
     *     "id": 10010,
     *     "project": {
     *       "avatarUrls": {
     *         "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10002",
     *         "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10002",
     *         "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10002",
     *         "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10002"
     *       },
     *       "deleted": true,
     *       "deletedBy": {
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
     *       "deletedDate": "2022-11-11T13:35:29.000+0000",
     *       "id": "10002",
     *       "insight": {
     *         "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *         "totalIssueCount": 100
     *       },
     *       "key": "MKY",
     *       "name": "Example",
     *       "projectCategory": {
     *         "description": "First Project Category",
     *         "id": "10000",
     *         "name": "FIRST",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *       },
     *       "retentionTillDate": "2023-01-10T13:35:29.000+0000",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY",
     *       "simplified": false,
     *       "style": "classic"
     *     },
     *     "role": {
     *       "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360",
     *       "name": "Developers",
     *       "id": 10360,
     *       "description": "A project role that represents developers in a project",
     *       "actors": [
     *         {
     *           "actorGroup": {
     *             "name": "jira-developers",
     *             "displayName": "jira-developers",
     *             "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
     *           },
     *           "displayName": "jira-developers",
     *           "id": 10240,
     *           "name": "jira-developers",
     *           "type": "atlassian-group-role-actor"
     *         },
     *         {
     *           "actorUser": {
     *             "accountId": "5b10a2844c20165700ede21g"
     *           },
     *           "displayName": "Mia Krystof",
     *           "id": 10241,
     *           "type": "atlassian-user-role-actor"
     *         }
     *       ],
     *       "scope": {
     *         "project": {
     *           "id": "10000",
     *           "key": "KEY",
     *           "name": "Next Gen Project"
     *         },
     *         "type": "PROJECT"
     *       }
     *     },
     *     "type": "project"
     *   },
     *   {
     *     "group": {
     *       "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
     *       "name": "jira-administrators",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/group?groupId=276f955c-63d7-42c8-9520-92d01dca0625"
     *     },
     *     "id": 10010,
     *     "type": "group"
     *   }
     * ]
     * ```
     *
     */
    addSharePermission: async ({
      id,
      sharePermissionInputBean,
      opts
    }: {
      /** The ID of the filter. */
      id: number;
      /**
       * @example
       * {
       *   "groupname": "jira-administrators",
       *   "rights": 1,
       *   "type": "group"
       * }
       */
      sharePermissionInputBean: SharePermissionInputBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SharePermission[]>> => {
      return jiraRequest<SharePermission[]>({
        path: "/rest/api/3/filter/{id}/permission",
        method: "POST",
        pathParams: {
          id
        },
        body: JSON.stringify(sharePermissionInputBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a share permission from a filter.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira and the
     * user must own the filter.
     */
    deleteSharePermission: async ({
      id,
      permissionId,
      opts
    }: {
      /** The ID of the filter. */
      id: number;
      /** The ID of the share permission. */
      permissionId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/filter/{id}/permission/{permissionId}",
        method: "DELETE",
        pathParams: {
          id,
          permissionId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the default sharing settings for new filters and dashboards for a user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "scope": "GLOBAL"
     * }
     * ```
     */
    getDefaultShareScope: async ({
      opts
    }: WithRequestOpts<TClient>): Promise<JiraResult<DefaultShareScope>> => {
      return jiraRequest<DefaultShareScope>({
        path: "/rest/api/3/filter/defaultShareScope",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a share permission for a filter. A filter can be shared with groups,
     * projects, all logged-in users, or the public. Sharing with all logged-in users
     * or the public is known as a global share permission.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None, however, a share permission is
     * only returned for:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": 10000,
     *   "type": "global"
     * }
     * ```
     */
    getSharePermission: async ({
      id,
      permissionId,
      opts
    }: {
      /** The ID of the filter. */
      id: number;
      /** The ID of the share permission. */
      permissionId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SharePermission>> => {
      return jiraRequest<SharePermission>({
        path: "/rest/api/3/filter/{id}/permission/{permissionId}",
        method: "GET",
        pathParams: {
          id,
          permissionId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the share permissions for a filter. A filter can be shared with groups,
     * projects, all logged-in users, or the public. Sharing with all logged-in users
     * or the public is known as a global share permission.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None, however, share permissions are
     * only returned for:
     *
     *  *  filters owned by the user.
     *  *  filters shared with a group that the user is a member of.
     *  *  filters shared with a private project that the user has *Browse projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for.
     *  *  filters shared with a public project.
     *  *  filters shared with the public.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "id": 10000,
     *     "type": "global"
     *   },
     *   {
     *     "id": 10010,
     *     "project": {
     *       "avatarUrls": {
     *         "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *         "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *         "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *         "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *       },
     *       "id": "10000",
     *       "insight": {
     *         "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *         "totalIssueCount": 100
     *       },
     *       "key": "EX",
     *       "name": "Example",
     *       "projectCategory": {
     *         "description": "First Project Category",
     *         "id": "10000",
     *         "name": "FIRST",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *       },
     *       "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *       "simplified": false,
     *       "style": "classic"
     *     },
     *     "type": "project"
     *   },
     *   {
     *     "id": 10010,
     *     "project": {
     *       "avatarUrls": {
     *         "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10002",
     *         "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10002",
     *         "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10002",
     *         "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10002"
     *       },
     *       "deleted": true,
     *       "deletedBy": {
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
     *       "deletedDate": "2022-11-11T13:35:29.000+0000",
     *       "id": "10002",
     *       "insight": {
     *         "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *         "totalIssueCount": 100
     *       },
     *       "key": "MKY",
     *       "name": "Example",
     *       "projectCategory": {
     *         "description": "First Project Category",
     *         "id": "10000",
     *         "name": "FIRST",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *       },
     *       "retentionTillDate": "2023-01-10T13:35:29.000+0000",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY",
     *       "simplified": false,
     *       "style": "classic"
     *     },
     *     "role": {
     *       "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360",
     *       "name": "Developers",
     *       "id": 10360,
     *       "description": "A project role that represents developers in a project",
     *       "actors": [
     *         {
     *           "actorGroup": {
     *             "name": "jira-developers",
     *             "displayName": "jira-developers",
     *             "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
     *           },
     *           "displayName": "jira-developers",
     *           "id": 10240,
     *           "name": "jira-developers",
     *           "type": "atlassian-group-role-actor"
     *         },
     *         {
     *           "actorUser": {
     *             "accountId": "5b10a2844c20165700ede21g"
     *           },
     *           "displayName": "Mia Krystof",
     *           "id": 10241,
     *           "type": "atlassian-user-role-actor"
     *         }
     *       ],
     *       "scope": {
     *         "project": {
     *           "id": "10000",
     *           "key": "KEY",
     *           "name": "Next Gen Project"
     *         },
     *         "type": "PROJECT"
     *       }
     *     },
     *     "type": "project"
     *   },
     *   {
     *     "group": {
     *       "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
     *       "name": "jira-administrators",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/group?groupId=276f955c-63d7-42c8-9520-92d01dca0625"
     *     },
     *     "id": 10010,
     *     "type": "group"
     *   }
     * ]
     * ```
     *
     */
    getSharePermissions: async ({
      id,
      opts
    }: {
      /** The ID of the filter. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SharePermission[]>> => {
      return jiraRequest<SharePermission[]>({
        path: "/rest/api/3/filter/{id}/permission",
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
     * Sets the default sharing for new filters and dashboards for a user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "scope": "GLOBAL"
     * }
     * ```
     */
    setDefaultShareScope: async ({
      defaultShareScope,
      opts
    }: {
      /**
       * @example
       * {
       *   "scope": "GLOBAL"
       * }
       */
      defaultShareScope: DefaultShareScope;
    } & WithRequestOpts<TClient>): Promise<JiraResult<DefaultShareScope>> => {
      return jiraRequest<DefaultShareScope>({
        path: "/rest/api/3/filter/defaultShareScope",
        method: "PUT",
        body: JSON.stringify(defaultShareScope),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
