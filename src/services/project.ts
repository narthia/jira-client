import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  RequestParams,
} from "../types/global";
import jiraRequest from "../utils/jiraRequest";
import type {
  FullProject,
  GetProjectRequest,
  DeleteProjectRequest,
  CreateProjectRequest,
  EditProjectRequest,
} from "../types/services/project";
import { queryParamBuilder } from "../utils/params";

export default function project<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    get: async (jiraRequestObj: GetProjectRequest<TClient>) => {
      const { pathParams, opts, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder({ params: queryParams });
      const path = `/rest/api/3/project/${pathParams.projectIdOrKey}?${queryParamsString}`;
      const baseParams = {
        path,
        method: "GET",
        isResponseAvailable: true,
        config,
        opts,
      } as RequestParams<TClient>;

      return jiraRequest<TClient, FullProject>(baseParams);
    },

    delete: async (jiraRequestObj: DeleteProjectRequest<TClient>) => {
      const { pathParams, opts, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder({ params: queryParams });
      const path = `/rest/api/3/project/${pathParams.projectIdOrKey}?${queryParamsString}`;
      const baseParams = {
        path,
        method: "DELETE",
        isResponseAvailable: false,
        config,
        opts,
      } as RequestParams<TClient>;

      return jiraRequest<TClient, undefined>(baseParams);
    },

    create: async (jiraRequestObj: CreateProjectRequest<TClient>) => {
      const { opts, body } = jiraRequestObj;
      const path = `/rest/api/3/project`;
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

    edit: async (jiraRequestObj: EditProjectRequest<TClient>) => {
      const { pathParams, opts, body, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder({ params: queryParams });
      const path = `/rest/api/3/project/${pathParams.projectIdOrKey}?${queryParamsString}`;
      const baseParams = {
        path,
        method: "PUT",
        isResponseAvailable: true,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, FullProject | undefined>(baseParams);
    },
  };
}
