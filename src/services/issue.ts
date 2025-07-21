import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  RequestParams,
} from "../types/global";
import jiraRequest from "../utils/jiraRequest";
import type {
  Issue,
  GetIssueRequest,
  DeleteIssueRequest,
  CreateIssueRequest,
  EditIssueRequest,
  CountIssuesRequest,
  SearchIssuesRequest,
  AssignIssueRequest,
  CheckIssueRequest,
  IssuePickerRequest,
  IssuePickerResponse,
} from "../types/services/issue";
import { queryParamBuilder } from "../utils/params";
import { getForgeRoute } from "../utils/forgeUtils";

export default function issue<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    get: async (jiraRequestObj: GetIssueRequest<TClient>) => {
      const { pathParams, opts, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder(queryParams);
      let path: string | import("@forge/api").Route =
        `/rest/api/3/issue/${pathParams.issueKeyOrId}`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route
          ? route`/rest/api/3/issue/${pathParams.issueKeyOrId}?${queryParamsString}`
          : path;
      }
      const baseParams = {
        path,
        method: "GET",
        isResponseAvailable: true,
        config,
        opts,
      } as RequestParams<TClient>;

      return jiraRequest<TClient, Issue>(baseParams);
    },

    delete: async (jiraRequestObj: DeleteIssueRequest<TClient>) => {
      const { pathParams, opts } = jiraRequestObj;
      let path: string | import("@forge/api").Route =
        `/rest/api/3/issue/${pathParams.issueKeyOrId}`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/issue/${pathParams.issueKeyOrId}` : path;
      }
      const baseParams = {
        path,
        method: "DELETE",
        isResponseAvailable: false,
        config,
        opts,
      } as RequestParams<TClient>;

      return jiraRequest<TClient, undefined>(baseParams);
    },

    create: async (jiraRequestObj: CreateIssueRequest<TClient>) => {
      const { opts, body, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder(queryParams);
      let path: string | import("@forge/api").Route = `/rest/api/3/issue?${queryParamsString}`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/issue?${queryParamsString}` : path;
      }
      const baseParams = {
        path,
        method: "POST",
        isResponseAvailable: true,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, { id: string; key: string; self: string }>(baseParams);
    },

    edit: async (jiraRequestObj: EditIssueRequest<TClient>) => {
      const { pathParams, opts, body, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder(queryParams);
      const isResponseAvailable = queryParams?.returnIssue ?? false;
      let path: string | import("@forge/api").Route =
        `/rest/api/3/issue/${pathParams.issueKeyOrId}?${queryParamsString}`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route
          ? route`/rest/api/3/issue/${pathParams.issueKeyOrId}?${queryParamsString}`
          : path;
      }
      const baseParams = {
        path,
        method: "PUT",
        isResponseAvailable,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, Issue | undefined>(baseParams);
    },

    count: async (jiraRequestObj: CountIssuesRequest<TClient>) => {
      const { opts, body } = jiraRequestObj;
      let path: string | import("@forge/api").Route = `/rest/api/3/search/approximate-count`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/search/approximate-count` : path;
      }
      const baseParams = {
        path,
        method: "POST",
        isResponseAvailable: true,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, { count: number }>(baseParams);
    },

    search: async (jiraRequestObj: SearchIssuesRequest<TClient>) => {
      const { opts, body } = jiraRequestObj;
      let path: string | import("@forge/api").Route = `/rest/api/3/search/jql`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/search/jql` : path;
      }
      const baseParams = {
        path,
        method: "POST",
        isResponseAvailable: true,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, { issues: Issue[]; isLast: boolean; nextPageToken?: string }>(
        baseParams
      );
    },

    assign: async (jiraRequestObj: AssignIssueRequest<TClient>) => {
      const { pathParams, opts, body } = jiraRequestObj;
      let path: string | import("@forge/api").Route =
        `/rest/api/3/issue/${pathParams.issueKeyOrId}/assignee`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/issue/${pathParams.issueKeyOrId}/assignee` : path;
      }
      const baseParams = {
        path,
        method: "PUT",
        isResponseAvailable: false,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, undefined>(baseParams);
    },

    check: async (jiraRequestObj: CheckIssueRequest<TClient>) => {
      const { opts, body } = jiraRequestObj;
      let path: string | import("@forge/api").Route = `/rest/api/3/jql/match`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/jql/match` : path;
      }
      const baseParams = {
        path,
        method: "POST",
        isResponseAvailable: true,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, { matches: { matchedIssues: string[]; errors: string[] }[] }>(
        baseParams
      );
    },

    picker: async (jiraRequestObj: IssuePickerRequest<TClient>) => {
      const { opts, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder(queryParams);
      let path: string | import("@forge/api").Route =
        `/rest/api/3/issue/picker?${queryParamsString}`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/issue/picker?${queryParamsString}` : path;
      }
      const baseParams = {
        path,
        method: "GET",
        isResponseAvailable: true,
        config,
        opts,
      } as RequestParams<TClient>;

      return jiraRequest<TClient, IssuePickerResponse>(baseParams);
    },
  };
}
