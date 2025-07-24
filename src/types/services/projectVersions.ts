import type { Version } from "./common";
/** Details about the replacement for a deleted version. */
export interface CustomFieldReplacement {
  /** The ID of the custom field in which to replace the version number. */
  customFieldId?: number;
  /** The version number to use as a replacement for the deleted version. */
  moveTo?: number;
}
export interface DeleteAndReplaceVersionBean {
  /**
   * An array of custom field IDs (`customFieldId`) and version IDs (`moveTo`) to
   * update when the fields contain the deleted version.
   */
  customFieldReplacementList?: CustomFieldReplacement[];
  /**
   * The ID of the version to update `affectedVersion` to when the field contains
   * the deleted version.
   */
  moveAffectedIssuesTo?: number;
  /**
   * The ID of the version to update `fixVersion` to when the field contains the
   * deleted version.
   */
  moveFixIssuesTo?: number;
}
/** A page of items. */
export interface PageBeanVersion {
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
  values?: Version[];
}
/** Various counts of issues within a version. */
export interface VersionIssueCounts {
  /** List of custom fields using the version. */
  customFieldUsage?: VersionUsageInCustomField[];
  /** Count of issues where a version custom field is set to the version. */
  issueCountWithCustomFieldsShowingVersion?: number;
  /** Count of issues where the `affectedVersion` is set to the version. */
  issuesAffectedCount?: number;
  /** Count of issues where the `fixVersion` is set to the version. */
  issuesFixedCount?: number;
  /** The URL of these count details. */
  self?: string;
}
export interface VersionMoveBean {
  /**
   * The URL (self link) of the version after which to place the moved version.
   * Cannot be used with `position`.
   */
  after?: string;
  /**
   * An absolute position in which to place the moved version. Cannot be used with
   * `after`.
   */
  position?: "Earlier" | "Later" | "First" | "Last";
}
/** Associated related work to a version */
export interface VersionRelatedWork {
  /** The category of the related work */
  category: string;
  /**
   * The ID of the issue associated with the related work (if there is one). Cannot
   * be updated via the Rest API.
   */
  issueId?: number;
  /**
   * The id of the related work. For the native release note related work item, this
   * will be null, and Rest API does not support updating it.
   */
  relatedWorkId?: string;
  /** The title of the related work */
  title?: string;
  /**
   * The URL of the related work. Will be null for the native release note related
   * work item, but is otherwise required.
   */
  url?: string;
}
/** Count of a version's unresolved issues. */
export interface VersionUnresolvedIssuesCount {
  /** Count of issues. */
  issuesCount?: number;
  /** Count of unresolved issues. */
  issuesUnresolvedCount?: number;
  /** The URL of these count details. */
  self?: string;
}
/** List of custom fields using the version. */
export interface VersionUsageInCustomField {
  /** The ID of the custom field. */
  customFieldId?: number;
  /** The name of the custom field. */
  fieldName?: string;
  /** Count of the issues where the custom field contains the version. */
  issueCountWithVersionInCustomField?: number;
}
