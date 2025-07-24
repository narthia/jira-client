/** Details of the contextual configuration for a custom field. */
export interface BulkContextualConfiguration {
  /** The field configuration. */
  configuration?: unknown;
  /** The ID of the custom field. */
  customFieldId: string;
  /** The ID of the field context the configuration is associated with. */
  fieldContextId: string;
  /** The ID of the configuration. */
  id: string;
  /** The field value schema. */
  schema?: unknown;
}
/** List of custom fields identifiers which will be used to filter configurations */
export interface ConfigurationsListParameters {
  /**
   * List of IDs or keys of the custom fields. It can be a mix of IDs and keys in
   * the same query.
   */
  fieldIdsOrKeys: string[];
}
/** Details of the contextual configuration for a custom field. */
export interface ContextualConfiguration {
  /** The field configuration. */
  configuration?: unknown;
  /** The ID of the field context the configuration is associated with. */
  fieldContextId: string;
  /** The ID of the configuration. */
  id: string;
  /** The field value schema. */
  schema?: unknown;
}
/** Details of configurations for a custom field. */
export interface CustomFieldConfigurations {
  /** The list of custom field configuration details. */
  configurations: ContextualConfiguration[];
}
/** A page of items. */
export interface PageBeanBulkContextualConfiguration {
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
  values?: BulkContextualConfiguration[];
}
/** A page of items. */
export interface PageBeanContextualConfiguration {
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
  values?: ContextualConfiguration[];
}
