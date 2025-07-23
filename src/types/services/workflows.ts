import type {
  Scope,
  WorkflowScope,
  ProjectIssueTypes,
  DocumentVersion,
  ProjectDetails,
  ProjectUsagePage,
} from "./common";
/**
 * The approval configuration of a status within a workflow. Applies only to Jira
 * Service Management approvals.
 */
export interface ApprovalConfiguration {
  /** Whether the approval configuration is active. */
  active: "true" | "false";
  /**
   * How the required approval count is calculated. It may be configured to require
   * a specific number of approvals, or approval by a percentage of approvers. If
   * the approvers source field is Approver groups, you can configure how many
   * approvals per group are required for the request to be approved. The number
   * will be the same across all groups.
   */
  conditionType: "number" | "percent" | "numberPerPrincipal";
  /**
   * The number or percentage of approvals required for a request to be approved. If
   * `conditionType` is `number`, the value must be 20 or less. If `conditionType`
   * is `percent`, the value must be 100 or less.
   */
  conditionValue: string;
  /** A list of roles that should be excluded as possible approvers. */
  exclude?: "assignee" | "reporter" | null;
  /** The custom field ID of the "Approvers" or "Approver Groups" field. */
  fieldId: string;
  /**
   * The custom field ID of the field used to pre-populate the Approver field. Only
   * supports the "Affected Services" field.
   */
  prePopulatedFieldId?: string | null;
  /** The numeric ID of the transition to be executed if the request is approved. */
  transitionApproved: string;
  /** The numeric ID of the transition to be executed if the request is declined. */
  transitionRejected: string;
}
/** The Connect provided ecosystem rules available. */
export interface AvailableWorkflowConnectRule {
  /** The add-on providing the rule. */
  addonKey?: string;
  /** The URL creation path segment defined in the Connect module. */
  createUrl?: string;
  /** The rule description. */
  description?: string;
  /** The URL edit path segment defined in the Connect module. */
  editUrl?: string;
  /** The module providing the rule. */
  moduleKey?: string;
  /** The rule name. */
  name?: string;
  /** The rule key. */
  ruleKey?: string;
  /** The rule type. */
  ruleType?: "Condition" | "Validator" | "Function" | "Screen";
  /** The URL view path segment defined in the Connect module. */
  viewUrl?: string;
}
/** The Forge provided ecosystem rules available. */
export interface AvailableWorkflowForgeRule {
  /** The rule description. */
  description?: string;
  /** The unique ARI of the forge rule type. */
  id?: string;
  /** The rule name. */
  name?: string;
  /** The rule key. */
  ruleKey?: string;
  /** The rule type. */
  ruleType?: "Condition" | "Validator" | "Function" | "Screen";
}
/** The Atlassian provided system rules available. */
export interface AvailableWorkflowSystemRule {
  /** The rule description. */
  description: string;
  /** List of rules that conflict with this one. */
  incompatibleRuleKeys: string[];
  /** Whether the rule can be added added to an initial transition. */
  isAvailableForInitialTransition: boolean;
  /** Whether the rule is visible. */
  isVisible: boolean;
  /** The rule name. */
  name: string;
  /** The rule key. */
  ruleKey: string;
  /** The rule type. */
  ruleType: "Condition" | "Validator" | "Function" | "Screen";
}
/** The trigger rules available. */
export interface AvailableWorkflowTriggers {
  /** The list of available trigger types. */
  availableTypes: AvailableWorkflowTriggerTypes[];
  /** The rule key of the rule. */
  ruleKey: string;
}
/** The list of available trigger types. */
export interface AvailableWorkflowTriggerTypes {
  /** The description of the trigger rule. */
  description?: string;
  /** The name of the trigger rule. */
  name?: string;
  /** The type identifier of trigger rule. */
  type?: string;
}
/** The conditions group associated with the transition. */
export interface ConditionGroupConfiguration {
  /** The nested conditions of the condition group. */
  conditionGroups?: (ConditionGroupConfiguration | null)[];
  /** The rules for this condition. */
  conditions?: (WorkflowRuleConfiguration | null)[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY`
   * or `ALL`. If `ANY` is used, at least one condition in the group must be true
   * for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation?: "ANY" | "ALL";
}
/** The conditions group associated with the transition. */
export interface ConditionGroupUpdate {
  /** The nested conditions of the condition group. */
  conditionGroups?: (ConditionGroupUpdate | null)[];
  /** The rules for this condition. */
  conditions?: (WorkflowRuleConfiguration | null)[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY`
   * or `ALL`. If `ANY` is used, at least one condition in the group must be true
   * for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation: "ANY" | "ALL";
}
/** A workflow transition condition. */
export interface CreateWorkflowCondition {
  /** The list of workflow conditions. */
  conditions?: CreateWorkflowCondition[];
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration?: {
    /** EXPERIMENTAL. The configuration of the transition rule. */ [key: string]: unknown;
  };
  /** The compound condition operator. */
  operator?: "AND" | "OR";
  /** The type of the transition rule. */
  type?: string;
}
/** The details of a workflow. */
export interface CreateWorkflowDetails {
  /** The description of the workflow. The maximum length is 1000 characters. */
  description?: string;
  /**
   * The name of the workflow. The name must be unique. The maximum length is 255
   * characters. Characters can be separated by a whitespace but the name cannot
   * start or end with a whitespace.
   */
  name: string;
  /**
   * The statuses of the workflow. Any status that does not include a transition is
   * added to the workflow without a transition.
   */
  statuses: CreateWorkflowStatusDetails[];
  /**
   * The transitions of the workflow. For the request to be valid, these transitions
   * must:
   *
   *  *  include one *initial* transition.
   *  *  not use the same name for a *global* and *directed* transition.
   *  *  have a unique name for each *global* transition.
   *  *  have a unique 'to' status for each *global* transition.
   *  *  have unique names for each transition from a status.
   *  *  not have a 'from' status on *initial* and *global* transitions.
   *  *  have a 'from' status on *directed* transitions.
   *
   * All the transition statuses must be included in `statuses`.
   */
  transitions: CreateWorkflowTransitionDetails[];
}
/** The details of a transition status. */
export interface CreateWorkflowStatusDetails {
  /** The ID of the status. */
  id: string;
  /** The properties of the status. */
  properties?: {
    [key: string]: string;
  };
}
/** The details of a workflow transition. */
export interface CreateWorkflowTransitionDetails {
  /** The description of the transition. The maximum length is 1000 characters. */
  description?: string;
  /** The statuses the transition can start from. */
  from?: string[];
  /** The name of the transition. The maximum length is 60 characters. */
  name: string;
  /** The properties of the transition. */
  properties?: {
    [key: string]: string;
  };
  /** The rules of the transition. */
  rules?: CreateWorkflowTransitionRulesDetails;
  /** The screen of the transition. */
  screen?: CreateWorkflowTransitionScreenDetails;
  /** The status the transition goes to. */
  to: string;
  /** The type of the transition. */
  type: "global" | "initial" | "directed";
}
/** A workflow transition rule. */
export interface CreateWorkflowTransitionRule {
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration?: {
    /** EXPERIMENTAL. The configuration of the transition rule. */ [key: string]: unknown;
  };
  /** The type of the transition rule. */
  type: string;
}
/** The details of a workflow transition rules. */
export interface CreateWorkflowTransitionRulesDetails {
  /** The workflow conditions. */
  conditions?: CreateWorkflowCondition;
  /**
   * The workflow post functions.
   *
   * **Note:** The default post functions are always added to the *initial*
   * transition, as in:
   *
   *     "postFunctions": [
   *         {
   *             "type": "IssueCreateFunction"
   *         },
   *         {
   *             "type": "IssueReindexFunction"
   *         },
   *         {
   *             "type": "FireIssueEventFunction",
   *             "configuration": {
   *                 "event": {
   *                     "id": "1",
   *                     "name": "issue_created"
   *                 }
   *             }
   *         }
   *     ]
   *
   * **Note:** The default post functions are always added to the *global* and
   * *directed* transitions, as in:
   *
   *     "postFunctions": [
   *         {
   *             "type": "UpdateIssueStatusFunction"
   *         },
   *         {
   *             "type": "CreateCommentFunction"
   *         },
   *         {
   *             "type": "GenerateChangeHistoryFunction"
   *         },
   *         {
   *             "type": "IssueReindexFunction"
   *         },
   *         {
   *             "type": "FireIssueEventFunction",
   *             "configuration": {
   *                 "event": {
   *                     "id": "13",
   *                     "name": "issue_generic"
   *                 }
   *             }
   *         }
   *     ]
   */
  postFunctions?: CreateWorkflowTransitionRule[];
  /**
   * The workflow validators.
   *
   * **Note:** The default permission validator is always added to the *initial*
   * transition, as in:
   *
   *     "validators": [
   *         {
   *             "type": "PermissionValidator",
   *             "configuration": {
   *                 "permissionKey": "CREATE_ISSUES"
   *             }
   *         }
   *     ]
   */
  validators?: CreateWorkflowTransitionRule[];
}
/** The details of a transition screen. */
export interface CreateWorkflowTransitionScreenDetails {
  /** The ID of the screen. */
  id: string;
}
export interface DefaultWorkflowEditorResponse {
  value?: "NEW" | "LEGACY";
}
/** Details about a workflow. */
export interface DeprecatedWorkflow {
  default?: boolean;
  /** The description of the workflow. */
  description?: string;
  /** The datetime the workflow was last modified. */
  lastModifiedDate?: string;
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  lastModifiedUser?: string;
  /** The account ID of the user that last modified the workflow. */
  lastModifiedUserAccountId?: string;
  /** The name of the workflow. */
  name?: string;
  /** The scope where this workflow applies */
  scope?: Scope;
  /** The number of steps included in the workflow. */
  steps?: number;
}
/** Details of a workflow. */
export interface JiraWorkflow {
  /** The creation date of the workflow. */
  created?: string | null;
  /** The description of the workflow. */
  description?: string;
  /** The ID of the workflow. */
  id?: string;
  /** Indicates if the workflow can be edited. */
  isEditable?: boolean;
  /** The starting point for the statuses in the workflow. */
  loopedTransitionContainerLayout?: WorkflowLayout | null;
  /** The name of the workflow. */
  name?: string;
  /** The scope of the workflow. */
  scope?: WorkflowScope;
  /** The starting point for the statuses in the workflow. */
  startPointLayout?: WorkflowLayout | null;
  /** The statuses referenced in this workflow. */
  statuses?: WorkflowReferenceStatus[];
  /**
   * If there is a current [asynchronous task](#async-operations) operation for this
   * workflow.
   */
  taskId?: string | null;
  /**
   * The transitions of the workflow. Note that a transition can have either the
   * deprecated `to`/`from` fields or the `toStatusReference`/`links` fields, but
   * never both nor a combination.
   */
  transitions?: WorkflowTransitions[];
  /** The last edited date of the workflow. */
  updated?: string | null;
  /**
   * Deprecated. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
   * for details.
   *
   * Use the optional `workflows.usages` expand to get additional information about
   * the projects and issue types associated with the requested workflows.
   */
  usages?: (ProjectIssueTypes | null)[] | null;
  /** The current version details of this workflow scheme. */
  version?: DocumentVersion;
}
/** Details of a status. */
export interface JiraWorkflowStatus {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  /** The scope of the workflow. */
  scope?: WorkflowScope;
  /** The category of the status. */
  statusCategory?: "TODO" | "IN_PROGRESS" | "DONE";
  /** The reference of the status. */
  statusReference?: string;
  /**
   * Deprecated. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
   * for details.
   *
   * The `statuses.usages` expand is an optional parameter that can be used when
   * reading and updating statuses in Jira. It provides additional information about
   * the projects and issue types associated with the requested statuses.
   */
  usages?: (ProjectIssueTypes | null)[] | null;
}
/** A page of items. */
export interface PageBeanWorkflow {
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
  values?: Workflow[];
}
/** A project and issueType ID pair that identifies a status mapping. */
export interface ProjectAndIssueTypePair {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the project. */
  projectId: string;
}
/** The project. */
export interface ProjectUsage {
  /** The project ID. */
  id?: string;
}
/** Properties that identify a published workflow. */
export interface PublishedWorkflowId {
  /** The entity ID of the workflow. */
  entityId?: string;
  /** The name of the workflow. */
  name: string;
}
/** The statuses associated with this workflow. */
export interface StatusLayoutUpdate extends Record<string, unknown> {
  /**
   * The approval configuration of a status within a workflow. Applies only to Jira
   * Service Management approvals.
   */
  approvalConfiguration?: ApprovalConfiguration | null;
  /** The starting point for the statuses in the workflow. */
  layout?: WorkflowLayout | null;
  /** The properties for this status layout. */
  properties: {
    /** The properties for this status layout. */ [key: string]: string;
  };
  /** A unique ID which the status will use to refer to this layout configuration. */
  statusReference: string;
}
/** The mapping of old to new status ID for a specific project and issue type. */
export interface StatusMappingDto extends Record<string, unknown> {
  /** The issue type for the status mapping. */
  issueTypeId: string;
  /** The project for the status mapping. */
  projectId: string;
  /**
   * The list of old and new status ID mappings for the specified project and issue
   * type.
   */
  statusMigrations: StatusMigration[];
}
/** The mapping of old to new status ID. */
export interface StatusMigration extends Record<string, unknown> {
  /** The new status ID. */
  newStatusReference: string;
  /** The old status ID. */
  oldStatusReference: string;
}
/** Details of a workflow transition. */
export interface Transition {
  /** The description of the transition. */
  description: string;
  /** The statuses the transition can start from. */
  from: string[];
  /** The ID of the transition. */
  id: string;
  /** The name of the transition. */
  name: string;
  /** The properties of the transition. */
  properties?: {
    /** The properties of the transition. */ [key: string]: unknown;
  };
  /** A collection of transition rules. */
  rules?: WorkflowRules;
  /** The details of a transition screen. */
  screen?: TransitionScreenDetails;
  /** The status the transition goes to. */
  to: string;
  /** The type of the transition. */
  type: "global" | "initial" | "directed";
}
/** The details of a transition screen. */
export interface TransitionScreenDetails {
  /** The ID of the screen. */
  id: string;
  /** The name of the screen. */
  name?: string;
}
/** The transition update data. */
export interface TransitionUpdateDto extends Record<string, unknown> {
  /** The post-functions of the transition. */
  actions?: (WorkflowRuleConfiguration | null)[];
  /** The conditions group associated with the transition. */
  conditions?: ConditionGroupUpdate | null;
  /** The custom event ID of the transition. */
  customIssueEventId?: string;
  /** The description of the transition. */
  description?: string;
  /** The ID of the transition. */
  id?: string;
  /**
   * The statuses the transition can start from, and the mapping of ports between
   * the statuses.
   */
  links?: (WorkflowTransitionLinks | null)[];
  /** The name of the transition. */
  name?: string;
  /** The properties of the transition. */
  properties?: {
    /** The properties of the transition. */ [key: string]: string;
  };
  /** The status the transition goes to. */
  toStatusReference?: string;
  /** The configuration of the rule. */
  transitionScreen?: WorkflowRuleConfiguration | null;
  /** The triggers of the transition. */
  triggers?: WorkflowTrigger[];
  /** The transition type. */
  type?: "INITIAL" | "GLOBAL" | "DIRECTED";
  /** The validators of the transition. */
  validators?: (WorkflowRuleConfiguration | null)[];
}
/**
 * The level of validation to return from the API. If no values are provided, the
 * default would return `WARNING` and `ERROR` level validation results.
 */
export interface ValidationOptionsForCreate {
  levels?: ("WARNING" | "ERROR")[];
}
/**
 * The level of validation to return from the API. If no values are provided, the
 * default would return `WARNING` and `ERROR` level validation results.
 */
export interface ValidationOptionsForUpdate {
  levels?: ("WARNING" | "ERROR")[];
}
/** Details about a workflow. */
export interface Workflow {
  /** The creation date of the workflow. */
  created?: string;
  /** The description of the workflow. */
  description: string;
  /** Whether the workflow has a draft version. */
  hasDraftWorkflow?: boolean;
  /** Properties that identify a published workflow. */
  id: PublishedWorkflowId;
  /** Whether this is the default workflow. */
  isDefault?: boolean;
  /** Operations allowed on a workflow */
  operations?: WorkflowOperations;
  /** The projects the workflow is assigned to, through workflow schemes. */
  projects?: ProjectDetails[];
  /** The workflow schemes the workflow is assigned to. */
  schemes?: WorkflowSchemeIdName[];
  /** The statuses of the workflow. */
  statuses?: WorkflowStatus[];
  /** The transitions of the workflow. */
  transitions?: Transition[];
  /** The last edited date of the workflow. */
  updated?: string;
}
export interface WorkflowCapabilities {
  /** The Connect provided ecosystem rules available. */
  connectRules?: AvailableWorkflowConnectRule[];
  /**
   * The scope of the workflow capabilities. `GLOBAL` for company-managed projects
   * and `PROJECT` for team-managed projects.
   */
  editorScope?: "PROJECT" | "GLOBAL";
  /** The Forge provided ecosystem rules available. */
  forgeRules?: AvailableWorkflowForgeRule[];
  /** The types of projects that this capability set is available for. */
  projectTypes?: ("software" | "service_desk" | "product_discovery" | "business" | "unknown")[];
  /** The Atlassian provided system rules available. */
  systemRules?: AvailableWorkflowSystemRule[];
  /** The trigger rules available. */
  triggerRules?: AvailableWorkflowTriggers[];
}
/**
 * A compound workflow transition rule condition. This object returns `nodeType`
 * as `compound`.
 */
export interface WorkflowCompoundCondition {
  /** The list of workflow conditions. */
  conditions: WorkflowCondition[];
  nodeType: string;
  /** The compound condition operator. */
  operator: "AND" | "OR";
}
/** The workflow transition rule conditions tree. */
export type WorkflowCondition = WorkflowSimpleCondition | WorkflowCompoundCondition;
/** The details of the workflows to create. */
export interface WorkflowCreate {
  /** The description of the workflow to create. */
  description?: string;
  /** The starting point for the statuses in the workflow. */
  loopedTransitionContainerLayout?: WorkflowLayout | null;
  /** The name of the workflow to create. */
  name: string;
  /** The starting point for the statuses in the workflow. */
  startPointLayout?: WorkflowLayout | null;
  /** The statuses associated with this workflow. */
  statuses: StatusLayoutUpdate[];
  /** The transitions of this workflow. */
  transitions: TransitionUpdateDto[];
}
/** The create workflows payload. */
export interface WorkflowCreateRequest {
  /** The scope of the workflow. */
  scope?: WorkflowScope;
  /** The statuses to associate with the workflows. */
  statuses?: WorkflowStatusUpdate[];
  /** The details of the workflows to create. */
  workflows?: WorkflowCreate[];
}
/** Details of the created workflows and statuses. */
export interface WorkflowCreateResponse {
  /** List of created statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of created workflows. */
  workflows?: JiraWorkflow[];
}
export interface WorkflowCreateValidateRequest {
  /** The create workflows payload. */
  payload: WorkflowCreateRequest;
  /**
   * The level of validation to return from the API. If no values are provided, the
   * default would return `WARNING` and `ERROR` level validation results.
   */
  validationOptions?: ValidationOptionsForCreate;
}
/**
 * A reference to the location of the error. This will be null if the error does
 * not refer to a specific element.
 */
export interface WorkflowElementReference {
  /** A property key. */
  propertyKey?: string;
  /** A rule ID. */
  ruleId?: string;
  /** A project and issueType ID pair that identifies a status mapping. */
  statusMappingReference?: ProjectAndIssueTypePair;
  /** A status reference. */
  statusReference?: string;
  /** A transition ID. */
  transitionId?: string;
}
/** The classic workflow identifiers. */
export interface WorkflowIds {
  /** The entity ID of the workflow. */
  entityId?: string;
  /** The name of the workflow. */
  name: string;
}
/** The starting point for the statuses in the workflow. */
export interface WorkflowLayout {
  /** The x axis location. */
  x?: number;
  /** The y axis location. */
  y?: number;
}
/** Operations allowed on a workflow */
export interface WorkflowOperations {
  /** Whether the workflow can be deleted. */
  canDelete: boolean;
  /** Whether the workflow can be updated. */
  canEdit: boolean;
}
/** The issue type. */
export interface WorkflowProjectIssueTypeUsage {
  /** The ID of the issue type. */
  id?: string;
}
/** Issue types associated with the workflow for a project. */
export interface WorkflowProjectIssueTypeUsageDto {
  /** A page of issue types. */
  issueTypes?: WorkflowProjectIssueTypeUsagePage;
  /** The ID of the project. */
  projectId?: string;
  /** The ID of the workflow. */
  workflowId?: string;
}
/** A page of issue types. */
export interface WorkflowProjectIssueTypeUsagePage {
  /** Token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of issue types. */
  values?: WorkflowProjectIssueTypeUsage[];
}
/** Projects using the workflow. */
export interface WorkflowProjectUsageDto {
  /** A page of projects. */
  projects?: ProjectUsagePage;
  /** The workflow ID. */
  workflowId?: string;
}
export interface WorkflowReadRequest {
  /** The list of projects and issue types to query. */
  projectAndIssueTypes?: ProjectAndIssueTypePair[];
  /** The list of workflow IDs to query. */
  workflowIds?: string[];
  /** The list of workflow names to query. */
  workflowNames?: string[];
}
/** Details of workflows and related statuses. */
export interface WorkflowReadResponse {
  /** List of statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of workflows. */
  workflows?: JiraWorkflow[];
}
/** The statuses referenced in the workflow. */
export interface WorkflowReferenceStatus {
  /**
   * The approval configuration of a status within a workflow. Applies only to Jira
   * Service Management approvals.
   */
  approvalConfiguration?: ApprovalConfiguration | null;
  /** Indicates if the status is deprecated. */
  deprecated?: boolean;
  /** The x and y location of the status in the workflow. */
  layout?: WorkflowStatusLayout | null;
  /** The properties associated with the status. */
  properties?: {
    /** The properties associated with the status. */ [key: string]: string;
  };
  /** The reference of the status. */
  statusReference?: string;
}
/** The configuration of the rule. */
export interface WorkflowRuleConfiguration {
  /** The ID of the rule. */
  id?: string | null;
  /** The parameters related to the rule. */
  parameters?: {
    /** The parameters related to the rule. */ [key: string]: string;
  };
  /** The rule key of the rule. */
  ruleKey: string;
}
/** A collection of transition rules. */
export interface WorkflowRules {
  /** The workflow transition rule conditions tree. */
  conditionsTree?: WorkflowCondition;
  /** The workflow post functions. */
  postFunctions?: WorkflowTransitionRule[];
  /** The workflow validators. */
  validators?: WorkflowTransitionRule[];
}
/** The ID and the name of the workflow scheme. */
export interface WorkflowSchemeIdName {
  /** The ID of the workflow scheme. */
  id: string;
  /** The name of the workflow scheme. */
  name: string;
}
/** The worflow scheme. */
export interface WorkflowSchemeUsage {
  /** The workflow scheme ID. */
  id?: string;
}
/** Workflow schemes using the workflow. */
export interface WorkflowSchemeUsageDto {
  /** The workflow ID. */
  workflowId?: string;
  /** A page of workflow schemes. */
  workflowSchemes?: WorkflowSchemeUsagePage;
}
/** A page of workflow schemes. */
export interface WorkflowSchemeUsagePage {
  /** Token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of workflow schemes. */
  values?: WorkflowSchemeUsage[];
}
/** Page of items, including workflows and related statuses. */
export interface WorkflowSearchResponse {
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
  /** List of statuses. */
  statuses?: JiraWorkflowStatus[];
  /** The number of items returned. */
  total?: number;
  /** List of workflows. */
  values?: JiraWorkflow[];
}
/**
 * A workflow transition rule condition. This object returns `nodeType` as
 * `simple`.
 */
export interface WorkflowSimpleCondition {
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration?: {
    [key: string]: unknown;
  };
  nodeType: string;
  /** The type of the transition rule. */
  type: string;
}
/** Details of a workflow status. */
export interface WorkflowStatus {
  /** The ID of the issue status. */
  id: string;
  /** The name of the status in the workflow. */
  name: string;
  /**
   * Additional properties that modify the behavior of issues in this status.
   * Supports the properties `jira.issue.editable` and `issueEditable` (deprecated)
   * that indicate whether issues are editable.
   */
  properties?: {
    /**
     * Additional properties that modify the behavior of issues in this status.
     * Supports the properties <code>jira.issue.editable</code> and
     * <code>issueEditable</code> (deprecated) that indicate whether issues are
     * editable.
     */
    [key: string]: unknown;
  };
}
/** The x and y location of the status in the workflow. */
export interface WorkflowStatusLayout {
  /** The x axis location. */
  x?: number | null;
  /** The y axis location. */
  y?: number | null;
}
/** Details of the status being updated. */
export interface WorkflowStatusUpdate extends Record<string, unknown> {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name: string;
  /** The category of the status. */
  statusCategory: "TODO" | "IN_PROGRESS" | "DONE";
  /** The reference of the status. */
  statusReference: string;
}
/**
 * The statuses the transition can start from, and the mapping of ports between
 * the statuses.
 */
export interface WorkflowTransitionLinks {
  /** The port that the transition starts from. */
  fromPort?: number | null;
  /** The status that the transition starts from. */
  fromStatusReference?: string | null;
  /** The port that the transition goes to. */
  toPort?: number | null;
}
/** A workflow transition rule. */
export interface WorkflowTransitionRule {
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration?: unknown;
  /** The type of the transition rule. */
  type: string;
}
/** The transitions of the workflow. */
export interface WorkflowTransitions {
  /** The post-functions of the transition. */
  actions?: (WorkflowRuleConfiguration | null)[];
  /** The conditions group associated with the transition. */
  conditions?: ConditionGroupConfiguration | null;
  /** The custom event ID of the transition. */
  customIssueEventId?: string | null;
  /** The description of the transition. */
  description?: string;
  /** The ID of the transition. */
  id?: string;
  /**
   * The statuses the transition can start from, and the mapping of ports between
   * the statuses.
   */
  links?: (WorkflowTransitionLinks | null)[];
  /** The name of the transition. */
  name?: string;
  /** The properties of the transition. */
  properties?: {
    /** The properties of the transition. */ [key: string]: string;
  };
  /** The status the transition goes to. */
  toStatusReference?: string;
  /** The configuration of the rule. */
  transitionScreen?: WorkflowRuleConfiguration | null;
  /** The triggers of the transition. */
  triggers?: WorkflowTrigger[];
  /** The transition type. */
  type?: "INITIAL" | "GLOBAL" | "DIRECTED";
  /** The validators of the transition. */
  validators?: (WorkflowRuleConfiguration | null)[];
}
/** The trigger configuration associated with a workflow. */
export interface WorkflowTrigger {
  /** The ID of the trigger. */
  id?: string;
  /** The parameters of the trigger. */
  parameters: {
    /** The parameters of the trigger. */ [key: string]: string;
  };
  /** The rule key of the trigger. */
  ruleKey: string;
}
/** The details of the workflows to update. */
export interface WorkflowUpdate extends Record<string, unknown> {
  /** The mapping of old to new status ID. */
  defaultStatusMappings?: StatusMigration[];
  /** The new description for this workflow. */
  description?: string;
  /** The ID of this workflow. */
  id: string;
  /** The starting point for the statuses in the workflow. */
  loopedTransitionContainerLayout?: WorkflowLayout | null;
  /** The starting point for the statuses in the workflow. */
  startPointLayout?: WorkflowLayout | null;
  /** The mapping of old to new status ID for a specific project and issue type. */
  statusMappings?: StatusMappingDto[];
  /** The statuses associated with this workflow. */
  statuses: StatusLayoutUpdate[];
  /** The transitions of this workflow. */
  transitions: TransitionUpdateDto[];
  /** The current version details of this workflow scheme. */
  version: DocumentVersion;
}
/** The update workflows payload. */
export interface WorkflowUpdateRequest {
  /** The statuses to associate with the workflows. */
  statuses?: WorkflowStatusUpdate[];
  /** The details of the workflows to update. */
  workflows?: WorkflowUpdate[];
}
export interface WorkflowUpdateResponse {
  /** List of updated statuses. */
  statuses?: JiraWorkflowStatus[];
  /**
   * If there is a [asynchronous task](#async-operations) operation, as a result of
   * this update.
   */
  taskId?: string | null;
  /** List of updated workflows. */
  workflows?: JiraWorkflow[];
}
export interface WorkflowUpdateValidateRequestBean {
  /** The update workflows payload. */
  payload: WorkflowUpdateRequest;
  /**
   * The level of validation to return from the API. If no values are provided, the
   * default would return `WARNING` and `ERROR` level validation results.
   */
  validationOptions?: ValidationOptionsForUpdate;
}
/** The details about a workflow validation error. */
export interface WorkflowValidationError {
  /** An error code. */
  code?: string;
  /**
   * A reference to the location of the error. This will be null if the error does
   * not refer to a specific element.
   */
  elementReference?: WorkflowElementReference;
  /** The validation error level. */
  level?: "WARNING" | "ERROR";
  /** An error message. */
  message?: string;
  /** The type of element the error or warning references. */
  type?:
    | "RULE"
    | "STATUS"
    | "STATUS_LAYOUT"
    | "STATUS_PROPERTY"
    | "WORKFLOW"
    | "TRANSITION"
    | "TRANSITION_PROPERTY"
    | "SCOPE"
    | "STATUS_MAPPING"
    | "TRIGGER";
}
export interface WorkflowValidationErrorList {
  /** The list of validation errors. */
  errors?: WorkflowValidationError[];
}
