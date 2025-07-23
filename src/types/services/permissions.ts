/** Details of global and project permissions granted to the user. */
export interface BulkPermissionGrants {
  /** List of permissions granted to the user. */
  globalPermissions: string[];
  /**
   * List of project permissions and the projects and issues those permissions
   * provide access to.
   */
  projectPermissions: BulkProjectPermissionGrants[];
}
/**
 * Details of global permissions to look up and project permissions with
 * associated projects and issues to look up.
 */
export interface BulkPermissionsRequestBean {
  /** The account ID of a user. */
  accountId?: string;
  /** Global permissions to look up. */
  globalPermissions?: string[];
  /** Project permissions with associated projects and issues to look up. */
  projectPermissions?: BulkProjectPermissions[];
}
/**
 * List of project permissions and the projects and issues those permissions grant
 * access to.
 */
export interface BulkProjectPermissionGrants {
  /** IDs of the issues the user has the permission for. */
  issues: number[];
  /** A project permission, */
  permission: string;
  /** IDs of the projects the user has the permission for. */
  projects: number[];
}
/** Details of project permissions and associated issues and projects to look up. */
export interface BulkProjectPermissions {
  /** List of issue IDs. */
  issues?: number[];
  /** List of project permissions. */
  permissions: string[];
  /** List of project IDs. */
  projects?: number[];
}
/** Details about permissions. */
export interface Permissions {
  /** List of permissions. */
  permissions?: {
    /** Details of a permission and its availability to a user. */ [key: string]: UserPermission;
  };
}
export interface PermissionsKeysBean {
  /** A list of permission keys. */
  permissions: string[];
}
/** A list of projects in which a user is granted permissions. */
export interface PermittedProjects {
  /** A list of projects. */
  projects?: ProjectIdentifierBean[];
}
/** The identifiers for a project. */
export interface ProjectIdentifierBean {
  /** The ID of the project. */
  id?: number;
  /** The key of the project. */
  key?: string;
}
/** Details of a permission and its availability to a user. */
export interface UserPermission extends Record<string, unknown> {
  /**
   * Indicate whether the permission key is deprecated. Note that deprecated keys
   * cannot be used in the `permissions parameter of Get my permissions. Deprecated
   * keys are not returned by Get all permissions.`
   */
  deprecatedKey?: boolean;
  /** The description of the permission. */
  description?: string;
  /** Whether the permission is available to the user in the queried context. */
  havePermission?: boolean;
  /**
   * The ID of the permission. Either `id` or `key` must be specified. Use [Get all
   * permissions](#api-rest-api-3-permissions-get) to get the list of permissions.
   */
  id?: string;
  /**
   * The key of the permission. Either `id` or `key` must be specified. Use [Get all
   * permissions](#api-rest-api-3-permissions-get) to get the list of permissions.
   */
  key?: string;
  /** The name of the permission. */
  name?: string;
  /** The type of the permission. */
  type?: "GLOBAL" | "PROJECT";
}
