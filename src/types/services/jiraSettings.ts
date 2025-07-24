import type { TimeTrackingConfiguration } from "./common";
/** Details of an application property. */
export interface ApplicationProperty {
  /** The allowed values, if applicable. */
  allowedValues?: string[];
  /** The default value of the application property. */
  defaultValue?: string;
  /** The description of the application property. */
  desc?: string;
  example?: string;
  /** The ID of the application property. The ID and key are the same. */
  id?: string;
  /** The key of the application property. The ID and key are the same. */
  key?: string;
  /** The name of the application property. */
  name?: string;
  /** The data type of the application property. */
  type?: string;
  /** The new value. */
  value?: string;
}
/** Details about the configuration of Jira. */
export interface Configuration {
  /** Whether the ability to add attachments to issues is enabled. */
  attachmentsEnabled?: boolean;
  /** Whether the ability to link issues is enabled. */
  issueLinkingEnabled?: boolean;
  /** Whether the ability to create subtasks for issues is enabled. */
  subTasksEnabled?: boolean;
  /** The configuration of time tracking. */
  timeTrackingConfiguration?: TimeTrackingConfiguration;
  /** Whether the ability to track time is enabled. This property is deprecated. */
  timeTrackingEnabled?: boolean;
  /**
   * Whether the ability to create unassigned issues is enabled. See [Configuring
   * Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
   */
  unassignedIssuesAllowed?: boolean;
  /**
   * Whether the ability for users to vote on issues is enabled. See [Configuring
   * Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
   */
  votingEnabled?: boolean;
  /**
   * Whether the ability for users to watch issues is enabled. See [Configuring Jira
   * application options](https://confluence.atlassian.com/x/uYXKM) for details.
   */
  watchingEnabled?: boolean;
}
export interface SimpleApplicationPropertyBean {
  /** The ID of the application property. */
  id?: string;
  /** The new value. */
  value?: string;
}
