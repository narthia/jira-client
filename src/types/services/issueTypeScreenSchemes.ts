/** Details of an issue type screen scheme. */
export interface IssueTypeScreenScheme {
  /** The description of the issue type screen scheme. */
  description?: string;
  /** The ID of the issue type screen scheme. */
  id: string;
  /** The name of the issue type screen scheme. */
  name: string;
}
/** The details of an issue type screen scheme. */
export interface IssueTypeScreenSchemeDetails {
  /**
   * The description of the issue type screen scheme. The maximum length is 255
   * characters.
   */
  description?: string;
  /**
   * The IDs of the screen schemes for the issue type IDs and *default*. A *default*
   * entry is required to create an issue type screen scheme, it defines the mapping
   * for all issue types without a screen scheme.
   */
  issueTypeMappings: IssueTypeScreenSchemeMapping[];
  /**
   * The name of the issue type screen scheme. The name must be unique. The maximum
   * length is 255 characters.
   */
  name: string;
}
/** The ID of an issue type screen scheme. */
export interface IssueTypeScreenSchemeId {
  /** The ID of the issue type screen scheme. */
  id: string;
}
/** The screen scheme for an issue type. */
export interface IssueTypeScreenSchemeItem {
  /**
   * The ID of the issue type or *default*. Only issue types used in classic
   * projects are accepted. When creating an issue screen scheme, an entry for
   * *default* must be provided and defines the mapping for all issue types without
   * a screen scheme. Otherwise, a *default* entry can't be provided.
   */
  issueTypeId: string;
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
  /** The ID of the screen scheme. */
  screenSchemeId: string;
}
/** The IDs of the screen schemes for the issue type IDs. */
export interface IssueTypeScreenSchemeMapping {
  /**
   * The ID of the issue type or *default*. Only issue types used in classic
   * projects are accepted. An entry for *default* must be provided and defines the
   * mapping for all issue types without a screen scheme.
   */
  issueTypeId: string;
  /**
   * The ID of the screen scheme. Only screen schemes used in classic projects are
   * accepted.
   */
  screenSchemeId: string;
}
/** A list of issue type screen scheme mappings. */
export interface IssueTypeScreenSchemeMappingDetails {
  /**
   * The list of issue type to screen scheme mappings. A *default* entry cannot be
   * specified because a default entry is added when an issue type screen scheme is
   * created.
   */
  issueTypeMappings: IssueTypeScreenSchemeMapping[];
}
/** Associated issue type screen scheme and project. */
export interface IssueTypeScreenSchemeProjectAssociation {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId?: string;
  /** The ID of the project. */
  projectId?: string;
}
/** Issue type screen scheme with a list of the projects that use it. */
export interface IssueTypeScreenSchemesProjects {
  /** Details of an issue type screen scheme. */
  issueTypeScreenScheme: IssueTypeScreenScheme;
  /** The IDs of the projects using the issue type screen scheme. */
  projectIds: string[];
}
/** Details of an issue type screen scheme. */
export interface IssueTypeScreenSchemeUpdateDetails {
  /**
   * The description of the issue type screen scheme. The maximum length is 255
   * characters.
   */
  description?: string;
  /**
   * The name of the issue type screen scheme. The name must be unique. The maximum
   * length is 255 characters.
   */
  name?: string;
}
/** A page of items. */
export interface PageBeanIssueTypeScreenSchemeItem {
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
  values?: IssueTypeScreenSchemeItem[];
}
/** A page of items. */
export interface PageBeanIssueTypeScreenSchemesProjects {
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
  values?: IssueTypeScreenSchemesProjects[];
}
/** The ID of a screen scheme. */
export interface UpdateDefaultScreenScheme {
  /** The ID of the screen scheme. */
  screenSchemeId: string;
}
