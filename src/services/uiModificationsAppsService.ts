import type {
  PageBeanUiModificationDetails,
  CreateUiModificationDetails,
  UiModificationIdentifiers,
  UpdateUiModificationDetails,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * UI modifications is a feature available for **Forge apps only**. It enables
 * Forge apps to control how selected Jira fields behave on the following views:
 * global issue create, issue view, issue transition. For example: hide specific
 * fields, set them as required, etc.
 */
export default function uiModificationsApps<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a UI modification. UI modification can only be created by Forge apps.
     *
     * Each app can define up to 3000 UI modifications. Each UI modification can
     * define up to 1000 contexts. The same context can be assigned to maximum 100 UI
     * modifications.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *None* if the UI modification is created without contexts.
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for one or more
     * projects, if the UI modification is created with contexts.
     *
     * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using
     * it won't break your app. However, we recommend adding it to your app's scope
     * list because we will eventually make it mandatory.
     *
     * @returns Returned if the UI modification is created.
     *
     * example:
     * ```
     * {
     *   "id": "d7dbda8a-6239-4b63-8e13-a5ef975c8e61",
     *   "self": "https://api.atlassian.com/ex/jira/{cloudid}/rest/api/2/uiModifications/d7dbda8a-6239-4b63-8e13-a5ef975c8e61"
     * }
     * ```
     */
    createUiModification: async ({
      createUiModificationDetails,
      opts
    }: {
      /**
       * Details of the UI modification.
       *
       * @example
       * {
       *   "contexts": [
       *     {
       *       "issueTypeId": "10000",
       *       "projectId": "10000",
       *       "viewType": "GIC"
       *     },
       *     {
       *       "issueTypeId": "10001",
       *       "projectId": "10000",
       *       "viewType": "IssueView"
       *     },
       *     {
       *       "issueTypeId": "10002",
       *       "projectId": "10000",
       *       "viewType": "IssueTransition"
       *     },
       *     {
       *       "issueTypeId": "10003",
       *       "projectId": "10000",
       *       "viewType": null
       *     }
       *   ],
       *   "data": "{field: 'Story Points', config: {hidden: false}}",
       *   "description": "Reveals Story Points field when any Sprint is selected.",
       *   "name": "Reveal Story Points"
       * }
       */
      createUiModificationDetails: CreateUiModificationDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<UiModificationIdentifiers>> => {
      return jiraRequest<UiModificationIdentifiers>({
        path: "/rest/api/3/uiModifications",
        method: "POST",
        body: JSON.stringify(createUiModificationDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a UI modification. All the contexts that belong to the UI modification
     * are deleted too. UI modification can only be deleted by Forge apps.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using
     * it won't break your app. However, we recommend adding it to your app's scope
     * list because we will eventually make it mandatory.
     *
     * @returns Returned if the UI modification is deleted.
     */
    deleteUiModification: async ({
      uiModificationId,
      opts
    }: {
      /** The ID of the UI modification. */
      uiModificationId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/uiModifications/{uiModificationId}",
        method: "DELETE",
        pathParams: {
          uiModificationId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Gets UI modifications. UI modifications can only be retrieved by Forge apps.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it
     * won't break your app. However, we recommend adding it to your app's scope list
     * because we will eventually make it mandatory.
     *
     * @returns Returned if the request is successful.
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
     *       "id": "d7dbda8a-6239-4b63-8e13-a5ef975c8e61",
     *       "name": "Reveal Story Points",
     *       "description": "Reveals Story Points field when any Sprint is selected.",
     *       "self": "https://api.atlassian.com/ex/jira/{cloudid}/rest/api/2/uiModifications/d7dbda8a-6239-4b63-8e13-a5ef975c8e61",
     *       "data": "{field: 'Story Points', config: {hidden: false}}",
     *       "contexts": [
     *         {
     *           "id": "1533537a-bda3-4ac6-8481-846128cd9ef4",
     *           "projectId": "10000",
     *           "issueTypeId": "10000",
     *           "viewType": "GIC",
     *           "isAvailable": true
     *         },
     *         {
     *           "id": "c016fefa-6eb3-40c9-8596-4c4ef273e67c",
     *           "projectId": "10000",
     *           "issueTypeId": "10001",
     *           "viewType": "IssueView",
     *           "isAvailable": true
     *         },
     *         {
     *           "id": "1016defa-7ew3-40c5-8696-4c1efg73e67s",
     *           "projectId": "10000",
     *           "issueTypeId": "10002",
     *           "viewType": "IssueTransition",
     *           "isAvailable": true
     *         }
     *       ]
     *     },
     *     {
     *       "id": "e4fe8db5-f82f-416b-a3aa-b260b55da577",
     *       "name": "Set Assignee",
     *       "description": "Sets the Assignee field automatically.",
     *       "self": "https://api.atlassian.com/ex/jira/{cloudid}/rest/api/2/uiModifications/e4fe8db5-f82f-416b-a3aa-b260b55da577",
     *       "contexts": [
     *         {
     *           "id": "8b3740f9-8780-4958-8228-69dcfbda11d9",
     *           "projectId": "10000",
     *           "issueTypeId": "10000",
     *           "viewType": "GIC",
     *           "isAvailable": true
     *         }
     *       ]
     *     },
     *     {
     *       "id": "1453f993-79ce-4389-a36d-eb72d5c85dd6",
     *       "name": "Hide Labels",
     *       "description": "Hides Labels if any component is provided.",
     *       "self": "https://api.atlassian.com/ex/jira/{cloudid}/rest/api/2/uiModifications/1453f993-79ce-4389-a36d-eb72d5c85dd6",
     *       "contexts": []
     *     },
     *     {
     *       "id": "d3f4097e-8d8e-451e-9fb6-27c3c8c3bfff",
     *       "name": "Wildcard example",
     *       "description": "This context is applied to all issue types",
     *       "self": "https://api.atlassian.com/ex/jira/{cloudid}/rest/api/2/uiModifications/d3f4097e-8d8e-451e-9fb6-27c3c8c3bfff",
     *       "contexts": [
     *         {
     *           "id": "521f2181-5d5e-46ea-9fc9-871bbf245b8b",
     *           "projectId": "10000",
     *           "issueTypeId": null,
     *           "viewType": "GIC",
     *           "isAvailable": true
     *         }
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    getUiModifications: async ({
      startAt,
      maxResults,
      expand,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Expand options include:
       *
       *  *  `data` Returns UI modification data.
       *  *  `contexts` Returns UI modification contexts.
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanUiModificationDetails>> => {
      return jiraRequest<PageBeanUiModificationDetails>({
        path: "/rest/api/3/uiModifications",
        method: "GET",
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
     * Updates a UI modification. UI modification can only be updated by Forge apps.
     *
     * Each UI modification can define up to 1000 contexts. The same context can be
     * assigned to maximum 100 UI modifications.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *None* if the UI modification is created without contexts.
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for one or more
     * projects, if the UI modification is created with contexts.
     *
     * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using
     * it won't break your app. However, we recommend adding it to your app's scope
     * list because we will eventually make it mandatory.
     *
     * @returns Returned if the UI modification is updated.
     */
    updateUiModification: async ({
      uiModificationId,
      updateUiModificationDetails,
      opts
    }: {
      /** The ID of the UI modification. */
      uiModificationId: string;
      /**
       * Details of the UI modification.
       *
       * @example
       * {
       *   "contexts": [
       *     {
       *       "issueTypeId": "10000",
       *       "projectId": "10000",
       *       "viewType": "GIC"
       *     },
       *     {
       *       "issueTypeId": "10001",
       *       "projectId": "10000",
       *       "viewType": "IssueView"
       *     },
       *     {
       *       "issueTypeId": "10002",
       *       "projectId": "10000",
       *       "viewType": "IssueTransition"
       *     }
       *   ],
       *   "data": "{field: 'Story Points', config: {hidden: true}}",
       *   "name": "Updated Reveal Story Points"
       * }
       */
      updateUiModificationDetails: UpdateUiModificationDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/uiModifications/{uiModificationId}",
        method: "PUT",
        pathParams: {
          uiModificationId
        },
        body: JSON.stringify(updateUiModificationDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
