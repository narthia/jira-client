import type {
  UserNavPropertyJsonBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents user navigation properties. Use it to get and set user
 * navigation preferences.
 */
export default function usernavproperties<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns the value of a user nav preference.
     *
     * Note: This operation fetches the property key value directly from RbacClient.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg), to get a property from
     * any user.
     *  *  Access to Jira, to get a property from the calling user's record.
     *
     * @returns Returned if the request is successful.
     */
    getUserNavProperty: async ({
      propertyKey,
      accountId,
      opts
    }: {
      /** The key of the user's property. */
      propertyKey: string;
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<UserNavPropertyJsonBean>> => {
      return jiraRequest<UserNavPropertyJsonBean>({
        path: "/rest/api/3/user/nav4-opt-property/{propertyKey}",
        method: "GET",
        pathParams: {
          propertyKey
        },
        queryParams: {
          accountId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the value of a Nav4 preference. Use this resource to store Nav4 preference
     * data against a user in the Identity service.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg), to set a property on
     * any user.
     *  *  Access to Jira, to set a property on the calling user's record.
     *
     * @returns Returned if the user property is updated/created.
     */
    setUserNavProperty: async ({
      propertyKey,
      accountId,
      requestBody,
      opts
    }: {
      /** The key of the nav property. The maximum length is 255 characters. */
      propertyKey: string;
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId?: string;
      /**
       * The value of the property. The value has to be a boolean
       * [JSON](https://tools.ietf.org/html/rfc4627) value. The maximum length of the
       * property value is 32768 bytes.
       */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/user/nav4-opt-property/{propertyKey}",
        method: "PUT",
        pathParams: {
          propertyKey
        },
        queryParams: {
          accountId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
