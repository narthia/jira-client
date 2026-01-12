import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * Apis related to the backlog
 */
export default function backlog<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Move issues to the backlog.
     * This operation is equivalent to remove future and active sprints from a given
     * set of issues. At most 50 issues may be moved at once.
     */
    moveIssuesToBacklog: async ({
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
        path: "/rest/agile/1.0/backlog/issue",
        method: "POST",
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Move issues to the backlog of a particular board (if they are already on that
     * board).
     * This operation is equivalent to remove future and active sprints from a given
     * set of issues if the board has sprints If the board does not have sprints this
     * will put the issues back into the backlog from the board. At most 50 issues may
     * be moved at once.
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
    moveIssuesToBacklogForBoard: async ({
      boardId,
      requestBody,
      opts
    }: {
      /** The ID of the board. */
      boardId: number;
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
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/agile/1.0/backlog/{boardId}/issue",
        method: "POST",
        pathParams: {
          boardId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
