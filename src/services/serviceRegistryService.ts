import type {
  ServiceRegistry,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents a service registry. Use it to retrieve attributes
 * related to a [service
 * registry](https://support.atlassian.com/jira-service-management-cloud/docs/what-is-services/)
 * in JSM.
 */
export default function serviceRegistry<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Retrieve the attributes of given service registries.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this
     * request and the servicesIds belong to the tenant you are requesting
     *
     * @returns Returned if the request is successful.
     */
    serviceRegistryResourceServicesGet: async ({
      serviceIds,
      opts
    }: {
      /**
       * The ID of the services (the strings starting with "b:" need to be decoded in
       * Base64).
       *
       * @example
       * ```
       * [
       *   "ari:cloud:graph::service/ca075ed7-6ea7-4563-acb3-000000000000/f51d7252-61e0-11ee-b94d-000000000000",
       *   "ari:cloud:graph::service/ca075ed7-6ea7-4563-acb3-000000000000/f51d7252-61e0-11ee-b94d-000000000001"
       * ]
       * ```
       */
      serviceIds: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<ServiceRegistry[]>> => {
      return jiraRequest<ServiceRegistry[]>({
        path: "/rest/atlassian-connect/1/service-registry",
        method: "GET",
        queryParams: {
          serviceIds
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
