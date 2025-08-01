import type { PermissionHolder, PermissionScheme } from "./common";
/** Details about a permission granted to a user or group. */
export interface PermissionGrant extends Record<string, unknown> {
  /**
   * The user or group being granted the permission. It consists of a `type`, a
   * type-dependent `parameter` and a type-dependent `value`. See [Holder
   * object](../api-group-permission-schemes/#holder-object) in *Get all permission
   * schemes* for more information.
   */
  holder?: PermissionHolder;
  /** The ID of the permission granted details. */
  id?: number;
  /**
   * The permission to grant. This permission can be one of the built-in permissions
   * or a custom permission added by an app. See [Built-in
   * permissions](../api-group-permission-schemes/#built-in-permissions) in *Get all
   * permission schemes* for more information about the built-in permissions. See
   * the [project
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/)
   * and [global
   * permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/)
   * module documentation for more information about custom permissions.
   */
  permission?: string;
  /** The URL of the permission granted details. */
  self?: string;
}
/** List of permission grants. */
export interface PermissionGrants {
  /** Expand options that include additional permission grant details in the response. */
  expand?: string;
  /** Permission grants list. */
  permissions?: PermissionGrant[];
}
/** List of all permission schemes. */
export interface PermissionSchemes {
  /** Permission schemes list. */
  permissionSchemes?: PermissionScheme[];
}
