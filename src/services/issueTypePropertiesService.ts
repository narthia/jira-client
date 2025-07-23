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
 * This resource represents [issue type](#api-group-Issue-types) properties, which
 * provides for storing custom data against an issue type. Use it to get, create,
 * and delete issue type properties as well as obtain the keys of all properties
 * on a issues type. Issue type properties are a type of [entity
 * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 */
export default function issueTypeProperties<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes the [issue type
     * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteIssueTypeProperty: async ({
      issueTypeId,
      propertyKey,
      opts
    }: {
      /** The ID of the issue type. */
      issueTypeId: string;
      /**
       * The key of the property. Use [Get issue type property
       * keys](#api-rest-api-3-issuetype-issueTypeId-properties-get) to get a list of
       * all issue type property keys.
       */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          issueTypeId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the key and value of the [issue type
     * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) to get the details of
     * any issue type.
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) to get the details of
     * any issue types associated with the projects the user has permission to browse.
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
    getIssueTypeProperty: async ({
      issueTypeId,
      propertyKey,
      opts
    }: {
      /** The ID of the issue type. */
      issueTypeId: string;
      /**
       * The key of the property. Use [Get issue type property
       * keys](#api-rest-api-3-issuetype-issueTypeId-properties-get) to get a list of
       * all issue type property keys.
       */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<EntityProperty>> => {
      return jiraRequest<EntityProperty>({
        path: "/rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          issueTypeId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all the [issue type
     * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
     * keys of the issue type.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) to get the property keys
     * of any issue type.
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) to get the property keys
     * of any issue types associated with the projects the user has permission to
     * browse.
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
    getIssueTypePropertyKeys: async ({
      issueTypeId,
      opts
    }: {
      /** The ID of the issue type. */
      issueTypeId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PropertyKeys>> => {
      return jiraRequest<PropertyKeys>({
        path: "/rest/api/3/issuetype/{issueTypeId}/properties",
        method: "GET",
        pathParams: {
          issueTypeId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates or updates the value of the [issue type
     * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
     * Use this resource to store and update data against an issue type.
     *
     * The value of the request body must be a
     * [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
     * length is 32768 characters.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the issue type property is updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the issue type property is created.
     */
    setIssueTypeProperty: async ({
      issueTypeId,
      propertyKey,
      requestBody,
      opts
    }: {
      /** The ID of the issue type. */
      issueTypeId: string;
      /** The key of the issue type property. The maximum length is 255 characters. */
      propertyKey: string;
      /**
       * The value of the property. The value has to be a valid, non-empty
       * [JSON](https://tools.ietf.org/html/rfc4627) value. The maximum length of the
       * property value is 32768 bytes.
       *
       * @example
       * {
       *   "number": 5,
       *   "string": "string-value"
       * }
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
        path: "/rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          issueTypeId,
          propertyKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
