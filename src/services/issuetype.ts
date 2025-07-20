import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  RequestParams,
} from "../types/global";
import jiraRequest from "../utils/jiraRequest";
import { queryParamBuilder } from "../utils/params";
import { getForgeRoute } from "../utils/forgeUtils";
import type {
  CreateIssueTypeRequest,
  DeleteIssueTypeRequest,
  GetIssueTypeRequest,
  IssueType,
  UpdateIssueTypeRequest,
} from "../types/services/issuetype";

export default function issueType<TClient extends ClientType>(
  config: TClient extends "default" ? DefaultJiraConfig : ForgeJiraConfig
) {
  return {
    get: async (jiraRequestObj: GetIssueTypeRequest<TClient>) => {
      const { pathParams, opts } = jiraRequestObj;
      let path: string | import("@forge/api").Route = `/rest/api/3/issuetype/${pathParams.id}`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/issuetype/${pathParams.id}` : path;
      }
      const baseParams = {
        path,
        method: "GET",
        isResponseAvailable: true,
        config,
        opts,
      } as RequestParams<TClient>;

      return jiraRequest<TClient, IssueType>(baseParams);
    },

    delete: async (jiraRequestObj: DeleteIssueTypeRequest<TClient>) => {
      const { pathParams, opts, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder(queryParams);
      let path: string | import("@forge/api").Route =
        `/rest/api/3/issuetype/${pathParams.id}?${queryParamsString}`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/issuetype/${pathParams.id}?${queryParamsString}` : path;
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

    create: async (jiraRequestObj: CreateIssueTypeRequest<TClient>) => {
      const { opts, body } = jiraRequestObj;
      let path: string | import("@forge/api").Route = `/rest/api/3/issuetype`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/issuetype` : path;
      }
      const baseParams = {
        path,
        method: "POST",
        isResponseAvailable: true,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, IssueType>(baseParams);
    },

    edit: async (jiraRequestObj: UpdateIssueTypeRequest<TClient>) => {
      const { pathParams, opts, body } = jiraRequestObj;
      let path: string | import("@forge/api").Route = `/rest/api/3/issuetype/${pathParams.id}`;
      if (config.type === "forge") {
        const route = await getForgeRoute();
        path = route ? route`/rest/api/3/issuetype/${pathParams.id}` : path;
      }
      const baseParams = {
        path,
        method: "PUT",
        isResponseAvailable: true,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, IssueType>(baseParams);
    },
  };
}
