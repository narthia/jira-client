import type {
  ProjectRole,
  ProjectRoleActorsUpdateBean,
  ActorsMap,
  ActorInputBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the users assigned to [project
 * roles](#api-group-Issue-comments). Use it to get, add, and remove default users
 * from project roles. Also use it to add and remove users from a project role
 * associated with a project.
 */
export default function projectRoleActors<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds actors to a project role for the project.
     *
     * To replace all actors for the project, use [Set actors for project
     * role](#api-rest-api-3-project-projectIdOrKey-role-id-put).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project or
     * *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful. The complete list of actors for the project is returned.
     *
     * For example, the cURL request above adds a group, *jira-developers*. For the response below to be returned as a result of that request, the user *Mia Krystof* would have previously been added as a `user` actor for this project.
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
    addActorUsers: async ({
      projectIdOrKey,
      id,
      actorsMap,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * The ID of the project role. Use [Get all project
       * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
       */
      id: number;
      /**
       * The groups or users to associate with the project role for this project.
       * Provide the user account ID, group name, or group ID. As a group's name can
       * change, use of group ID is recommended.
       *
       * @example
       * {
       *   "groupId": [
       *     "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
       *   ]
       * }
       */
      actorsMap: ActorsMap;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRole>> => {
      return jiraRequest<ProjectRole>({
        path: "/rest/api/3/project/{projectIdOrKey}/role/{id}",
        method: "POST",
        pathParams: {
          projectIdOrKey,
          id
        },
        body: JSON.stringify(actorsMap),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Adds [default actors](#api-rest-api-3-resolution-get) to a role. You may add
     * groups or users, but you cannot add groups and users in the same request.
     *
     * Changing a project role's default actors does not affect project role members
     * for projects already created.
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
     *         "name": "jira-developers",
     *         "displayName": "jira-developers",
     *         "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
     *       },
     *       "displayName": "jira-developers",
     *       "id": 10240,
     *       "name": "jira-developers",
     *       "type": "atlassian-group-role-actor"
     *     }
     *   ]
     * }
     * ```
     */
    addProjectRoleActorsToRole: async ({
      id,
      actorInputBean,
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
       *   "user": [
       *     "admin"
       *   ]
       * }
       */
      actorInputBean: ActorInputBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRole>> => {
      return jiraRequest<ProjectRole>({
        path: "/rest/api/3/role/{id}/actors",
        method: "POST",
        pathParams: {
          id
        },
        body: JSON.stringify(actorInputBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes actors from a project role for the project.
     *
     * To remove default actors from the project role, use [Delete default actors from
     * project role](#api-rest-api-3-role-id-actors-delete).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project or
     * *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteActor: async ({
      projectIdOrKey,
      id,
      user,
      group,
      groupId,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * The ID of the project role. Use [Get all project
       * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
       */
      id: number;
      /** The user account ID of the user to remove from the project role. */
      user?: string;
      /**
       * The name of the group to remove from the project role. This parameter cannot be
       * used with the `groupId` parameter. As a group's name can change, use of
       * `groupId` is recommended.
       */
      group?: string;
      /**
       * The ID of the group to remove from the project role. This parameter cannot be
       * used with the `group` parameter.
       */
      groupId?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectIdOrKey}/role/{id}",
        method: "DELETE",
        pathParams: {
          projectIdOrKey,
          id
        },
        queryParams: {
          user,
          group,
          groupId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes the [default actors](#api-rest-api-3-resolution-get) from a project
     * role. You may delete a group or user, but you cannot delete a group and a user
     * in the same request.
     *
     * Changing a project role's default actors does not affect project role members
     * for projects already created.
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
     *         "name": "jira-developers",
     *         "displayName": "jira-developers",
     *         "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
     *       },
     *       "displayName": "jira-developers",
     *       "id": 10240,
     *       "name": "jira-developers",
     *       "type": "atlassian-group-role-actor"
     *     }
     *   ]
     * }
     * ```
     */
    deleteProjectRoleActorsFromRole: async ({
      id,
      user,
      groupId,
      group,
      opts
    }: {
      /**
       * The ID of the project role. Use [Get all project
       * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
       */
      id: number;
      /** The user account ID of the user to remove as a default actor. */
      user?: string;
      /**
       * The group ID of the group to be removed as a default actor. This parameter
       * cannot be used with the `group` parameter.
       */
      groupId?: string;
      /**
       * The group name of the group to be removed as a default actor.This parameter
       * cannot be used with the `groupId` parameter. As a group's name can change, use
       * of `groupId` is recommended.
       */
      group?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRole>> => {
      return jiraRequest<ProjectRole>({
        path: "/rest/api/3/role/{id}/actors",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          user,
          groupId,
          group
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the [default actors](#api-rest-api-3-resolution-get) for the project
     * role.
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
     *         "name": "jira-developers",
     *         "displayName": "jira-developers",
     *         "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
     *       },
     *       "displayName": "jira-developers",
     *       "id": 10240,
     *       "name": "jira-developers",
     *       "type": "atlassian-group-role-actor"
     *     }
     *   ]
     * }
     * ```
     */
    getProjectRoleActorsForRole: async ({
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
        path: "/rest/api/3/role/{id}/actors",
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
     * Sets the actors for a project role for a project, replacing all existing actors.
     *
     * To add actors to the project without overwriting the existing list, use [Add
     * actors to project role](#api-rest-api-3-project-projectIdOrKey-role-id-post).
     *
     * **[Permissions](#permissions) required:** *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project or
     * *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful. The complete list of actors for the project is returned.
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
    setActors: async ({
      projectIdOrKey,
      id,
      projectRoleActorsUpdateBean,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * The ID of the project role. Use [Get all project
       * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
       */
      id: number;
      /**
       * The groups or users to associate with the project role for this project.
       * Provide the user account ID, group name, or group ID. As a group's name can
       * change, use of group ID is recommended.
       *
       * @example
       * {
       *   "categorisedActors": {
       *     "atlassian-group-role-actor-id": [
       *       "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
       *     ],
       *     "atlassian-user-role-actor": [
       *       "12345678-9abc-def1-2345-6789abcdef12"
       *     ]
       *   }
       * }
       */
      projectRoleActorsUpdateBean: ProjectRoleActorsUpdateBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectRole>> => {
      return jiraRequest<ProjectRole>({
        path: "/rest/api/3/project/{projectIdOrKey}/role/{id}",
        method: "PUT",
        pathParams: {
          projectIdOrKey,
          id
        },
        body: JSON.stringify(projectRoleActorsUpdateBean),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
