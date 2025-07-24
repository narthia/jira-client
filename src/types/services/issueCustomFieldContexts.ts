/** The project and issue type mapping with a matching custom field context. */
export interface ContextForProjectAndIssueType {
  /** The ID of the custom field context. */
  contextId: string;
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the project. */
  projectId: string;
}
/** The details of a created custom field context. */
export interface CreateCustomFieldContext {
  /** The description of the context. */
  description?: string;
  /** The ID of the context. */
  id?: string;
  /**
   * The list of issue types IDs for the context. If the list is empty, the context
   * refers to all issue types.
   */
  issueTypeIds?: string[];
  /** The name of the context. */
  name: string;
  /**
   * The list of project IDs associated with the context. If the list is empty, the
   * context is global.
   */
  projectIds?: string[];
}
/** The details of a custom field context. */
export interface CustomFieldContext {
  /** The description of the context. */
  description: string;
  /** The ID of the context. */
  id: string;
  /** Whether the context apply to all issue types. */
  isAnyIssueType: boolean;
  /** Whether the context is global. */
  isGlobalContext: boolean;
  /** The name of the context. */
  name: string;
}
export type CustomFieldContextDefaultValue =
  | CustomFieldContextDefaultValueCascadingOption
  | CustomFieldContextDefaultValueMultipleOption
  | CustomFieldContextDefaultValueSingleOption
  | CustomFieldContextSingleUserPickerDefaults
  | CustomFieldContextDefaultValueMultiUserPicker
  | CustomFieldContextDefaultValueSingleGroupPicker
  | CustomFieldContextDefaultValueMultipleGroupPicker
  | CustomFieldContextDefaultValueDate
  | CustomFieldContextDefaultValueDateTime
  | CustomFieldContextDefaultValueUrl
  | CustomFieldContextDefaultValueProject
  | CustomFieldContextDefaultValueFloat
  | CustomFieldContextDefaultValueLabels
  | CustomFieldContextDefaultValueTextField
  | CustomFieldContextDefaultValueTextArea
  | CustomFieldContextDefaultValueReadOnly
  | CustomFieldContextDefaultValueSingleVersionPicker
  | CustomFieldContextDefaultValueMultipleVersionPicker
  | CustomFieldContextDefaultValueForgeStringField
  | CustomFieldContextDefaultValueForgeMultiStringField
  | CustomFieldContextDefaultValueForgeObjectField
  | CustomFieldContextDefaultValueForgeDateTimeField
  | CustomFieldContextDefaultValueForgeGroupField
  | CustomFieldContextDefaultValueForgeMultiGroupField
  | CustomFieldContextDefaultValueForgeNumberField
  | CustomFieldContextDefaultValueForgeUserField
  | CustomFieldContextDefaultValueForgeMultiUserField;
