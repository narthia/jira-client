import type {
  PropertyKeys,
  EntityProperty,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents [user](#api-group-Users) properties and provides for
 * storing custom data against a user. Use it to get, create, and delete user
 * properties as well as get a list of property keys for a user. This resourse is
 * designed for integrations and apps to store per-user data and settings. This
 * enables data used to customized the user experience to be kept in the Jira
 * Cloud instance's database. User properties are a type of [entity
 * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 *
 * This resource does not access the [user
 * properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in
 * Jira.
 */
export default function userProperties<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes a property from a user.
     *
     * Note: This operation does not access the [user
     * properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in
     * Jira.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg), to delete a property
     * from any user.
     *  *  Access to Jira, to delete a property from the calling user's record.
     */
    deleteUserProperty: async ({
      propertyKey,
      accountId,
      userKey,
      username,
      opts
    }: {
      /** The key of the user's property. */
      propertyKey: string;
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId?: string;
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      userKey?: string;
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/user/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          propertyKey
        },
        queryParams: {
          accountId,
          userKey,
          username
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the value of a user's property. If no property key is provided [Get
     * user property keys](#api-rest-api-3-user-properties-get) is called.
     *
     * Note: This operation does not access the [user
     * properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in
     * Jira.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg), to get a property from
     * any user.
     *  *  Access to Jira, to get a property from the calling user's record.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "key": "issue.support",
     *   "value": {
     *     "system.conversation.id": "b1bf38be-5e94-4b40-a3b8-9278735ee1e6",
     *     "system.support.time": "1m"
     *   }
     * }
     * ```
     */
    getUserProperty: async ({
      propertyKey,
      accountId,
      userKey,
      username,
      opts
    }: {
      /** The key of the user's property. */
      propertyKey: string;
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId?: string;
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      userKey?: string;
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<EntityProperty>> => {
      return jiraRequest<EntityProperty>({
        path: "/rest/api/3/user/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          propertyKey
        },
        queryParams: {
          accountId,
          userKey,
          username
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the keys of all properties for a user.
     *
     * Note: This operation does not access the [user
     * properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in
     * Jira.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg), to access the property
     * keys on any user.
     *  *  Access to Jira, to access the calling user's property keys.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "keys": [
     *     {
     *       "key": "issue.support",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issue/EX-2/properties/issue.support"
     *     }
     *   ]
     * }
     * ```
     */
    getUserPropertyKeys: async ({
      accountId,
      userKey,
      username,
      opts
    }: {
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId?: string;
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      userKey?: string;
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PropertyKeys>> => {
      return jiraRequest<PropertyKeys>({
        path: "/rest/api/3/user/properties",
        method: "GET",
        queryParams: {
          accountId,
          userKey,
          username
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the value of a user's property. Use this resource to store custom data
     * against a user.
     *
     * Note: This operation does not access the [user
     * properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in
     * Jira.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg), to set a property on
     * any user.
     *  *  Access to Jira, to set a property on the calling user's record.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the user property is updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the user property is created.
     */
    setUserProperty: async ({
      propertyKey,
      accountId,
      userKey,
      username,
      requestBody,
      opts
    }: {
      /** The key of the user's property. The maximum length is 255 characters. */
      propertyKey: string;
      /**
       * The account ID of the user, which uniquely identifies the user across all
       * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
       */
      accountId?: string;
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      userKey?: string;
      /**
       * This parameter is no longer available and will be removed from the
       * documentation soon. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details.
       */
      username?: string;
      /**
       * The value of the property. The value has to be a valid, non-empty
       * [JSON](https://tools.ietf.org/html/rfc4627) value. The maximum length of the
       * property value is 32768 bytes.
       */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        created: boolean;
        body: unknown;
      }>
    > => {
      return jiraRequest<{
        created: boolean;
        body: unknown;
      }>({
        path: "/rest/api/3/user/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          propertyKey
        },
        queryParams: {
          accountId,
          userKey,
          username
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
