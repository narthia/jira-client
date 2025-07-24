import type {
  PageBeanScreenScheme,
  ScreenSchemeDetails,
  ScreenSchemeId,
  UpdateScreenSchemeDetails,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents screen schemes in classic projects. Use it to get,
 * create, update, and delete screen schemes.
 */
export default function screenSchemes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a screen scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": 10001
     * }
     * ```
     */
    createScreenScheme: async ({
      screenSchemeDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "Manage employee data",
       *   "name": "Employee screen scheme",
       *   "screens": {
       *     "default": 10017,
       *     "edit": 10019,
       *     "view": 10020
       *   }
       * }
       */
      screenSchemeDetails: ScreenSchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ScreenSchemeId>> => {
      return jiraRequest<ScreenSchemeId>({
        path: "/rest/api/3/screenscheme",
        method: "POST",
        body: JSON.stringify(screenSchemeDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an
     * issue type screen scheme.
     *
     * Only screens schemes used in classic projects can be deleted.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteScreenScheme: async ({
      screenSchemeId,
      opts
    }: {
      /** The ID of the screen scheme. */
      screenSchemeId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/screenscheme/{screenSchemeId}",
        method: "DELETE",
        pathParams: {
          screenSchemeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of screen schemes.
     *
     * Only screen schemes used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 100,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/screenscheme?maxResults=25&startAt=0",
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "id": 10010,
     *       "name": "Employee screen scheme",
     *       "description": "Manage employee data",
     *       "screens": {
     *         "default": 10017,
     *         "edit": 10019,
     *         "create": 10019,
     *         "view": 10020
     *       },
     *       "issueTypeScreenSchemes": {
     *         "isLast": true,
     *         "maxResults": 100,
     *         "startAt": 0,
     *         "total": 1,
     *         "values": [
     *           {
     *             "id": "10000",
     *             "name": "Office issue type screen scheme",
     *             "description": "Managing office projects"
     *           }
     *         ]
     *       }
     *     },
     *     {
     *       "id": 10032,
     *       "name": "Office screen scheme",
     *       "description": "Manage office data",
     *       "screens": {
     *         "default": 10020
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getScreenSchemes: async ({
      startAt,
      maxResults,
      id,
      expand,
      queryString,
      orderBy,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of screen scheme IDs. To include multiple IDs, provide an
       * ampersand-separated list. For example, `id=10000&id=10001`.
       */
      id?: number[];
      /**
       * Use [expand](#expansion) include additional information in the response. This
       * parameter accepts `issueTypeScreenSchemes` that, for each screen schemes,
       * returns information about the issue type screen scheme the screen scheme is
       * assigned to.
       */
      expand?: string;
      /** String used to perform a case-insensitive partial match with screen scheme name. */
      queryString?: string;
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `id` Sorts by screen scheme ID.
       *  *  `name` Sorts by screen scheme name.
       */
      orderBy?: "name" | "-name" | "+name" | "id" | "-id" | "+id";
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanScreenScheme>> => {
      return jiraRequest<PageBeanScreenScheme>({
        path: "/rest/api/3/screenscheme",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          expand,
          queryString,
          orderBy
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a screen scheme. Only screen schemes used in classic projects can be
     * updated.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateScreenScheme: async ({
      screenSchemeId,
      updateScreenSchemeDetails,
      opts
    }: {
      /** The ID of the screen scheme. */
      screenSchemeId: string;
      /**
       * The screen scheme update details.
       *
       * @example
       * {
       *   "name": "Employee screen scheme v2",
       *   "screens": {
       *     "create": "10019",
       *     "default": "10018"
       *   }
       * }
       */
      updateScreenSchemeDetails: UpdateScreenSchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/screenscheme/{screenSchemeId}",
        method: "PUT",
        pathParams: {
          screenSchemeId
        },
        body: JSON.stringify(updateScreenSchemeDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
