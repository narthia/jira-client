import type {
  PagedDtoAssetsWorkspaceDto,
  PagedDtoInsightWorkspaceDto,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents Assets workspaces. Use it to:
 *
 * * Get a list of Assets workspace IDs
 * * Access Assets REST APIs through workspace IDs
 */
export default function assets<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns a list of Assets workspace IDs. Include a workspace ID in the path to
     * access the [Assets REST
     * APIs](https://developer.atlassian.com/cloud/assets/rest).
     *
     * **[Permissions](#permissions) required**: Any
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "_expands": [],
     *   "size": 1,
     *   "start": 1,
     *   "limit": 1,
     *   "isLastPage": true,
     *   "_links": {
     *     "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
     *     "context": "context",
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/rest/servicedeskapi/assets/workspace?start=2&limit=1",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/rest/servicedeskapi/assets/workspace?start=0&limit=1"
     *   },
     *   "values": [
     *     {
     *       "workspaceId": "1060ba0e-178b-4e0e-g0h1-jedb02cccb5f"
     *     }
     *   ]
     * }
     * ```
     */
    getAssetsWorkspaces: async ({
      start,
      limit,
      opts
    }: {
      /**
       * The starting index of the returned workspace IDs. Base index: 0 See the
       * [Pagination](#pagination) section for more details.
       */
      start?: number;
      /**
       * The maximum number of workspace IDs to return per page. Default: 50 See the
       * [Pagination](#pagination) section for more details.
       */
      limit?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PagedDtoAssetsWorkspaceDto>> => {
      return jiraRequest<PagedDtoAssetsWorkspaceDto>({
        path: "/rest/servicedeskapi/assets/workspace",
        method: "GET",
        queryParams: {
          start,
          limit
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * This endpoint is deprecated, please use /assets/workspace/.
     *
     * @returns 200 response
     */
    getInsightWorkspaces: async ({
      start,
      limit,
      opts
    }: {
      start?: number;
      limit?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PagedDtoInsightWorkspaceDto>> => {
      return jiraRequest<PagedDtoInsightWorkspaceDto>({
        path: "/rest/servicedeskapi/insight/workspace",
        method: "GET",
        queryParams: {
          start,
          limit
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
