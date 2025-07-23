/** Details of an issue type scheme. */
export interface IssueTypeScheme {
  /** The ID of the default issue type of the issue type scheme. */
  defaultIssueTypeId?: string;
  /** The description of the issue type scheme. */
  description?: string;
  /** The ID of the issue type scheme. */
  id: string;
  /** Whether the issue type scheme is the default. */
  isDefault?: boolean;
  /** The name of the issue type scheme. */
  name: string;
}
/** Details of an issue type scheme and its associated issue types. */
export interface IssueTypeSchemeDetails {
  /**
   * The ID of the default issue type of the issue type scheme. This ID must be
   * included in `issueTypeIds`.
   */
  defaultIssueTypeId?: string;
  /** The description of the issue type scheme. The maximum length is 4000 characters. */
  description?: string;
  /**
   * The list of issue types IDs of the issue type scheme. At least one standard
   * issue type ID is required.
   */
  issueTypeIds: string[];
  /**
   * The name of the issue type scheme. The name must be unique. The maximum length
   * is 255 characters.
   */
  name: string;
}
/** The ID of an issue type scheme. */
export interface IssueTypeSchemeId {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: string;
}
/** Issue type scheme item. */
export interface IssueTypeSchemeMapping {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: string;
}
/** Details of the association between an issue type scheme and project. */
export interface IssueTypeSchemeProjectAssociation {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: string;
  /** The ID of the project. */
  projectId: string;
}
/** Issue type scheme with a list of the projects that use it. */
export interface IssueTypeSchemeProjects {
  /** Details of an issue type scheme. */
  issueTypeScheme: IssueTypeScheme;
  /** The IDs of the projects using the issue type scheme. */
  projectIds: string[];
}
/**
 * Details of the name, description, and default issue type for an issue type
 * scheme.
 */
export interface IssueTypeSchemeUpdateDetails {
  /** The ID of the default issue type of the issue type scheme. */
  defaultIssueTypeId?: string;
  /** The description of the issue type scheme. The maximum length is 4000 characters. */
  description?: string;
  /**
   * The name of the issue type scheme. The name must be unique. The maximum length
   * is 255 characters.
   */
  name?: string;
}
/** An ordered list of issue type IDs and information about where to move them. */
export interface OrderOfIssueTypes {
  /**
   * The ID of the issue type to place the moved issue types after. Required if
   * `position` isn't provided.
   */
  after?: string;
  /**
   * A list of the issue type IDs to move. The order of the issue type IDs in the
   * list is the order they are given after the move.
   */
  issueTypeIds: string[];
  /**
   * The position the issue types should be moved to. Required if `after` isn't
   * provided.
   */
  position?: "First" | "Last";
}
/** A page of items. */
export interface PageBeanIssueTypeScheme {
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
  values?: IssueTypeScheme[];
}
/** A page of items. */
export interface PageBeanIssueTypeSchemeMapping {
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
  values?: IssueTypeSchemeMapping[];
}
/** A page of items. */
export interface PageBeanIssueTypeSchemeProjects {
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
  values?: IssueTypeSchemeProjects[];
}
