import type {
  ConnectModules,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents [modules registered
 * dynamically](https://developer.atlassian.com/cloud/jira/platform/dynamic-modules/)
 * by [Connect
 * apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).
 */
export default function dynamicModules<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns all modules registered dynamically by the calling app.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this
     * request.
     *
     * @returns Returned if the request is successful.
     */
    dynamicModulesResourceGetModulesGet: async ({
      opts
    }: {} & WithRequestOpts<TClient>): Promise<JiraResult<ConnectModules>> => {
      return jiraRequest<ConnectModules>({
        path: "/rest/atlassian-connect/1/app/module/dynamic",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Registers a list of modules.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this
     * request.
     */
    dynamicModulesResourceRegisterModulesPost: async ({
      connectModules,
      opts
    }: {
      connectModules: ConnectModules;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/atlassian-connect/1/app/module/dynamic",
        method: "POST",
        body: JSON.stringify(connectModules),
        config,
        opts: {
          ...opts,
          headers: {
            "Content-Type": "application/json"
          }
        },
        isResponseAvailable: false
      });
    },

    /**
     * Remove all or a list of modules registered by the calling app.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this
     * request.
     */
    dynamicModulesResourceRemoveModulesDelete: async ({
      moduleKey,
      opts
    }: {
      /**
       * The key of the module to remove. To include multiple module keys, provide
       * multiple copies of this parameter.
       * For example,
       * `moduleKey=dynamic-attachment-entity-property&moduleKey=dynamic-select-field`.
       * Nonexistent keys are ignored.
       */
      moduleKey?: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/atlassian-connect/1/app/module/dynamic",
        method: "DELETE",
        queryParams: {
          moduleKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
