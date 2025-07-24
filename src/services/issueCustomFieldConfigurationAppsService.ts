import type {
  PageBeanContextualConfiguration,
  CustomFieldConfigurations,
  ConfigurationsListParameters,
  PageBeanBulkContextualConfiguration,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents configurations stored against a custom field context
 * by a [Forge app](https://developer.atlassian.com/platform/forge/).
 * Configurations are information used by the Forge app at runtime to determine
 * how to handle or process the data in a custom field in a given context. Use
 * this resource to set and read configurations.
 */
export default function issueCustomFieldConfigurationApps<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns a [paginated](#pagination) list of configurations for a custom field of
     * a
     * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
     * created by a [Forge app](https://developer.atlassian.com/platform/forge/).
     * 
     * The result can be filtered by one of these criteria:
     * 
     *  *  `id`.
     *  *  `fieldContextId`.
     *  *  `issueId`.
     *  *  `projectKeyOrId` and `issueTypeId`.
     * 
     * Otherwise, all configurations are returned.
     * 
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are
     * not required for the Forge app that provided the custom field type.
     * 
     * @returns Returned if the request is successful.
     * 
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 1000,
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "id": "10000",
     *       "fieldContextId": "10010"
     *     },
     *     {
     *       "id": "10001",
     *       "fieldContextId": "10011",
     *       "configuration": {
     *         "minValue": 0,
     *         "maxValue": 10000
     *       },
     *       "schema": {
     *         "properties": {
     *           "amount": {
     *             "type": "number"
     *           },
     *           "currency": {
     *             "type": "string"
     *           }
     *         },
     *         "required": [
     *           "amount",
     *           "currency"
     *         ]
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getCustomFieldConfiguration: async ({
      fieldIdOrKey,
      id,
      fieldContextId,
      issueId,
      projectKeyOrId,
      issueTypeId,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID or key of the custom field, for example `customfield_10000`. */
      fieldIdOrKey: string;
      /**
       * The list of configuration IDs. To include multiple configurations, separate IDs
       * with an ampersand: `id=10000&id=10001`. Can't be provided with
       * `fieldContextId`, `issueId`, `projectKeyOrId`, or `issueTypeId`.
       */
      id?: number[];
      /**
       * The list of field context IDs. To include multiple field contexts, separate IDs
       * with an ampersand: `fieldContextId=10000&fieldContextId=10001`. Can't be
       * provided with `id`, `issueId`, `projectKeyOrId`, or `issueTypeId`.
       */
      fieldContextId?: number[];
      /**
       * The ID of the issue to filter results by. If the issue doesn't exist, an empty
       * list is returned. Can't be provided with `projectKeyOrId`, or `issueTypeId`.
       */
      issueId?: number;
      /**
       * The ID or key of the project to filter results by. Must be provided with
       * `issueTypeId`. Can't be provided with `issueId`.
       */
      projectKeyOrId?: string;
      /**
       * The ID of the issue type to filter results by. Must be provided with
       * `projectKeyOrId`. Can't be provided with `issueId`.
       */
      issueTypeId?: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanContextualConfiguration>> => {
      return jiraRequest<PageBeanContextualConfiguration>({
        path: "/rest/api/3/app/field/{fieldIdOrKey}/context/configuration",
        method: "GET",
        pathParams: {
          fieldIdOrKey
        },
        queryParams: {
          id,
          fieldContextId,
          issueId,
          projectKeyOrId,
          issueTypeId,
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of configurations for list of custom
     * fields of a
     * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
     * created by a [Forge app](https://developer.atlassian.com/platform/forge/).
     * 
     * The result can be filtered by one of these criteria:
     * 
     *  *  `id`.
     *  *  `fieldContextId`.
     *  *  `issueId`.
     *  *  `projectKeyOrId` and `issueTypeId`.
     * 
     * Otherwise, all configurations for the provided list of custom fields are
     * returned.
     * 
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are
     * not required for the Forge app that provided the custom field type.
     * 
     * @returns Returned if the request is successful.
     * 
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 1000,
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "customFieldId": "customfield_10035",
     *       "fieldContextId": "10010",
     *       "id": "10000"
     *     },
     *     {
     *       "configuration": {
     *         "maxValue": 10000,
     *         "minValue": 0
     *       },
     *       "customFieldId": "customfield_10036",
     *       "fieldContextId": "10011",
     *       "id": "10001",
     *       "schema": {
     *         "properties": {
     *           "amount": {
     *             "type": "number"
     *           },
     *           "currency": {
     *             "type": "string"
     *           }
     *         },
     *         "required": [
     *           "amount",
     *           "currency"
     *         ]
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getCustomFieldsConfigurations: async ({
      id,
      fieldContextId,
      issueId,
      projectKeyOrId,
      issueTypeId,
      startAt,
      maxResults,
      configurationsListParameters,
      opts
    }: {
      /**
       * The list of configuration IDs. To include multiple configurations, separate IDs
       * with an ampersand: `id=10000&id=10001`. Can't be provided with
       * `fieldContextId`, `issueId`, `projectKeyOrId`, or `issueTypeId`.
       */
      id?: number[];
      /**
       * The list of field context IDs. To include multiple field contexts, separate IDs
       * with an ampersand: `fieldContextId=10000&fieldContextId=10001`. Can't be
       * provided with `id`, `issueId`, `projectKeyOrId`, or `issueTypeId`.
       */
      fieldContextId?: number[];
      /**
       * The ID of the issue to filter results by. If the issue doesn't exist, an empty
       * list is returned. Can't be provided with `projectKeyOrId`, or `issueTypeId`.
       */
      issueId?: number;
      /**
       * The ID or key of the project to filter results by. Must be provided with
       * `issueTypeId`. Can't be provided with `issueId`.
       */
      projectKeyOrId?: string;
      /**
       * The ID of the issue type to filter results by. Must be provided with
       * `projectKeyOrId`. Can't be provided with `issueId`.
       */
      issueTypeId?: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * @example
       * {
       *   "fieldIdsOrKeys": [
       *     "customfield_10035",
       *     "customfield_10036"
       *   ]
       * }
       */
      configurationsListParameters: ConfigurationsListParameters;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanBulkContextualConfiguration>> => {
      return jiraRequest<PageBeanBulkContextualConfiguration>({
        path: "/rest/api/3/app/field/context/configuration/list",
        method: "POST",
        queryParams: {
          id,
          fieldContextId,
          issueId,
          projectKeyOrId,
          issueTypeId,
          startAt,
          maxResults
        },
        body: JSON.stringify(configurationsListParameters),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Update the configuration for contexts of a custom field of a
     * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
     * created by a [Forge app](https://developer.atlassian.com/platform/forge/).
     * 
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are
     * not required for the Forge app that created the custom field type.
     * 
     * @returns Returned if the request is successful.
     */
    updateCustomFieldConfiguration: async ({
      fieldIdOrKey,
      customFieldConfigurations,
      opts
    }: {
      /** The ID or key of the custom field, for example `customfield_10000`. */
      fieldIdOrKey: string;
      /**
       * @example
       * {
       *   "configurations": [
       *     {
       *       "id": "10000"
       *     },
       *     {
       *       "configuration": {
       *         "maxValue": 10000,
       *         "minValue": 0
       *       },
       *       "id": "10001",
       *       "schema": {
       *         "properties": {
       *           "amount": {
       *             "type": "number"
       *           },
       *           "currency": {
       *             "type": "string"
       *           }
       *         },
       *         "required": [
       *           "amount",
       *           "currency"
       *         ]
       *       }
       *     }
       *   ]
       * }
       */
      customFieldConfigurations: CustomFieldConfigurations;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/app/field/{fieldIdOrKey}/context/configuration",
        method: "PUT",
        pathParams: {
          fieldIdOrKey
        },
        body: JSON.stringify(customFieldConfigurations),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}