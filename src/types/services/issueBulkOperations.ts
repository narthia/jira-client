import type { ErrorMessage, User } from "./common";
/** Bulk Edit Get Fields Response. */
export interface BulkEditGetFields {
  /** The end cursor for use in pagination. */
  endingBefore?: string;
  /** List of all the fields */
  fields?: IssueBulkEditField[];
  /** The start cursor for use in pagination. */
  startingAfter?: string;
}
export interface BulkOperationErrorResponse {
  errors?: ErrorMessage[];
}
export interface BulkOperationProgress {
  /** A timestamp of when the task was submitted. */
  created?: string;
  /**
   * Map of issue IDs for which the operation failed and that the user has
   * permission to view, to their one or more reasons for failure. These reasons are
   * open-ended text descriptions of the error and are not selected from a
   * predefined list of standard reasons.
   */
  failedAccessibleIssues?: {
    [key: string]: string[];
  };
  /**
   * The number of issues that are either invalid or issues that the user doesn't
   * have permission to view, regardless of the success or failure of the operation.
   */
  invalidOrInaccessibleIssueCount?: number;
  /**
   * List of issue IDs for which the operation was successful and that the user has
   * permission to view.
   */
  processedAccessibleIssues?: number[];
  /** Progress of the task as a percentage. */
  progressPercent?: number;
  /** A timestamp of when the task was started. */
  started?: string;
  /** The status of the task. */
  status?:
    | "ENQUEUED"
    | "RUNNING"
    | "COMPLETE"
    | "FAILED"
    | "CANCEL_REQUESTED"
    | "CANCELLED"
    | "DEAD";
  /**
   * A user with details as permitted by the user's Atlassian Account privacy
   * settings. However, be aware of these exceptions:
   *
   *  *  User record deleted from Atlassian: This occurs as the result of a right to
   * be forgotten request. In this case, `displayName` provides an indication and
   * other parameters have default values or are blank (for example, email is blank).
   *  *  User record corrupted: This occurs as a results of events such as a server
   * import and can only happen to deleted users. In this case, `accountId` returns
   * *unknown* and all other parameters have fallback values.
   *  *  User record unavailable: This usually occurs due to an internal service
   * outage. In this case, all parameters have fallback values.
   */
  submittedBy?: User;
  /** The ID of the task. */
  taskId?: string;
  /** The number of issues that the bulk operation was attempted on. */
  totalIssueCount?: number;
  /** A timestamp of when the task progress was last updated. */
  updated?: string;
}
/** Bulk Transition Get Available Transitions Response. */
export interface BulkTransitionGetAvailableTransitions {
  /**
   * List of available transitions for bulk transition operation for requested
   * issues grouped by workflow
   */
  availableTransitions?: IssueBulkTransitionForWorkflow[];
  /** The end cursor for use in pagination. */
  endingBefore?: string;
  /** The start cursor for use in pagination. */
  startingAfter?: string;
}
export interface BulkTransitionSubmitInput {
  /** List of all the issue IDs or keys that are to be bulk transitioned. */
  selectedIssueIdsOrKeys: string[];
  /** The ID of the transition that is to be performed on the issues. */
  transitionId: string;
}
/** Can contain multiple field values of following types depending on `type` key */
export type BulkOperationFields = MandatoryFieldValue | MandatoryFieldValueForAdf;
/** Issue Bulk Delete Payload */
export interface IssueBulkDeletePayload {
  /**
   * List of issue IDs or keys which are to be bulk deleted. These IDs or keys can
   * be from different projects and issue types.
   */
  selectedIssueIdsOrKeys: string[];
  /**
   * A boolean value that indicates whether to send a bulk change notification when
   * the issues are being deleted.
   *
   * If `true`, dispatches a bulk notification email to users about the updates.
   */
  sendBulkNotification?: boolean | null;
}
export interface IssueBulkEditField {
  /** Description of the field. */
  description?: string;
  /**
   * A list of options related to the field, applicable in contexts where multiple
   * selections are allowed.
   */
  fieldOptions?: IssueBulkOperationsFieldOption[];
  /** The unique ID of the field. */
  id?: string;
  /** Indicates whether the field is mandatory for the operation. */
  isRequired?: boolean;
  /**
   * Specifies supported actions (like add, replace, remove) on multi-select fields
   * via an enum.
   */
  multiSelectFieldOptions?: ("ADD" | "REMOVE" | "REPLACE" | "REMOVE_ALL")[];
  /** The display name of the field. */
  name?: string;
  /** A URL to fetch additional data for the field */
  searchUrl?: string;
  /** The type of the field. */
  type?: string;
  /** A message indicating why the field is unavailable for editing. */
  unavailableMessage?: string;
}
/** Issue Bulk Edit Payload */
export interface IssueBulkEditPayload {
  /**
   * An object that defines the values to be updated in specified fields of an
   * issue. The structure and content of this parameter vary depending on the type
   * of field being edited. Although the order is not significant, ensure that field
   * IDs align with those in selectedActions.
   */
  editedFieldsInput: JiraIssueFields;
  /**
   * List of all the field IDs that are to be bulk edited. Each field ID in this
   * list corresponds to a specific attribute of an issue that is set to be modified
   * in the bulk edit operation. The relevant field ID can be obtained by calling
   * the Bulk Edit Get Fields REST API (documentation available on this page itself).
   */
  selectedActions: string[];
  /**
   * List of issue IDs or keys which are to be bulk edited. These IDs or keys can be
   * from different projects and issue types.
   */
  selectedIssueIdsOrKeys: string[];
  /**
   * A boolean value that indicates whether to send a bulk change notification when
   * the issues are being edited.
   *
   * If `true`, dispatches a bulk notification email to users about the updates.
   */
  sendBulkNotification?: boolean | null;
}
/** Issue Bulk Move Payload */
export interface IssueBulkMovePayload {
  /**
   * A boolean value that indicates whether to send a bulk change notification when
   * the issues are being moved.
   *
   * If `true`, dispatches a bulk notification email to users about the updates.
   */
  sendBulkNotification?: boolean | null;
  /**
   * An object representing the mapping of issues and data related to destination
   * entities, like fields and statuses, that are required during a bulk move.
   *
   * The key is a string that is created by concatenating the following three
   * entities in order, separated by commas. The format is `<project ID or
   * key>,<issueType ID>,<parent ID or key>`. It should be unique across mappings
   * provided in the payload. If you provide multiple mappings for the same key,
   * only one will be processed. However, the operation won't fail, so the error may
   * be hard to track down.
   *
   *  *  ***Destination project*** (Required): ID or key of the project to which the
   * issues are being moved.
   *  *  ***Destination issueType*** (Required): ID of the issueType to which the
   * issues are being moved.
   *  *  ***Destination parent ID or key*** (Optional): ID or key of the issue which
   * will become the parent of the issues being moved. Only required when the
   * destination issueType is a subtask.
   */
  targetToSourcesMapping?: {
    /**
     * An object representing the mapping of issues and data related to destination
     * entities, like fields and statuses, that are required during a bulk move.
     */
    [key: string]: TargetToSourcesMapping;
  };
}
export interface IssueBulkOperationsFieldOption {}
export interface IssueBulkTransitionForWorkflow {
  /**
   * Indicates whether all the transitions of this workflow are available in the
   * transitions list or not.
   */
  isTransitionsFiltered?: boolean;
  /** List of issue keys from the request which are associated with this workflow. */
  issues?: string[];
  /**
   * List of transitions available for issues from the request which are associated
   * with this workflow.
   *
   *  **This list includes only those transitions that are common across the issues
   * in this workflow and do not involve any additional field updates.**
   */
  transitions?: SimplifiedIssueTransition[];
}
/** Issue Bulk Transition Payload */
export interface IssueBulkTransitionPayload {
  /**
   * List of objects and each object has two properties:
   *
   *  *  Issues that will be bulk transitioned.
   *  *  TransitionId that corresponds to a specific transition of issues that share
   * the same workflow.
   */
  bulkTransitionInputs: BulkTransitionSubmitInput[];
  /**
   * A boolean value that indicates whether to send a bulk change notification when
   * the issues are being transitioned.
   *
   * If `true`, dispatches a bulk notification email to users about the updates.
   */
  sendBulkNotification?: boolean | null;
}
/** Issue Bulk Watch Or Unwatch Payload */
export interface IssueBulkWatchOrUnwatchPayload {
  /**
   * List of issue IDs or keys which are to be bulk watched or unwatched. These IDs
   * or keys can be from different projects and issue types.
   */
  selectedIssueIdsOrKeys: string[];
}
/** The issue status change of the transition. */
export interface IssueTransitionStatus {
  /** The unique ID of the status. */
  statusId?: number;
  /** The name of the status. */
  statusName?: string;
}
export interface JiraCascadingSelectField {
  childOptionValue?: JiraSelectedOptionField;
  fieldId: string;
  parentOptionValue: JiraSelectedOptionField;
}
export interface JiraColorField {
  color: JiraColorInput;
  fieldId: string;
}
export interface JiraColorInput {
  name: string;
}
export interface JiraComponentField {
  componentId: number;
}
export interface JiraDateField {
  date?: JiraDateInput;
  fieldId: string;
}
export interface JiraDateInput {
  formattedDate: string;
}
export interface JiraDateTimeField {
  dateTime: JiraDateTimeInput;
  fieldId: string;
}
export interface JiraDateTimeInput {
  formattedDateTime: string;
}
/** Edit the original estimate field. */
export interface JiraDurationField {
  originalEstimateField: string;
}
export interface JiraGroupInput {
  groupName: string;
}
/**
 * An object that defines the values to be updated in specified fields of an
 * issue. The structure and content of this parameter vary depending on the type
 * of field being edited. Although the order is not significant, ensure that field
 * IDs align with those in selectedActions.
 */
