/** Details of an issue resolution. */
export interface CreateResolutionDetails extends Record<string, unknown> {
  /** The description of the resolution. */
  description?: string;
  /** The name of the resolution. Must be unique (case-insensitive). */
  name: string;
}
/** A page of items. */
export interface PageBeanResolutionJsonBean {
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
  values?: ResolutionJsonBean[];
}
/** Change the order of issue resolutions. */
export interface ReorderIssueResolutionsRequest {
  /** The ID of the resolution. Required if `position` isn't provided. */
  after?: string;
  /**
   * The list of resolution IDs to be reordered. Cannot contain duplicates nor after
   * ID.
   */
  ids: string[];
  /**
   * The position for issue resolutions to be moved to. Required if `after` isn't
   * provided.
   */
  position?: string;
}
/** Details of an issue resolution. */
export interface Resolution {
  /** The description of the issue resolution. */
  description?: string;
  /** The ID of the issue resolution. */
  id?: string;
  /** The name of the issue resolution. */
  name?: string;
  /** The URL of the issue resolution. */
  self?: string;
}
/** The ID of an issue resolution. */
export interface ResolutionId extends Record<string, unknown> {
  /** The ID of the issue resolution. */
  id: string;
}
export interface ResolutionJsonBean {
  default?: boolean;
  description?: string;
  iconUrl?: string;
  id?: string;
  name?: string;
  self?: string;
}
/** The new default issue resolution. */
export interface SetDefaultResolutionRequest {
  /**
   * The ID of the new default issue resolution. Must be an existing ID or null.
   * Setting this to null erases the default resolution setting.
   */
  id: string;
}
/** Details of an issue resolution. */
export interface UpdateResolutionDetails extends Record<string, unknown> {
  /** The description of the resolution. */
  description?: string;
  /** The name of the resolution. Must be unique. */
  name: string;
}
