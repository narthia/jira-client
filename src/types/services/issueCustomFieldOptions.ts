/** Details of the options to create for a custom field. */
export interface BulkCustomFieldOptionCreateRequest {
  /** Details of options to create. */
  options?: CustomFieldOptionCreate[];
}
/** Details of the options to update for a custom field. */
export interface BulkCustomFieldOptionUpdateRequest {
  /** Details of the options to update. */
  options?: CustomFieldOptionUpdate[];
}
/** Details of the custom field options for a context. */
export interface CustomFieldContextOption {
  /** Whether the option is disabled. */
  disabled: boolean;
  /** The ID of the custom field option. */
  id: string;
  /**
   * For cascading options, the ID of the custom field option containing the
   * cascading option.
   */
  optionId?: string;
  /** The value of the custom field option. */
  value: string;
}
/** A list of custom field options for a context. */
export interface CustomFieldCreatedContextOptionsList {
  /** The created custom field options. */
  options?: CustomFieldContextOption[];
}
/** Details of a custom option for a field. */
export interface CustomFieldOption {
  /** The URL of these custom field option details. */
  self?: string;
  /** The value of the custom field option. */
  value?: string;
}
/** Details of a custom field option to create. */
export interface CustomFieldOptionCreate {
  /** Whether the option is disabled. */
  disabled?: boolean;
  /** For cascading options, the ID of a parent option. */
  optionId?: string;
  /** The value of the custom field option. */
  value: string;
}
/** Details of a custom field option for a context. */
export interface CustomFieldOptionUpdate {
  /** Whether the option is disabled. */
  disabled?: boolean;
  /** The ID of the custom field option. */
  id: string;
  /** The value of the custom field option. */
  value?: string;
}
/** A list of custom field options for a context. */
export interface CustomFieldUpdatedContextOptionsList {
  /** The updated custom field options. */
  options?: CustomFieldOptionUpdate[];
}
/**
 * An ordered list of custom field option IDs and information on where to move
 * them.
 */
export interface OrderOfCustomFieldOptions {
  /**
   * The ID of the custom field option or cascading option to place the moved
   * options after. Required if `position` isn't provided.
   */
  after?: string;
  /**
   * A list of IDs of custom field options to move. The order of the custom field
   * option IDs in the list is the order they are given after the move. The list
   * must contain custom field options or cascading options, but not both.
   */
  customFieldOptionIds: string[];
  /**
   * The position the custom field options should be moved to. Required if `after`
   * isn't provided.
   */
  position?: "First" | "Last";
}
/** A page of items. */
export interface PageBeanCustomFieldContextOption {
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
  values?: CustomFieldContextOption[];
}
/** The result of the task execution. */
export interface RemoveOptionFromIssuesResult {
  /**
   * A collection of errors related to unchanged issues. The collection size is
   * limited, which means not all errors may be returned.
   */
  errors?: SimpleErrorCollection;
  /** The IDs of the modified issues. */
  modifiedIssues?: number[];
  /** The IDs of the unchanged issues, those issues where errors prevent modification. */
  unmodifiedIssues?: number[];
}
/**
 * A collection of errors related to unchanged issues. The collection size is
 * limited, which means not all errors may be returned.
 */
export interface SimpleErrorCollection {
  /**
   * The list of error messages produced by this operation. For example, "input
   * parameter 'key' must be provided"
   */
  errorMessages?: string[];
  /**
   * The list of errors by parameter returned by the operation. For
   * example,"projectKey": "Project keys must start with an uppercase letter,
   * followed by one or more uppercase alphanumeric characters."
   */
  errors?: {
    [key: string]: string;
  };
  httpStatusCode?: number;
}
