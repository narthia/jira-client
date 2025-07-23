import type {
  PropertyKeys,
  EntityProperty,
  PageOfDashboards,
  DashboardDetails,
  Dashboard,
  DashboardGadgetResponse,
  DashboardGadgetSettings,
  DashboardGadget,
  DashboardGadgetUpdateRequest,
  BulkEditShareableEntityRequest,
  BulkEditShareableEntityResponse,
  AvailableDashboardGadgetsResponse,
  PageBeanDashboard,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents dashboards. Use it to obtain the details of dashboards
 * as well as get, create, update, or remove item properties and gadgets from
 * dashboards.
 */
export default function dashboards<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds a gadget to a dashboard.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "color": "blue",
     *   "id": 10001,
     *   "moduleKey": "com.atlassian.plugins.atlassian-connect-plugin:com.atlassian.connect.node.sample-addon__sample-dashboard-item",
     *   "position": {
     *     "column": 1,
     *     "row": 0
     *   },
     *   "title": "Issue statistics"
     * }
     * ```
     */
    addGadget: async ({
      dashboardId,
      dashboardGadgetSettings,
      opts
    }: {
      /** The ID of the dashboard. */
      dashboardId: number;
      /**
       * @example
       * {
       *   "color": "blue",
       *   "ignoreUriAndModuleKeyValidation": false,
       *   "moduleKey": "com.atlassian.plugins.atlassian-connect-plugin:com.atlassian.connect.node.sample-addon__sample-dashboard-item",
       *   "position": {
       *     "column": 1,
       *     "row": 0
       *   },
       *   "title": "Issue statistics"
       * }
       */
      dashboardGadgetSettings: DashboardGadgetSettings;
    } & WithRequestOpts<TClient>): Promise<JiraResult<DashboardGadget>> => {
      return jiraRequest<DashboardGadget>({
        path: "/rest/api/3/dashboard/{dashboardId}/gadget",
        method: "POST",
        pathParams: {
          dashboardId
        },
        body: JSON.stringify(dashboardGadgetSettings),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Bulk edit dashboards. Maximum number of dashboards to be edited at the same
     * time is 100.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboards to be updated must be owned by the user, or the user must be an
     * administrator.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "action": "changePermission",
     *   "entityErrors": {
     *     "10002": {
     *       "errorMessages": [
     *         "Only owner or editors of the dashboard can change permissions."
     *       ],
     *       "errors": {}
     *     }
     *   }
     * }
     * ```
     */
    bulkEditDashboards: async ({
      bulkEditShareableEntityRequest,
      opts
    }: {
      /**
       * The details of dashboards being updated in bulk.
       *
       * @example
       * {
       *   "action": "changePermission",
       *   "entityIds": [
       *     10001,
       *     10002
       *   ],
       *   "extendAdminPermissions": true,
       *   "permissionDetails": {
       *     "editPermissions": [
       *       {
       *         "group": {
       *           "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
       *           "name": "jira-administrators",
       *           "self": "https://your-domain.atlassian.net/rest/api/~ver~/group?groupId=276f955c-63d7-42c8-9520-92d01dca0625"
       *         },
       *         "id": 10010,
       *         "type": "group"
       *       }
       *     ],
       *     "sharePermissions": [
       *       {
       *         "id": 10000,
       *         "type": "global"
       *       }
       *     ]
       *   }
       * }
       */
      bulkEditShareableEntityRequest: BulkEditShareableEntityRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<BulkEditShareableEntityResponse>> => {
      return jiraRequest<BulkEditShareableEntityResponse>({
        path: "/rest/api/3/dashboard/bulk",
        method: "PUT",
        body: JSON.stringify(bulkEditShareableEntityRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Copies a dashboard. Any values provided in the `dashboard` parameter replace
     * those in the copied dashboard.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be copied must be owned by the user or the user must be an
     * administrator.
     *
     * @returns Returned if the request is successful.
     */
    copyDashboard: async ({
      id,
      extendAdminPermissions,
      dashboardDetails,
      opts
    }: {
      id: string;
      /**
       * Whether admin level permissions are used. It should only be true if the user
       * has *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg)
       */
      extendAdminPermissions?: boolean;
      /**
       * Dashboard details.
       *
       * @example
       * {
       *   "description": "A dashboard to help auditors identify sample of issues to check.",
       *   "editPermissions": [],
       *   "name": "Auditors dashboard",
       *   "sharePermissions": [
       *     {
       *       "type": "global"
       *     }
       *   ]
       * }
       */
      dashboardDetails: DashboardDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Dashboard>> => {
      return jiraRequest<Dashboard>({
        path: "/rest/api/3/dashboard/{id}/copy",
        method: "POST",
        pathParams: {
          id
        },
        queryParams: {
          extendAdminPermissions
        },
        body: JSON.stringify(dashboardDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates a dashboard.
     *
     * **[Permissions](#permissions) required:** None
     *
     * @returns Returned if the request is successful.
     */
    createDashboard: async ({
      extendAdminPermissions,
      dashboardDetails,
      opts
    }: {
      /**
       * Whether admin level permissions are used. It should only be true if the user
       * has *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg)
       */
      extendAdminPermissions?: boolean;
      /**
       * Dashboard details.
       *
       * @example
       * {
       *   "description": "A dashboard to help auditors identify sample of issues to check.",
       *   "editPermissions": [],
       *   "name": "Auditors dashboard",
       *   "sharePermissions": [
       *     {
       *       "type": "global"
       *     }
       *   ]
       * }
       */
      dashboardDetails: DashboardDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Dashboard>> => {
      return jiraRequest<Dashboard>({
        path: "/rest/api/3/dashboard",
        method: "POST",
        queryParams: {
          extendAdminPermissions
        },
        body: JSON.stringify(dashboardDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a dashboard.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be deleted must be owned by the user or the user must be an
     * administrator.
     */
    deleteDashboard: async ({
      id,
      opts
    }: {
      /** The ID of the dashboard. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/dashboard/{id}",
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
     * Deletes a dashboard item property.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be deleted must be owned by the user or the user must be an
     * administrator.
     */
    deleteDashboardItemProperty: async ({
      dashboardId,
      itemId,
      propertyKey,
      opts
    }: {
      /** The ID of the dashboard. */
      dashboardId: string;
      /** The ID of the dashboard item. */
      itemId: string;
      /** The key of the dashboard item property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          dashboardId,
          itemId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a list of all available gadgets that can be added to the dashboard.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     */
    getAllAvailableDashboardGadgets: async ({
      opts
    }: {} & WithRequestOpts<TClient>): Promise<JiraResult<AvailableDashboardGadgetsResponse>> => {
      return jiraRequest<AvailableDashboardGadgetsResponse>({
        path: "/rest/api/3/dashboard/gadgets",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of dashboards owned by or shared with the user. The list may be
     * filtered to include only favorite or owned dashboards.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     */
    getAllDashboards: async ({
      filter,
      startAt,
      maxResults,
      opts
    }: {
      /**
       * The filter applied to the list of dashboards. Valid values are:
       *
       *  *  `favourite` Returns dashboards the user has marked as favorite.
       *  *  `my` Returns dashboards owned by the user.
       */
      filter?: "my" | "favourite";
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageOfDashboards>> => {
      return jiraRequest<PageOfDashboards>({
        path: "/rest/api/3/dashboard",
        method: "GET",
        queryParams: {
          filter,
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of dashboard gadgets on a dashboard.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     */
    getAllGadgets: async ({
      dashboardId,
      moduleKey,
      uri,
      gadgetId,
      opts
    }: {
      /** The ID of the dashboard. */
      dashboardId: number;
      /**
       * The list of gadgets module keys. To include multiple module keys, separate
       * module keys with ampersand: `moduleKey=key:one&moduleKey=key:two`.
       */
      moduleKey?: string[];
      /**
       * The list of gadgets URIs. To include multiple URIs, separate URIs with
       * ampersand: `uri=/rest/example/uri/1&uri=/rest/example/uri/2`.
       */
      uri?: string[];
      /**
       * The list of gadgets IDs. To include multiple IDs, separate IDs with ampersand:
       * `gadgetId=10000&gadgetId=10001`.
       */
      gadgetId?: number[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<DashboardGadgetResponse>> => {
      return jiraRequest<DashboardGadgetResponse>({
        path: "/rest/api/3/dashboard/{dashboardId}/gadget",
        method: "GET",
        pathParams: {
          dashboardId
        },
        queryParams: {
          moduleKey,
          uri,
          gadgetId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a dashboard.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be returned must be owned by the user or the user must be an
     * administrator.
     *
     * @returns Returned if the request is successful.
     */
    getDashboard: async ({
      id,
      opts
    }: {
      /** The ID of the dashboard. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Dashboard>> => {
      return jiraRequest<Dashboard>({
        path: "/rest/api/3/dashboard/{id}",
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
     * Returns a dashboard item property.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be returned must be owned by the user or the user must be an
     * administrator.
     *
     * @returns Returned if the request is successful.
     */
    getDashboardItemProperty: async ({
      dashboardId,
      itemId,
      propertyKey,
      opts
    }: {
      /** The ID of the dashboard. */
      dashboardId: string;
      /** The ID of the dashboard item. */
      itemId: string;
      /** The key of the dashboard item property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<EntityProperty>> => {
      return jiraRequest<EntityProperty>({
        path: "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          dashboardId,
          itemId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the keys of all properties for a dashboard item.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be returned must be owned by the user or the user must be an
     * administrator.
     *
     * @returns Returned if the request is successful.
     */
    getDashboardItemPropertyKeys: async ({
      dashboardId,
      itemId,
      opts
    }: {
      /** The ID of the dashboard. */
      dashboardId: string;
      /** The ID of the dashboard item. */
      itemId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PropertyKeys>> => {
      return jiraRequest<PropertyKeys>({
        path: "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties",
        method: "GET",
        pathParams: {
          dashboardId,
          itemId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a paginated list of dashboards. This operation is similar to [Get
     * all dashboards](#api-rest-api-3-dashboard-get) but allows you to specify a
     * list of dashboard IDs. This operation is marked as deprecated because the
     * endpoint used is deprecated and will be removed with the endpoint.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     */
    getDashboardsPaginated: async ({
      dashboardName,
      accountId,
      owner,
      groupname,
      groupId,
      projectId,
      orderBy,
      startAt,
      maxResults,
      status,
      expand,
      opts
    }: {
      /** String used to perform a case-insensitive partial match with `name`. */
      dashboardName?: string;
      /**
       * User account ID used to return dashboards with the matching `owner.accountId`.
       * This parameter cannot be used with the `owner` parameter.
       */
      accountId?: string;
      /**
       * This parameter is deprecated because of privacy changes. Use `accountId`
       * instead. See the [migration
       * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
       * for details. User name used to return dashboards with the matching
       * `owner.name`. This parameter cannot be used with the `accountId` parameter.
       */
      owner?: string;
      /**
       * As a group's name can change, use of `groupId` is recommended. Group name used
       * to return dashboards that are shared with a group that matches
       * `sharePermissions.group.name`. This parameter cannot be used with the `groupId`
       * parameter.
       */
      groupname?: string;
      /**
       * Group ID used to return dashboards that are shared with a group that matches
       * `sharePermissions.group.groupId`. This parameter cannot be used with the
       * `groupname` parameter.
       */
      groupId?: string;
      /**
       * Project ID used to returns dashboards that are shared with a project that
       * matches `sharePermissions.project.id`.
       */
      projectId?: number;
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `description` Sorts by dashboard description. Note that this sort works
       * independently of whether the expand to display the description field is in use.
       *  *  `favourite_count` Sorts by dashboard popularity.
       *  *  `id` Sorts by dashboard ID.
       *  *  `is_favourite` Sorts by whether the dashboard is marked as a favorite.
       *  *  `name` Sorts by dashboard name.
       *  *  `owner` Sorts by dashboard owner name.
       */
      orderBy?:
        | "description"
        | "-description"
        | "+description"
        | "favorite_count"
        | "-favorite_count"
        | "+favorite_count"
        | "id"
        | "-id"
        | "+id"
        | "is_favorite"
        | "-is_favorite"
        | "+is_favorite"
        | "name"
        | "-name"
        | "+name"
        | "owner"
        | "-owner"
        | "+owner";
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /** The status to filter by. It may be active, archived or deleted. */
      status?: "active" | "archived" | "deleted";
      /**
       * Use [expand](#expansion) to include additional information about dashboard in
       * the response. This parameter accepts a comma-separated list. Expand options
       * include:
       *
       *  *  `description` Returns the description of the dashboard.
       *  *  `owner` Returns the owner of the dashboard.
       *  *  `viewUrl` Returns the URL that is used to view the dashboard.
       *  *  `favourite` Returns `isFavourite`, an indicator of whether the user has set
       * the dashboard as a favorite.
       *  *  `favouritedCount` Returns `popularity`, a count of how many users have set
       * this dashboard as a favorite.
       *  *  `sharePermissions` Returns details of the share permissions defined for the
       * dashboard.
       *  *  `editPermissions` Returns details of the edit permissions defined for the
       * dashboard.
       *  *  `isWritable` Returns whether the current user has permission to edit the
       * dashboard.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanDashboard>> => {
      return jiraRequest<PageBeanDashboard>({
        path: "/rest/api/3/dashboard",
        method: "GET",
        queryParams: {
          dashboardName,
          accountId,
          owner,
          groupname,
          groupId,
          projectId,
          orderBy,
          startAt,
          maxResults,
          status,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Removes a dashboard gadget from a dashboard.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be updated must be owned by the user or the user must be an
     * administrator.
     */
    removeGadget: async ({
      dashboardId,
      gadgetId,
      opts
    }: {
      /** The ID of the dashboard. */
      dashboardId: number;
      /** The ID of the gadget. */
      gadgetId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/dashboard/{dashboardId}/gadget/{gadgetId}",
        method: "DELETE",
        pathParams: {
          dashboardId,
          gadgetId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets a dashboard item property. Use this resource to store custom data against
     * a dashboard item.
     *
     * A dashboard item enables an app to add user-specific information to a
     * dashboard. Dashboard items are exposed to users as gadgets that users can add
     * to their dashboards. For example, an app that shares a user's pull requests
     * could expose a dashboard item showing a user's open pull requests.
     *
     * When an app creates a dashboard item it registers a callback to receive the
     * dashboard item user. The callback performs the following steps:
     *
     *  1.  A callback is executed after the dashboard item is created. This callback
     * will be disabled if the app is uninstalled.
     *  2.  The callback sends one or more requests to the `configUrl` (specified in
     * the dashboard item) to obtain a config object or, when the config is sent via
     * the `Accepts` header, a JSON body. The config object contains information
     * about the dashboard item, such as the title and the URL of the gadget.
     *  3.  The config is returned to the requesting gadget.
     *
     * If the values are invalid (for example they are malformed, or they include
     * invalid characters, or the user does not have permission for the function) then
     * a HTTP 400 error is returned.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be updated must be owned by the user or the user must be an
     * administrator.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the property is updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the property is created.
     */
    setDashboardItemProperty: async ({
      dashboardId,
      itemId,
      propertyKey,
      requestBody,
      opts
    }: {
      /** The ID of the dashboard. */
      dashboardId: string;
      /** The ID of the dashboard item. */
      itemId: string;
      /**
       * The key of the dashboard item property. The maximum length is 255 characters.
       * For dashboard items with a spec URI and no complete module key, if the provided
       * propertyKey is equal to "config", the request body's JSON must be an object
       * with all keys and values as strings.
       */
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
        path: "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          dashboardId,
          itemId,
          propertyKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a dashboard.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be updated must be owned by the user or the user must be an
     * administrator.
     *
     * @returns Returned if the request is successful.
     */
    updateDashboard: async ({
      id,
      extendAdminPermissions,
      dashboardDetails,
      opts
    }: {
      /** The ID of the dashboard to update. */
      id: string;
      /**
       * Whether admin level permissions are used. It should only be true if the user
       * has *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg)
       */
      extendAdminPermissions?: boolean;
      /**
       * Replacement dashboard details.
       *
       * @example
       * {
       *   "description": "A dashboard to help auditors identify sample of issues to check.",
       *   "editPermissions": [],
       *   "name": "Auditors dashboard",
       *   "sharePermissions": [
       *     {
       *       "type": "global"
       *     }
       *   ]
       * }
       */
      dashboardDetails: DashboardDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Dashboard>> => {
      return jiraRequest<Dashboard>({
        path: "/rest/api/3/dashboard/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        queryParams: {
          extendAdminPermissions
        },
        body: JSON.stringify(dashboardDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a dashboard gadget.
     *
     * **[Permissions](#permissions) required:** None
     *
     * The dashboard to be updated must be owned by the user or the user must be an
     * administrator.
     */
    updateGadget: async ({
      dashboardId,
      gadgetId,
      dashboardGadgetUpdateRequest,
      opts
    }: {
      /** The ID of the dashboard. */
      dashboardId: number;
      /** The ID of the gadget. */
      gadgetId: number;
      /**
       * @example
       * {
       *   "color": "red",
       *   "position": {
       *     "column": 1,
       *     "row": 1
       *   },
       *   "title": "My new gadget title"
       * }
       */
      dashboardGadgetUpdateRequest: DashboardGadgetUpdateRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/dashboard/{dashboardId}/gadget/{gadgetId}",
        method: "PUT",
        pathParams: {
          dashboardId,
          gadgetId
        },
        body: JSON.stringify(dashboardGadgetUpdateRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
