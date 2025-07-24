import type {
  PageBeanFieldConfigurationDetails,
  FieldConfigurationDetails,
  FieldConfiguration,
  PageBeanFieldConfigurationItem,
  FieldConfigurationItemsDetails,
  PageBeanFieldConfigurationScheme,
  UpdateFieldConfigurationSchemeDetails,
  FieldConfigurationScheme,
  AssociateFieldConfigurationsWithIssueTypesRequest,
  IssueTypeIdsToRemove,
  PageBeanFieldConfigurationIssueTypeItem,
  PageBeanFieldConfigurationSchemeProjects,
  FieldConfigurationSchemeProjectAssociation,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue field configurations. Use it to get, set, and
 * delete field configurations and field configuration schemes.
 */
export default function issueFieldConfigurations<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Assigns a field configuration scheme to a project. If the field configuration
     * scheme ID is `null`, the operation assigns the default field configuration
     * scheme.
     *
     * Field configuration schemes can only be assigned to classic projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    assignFieldConfigurationSchemeToProject: async ({
      fieldConfigurationSchemeProjectAssociation,
      opts
    }: {
      /**
       * @example
       * {
       *   "fieldConfigurationSchemeId": "10000",
       *   "projectId": "10000"
       * }
       */
      fieldConfigurationSchemeProjectAssociation: FieldConfigurationSchemeProjectAssociation;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/fieldconfigurationscheme/project",
        method: "PUT",
        body: JSON.stringify(fieldConfigurationSchemeProjectAssociation),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates a field configuration. The field configuration is created with the same
     * field properties as the default configuration, with all the fields being
     * optional.
     *
     * This operation can only create configurations for use in company-managed
     * (classic) projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "My field configuration description",
     *   "id": 10001,
     *   "name": "My Field Configuration"
     * }
     * ```
     */
    createFieldConfiguration: async ({
      fieldConfigurationDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "My field configuration description",
       *   "name": "My Field Configuration"
       * }
       */
      fieldConfigurationDetails: FieldConfigurationDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<FieldConfiguration>> => {
      return jiraRequest<FieldConfiguration>({
        path: "/rest/api/3/fieldconfiguration",
        method: "POST",
        body: JSON.stringify(fieldConfigurationDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates a field configuration scheme.
     *
     * This operation can only create field configuration schemes used in
     * company-managed (classic) projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "We can use this one for software projects.",
     *   "id": "10002",
     *   "name": "Field Configuration Scheme for software related projects"
     * }
     * ```
     */
    createFieldConfigurationScheme: async ({
      updateFieldConfigurationSchemeDetails,
      opts
    }: {
      /**
       * The details of the field configuration scheme.
       *
       * @example
       * {
       *   "description": "We can use this one for software projects.",
       *   "name": "Field Configuration Scheme for software related projects"
       * }
       */
      updateFieldConfigurationSchemeDetails: UpdateFieldConfigurationSchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<FieldConfigurationScheme>> => {
      return jiraRequest<FieldConfigurationScheme>({
        path: "/rest/api/3/fieldconfigurationscheme",
        method: "POST",
        body: JSON.stringify(updateFieldConfigurationSchemeDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a field configuration.
     *
     * This operation can only delete configurations used in company-managed (classic)
     * projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deleteFieldConfiguration: async ({
      id,
      opts
    }: {
      /** The ID of the field configuration. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/fieldconfiguration/{id}",
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
     * Deletes a field configuration scheme.
     *
     * This operation can only delete field configuration schemes used in
     * company-managed (classic) projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deleteFieldConfigurationScheme: async ({
      id,
      opts
    }: {
      /** The ID of the field configuration scheme. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/fieldconfigurationscheme/{id}",
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
     * Returns a [paginated](#pagination) list of field configurations. The list can
     * be for all field configurations or a subset determined by any combination of
     * these criteria:
     *
     *  *  a list of field configuration item IDs.
     *  *  whether the field configuration is a default.
     *  *  whether the field configuration name or description contains a query string.
     *
     * Only field configurations used in company-managed (classic) projects are
     * returned.
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
     *   "total": 2,
     *   "values": [
     *     {
     *       "id": 10000,
     *       "name": "Default Field Configuration",
     *       "description": "The default field configuration description",
     *       "isDefault": true
     *     },
     *     {
     *       "id": 10001,
     *       "name": "My Field Configuration",
     *       "description": "My field configuration description"
     *     }
     *   ]
     * }
     * ```
     */
    getAllFieldConfigurations: async ({
      startAt,
      maxResults,
      id,
      isDefault,
      query,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of field configuration IDs. To include multiple IDs, provide an
       * ampersand-separated list. For example, `id=10000&id=10001`.
       */
      id?: number[];
      /** If *true* returns default field configurations only. */
      isDefault?: boolean;
      /**
       * The query string used to match against field configuration names and
       * descriptions.
       */
      query?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanFieldConfigurationDetails>> => {
      return jiraRequest<PageBeanFieldConfigurationDetails>({
        path: "/rest/api/3/fieldconfiguration",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          isDefault,
          query
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of field configuration schemes.
     *
     * Only field configuration schemes used in classic projects are returned.
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
     *   "maxResults": 10,
     *   "startAt": 0,
     *   "total": 3,
     *   "values": [
     *     {
     *       "id": "10000",
     *       "name": "Field Configuration Scheme for Bugs",
     *       "description": "This field configuration scheme is for bugs only."
     *     },
     *     {
     *       "id": "10001",
     *       "name": "Field Configuration Scheme for software related projects",
     *       "description": "We can use this one for software projects."
     *     },
     *     {
     *       "id": "10002",
     *       "name": "Field Configuration Scheme for Epics",
     *       "description": "Use this one for Epic issue type."
     *     }
     *   ]
     * }
     * ```
     */
    getAllFieldConfigurationSchemes: async ({
      startAt,
      maxResults,
      id,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of field configuration scheme IDs. To include multiple IDs, provide an
       * ampersand-separated list. For example, `id=10000&id=10001`.
       */
      id?: number[];
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanFieldConfigurationScheme>> => {
      return jiraRequest<PageBeanFieldConfigurationScheme>({
        path: "/rest/api/3/fieldconfigurationscheme",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of all fields for a configuration.
     *
     * Only the fields from configurations used in company-managed (classic) projects
     * are returned.
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
     *   "total": 2,
     *   "values": [
     *     {
     *       "description": "For example operating system, software platform and/or hardware specifications (include as appropriate for the issue).",
     *       "id": "environment",
     *       "isHidden": false,
     *       "isRequired": false
     *     },
     *     {
     *       "id": "description",
     *       "isHidden": false,
     *       "isRequired": false
     *     }
     *   ]
     * }
     * ```
     */
    getFieldConfigurationItems: async ({
      id,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID of the field configuration. */
      id: number;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanFieldConfigurationItem>> => {
      return jiraRequest<PageBeanFieldConfigurationItem>({
        path: "/rest/api/3/fieldconfiguration/{id}/fields",
        method: "GET",
        pathParams: {
          id
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
     * Returns a [paginated](#pagination) list of field configuration issue type items.
     *
     * Only items used in classic projects are returned.
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
     *   "total": 5,
     *   "values": [
     *     {
     *       "fieldConfigurationSchemeId": "10020",
     *       "issueTypeId": "10000",
     *       "fieldConfigurationId": "10010"
     *     },
     *     {
     *       "fieldConfigurationSchemeId": "10020",
     *       "issueTypeId": "10001",
     *       "fieldConfigurationId": "10010"
     *     },
     *     {
     *       "fieldConfigurationSchemeId": "10021",
     *       "issueTypeId": "10002",
     *       "fieldConfigurationId": "10000"
     *     },
     *     {
     *       "fieldConfigurationSchemeId": "10022",
     *       "issueTypeId": "default",
     *       "fieldConfigurationId": "10011"
     *     },
     *     {
     *       "fieldConfigurationSchemeId": "10023",
     *       "issueTypeId": "default",
     *       "fieldConfigurationId": "10000"
     *     }
     *   ]
     * }
     * ```
     */
    getFieldConfigurationSchemeMappings: async ({
      startAt,
      maxResults,
      fieldConfigurationSchemeId,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of field configuration scheme IDs. To include multiple field
       * configuration schemes separate IDs with ampersand:
       * `fieldConfigurationSchemeId=10000&fieldConfigurationSchemeId=10001`.
       */
      fieldConfigurationSchemeId?: number[];
    } & WithRequestOpts<TClient> = {}): Promise<
      JiraResult<PageBeanFieldConfigurationIssueTypeItem>
    > => {
      return jiraRequest<PageBeanFieldConfigurationIssueTypeItem>({
        path: "/rest/api/3/fieldconfigurationscheme/mapping",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          fieldConfigurationSchemeId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of field configuration schemes and, for
     * each scheme, a list of the projects that use it.
     *
     * The list is sorted by field configuration scheme ID. The first item contains
     * the list of project IDs assigned to the default field configuration scheme.
     *
     * Only field configuration schemes used in classic projects are returned.
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
     *   "total": 5,
     *   "values": [
     *     {
     *       "projectIds": [
     *         "10",
     *         "11"
     *       ]
     *     },
     *     {
     *       "fieldConfigurationScheme": {
     *         "id": "10002",
     *         "name": "Field Configuration Scheme for software related projects",
     *         "description": "We can use this one for software projects."
     *       },
     *       "projectIds": [
     *         "12",
     *         "13",
     *         "14"
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    getFieldConfigurationSchemeProjectMapping: async ({
      startAt,
      maxResults,
      projectId,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of project IDs. To include multiple projects, separate IDs with
       * ampersand: `projectId=10000&projectId=10001`.
       */
      projectId: number[];
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<PageBeanFieldConfigurationSchemeProjects>
    > => {
      return jiraRequest<PageBeanFieldConfigurationSchemeProjects>({
        path: "/rest/api/3/fieldconfigurationscheme/project",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Removes issue types from the field configuration scheme.
     *
     * This operation can only modify field configuration schemes used in
     * company-managed (classic) projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    removeIssueTypesFromGlobalFieldConfigurationScheme: async ({
      id,
      issueTypeIdsToRemove,
      opts
    }: {
      /** The ID of the field configuration scheme. */
      id: number;
      /**
       * The issue type IDs to remove.
       *
       * @example
       * {
       *   "issueTypeIds": [
       *     "10000",
       *     "10001",
       *     "10002"
       *   ]
       * }
       */
      issueTypeIdsToRemove: IssueTypeIdsToRemove;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/fieldconfigurationscheme/{id}/mapping/delete",
        method: "POST",
        pathParams: {
          id
        },
        body: JSON.stringify(issueTypeIdsToRemove),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Assigns issue types to field configurations on field configuration scheme.
     *
     * This operation can only modify field configuration schemes used in
     * company-managed (classic) projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    setFieldConfigurationSchemeMapping: async ({
      id,
      associateFieldConfigurationsWithIssueTypesRequest,
      opts
    }: {
      /** The ID of the field configuration scheme. */
      id: number;
      /**
       * @example
       * {
       *   "mappings": [
       *     {
       *       "fieldConfigurationId": "10000",
       *       "issueTypeId": "default"
       *     },
       *     {
       *       "fieldConfigurationId": "10002",
       *       "issueTypeId": "10001"
       *     },
       *     {
       *       "fieldConfigurationId": "10001",
       *       "issueTypeId": "10002"
       *     }
       *   ]
       * }
       */
      associateFieldConfigurationsWithIssueTypesRequest: AssociateFieldConfigurationsWithIssueTypesRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/fieldconfigurationscheme/{id}/mapping",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(associateFieldConfigurationsWithIssueTypesRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates a field configuration. The name and the description provided in the
     * request override the existing values.
     *
     * This operation can only update configurations used in company-managed (classic)
     * projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateFieldConfiguration: async ({
      id,
      fieldConfigurationDetails,
      opts
    }: {
      /** The ID of the field configuration. */
      id: number;
      /**
       * @example
       * {
       *   "description": "A brand new description",
       *   "name": "My Modified Field Configuration"
       * }
       */
      fieldConfigurationDetails: FieldConfigurationDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/fieldconfiguration/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(fieldConfigurationDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates fields in a field configuration. The properties of the field
     * configuration fields provided override the existing values.
     *
     * This operation can only update field configurations used in company-managed
     * (classic) projects.
     *
     * The operation can set the renderer for text fields to the default text renderer
     * (`text-renderer`) or wiki style renderer (`wiki-renderer`). However, the
     * renderer cannot be updated for fields using the autocomplete renderer
     * (`autocomplete-renderer`).
     *
     * Hiding a field deletes it from the field configuration - deleting the required,
     * description and renderer type values as well. As a result, hiding and unhiding
     * will not restore the other values but use their default values.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateFieldConfigurationItems: async ({
      id,
      fieldConfigurationItemsDetails,
      opts
    }: {
      /** The ID of the field configuration. */
      id: number;
      /**
       * @example
       * {
       *   "fieldConfigurationItems": [
       *     {
       *       "description": "The new description of this item.",
       *       "id": "customfield_10012",
       *       "isHidden": false
       *     },
       *     {
       *       "id": "customfield_10011",
       *       "isRequired": true
       *     },
       *     {
       *       "description": "Another new description.",
       *       "id": "customfield_10010",
       *       "isHidden": false,
       *       "isRequired": false,
       *       "renderer": "wiki-renderer"
       *     }
       *   ]
       * }
       */
      fieldConfigurationItemsDetails: FieldConfigurationItemsDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/fieldconfiguration/{id}/fields",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(fieldConfigurationItemsDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates a field configuration scheme.
     *
     * This operation can only update field configuration schemes used in
     * company-managed (classic) projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateFieldConfigurationScheme: async ({
      id,
      updateFieldConfigurationSchemeDetails,
      opts
    }: {
      /** The ID of the field configuration scheme. */
      id: number;
      /**
       * The details of the field configuration scheme.
       *
       * @example
       * {
       *   "description": "We can use this one for software projects.",
       *   "name": "Field Configuration Scheme for software related projects"
       * }
       */
      updateFieldConfigurationSchemeDetails: UpdateFieldConfigurationSchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/fieldconfigurationscheme/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(updateFieldConfigurationSchemeDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
