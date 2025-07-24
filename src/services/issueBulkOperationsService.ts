import type {
  IssueBulkDeletePayload,
  SubmittedBulkOperation,
  BulkEditGetFields,
  IssueBulkEditPayload,
  IssueBulkMovePayload,
  BulkTransitionGetAvailableTransitions,
  IssueBulkTransitionPayload,
  IssueBulkWatchOrUnwatchPayload,
  BulkOperationProgress,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the issue bulk operations. Use it to move multiple
 * issues from one project to another project or edit fields of multiple issues in
 * one go.
 *
 *
 * For additional clarity, we have created a page with further examples and
 * answers to frequently asked questions related to these APIs. You can access it
 * here: [Bulk operation APIs: additional examples and
 * FAQ](https://developer.atlassian.com/cloud/jira/platform/bulk-operation-additional-examples-and-faqs/).
 *
 * ### Authentication ###
 *
 * Access to the issue bulk operations requires authentication. For information on
 * how to authenticate API requests, refer to the [Basic auth for REST APIs
 * documentation](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/).
 *
 * ### Rate limiting ###
 *
 * The bulk edit and move APIs are subject to the usual rate limiting
 * infrastructure in Jira. For more information, refer to [Rate
 * limiting](https://developer.atlassian.com/cloud/jira/platform/rate-limiting/).
 * Additionally, at any given time, only 5 concurrent requests can be sent across
 * all users.
 */
export default function issueBulkOperations<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Use this API to retrieve a list of transitions available for the specified
     * issues that can be used or bulk transition operations. You can submit either
     * single or multiple issues in the query to obtain the available transitions.
     *
     * The response will provide the available transitions for issues, organized by
     * their respective workflows. **Only the transitions that are common among the
     * issues within that workflow and do not involve any additional field updates
     * will be included.** For bulk transitions that require additional field updates,
     * please utilise the Jira Cloud UI.
     *
     * You can request available transitions for up to 1,000 issues in a single
     * operation. This API uses pagination to return responses, delivering 50
     * workflows at a time.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Global bulk change
     * [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
     *  *  Transition [issues
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Transition-issues/)
     * in all projects that contain the selected issues.
     *  *  Browse [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in all projects that contain the selected issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "availableTransitions": [
     *     {
     *       "isTransitionsFiltered": false,
     *       "issues": [
     *         "EPIC-1",
     *         "TASK-1"
     *       ],
     *       "transitions": [
     *         {
     *           "to": {
     *             "statusId": 10001,
     *             "statusName": "To Do"
     *           },
     *           "transitionId": 11,
     *           "transitionName": "To Do"
     *         },
     *         {
     *           "to": {
     *             "statusId": 10002,
     *             "statusName": "In Progress"
     *           },
     *           "transitionId": 21,
     *           "transitionName": "In Progress"
     *         },
     *         {
     *           "to": {
     *             "statusId": 10003,
     *             "statusName": "Done"
     *           },
     *           "transitionId": 31,
     *           "transitionName": "Done"
     *         }
     *       ]
     *     },
     *     {
     *       "isTransitionsFiltered": true,
     *       "issues": [
     *         "BUG-1"
     *       ],
     *       "transitions": [
     *         {
     *           "to": {
     *             "statusId": 10004,
     *             "statusName": "To Do bug"
     *           },
     *           "transitionId": 41,
     *           "transitionName": "To Do bug"
     *         },
     *         {
     *           "to": {
     *             "statusId": 10005,
     *             "statusName": "Triage"
     *           },
     *           "transitionId": 51,
     *           "transitionName": "Triage"
     *         }
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    getAvailableTransitions: async ({
      issueIdsOrKeys,
      endingBefore,
      startingAfter,
      opts
    }: {
      /**
       * Comma (,) separated Ids or keys of the issues to get transitions available for
       * them.
       */
      issueIdsOrKeys: string;
      /** (Optional)The end cursor for use in pagination. */
      endingBefore?: string;
      /** (Optional)The start cursor for use in pagination. */
      startingAfter?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<BulkTransitionGetAvailableTransitions>> => {
      return jiraRequest<BulkTransitionGetAvailableTransitions>({
        path: "/rest/api/3/bulk/issues/transition",
        method: "GET",
        queryParams: {
          issueIdsOrKeys,
          endingBefore,
          startingAfter
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Use this API to get a list of fields visible to the user to perform bulk edit
     * operations. You can pass single or multiple issues in the query to get eligible
     * editable fields. This API uses pagination to return responses, delivering 50
     * fields at a time.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Global bulk change
     * [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
     *  *  Browse [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in all projects that contain the selected issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  Depending on the field, any field-specific permissions required to edit it.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "fields": [
     *     {
     *       "id": "assignee",
     *       "isRequired": false,
     *       "name": "Assignee",
     *       "searchUrl": "https://your-domain.atlassian.net/rest/api/3/user/assignable/multiProjectSearch?projectKeys=KAN&query=",
     *       "type": "assignee"
     *     },
     *     {
     *       "id": "components",
     *       "isRequired": false,
     *       "multiSelectFieldOptions": [
     *         "ADD",
     *         "REMOVE",
     *         "REPLACE",
     *         "REMOVE_ALL"
     *       ],
     *       "name": "Components",
     *       "type": "components",
     *       "unavailableMessage": "{0}NOTE{1}: The project of the selected issue(s) does not have any components."
     *     },
     *     {
     *       "fieldOptions": [
     *         {
     *           "description": "This problem will block progress.",
     *           "id": "1",
     *           "priority": "Highest"
     *         },
     *         {
     *           "description": "Has the potential to affect progress.",
     *           "id": "2",
     *           "priority": "Lowest"
     *         },
     *         {
     *           "description": "Trivial problem with little or no impact on progress.",
     *           "id": "3",
     *           "priority": "Medium"
     *         }
     *       ],
     *       "id": "priority",
     *       "isRequired": false,
     *       "name": "Priority",
     *       "type": "priority"
     *     }
     *   ]
     * }
     * ```
     */
    getBulkEditableFields: async ({
      issueIdsOrKeys,
      searchText,
      endingBefore,
      startingAfter,
      opts
    }: {
      /** The IDs or keys of the issues to get editable fields from. */
      issueIdsOrKeys: string;
      /** (Optional)The text to search for in the editable fields. */
      searchText?: string;
      /** (Optional)The end cursor for use in pagination. */
      endingBefore?: string;
      /** (Optional)The start cursor for use in pagination. */
      startingAfter?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<BulkEditGetFields>> => {
      return jiraRequest<BulkEditGetFields>({
        path: "/rest/api/3/bulk/issues/fields",
        method: "GET",
        queryParams: {
          issueIdsOrKeys,
          searchText,
          endingBefore,
          startingAfter
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Use this to get the progress state for the specified bulk operation `taskId`.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Global bulk change
     * [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
     *
     * If the task is running, this resource will return:
     *
     *     {"taskId":"10779","status":"RUNNING","progressPercent":65,"submittedBy":{"accountId":"5b10a2844c20165700ede21g"},"created":1690180055963,"started":1690180056206,"updated":169018005829}
     *
     * If the task has completed, then this resource will return:
     *
     *     {"processedAccessibleIssues":[10001,10002],"created":1709189449954,"progressPercent":100,"started":1709189450154,"status":"COMPLETE","submittedBy":{"accountId":"5b10a2844c20165700ede21g"},"invalidOrInaccessibleIssueCount":0,"taskId":"10000","totalIssueCount":2,"updated":1709189450354}
     *
     * **Note:** You can view task progress for up to 14 days from creation.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "created": 1704110400000,
     *   "invalidOrInaccessibleIssueCount": 0,
     *   "processedAccessibleIssues": [
     *     10001,
     *     10002
     *   ],
     *   "progressPercent": 100,
     *   "started": 1704110460000,
     *   "status": "COMPLETE",
     *   "submittedBy": {
     *     "accountId": "5b10a2844c20165700ede21g"
     *   },
     *   "taskId": "10000",
     *   "totalIssueCount": 2,
     *   "updated": 1704110520000
     * }
     * ```
     */
    getBulkOperationProgress: async ({
      taskId,
      opts
    }: {
      /** The ID of the task. */
      taskId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<BulkOperationProgress>> => {
      return jiraRequest<BulkOperationProgress>({
        path: "/rest/api/3/bulk/queue/{taskId}",
        method: "GET",
        pathParams: {
          taskId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Use this API to submit a bulk delete request. You can delete up to 1,000 issues
     * in a single operation.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Global bulk change
     * [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
     *  *  Delete [issues
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Delete-issues/)
     * in all projects that contain the selected issues.
     *  *  Browse [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in all projects that contain the selected issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "taskId": "10641"
     * }
     * ```
     */
    submitBulkDelete: async ({
      issueBulkDeletePayload,
      opts
    }: {
      /**
       * The request body containing the issues to be deleted.
       *
       * @example
       * {
       *   "selectedIssueIdsOrKeys": [
       *     "10001",
       *     "10002"
       *   ],
       *   "sendBulkNotification": false
       * }
       */
      issueBulkDeletePayload: IssueBulkDeletePayload;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SubmittedBulkOperation>> => {
      return jiraRequest<SubmittedBulkOperation>({
        path: "/rest/api/3/bulk/issues/delete",
        method: "POST",
        body: JSON.stringify(issueBulkDeletePayload),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Use this API to submit a bulk edit request and simultaneously edit multiple
     * issues. There are limits applied to the number of issues and fields that can be
     * edited. A single request can accommodate a maximum of 1000 issues (including
     * subtasks) and 200 fields.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Global bulk change
     * [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
     *  *  Browse [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in all projects that contain the selected issues.
     *  *  Edit [issues
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in all projects that contain the selected issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "taskId": "10641"
     * }
     * ```
     */
    submitBulkEdit: async ({
      issueBulkEditPayload,
      opts
    }: {
      /** The request body containing the issues to be edited and the new field values. */
      issueBulkEditPayload: IssueBulkEditPayload;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SubmittedBulkOperation>> => {
      return jiraRequest<SubmittedBulkOperation>({
        path: "/rest/api/3/bulk/issues/fields",
        method: "POST",
        body: JSON.stringify(issueBulkEditPayload),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Use this API to submit a bulk issue move request. You can move multiple issues
     * from multiple projects in a single request, but they must all be moved to a
     * single project, issue type, and parent. You can't move more than 1000 issues
     * (including subtasks) at once.
     *
     * #### Scenarios: ####
     *
     * This is an early version of the API and it doesn't have full feature parity
     * with the Bulk Move UI experience.
     *
     *  *  Moving issue of type A to issue of type B in the same project or a
     * different project: `SUPPORTED`
     *  *  Moving multiple issues of type A in one or more projects to multiple issues
     * of type B in one of the source projects or a different project: `SUPPORTED`
     *  *  Moving issues of multiple issue types in one or more projects to issues of
     * a single issue type in one of the source project or a different project:
     * **`SUPPORTED`**
     *     E.g. Moving issues of story and task issue types in project 1 and project 2
     * to issues of task issue type in project 3
     *  *  Moving a standard parent issue of type A with its multiple subtask issue
     * types in one project to standard issue of type B and multiple subtask issue
     * types in the same project or a different project: `SUPPORTED`
     *  *  Moving standard issues with their subtasks to a parent issue in the same
     * project or a different project without losing their relation: `SUPPORTED`
     *  *  Moving an epic issue with its child issues to a different project without
     * losing their relation: `SUPPORTED`
     *     This usecase is **supported using multiple requests**. Move the epic in one
     * request and then move the children in a separate request with target parent set
     * to the epic issue id
     *
     *     (Alternatively, move them individually and stitch the relationship back
     * with the Bulk Edit API)
     *
     * #### Limits applied to bulk issue moves: ####
     *
     * When using the bulk move, keep in mind that there are limits on the number of
     * issues and fields you can include.
     *
     *  *  You can move up to 1,000 issues in a single operation, including any
     * subtasks.
     *  *  The total combined number of fields across all issues must not exceed
     * 1,500,000. For example, if each issue includes 15,000 fields, then the maximum
     * number of issues that can be moved is 100.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Global bulk change
     * [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
     *  *  Move [issues
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in source projects.
     *  *  Create [issues
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in destination projects.
     *  *  Browse [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in destination projects, if moving subtasks only.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "taskId": "10641"
     * }
     * ```
     */
    submitBulkMove: async ({
      issueBulkMovePayload,
      opts
    }: {
      /**
       * @example
       * {
       *   "sendBulkNotification": true,
       *   "targetToSourcesMapping": {
       *     "PROJECT-KEY,10001": {
       *       "inferClassificationDefaults": false,
       *       "inferFieldDefaults": false,
       *       "inferStatusDefaults": false,
       *       "inferSubtaskTypeDefault": true,
       *       "issueIdsOrKeys": [
       *         "ISSUE-1"
       *       ],
       *       "targetClassification": [
       *         {
       *           "classifications": {
       *             "5bfa70f7-4af1-44f5-9e12-1ce185f15a38": [
       *               "bd58e74c-c31b-41a7-ba69-9673ebd9dae9",
       *               "-1"
       *             ]
       *           }
       *         }
       *       ],
       *       "targetMandatoryFields": [
       *         {
       *           "fields": {
       *             "customfield_10000": {
       *               "retain": false,
       *               "type": "raw",
       *               "value": [
       *                 "value-1",
       *                 "value-2"
       *               ]
       *             },
       *             "description": {
       *               "retain": true,
       *               "type": "adf",
       *               "value": {
       *                 "content": [
       *                   {
       *                     "content": [
       *                       {
       *                         "text": "New description value",
       *                         "type": "text"
       *                       }
       *                     ],
       *                     "type": "paragraph"
       *                   }
       *                 ],
       *                 "type": "doc",
       *                 "version": 1
       *               }
       *             },
       *             "fixVersions": {
       *               "retain": false,
       *               "type": "raw",
       *               "value": [
       *                 "10009"
       *               ]
       *             },
       *             "labels": {
       *               "retain": false,
       *               "type": "raw",
       *               "value": [
       *                 "label-1",
       *                 "label-2"
       *               ]
       *             }
       *           }
       *         }
       *       ],
       *       "targetStatus": [
       *         {
       *           "statuses": {
       *             "10001": [
       *               "10002",
       *               "10003"
       *             ]
       *           }
       *         }
       *       ]
       *     }
       *   }
       * }
       */
      issueBulkMovePayload: IssueBulkMovePayload;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SubmittedBulkOperation>> => {
      return jiraRequest<SubmittedBulkOperation>({
        path: "/rest/api/3/bulk/issues/move",
        method: "POST",
        body: JSON.stringify(issueBulkMovePayload),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Use this API to submit a bulk issue status transition request. You can
     * transition multiple issues, alongside with their valid transition Ids. You can
     * transition up to 1,000 issues in a single operation.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Global bulk change
     * [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
     *  *  Transition [issues
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Transition-issues/)
     * in all projects that contain the selected issues.
     *  *  Browse [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in all projects that contain the selected issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "taskId": "10641"
     * }
     * ```
     */
    submitBulkTransition: async ({
      issueBulkTransitionPayload,
      opts
    }: {
      /**
       * The request body containing the issues to be transitioned.
       *
       * @example
       * {
       *   "bulkTransitionInputs": [
       *     {
       *       "selectedIssueIdsOrKeys": [
       *         "10001",
       *         "10002"
       *       ],
       *       "transitionId": "11"
       *     },
       *     {
       *       "selectedIssueIdsOrKeys": [
       *         "TEST-1"
       *       ],
       *       "transitionId": "2"
       *     }
       *   ],
       *   "sendBulkNotification": false
       * }
       */
      issueBulkTransitionPayload: IssueBulkTransitionPayload;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SubmittedBulkOperation>> => {
      return jiraRequest<SubmittedBulkOperation>({
        path: "/rest/api/3/bulk/issues/transition",
        method: "POST",
        body: JSON.stringify(issueBulkTransitionPayload),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Use this API to submit a bulk unwatch request. You can unwatch up to 1,000
     * issues in a single operation.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Global bulk change
     * [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
     *  *  Browse [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in all projects that contain the selected issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "taskId": "10641"
     * }
     * ```
     */
    submitBulkUnwatch: async ({
      issueBulkWatchOrUnwatchPayload,
      opts
    }: {
      /**
       * The request body containing the issues to be unwatched.
       *
       * @example
       * {
       *   "selectedIssueIdsOrKeys": [
       *     "10001",
       *     "10002"
       *   ]
       * }
       */
      issueBulkWatchOrUnwatchPayload: IssueBulkWatchOrUnwatchPayload;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SubmittedBulkOperation>> => {
      return jiraRequest<SubmittedBulkOperation>({
        path: "/rest/api/3/bulk/issues/unwatch",
        method: "POST",
        body: JSON.stringify(issueBulkWatchOrUnwatchPayload),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Use this API to submit a bulk watch request. You can watch up to 1,000 issues
     * in a single operation.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Global bulk change
     * [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
     *  *  Browse [project
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
     * in all projects that contain the selected issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "taskId": "10641"
     * }
     * ```
     */
    submitBulkWatch: async ({
      issueBulkWatchOrUnwatchPayload,
      opts
    }: {
      /**
       * The request body containing the issues to be watched.
       *
       * @example
       * {
       *   "selectedIssueIdsOrKeys": [
       *     "10001",
       *     "10002"
       *   ]
       * }
       */
      issueBulkWatchOrUnwatchPayload: IssueBulkWatchOrUnwatchPayload;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SubmittedBulkOperation>> => {
      return jiraRequest<SubmittedBulkOperation>({
        path: "/rest/api/3/bulk/issues/watch",
        method: "POST",
        body: JSON.stringify(issueBulkWatchOrUnwatchPayload),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
