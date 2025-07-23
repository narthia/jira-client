import type {
  PageWithCursorGetTeamResponseForPage,
  AddAtlassianTeamRequest,
  GetAtlassianTeamResponse,
  CreatePlanOnlyTeamRequest,
  GetPlanOnlyTeamResponse,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents planning settings for plan-only and Atlassian teams in
 * a plan. Use it to get, create, update and delete planning settings.
 */
export default function teamsInPlan<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds an existing Atlassian team to a plan and configures their plannning
     * settings.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    addAtlassianTeam: async ({
      planId,
      addAtlassianTeamRequest,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /**
       * @example
       * {
       *   "capacity": 200,
       *   "id": "AtlassianTeamId",
       *   "issueSourceId": 0,
       *   "planningStyle": "Scrum",
       *   "sprintLength": 2
       * }
       */
      addAtlassianTeamRequest: AddAtlassianTeamRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/plans/plan/{planId}/team/atlassian",
        method: "POST",
        pathParams: {
          planId
        },
        body: JSON.stringify(addAtlassianTeamRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates a plan-only team and configures their planning settings.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    createPlanOnlyTeam: async ({
      planId,
      createPlanOnlyTeamRequest,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /**
       * @example
       * {
       *   "capacity": 200,
       *   "issueSourceId": 0,
       *   "memberAccountIds": [
       *     "member1AccountId",
       *     "member2AccountId"
       *   ],
       *   "name": "Team1",
       *   "planningStyle": "Scrum",
       *   "sprintLength": 2
       * }
       */
      createPlanOnlyTeamRequest: CreatePlanOnlyTeamRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<number>> => {
      return jiraRequest<number>({
        path: "/rest/api/3/plans/plan/{planId}/team/planonly",
        method: "POST",
        pathParams: {
          planId
        },
        body: JSON.stringify(createPlanOnlyTeamRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a plan-only team and their planning settings.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deletePlanOnlyTeam: async ({
      planId,
      planOnlyTeamId,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /** The ID of the plan-only team. */
      planOnlyTeamId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/plans/plan/{planId}/team/planonly/{planOnlyTeamId}",
        method: "DELETE",
        pathParams: {
          planId,
          planOnlyTeamId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns planning settings for an Atlassian team in a plan.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "capacity": 220,
     *   "id": "98WA-2JBO-12N3-2298",
     *   "issueSourceId": 1,
     *   "planningStyle": "Scrum",
     *   "sprintLength": 2
     * }
     * ```
     */
    getAtlassianTeam: async ({
      planId,
      atlassianTeamId,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /** The ID of the Atlassian team. */
      atlassianTeamId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<GetAtlassianTeamResponse>> => {
      return jiraRequest<GetAtlassianTeamResponse>({
        path: "/rest/api/3/plans/plan/{planId}/team/atlassian/{atlassianTeamId}",
        method: "GET",
        pathParams: {
          planId,
          atlassianTeamId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns planning settings for a plan-only team.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "capacity": 30,
     *   "id": 123,
     *   "issueSourceId": 1,
     *   "memberAccountIds": [
     *     "mek2-3jno-01n3",
     *     "kdsn-2nk3-2nn1"
     *   ],
     *   "name": "Team1",
     *   "planningStyle": "Scrum",
     *   "sprintLength": 2
     * }
     * ```
     */
    getPlanOnlyTeam: async ({
      planId,
      planOnlyTeamId,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /** The ID of the plan-only team. */
      planOnlyTeamId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<GetPlanOnlyTeamResponse>> => {
      return jiraRequest<GetPlanOnlyTeamResponse>({
        path: "/rest/api/3/plans/plan/{planId}/team/planonly/{planOnlyTeamId}",
        method: "GET",
        pathParams: {
          planId,
          planOnlyTeamId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of plan-only and Atlassian teams in a
     * plan.
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
     *       "id": "1",
     *       "name": "Team 1",
     *       "type": "PlanOnly"
     *     },
     *     {
     *       "id": "2",
     *       "type": "Atlassian"
     *     }
     *   ]
     * }
     * ```
     */
    getTeams: async ({
      planId,
      cursor,
      maxResults,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /** The cursor to start from. If not provided, the first page will be returned. */
      cursor?: string;
      /**
       * The maximum number of plan teams to return per page. The maximum value is 50.
       * The default value is 50.
       */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageWithCursorGetTeamResponseForPage>> => {
      return jiraRequest<PageWithCursorGetTeamResponseForPage>({
        path: "/rest/api/3/plans/plan/{planId}/team",
        method: "GET",
        pathParams: {
          planId
        },
        queryParams: {
          cursor,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Removes an Atlassian team from a plan and deletes their planning settings.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    removeAtlassianTeam: async ({
      planId,
      atlassianTeamId,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /** The ID of the Atlassian team. */
      atlassianTeamId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/plans/plan/{planId}/team/atlassian/{atlassianTeamId}",
        method: "DELETE",
        pathParams: {
          planId,
          atlassianTeamId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates any of the following planning settings of an Atlassian team in a plan
     * using [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902).
     *
     *  *  planningStyle
     *  *  issueSourceId
     *  *  sprintLength
     *  *  capacity
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * *Note that "add" operations do not respect array indexes in target locations.
     * Call the "Get Atlassian team in plan" endpoint to find out the order of array
     * elements.*
     *
     * @returns Returned if the request is successful.
     */
    updateAtlassianTeam: async ({
      planId,
      atlassianTeamId,
      requestBody,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /** The ID of the Atlassian team. */
      atlassianTeamId: string;
      /**
       * @example
       * ```
       * [
       *   {
       *     "op": "replace",
       *     "path": "/planningStyle",
       *     "value": "Kanban"
       *   }
       * ]
       * ```
       */
      requestBody: {
        [key: string]: unknown;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/plans/plan/{planId}/team/atlassian/{atlassianTeamId}",
        method: "PUT",
        pathParams: {
          planId,
          atlassianTeamId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates any of the following planning settings of a plan-only team using [JSON
     * Patch](https://datatracker.ietf.org/doc/html/rfc6902).
     *
     *  *  name
     *  *  planningStyle
     *  *  issueSourceId
     *  *  sprintLength
     *  *  capacity
     *  *  memberAccountIds
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * *Note that "add" operations do not respect array indexes in target locations.
     * Call the "Get plan-only team" endpoint to find out the order of array elements.*
     *
     * @returns Returned if the request is successful.
     */
    updatePlanOnlyTeam: async ({
      planId,
      planOnlyTeamId,
      requestBody,
      opts
    }: {
      /** The ID of the plan. */
      planId: number;
      /** The ID of the plan-only team. */
      planOnlyTeamId: number;
      /**
       * @example
       * ```
       * [
       *   {
       *     "op": "replace",
       *     "path": "/planningStyle",
       *     "value": "Kanban"
       *   }
       * ]
       * ```
       */
      requestBody: {
        [key: string]: unknown;
      };
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/plans/plan/{planId}/team/planonly/{planOnlyTeamId}",
        method: "PUT",
        pathParams: {
          planId,
          planOnlyTeamId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