export interface JiraIssueFields {
  /**
   * Add or clear a cascading select field:
   *
   *  *  To add, specify `optionId` for both parent and child.
   *  *  To clear the child, set its `optionId` to null.
   *  *  To clear both, set the parent's `optionId` to null.
   */
  cascadingSelectFields?: JiraCascadingSelectField[];
  /**
   * Add or clear a number field:
   *
   *  *  To add, specify a numeric `value`.
   *  *  To clear, set `value` to `null`.
   */
  clearableNumberFields?: JiraNumberField[];
  /**
   * Add or clear a color field:
   *
   *  *  To add, specify the color `name`. Available colors are: `purple`, `blue`,
   * `green`, `teal`, `yellow`, `orange`, `grey`, `dark purple`, `dark blue`, `dark
   * green`, `dark teal`, `dark yellow`, `dark orange`, `dark grey`.
   *  *  To clear, set the color `name` to an empty string.
   */
  colorFields?: JiraColorField[];
  /**
   * Add or clear a date picker field:
   *
   *  *  To add, specify the date in `d/mmm/yy` format or ISO format `dd-mm-yyyy`.
   *  *  To clear, set `formattedDate` to an empty string.
   */
  datePickerFields?: JiraDateField[];
  /**
   * Add or clear the planned start date and time:
   *
   *  *  To add, specify the date and time in ISO format for `formattedDateTime`.
   *  *  To clear, provide an empty string for `formattedDateTime`.
   */
  dateTimePickerFields?: JiraDateTimeField[];
  /** Set the issue type field by providing an `issueTypeId`. */
  issueType?: JiraIssueTypeField;
  /**
   * Edit a labels field:
   *
   *  *  Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.
   *  *  To clear labels, use the `REMOVE_ALL` option with an empty `labels` array.
   */
  labelsFields?: JiraLabelsField[];
  /**
   * Add or clear a multi-group picker field:
   *
   *  *  To add groups, provide an array of groups with `groupName`s.
   *  *  To clear all groups, use an empty `groups` array.
   */
  multipleGroupPickerFields?: JiraMultipleGroupPickerField[];
  /**
   * Assign or unassign multiple users to/from a field:
   *
   *  *  To assign, provide an array of user `accountId`s.
   *  *  To clear, set `users` to `null`.
   */
  multipleSelectClearableUserPickerFields?: JiraMultipleSelectUserPickerField[];
  /**
   * Add or clear a multi-select field:
   *
   *  *  To add, provide an array of options with `optionId`s.
   *  *  To clear, use an empty `options` array.
   */
  multipleSelectFields?: JiraMultipleSelectField[];
  /**
   * Edit a multi-version picker field like Fix Versions/Affects Versions:
   *
   *  *  Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.
   *  *  To clear the field, use the `REMOVE_ALL` option with an empty `versions`
   * array.
   */
  multipleVersionPickerFields?: JiraMultipleVersionPickerField[];
  /**
   * Edit a multi select components field:
   *
   *  *  Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.
   *  *  To clear, use the `REMOVE_ALL` option with an empty `components` array.
   */
  multiselectComponents?: JiraMultiSelectComponentField;
  /** Edit the original estimate field. */
  originalEstimateField?: JiraDurationField;
  /** Set the priority of an issue by specifying a `priorityId`. */
  priority?: JiraPriorityField;
  /**
   * Add or clear a rich text field:
   *
   *  *  To add, provide `adfValue`. Note that rich text fields only support ADF
   * values.
   *  *  To clear, use an empty `richText` object.
   *
   * For ADF format details, refer to: [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure).
   */
  richTextFields?: JiraRichTextField[];
  /**
   * Add or clear a single group picker field:
   *
   *  *  To add, specify the group with `groupName`.
   *  *  To clear, set `groupName` to an empty string.
   */
  singleGroupPickerFields?: JiraSingleGroupPickerField[];
  /**
   * Add or clear a single line text field:
   *
   *  *  To add, provide the `text` value.
   *  *  To clear, set `text` to an empty string.
   */
  singleLineTextFields?: JiraSingleLineTextField[];
  /**
   * Edit assignment for single select user picker fields like Assignee/Reporter:
   *
   *  *  To assign an issue, specify the user's `accountId`.
   *  *  To unassign an issue, set `user` to `null`.
   *  *  For automatic assignment, set `accountId` to `-1`.
   */
  singleSelectClearableUserPickerFields?: JiraSingleSelectUserPickerField[];
  /**
   * Add or clear a single select field:
   *
   *  *  To add, specify the option with an `optionId`.
   *  *  To clear, pass an option with `optionId` as `-1`.
   */
  singleSelectFields?: JiraSingleSelectField[];
  /**
   * Add or clear a single version picker field:
   *
   *  *  To add, specify the version with a `versionId`.
   *  *  To clear, set `versionId` to `-1`.
   */
  singleVersionPickerFields?: JiraSingleVersionPickerField[];
  status?: JiraStatusInput;
  /** Edit the time tracking field. */
  timeTrackingField?: JiraTimeTrackingField;
  /**
   * Add or clear a URL field:
   *
   *  *  To add, provide the `url` with the desired URL value.
   *  *  To clear, set `url` to an empty string.
   */
  urlFields?: JiraUrlField[];
}
/** Set the issue type field by providing an `issueTypeId`. */
export interface JiraIssueTypeField {
  issueTypeId: string;
}
export interface JiraLabelPropertiesInputJackson1 {
  color?:
    | "GREY_LIGHTEST"
    | "GREY_LIGHTER"
    | "GREY"
    | "GREY_DARKER"
    | "GREY_DARKEST"
    | "PURPLE_LIGHTEST"
    | "PURPLE_LIGHTER"
    | "PURPLE"
    | "PURPLE_DARKER"
    | "PURPLE_DARKEST"
    | "BLUE_LIGHTEST"
    | "BLUE_LIGHTER"
    | "BLUE"
    | "BLUE_DARKER"
    | "BLUE_DARKEST"
    | "TEAL_LIGHTEST"
    | "TEAL_LIGHTER"
    | "TEAL"
    | "TEAL_DARKER"
    | "TEAL_DARKEST"
    | "GREEN_LIGHTEST"
    | "GREEN_LIGHTER"
    | "GREEN"
    | "GREEN_DARKER"
    | "GREEN_DARKEST"
    | "LIME_LIGHTEST"
    | "LIME_LIGHTER"
    | "LIME"
    | "LIME_DARKER"
    | "LIME_DARKEST"
    | "YELLOW_LIGHTEST"
    | "YELLOW_LIGHTER"
    | "YELLOW"
    | "YELLOW_DARKER"
    | "YELLOW_DARKEST"
    | "ORANGE_LIGHTEST"
    | "ORANGE_LIGHTER"
    | "ORANGE"
    | "ORANGE_DARKER"
    | "ORANGE_DARKEST"
    | "RED_LIGHTEST"
    | "RED_LIGHTER"
    | "RED"
    | "RED_DARKER"
    | "RED_DARKEST"
    | "MAGENTA_LIGHTEST"
    | "MAGENTA_LIGHTER"
    | "MAGENTA"
    | "MAGENTA_DARKER"
    | "MAGENTA_DARKEST";
  name?: string;
}
export interface JiraLabelsField {
  bulkEditMultiSelectFieldOption: "ADD" | "REMOVE" | "REPLACE" | "REMOVE_ALL";
  fieldId: string;
  labelProperties?: JiraLabelPropertiesInputJackson1[];
  labels: JiraLabelsInput[];
}
export interface JiraLabelsInput {
  name: string;
}
export interface JiraMultipleGroupPickerField {
  fieldId: string;
  groups: JiraGroupInput[];
}
export interface JiraMultipleSelectField {
  fieldId: string;
  options: JiraSelectedOptionField[];
}
export interface JiraMultipleSelectUserPickerField {
  fieldId: string;
  users?: JiraUserField[];
}
export interface JiraMultipleVersionPickerField {
  bulkEditMultiSelectFieldOption: "ADD" | "REMOVE" | "REPLACE" | "REMOVE_ALL";
  fieldId: string;
  versions: JiraVersionField[];
}
/**
 * Edit a multi select components field:
 *
 *  *  Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.
 *  *  To clear, use the `REMOVE_ALL` option with an empty `components` array.
 */
