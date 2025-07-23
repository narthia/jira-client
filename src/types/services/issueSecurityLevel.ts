import type { PermissionHolder } from "./common";
/** Issue security level member. */
export interface IssueSecurityLevelMember {
  /**
   * The user or group being granted the permission. It consists of a `type` and a
   * type-dependent `parameter`. See [Holder
   * object](../api-group-permission-schemes/#holder-object) in *Get all permission
   * schemes* for more information.
   */
  holder: PermissionHolder;
  /** The ID of the issue security level member. */
  id: number;
  /** The ID of the issue security level. */
  issueSecurityLevelId: number;
}
/** A page of items. */
export interface PageBeanIssueSecurityLevelMember {
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
  values?: IssueSecurityLevelMember[];
}
