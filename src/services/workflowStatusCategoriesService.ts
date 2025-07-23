import type {
  StatusCategory,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents status categories. Use it to obtain a list of all
 * status categories and the details of a category. Status categories provided a
 * mechanism for categorizing [statuses](#api-group-Workflow-statuses).
 */
export default function workflowStatusCategories<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns a list of all status categories.
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
     *     "colorName": "yellow",
     *     "id": 1,
     *     "key": "in-flight",
     *     "name": "In Progress",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/1"
     *   },
     *   {
     *     "colorName": "green",
     *     "id": 9,
     *     "key": "completed",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/9"
     *   }
     * ]
     * ```
     *
     */
    getStatusCategories: async ({
      opts
    }: WithRequestOpts<TClient>): Promise<JiraResult<StatusCategory[]>> => {
      return jiraRequest<StatusCategory[]>({
        path: "/rest/api/3/statuscategory",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a status category. Status categories provided a mechanism for
     * categorizing [statuses](#api-rest-api-3-status-idOrName-get).
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "colorName": "yellow",
     *   "id": 1,
     *   "key": "in-flight",
     *   "name": "In Progress",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/1"
     * }
     * ```
     */
    getStatusCategory: async ({
      idOrKey,
      opts
    }: {
      /** The ID or key of the status category. */
      idOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<StatusCategory>> => {
      return jiraRequest<StatusCategory>({
        path: "/rest/api/3/statuscategory/{idOrKey}",
        method: "GET",
        pathParams: {
          idOrKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
