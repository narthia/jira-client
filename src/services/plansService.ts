import type {
  PageWithCursorGetPlanResponseForPage,
  CreatePlanRequest,
  GetPlanResponse,
  DuplicatePlanRequest,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents plans. Use it to get, create, duplicate, update, trash
 * and archive plans.
 */
export default function plans<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Archives a plan.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    archivePlan: async ({
      planId,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/plans/plan/{planId}/archive",
        method: "PUT",
        pathParams: {
          planId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates a plan.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    createPlan: async ({
      useGroupId,
      createPlanRequest,
      opts
    }: {
      /** Whether to accept group IDs instead of group names. Group names are deprecated. */
      useGroupId?: boolean;
      /**
       * @example
       * {
       *   "crossProjectReleases": [
       *     {
       *       "name": "AB and BC merge",
       *       "releaseIds": [
       *         29,
       *         39
       *       ]
       *     }
       *   ],
       *   "customFields": [
       *     {
       *       "customFieldId": 2335,
       *       "filter": true
       *     }
       *   ],
       *   "exclusionRules": {
       *     "issueIds": [
       *       2,
       *       3
       *     ],
       *     "issueTypeIds": [
       *       32,
       *       33
       *     ],
       *     "numberOfDaysToShowCompletedIssues": 50,
       *     "releaseIds": [
       *       42,
       *       43
       *     ],
       *     "workStatusCategoryIds": [
       *       22,
       *       23
       *     ],
       *     "workStatusIds": [
       *       12,
       *       13
       *     ]
       *   },
       *   "issueSources": [
       *     {
       *       "type": "Project",
       *       "value": 12
       *     },
       *     {
       *       "type": "Board",
       *       "value": 462
       *     }
       *   ],
       *   "leadAccountId": "abc-12-rbji",
       *   "name": "ABC Quaterly plan",
       *   "permissions": [
       *     {
       *       "holder": {
       *         "type": "AccountId",
       *         "value": "234-tgj-343"
       *       },
       *       "type": "Edit"
       *     }
       *   ],
       *   "scheduling": {
       *     "dependencies": "Sequential",
       *     "endDate": {
       *       "type": "DueDate"
       *     },
       *     "estimation": "Days",
       *     "inferredDates": "ReleaseDates",
       *     "startDate": {
       *       "type": "TargetStartDate"
       *     }
       *   }
       * }
       */
      createPlanRequest: CreatePlanRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<number>> => {
      return jiraRequest<number>({
        path: "/rest/api/3/plans/plan",
        method: "POST",
        queryParams: {
          useGroupId
        },
        body: JSON.stringify(createPlanRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Duplicates a plan.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    duplicatePlan: async ({
      planId,
      duplicatePlanRequest,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /**
       * @example
       * {
       *   "name": "Copied Plan"
       * }
       */
      duplicatePlanRequest: DuplicatePlanRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<number>> => {
      return jiraRequest<number>({
        path: "/rest/api/3/plans/plan/{planId}/duplicate",
        method: "POST",
        pathParams: {
          planId
        },
        body: JSON.stringify(duplicatePlanRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a plan.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "crossProjectReleases": [
     *     {
     *       "name": "x-plr",
     *       "releaseIds": [
     *         345
     *       ]
     *     }
     *   ],
     *   "customFields": [
     *     {
     *       "customFieldId": 34,
     *       "filter": false
     *     },
     *     {
     *       "customFieldId": 39,
     *       "filter": true
     *     }
     *   ],
     *   "exclusionRules": {
     *     "issueIds": [
     *       1,
     *       2
     *     ],
     *     "issueTypeIds": [
     *       13,
     *       23
     *     ],
     *     "numberOfDaysToShowCompletedIssues": 50,
     *     "releaseIds": [
     *       14,
     *       24
     *     ],
     *     "workStatusCategoryIds": [
     *       12,
     *       22
     *     ],
     *     "workStatusIds": [
     *       11,
     *       21
     *     ]
     *   },
     *   "id": 23,
     *   "issueSources": [
     *     {
     *       "type": "Project",
     *       "value": 12
     *     },
     *     {
     *       "type": "Filter",
     *       "value": 10293
     *     }
     *   ],
     *   "lastSaved": "2024-10-03T10:15:30Z",
     *   "leadAccountId": "628f5e86d5ec1f006ne7363x2s",
     *   "name": "Onset TBJ Plan",
     *   "permissions": [
     *     {
     *       "holder": {
     *         "type": "AccountId",
     *         "value": "04jekw86d5jjje006ne7363x2s"
     *       },
     *       "type": "Edit"
     *     }
     *   ],
     *   "scheduling": {
     *     "dependencies": "Concurrent",
     *     "endDate": {
     *       "dateCustomFieldId": 1098,
     *       "type": "DateCustomField"
     *     },
     *     "estimation": "Hours",
     *     "inferredDates": "ReleaseDates",
     *     "startDate": {
     *       "type": "TargetStartDate"
     *     }
     *   },
     *   "status": "Active"
     * }
     * ```
     */
    getPlan: async ({
      planId,
      useGroupId,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /** Whether to return group IDs instead of group names. Group names are deprecated. */
      useGroupId?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<GetPlanResponse>> => {
      return jiraRequest<GetPlanResponse>({
        path: "/rest/api/3/plans/plan/{planId}",
        method: "GET",
        pathParams: {
          planId
        },
        queryParams: {
          useGroupId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of plans.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "cursor": "",
     *   "isLast": true,
     *   "maxResults": 2,
     *   "nextPageCursor": "2",
     *   "total": 10,
     *   "values": [
     *     {
     *       "id": "100",
     *       "issueSources": [
     *         {
     *           "type": "Project",
     *           "value": 10000
     *         }
     *       ],
     *       "name": "Plan 1",
     *       "scenarioId": "200",
     *       "status": "Active"
     *     },
     *     {
     *       "id": "200",
     *       "issueSources": [
     *         {
     *           "type": "Board",
     *           "value": 20000
     *         }
     *       ],
     *       "name": "Plan 2",
     *       "scenarioId": "300",
     *       "status": "Trashed"
     *     }
     *   ]
     * }
     * ```
     */
    getPlans: async ({
      includeTrashed,
      includeArchived,
      cursor,
      maxResults,
      opts
    }: {
      /** Whether to include trashed plans in the results. */
      includeTrashed?: boolean;
      /** Whether to include archived plans in the results. */
      includeArchived?: boolean;
      /** The cursor to start from. If not provided, the first page will be returned. */
      cursor?: string;
      /**
       * The maximum number of plans to return per page. The maximum value is 50. The
       * default value is 50.
       */
      maxResults?: number;
    } & WithRequestOpts<TClient> = {}): Promise<
      JiraResult<PageWithCursorGetPlanResponseForPage>
    > => {
      return jiraRequest<PageWithCursorGetPlanResponseForPage>({
        path: "/rest/api/3/plans/plan",
        method: "GET",
        queryParams: {
          includeTrashed,
          includeArchived,
          cursor,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Moves a plan to trash.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    trashPlan: async ({
      planId,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/plans/plan/{planId}/trash",
        method: "PUT",
        pathParams: {
          planId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates any of the following details of a plan using [JSON
     * Patch](https://datatracker.ietf.org/doc/html/rfc6902).
     *
     *  *  name
     *  *  leadAccountId
     *  *  scheduling
     *
     *      *  estimation with StoryPoints, Days or Hours as possible values
     *      *  startDate
     *
     *          *  type with DueDate, TargetStartDate, TargetEndDate or
     * DateCustomField as possible values
     *          *  dateCustomFieldId
     *      *  endDate
     *
     *          *  type with DueDate, TargetStartDate, TargetEndDate or
     * DateCustomField as possible values
     *          *  dateCustomFieldId
     *      *  inferredDates with None, SprintDates or ReleaseDates as possible values
     *      *  dependencies with Sequential or Concurrent as possible values
     *  *  issueSources
     *
     *      *  type with Board, Project or Filter as possible values
     *      *  value
     *  *  exclusionRules
     *
     *      *  numberOfDaysToShowCompletedIssues
     *      *  issueIds
     *      *  workStatusIds
     *      *  workStatusCategoryIds
     *      *  issueTypeIds
     *      *  releaseIds
     *  *  crossProjectReleases
     *
     *      *  name
     *      *  releaseIds
     *  *  customFields
     *
     *      *  customFieldId
     *      *  filter
     *  *  permissions
     *
     *      *  type with View or Edit as possible values
     *      *  holder
     *
     *          *  type with Group or AccountId as possible values
     *          *  value
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * *Note that "add" operations do not respect array indexes in target locations.
     * Call the "Get plan" endpoint to find out the order of array elements.*
     *
     * @returns Returned if the request is successful.
     */
    updatePlan: async ({
      planId,
      useGroupId,
      requestBody,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /** Whether to accept group IDs instead of group names. Group names are deprecated. */
      useGroupId?: boolean;
      /**
       * @example
       * ```
       * [
       *   {
       *     "op": "replace",
       *     "path": "/scheduling/estimation",
       *     "value": "Days"
       *   }
       * ]
       * ```
       */
      requestBody: {
        [key: string]: unknown;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/plans/plan/{planId}",
        method: "PUT",
        pathParams: {
          planId
        },
        queryParams: {
          useGroupId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
