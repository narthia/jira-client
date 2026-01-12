import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/** Apis related to epics */
export default function epic<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns the epic for a given epic ID. This epic will only be returned if the
     * user has permission to view it. **Note:** This operation does not work for
     * epics in next-gen projects.
     *
     * @returns Returns the requested epic.
     *
     * example:
     * ```
     * {
     *   "id": 37,
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *   "name": "epic 1",
     *   "summary": "epic 1 summary",
     *   "color": {
     *     "key": "color_4"
     *   },
     *   "done": true
     * }
     * ```
     */
    getEpic: async ({
      epicIdOrKey,
      opts
    }: {
      /** The id or key of the requested epic. */
      epicIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/epic/{epicIdOrKey}",
        method: "GET",
        pathParams: {
          epicIdOrKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all issues that belong to the epic, for the given epic ID. This only
     * includes issues that the user has permission to view. Issues returned from this
     * resource include Agile fields, like sprint, closedSprints, flagged, and epic.
     * By default, the returned issues are ordered by rank. **Note:** If you are
     * querying a next-gen project, do not use this operation. Instead, search for
     * issues that belong to an epic by using the [Search for issues using
     * JQL](https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-rest-api-2-search-get)
     * operation in the Jira platform REST API. Build your JQL query using the
     * `parent` clause. For more information on the `parent` JQL field, see [Advanced
     * searching](https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent).
     *
     * @returns Returns the requested issues, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "expand": "names,schema",
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "flagged": true,
     *         "sprint": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/13",
     *           "state": "future",
     *           "name": "sprint 2",
     *           "goal": "sprint 2 goal"
     *         },
     *         "closedSprints": [
     *           {
     *             "id": 37,
     *             "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *             "state": "closed",
     *             "name": "sprint 1",
     *             "startDate": "2015-04-11T15:22:00.000+10:00",
     *             "endDate": "2015-04-20T01:22:00.000+10:00",
     *             "completeDate": "2015-04-20T11:04:00.000+10:00",
     *             "goal": "sprint 1 goal"
     *           }
     *         ],
     *         "description": "example bug report",
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "epic": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *           "name": "epic 1",
     *           "summary": "epic 1 summary",
     *           "color": {
     *             "key": "color_4"
     *           },
     *           "done": true
     *         },
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "I did some work here."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10001",
     *       "key": "HSP-1",
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/92/issue/10001"
     *     }
     *   ],
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1
     * }
     * ```
     */
    getIssuesForEpic: async ({
      epicIdOrKey,
      startAt,
      maxResults,
      jql,
      validateQuery,
      fields,
      expand,
      opts
    }: {
      /** The id or key of the epic that contains the requested issues. */
      epicIdOrKey: string;
      /**
       * The starting index of the returned issues. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of issues to return per page. Default: 50. See the
       * 'Pagination' section at the top of this page for more details. Note, the total
       * number of issues returned is limited by the property
       * 'jira.search.views.default.max' in your Jira instance. If you exceed this
       * limit, your results will be truncated.
       */
      maxResults?: number;
      /**
       * Filters results using a JQL query. If you define an order in your JQL query, it
       * will override the default order of the returned issues.
       * Note that `username` and `userkey` can't be used as search terms for this
       * parameter due to privacy reasons. Use `accountId` instead.
       */
      jql?: string;
      /** Specifies whether to validate the JQL query or not. Default: true. */
      validateQuery?: boolean;
      /**
       * The list of fields to return for each issue. By default, all navigable and
       * Agile fields are returned.
       */
      fields?: {}[];
      /** A comma-separated list of the parameters to expand. */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/epic/{epicIdOrKey}/issue",
        method: "GET",
        pathParams: {
          epicIdOrKey
        },
        queryParams: {
          startAt,
          maxResults,
          jql,
          validateQuery,
          fields,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all issues that do not belong to any epic. This only includes issues
     * that the user has permission to view. Issues returned from this resource
     * include Agile fields, like sprint, closedSprints, flagged, and epic. By
     * default, the returned issues are ordered by rank. **Note:** If you are querying
     * a next-gen project, do not use this operation. Instead, search for issues that
     * don't belong to an epic by using the [Search for issues using
     * JQL](https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-rest-api-2-search-get)
     * operation in the Jira platform REST API. Build your JQL query using the `parent
     * is empty` clause. For more information on the `parent` JQL field, see [Advanced
     * searching](https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent).
     *
     * @returns Returns the requested issues, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "expand": "names,schema",
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "flagged": true,
     *         "sprint": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/13",
     *           "state": "future",
     *           "name": "sprint 2",
     *           "goal": "sprint 2 goal"
     *         },
     *         "closedSprints": [
     *           {
     *             "id": 37,
     *             "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *             "state": "closed",
     *             "name": "sprint 1",
     *             "startDate": "2015-04-11T15:22:00.000+10:00",
     *             "endDate": "2015-04-20T01:22:00.000+10:00",
     *             "completeDate": "2015-04-20T11:04:00.000+10:00",
     *             "goal": "sprint 1 goal"
     *           }
     *         ],
     *         "description": "example bug report",
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "epic": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *           "name": "epic 1",
     *           "summary": "epic 1 summary",
     *           "color": {
     *             "key": "color_4"
     *           },
     *           "done": true
     *         },
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "I did some work here."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10001",
     *       "key": "HSP-1",
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/92/issue/10001"
     *     }
     *   ],
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1
     * }
     * ```
     */
    getIssuesWithoutEpic: async ({
      startAt,
      maxResults,
      jql,
      validateQuery,
      fields,
      expand,
      opts
    }: {
      /**
       * The starting index of the returned issues. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of issues to return per page. See the 'Pagination' section
       * at the top of this page for more details. Note, the total number of issues
       * returned is limited by the property 'jira.search.views.default.max' in your
       * Jira instance. If you exceed this limit, your results will be truncated.
       */
      maxResults?: number;
      /**
       * Filters results using a JQL query. If you define an order in your JQL query, it
       * will override the default order of the returned issues.
       */
      jql?: string;
      /** Specifies whether to validate the JQL query or not. Default: true. */
      validateQuery?: boolean;
      /**
       * The list of fields to return for each issue. By default, all navigable and
       * Agile fields are returned.
       */
      fields?: {}[];
      /** A comma-separated list of the parameters to expand. */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/epic/none/issue",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          jql,
          validateQuery,
          fields,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Moves issues to an epic, for a given epic id. Issues can be only in a single
     * epic at the same time. That means that already assigned issues to an epic, will
     * not be assigned to the previous epic anymore. The user needs to have the edit
     * issue permission for all issue they want to move and to the epic. The maximum
     * number of issues that can be moved in one operation is 50. **Note:** This
     * operation does not work for epics in next-gen projects.
     */
    moveIssuesToEpic: async ({
      epicIdOrKey,
      requestBody,
      opts
    }: {
      /** The id or key of the epic that you want to assign issues to. */
      epicIdOrKey: string;
      /**
       * @example
       * {
       *   "issues": [
       *     "10001",
       *     "PR-1",
       *     "PR-3"
       *   ]
       * }
       */
      requestBody: {
        issues?: string[];
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/agile/1.0/epic/{epicIdOrKey}/issue",
        method: "POST",
        pathParams: {
          epicIdOrKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Performs a partial update of the epic. A partial update means that fields not
     * present in the request JSON will not be updated. Valid values for color are
     * `color_1` to `color_9`. **Note:** This operation does not work for epics in
     * next-gen projects.
     *
     * @returns Updated epic
     *
     * example:
     * ```
     * {
     *   "id": 37,
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *   "name": "epic 1",
     *   "summary": "epic 1 summary",
     *   "color": {
     *     "key": "color_4"
     *   },
     *   "done": true
     * }
     * ```
     */
    partiallyUpdateEpic: async ({
      epicIdOrKey,
      requestBody,
      opts
    }: {
      /** The id or key of the epic to update. */
      epicIdOrKey: string;
      /**
       * @example
       * {
       *   "color": {
       *     "key": "color_6"
       *   },
       *   "done": true,
       *   "name": "epic 2",
       *   "summary": "epic 2 summary"
       * }
       */
      requestBody: {
        color?: {
          key?:
            | "color_1"
            | "color_2"
            | "color_3"
            | "color_4"
            | "color_5"
            | "color_6"
            | "color_7"
            | "color_8"
            | "color_9"
            | "color_10"
            | "color_11"
            | "color_12"
            | "color_13"
            | "color_14";
        };
        done?: boolean;
        name?: string;
        summary?: string;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/epic/{epicIdOrKey}",
        method: "POST",
        pathParams: {
          epicIdOrKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Moves (ranks) an epic before or after a given epic.
     *
     * If rankCustomFieldId is not defined, the default rank field will be used.
     *
     * **Note:** This operation does not work for epics in next-gen projects.
     */
    rankEpics: async ({
      epicIdOrKey,
      requestBody,
      opts
    }: {
      /** The id or key of the epic to rank. */
      epicIdOrKey: string;
      /**
       * bean which contains the information where the given epic should be ranked.
       *
       * @example
       * {
       *   "rankBeforeEpic": "10000",
       *   "rankCustomFieldId": 10521
       * }
       */
      requestBody: {
        rankAfterEpic?: string;
        rankBeforeEpic?: string;
        rankCustomFieldId?: number;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/agile/1.0/epic/{epicIdOrKey}/rank",
        method: "PUT",
        pathParams: {
          epicIdOrKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Removes issues from epics. The user needs to have the edit issue permission for
     * all issue they want to remove from epics. The maximum number of issues that can
     * be moved in one operation is 50. **Note:** This operation does not work for
     * epics in next-gen projects. Instead, update the issue using `\{ fields: \{
     * parent: \{\} \} \}`
     */
    removeIssuesFromEpic: async ({
      requestBody,
      opts
    }: {
      /**
       * @example
       * {
       *   "issues": [
       *     "10001",
       *     "PR-1",
       *     "PR-3"
       *   ]
       * }
       */
      requestBody: {
        issues?: string[];
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/agile/1.0/epic/none/issue",
        method: "POST",
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
