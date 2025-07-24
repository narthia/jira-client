import type {
  ScreenableField,
  PageBeanScreenWithTab,
  PageBeanScreen,
  ScreenDetails,
  Screen,
  UpdateScreenDetails,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the screens used to record issue details. Use it to:
 *
 *  *  get details of all screens.
 *  *  get details of all the fields available for use on screens.
 *  *  create screens.
 *  *  delete screens.
 *  *  update screens.
 *  *  add a field to the default screen.
 */
export default function screens<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds a field to the default tab of the default screen.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    addFieldToDefaultScreen: async ({
      fieldId,
      opts
    }: {
      /** The ID of the field. */
      fieldId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/screens/addToDefault/{fieldId}",
        method: "POST",
        pathParams: {
          fieldId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates a screen with a default field tab.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": 10005,
     *   "name": "Resolve Security Issue Screen",
     *   "description": "Enables changes to resolution and linked issues."
     * }
     * ```
     */
    createScreen: async ({
      screenDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "Enables changes to resolution and linked issues.",
       *   "name": "Resolve Security Issue Screen"
       * }
       */
      screenDetails: ScreenDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Screen>> => {
      return jiraRequest<Screen>({
        path: "/rest/api/3/screens",
        method: "POST",
        body: JSON.stringify(screenDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a screen. A screen cannot be deleted if it is used in a screen scheme,
     * workflow, or workflow draft.
     *
     * Only screens used in classic projects can be deleted.
     */
    deleteScreen: async ({
      screenId,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/screens/{screenId}",
        method: "DELETE",
        pathParams: {
          screenId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the fields that can be added to a tab on a screen.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    getAvailableScreenFields: async ({
      screenId,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ScreenableField[]>> => {
      return jiraRequest<ScreenableField[]>({
        path: "/rest/api/3/screens/{screenId}/availableFields",
        method: "GET",
        pathParams: {
          screenId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of all screens or those specified by
     * one or more screen IDs.
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
     *   "self": "https://your-domain.atlassian.net/rest/api/3/screens",
     *   "startAt": 0,
     *   "total": 3,
     *   "values": [
     *     {
     *       "id": 1,
     *       "name": "Default Screen",
     *       "description": "Provides for the update all system fields."
     *     },
     *     {
     *       "id": 2,
     *       "name": "Workflow Screen",
     *       "description": "This screen is used in the workflow and enables you to assign issues."
     *     },
     *     {
     *       "id": 3,
     *       "name": "Resolve Issue Screen",
     *       "description": "Offers the ability to set resolution, change fix versions, and assign an issue."
     *     }
     *   ]
     * }
     * ```
     */
    getScreens: async ({
      startAt,
      maxResults,
      id,
      queryString,
      scope,
      orderBy,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of screen IDs. To include multiple IDs, provide an ampersand-separated
       * list. For example, `id=10000&id=10001`.
       */
      id?: number[];
      /** String used to perform a case-insensitive partial match with screen name. */
      queryString?: string;
      /**
       * The scope filter string. To filter by multiple scope, provide an
       * ampersand-separated list. For example, `scope=GLOBAL&scope=PROJECT`.
       */
      scope?: ("GLOBAL" | "TEMPLATE" | "PROJECT")[];
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `id` Sorts by screen ID.
       *  *  `name` Sorts by screen name.
       */
      orderBy?: "name" | "-name" | "+name" | "id" | "-id" | "+id";
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanScreen>> => {
      return jiraRequest<PageBeanScreen>({
        path: "/rest/api/3/screens",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          queryString,
          scope,
          orderBy
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of the screens a field is used in.
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
     *   "maxResults": 1,
     *   "startAt": 0,
     *   "total": 5,
     *   "values": [
     *     {
     *       "id": 10001,
     *       "name": "Default Screen",
     *       "description": "Provides for the update of all system fields.",
     *       "tab": {
     *         "id": 10000,
     *         "name": "Fields Tab"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getScreensForField: async ({
      fieldId,
      startAt,
      maxResults,
      expand,
      opts
    }: {
      /** The ID of the field to return screens for. */
      fieldId: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * Use [expand](#expansion) to include additional information about screens in the
       * response. This parameter accepts `tab` which returns details about the screen
       * tabs the field is used in.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanScreenWithTab>> => {
      return jiraRequest<PageBeanScreenWithTab>({
        path: "/rest/api/3/field/{fieldId}/screens",
        method: "GET",
        pathParams: {
          fieldId
        },
        queryParams: {
          startAt,
          maxResults,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a screen. Only screens used in classic projects can be updated.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": 10005,
     *   "name": "Resolve Security Issue Screen",
     *   "description": "Enables changes to resolution and linked issues."
     * }
     * ```
     */
    updateScreen: async ({
      screenId,
      updateScreenDetails,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /**
       * @example
       * {
       *   "description": "Enables changes to resolution and linked issues for accessibility related issues.",
       *   "name": "Resolve Accessibility Issue Screen"
       * }
       */
      updateScreenDetails: UpdateScreenDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Screen>> => {
      return jiraRequest<Screen>({
        path: "/rest/api/3/screens/{screenId}",
        method: "PUT",
        pathParams: {
          screenId
        },
        body: JSON.stringify(updateScreenDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
