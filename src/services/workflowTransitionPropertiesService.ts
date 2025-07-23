import type {
  WorkflowTransitionProperty,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents workflow transition properties, which provides for
 * storing custom data against a workflow transition. Use it to get, create, and
 * delete workflow transition properties as well as get a list of property keys
 * for a workflow transition. Workflow transition properties are a type of [entity
 * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 *
 * @deprecated
 */
export default function workflowTransitionProperties<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * This will be removed on [June 1,
     * 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570);
     * add transition properties using [Bulk update
     * workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-update-post)
     * instead.
     *
     * Adds a property to a workflow transition. Transition properties are used to
     * change the behavior of a transition. For more information, see [Transition
     * properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties)
     * and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns 200 response
     *
     * example:
     * ```
     * {
     *   "key": "jira.i18n.title",
     *   "value": "some.title",
     *   "id": "jira.i18n.title"
     * }
     * ```
     */
    createWorkflowTransitionProperty: async ({
      transitionId,
      key,
      workflowName,
      workflowMode,
      workflowTransitionProperty,
      opts
    }: {
      /**
       * The ID of the transition. To get the ID, view the workflow in text mode in the
       * Jira admin settings. The ID is shown next to the transition.
       */
      transitionId: number;
      /**
       * The key of the property being added, also known as the name of the property.
       * Set this to the same value as the `key` defined in the request body.
       */
      key: string;
      /** The name of the workflow that the transition belongs to. */
      workflowName: string;
      /**
       * The workflow status. Set to *live* for inactive workflows or *draft* for draft
       * workflows. Active workflows cannot be edited.
       */
      workflowMode?: "live" | "draft";
      /**
       * @example
       * {
       *   "value": "createissue"
       * }
       */
      workflowTransitionProperty: WorkflowTransitionProperty;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowTransitionProperty>> => {
      return jiraRequest<WorkflowTransitionProperty>({
        path: "/rest/api/3/workflow/transitions/{transitionId}/properties",
        method: "POST",
        pathParams: {
          transitionId
        },
        queryParams: {
          key,
          workflowName,
          workflowMode
        },
        body: JSON.stringify(workflowTransitionProperty),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * This will be removed on [June 1,
     * 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570);
     * delete transition properties using [Bulk update
     * workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-update-post)
     * instead.
     *
     * Deletes a property from a workflow transition. Transition properties are used
     * to change the behavior of a transition. For more information, see [Transition
     * properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties)
     * and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     */
    deleteWorkflowTransitionProperty: async ({
      transitionId,
      key,
      workflowName,
      workflowMode,
      opts
    }: {
      /**
       * The ID of the transition. To get the ID, view the workflow in text mode in the
       * Jira admin settings. The ID is shown next to the transition.
       */
      transitionId: number;
      /**
       * The name of the transition property to delete, also known as the name of the
       * property.
       */
      key: string;
      /** The name of the workflow that the transition belongs to. */
      workflowName: string;
      /**
       * The workflow status. Set to `live` for inactive workflows or `draft` for draft
       * workflows. Active workflows cannot be edited.
       */
      workflowMode?: "live" | "draft";
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/workflow/transitions/{transitionId}/properties",
        method: "DELETE",
        pathParams: {
          transitionId
        },
        queryParams: {
          key,
          workflowName,
          workflowMode
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * This will be removed on [June 1,
     * 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570);
     * fetch transition properties from [Bulk get
     * workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-post)
     * instead.
     *
     * Returns the properties on a workflow transition. Transition properties are used
     * to change the behavior of a transition. For more information, see [Transition
     * properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties)
     * and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns 200 response
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "id": "jira.i18n.title",
     *     "key": "jira.i18n.title",
     *     "value": "some.title"
     *   },
     *   {
     *     "id": "jira.permission",
     *     "key": "jira.permission",
     *     "value": "createissue"
     *   }
     * ]
     * ```
     *
     */
    getWorkflowTransitionProperties: async ({
      transitionId,
      includeReservedKeys,
      key,
      workflowName,
      workflowMode,
      opts
    }: {
      /**
       * The ID of the transition. To get the ID, view the workflow in text mode in the
       * Jira administration console. The ID is shown next to the transition.
       */
      transitionId: number;
      /**
       * Some properties with keys that have the *jira.* prefix are reserved, which
       * means they are not editable. To include these properties in the results, set
       * this parameter to *true*.
       */
      includeReservedKeys?: boolean;
      /**
       * The key of the property being returned, also known as the name of the property.
       * If this parameter is not specified, all properties on the transition are
       * returned.
       */
      key?: string;
      /** The name of the workflow that the transition belongs to. */
      workflowName: string;
      /**
       * The workflow status. Set to *live* for active and inactive workflows, or
       * *draft* for draft workflows.
       */
      workflowMode?: "live" | "draft";
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowTransitionProperty>> => {
      return jiraRequest<WorkflowTransitionProperty>({
        path: "/rest/api/3/workflow/transitions/{transitionId}/properties",
        method: "GET",
        pathParams: {
          transitionId
        },
        queryParams: {
          includeReservedKeys,
          key,
          workflowName,
          workflowMode
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * This will be removed on [June 1,
     * 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570);
     * update transition properties using [Bulk update
     * workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-update-post)
     * instead.
     *
     * Updates a workflow transition by changing the property value. Trying to update
     * a property that does not exist results in a new property being added to the
     * transition. Transition properties are used to change the behavior of a
     * transition. For more information, see [Transition
     * properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties)
     * and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @deprecated
     * @returns 200 response
     *
     * example:
     * ```
     * {
     *   "key": "jira.i18n.title",
     *   "value": "some.title",
     *   "id": "jira.i18n.title"
     * }
     * ```
     */
    updateWorkflowTransitionProperty: async ({
      transitionId,
      key,
      workflowName,
      workflowMode,
      workflowTransitionProperty,
      opts
    }: {
      /**
       * The ID of the transition. To get the ID, view the workflow in text mode in the
       * Jira admin settings. The ID is shown next to the transition.
       */
      transitionId: number;
      /**
       * The key of the property being updated, also known as the name of the property.
       * Set this to the same value as the `key` defined in the request body.
       */
      key: string;
      /** The name of the workflow that the transition belongs to. */
      workflowName: string;
      /**
       * The workflow status. Set to `live` for inactive workflows or `draft` for draft
       * workflows. Active workflows cannot be edited.
       */
      workflowMode?: "live" | "draft";
      /**
       * @example
       * {
       *   "value": "createissue"
       * }
       */
      workflowTransitionProperty: WorkflowTransitionProperty;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowTransitionProperty>> => {
      return jiraRequest<WorkflowTransitionProperty>({
        path: "/rest/api/3/workflow/transitions/{transitionId}/properties",
        method: "PUT",
        pathParams: {
          transitionId
        },
        queryParams: {
          key,
          workflowName,
          workflowMode
        },
        body: JSON.stringify(workflowTransitionProperty),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
