import type {
  CustomFieldOption,
  PageBeanCustomFieldContextOption,
  BulkCustomFieldOptionUpdateRequest,
  CustomFieldUpdatedContextOptionsList,
  BulkCustomFieldOptionCreateRequest,
  CustomFieldCreatedContextOptionsList,
  OrderOfCustomFieldOptions,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents custom issue field select list options created in Jira
 * or using the REST API. This resource supports the following field types:
 *
 *  *  Checkboxes.
 *  *  Radio Buttons.
 *  *  Select List (single choice).
 *  *  Select List (multiple choices).
 *  *  Select List (cascading).
 *
 * See [Issue custom field options
 * (apps)](#api-group-Issue-custom-field-options--apps-) to manipulate custom
 * issue field select list options created by a Connect app.
 *
 * Use it to retrieve, create, update, order, and delete custom field options.
 */
export default function issueCustomFieldOptions<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates options and, where the custom select field is of the type Select List
     * (cascading), cascading options for a custom select field. The options are added
     * to a context of the field.
     *
     * The maximum number of options that can be created per request is 1000 and each
     * field can have a maximum of 10000 options.
     *
     * This operation works for custom field options created in Jira or the operations
     * from this resource. **To work with issue field select list options created for
     * Connect apps use the [Issue custom field options
     * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "options": [
     *     {
     *       "disabled": false,
     *       "id": "10001",
     *       "value": "Scranton"
     *     },
     *     {
     *       "disabled": true,
     *       "id": "10002",
     *       "optionId": "10000",
     *       "value": "Manhattan"
     *     },
     *     {
     *       "disabled": false,
     *       "id": "10003",
     *       "value": "The Electric City"
     *     }
     *   ]
     * }
     * ```
     */
    createCustomFieldOption: async ({
      fieldId,
      contextId,
      bulkCustomFieldOptionCreateRequest,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
      /**
       * @example
       * {
       *   "options": [
       *     {
       *       "disabled": false,
       *       "value": "Scranton"
       *     },
       *     {
       *       "disabled": true,
       *       "optionId": "10000",
       *       "value": "Manhattan"
       *     },
       *     {
       *       "disabled": false,
       *       "value": "The Electric City"
       *     }
       *   ]
       * }
       */
      bulkCustomFieldOptionCreateRequest: BulkCustomFieldOptionCreateRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<CustomFieldCreatedContextOptionsList>> => {
      return jiraRequest<CustomFieldCreatedContextOptionsList>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/option",
        method: "POST",
        pathParams: {
          fieldId,
          contextId
        },
        body: JSON.stringify(bulkCustomFieldOptionCreateRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a custom field option.
     *
     * Options with cascading options cannot be deleted without deleting the cascading
     * options first.
     *
     * This operation works for custom field options created in Jira or the operations
     * from this resource. **To work with issue field select list options created for
     * Connect apps use the [Issue custom field options
     * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteCustomFieldOption: async ({
      fieldId,
      contextId,
      optionId,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context from which an option should be deleted. */
      contextId: number;
      /** The ID of the option to delete. */
      optionId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/option/{optionId}",
        method: "DELETE",
        pathParams: {
          fieldId,
          contextId,
          optionId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a custom field option. For example, an option in a select list.
     *
     * Note that this operation **only works for issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource**, it cannot be used
     * with issue field select list options created by Connect apps.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** The custom field option is returned
     * as follows:
     *
     *  *  if the user has the *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  if the user has the *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for at least one project
     * the custom field is used in, and the field is visible in at least one layout
     * the user has permission to view.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "self": "https://your-domain.atlassian.net/rest/api/3/customFieldOption/10000",
     *   "value": "To Do"
     * }
     * ```
     */
    getCustomFieldOption: async ({
      id,
      opts
    }: {
      /** The ID of the custom field option. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<CustomFieldOption>> => {
      return jiraRequest<CustomFieldOption>({
        path: "/rest/api/3/customFieldOption/{id}",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of all custom field option for a
     * context. Options are returned first then cascading options, in the order they
     * display in Jira.
     *
     * This operation works for custom field options created in Jira or the operations
     * from this resource. **To work with issue field select list options created for
     * Connect apps use the [Issue custom field options
     * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). *Edit Workflow* [edit
     * workflow
     * permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Edit-Workflows)
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 100,
     *   "startAt": 0,
     *   "total": 4,
     *   "values": [
     *     {
     *       "id": "10001",
     *       "value": "New York"
     *     },
     *     {
     *       "id": "10002",
     *       "value": "Boston",
     *       "disabled": true
     *     },
     *     {
     *       "id": "10004",
     *       "value": "Denver"
     *     },
     *     {
     *       "id": "10003",
     *       "value": "Brooklyn",
     *       "optionId": "10001"
     *     }
     *   ]
     * }
     * ```
     */
    getOptionsForContext: async ({
      fieldId,
      contextId,
      optionId,
      onlyOptions,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
      /** The ID of the option. */
      optionId?: number;
      /** Whether only options are returned. */
      onlyOptions?: boolean;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanCustomFieldContextOption>> => {
      return jiraRequest<PageBeanCustomFieldContextOption>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/option",
        method: "GET",
        pathParams: {
          fieldId,
          contextId
        },
        queryParams: {
          optionId,
          onlyOptions,
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Changes the order of custom field options or cascading options in a context.
     *
     * This operation works for custom field options created in Jira or the operations
     * from this resource. **To work with issue field select list options created for
     * Connect apps use the [Issue custom field options
     * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if options are reordered.
     */
    reorderCustomFieldOptions: async ({
      fieldId,
      contextId,
      orderOfCustomFieldOptions,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
      /**
       * @example
       * {
       *   "customFieldOptionIds": [
       *     "10001",
       *     "10002"
       *   ],
       *   "position": "First"
       * }
       */
      orderOfCustomFieldOptions: OrderOfCustomFieldOptions;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/option/move",
        method: "PUT",
        pathParams: {
          fieldId,
          contextId
        },
        body: JSON.stringify(orderOfCustomFieldOptions),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Replaces the options of a custom field.
     *
     * Note that this operation **only works for issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource**, it cannot be used
     * with issue field select list options created by Connect or Forge apps.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    replaceCustomFieldOption: async ({
      fieldId,
      optionId,
      contextId,
      replaceWith,
      jql,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the option to be deselected. */
      optionId: number;
      /** The ID of the context. */
      contextId: number;
      /** The ID of the option that will replace the currently selected option. */
      replaceWith?: number;
      /**
       * A JQL query that specifies the issues to be updated. For example,
       * *project=10000*.
       */
      jql?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/option/{optionId}/issue",
        method: "DELETE",
        pathParams: {
          fieldId,
          optionId,
          contextId
        },
        queryParams: {
          replaceWith,
          jql
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates the options of a custom field.
     *
     * If any of the options are not found, no options are updated. Options where the
     * values in the request match the current values aren't updated and aren't
     * reported in the response.
     *
     * Note that this operation **only works for issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource**, it cannot be used
     * with issue field select list options created by Connect apps.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "options": [
     *     {
     *       "disabled": false,
     *       "id": "10001",
     *       "value": "Scranton"
     *     },
     *     {
     *       "disabled": true,
     *       "id": "10002",
     *       "value": "Manhattan"
     *     },
     *     {
     *       "disabled": false,
     *       "id": "10003",
     *       "value": "The Electric City"
     *     }
     *   ]
     * }
     * ```
     */
    updateCustomFieldOption: async ({
      fieldId,
      contextId,
      bulkCustomFieldOptionUpdateRequest,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
      /**
       * @example
       * {
       *   "options": [
       *     {
       *       "disabled": false,
       *       "id": "10001",
       *       "value": "Scranton"
       *     },
       *     {
       *       "disabled": true,
       *       "id": "10002",
       *       "value": "Manhattan"
       *     },
       *     {
       *       "disabled": false,
       *       "id": "10003",
       *       "value": "The Electric City"
       *     }
       *   ]
       * }
       */
      bulkCustomFieldOptionUpdateRequest: BulkCustomFieldOptionUpdateRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<CustomFieldUpdatedContextOptionsList>> => {
      return jiraRequest<CustomFieldUpdatedContextOptionsList>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/option",
        method: "PUT",
        pathParams: {
          fieldId,
          contextId
        },
        body: JSON.stringify(bulkCustomFieldOptionUpdateRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
