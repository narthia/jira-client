import type {
  ScreenableField,
  AddFieldBean,
  MoveFieldBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the screen tab fields used to record issue details.
 * Use it to get, add, move, and remove fields from screen tabs.
 */
export default function screenTabFields<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds a field to a screen tab.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "summary",
     *   "name": "Summary"
     * }
     * ```
     */
    addScreenTabField: async ({
      screenId,
      tabId,
      addFieldBean,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /** The ID of the screen tab. */
      tabId: number;
      /**
       * @example
       * {
       *   "fieldId": "summary"
       * }
       */
      addFieldBean: AddFieldBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ScreenableField>> => {
      return jiraRequest<ScreenableField>({
        path: "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields",
        method: "POST",
        pathParams: {
          screenId,
          tabId
        },
        body: JSON.stringify(addFieldBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all fields for a screen tab.
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
    getAllScreenTabFields: async ({
      screenId,
      tabId,
      projectKey,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /** The ID of the screen tab. */
      tabId: number;
      /** The key of the project. */
      projectKey?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ScreenableField[]>> => {
      return jiraRequest<ScreenableField[]>({
        path: "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields",
        method: "GET",
        pathParams: {
          screenId,
          tabId
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
     * Moves a screen tab field.
     *
     * If `after` and `position` are provided in the request, `position` is ignored.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    moveScreenTabField: async ({
      screenId,
      tabId,
      id,
      moveFieldBean,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /** The ID of the screen tab. */
      tabId: number;
      /** The ID of the field. */
      id: string;
      moveFieldBean: MoveFieldBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields/{id}/move",
        method: "POST",
        pathParams: {
          screenId,
          tabId,
          id
        },
        body: JSON.stringify(moveFieldBean),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Removes a field from a screen tab.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    removeScreenTabField: async ({
      screenId,
      tabId,
      id,
      opts
    }: {
      /** The ID of the screen. */
      screenId: number;
      /** The ID of the screen tab. */
      tabId: number;
      /** The ID of the field. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields/{id}",
        method: "DELETE",
        pathParams: {
          screenId,
          tabId,
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
