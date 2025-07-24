import type {
  FieldDetails,
  CustomFieldDefinitionJsonBean,
  UpdateCustomFieldDetails,
  PageBeanContext,
  PageBeanField,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue fields, both system and custom fields. Use it to
 * get fields, field configurations, and create custom fields.
 */
export default function issueFields<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a custom field.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the custom field is created.
     *
     * example:
     * ```
     * {
     *   "clauseNames": [
     *     "cf[10101]",
     *     "New custom field"
     *   ],
     *   "custom": true,
     *   "id": "customfield_10101",
     *   "key": "customfield_10101",
     *   "name": "New custom field",
     *   "navigable": true,
     *   "orderable": true,
     *   "schema": {
     *     "custom": "com.atlassian.jira.plugin.system.customfieldtypes:project",
     *     "customId": 10101,
     *     "type": "project"
     *   },
     *   "searchable": true,
     *   "untranslatedName": "New custom field"
     * }
     * ```
     */
    createCustomField: async ({
      customFieldDefinitionJsonBean,
      opts
    }: {
      /**
       * Definition of the custom field to be created
       *
       * @example
       * {
       *   "description": "Custom field for picking groups",
       *   "name": "New custom field",
       *   "searcherKey": "com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher",
       *   "type": "com.atlassian.jira.plugin.system.customfieldtypes:grouppicker"
       * }
       */
      customFieldDefinitionJsonBean: CustomFieldDefinitionJsonBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<FieldDetails>> => {
      return jiraRequest<FieldDetails>({
        path: "/rest/api/3/field",
        method: "POST",
        body: JSON.stringify(customFieldDefinitionJsonBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a custom field. The custom field is deleted whether it is in the trash
     * or not. See [Edit or delete a custom
     * field](https://confluence.atlassian.com/x/Z44fOw) for more information on
     * trashing and deleting custom fields.
     *
     * This operation is [asynchronous](#async). Follow the `location` link in the
     * response to determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteCustomField: async ({
      id,
      opts
    }: {
      /** The ID of a custom field. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of the contexts a field is used in.
     * Deprecated, use [ Get custom field
     * contexts](#api-rest-api-3-field-fieldId-context-get).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 1,
     *   "startAt": 0,
     *   "total": 5,
     *   "values": [
     *     {
     *       "id": 10001,
     *       "name": "Default Context"
     *     }
     *   ]
     * }
     * ```
     */
    getContextsForFieldDeprecated: async ({
      fieldId,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID of the field to return contexts for. */
      fieldId: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanContext>> => {
      return jiraRequest<PageBeanContext>({
        path: "/rest/api/3/field/{fieldId}/contexts",
        method: "GET",
        pathParams: {
          fieldId
        },
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns system and custom issue fields according to the following rules:
     *
     *  *  Fields that cannot be added to the issue navigator are always returned.
     *  *  Fields that cannot be placed on an issue screen are always returned.
     *  *  Fields that depend on global Jira settings are only returned if the setting
     * is enabled. That is, timetracking fields, subtasks, votes, and watches.
     *  *  For all other fields, this operation only returns the fields that the user
     * has permission to view (that is, the field is used in at least one project that
     * the user has *Browse Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for.)
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "clauseNames": [
     *       "description"
     *     ],
     *     "custom": false,
     *     "id": "description",
     *     "name": "Description",
     *     "navigable": true,
     *     "orderable": true,
     *     "schema": {
     *       "system": "description",
     *       "type": "string"
     *     },
     *     "searchable": true
     *   },
     *   {
     *     "clauseNames": [
     *       "summary"
     *     ],
     *     "custom": false,
     *     "id": "summary",
     *     "key": "summary",
     *     "name": "Summary",
     *     "navigable": true,
     *     "orderable": true,
     *     "schema": {
     *       "system": "summary",
     *       "type": "string"
     *     },
     *     "searchable": true
     *   }
     * ]
     * ```
     *
     */
    getFields: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<FieldDetails[]>
    > => {
      return jiraRequest<FieldDetails[]>({
        path: "/rest/api/3/field",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of fields for Classic Jira projects.
     * The list can include:
     *
     *  *  all fields
     *  *  specific fields, by defining `id`
     *  *  fields that contain a string in the field name or description, by defining
     * `query`
     *  *  specific fields that contain a string in the field name or description, by
     * defining `id` and `query`
     *
     * Use `type` must be set to `custom` to show custom fields only.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "id": "customfield_10000",
     *       "name": "Approvers",
     *       "schema": {
     *         "custom": "com.atlassian.jira.plugin.system.customfieldtypes:multiuserpicker",
     *         "customId": 10000,
     *         "items": "user",
     *         "type": "array"
     *       },
     *       "description": "Contains users needed for approval. This custom field was created by Jira Service Desk.",
     *       "key": "customfield_10000",
     *       "stableId": "sfid:approvers",
     *       "isLocked": true,
     *       "searcherKey": "com.atlassian.jira.plugin.system.customfieldtypes:userpickergroupsearcher",
     *       "screensCount": 2,
     *       "contextsCount": 2,
     *       "lastUsed": {
     *         "type": "TRACKED",
     *         "value": "2021-01-28T07:37:40.000+0000"
     *       }
     *     },
     *     {
     *       "id": "customfield_10001",
     *       "name": "Change reason",
     *       "schema": {
     *         "custom": "com.atlassian.jira.plugin.system.customfieldtypes:select",
     *         "customId": 10001,
     *         "type": "option"
     *       },
     *       "description": "Choose the reason for the change request",
     *       "key": "customfield_10001",
     *       "stableId": "sfid:change-reason",
     *       "isLocked": false,
     *       "searcherKey": "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher",
     *       "screensCount": 2,
     *       "contextsCount": 2,
     *       "projectsCount": 2,
     *       "lastUsed": {
     *         "type": "NOT_TRACKED"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getFieldsPaginated: async ({
      startAt,
      maxResults,
      type,
      id,
      query,
      orderBy,
      expand,
      projectIds,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /** The type of fields to search. */
      type?: ("custom" | "system")[];
      /** The IDs of the custom fields to return or, where `query` is specified, filter. */
      id?: string[];
      /**
       * String used to perform a case-insensitive partial match with field names or
       * descriptions.
       */
      query?: string;
      /**
       * [Order](#ordering) the results by:
       *
       *  *  `contextsCount` sorts by the number of contexts related to a field
       *  *  `lastUsed` sorts by the date when the value of the field last changed
       *  *  `name` sorts by the field name
       *  *  `screensCount` sorts by the number of screens related to a field
       */
      orderBy?:
        | "contextsCount"
        | "-contextsCount"
        | "+contextsCount"
        | "lastUsed"
        | "-lastUsed"
        | "+lastUsed"
        | "name"
        | "-name"
        | "+name"
        | "screensCount"
        | "-screensCount"
        | "+screensCount"
        | "projectsCount"
        | "-projectsCount"
        | "+projectsCount";
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `key` returns the key for each field
       *  *  `stableId` returns the stableId for each field
       *  *  `lastUsed` returns the date when the value of the field last changed
       *  *  `screensCount` returns the number of screens related to a field
       *  *  `contextsCount` returns the number of contexts related to a field
       *  *  `isLocked` returns information about whether the field is locked
       *  *  `searcherKey` returns the searcher key for each custom field
       */
      expand?: string;
      /**
       * The IDs of the projects to filter the fields by. Fields belonging to project
       * Ids that the user does not have access to will not be returned
       */
      projectIds?: number[];
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanField>> => {
      return jiraRequest<PageBeanField>({
        path: "/rest/api/3/field/search",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          type,
          id,
          query,
          orderBy,
          expand,
          projectIds
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of fields in the trash. The list may be
     * restricted to fields whose field name or description partially match a string.
     *
     * Only custom fields can be queried, `type` must be set to `custom`.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1,
     *   "values": [
     *     {
     *       "id": "customfield_10000",
     *       "name": "Approvers",
     *       "schema": {
     *         "custom": "com.atlassian.jira.plugin.system.customfieldtypes:multiuserpicker",
     *         "customId": 10003,
     *         "type": "array"
     *       },
     *       "description": "Contains users needed for approval. This custom field was created by Jira Service Desk.",
     *       "key": "customfield_10003",
     *       "trashedDate": "2022-10-06T07:32:47.000+0000",
     *       "trashedBy": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "active": true,
     *         "avatarUrls": {
     *           "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *           "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *           "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *           "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *         },
     *         "displayName": "Mia Krystof",
     *         "emailAddress": "mia@example.com",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *         "timeZone": "Australia/Sydney"
     *       },
     *       "plannedDeletionDate": "2022-10-24T07:32:47.000+0000"
     *     }
     *   ]
     * }
     * ```
     */
    getTrashedFieldsPaginated: async ({
      startAt,
      maxResults,
      id,
      query,
      expand,
      orderBy,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      id?: string[];
      /**
       * String used to perform a case-insensitive partial match with field names or
       * descriptions.
       */
      query?: string;
      expand?:
        | "name"
        | "-name"
        | "+name"
        | "trashDate"
        | "-trashDate"
        | "+trashDate"
        | "plannedDeletionDate"
        | "-plannedDeletionDate"
        | "+plannedDeletionDate"
        | "projectsCount"
        | "-projectsCount"
        | "+projectsCount";
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `name` sorts by the field name
       *  *  `trashDate` sorts by the date the field was moved to the trash
       *  *  `plannedDeletionDate` sorts by the planned deletion date
       */
      orderBy?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanField>> => {
      return jiraRequest<PageBeanField>({
        path: "/rest/api/3/field/search/trashed",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          query,
          expand,
          orderBy
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Restores a custom field from trash. See [Edit or delete a custom
     * field](https://confluence.atlassian.com/x/Z44fOw) for more information on
     * trashing and deleting custom fields.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    restoreCustomField: async ({
      id,
      opts
    }: {
      /** The ID of a custom field. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/field/{id}/restore",
        method: "POST",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Moves a custom field to trash. See [Edit or delete a custom
     * field](https://confluence.atlassian.com/x/Z44fOw) for more information on
     * trashing and deleting custom fields.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    trashCustomField: async ({
      id,
      opts
    }: {
      /** The ID of a custom field. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/field/{id}/trash",
        method: "POST",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a custom field.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateCustomField: async ({
      fieldId,
      updateCustomFieldDetails,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /**
       * The custom field update details.
       *
       * @example
       * {
       *   "description": "Select the manager and the corresponding employee.",
       *   "name": "Managers and employees list",
       *   "searcherKey": "com.atlassian.jira.plugin.system.customfieldtypes:cascadingselectsearcher"
       * }
       */
      updateCustomFieldDetails: UpdateCustomFieldDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}",
        method: "PUT",
        pathParams: {
          fieldId
        },
        body: JSON.stringify(updateCustomFieldDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
