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
 * This resource represents [project](#api-group-Projects) properties, which
 * provides for storing custom data against a project. Use it to get, create, and
 * delete project properties as well as get a list of property keys for a project.
 * Project properties are a type of [entity
 * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 */
export default function projectProperties<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes the
     * [property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
     * from a project.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the property.
     */
    deleteProjectProperty: async ({
      projectIdOrKey,
      propertyKey,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * The project property key. Use [Get project property
       * keys](#api-rest-api-3-project-projectIdOrKey-properties-get) to get a list of
       * all project property keys.
       */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          projectIdOrKey,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the value of a [project
     * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the property.
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
    getProjectProperty: async ({
      projectIdOrKey,
      propertyKey,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * The project property key. Use [Get project property
       * keys](#api-rest-api-3-project-projectIdOrKey-properties-get) to get a list of
       * all project property keys.
       */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<EntityProperty>> => {
      return jiraRequest<EntityProperty>({
        path: "/rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          projectIdOrKey,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all [project
     * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
     * keys for the project.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
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
    getProjectPropertyKeys: async ({
      projectIdOrKey,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PropertyKeys>> => {
      return jiraRequest<PropertyKeys>({
        path: "/rest/api/3/project/{projectIdOrKey}/properties",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the value of the [project
     * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
     * You can use project properties to store custom data against the project.
     *
     * The value of the request body must be a
     * [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
     * length is 32768 characters.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * in which the property is created.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the project property is updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the project property is created.
     */
    setProjectProperty: async ({
      projectIdOrKey,
      propertyKey,
      requestBody,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /** The key of the project property. The maximum length is 255 characters. */
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
        path: "/rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          projectIdOrKey,
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
