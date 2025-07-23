import type { SecurityLevel } from "./common";
export interface IdBean {
  /**
   * The ID of the permission scheme to associate with the project. Use the [Get all
   * permission schemes](#api-rest-api-3-permissionscheme-get) resource to get a
   * list of permission scheme IDs.
   */
  id: number;
}
/** List of issue level security items in a project. */
export interface ProjectIssueSecurityLevels {
  /** Issue level security items list. */
  levels: SecurityLevel[];
}
