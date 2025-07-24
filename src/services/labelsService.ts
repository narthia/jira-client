import type {
  PageBeanString,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents available labels. Use it to get available labels for
 * the global label field.
 */
export default function labels<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns a [paginated](#pagination) list of labels.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "startAt": 0,
     *   "total": 100,
     *   "values": [
     *     "performance",
     *     "security"
     *   ]
     * }
     * ```
     */
    getAllLabels: async ({
      startAt,
      maxResults,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanString>> => {
      return jiraRequest<PageBeanString>({
        path: "/rest/api/3/label",
        method: "GET",
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
