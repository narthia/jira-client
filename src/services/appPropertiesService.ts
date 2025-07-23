import type {
  OperationMessage,
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
 * This resource represents app properties. Use it to store arbitrary data for your
 * [Connect
 * app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).
 */
export default function appProperties<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes an app's property.
     *
     * **[Permissions](#permissions) required:** Only a Connect app whose key matches
     * `addonKey` can make this request.
     * Additionally, Forge apps can access Connect app properties (stored against the
     * same `app.connect.key`).
     */
    addonPropertiesResourceDeleteAddonPropertyDelete: async ({
      addonKey,
      propertyKey,
      opts
    }: {
      /** The key of the app, as defined in its descriptor. */
      addonKey: string;
      /** The key of the property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          addonKey,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Gets all the properties of an app.
     *
     * **[Permissions](#permissions) required:** Only a Connect app whose key matches
     * `addonKey` can make this request.
     * Additionally, Forge apps can access Connect app properties (stored against the
     * same `app.connect.key`).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "keys": [
     *     {
     *       "self": "https://your-domain.atlassian.net/jira/rest/atlassian-connect/1/addon/example.app.key/properties/propertyKey",
     *       "key": "propertyKey"
     *     }
     *   ]
     * }
     * ```
     */
    addonPropertiesResourceGetAddonPropertiesGet: async ({
      addonKey,
      opts
    }: {
      /** The key of the app, as defined in its descriptor. */
      addonKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PropertyKeys>> => {
      return jiraRequest<PropertyKeys>({
        path: "/rest/atlassian-connect/1/addons/{addonKey}/properties",
        method: "GET",
        pathParams: {
          addonKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the key and value of an app's property.
     *
     * **[Permissions](#permissions) required:** Only a Connect app whose key matches
     * `addonKey` can make this request.
     * Additionally, Forge apps can access Connect app properties (stored against the
     * same `app.connect.key`).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "self": "https://your-domain.atlassian.net/jira/rest/atlassian-connect/1/addon/example.app.key/properties/propertyKey",
     *   "key": "propertyKey",
     *   "value": "propertyValue"
     * }
     * ```
     */
    addonPropertiesResourceGetAddonPropertyGet: async ({
      addonKey,
      propertyKey,
      opts
    }: {
      /** The key of the app, as defined in its descriptor. */
      addonKey: string;
      /** The key of the property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<EntityProperty>> => {
      return jiraRequest<EntityProperty>({
        path: "/rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          addonKey,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the value of an app's property. Use this resource to store custom data for
     * your app.
     *
     * The value of the request body must be a
     * [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
     * length is 32768 characters.
     *
     * **[Permissions](#permissions) required:** Only a Connect app whose key matches
     * `addonKey` can make this request.
     * Additionally, Forge apps can access Connect app properties (stored against the
     * same `app.connect.key`).
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the property is updated.
     *
     *    example:
     *    ```
     *    {
     *      "message": "Property updated.",
     *      "statusCode": 200
     *    }
     *    ```
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned is the property is created.
     *
     *    example:
     *    ```
     *    {
     *      "message": "Property created.",
     *      "statusCode": 201
     *    }
     *    ```
     */
    addonPropertiesResourcePutAddonPropertyPut: async ({
      addonKey,
      propertyKey,
      requestBody,
      opts
    }: {
      /** The key of the app, as defined in its descriptor. */
      addonKey: string;
      /** The key of the property. */
      propertyKey: string;
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        created: boolean;
        operationMessage: OperationMessage;
      }>
    > => {
      return jiraRequest<{
        created: boolean;
        operationMessage: OperationMessage;
      }>({
        path: "/rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          addonKey,
          propertyKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts: {
          ...opts,
          headers: {
            "Content-Type": "application/json"
          }
        },
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a Forge app's property.
     *
     * **[Permissions](#permissions) required:** Only Forge apps can make this request.
     *
     * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using
     * it won't break your app. However, we recommend adding it to your app's scope
     * list because we will eventually make it mandatory.
     */
    deleteForgeAppProperty: async ({
      propertyKey,
      opts
    }: {
      /** The key of the property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/forge/1/app/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets the value of a Forge app's property.
     * These values can be retrieved in [Jira
     * expressions](/cloud/jira/platform/jira-expressions/)
     * through the `app` [context
     * variable](/cloud/jira/platform/jira-expressions/#context-variables).
     * They are also available in [entity property display
     * conditions](/platform/forge/manifest-reference/display-conditions/entity-property-conditions/).
     *
     * For other use cases, use the [Storage
     * API](/platform/forge/runtime-reference/storage-api/).
     *
     * The value of the request body must be a
     * [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
     * length is 32768 characters.
     *
     * **[Permissions](#permissions) required:** Only Forge apps can make this request.
     *
     * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using
     * it won't break your app. However, we recommend adding it to your app's scope
     * list because we will eventually make it mandatory.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the property is updated.
     *
     *    example:
     *    ```
     *    {
     *      "message": "Property updated.",
     *      "statusCode": 200
     *    }
     *    ```
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned is the property is created.
     *
     *    example:
     *    ```
     *    {
     *      "message": "Property created.",
     *      "statusCode": 201
     *    }
     *    ```
     */
    putForgeAppProperty: async ({
      propertyKey,
      requestBody,
      opts
    }: {
      /** The key of the property. */
      propertyKey: string;
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        created: boolean;
        operationMessage: OperationMessage;
      }>
    > => {
      return jiraRequest<{
        created: boolean;
        operationMessage: OperationMessage;
      }>({
        path: "/rest/forge/1/app/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          propertyKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts: {
          ...opts,
          headers: {
            "Content-Type": "application/json"
          }
        },
        isResponseAvailable: true
      });
    }
  };
}