export interface JiraMultiSelectComponentField {
  bulkEditMultiSelectFieldOption: "ADD" | "REMOVE" | "REPLACE" | "REMOVE_ALL";
  components: JiraComponentField[];
  fieldId: string;
}
export interface JiraNumberField {
  fieldId: string;
  value?: number;
}
/** Set the priority of an issue by specifying a `priorityId`. */
export interface JiraPriorityField {
  priorityId: string;
}
export interface JiraRichTextField {
  fieldId: string;
  richText: JiraRichTextInput;
}
export interface JiraRichTextInput {
  adfValue?: {
    [key: string]: unknown;
  };
}
export interface JiraSelectedOptionField {
  optionId?: number;
}
export interface JiraSingleGroupPickerField {
  fieldId: string;
  group: JiraGroupInput;
}
export interface JiraSingleLineTextField {
  fieldId: string;
  text: string;
}
/**
 * Add or clear a single select field:
 *
 *  *  To add, specify the option with an `optionId`.
 *  *  To clear, pass an option with `optionId` as `-1`.
 */
export interface JiraSingleSelectField {
  fieldId: string;
  option: JiraSelectedOptionField;
}
export interface JiraSingleSelectUserPickerField {
  fieldId: string;
  user?: JiraUserField;
}
export interface JiraSingleVersionPickerField {
  fieldId: string;
  version: JiraVersionField;
}
export interface JiraStatusInput {
  statusId: string;
}
/** Edit the time tracking field. */
export interface JiraTimeTrackingField {
  timeRemaining: string;
}
export interface JiraUrlField {
  fieldId: string;
  url: string;
}
export interface JiraUserField {
  accountId: string;
}
export interface JiraVersionField {
  versionId?: string;
}
/** List of string of inputs */
export interface MandatoryFieldValue {
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain?: boolean | null;
  /** Will treat as `MandatoryFieldValue` if type is `raw` or `empty` */
  type?: "adf" | "raw" | null;
  /** Value for each field. Provide a `list of strings` for non-ADF fields. */
  value: string[];
}
/** An object notation input */
export interface MandatoryFieldValueForAdf {
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain?: boolean | null;
  /** Will treat as `MandatoryFieldValueForADF` if type is `adf` */
  type: "adf" | "raw";
  /**
   * Value for each field. Accepts Atlassian Document Format (ADF) for rich text
   * fields like `description`, `environments`. For ADF format details, refer to:
   * [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure)
   */
  value: {
    [key: string]: unknown;
  };
}
export interface SimplifiedIssueTransition {
  /** The issue status change of the transition. */
  to?: IssueTransitionStatus;
  /** The unique ID of the transition. */
  transitionId?: number;
  /** The name of the transition. */
  transitionName?: string;
}
export interface SubmittedBulkOperation {
  taskId?: string;
}
/**
 * Classification mapping for classifications in source issues to respective
 * target classification.
 */
