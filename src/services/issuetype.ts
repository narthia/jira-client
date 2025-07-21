import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  RequestParams,
} from "../types/global";
import jiraRequest from "../utils/jiraRequest";
import { queryParamBuilder } from "../utils/params";
import type {
  CreateIssueTypeRequest,
  DeleteIssueTypeRequest,
  GetIssueTypeRequest,
  IssueType,
  UpdateIssueTypeRequest,
} from "../types/services/issuetype";

export default function issueType<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    get: async (jiraRequestObj: GetIssueTypeRequest<TClient>) => {
      const { pathParams, opts } = jiraRequestObj;
      const path = `/rest/api/3/issuetype/${pathParams.id}`;
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
      const queryParamsString = queryParamBuilder({ params: queryParams });
      const path = `/rest/api/3/issuetype/${pathParams.id}?${queryParamsString}`;
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
      const path = `/rest/api/3/issuetype`;
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
      const path = `/rest/api/3/issuetype/${pathParams.id}`;
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
