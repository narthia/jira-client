import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/** Apis related to sprints */
export default function sprint<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a future sprint. Sprint name and origin board id are required. Start
     * date, end date, and goal are optional.
     *
     * Note that the sprint name is trimmed. Also, when starting sprints from the UI,
     * the "endDate" set through this call is ignored and instead the last sprint's
     * duration is used to fill the form.
     *
     * @returns Created sprint
     *
     * example:
     * ```
     * {
     *   "id": 37,
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *   "state": "future",
     *   "name": "sprint 1",
     *   "startDate": "2015-04-11T15:22:00.000+10:00",
     *   "endDate": "2015-04-20T01:22:00.000+10:00",
     *   "originBoardId": 5,
     *   "goal": "sprint 1 goal"
     * }
     * ```
     */
    createSprint: async ({
      requestBody,
      opts
    }: {
      /**
       * @example
       * {
       *   "endDate": "2015-04-20T01:22:00.000+10:00",
       *   "goal": "sprint 1 goal",
       *   "name": "sprint 1",
       *   "originBoardId": 5,
       *   "startDate": "2015-04-11T15:22:00.000+10:00"
       * }
       */
      requestBody: {
        endDate?: string;
        goal?: string;
        name?: string;
        originBoardId?: number;
        startDate?: string;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/sprint",
        method: "POST",
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Removes the property from the sprint identified by the id. Ths user removing
     * the property is required to have permissions to modify the sprint.
     */
    deleteProperty: async ({
      sprintId,
      propertyKey,
      opts
    }: {
      /** the ID of the sprint from which the property will be removed. */
      sprintId: string;
      /** the key of the property to remove. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/agile/1.0/sprint/{sprintId}/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          sprintId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Deletes a sprint. Once a sprint is deleted, all open issues in the sprint will
     * be moved to the backlog.
     */
    deleteSprint: async ({
      sprintId,
      opts
    }: {
      /** The ID of the sprint to delete. */
      sprintId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/agile/1.0/sprint/{sprintId}",
        method: "DELETE",
        pathParams: {
          sprintId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Returns all issues in a sprint, for a given sprint ID. This only includes
     * issues that the user has permission to view. By default, the returned issues
     * are ordered by rank.
     *
     * @returns Returns the requested issues, at the specified page of the results.
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
    getIssuesForSprint: async ({
      sprintId,
      startAt,
      maxResults,
      jql,
      validateQuery,
      fields,
      expand,
      opts
    }: {
      /** The ID of the sprint that contains the requested issues. */
      sprintId: number;
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
        path: "/rest/agile/1.0/sprint/{sprintId}/issue",
        method: "GET",
        pathParams: {
          sprintId
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
     * Returns the keys of all properties for the sprint identified by the id. The
     * user who retrieves the property keys is required to have permissions to view
     * the sprint.
     *
     * @returns Returned if the sprint with given id exists.
     *
     * example:
     * ```
     * {
     *   "keys": [
     *     {
     *       "key": "issue.support",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issue/EX-2/properties/issue.support"
     *     }
     *   ]
     * }
     * ```
     */
    getPropertiesKeys: async ({
      sprintId,
      opts
    }: {
      /** the ID of the sprint from which property keys will be returned. */
      sprintId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/sprint/{sprintId}/properties",
        method: "GET",
        pathParams: {
          sprintId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns the value of the property with a given key from the sprint identified
     * by the provided id. The user who retrieves the property is required to have
     * permissions to view the sprint.
     *
     * @returns Returned if the sprint exists and the property was found.
     *
     * example:
     * ```
     * {
     *   "key": "issue.support",
     *   "value": {
     *     "system.conversation.id": "b1bf38be-5e94-4b40-a3b8-9278735ee1e6",
     *     "system.support.time": "1m"
     *   }
     * }
     * ```
     */
    getProperty: async ({
      sprintId,
      propertyKey,
      opts
    }: {
      /** the ID of the sprint from which the property will be returned. */
      sprintId: string;
      /** the key of the property to return. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/sprint/{sprintId}/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          sprintId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns the sprint for a given sprint ID. The sprint will only be returned if
     * the user can view the board that the sprint was created on, or view at least
     * one of the issues in the sprint.
     *
     * @returns Returns the requested sprint.
     *
     * example:
     * ```
     * {
     *   "id": 37,
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *   "state": "closed",
     *   "name": "sprint 1",
     *   "startDate": "2015-04-11T15:22:00.000+10:00",
     *   "endDate": "2015-04-20T01:22:00.000+10:00",
     *   "completeDate": "2015-04-20T11:04:00.000+10:00",
     *   "originBoardId": 5,
     *   "goal": "sprint 1 goal"
     * }
     * ```
     */
    getSprint: async ({
      sprintId,
      opts
    }: {
      /** The ID of the requested sprint. */
      sprintId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/sprint/{sprintId}",
        method: "GET",
        pathParams: {
          sprintId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Moves issues to a sprint, for a given sprint ID. Issues can only be moved to
     * open or active sprints. The maximum number of issues that can be moved in one
     * operation is 50.
     */
    moveIssuesToSprintAndRank: async ({
      sprintId,
      requestBody,
      opts
    }: {
      /** The ID of the sprint that you want to assign issues to. */
      sprintId: number;
      /**
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
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/agile/1.0/sprint/{sprintId}/issue",
        method: "POST",
        pathParams: {
          sprintId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Performs a partial update of a sprint. A partial update means that fields not
     * present in the request JSON will not be updated.
     *
     * Notes:
     *
     *  *  For closed sprints, only the name and goal can be updated; changes to other
     * fields will be ignored.
     *  *  A sprint can be started by updating the state to 'active'. This requires
     * the sprint to be in the 'future' state and have a startDate and endDate set.
     *  *  A sprint can be completed by updating the state to 'closed'. This action
     * requires the sprint to be in the 'active' state. This sets the completeDate to
     * the time of the request.
     *  *  Other changes to state are not allowed.
     *  *  The completeDate field cannot be updated manually.
     *
     * @returns Updated sprint
     *
     * example:
     * ```
     * {
     *   "id": 37,
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *   "state": "closed",
     *   "name": "sprint 1",
     *   "startDate": "2015-04-11T15:22:00.000+10:00",
     *   "endDate": "2015-04-20T01:22:00.000+10:00",
     *   "completeDate": "2015-04-20T11:04:00.000+10:00",
     *   "originBoardId": 5,
     *   "goal": "sprint 1 goal"
     * }
     * ```
     */
    partiallyUpdateSprint: async ({
      sprintId,
      requestBody,
      opts
    }: {
      /** The ID of the sprint to update. */
      sprintId: number;
      /**
       * @example
       * {
       *   "name": "new name"
       * }
       */
      requestBody: {
        completeDate?: string;
        createdDate?: string;
        endDate?: string;
        goal?: string;
        id?: number;
        name?: string;
        originBoardId?: number;
        self?: string;
        startDate?: string;
        state?: string;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/sprint/{sprintId}",
        method: "POST",
        pathParams: {
          sprintId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Sets the value of the specified sprint's property.
     *
     * You can use this resource to store a custom data against the sprint identified
     * by the id. The user who stores the data is required to have permissions to
     * modify the sprint.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the sprint property is successfully updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the sprint property is successfully created.
     */
    setProperty: async ({
      sprintId,
      propertyKey,
      requestBody,
      opts
    }: {
      /** the ID of the sprint on which the property will be set. */
      sprintId: string;
      /** the key of the sprint's property. The maximum length of the key is 255 bytes. */
      propertyKey: string;
      /**
       * The value of the property. The value has to be a valid, non-empty
       * [JSON](https://tools.ietf.org/html/rfc4627) value. The maximum length of the
       * property value is 32768 bytes.
       */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        created: boolean;
        body: unknown;
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/sprint/{sprintId}/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          sprintId,
          propertyKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /** Swap the position of the sprint with the second sprint. */
    swapSprint: async ({
      sprintId,
      requestBody,
      opts
    }: {
      /** The ID of the sprint to swap. */
      sprintId: number;
      /**
       * @example
       * {
       *   "sprintToSwapWith": 3
       * }
       */
      requestBody: {
        sprintToSwapWith?: number;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/agile/1.0/sprint/{sprintId}/swap",
        method: "POST",
        pathParams: {
          sprintId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Performs a full update of a sprint. A full update means that the result will be
     * exactly the same as the request body. Any fields not present in the request
     * JSON will be set to null.
     *
     * Notes:
     *
     *  *  For closed sprints, only the name and goal can be updated; changes to other
     * fields will be ignored.
     *  *  A sprint can be started by updating the state to 'active'. This requires
     * the sprint to be in the 'future' state and have a startDate and endDate set.
     *  *  A sprint can be completed by updating the state to 'closed'. This action
     * requires the sprint to be in the 'active' state. This sets the completeDate to
     * the time of the request.
     *  *  Other changes to state are not allowed.
     *  *  The completeDate field cannot be updated manually.
     *
     * @returns Updated sprint
     *
     * example:
     * ```
     * {
     *   "id": 37,
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *   "state": "closed",
     *   "name": "sprint 1",
     *   "startDate": "2015-04-11T15:22:00.000+10:00",
     *   "endDate": "2015-04-20T01:22:00.000+10:00",
     *   "completeDate": "2015-04-20T11:04:00.000+10:00",
     *   "originBoardId": 5,
     *   "goal": "sprint 1 goal"
     * }
     * ```
     */
    updateSprint: async ({
      sprintId,
      requestBody,
      opts
    }: {
      /** the ID of the sprint to update. */
      sprintId: number;
      /**
       * @example
       * {
       *   "completeDate": "2015-04-20T11:11:28.008+10:00",
       *   "endDate": "2015-04-16T14:01:00.000+10:00",
       *   "goal": "sprint 1 goal",
       *   "name": "sprint 1",
       *   "startDate": "2015-04-11T15:36:00.000+10:00",
       *   "state": "closed"
       * }
       */
      requestBody: {
        completeDate?: string;
        createdDate?: string;
        endDate?: string;
        goal?: string;
        id?: number;
        name?: string;
        originBoardId?: number;
        self?: string;
        startDate?: string;
        state?: string;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/sprint/{sprintId}",
        method: "PUT",
        pathParams: {
          sprintId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
