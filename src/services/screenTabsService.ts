import type {
  ScreenableTab,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the screen tabs used to record issue details. Use it
 * to get, create, update, move, and delete screen tabs.
 */
export default function screenTabs<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a tab for a screen.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": 10000,
     *   "name": "Fields Tab"
     * }
     * ```
     */
    addScreenTab: async ({
      screenId,
      screenableTab,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /**
       * @example
       * {
       *   "name": "Fields Tab"
       * }
       */
      screenableTab: ScreenableTab;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ScreenableTab>> => {
      return jiraRequest<ScreenableTab>({
        path: "/rest/api/3/screens/{screenId}/tabs",
        method: "POST",
        pathParams: {
          screenId
        },
        body: JSON.stringify(screenableTab),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a screen tab.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteScreenTab: async ({
      screenId,
      tabId,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /** The ID of the screen tab. */
      tabId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/screens/{screenId}/tabs/{tabId}",
        method: "DELETE",
        pathParams: {
          screenId,
          tabId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the list of tabs for a screen.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *  *  *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
     * specified, providing that the screen is associated with the project through a
     * Screen Scheme and Issue Type Screen Scheme.
     *
     * @returns Returned if the request is successful.
     */
    getAllScreenTabs: async ({
      screenId,
      projectKey,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /** The key of the project. */
      projectKey?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ScreenableTab[]>> => {
      return jiraRequest<ScreenableTab[]>({
        path: "/rest/api/3/screens/{screenId}/tabs",
        method: "GET",
        pathParams: {
          screenId
        },
        queryParams: {
          projectKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the list of tabs for a bulk of screens.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* [global
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
     *       "screenId": 10000,
     *       "tabId": 10001,
     *       "tabName": "My Custom Tab 1"
     *     },
     *     {
     *       "screenId": 10001,
     *       "tabId": 10002,
     *       "tabName": "My Custom Tab 2"
     *     }
     *   ]
     * }
     * ```
     */
    getBulkScreenTabs: async ({
      screenId,
      tabId,
      startAt,
      maxResult,
      opts
    }: {
      /**
       * The list of screen IDs. To include multiple screen IDs, provide an
       * ampersand-separated list. For example, `screenId=10000&screenId=10001`.
       */
      screenId?: number[];
      /**
       * The list of tab IDs. To include multiple tab IDs, provide an
       * ampersand-separated list. For example, `tabId=10000&tabId=10001`.
       */
      tabId?: number[];
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. The maximum number is 100, */
      maxResult?: number;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/screens/tabs",
        method: "GET",
        queryParams: {
          screenId,
          tabId,
          startAt,
          maxResult
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Moves a screen tab.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    moveScreenTab: async ({
      screenId,
      tabId,
      pos,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /** The ID of the screen tab. */
      tabId: number;
      /** The position of tab. The base index is 0. */
      pos: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/screens/{screenId}/tabs/{tabId}/move/{pos}",
        method: "POST",
        pathParams: {
          screenId,
          tabId,
          pos
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates the name of a screen tab.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": 10000,
     *   "name": "Fields Tab"
     * }
     * ```
     */
    renameScreenTab: async ({
      screenId,
      tabId,
      screenableTab,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /** The ID of the screen tab. */
      tabId: number;
      screenableTab: ScreenableTab;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ScreenableTab>> => {
      return jiraRequest<ScreenableTab>({
        path: "/rest/api/3/screens/{screenId}/tabs/{tabId}",
        method: "PUT",
        pathParams: {
          screenId,
          tabId
        },
        body: JSON.stringify(screenableTab),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
