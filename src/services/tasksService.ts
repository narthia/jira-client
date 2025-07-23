import type {
  TaskProgressBeanObject,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents a [long-running asynchronous
 * tasks](#async-operations). Use it to obtain details about the progress of a
 * long-running task or cancel a long-running task.
 */
export default function tasks<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Cancels a task.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  Creator of the task.
     *
     * @returns Returned if the request is successful.
     */
    cancelTask: async ({
      taskId,
      opts
    }: {
      /** The ID of the task. */
      taskId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/task/{taskId}/cancel",
        method: "POST",
        pathParams: {
          taskId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the status of a [long-running asynchronous task](#async).
     *
     * When a task has finished, this operation returns the JSON blob applicable to
     * the task. See the documentation of the operation that created the task for
     * details. Task details are not permanently retained. As of September 2019,
     * details are retained for 14 days although this period may change without notice.
     *
     * **Deprecation notice:** The required OAuth 2.0 scopes will be updated on June
     * 15, 2024.
     *
     *  *  `read:jira-work`
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  Creator of the task.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "self": "https://your-domain.atlassian.net/rest/api/3/task/1",
     *   "id": "1",
     *   "description": "Task description",
     *   "status": "COMPLETE",
     *   "result": "the task result, this may be any JSON",
     *   "submittedBy": 10000,
     *   "progress": 100,
     *   "elapsedRuntime": 156,
     *   "submitted": 1501708132800,
     *   "started": 1501708132900,
     *   "finished": 1501708133000,
     *   "lastUpdate": 1501708133000
     * }
     * ```
     */
    getTask: async ({
      taskId,
      opts
    }: {
      /** The ID of the task. */
      taskId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<TaskProgressBeanObject>> => {
      return jiraRequest<TaskProgressBeanObject>({
        path: "/rest/api/3/task/{taskId}",
        method: "GET",
        pathParams: {
          taskId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
