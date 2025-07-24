export interface IssueTypeCreateBean {
  /** The description of the issue type. */
  description?: string;
  /**
   * The hierarchy level of the issue type. Use:
   *
   *  *  `-1` for Subtask.
   *  *  `0` for Base.
   *
   * Defaults to `0`.
   */
  hierarchyLevel?: number;
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name: string;
  /**
   * Deprecated. Use `hierarchyLevel` instead. See the [deprecation
   * notice](https://community.developer.atlassian.com/t/deprecation-of-the-epic-link-parent-link-and-other-related-fields-in-rest-apis-and-webhooks/54048)
   * for details.
   *
   * Whether the issue type is `subtype` or `standard`. Defaults to `standard`.
   */
  type?: "subtask" | "standard";
}
export interface IssueTypeUpdateBean {
  /**
   * The ID of an issue type avatar. This can be obtained be obtained from the
   * following endpoints:
   *
   *  *  [System issue type avatar IDs
   * only](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-rest-api-3-avatar-type-system-get)
   *  *  [System and custom issue type avatar
   * IDs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-rest-api-3-universal-avatar-type-type-owner-entityid-get)
   */
  avatarId?: number;
  /** The description of the issue type. */
  description?: string;
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name?: string;
}
