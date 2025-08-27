import type {
  PagedDtoRequestTypeDto,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents Jira Service Management request types. Use it to:
 *
 * * get all customer request types used in the Jira Service Management instance
 * * filter request types by search query, service desk, and other criteria
 */
export default function requesttype<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * This method returns all customer request types used in the Jira Service
     * Management instance, optionally filtered by a query string.
     *
     * Use
     * [servicedeskapi/servicedesk/\{serviceDeskId\}/requesttype](#api-servicedesk-serviceDeskId-requesttype-get)
     * to find the customer request types supported by a specific service desk.
     *
     * The returned list of customer request types can be filtered using the
     * `searchQuery` parameter. The parameter is matched against the customer request
     * types' `name` or `description`. For example, searching for "Install", "Inst",
     * "Equi", or "Equipment" will match a customer request type with the *name*
     * "Equipment Installation Request".
     *
     * **Note:** This API by default will filter out request types hidden in the
     * portal (i.e. request types without groups and request types where a user
     * doesn't have permission) when `searchQuery` is provided, unless
     * `includeHiddenRequestTypesInSearch` is set to true. Restricted request types
     * will not be returned for those who aren't admins.
     *
     * **[Permissions](#permissions) required**: Any
     *
     * @returns Returns the request types, on the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "_expands": [],
     *   "size": 3,
     *   "start": 3,
     *   "limit": 3,
     *   "isLastPage": false,
     *   "_links": {
     *     "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
     *     "context": "context",
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype?start=6&limit=3",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype?start=0&limit=3"
     *   },
     *   "values": [
     *     {
     *       "_expands": [],
     *       "id": "11001",
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001"
     *       },
     *       "name": "Get IT Help",
     *       "description": "Get IT Help",
     *       "helpText": "Please tell us clearly the problem you have within 100 words.",
     *       "issueTypeId": "12345",
     *       "serviceDeskId": "28",
     *       "portalId": "2",
     *       "groupIds": [
     *         "12"
     *       ],
     *       "icon": {
     *         "id": "12345",
     *         "_links": {
     *           "iconUrls": {
     *             "48x48": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=large",
     *             "24x24": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=small",
     *             "16x16": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=xsmall",
     *             "32x32": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=medium"
     *           }
     *         }
     *       }
     *     },
     *     {
     *       "_expands": [],
     *       "id": "11002",
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11002"
     *       },
     *       "name": "Request a new account",
     *       "description": "Request a new account",
     *       "issueTypeId": "12345",
     *       "serviceDeskId": "28",
     *       "portalId": "2",
     *       "groupIds": [
     *         "13",
     *         "14"
     *       ],
     *       "icon": {
     *         "id": "12346",
     *         "_links": {
     *           "iconUrls": {
     *             "48x48": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12346?size=large",
     *             "24x24": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12346?size=small",
     *             "16x16": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12346?size=xsmall",
     *             "32x32": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12346?size=medium"
     *           }
     *         }
     *       }
     *     },
     *     {
     *       "_expands": [],
     *       "id": "11003",
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11003"
     *       },
     *       "name": "Hardware request",
     *       "description": "Request a hardware support",
     *       "issueTypeId": "12345",
     *       "serviceDeskId": "28",
     *       "portalId": "2",
     *       "groupIds": [
     *         "13"
     *       ],
     *       "icon": {
     *         "id": "12347",
     *         "_links": {
     *           "iconUrls": {
     *             "48x48": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12347?size=large",
     *             "24x24": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12347?size=small",
     *             "16x16": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12347?size=xsmall",
     *             "32x32": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12347?size=medium"
     *           }
     *         }
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getAllRequestTypes: async ({
      searchQuery,
      serviceDeskId,
      start,
      limit,
      expand,
      includeHiddenRequestTypesInSearch,
      restrictionStatus,
      opts
    }: {
      /** String to be used to filter the results. */
      searchQuery?: string;
      /**
       * Filter the request types by service desk Ids provided. Multiple values of the
       * query parameter are supported. For example, `serviceDeskId=1&serviceDeskId=2`
       * will return request types only for service desks 1 and 2.
       */
      serviceDeskId?: number[];
      /**
       * The starting index of the returned objects. Base index: 0. See the
       * [Pagination](#pagination) section for more details.
       */
      start?: number;
      /**
       * The maximum number of items to return per page. Default: 50. See the
       * [Pagination](#pagination) section for more details.
       */
      limit?: number;
      expand?: string[];
      /** Whether to include hidden request types when searching with `searchQuery`. */
      includeHiddenRequestTypesInSearch?: boolean;
      /**
       * Request type restriction status (`open` or `restricted`) used to filter the
       * results.
       */
      restrictionStatus?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PagedDtoRequestTypeDto>> => {
      return jiraRequest<PagedDtoRequestTypeDto>({
        path: "/rest/servicedeskapi/requesttype",
        method: "GET",
        queryParams: {
          searchQuery,
          serviceDeskId,
          start,
          limit,
          expand,
          includeHiddenRequestTypesInSearch,
          restrictionStatus
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
