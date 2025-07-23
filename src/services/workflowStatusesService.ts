import type {
  StatusDetails,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue workflow statuses. Use it to obtain a list of
 * all statuses associated with workflows and the details of a status.
 */
export default function workflowStatuses<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns a status. The status must be associated with an active workflow to be
     * returned.
     *
     * If a name is used on more than one status, only the status found first is
     * returned. Therefore, identifying the status by its ID may be preferable.
     *
     * This operation can be accessed anonymously.
     *
     * [Permissions](#permissions) required: *Browse projects* [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "The issue is currently being worked on.",
     *   "iconUrl": "https://your-domain.atlassian.net/images/icons/progress.gif",
     *   "id": "10000",
     *   "name": "In Progress",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/status/10000",
     *   "statusCategory": {
     *     "colorName": "yellow",
     *     "id": 1,
     *     "key": "in-flight",
     *     "name": "In Progress",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/1"
     *   }
     * }
     * ```
     */
    getStatus: async ({
      idOrName,
      opts
    }: {
      /** The ID or name of the status. */
      idOrName: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<StatusDetails>> => {
      return jiraRequest<StatusDetails>({
        path: "/rest/api/3/status/{idOrName}",
        method: "GET",
        pathParams: {
          idOrName
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of all statuses associated with active workflows.
     *
     * This operation can be accessed anonymously.
     *
     * [Permissions](#permissions) required: *Browse projects* [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "description": "The issue is currently being worked on.",
     *     "iconUrl": "https://your-domain.atlassian.net/images/icons/progress.gif",
     *     "id": "10000",
     *     "name": "In Progress",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/status/10000",
     *     "statusCategory": {
     *       "colorName": "yellow",
     *       "id": 1,
     *       "key": "in-flight",
     *       "name": "In Progress",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/1"
     *     }
     *   },
     *   {
     *     "description": "The issue is closed.",
     *     "iconUrl": "https://your-domain.atlassian.net/images/icons/closed.gif",
     *     "id": "5",
     *     "name": "Closed",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/status/5",
     *     "statusCategory": {
     *       "colorName": "green",
     *       "id": 9,
     *       "key": "completed",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/9"
     *     }
     *   }
     * ]
     * ```
     *
     */
    getStatuses: async ({
      opts
    }: WithRequestOpts<TClient>): Promise<JiraResult<StatusDetails[]>> => {
      return jiraRequest<StatusDetails[]>({
        path: "/rest/api/3/status",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
