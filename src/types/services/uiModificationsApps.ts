/** The details of a UI modification. */
export interface CreateUiModificationDetails {
  /** List of contexts of the UI modification. The maximum number of contexts is 1000. */
  contexts?: UiModificationContextDetails[];
  /**
   * The data of the UI modification. The maximum size of the data is 50000
   * characters.
   */
  data?: string;
  /** The description of the UI modification. The maximum length is 255 characters. */
  description?: string;
  /** The name of the UI modification. The maximum length is 255 characters. */
  name: string;
}
export interface DetailedErrorCollection {
  /** Map of objects representing additional details for an error */
  details?: {
    [key: string]: unknown;
  };
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
}
/** A page of items. */
export interface PageBeanUiModificationDetails {
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
  values?: UiModificationDetails[];
}
/**
 * The details of a UI modification's context, which define where to activate the
 * UI modification.
 */
export interface UiModificationContextDetails {
  /** The ID of the UI modification context. */
  id?: string;
  /**
   * Whether a context is available. For example, when a project is deleted the
   * context becomes unavailable.
   */
  isAvailable?: boolean;
  /**
   * The issue type ID of the context. Null is treated as a wildcard, meaning the UI
   * modification will be applied to all issue types. Each UI modification context
   * can have a maximum of one wildcard.
   */
  issueTypeId?: string;
  /**
   * The project ID of the context. Null is treated as a wildcard, meaning the UI
   * modification will be applied to all projects. Each UI modification context can
   * have a maximum of one wildcard.
   */
  projectId?: string;
  /**
   * The view type of the context. Only `GIC`(Global Issue Create), `IssueView` and
   * `IssueTransition` are supported. Null is treated as a wildcard, meaning the UI
   * modification will be applied to all view types. Each UI modification context
   * can have a maximum of one wildcard.
   */
  viewType?: "GIC" | "IssueView" | "IssueTransition";
}
/** The details of a UI modification. */
export interface UiModificationDetails {
  /** List of contexts of the UI modification. The maximum number of contexts is 1000. */
  contexts?: UiModificationContextDetails[];
  /**
   * The data of the UI modification. The maximum size of the data is 50000
   * characters.
   */
  data?: string;
  /** The description of the UI modification. The maximum length is 255 characters. */
  description?: string;
  /** The ID of the UI modification. */
  id: string;
  /** The name of the UI modification. The maximum length is 255 characters. */
  name: string;
  /** The URL of the UI modification. */
  self: string;
}
/** Identifiers for a UI modification. */
export interface UiModificationIdentifiers {
  /** The ID of the UI modification. */
  id: string;
  /** The URL of the UI modification. */
  self: string;
}
/** The details of a UI modification. */
export interface UpdateUiModificationDetails {
  /**
   * List of contexts of the UI modification. The maximum number of contexts is
   * 1000. If provided, replaces all existing contexts.
   */
  contexts?: UiModificationContextDetails[];
  /**
   * The data of the UI modification. The maximum size of the data is 50000
   * characters.
   */
  data?: string;
  /** The description of the UI modification. The maximum length is 255 characters. */
  description?: string;
  /** The name of the UI modification. The maximum length is 255 characters. */
  name?: string;
}
