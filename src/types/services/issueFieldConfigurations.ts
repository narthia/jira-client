/** Details of a field configuration to issue type mappings. */
export interface AssociateFieldConfigurationsWithIssueTypesRequest {
  /** Field configuration to issue type mappings. */
  mappings: FieldConfigurationToIssueTypeMapping[];
}
/** Details of a field configuration. */
export interface FieldConfiguration {
  /** The description of the field configuration. */
  description: string;
  /** The ID of the field configuration. */
  id: number;
  /** Whether the field configuration is the default. */
  isDefault?: boolean;
  /** The name of the field configuration. */
  name: string;
}
/** Details of a field configuration. */
export interface FieldConfigurationDetails {
  /** The description of the field configuration. */
  description?: string;
  /** The name of the field configuration. Must be unique. */
  name: string;
}
/** The field configuration for an issue type. */
export interface FieldConfigurationIssueTypeItem {
  /** The ID of the field configuration. */
  fieldConfigurationId: string;
  /** The ID of the field configuration scheme. */
  fieldConfigurationSchemeId: string;
  /**
   * The ID of the issue type or *default*. When set to *default* this field
   * configuration issue type item applies to all issue types without a field
   * configuration.
   */
  issueTypeId: string;
}
/** A field within a field configuration. */
export interface FieldConfigurationItem {
  /** The description of the field within the field configuration. */
  description?: string;
  /** The ID of the field within the field configuration. */
  id: string;
  /** Whether the field is hidden in the field configuration. */
  isHidden?: boolean;
  /** Whether the field is required in the field configuration. */
  isRequired?: boolean;
  /** The renderer type for the field within the field configuration. */
  renderer?: string;
}
/** Details of field configuration items. */
export interface FieldConfigurationItemsDetails {
  /** Details of fields in a field configuration. */
  fieldConfigurationItems: FieldConfigurationItem[];
}
/** Details of a field configuration scheme. */
export interface FieldConfigurationScheme {
  /** The description of the field configuration scheme. */
  description?: string;
  /** The ID of the field configuration scheme. */
  id: string;
  /** The name of the field configuration scheme. */
  name: string;
}
/** Associated field configuration scheme and project. */
export interface FieldConfigurationSchemeProjectAssociation {
  /**
   * The ID of the field configuration scheme. If the field configuration scheme ID
   * is `null`, the operation assigns the default field configuration scheme.
   */
  fieldConfigurationSchemeId?: string;
  /** The ID of the project. */
  projectId: string;
}
/** Project list with assigned field configuration schema. */
export interface FieldConfigurationSchemeProjects {
  /** Details of a field configuration scheme. */
  fieldConfigurationScheme?: FieldConfigurationScheme;
  /** The IDs of projects using the field configuration scheme. */
  projectIds: string[];
}
/** The field configuration to issue type mapping. */
export interface FieldConfigurationToIssueTypeMapping {
  /** The ID of the field configuration. */
  fieldConfigurationId: string;
  /**
   * The ID of the issue type or *default*. When set to *default* this field
   * configuration issue type item applies to all issue types without a field
   * configuration. An issue type can be included only once in a request.
   */
  issueTypeId: string;
}
/** The list of issue type IDs to be removed from the field configuration scheme. */
export interface IssueTypeIdsToRemove {
  /**
   * The list of issue type IDs. Must contain unique values not longer than 255
   * characters and not be empty. Maximum of 100 IDs.
   */
  issueTypeIds: string[];
}
/** A page of items. */
export interface PageBeanFieldConfigurationDetails {
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
  values?: FieldConfigurationDetails[];
}
/** A page of items. */
export interface PageBeanFieldConfigurationIssueTypeItem {
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
  values?: FieldConfigurationIssueTypeItem[];
}
/** A page of items. */
export interface PageBeanFieldConfigurationItem {
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
  values?: FieldConfigurationItem[];
}
/** A page of items. */
export interface PageBeanFieldConfigurationScheme {
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
  values?: FieldConfigurationScheme[];
}
/** A page of items. */
export interface PageBeanFieldConfigurationSchemeProjects {
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
  values?: FieldConfigurationSchemeProjects[];
}
/** The details of the field configuration scheme. */
export interface UpdateFieldConfigurationSchemeDetails {
  /** The description of the field configuration scheme. */
  description?: string;
  /** The name of the field configuration scheme. The name must be unique. */
  name: string;
}
