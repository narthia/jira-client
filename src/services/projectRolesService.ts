import type {
  ProjectRole,
  CreateUpdateRoleRequestBean,
  ProjectRoleDetails,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the roles that users can play in projects. Use this
 * resource to get, create, update, and delete project roles.
 */
export default function projectRoles<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a new project role with no [default
     * actors](#api-rest-api-3-resolution-get). You can use the [Add default actors to
     * project role](#api-rest-api-3-role-id-actors-post) operation to add default
     * actors to the project role after creating it.
     *
     * *Note that although a new project role is available to all projects upon
     * creation, any default actors that are associated with the project role are not
     * added to projects that existed prior to the role being created.*<
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "A project role that represents developers in a project",
     *   "id": 10360,
     *   "name": "Developers",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360"
     * }
     * ```
     */
    createProjectRole: async ({
      createUpdateRoleRequestBean,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "A project role that represents developers in a project",
       *   "name": "Developers"
       * }
       */
      createUpdateRoleRequestBean: CreateUpdateRoleRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRole>> => {
      return jiraRequest<ProjectRole>({
        path: "/rest/api/3/role",
        method: "POST",
        body: JSON.stringify(createUpdateRoleRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a project role. You must specify a replacement project role if you wish
     * to delete a project role that is in use.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteProjectRole: async ({
      id,
      swap,
      opts
    }: {
      /**
       * The ID of the project role to delete. Use [Get all project
       * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
       */
      id: number;
      /**
       * The ID of the project role that will replace the one being deleted. The swap
       * will attempt to swap the role in schemes (notifications, permissions, issue
       * security), workflows, worklogs and comments.
       */
      swap?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/role/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          swap
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates the project role's name and description. You must include both a name
     * and a description in the request.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "actors": [
     *     {
     *       "actorGroup": {
     *         "displayName": "jira-developers",
     *         "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2",
     *         "name": "jira-developers"
     *       },
     *       "displayName": "jira-developers",
     *       "id": 10240,
     *       "name": "jira-developers",
     *       "type": "atlassian-group-role-actor",
     *       "user": "jira-developers"
     *     },
     *     {
     *       "actorUser": {
     *         "accountId": "5b10a2844c20165700ede21g"
     *       },
     *       "displayName": "Mia Krystof",
     *       "id": 10241,
     *       "type": "atlassian-user-role-actor"
     *     }
     *   ],
     *   "description": "A project role that represents developers in a project",
     *   "id": 10360,
     *   "name": "Developers",
     *   "scope": {
     *     "project": {
     *       "id": "10000",
     *       "key": "KEY",
     *       "name": "Next Gen Project"
     *     },
     *     "type": "PROJECT"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360"
     * }
     * ```
     */
    fullyUpdateProjectRole: async ({
      id,
      createUpdateRoleRequestBean,
      opts
    }: {
      /**
       * The ID of the project role. Use [Get all project
       * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
       */
      id: number;
      /**
       * @example
       * {
       *   "description": "A project role that represents developers in a project",
       *   "name": "Developers"
       * }
       */
      createUpdateRoleRequestBean: CreateUpdateRoleRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRole>> => {
      return jiraRequest<ProjectRole>({
        path: "/rest/api/3/role/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(createUpdateRoleRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Gets a list of all project roles, complete with project role details and
     * default actors.
     *
     * ### About project roles ###
     *
     * [Project
     * roles](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/)
     * are a flexible way to to associate users and groups with projects. In Jira
     * Cloud, the list of project roles is shared globally with all projects, but each
     * project can have a different set of actors associated with it (unlike groups,
     * which have the same membership throughout all Jira applications).
     *
     * Project roles are used in [permission
     * schemes](#api-rest-api-3-permissionscheme-get), [email notification
     * schemes](#api-rest-api-3-notificationscheme-get), [issue security
     * levels](#api-rest-api-3-issuesecurityschemes-get), [comment
     * visibility](#api-rest-api-3-comment-list-post), and workflow conditions.
     *
     * #### Members and actors ####
     *
     * In the Jira REST API, a member of a project role is called an *actor*. An
     * *actor* is a group or user associated with a project role.
     *
     * Actors may be set as [default
     * members](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/#Specifying-'default-members'-for-a-project-role)
     * of the project role or set at the project level:
     *
     *  *  Default actors: Users and groups that are assigned to the project role for
     * all newly created projects. The default actors can be removed at the project
     * level later if desired.
     *  *  Actors: Users and groups that are associated with a project role for a
     * project, which may differ from the default actors. This enables you to assign a
     * user to different roles in different projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "actors": [
     *       {
     *         "actorGroup": {
     *           "displayName": "jira-developers",
     *           "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2",
     *           "name": "jira-developers"
     *         },
     *         "displayName": "jira-developers",
     *         "id": 10240,
     *         "name": "jira-developers",
     *         "type": "atlassian-group-role-actor",
     *         "user": "jira-developers"
     *       },
     *       {
     *         "actorUser": {
     *           "accountId": "5b10a2844c20165700ede21g"
     *         },
     *         "displayName": "Mia Krystof",
     *         "id": 10241,
     *         "type": "atlassian-user-role-actor"
     *       }
     *     ],
     *     "description": "A project role that represents developers in a project",
     *     "id": 10360,
     *     "name": "Developers",
     *     "scope": {
     *       "project": {
     *         "id": "10000",
     *         "key": "KEY",
     *         "name": "Next Gen Project"
     *       },
     *       "type": "PROJECT"
     *     },
     *     "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360"
     *   }
     * ]
     * ```
     *
     */
    getAllProjectRoles: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<ProjectRole[]>
    > => {
      return jiraRequest<ProjectRole[]>({
        path: "/rest/api/3/role",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a project role's details and actors associated with the project. The
     * list of actors is sorted by display name.
     *
     * To check whether a user belongs to a role based on their group memberships, use
     * [Get user](#api-rest-api-3-user-get) with the `groups` expand parameter
     * selected. Then check whether the user keys and groups match with the actors
     * returned for the project.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project or
     * *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "actors": [
     *     {
     *       "actorGroup": {
     *         "displayName": "jira-developers",
     *         "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2",
     *         "name": "jira-developers"
     *       },
     *       "displayName": "jira-developers",
     *       "id": 10240,
     *       "name": "jira-developers",
     *       "type": "atlassian-group-role-actor",
     *       "user": "jira-developers"
     *     },
     *     {
     *       "actorUser": {
     *         "accountId": "5b10a2844c20165700ede21g"
     *       },
     *       "displayName": "Mia Krystof",
     *       "id": 10241,
     *       "type": "atlassian-user-role-actor"
     *     }
     *   ],
     *   "description": "A project role that represents developers in a project",
     *   "id": 10360,
     *   "name": "Developers",
     *   "scope": {
     *     "project": {
     *       "id": "10000",
     *       "key": "KEY",
     *       "name": "Next Gen Project"
     *     },
     *     "type": "PROJECT"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360"
     * }
     * ```
     */
    getProjectRole: async ({
      projectIdOrKey,
      id,
      excludeInactiveUsers,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * The ID of the project role. Use [Get all project
       * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
       */
      id: number;
      /** Exclude inactive users. */
      excludeInactiveUsers?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRole>> => {
      return jiraRequest<ProjectRole>({
        path: "/rest/api/3/project/{projectIdOrKey}/role/{id}",
        method: "GET",
        pathParams: {
          projectIdOrKey,
          id
        },
        queryParams: {
          excludeInactiveUsers
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Gets the project role details and the default actors associated with the role.
     * The list of default actors is sorted by display name.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "actors": [
     *     {
     *       "actorGroup": {
     *         "displayName": "jira-developers",
     *         "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2",
     *         "name": "jira-developers"
     *       },
     *       "displayName": "jira-developers",
     *       "id": 10240,
     *       "name": "jira-developers",
     *       "type": "atlassian-group-role-actor",
     *       "user": "jira-developers"
     *     },
     *     {
     *       "actorUser": {
     *         "accountId": "5b10a2844c20165700ede21g"
     *       },
     *       "displayName": "Mia Krystof",
     *       "id": 10241,
     *       "type": "atlassian-user-role-actor"
     *     }
     *   ],
     *   "description": "A project role that represents developers in a project",
     *   "id": 10360,
     *   "name": "Developers",
     *   "scope": {
     *     "project": {
     *       "id": "10000",
     *       "key": "KEY",
     *       "name": "Next Gen Project"
     *     },
     *     "type": "PROJECT"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360"
     * }
     * ```
     */
    getProjectRoleById: async ({
      id,
      opts
    }: {
      /**
       * The ID of the project role. Use [Get all project
       * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
       */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRole>> => {
      return jiraRequest<ProjectRole>({
        path: "/rest/api/3/role/{id}",
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
     * Returns all [project
     * roles](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/)
     * and the details for each role. Note that the list of project roles is common to
     * all projects.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360",
     *     "name": "Developers",
     *     "id": 10360,
     *     "description": "A project role that represents developers in a project",
     *     "admin": false,
     *     "default": true,
     *     "roleConfigurable": true,
     *     "translatedName": "Developers"
     *   }
     * ]
     * ```
     *
     */
    getProjectRoleDetails: async ({
      projectIdOrKey,
      currentMember,
      excludeConnectAddons,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * Whether the roles should be filtered to include only those the user is assigned
       * to.
       */
      currentMember?: boolean;
      excludeConnectAddons?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRoleDetails[]>> => {
      return jiraRequest<ProjectRoleDetails[]>({
        path: "/rest/api/3/project/{projectIdOrKey}/roledetails",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        queryParams: {
          currentMember,
          excludeConnectAddons
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of [project
     * roles](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/)
     * for the project returning the name and self URL for each role.
     *
     * Note that all project roles are shared with all projects in Jira Cloud. See
     * [Get all project roles](#api-rest-api-3-role-get) for more information.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for any project on the
     * site or *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "Administrators": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10002",
     *   "Developers": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10000",
     *   "Users": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10001"
     * }
     * ```
     */
    getProjectRoles: async ({
      projectIdOrKey,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        [key: string]: string;
      }>
    > => {
      return jiraRequest<{
        [key: string]: string;
      }>({
        path: "/rest/api/3/project/{projectIdOrKey}/role",
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
     * Updates either the project role's name or its description.
     *
     * You cannot update both the name and description at the same time using this
     * operation. If you send a request with a name and a description only the name is
     * updated.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "actors": [
     *     {
     *       "actorGroup": {
     *         "displayName": "jira-developers",
     *         "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2",
     *         "name": "jira-developers"
     *       },
     *       "displayName": "jira-developers",
     *       "id": 10240,
     *       "name": "jira-developers",
     *       "type": "atlassian-group-role-actor",
     *       "user": "jira-developers"
     *     },
     *     {
     *       "actorUser": {
     *         "accountId": "5b10a2844c20165700ede21g"
     *       },
     *       "displayName": "Mia Krystof",
     *       "id": 10241,
     *       "type": "atlassian-user-role-actor"
     *     }
     *   ],
     *   "description": "A project role that represents developers in a project",
     *   "id": 10360,
     *   "name": "Developers",
     *   "scope": {
     *     "project": {
     *       "id": "10000",
     *       "key": "KEY",
     *       "name": "Next Gen Project"
     *     },
     *     "type": "PROJECT"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360"
     * }
     * ```
     */
    partialUpdateProjectRole: async ({
      id,
      createUpdateRoleRequestBean,
      opts
    }: {
      /**
       * The ID of the project role. Use [Get all project
       * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
       */
      id: number;
      /**
       * @example
       * {
       *   "description": "A project role that represents developers in a project",
       *   "name": "Developers"
       * }
       */
      createUpdateRoleRequestBean: CreateUpdateRoleRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRole>> => {
      return jiraRequest<ProjectRole>({
        path: "/rest/api/3/role/{id}",
        method: "POST",
        pathParams: {
          id
        },
        body: JSON.stringify(createUpdateRoleRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