/** The default value for a cascading select custom field. */
export interface CustomFieldContextDefaultValueCascadingOption {
  /** The ID of the default cascading option. */
  cascadingOptionId?: string;
  /** The ID of the context. */
  contextId: string;
  /** The ID of the default option. */
  optionId: string;
  type: string;
}
/** The default value for a Date custom field. */
export interface CustomFieldContextDefaultValueDate {
  /** The default date in ISO format. Ignored if `useCurrent` is true. */
  date?: string;
  type: string;
  /** Whether to use the current date. */
  useCurrent?: boolean;
}
/** The default value for a date time custom field. */
export interface CustomFieldContextDefaultValueDateTime {
  /** The default date-time in ISO format. Ignored if `useCurrent` is true. */
  dateTime?: string;
  type: string;
  /** Whether to use the current date. */
  useCurrent?: boolean;
}
/** Default value for a float (number) custom field. */
export interface CustomFieldContextDefaultValueFloat {
  /** The default floating-point number. */
  number: number;
  type: string;
}
/** The default value for a Forge date time custom field. */
export interface CustomFieldContextDefaultValueForgeDateTimeField {
  /** The ID of the context. */
  contextId: string;
  /** The default date-time in ISO format. Ignored if `useCurrent` is true. */
  dateTime?: string;
  type: string;
  /** Whether to use the current date. */
  useCurrent?: boolean;
}
/** The default value for a Forge group custom field. */
export interface CustomFieldContextDefaultValueForgeGroupField {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the the default group. */
  groupId: string;
  type: string;
}
/** The default value for a Forge collection of groups custom field. */
export interface CustomFieldContextDefaultValueForgeMultiGroupField {
  /** The ID of the context. */
  contextId: string;
  /** The IDs of the default groups. */
  groupIds: string[];
  type: string;
}
/** The default text for a Forge collection of strings custom field. */
export interface CustomFieldContextDefaultValueForgeMultiStringField {
  type: string;
  /** List of string values. The maximum length for a value is 254 characters. */
  values?: string[];
}
/** Defaults for a Forge collection of users custom field. */
export interface CustomFieldContextDefaultValueForgeMultiUserField {
  /** The IDs of the default users. */
  accountIds: string[];
  /** The ID of the context. */
  contextId: string;
  type: string;
}
/** Default value for a Forge number custom field. */
export interface CustomFieldContextDefaultValueForgeNumberField {
  /** The ID of the context. */
  contextId: string;
  /** The default floating-point number. */
  number: number;
  type: string;
}
/** The default value for a Forge object custom field. */
export interface CustomFieldContextDefaultValueForgeObjectField {
  /** The default JSON object. */
  object?: {
    [key: string]: unknown;
  };
  type: string;
}
/** The default text for a Forge string custom field. */
export interface CustomFieldContextDefaultValueForgeStringField {
  /** The ID of the context. */
  contextId: string;
  /** The default text. The maximum length is 254 characters. */
  text?: string;
  type: string;
}
/** Defaults for a Forge user custom field. */
export interface CustomFieldContextDefaultValueForgeUserField {
  /** The ID of the default user. */
  accountId: string;
  /** The ID of the context. */
  contextId: string;
  type: string;
  /** Filter for a User Picker (single) custom field. */
  userFilter: UserFilter;
}
/** Default value for a labels custom field. */
export interface CustomFieldContextDefaultValueLabels {
  /** The default labels value. */
  labels: string[];
  type: string;
}
/** The default value for a multiple group picker custom field. */
export interface CustomFieldContextDefaultValueMultipleGroupPicker {
  /** The ID of the context. */
  contextId: string;
  /** The IDs of the default groups. */
  groupIds: string[];
  type: string;
}
/** The default value for a multi-select custom field. */
export interface CustomFieldContextDefaultValueMultipleOption {
  /** The ID of the context. */
  contextId: string;
  /** The list of IDs of the default options. */
  optionIds: string[];
  type: string;
}
/** The default value for a multiple version picker custom field. */
export interface CustomFieldContextDefaultValueMultipleVersionPicker {
  type: string;
  /** The IDs of the default versions. */
  versionIds: string[];
  /**
   * The order the pickable versions are displayed in. If not provided, the
   * released-first order is used. Available version orders are `"releasedFirst"`
   * and `"unreleasedFirst"`.
   */
  versionOrder?: string;
}
/** The default value for a User Picker (multiple) custom field. */
export interface CustomFieldContextDefaultValueMultiUserPicker {
  /** The IDs of the default users. */
  accountIds: string[];
  /** The ID of the context. */
  contextId: string;
  type: string;
}
/** The default value for a project custom field. */
export interface CustomFieldContextDefaultValueProject {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the default project. */
  projectId: string;
  type: string;
}
/** The default text for a read only custom field. */
export interface CustomFieldContextDefaultValueReadOnly {
  /** The default text. The maximum length is 255 characters. */
  text?: string;
  type: string;
}
/** The default value for a group picker custom field. */
export interface CustomFieldContextDefaultValueSingleGroupPicker {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the the default group. */
  groupId: string;
  type: string;
}
/** The default value for a single select custom field. */
export interface CustomFieldContextDefaultValueSingleOption {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the default option. */
  optionId: string;
  type: string;
}
/** The default value for a version picker custom field. */
export interface CustomFieldContextDefaultValueSingleVersionPicker {
  type: string;
  /** The ID of the default version. */
  versionId: string;
  /**
   * The order the pickable versions are displayed in. If not provided, the
   * released-first order is used. Available version orders are `"releasedFirst"`
   * and `"unreleasedFirst"`.
   */
  versionOrder?: string;
}
/** The default text for a text area custom field. */
export interface CustomFieldContextDefaultValueTextArea {
  /** The default text. The maximum length is 32767 characters. */
  text?: string;
  type: string;
}
/** The default text for a text custom field. */
export interface CustomFieldContextDefaultValueTextField {
  /** The default text. The maximum length is 254 characters. */
  text?: string;
  type: string;
}
/** Default values to update. */
export interface CustomFieldContextDefaultValueUpdate {
  defaultValues?: CustomFieldContextDefaultValue[];
}
/** The default value for a URL custom field. */
export interface CustomFieldContextDefaultValueUrl {
  /** The ID of the context. */
  contextId: string;
  type: string;
  /** The default URL. */
  url: string;
}
/** Details of a context to project association. */
export interface CustomFieldContextProjectMapping {
  /** The ID of the context. */
  contextId: string;
  /** Whether context is global. */
  isGlobalContext?: boolean;
  /** The ID of the project. */
  projectId?: string;
}
/** Defaults for a User Picker (single) custom field. */
export interface CustomFieldContextSingleUserPickerDefaults {
  /** The ID of the default user. */
  accountId: string;
  /** The ID of the context. */
  contextId: string;
  type: string;
  /** Filter for a User Picker (single) custom field. */
  userFilter: UserFilter;
}
/** Details of a custom field context. */
export interface CustomFieldContextUpdateDetails {
  /**
   * The description of the custom field context. The maximum length is 255
   * characters.
   */
  description?: string;
  /**
   * The name of the custom field context. The name must be unique. The maximum
   * length is 255 characters.
   */
  name?: string;
}
/** Mapping of an issue type to a context. */
export interface IssueTypeToContextMapping {
  /** The ID of the context. */
  contextId: string;
  /** Whether the context is mapped to any issue type. */
  isAnyIssueType?: boolean;
  /** The ID of the issue type. */
  issueTypeId?: string;
}
/** A page of items. */
export interface PageBeanContextForProjectAndIssueType {
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
  values?: ContextForProjectAndIssueType[];
}
/** A page of items. */
export interface PageBeanCustomFieldContext {
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
  values?: CustomFieldContext[];
}
/** A page of items. */
export interface PageBeanCustomFieldContextDefaultValue {
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
  values?: CustomFieldContextDefaultValue[];
}
/** A page of items. */
export interface PageBeanCustomFieldContextProjectMapping {
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
  values?: CustomFieldContextProjectMapping[];
}
/** A page of items. */
export interface PageBeanIssueTypeToContextMapping {
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
  values?: IssueTypeToContextMapping[];
}
/** A list of project IDs. */
export interface ProjectIds {
  /** The IDs of projects. */
  projectIds: string[];
}
/** The project and issue type mapping. */
export interface ProjectIssueTypeMapping {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the project. */
  projectId: string;
}
/** The project and issue type mappings. */
export interface ProjectIssueTypeMappings {
  /** The project and issue type mappings. */
  mappings: ProjectIssueTypeMapping[];
}
/** Filter for a User Picker (single) custom field. */
export interface UserFilter extends Record<string, unknown> {
  /** Whether the filter is enabled. */
  enabled: boolean;
  /**
   * User groups autocomplete suggestion users must belong to. If not provided, the
   * default values are used. A maximum of 10 groups can be provided.
   */
  groups?: string[];
  /**
   * Roles that autocomplete suggestion users must belong to. If not provided, the
   * default values are used. A maximum of 10 roles can be provided.
   */
  roleIds?: number[];
}
