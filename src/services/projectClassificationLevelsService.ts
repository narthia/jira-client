import type {
  UpdateDefaultProjectClassificationBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents classification levels used in a project. Use it to
 * view and manage classification levels in your projects.
 */
export default function projectClassificationLevels<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns the default data classification for a project.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "classification": {
     *     "id": "ari:cloud:platform::classification-tag/5bfa70f7-4af1-44f5-9e12-1ce185f15a38",
     *     "status": "published",
     *     "name": "Restricted",
     *     "rank": 1,
     *     "description": "Data we hold that would be very damaging and would cause loss of trust with customers and present legal risk if mishandled",
     *     "guideline": "Access to data must be restricted to only individuals who need access in order to perform their job duties.",
     *     "color": "RED"
     *   }
     * }
     * ```
     */
    getDefaultProjectClassification: async ({
      projectIdOrKey,
      opts
    }: {
      /** The project ID or project key (case-sensitive). */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/project/{projectIdOrKey}/classification-level/default",
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
     * Remove the default data classification level for a project.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    removeDefaultProjectClassification: async ({
      projectIdOrKey,
      opts
    }: {
      /** The project ID or project key (case-sensitive). */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectIdOrKey}/classification-level/default",
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
     * Updates the default data classification level for a project.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  *Administer jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateDefaultProjectClassification: async ({
      projectIdOrKey,
      updateDefaultProjectClassificationBean,
      opts
    }: {
      /** The project ID or project key (case-sensitive). */
      projectIdOrKey: string;
      /**
       * @example
       * {
       *   "id": "ari:cloud:platform::classification-tag/dec24c48-5073-4c25-8fef-9d81a992c30c"
       * }
       */
      updateDefaultProjectClassificationBean: UpdateDefaultProjectClassificationBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectIdOrKey}/classification-level/default",
        method: "PUT",
        pathParams: {
          projectIdOrKey
        },
        body: JSON.stringify(updateDefaultProjectClassificationBean),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
