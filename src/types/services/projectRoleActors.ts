export interface ActorInputBean {
  /**
   * The name of the group to add as a default actor. This parameter cannot be used
   * with the `groupId` parameter. As a group's name can change,use of `groupId` is
   * recommended. This parameter accepts a comma-separated list. For example,
   * `"group":["project-admin", "jira-developers"]`.
   */
  group?: string[];
  /**
   * The ID of the group to add as a default actor. This parameter cannot be used
   * with the `group` parameter This parameter accepts a comma-separated list. For
   * example, `"groupId":["77f6ab39-e755-4570-a6ae-2d7a8df0bcb8",
   * "0c011f85-69ed-49c4-a801-3b18d0f771bc"]`.
   */
  groupId?: string[];
  /**
   * The account IDs of the users to add as default actors. This parameter accepts a
   * comma-separated list. For example, `"user":["5b10a2844c20165700ede21g",
   * "5b109f2e9729b51b54dc274d"]`.
   */
  user?: string[];
}
export interface ActorsMap {
  /**
   * The name of the group to add. This parameter cannot be used with the `groupId`
   * parameter. As a group's name can change, use of `groupId` is recommended.
   */
  group?: string[];
  /**
   * The ID of the group to add. This parameter cannot be used with the `group`
   * parameter.
   */
  groupId?: string[];
  /** The user account ID of the user to add. */
  user?: string[];
}
export interface ProjectRoleActorsUpdateBean {
  /**
   * The actors to add to the project role.
   *
   * Add groups using:
   *
   *  *  `atlassian-group-role-actor` and a list of group names.
   *  *  `atlassian-group-role-actor-id` and a list of group IDs.
   *
   * As a group's name can change, use of `atlassian-group-role-actor-id` is
   * recommended. For example,
   * `"atlassian-group-role-actor-id":["eef79f81-0b89-4fca-a736-4be531a10869","77f6ab39-e755-4570-a6ae-2d7a8df0bcb8"]`.
   *
   * Add users using `atlassian-user-role-actor` and a list of account IDs. For
   * example, `"atlassian-user-role-actor":["12345678-9abc-def1-2345-6789abcdef12",
   * "abcdef12-3456-789a-bcde-f123456789ab"]`.
   */
  categorisedActors?: {
    [key: string]: string[];
  };
  /**
   * The ID of the project role. Use [Get all project
   * roles](#api-rest-api-3-role-get) to get a list of project role IDs.
   */
  id?: number;
}
