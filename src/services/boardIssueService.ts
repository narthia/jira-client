import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * Apis related to issues
 */
export default function boardIssue<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Updates the estimation of the issue. boardId param is required. This param
     * determines which field will be updated on a issue.
     *
     * Note that this resource changes the estimation field of the issue regardless of
     * appearance the field on the screen.
     *
     * Original time tracking estimation field accepts estimation in formats like
     * "1w", "2d", "3h", "20m" or number which represent number of minutes. However,
     * internally the field stores and returns the estimation as a number of seconds.
     *
     * The field used for estimation on the given board can be obtained from [board
     * configuration resource](#agile/1.0/board-getConfiguration). More information
     * about the field are returned by [edit meta
     * resource](#api-rest-api-3-issue-issueIdOrKey-editmeta-get) or [field
     * resource](#api-rest-api-3-field-get).
     *
     * @returns Returns the estimation of the issue and a fieldId of the field that is used for it.
     *
     * example:
     * ```
     * {
     *   "fieldId": "customfield_12532",
     *   "value": "8.0"
     * }
     * ```
     */
    estimateIssueForBoard: async ({
      issueIdOrKey,
      boardId,
      requestBody,
      opts
    }: {
      /** The ID or key of the requested issue. */
      issueIdOrKey: string;
      /** The ID of the board required to determine which field is used for estimation. */
      boardId?: number;
      /**
       * bean that contains value of a new estimation.
       *
       * @example
       * {
       *   "value": "8.0"
       * }
       */
      requestBody: {
        value?: string;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/agile/1.0/issue/{issueIdOrKey}/estimation",
        method: "PUT",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          boardId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a single issue, for a given issue ID or issue key. Issues returned from
     * this resource include Agile fields, like sprint, closedSprints, flagged, and
     * epic.
     *
     * @returns Returns the requested issue.
     *
     * example:
     * ```
     * {
     *   "expand": "",
     *   "fields": {
     *     "flagged": true,
     *     "sprint": {
     *       "id": 37,
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/13",
     *       "state": "future",
     *       "name": "sprint 2",
     *       "goal": "sprint 2 goal"
     *     },
     *     "closedSprints": [
     *       {
     *         "id": 37,
     *         "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *         "state": "closed",
     *         "name": "sprint 1",
     *         "startDate": "2015-04-11T15:22:00.000+10:00",
     *         "endDate": "2015-04-20T01:22:00.000+10:00",
     *         "completeDate": "2015-04-20T11:04:00.000+10:00",
     *         "goal": "sprint 1 goal"
     *       }
     *     ],
     *     "description": "example bug report",
     *     "project": {
     *       "avatarUrls": {
     *         "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *         "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *         "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *         "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *       },
     *       "id": "10000",
     *       "insight": {
     *         "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *         "totalIssueCount": 100
     *       },
     *       "key": "EX",
     *       "name": "Example",
     *       "projectCategory": {
     *         "description": "First Project Category",
     *         "id": "10000",
     *         "name": "FIRST",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *       },
     *       "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *       "simplified": false,
     *       "style": "classic"
     *     },
     *     "comment": [
     *       {
     *         "author": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "active": false,
     *           "displayName": "Mia Krystof",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "body": {
     *           "type": "doc",
     *           "version": 1,
     *           "content": [
     *             {
     *               "type": "paragraph",
     *               "content": [
     *                 {
     *                   "type": "text",
     *                   "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                 }
     *               ]
     *             }
     *           ]
     *         },
     *         "created": "2021-01-17T12:34:00.000+0000",
     *         "id": "10000",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *         "updateAuthor": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "active": false,
     *           "displayName": "Mia Krystof",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "updated": "2021-01-18T23:45:00.000+0000",
     *         "visibility": {
     *           "identifier": "Administrators",
     *           "type": "role",
     *           "value": "Administrators"
     *         }
     *       }
     *     ],
     *     "epic": {
     *       "id": 37,
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *       "name": "epic 1",
     *       "summary": "epic 1 summary",
     *       "color": {
     *         "key": "color_4"
     *       },
     *       "done": true
     *     },
     *     "worklog": [
     *       {
     *         "author": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "active": false,
     *           "displayName": "Mia Krystof",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "comment": {
     *           "type": "doc",
     *           "version": 1,
     *           "content": [
     *             {
     *               "type": "paragraph",
     *               "content": [
     *                 {
     *                   "type": "text",
     *                   "text": "I did some work here."
     *                 }
     *               ]
     *             }
     *           ]
     *         },
     *         "id": "100028",
     *         "issueId": "10002",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *         "started": "2021-01-17T12:34:00.000+0000",
     *         "timeSpent": "3h 20m",
     *         "timeSpentSeconds": 12000,
     *         "updateAuthor": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "active": false,
     *           "displayName": "Mia Krystof",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *         },
     *         "updated": "2021-01-18T23:45:00.000+0000",
     *         "visibility": {
     *           "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *           "type": "group",
     *           "value": "jira-developers"
     *         }
     *       }
     *     ],
     *     "updated": 1,
     *     "timetracking": {
     *       "originalEstimate": "10m",
     *       "originalEstimateSeconds": 600,
     *       "remainingEstimate": "3m",
     *       "remainingEstimateSeconds": 200,
     *       "timeSpent": "6m",
     *       "timeSpentSeconds": 400
     *     }
     *   },
     *   "id": "10001",
     *   "key": "HSP-1",
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/92/issue/10001"
     * }
     * ```
     */
    getIssue: async ({
      issueIdOrKey,
      fields,
      expand,
      updateHistory,
      opts
    }: {
      /** The ID or key of the requested issue. */
      issueIdOrKey: string;
      /**
       * The list of fields to return for each issue. By default, all navigable and
       * Agile fields are returned.
       */
      fields?: {}[];
      /** A comma-separated list of the parameters to expand. */
      expand?: string;
      /**
       * A boolean indicating whether the issue retrieved by this method should be added
       * to the current user's issue history
       */
      updateHistory?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/agile/1.0/issue/{issueIdOrKey}",
        method: "GET",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          fields,
          expand,
          updateHistory
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the estimation of the issue and a fieldId of the field that is used for
     * it. `boardId` param is required. This param determines which field will be
     * updated on a issue.
     *
     * Original time internally stores and returns the estimation as a number of
     * seconds.
     *
     * The field used for estimation on the given board can be obtained from [board
     * configuration resource](#agile/1.0/board-getConfiguration). More information
     * about the field are returned by [edit meta
     * resource](#api-rest-api-3-issue-getEditIssueMeta) or [field
     * resource](#api-rest-api-3-field-get).
     *
     * @returns Returns the estimation of the issue and a fieldId of the field that is used for it.
     *
     * example:
     * ```
     * {
     *   "fieldId": "customfield_12532",
     *   "value": "8.0"
     * }
     * ```
     */
    getIssueEstimationForBoard: async ({
      issueIdOrKey,
      boardId,
      opts
    }: {
      /** The ID or key of the requested issue. */
      issueIdOrKey: string;
      /** The ID of the board required to determine which field is used for estimation. */
      boardId?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/agile/1.0/issue/{issueIdOrKey}/estimation",
        method: "GET",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          boardId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Moves (ranks) issues before or after a given issue. At most 50 issues may be
     * ranked at once.
     *
     * This operation may fail for some issues, although this will be rare. In that
     * case the 207 status code is returned for the whole response and detailed
     * information regarding each issue is available in the response body.
     *
     * If rankCustomFieldId is not defined, the default rank field will be used.
     *
     * @returns Returns the list of issue with status of rank operation.
     *
     * example:
     * ```
     * {
     *   "entries": [
     *     {
     *       "issueId": 10000,
     *       "issueKey": "PR-1",
     *       "status": 200
     *     },
     *     {
     *       "issueId": 10001,
     *       "issueKey": "PR-2",
     *       "status": 200
     *     },
     *     {
     *       "errors": [
     *         "JIRA Agile cannot execute the rank operation at this time. Please try again later."
     *       ],
     *       "issueId": 10002,
     *       "issueKey": "PR-3",
     *       "status": 503
     *     }
     *   ]
     * }
     * ```
     */
    rankIssues: async ({
      requestBody,
      opts
    }: {
      /**
       * bean which contains list of issues to rank and information where it should be
       * ranked.
       *
       * @example
       * {
       *   "issues": [
       *     "PR-1",
       *     "10001",
       *     "PR-3"
       *   ],
       *   "rankBeforeIssue": "PR-4",
       *   "rankCustomFieldId": 10521
       * }
       */
      requestBody: {
        issues?: string[];
        rankAfterIssue?: string;
        rankBeforeIssue?: string;
        rankCustomFieldId?: number;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/agile/1.0/issue/rank",
        method: "PUT",
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
