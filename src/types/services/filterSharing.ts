/** Details of the scope of the default sharing for new filters and dashboards. */
export interface DefaultShareScope {
  /**
   * The scope of the default sharing for new filters and dashboards:
   *
   *  *  `AUTHENTICATED` Shared with all logged-in users.
   *  *  `GLOBAL` Shared with all logged-in users. This shows as `AUTHENTICATED` in
   * the response.
   *  *  `PRIVATE` Not shared with any users.
   */
  scope: "GLOBAL" | "AUTHENTICATED" | "PRIVATE";
}
export interface SharePermissionInputBean {
  /**
   * The user account ID that the filter is shared with. For a request, specify the
   * `accountId` property for the user.
   */
  accountId?: string;
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian
   * products.For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. Cannot be
   * provided with `groupname`.
   */
  groupId?: string;
  /**
   * The name of the group to share the filter with. Set `type` to `group`. Please
   * note that the name of a group is mutable, to reliably identify a group use
   * `groupId`.
   */
  groupname?: string;
  /** The ID of the project to share the filter with. Set `type` to `project`. */
  projectId?: string;
  /**
   * The ID of the project role to share the filter with. Set `type` to
   * `projectRole` and the `projectId` for the project that the role is in.
   */
  projectRoleId?: string;
  /** The rights for the share permission. */
  rights?: number;
  /**
   * The type of the share permission.Specify the type as follows:
   *
   *  *  `user` Share with a user.
   *  *  `group` Share with a group. Specify `groupname` as well.
   *  *  `project` Share with a project. Specify `projectId` as well.
   *  *  `projectRole` Share with a project role in a project. Specify `projectId`
   * and `projectRoleId` as well.
   *  *  `global` Share globally, including anonymous users. If set, this type
   * overrides all existing share permissions and must be deleted before any
   * non-global share permissions is set.
   *  *  `authenticated` Share with all logged-in users. This shows as `loggedin` in
   * the response. If set, this type overrides all existing share permissions and
   * must be deleted before any non-global share permissions is set.
   */
  type: "user" | "project" | "group" | "projectRole" | "global" | "authenticated";
}
