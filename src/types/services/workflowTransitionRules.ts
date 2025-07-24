import type { WorkflowTransitionRules } from "./common";
/** A workflow transition rule. */
export interface AppWorkflowTransitionRule {
  /** A rule configuration. */
  configuration: RuleConfiguration;
  /** The ID of the transition rule. */
  id: string;
  /** The key of the rule, as defined in the Connect or the Forge app descriptor. */
  key: string;
  transition?: WorkflowTransition;
}
/** A page of items. */
export interface PageBeanWorkflowTransitionRules {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: WorkflowTransitionRules[];
}
/** A rule configuration. */
export interface RuleConfiguration {
  /** Whether the rule is disabled. */
  disabled?: boolean;
  /**
   * A tag used to filter rules in [Get workflow transition rule
   * configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get).
   */
  tag?: string;
  /**
   * Configuration of the rule, as it is stored by the Connect or the Forge app on
   * the rule configuration page.
   */
  value: string;
}
/** Properties that identify a workflow. */
export interface WorkflowId {
  /** Whether the workflow is in the draft state. */
  draft: boolean;
  /** The name of the workflow. */
  name: string;
}
/** Details of workflows and their transition rules to delete. */
export interface WorkflowsWithTransitionRulesDetails {
  /** The list of workflows with transition rules to delete. */
  workflows: WorkflowTransitionRulesDetails[];
}
/** A workflow transition. */
export interface WorkflowTransition {
  /** The transition ID. */
  id: number;
  /** The transition name. */
  name: string;
}
/** Details about a workflow configuration update request. */
export interface WorkflowTransitionRulesDetails {
  /** Properties that identify a workflow. */
  workflowId: WorkflowId;
  /** The list of connect workflow rule IDs. */
  workflowRuleIds: string[];
}
/** Details about a workflow configuration update request. */
export interface WorkflowTransitionRulesUpdate {
  /** The list of workflows with transition rules to update. */
  workflows: WorkflowTransitionRules[];
}
/**
 * Details of any errors encountered while updating workflow transition rules for
 * a workflow.
 */
export interface WorkflowTransitionRulesUpdateErrorDetails {
  /**
   * A list of transition rule update errors, indexed by the transition rule ID. Any
   * transition rule that appears here wasn't updated.
   */
  ruleUpdateErrors: {
    /**
     * A list of transition rule update errors, indexed by the transition rule ID. Any
     * transition rule that appears here wasn't updated.
     */
    [key: string]: string[];
  };
  /**
   * The list of errors that specify why the workflow update failed. The workflow
   * was not updated if the list contains any entries.
   */
  updateErrors: string[];
  /** Properties that identify a workflow. */
  workflowId: WorkflowId;
}
/** Details of any errors encountered while updating workflow transition rules. */
export interface WorkflowTransitionRulesUpdateErrors {
  /** A list of workflows. */
  updateResults: WorkflowTransitionRulesUpdateErrorDetails[];
}