export interface TargetClassification {
  /**
   * An object with the key as the ID of the target classification and value with
   * the list of the IDs of the current source classifications.
   */
  classifications: {
    [key: string]: string[];
  };
  /** ID of the source issueType to which issues present in `issueIdOrKeys` belongs. */
  issueType?: string;
  /**
   * ID or key of the source project to which issues present in `issueIdOrKeys`
   * belongs.
   */
  projectKeyOrId?: string;
}
/** Field mapping for mandatory fields in target */
export interface TargetMandatoryFields {
  /** Contains the value of mandatory fields */
  fields: {
    /** Can contain multiple field values of following types depending on `type` key */
    [key: string]: BulkOperationFields;
  };
}
/**
 * Status mapping for statuses in source workflow to respective target status in
 * target workflow.
 */
export interface TargetStatus {
  /**
   * An object with the key as the ID of the target status and value with the list
   * of the IDs of the current source statuses.
   */
  statuses: {
    [key: string]: string[];
  };
}
/**
 * An object representing the mapping of issues and data related to destination
 * entities, like fields and statuses, that are required during a bulk move.
 */
export interface TargetToSourcesMapping {
  /**
   * If `true`, when issues are moved into this target group, they will adopt the
   * target project's default classification, if they don't have a classification
   * already. If they do have a classification, it will be kept the same even after
   * the move. Leave `targetClassification` empty when using this.
   *
   * If `false`, you must provide a `targetClassification` mapping for each
   * classification associated with the selected issues.
   *
   * [Benefit from data
   * classification](https://support.atlassian.com/security-and-access-policies/docs/what-is-data-classification/)
   */
  inferClassificationDefaults: boolean;
  /**
   * If `true`, values from the source issues will be retained for the mandatory
   * fields in the field configuration of the destination project. The
   * `targetMandatoryFields` property shouldn't be defined.
   *
   * If `false`, the user is required to set values for mandatory fields present in
   * the field configuration of the destination project. Provide input by defining
   * the `targetMandatoryFields` property
   */
  inferFieldDefaults: boolean;
  /**
   * If `true`, the statuses of issues being moved in this target group that are not
   * present in the target workflow will be changed to the default status of the
   * target workflow (see below). Leave `targetStatus` empty when using this.
   *
   * If `false`, you must provide a `targetStatus` for each status not present in
   * the target workflow.
   *
   * The default status in a workflow is referred to as the "initial status". Each
   * workflow has its own unique initial status. When an issue is created, it is
   * automatically assigned to this initial status. Read more about configuring
   * initial statuses: [Configure the initial status | Atlassian
   * Support.](https://support.atlassian.com/jira-cloud-administration/docs/configure-the-initial-status/)
   */
  inferStatusDefaults: boolean;
  /**
   * When an issue is moved, its subtasks (if there are any) need to be moved with
   * it. `inferSubtaskTypeDefault` helps with moving the subtasks by picking a
   * random subtask type in the target project.
   *
   * If `true`, subtasks will automatically move to the same project as their parent.
   *
   * When they move:
   *
   *  *  Their `issueType` will be set to the default for subtasks in the target
   * project.
   *  *  Values for mandatory fields will be retained from the source issues
   *  *  Specifying separate mapping for implicit subtasks won’t be allowed.
   *
   * If `false`, you must manually move the subtasks. They will retain the parent
   * which they had in the current project after being moved.
   */
  inferSubtaskTypeDefault: boolean;
  /** List of issue IDs or keys to be moved. */
  issueIdsOrKeys?: string[];
  /**
   * List of the objects containing classifications in the source issues and their
   * new values which need to be set during the bulk move operation.
   *
   * It is mandatory to provide source classification to target classification
   * mapping when the source classification is invalid for the target project and
   * issue type.
   *
   *  *  **You should only define this property when `inferClassificationDefaults`
   * is `false`.**
   *  *  **In order to provide mapping for issues which don't have a classification,
   * use `"-1"`.**
   */
  targetClassification?: (TargetClassification | null)[] | null;
  /**
   * List of objects containing mandatory fields in the target field configuration
   * and new values that need to be set during the bulk move operation.
   *
   * The new values will only be applied if the field is mandatory in the target
   * project and at least one issue from the source has that field empty, or if the
   * field context is different in the target project (e.g. project-scoped version
   * fields).
   *
   * **You should only define this property when `inferFieldDefaults` is `false`.**
   */
  targetMandatoryFields?: (TargetMandatoryFields | null)[] | null;
  /**
   * List of the objects containing statuses in the source workflow and their new
   * values which need to be set during the bulk move operation.
   *
   * The new values will only be applied if the source status is invalid for the
   * target project and issue type.
   *
   * It is mandatory to provide source status to target status mapping when the
   * source status is invalid for the target project and issue type.
   *
   * **You should only define this property when `inferStatusDefaults` is `false`.**
   */
  targetStatus?: (TargetStatus | null)[] | null;
}
