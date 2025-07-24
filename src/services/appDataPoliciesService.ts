import type {
  ProjectDataPolicies,
  WorkspaceDataPolicy,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/** This resource represents app access rule data policies. */
export default function appDataPolicies<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns data policies for the projects specified in the request.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "projectDataPolicies": [
     *     {
     *       "dataPolicy": {
     *         "anyContentBlocked": false
     *       },
     *       "id": 1000
     *     },
     *     {
     *       "dataPolicy": {
     *         "anyContentBlocked": true
     *       },
     *       "id": 1001
     *     }
     *   ]
     * }
     * ```
     */
    getPolicies: async ({
      ids,
      opts
    }: {
      /** A list of project identifiers. This parameter accepts a comma-separated list. */
      ids?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectDataPolicies>> => {
      return jiraRequest<ProjectDataPolicies>({
        path: "/rest/api/3/data-policy/project",
        method: "GET",
        queryParams: {
          ids
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns data policy for the workspace.
     *
     * @returns Returned if the request is successful
     *
     * example:
     * ```
     * {
     *   "anyContentBlocked": false
     * }
     * ```
     */
    getPolicy: async ({
      opts
    }: {} & WithRequestOpts<TClient>): Promise<JiraResult<WorkspaceDataPolicy>> => {
      return jiraRequest<WorkspaceDataPolicy>({
        path: "/rest/api/3/data-policy",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
