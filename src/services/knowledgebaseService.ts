import type {
  PagedDtoArticleDto,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents Jira Service Management knowledge base. Use it to:
 *
 * * search for articles across all service desks
 * * retrieve article content and metadata
 */
export default function knowledgebase<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns articles which match the given query string across all service desks.
     *
     * **[Permissions](#permissions) required**: Permission to access the [customer
     * portal](https://confluence.atlassian.com/servicedeskcloud/configuring-the-customer-portal-732528918.html).
     *
     * @returns Returns the articles, on the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "_expands": [],
     *   "size": 2,
     *   "start": 2,
     *   "limit": 2,
     *   "isLastPage": false,
     *   "_links": {
     *     "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
     *     "context": "context",
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/knowledgebase/article?start=4&limit=2",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/knowledgebase/article?start=0&limit=2"
     *   },
     *   "values": [
     *     {
     *       "title": "Stolen computer",
     *       "excerpt": "assuming your computer was stolen",
     *       "source": {
     *         "type": "confluence",
     *         "pageId": "8786177",
     *         "spaceKey": "IT"
     *       },
     *       "content": {
     *         "iframeSrc": "https://your-domain.atlassian.net/rest/servicedeskapi/knowledgebase/article/view/8786177"
     *       }
     *     },
     *     {
     *       "title": "Upgrading computer",
     *       "excerpt": "each computer older then 3 years can be upgraded",
     *       "source": {
     *         "type": "confluence",
     *         "pageId": "8785228",
     *         "spaceKey": "IT"
     *       },
     *       "content": {
     *         "iframeSrc": "https://your-domain.atlassian.net/rest/servicedeskapi/knowledgebase/article/view/8785228"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getArticles: async ({
      query,
      highlight,
      start,
      limit,
      cursor,
      prev,
      opts
    }: {
      /** The string used to filter the articles (required). */
      query: string;
      /**
       * If set to true matching query term in the title and excerpt will be highlighted
       * using the `@@@hl@@@term@@@endhl@@@` syntax. Default: false.
       */
      highlight: boolean;
      /** (Deprecated) The starting index of the returned objects. Base index: 0. */
      start?: number;
      /** The maximum number of items to return per page. Default: 50. */
      limit?: number;
      /**
       * Pointer to a set of search results, returned as part of the next or prev URL
       * from the previous search call.
       */
      cursor?: string;
      /**
       * Should navigate to the previous page. Defaulted to false. Set to true as part
       * of prev URL from the previous search call.
       */
      prev?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PagedDtoArticleDto>> => {
      return jiraRequest<PagedDtoArticleDto>({
        path: "/rest/servicedeskapi/knowledgebase/article",
        method: "GET",
        queryParams: {
          query,
          highlight,
          start,
          limit,
          cursor,
          prev
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
