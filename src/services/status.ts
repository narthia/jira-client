import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  RequestParams,
} from "../types/global";
import jiraRequest from "../utils/jiraRequest";
import { queryParamBuilder } from "../utils/params";
import type {
  BulkCreateStatusesRequest,
  BulkDeleteStatusesRequest,
  BulkEditStatusesRequest,
  BulkGetStatusesRequest,
  Status,
} from "../types/services/status";

export default function status<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    bulkGet: async (jiraRequestObj: BulkGetStatusesRequest<TClient>) => {
      const { opts, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder({
        params: queryParams,
        opts: { multiple: ["id"] },
      });
      const path = `/rest/api/3/statuses?${queryParamsString}`;
      const baseParams = {
        path,
        method: "GET",
        isResponseAvailable: true,
        config,
        opts,
      } as RequestParams<TClient>;

      return jiraRequest<TClient, Status[]>(baseParams);
    },

    bulkDelete: async (jiraRequestObj: BulkDeleteStatusesRequest<TClient>) => {
      const { opts, queryParams } = jiraRequestObj;
      const queryParamsString = queryParamBuilder({
        params: queryParams,
        opts: { multiple: ["id"] },
      });
      const path = `/rest/api/3/statuses?${queryParamsString}`;
      const baseParams = {
        path,
        method: "DELETE",
        isResponseAvailable: false,
        config,
        opts,
      } as RequestParams<TClient>;

      return jiraRequest<TClient, undefined>(baseParams);
    },

    bulkCreate: async (jiraRequestObj: BulkCreateStatusesRequest<TClient>) => {
      const { opts, body } = jiraRequestObj;
      const path = `/rest/api/3/statuses`;
      const baseParams = {
        path,
        method: "POST",
        isResponseAvailable: true,
        config,
        opts,
        body: JSON.stringify(body),
      } as RequestParams<TClient>;

      return jiraRequest<TClient, Status[]>(baseParams);
    },

    bulkEdit: async (jiraRequestObj: BulkEditStatusesRequest<TClient>) => {
      const { opts, body } = jiraRequestObj;
      const path = `/rest/api/3/statuses`;
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
  };
}
