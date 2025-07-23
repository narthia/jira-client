import type {
  PageBean2JqlFunctionPrecomputationBean,
  JqlFunctionPrecomputationUpdateRequestBean,
  JqlFunctionPrecomputationUpdateResponse,
  JqlFunctionPrecomputationGetByIdRequest,
  JqlFunctionPrecomputationGetByIdResponse,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents JQL function's precomputations. Precomputation is a
 * mapping between custom function call and JQL fragment returned by this
 * function. Use it to get and update precomputations.
 */
export default function jqlFunctionsApps<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns the list of a function's precomputations along with information about
     * when they were created, updated, and last used. Each precomputation has a
     * `value` \- the JQL fragment to replace the custom function clause with.
     *
     * **[Permissions](#permissions) required:** This API is only accessible to apps
     * and apps can only inspect their own functions.
     *
     * The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it
     * won't break your app. However, we recommend adding it to your app's scope list
     * because we will eventually make it mandatory.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 100,
     *   "startAt": 0,
     *   "total": 1,
     *   "values": [
     *     {
     *       "arguments": [
     *         "Test"
     *       ],
     *       "created": "2023-10-14T05:25:20.000+0000",
     *       "field": "issue",
     *       "functionKey": "ari:cloud:ecosystem::extension/00000000-1111-2222-3333-4444444/111111-2222-3333-4444-55555/static/issuesWithText",
     *       "functionName": "issuesWithText",
     *       "id": "cf75a1b0-4ac6-4bd8-8a50-29a465a96520",
     *       "operator": "in",
     *       "updated": "2023-10-14T05:25:20.000+0000",
     *       "used": "2023-10-14T05:25:20.000+0000",
     *       "value": "issue in (TEST-1, TEST-2, TEST-3)"
     *     },
     *     {
     *       "arguments": [
     *         "10001"
     *       ],
     *       "created": "2023-10-14T05:25:20.000+0000",
     *       "error": "Error message to be displayed to the user",
     *       "field": "issue",
     *       "functionKey": "ari:cloud:ecosystem::extension/00000000-1111-2222-3333-4444444/111111-2222-3333-4444-55555/static/issuesWithText",
     *       "functionName": "issuesWithText",
     *       "id": "2a854f11-d0e1-4260-aea8-64a562a7062a",
     *       "operator": "=",
     *       "updated": "2023-10-14T05:25:20.000+0000",
     *       "used": "2023-10-14T05:25:20.000+0000"
     *     }
     *   ]
     * }
     * ```
     */
    getPrecomputations: async ({
      functionKey,
      startAt,
      maxResults,
      orderBy,
      opts
    }: {
      /**
       * The function key in format:
       *
       *  *  Forge: `ari:cloud:ecosystem::extension/[App ID]/[Environment
       * ID]/static/[Function key from manifest]`
       *  *  Connect: `[App key]__[Module key]`
       */
      functionKey?: string[];
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `functionKey` Sorts by the functionKey.
       *  *  `used` Sorts by the used timestamp.
       *  *  `created` Sorts by the created timestamp.
       *  *  `updated` Sorts by the updated timestamp.
       */
      orderBy?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBean2JqlFunctionPrecomputationBean>> => {
      return jiraRequest<PageBean2JqlFunctionPrecomputationBean>({
        path: "/rest/api/3/jql/function/computation",
        method: "GET",
        queryParams: {
          functionKey,
          startAt,
          maxResults,
          orderBy
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns function precomputations by IDs, along with information about when they
     * were created, updated, and last used. Each precomputation has a `value` \- the
     * JQL fragment to replace the custom function clause with.
     *
     * **[Permissions](#permissions) required:** This API is only accessible to apps
     * and apps can only inspect their own functions.
     *
     * The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it
     * won't break your app. However, we recommend adding it to your app's scope list
     * because we will eventually make it mandatory.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "notFoundPrecomputationIDs": [
     *     "cce1ef75-d566-40f8-a1a8-a9067f70ad69",
     *     "82583f5d-0a44-454b-a1f5-4e06838fbf80"
     *   ],
     *   "precomputations": [
     *     {
     *       "arguments": [
     *         "Test"
     *       ],
     *       "created": "2023-10-14T05:25:20.000+0000",
     *       "field": "issue",
     *       "functionKey": "ari:cloud:ecosystem::extension/00000000-1111-2222-3333-4444444/111111-2222-3333-4444-55555/static/issuesWithText",
     *       "functionName": "issuesWithText",
     *       "id": "cf75a1b0-4ac6-4bd8-8a50-29a465a96520",
     *       "operator": "in",
     *       "updated": "2023-10-14T05:25:20.000+0000",
     *       "used": "2023-10-14T05:25:20.000+0000",
     *       "value": "issue in (TEST-1, TEST-2, TEST-3)"
     *     },
     *     {
     *       "arguments": [
     *         "10001"
     *       ],
     *       "created": "2023-10-14T05:25:20.000+0000",
     *       "error": "Error message to be displayed to the user",
     *       "field": "issue",
     *       "functionKey": "ari:cloud:ecosystem::extension/00000000-1111-2222-3333-4444444/111111-2222-3333-4444-55555/static/issuesWithText",
     *       "functionName": "issuesWithText",
     *       "id": "2a854f11-d0e1-4260-aea8-64a562a7062a",
     *       "operator": "=",
     *       "updated": "2023-10-14T05:25:20.000+0000",
     *       "used": "2023-10-14T05:25:20.000+0000"
     *     }
     *   ]
     * }
     * ```
     */
    getPrecomputationsById: async ({
      orderBy,
      jqlFunctionPrecomputationGetByIdRequest,
      opts
    }: {
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `functionKey` Sorts by the functionKey.
       *  *  `used` Sorts by the used timestamp.
       *  *  `created` Sorts by the created timestamp.
       *  *  `updated` Sorts by the updated timestamp.
       */
      orderBy?: string;
      /**
       * @example
       * {
       *   "precomputationIDs": [
       *     "f2ef228b-367f-4c6b-bd9d-0d0e96b5bd7b",
       *     "2a854f11-d0e1-4260-aea8-64a562a7062a"
       *   ]
       * }
       */
      jqlFunctionPrecomputationGetByIdRequest: JqlFunctionPrecomputationGetByIdRequest;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<JqlFunctionPrecomputationGetByIdResponse>
    > => {
      return jiraRequest<JqlFunctionPrecomputationGetByIdResponse>({
        path: "/rest/api/3/jql/function/computation/search",
        method: "POST",
        queryParams: {
          orderBy
        },
        body: JSON.stringify(jqlFunctionPrecomputationGetByIdRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Update the precomputation value of a function created by a Forge/Connect app.
     *
     * **[Permissions](#permissions) required:** An API for apps to update their own
     * precomputations.
     *
     * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using
     * it won't break your app. However, we recommend adding it to your app's scope
     * list because we will eventually make it mandatory.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    200 response
     *
     *  * status: 204, mediaType: application/json
     *
     *    Returned if the request is successful.
     */
    updatePrecomputations: async ({
      skipNotFoundPrecomputations,
      jqlFunctionPrecomputationUpdateRequestBean,
      opts
    }: {
      skipNotFoundPrecomputations?: boolean;
      /**
       * @example
       * {
       *   "values": [
       *     {
       *       "id": "f2ef228b-367f-4c6b-bd9d-0d0e96b5bd7b",
       *       "value": "issue in (TEST-1, TEST-2, TEST-3)"
       *     },
       *     {
       *       "error": "Error message to be displayed to the user",
       *       "id": "2a854f11-d0e1-4260-aea8-64a562a7062a"
       *     }
       *   ]
       * }
       */
      jqlFunctionPrecomputationUpdateRequestBean: JqlFunctionPrecomputationUpdateRequestBean;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<JqlFunctionPrecomputationUpdateResponse | void>
    > => {
      return jiraRequest<JqlFunctionPrecomputationUpdateResponse | void>({
        path: "/rest/api/3/jql/function/computation",
        method: "POST",
        queryParams: {
          skipNotFoundPrecomputations
        },
        body: JSON.stringify(jqlFunctionPrecomputationUpdateRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
