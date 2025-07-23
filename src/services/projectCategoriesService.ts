import type {
  ProjectCategory,
  UpdatedProjectCategory,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents project categories. Use it to create, update, and
 * delete project categories as well as obtain a list of all project categories
 * and details of individual categories. For more information on managing project
 * categories, see [Adding, assigning, and deleting project
 * categories](https://confluence.atlassian.com/x/-A5WMg).
 */
export default function projectCategories<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a project category.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "Created Project Category",
     *   "id": "10100",
     *   "name": "CREATED",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10100"
     * }
     * ```
     */
    createProjectCategory: async ({
      projectCategory,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "Created Project Category",
       *   "name": "CREATED"
       * }
       */
      projectCategory: ProjectCategory;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectCategory>> => {
      return jiraRequest<ProjectCategory>({
        path: "/rest/api/3/projectCategory",
        method: "POST",
        body: JSON.stringify(projectCategory),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all project categories.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "description": "First Project Category",
     *     "id": "10000",
     *     "name": "FIRST",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *   },
     *   {
     *     "description": "Second Project Category",
     *     "id": "10001",
     *     "name": "SECOND",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10001"
     *   }
     * ]
     * ```
     *
     */
    getAllProjectCategories: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<ProjectCategory[]>
    > => {
      return jiraRequest<ProjectCategory[]>({
        path: "/rest/api/3/projectCategory",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a project category.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "First Project Category",
     *   "id": "10000",
     *   "name": "FIRST",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     * }
     * ```
     */
    getProjectCategoryById: async ({
      id,
      opts
    }: {
      /** The ID of the project category. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectCategory>> => {
      return jiraRequest<ProjectCategory>({
        path: "/rest/api/3/projectCategory/{id}",
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
     * Deletes a project category.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    removeProjectCategory: async ({
      id,
      opts
    }: {
      /** ID of the project category to delete. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/projectCategory/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates a project category.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateProjectCategory: async ({
      id,
      projectCategory,
      opts
    }: {
      id: number;
      /**
       * @example
       * {
       *   "description": "Updated Project Category",
       *   "name": "UPDATED"
       * }
       */
      projectCategory: ProjectCategory;
    } & WithRequestOpts<TClient>): Promise<JiraResult<UpdatedProjectCategory>> => {
      return jiraRequest<UpdatedProjectCategory>({
        path: "/rest/api/3/projectCategory/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(projectCategory),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
