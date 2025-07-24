import type { WorkflowTransitionRules } from "./common";
/** A list of custom field details. */
export interface ConnectCustomFieldValue extends Record<string, unknown> {
  /** The type of custom field. */
  _type:
    | "StringIssueField"
    | "NumberIssueField"
    | "RichTextIssueField"
    | "SingleSelectIssueField"
    | "MultiSelectIssueField"
    | "TextIssueField";
  /** The custom field ID. */
  fieldID: number;
  /** The issue ID. */
  issueID: number;
  /** The value of number type custom field when `_type` is `NumberIssueField`. */
  number?: number;
  /**
   * The value of single select and multiselect custom field type when `_type` is
   * `SingleSelectIssueField` or `MultiSelectIssueField`.
   */
  optionID?: string;
  /** The value of richText type custom field when `_type` is `RichTextIssueField`. */
  richText?: string;
  /** The value of string type custom field when `_type` is `StringIssueField`. */
  string?: string;
  /** The value of of text custom field type when `_type` is `TextIssueField`. */
  text?: string;
}
/** Details of updates for a custom field. */
export interface ConnectCustomFieldValues {
  /** The list of custom field update details. */
  updateValueList?: ConnectCustomFieldValue[];
}
export interface EntityPropertyDetails extends Record<string, unknown> {
  /**
   * The entity property ID.
   *
   * @example
   * 123
   */
  entityId: number;
  /**
   * The entity property key.
   *
   * @example
   * mykey
   */
  key: string;
  /**
   * The new value of the entity property.
   *
   * @example
   * newValue
   */
  value: string;
}
/** Details of the workflow and its transition rules. */
export interface WorkflowRulesSearch extends Record<string, unknown> {
  /**
   * Use expand to include additional information in the response. This parameter
   * accepts `transition` which, for each rule, returns information about the
   * transition the rule is assigned to.
   *
   * @example
   * transition
   */
  expand?: string;
  /** The list of workflow rule IDs. */
  ruleIds: string[];
  /**
   * The workflow ID.
   *
   * @example
   * a498d711-685d-428d-8c3e-bc03bb450ea7
   */
  workflowEntityId: string;
}
/** Details of workflow transition rules. */
export interface WorkflowRulesSearchDetails extends Record<string, unknown> {
  /**
   * List of workflow rule IDs that do not belong to the workflow or can not be
   * found.
   */
  invalidRules?: string[];
  /** List of valid workflow transition rules. */
  validRules?: WorkflowTransitionRules[];
  /**
   * The workflow ID.
   *
   * @example
   * a498d711-685d-428d-8c3e-bc03bb450ea7
   */
  workflowEntityId?: string;
}
