import type { Scope } from "./common";
export interface CreateUpdateRoleRequestBean {
  /**
   * A description of the project role. Required when fully updating a project role.
   * Optional when creating or partially updating a project role.
   */
  description?: string;
  /**
   * The name of the project role. Must be unique. Cannot begin or end with
   * whitespace. The maximum length is 255 characters. Required when creating a
   * project role. Optional when partially updating a project role.
   */
  name?: string;
}
/** Details about a project role. */
export interface ProjectRoleDetails {
  /** Whether this role is the admin role for the project. */
  admin?: boolean;
  /** Whether this role is the default role for the project. */
  default?: boolean;
  /** The description of the project role. */
  description?: string;
  /** The ID of the project role. */
  id?: number;
  /** The name of the project role. */
  name?: string;
  /** Whether the roles are configurable for this project. */
  roleConfigurable?: boolean;
  /**
   * The scope of the role. Indicated for roles associated with [next-gen
   * projects](https://confluence.atlassian.com/x/loMyO).
   */
  scope?: Scope;
  /** The URL the project role details. */
  self?: string;
  /** The translated name of the project role. */
  translatedName?: string;
}
