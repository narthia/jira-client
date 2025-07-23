import type {
  PageBeanWorkflowTransitionRules,
  WorkflowTransitionRulesUpdate,
  WorkflowTransitionRulesUpdateErrors,
  WorkflowsWithTransitionRulesDetails,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents workflow transition rules. Workflow transition rules
 * define a Connect or a Forge app routine, such as a [workflow post
 * functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
 * that is executed in association with the workflow. Use it to read and modify
 * configuration of workflow transition rules.
 */
export default function workflowTransitionRules<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes workflow transition rules from one or more workflows. These rule types
     * are supported:
     *
     *  *  [post
     * functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
     *  *
     * [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)
     *  *
     * [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)
     *
     * Only rules created by the calling Connect app can be deleted.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can use this
     * operation.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "updateResults": [
     *     {
     *       "workflowId": {
     *         "name": "Workflow with one rule not updated",
     *         "draft": false
     *       },
     *       "ruleUpdateErrors": {
     *         "example-rule-id": [
     *           "The rule with this id does not exist: example-rule-id"
     *         ]
     *       },
     *       "updateErrors": []
     *     },
     *     {
     *       "workflowId": {
     *         "name": "Workflow with all rules successfully updated",
     *         "draft": true
     *       },
     *       "ruleUpdateErrors": {},
     *       "updateErrors": []
     *     },
     *     {
     *       "workflowId": {
     *         "name": "Non-existing workflow",
     *         "draft": false
     *       },
     *       "ruleUpdateErrors": {},
     *       "updateErrors": [
     *         "Workflow not found: WorkflowIdBean{name=Non-existing workflow, draft=false}"
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    deleteWorkflowTransitionRuleConfigurations: async ({
      workflowsWithTransitionRulesDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "workflows": [
       *     {
       *       "workflowId": {
       *         "draft": false,
       *         "name": "Internal support workflow"
       *       },
       *       "workflowRuleIds": [
       *         "b4d6cbdc-59f5-11e9-8647-d663bd873d93",
       *         "d663bd873d93-59f5-11e9-8647-b4d6cbdc",
       *         "11e9-59f5-b4d6cbdc-8647-d663bd873d93"
       *       ]
       *     }
       *   ]
       * }
       */
      workflowsWithTransitionRulesDetails: WorkflowsWithTransitionRulesDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowTransitionRulesUpdateErrors>> => {
      return jiraRequest<WorkflowTransitionRulesUpdateErrors>({
        path: "/rest/api/3/workflow/rule/config/delete",
        method: "PUT",
        body: JSON.stringify(workflowsWithTransitionRulesDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of workflows with transition rules. The
     * workflows can be filtered to return only those containing workflow transition
     * rules:
     *
     *  *  of one or more transition rule types, such as [workflow post
     * functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/).
     *  *  matching one or more transition rule keys.
     *
     * Only workflows containing transition rules created by the calling
     * [Connect](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps)
     * or
     * [Forge](https://developer.atlassian.com/cloud/jira/platform/index/#forge-apps)
     * app are returned.
     *
     * Due to server-side optimizations, workflows with an empty list of rules may be
     * returned; these workflows can be ignored.
     *
     * **[Permissions](#permissions) required:** Only
     * [Connect](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps)
     * or
     * [Forge](https://developer.atlassian.com/cloud/jira/platform/index/#forge-apps)
     * apps can use this operation.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 10,
     *   "startAt": 0,
     *   "total": 1,
     *   "values": [
     *     {
     *       "workflowId": {
     *         "name": "My Workflow name",
     *         "draft": false
     *       },
     *       "postFunctions": [
     *         {
     *           "id": "b4d6cbdc-59f5-11e9-8647-d663bd873d93",
     *           "key": "postfunction-key",
     *           "configuration": {
     *             "value": "{ \"color\": \"red\" }",
     *             "disabled": false,
     *             "tag": "Sample tag"
     *           },
     *           "transition": {
     *             "id": 1,
     *             "name": "Open"
     *           }
     *         }
     *       ],
     *       "conditions": [
     *         {
     *           "id": "d663bd873d93-59f5-11e9-8647-b4d6cbdc",
     *           "key": "condition-key",
     *           "configuration": {
     *             "value": "{ \"size\": \"medium\" }",
     *             "disabled": false,
     *             "tag": "Another tag"
     *           },
     *           "transition": {
     *             "id": 1,
     *             "name": "Open"
     *           }
     *         }
     *       ],
     *       "validators": [
     *         {
     *           "id": "11e9-59f5-b4d6cbdc-8647-d663bd873d93",
     *           "key": "validator-key",
     *           "configuration": {
     *             "value": "\"{ \\\"shape\\\": \\\"square\\\" }\"",
     *             "disabled": false
     *           },
     *           "transition": {
     *             "id": 1,
     *             "name": "Open"
     *           }
     *         }
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    getWorkflowTransitionRuleConfigurations: async ({
      startAt,
      maxResults,
      types,
      keys,
      workflowNames,
      withTags,
      draft,
      expand,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /** The types of the transition rules to return. */
      types: ("postfunction" | "condition" | "validator")[];
      /**
       * The transition rule class keys, as defined in the Connect or the Forge app
       * descriptor, of the transition rules to return.
       */
      keys?: string[];
      /** The list of workflow names to filter by. */
      workflowNames?: string[];
      /** The list of `tags` to filter by. */
      withTags?: string[];
      /**
       * Whether draft or published workflows are returned. If not provided, both
       * workflow types are returned.
       */
      draft?: boolean;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts `transition`, which, for each rule, returns information
       * about the transition the rule is assigned to.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanWorkflowTransitionRules>> => {
      return jiraRequest<PageBeanWorkflowTransitionRules>({
        path: "/rest/api/3/workflow/rule/config",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          types,
          keys,
          workflowNames,
          withTags,
          draft,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates configuration of workflow transition rules. The following rule types
     * are supported:
     *
     *  *  [post
     * functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
     *  *
     * [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)
     *  *
     * [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)
     *
     * Only rules created by the calling
     * [Connect](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps)
     * or
     * [Forge](https://developer.atlassian.com/cloud/jira/platform/index/#forge-apps)
     * app can be updated.
     *
     * To assist with app migration, this operation can be used to:
     *
     *  *  Disable a rule.
     *  *  Add a `tag`. Use this to filter rules in the [Get workflow transition rule
     * configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get).
     *
     * Rules are enabled if the `disabled` parameter is not provided.
     *
     * **[Permissions](#permissions) required:** Only
     * [Connect](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps)
     * or
     * [Forge](https://developer.atlassian.com/cloud/jira/platform/index/#forge-apps)
     * apps can use this operation.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "updateResults": [
     *     {
     *       "workflowId": {
     *         "name": "Workflow with one rule not updated",
     *         "draft": false
     *       },
     *       "ruleUpdateErrors": {
     *         "example-rule-id": [
     *           "The rule with this id does not exist: example-rule-id"
     *         ]
     *       },
     *       "updateErrors": []
     *     },
     *     {
     *       "workflowId": {
     *         "name": "Workflow with all rules successfully updated",
     *         "draft": true
     *       },
     *       "ruleUpdateErrors": {},
     *       "updateErrors": []
     *     },
     *     {
     *       "workflowId": {
     *         "name": "Non-existing workflow",
     *         "draft": false
     *       },
     *       "ruleUpdateErrors": {},
     *       "updateErrors": [
     *         "Workflow not found: WorkflowIdBean{name=Non-existing workflow, draft=false}"
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    updateWorkflowTransitionRuleConfigurations: async ({
      workflowTransitionRulesUpdate,
      opts
    }: {
      /**
       * @example
       * {
       *   "workflows": [
       *     {
       *       "conditions": [
       *         {
       *           "configuration": {
       *             "disabled": false,
       *             "tag": "Another tag",
       *             "value": "{ \"size\": \"medium\" }"
       *           },
       *           "id": "d663bd873d93-59f5-11e9-8647-b4d6cbdc"
       *         }
       *       ],
       *       "postFunctions": [
       *         {
       *           "configuration": {
       *             "disabled": false,
       *             "tag": "Sample tag",
       *             "value": "{ \"color\": \"red\" }"
       *           },
       *           "id": "b4d6cbdc-59f5-11e9-8647-d663bd873d93"
       *         }
       *       ],
       *       "validators": [
       *         {
       *           "configuration": {
       *             "disabled": false,
       *             "value": "{ \"shape\": \"square\" }"
       *           },
       *           "id": "11e9-59f5-b4d6cbdc-8647-d663bd873d93"
       *         }
       *       ],
       *       "workflowId": {
       *         "draft": false,
       *         "name": "My Workflow name"
       *       }
       *     }
       *   ]
       * }
       */
      workflowTransitionRulesUpdate: WorkflowTransitionRulesUpdate;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowTransitionRulesUpdateErrors>> => {
      return jiraRequest<WorkflowTransitionRulesUpdateErrors>({
        path: "/rest/api/3/workflow/rule/config",
        method: "PUT",
        body: JSON.stringify(workflowTransitionRulesUpdate),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
