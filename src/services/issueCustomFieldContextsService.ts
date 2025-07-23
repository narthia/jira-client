import type {
  IssueTypeIds,
  PageBeanCustomFieldContext,
  CreateCustomFieldContext,
  CustomFieldContextUpdateDetails,
  ProjectIds,
  PageBeanCustomFieldContextDefaultValue,
  CustomFieldContextDefaultValueUpdate,
  PageBeanIssueTypeToContextMapping,
  ProjectIssueTypeMappings,
  PageBeanContextForProjectAndIssueType,
  PageBeanCustomFieldContextProjectMapping,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue custom field contexts. Use it to:
 *
 *  *  get, create, update, and delete custom field contexts.
 *  *  get context to issue types and projects mappings.
 *  *  get custom field contexts for projects and issue types.
 *  *  assign custom field contexts to projects.
 *  *  remove custom field contexts from projects.
 *  *  add issue types to custom field contexts.
 */
export default function issueCustomFieldContexts<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds issue types to a custom field context, appending the issue types to the
     * issue types list.
     *
     * A custom field context without any issue types applies to all issue types.
     * Adding issue types to such a custom field context would result in it applying
     * to only the listed issue types.
     *
     * If any of the issue types exists in the custom field context, the operation
     * fails and no issue types are added.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if operation is successful.
     */
    addIssueTypesToContext: async ({
      fieldId,
      contextId,
      issueTypeIds,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
      /**
       * @example
       * {
       *   "issueTypeIds": [
       *     "10001",
       *     "10005",
       *     "10006"
       *   ]
       * }
       */
      issueTypeIds: IssueTypeIds;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/issuetype",
        method: "PUT",
        pathParams: {
          fieldId,
          contextId
        },
        body: JSON.stringify(issueTypeIds),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Assigns a custom field context to projects.
     *
     * If any project in the request is assigned to any context of the custom field,
     * the operation fails.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if operation is successful.
     */
    assignProjectsToCustomFieldContext: async ({
      fieldId,
      contextId,
      projectIds,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
      /**
       * @example
       * {
       *   "projectIds": [
       *     "10001",
       *     "10005",
       *     "10006"
       *   ]
       * }
       */
      projectIds: ProjectIds;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/project",
        method: "PUT",
        pathParams: {
          fieldId,
          contextId
        },
        body: JSON.stringify(projectIds),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates a custom field context.
     *
     * If `projectIds` is empty, a global context is created. A global context is one
     * that applies to all project. If `issueTypeIds` is empty, the context applies to
     * all issue types.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the custom field context is created.
     *
     * example:
     * ```
     * {
     *   "id": "10025",
     *   "name": "Bug fields context",
     *   "description": "A context used to define the custom field options for bugs.",
     *   "projectIds": [],
     *   "issueTypeIds": [
     *     "10010"
     *   ]
     * }
     * ```
     */
    createCustomFieldContext: async ({
      fieldId,
      createCustomFieldContext,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /**
       * @example
       * {
       *   "description": "A context used to define the custom field options for bugs.",
       *   "issueTypeIds": [
       *     "10010"
       *   ],
       *   "name": "Bug fields context",
       *   "projectIds": []
       * }
       */
      createCustomFieldContext: CreateCustomFieldContext;
    } & WithRequestOpts<TClient>): Promise<JiraResult<CreateCustomFieldContext>> => {
      return jiraRequest<CreateCustomFieldContext>({
        path: "/rest/api/3/field/{fieldId}/context",
        method: "POST",
        pathParams: {
          fieldId
        },
        body: JSON.stringify(createCustomFieldContext),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a [ custom field
     * context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the context is deleted.
     */
    deleteCustomFieldContext: async ({
      fieldId,
      contextId,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}",
        method: "DELETE",
        pathParams: {
          fieldId,
          contextId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of [
     * contexts](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html)
     * for a custom field. Contexts can be returned as follows:
     *
     *  *  With no other parameters set, all contexts.
     *  *  By defining `id` only, all contexts from the list of IDs.
     *  *  By defining `isAnyIssueType`, limit the list of contexts returned to either
     * those that apply to all issue types (true) or those that apply to only a subset
     * of issue types (false)
     *  *  By defining `isGlobalContext`, limit the list of contexts return to either
     * those that apply to all projects (global contexts) (true) or those that apply
     * to only a subset of projects (false).
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
     *   "total": 2,
     *   "values": [
     *     {
     *       "id": "10025",
     *       "name": "Bug fields context",
     *       "description": "A context used to define the custom field options for bugs.",
     *       "isGlobalContext": true,
     *       "isAnyIssueType": false
     *     },
     *     {
     *       "id": "10026",
     *       "name": "Task fields context",
     *       "description": "A context used to define the custom field options for tasks.",
     *       "isGlobalContext": false,
     *       "isAnyIssueType": false
     *     }
     *   ]
     * }
     * ```
     */
    getContextsForField: async ({
      fieldId,
      isAnyIssueType,
      isGlobalContext,
      contextId,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** Whether to return contexts that apply to all issue types. */
      isAnyIssueType?: boolean;
      /** Whether to return contexts that apply to all projects. */
      isGlobalContext?: boolean;
      /**
       * The list of context IDs. To include multiple contexts, separate IDs with
       * ampersand: `contextId=10000&contextId=10001`.
       */
      contextId?: number[];
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanCustomFieldContext>> => {
      return jiraRequest<PageBeanCustomFieldContext>({
        path: "/rest/api/3/field/{fieldId}/context",
        method: "GET",
        pathParams: {
          fieldId
        },
        queryParams: {
          isAnyIssueType,
          isGlobalContext,
          contextId,
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of project and issue type mappings and,
     * for each mapping, the ID of a [custom field
     * context](https://confluence.atlassian.com/x/k44fOw) that applies to the project
     * and issue type.
     *
     * If there is no custom field context assigned to the project then, if present,
     * the custom field context that applies to all projects is returned if it also
     * applies to the issue type or all issue types. If a custom field context is not
     * found, the returned custom field context ID is `null`.
     *
     * Duplicate project and issue type mappings cannot be provided in the request.
     *
     * The order of the returned values is the same as provided in the request.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 3,
     *   "values": [
     *     {
     *       "projectId": "10000",
     *       "issueTypeId": "10000",
     *       "contextId": "10000"
     *     },
     *     {
     *       "projectId": "10000",
     *       "issueTypeId": "10001",
     *       "contextId": null
     *     },
     *     {
     *       "projectId": "10001",
     *       "issueTypeId": "10002",
     *       "contextId": "10003"
     *     }
     *   ]
     * }
     * ```
     */
    getCustomFieldContextsForProjectsAndIssueTypes: async ({
      fieldId,
      startAt,
      maxResults,
      projectIssueTypeMappings,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of project and issue type mappings.
       *
       * @example
       * {
       *   "mappings": [
       *     {
       *       "issueTypeId": "10000",
       *       "projectId": "10000"
       *     },
       *     {
       *       "issueTypeId": "10001",
       *       "projectId": "10000"
       *     },
       *     {
       *       "issueTypeId": "10002",
       *       "projectId": "10001"
       *     }
       *   ]
       * }
       */
      projectIssueTypeMappings: ProjectIssueTypeMappings;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanContextForProjectAndIssueType>> => {
      return jiraRequest<PageBeanContextForProjectAndIssueType>({
        path: "/rest/api/3/field/{fieldId}/context/mapping",
        method: "POST",
        pathParams: {
          fieldId
        },
        queryParams: {
          startAt,
          maxResults
        },
        body: JSON.stringify(projectIssueTypeMappings),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of defaults for a custom field. The
     * results can be filtered by `contextId`, otherwise all values are returned. If
     * no defaults are set for a context, nothing is returned.
     * The returned object depends on type of the custom field:
     *
     *  *  `CustomFieldContextDefaultValueDate` (type `datepicker`) for date fields.
     *  *  `CustomFieldContextDefaultValueDateTime` (type `datetimepicker`) for
     * date-time fields.
     *  *  `CustomFieldContextDefaultValueSingleOption` (type `option.single`) for
     * single choice select lists and radio buttons.
     *  *  `CustomFieldContextDefaultValueMultipleOption` (type `option.multiple`) for
     * multiple choice select lists and checkboxes.
     *  *  `CustomFieldContextDefaultValueCascadingOption` (type `option.cascading`)
     * for cascading select lists.
     *  *  `CustomFieldContextSingleUserPickerDefaults` (type `single.user.select`)
     * for single users.
     *  *  `CustomFieldContextDefaultValueMultiUserPicker` (type `multi.user.select`)
     * for user lists.
     *  *  `CustomFieldContextDefaultValueSingleGroupPicker` (type
     * `grouppicker.single`) for single choice group pickers.
     *  *  `CustomFieldContextDefaultValueMultipleGroupPicker` (type
     * `grouppicker.multiple`) for multiple choice group pickers.
     *  *  `CustomFieldContextDefaultValueURL` (type `url`) for URLs.
     *  *  `CustomFieldContextDefaultValueProject` (type `project`) for project
     * pickers.
     *  *  `CustomFieldContextDefaultValueFloat` (type `float`) for floats
     * (floating-point numbers).
     *  *  `CustomFieldContextDefaultValueLabels` (type `labels`) for labels.
     *  *  `CustomFieldContextDefaultValueTextField` (type `textfield`) for text
     * fields.
     *  *  `CustomFieldContextDefaultValueTextArea` (type `textarea`) for text area
     * fields.
     *  *  `CustomFieldContextDefaultValueReadOnly` (type `readonly`) for read only
     * (text) fields.
     *  *  `CustomFieldContextDefaultValueMultipleVersion` (type `version.multiple`)
     * for single choice version pickers.
     *  *  `CustomFieldContextDefaultValueSingleVersion` (type `version.single`) for
     * multiple choice version pickers.
     *
     * Forge custom fields
     * [types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/#data-types)
     * are also supported, returning:
     *
     *  *  `CustomFieldContextDefaultValueForgeStringFieldBean` (type `forge.string`)
     * for Forge string fields.
     *  *  `CustomFieldContextDefaultValueForgeMultiStringFieldBean` (type
     * `forge.string.list`) for Forge string collection fields.
     *  *  `CustomFieldContextDefaultValueForgeObjectFieldBean` (type `forge.object`)
     * for Forge object fields.
     *  *  `CustomFieldContextDefaultValueForgeDateTimeFieldBean` (type
     * `forge.datetime`) for Forge date-time fields.
     *  *  `CustomFieldContextDefaultValueForgeGroupFieldBean` (type `forge.group`)
     * for Forge group fields.
     *  *  `CustomFieldContextDefaultValueForgeMultiGroupFieldBean` (type
     * `forge.group.list`) for Forge group collection fields.
     *  *  `CustomFieldContextDefaultValueForgeNumberFieldBean` (type `forge.number`)
     * for Forge number fields.
     *  *  `CustomFieldContextDefaultValueForgeUserFieldBean` (type `forge.user`) for
     * Forge user fields.
     *  *  `CustomFieldContextDefaultValueForgeMultiUserFieldBean` (type
     * `forge.user.list`) for Forge user collection fields.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 3,
     *   "values": [
     *     {
     *       "contextId": "10100",
     *       "optionId": "10001"
     *     },
     *     {
     *       "contextId": "10101",
     *       "optionId": "10003"
     *     },
     *     {
     *       "contextId": "10103"
     *     }
     *   ]
     * }
     * ```
     */
    getDefaultValues: async ({
      fieldId,
      contextId,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID of the custom field, for example `customfield\_10000`. */
      fieldId: string;
      /** The IDs of the contexts. */
      contextId?: number[];
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanCustomFieldContextDefaultValue>> => {
      return jiraRequest<PageBeanCustomFieldContextDefaultValue>({
        path: "/rest/api/3/field/{fieldId}/context/defaultValue",
        method: "GET",
        pathParams: {
          fieldId
        },
        queryParams: {
          contextId,
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of context to issue type mappings for a
     * custom field. Mappings are returned for all contexts or a list of contexts.
     * Mappings are ordered first by context ID and then by issue type ID.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if operation is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 100,
     *   "startAt": 0,
     *   "total": 3,
     *   "values": [
     *     {
     *       "contextId": "10001",
     *       "issueTypeId": "10010"
     *     },
     *     {
     *       "contextId": "10001",
     *       "issueTypeId": "10011"
     *     },
     *     {
     *       "contextId": "10002",
     *       "isAnyIssueType": true
     *     }
     *   ]
     * }
     * ```
     */
    getIssueTypeMappingsForContexts: async ({
      fieldId,
      contextId,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /**
       * The ID of the context. To include multiple contexts, provide an
       * ampersand-separated list. For example, `contextId=10001&contextId=10002`.
       */
      contextId?: number[];
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanIssueTypeToContextMapping>> => {
      return jiraRequest<PageBeanIssueTypeToContextMapping>({
        path: "/rest/api/3/field/{fieldId}/context/issuetypemapping",
        method: "GET",
        pathParams: {
          fieldId
        },
        queryParams: {
          contextId,
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of context to project mappings for a
     * custom field. The result can be filtered by `contextId`. Otherwise, all
     * mappings are returned. Invalid IDs are ignored.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 100,
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "contextId": "10025",
     *       "projectId": "10001"
     *     },
     *     {
     *       "contextId": "10026",
     *       "isGlobalContext": true
     *     }
     *   ]
     * }
     * ```
     */
    getProjectContextMapping: async ({
      fieldId,
      contextId,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID of the custom field, for example `customfield\_10000`. */
      fieldId: string;
      /**
       * The list of context IDs. To include multiple context, separate IDs with
       * ampersand: `contextId=10000&contextId=10001`.
       */
      contextId?: number[];
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<PageBeanCustomFieldContextProjectMapping>
    > => {
      return jiraRequest<PageBeanCustomFieldContextProjectMapping>({
        path: "/rest/api/3/field/{fieldId}/context/projectmapping",
        method: "GET",
        pathParams: {
          fieldId
        },
        queryParams: {
          contextId,
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Removes a custom field context from projects.
     *
     * A custom field context without any projects applies to all projects. Removing
     * all projects from a custom field context would result in it applying to all
     * projects.
     *
     * If any project in the request is not assigned to the context, or the operation
     * would result in two global contexts for the field, the operation fails.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the custom field context is removed from the projects.
     */
    removeCustomFieldContextFromProjects: async ({
      fieldId,
      contextId,
      projectIds,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
      /**
       * @example
       * {
       *   "projectIds": [
       *     "10001",
       *     "10005",
       *     "10006"
       *   ]
       * }
       */
      projectIds: ProjectIds;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/project/remove",
        method: "POST",
        pathParams: {
          fieldId,
          contextId
        },
        body: JSON.stringify(projectIds),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Removes issue types from a custom field context.
     *
     * A custom field context without any issue types applies to all issue types.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if operation is successful.
     */
    removeIssueTypesFromContext: async ({
      fieldId,
      contextId,
      issueTypeIds,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
      /**
       * @example
       * {
       *   "issueTypeIds": [
       *     "10001",
       *     "10005",
       *     "10006"
       *   ]
       * }
       */
      issueTypeIds: IssueTypeIds;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}/issuetype/remove",
        method: "POST",
        pathParams: {
          fieldId,
          contextId
        },
        body: JSON.stringify(issueTypeIds),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets default for contexts of a custom field. Default are defined using these
     * objects:
     *
     *  *  `CustomFieldContextDefaultValueDate` (type `datepicker`) for date fields.
     *  *  `CustomFieldContextDefaultValueDateTime` (type `datetimepicker`) for
     * date-time fields.
     *  *  `CustomFieldContextDefaultValueSingleOption` (type `option.single`) for
     * single choice select lists and radio buttons.
     *  *  `CustomFieldContextDefaultValueMultipleOption` (type `option.multiple`) for
     * multiple choice select lists and checkboxes.
     *  *  `CustomFieldContextDefaultValueCascadingOption` (type `option.cascading`)
     * for cascading select lists.
     *  *  `CustomFieldContextSingleUserPickerDefaults` (type `single.user.select`)
     * for single users.
     *  *  `CustomFieldContextDefaultValueMultiUserPicker` (type `multi.user.select`)
     * for user lists.
     *  *  `CustomFieldContextDefaultValueSingleGroupPicker` (type
     * `grouppicker.single`) for single choice group pickers.
     *  *  `CustomFieldContextDefaultValueMultipleGroupPicker` (type
     * `grouppicker.multiple`) for multiple choice group pickers.
     *  *  `CustomFieldContextDefaultValueURL` (type `url`) for URLs.
     *  *  `CustomFieldContextDefaultValueProject` (type `project`) for project
     * pickers.
     *  *  `CustomFieldContextDefaultValueFloat` (type `float`) for floats
     * (floating-point numbers).
     *  *  `CustomFieldContextDefaultValueLabels` (type `labels`) for labels.
     *  *  `CustomFieldContextDefaultValueTextField` (type `textfield`) for text
     * fields.
     *  *  `CustomFieldContextDefaultValueTextArea` (type `textarea`) for text area
     * fields.
     *  *  `CustomFieldContextDefaultValueReadOnly` (type `readonly`) for read only
     * (text) fields.
     *  *  `CustomFieldContextDefaultValueMultipleVersion` (type `version.multiple`)
     * for single choice version pickers.
     *  *  `CustomFieldContextDefaultValueSingleVersion` (type `version.single`) for
     * multiple choice version pickers.
     *
     * Forge custom fields
     * [types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/#data-types)
     * are also supported, returning:
     *
     *  *  `CustomFieldContextDefaultValueForgeStringFieldBean` (type `forge.string`)
     * for Forge string fields.
     *  *  `CustomFieldContextDefaultValueForgeMultiStringFieldBean` (type
     * `forge.string.list`) for Forge string collection fields.
     *  *  `CustomFieldContextDefaultValueForgeObjectFieldBean` (type `forge.object`)
     * for Forge object fields.
     *  *  `CustomFieldContextDefaultValueForgeDateTimeFieldBean` (type
     * `forge.datetime`) for Forge date-time fields.
     *  *  `CustomFieldContextDefaultValueForgeGroupFieldBean` (type `forge.group`)
     * for Forge group fields.
     *  *  `CustomFieldContextDefaultValueForgeMultiGroupFieldBean` (type
     * `forge.group.list`) for Forge group collection fields.
     *  *  `CustomFieldContextDefaultValueForgeNumberFieldBean` (type `forge.number`)
     * for Forge number fields.
     *  *  `CustomFieldContextDefaultValueForgeUserFieldBean` (type `forge.user`) for
     * Forge user fields.
     *  *  `CustomFieldContextDefaultValueForgeMultiUserFieldBean` (type
     * `forge.user.list`) for Forge user collection fields.
     *
     * Only one type of default object can be included in a request. To remove a
     * default for a context, set the default parameter to `null`.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if operation is successful.
     */
    setDefaultValues: async ({
      fieldId,
      customFieldContextDefaultValueUpdate,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /**
       * @example
       * {
       *   "defaultValues": [
       *     {
       *       "contextId": "10100",
       *       "optionId": "10001",
       *       "type": "option.single"
       *     },
       *     {
       *       "contextId": "10101",
       *       "optionId": "10003",
       *       "type": "option.single"
       *     },
       *     {
       *       "contextId": "10103",
       *       "optionId": "10005",
       *       "type": "option.single"
       *     }
       *   ]
       * }
       */
      customFieldContextDefaultValueUpdate: CustomFieldContextDefaultValueUpdate;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/defaultValue",
        method: "PUT",
        pathParams: {
          fieldId
        },
        body: JSON.stringify(customFieldContextDefaultValueUpdate),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates a [ custom field
     * context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the context is updated.
     */
    updateCustomFieldContext: async ({
      fieldId,
      contextId,
      customFieldContextUpdateDetails,
      opts
    }: {
      /** The ID of the custom field. */
      fieldId: string;
      /** The ID of the context. */
      contextId: number;
      /**
       * @example
       * {
       *   "description": "A context used to define the custom field options for bugs.",
       *   "name": "Bug fields context"
       * }
       */
      customFieldContextUpdateDetails: CustomFieldContextUpdateDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldId}/context/{contextId}",
        method: "PUT",
        pathParams: {
          fieldId,
          contextId
        },
        body: JSON.stringify(customFieldContextUpdateDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
