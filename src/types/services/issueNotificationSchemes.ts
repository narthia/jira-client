import type {
  FieldDetails,
  GroupName,
  ProjectRole,
  UserDetails,
  NotificationScheme
} from "./common";
/** Details of notifications which should be added to the notification scheme. */
export interface AddNotificationsDetails extends Record<string, unknown> {
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents: NotificationSchemeEventDetails[];
}
/** Details of an notification scheme. */
export interface CreateNotificationSchemeDetails extends Record<string, unknown> {
  /** The description of the notification scheme. */
  description?: string;
  /** The name of the notification scheme. Must be unique (case-insensitive). */
  name: string;
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents?: NotificationSchemeEventDetails[];
}
/** Details about a notification associated with an event. */
export interface EventNotification {
  /** The email address. */
  emailAddress?: string;
  /**
   * Expand options that include additional event notification details in the
   * response.
   */
  expand?: string;
  /** The custom user or group field. */
  field?: FieldDetails;
  /** The specified group. */
  group?: GroupName;
  /** The ID of the notification. */
  id?: number;
  /** Identifies the recipients of the notification. */
  notificationType?:
    | "CurrentAssignee"
    | "Reporter"
    | "CurrentUser"
    | "ProjectLead"
    | "ComponentLead"
    | "User"
    | "Group"
    | "ProjectRole"
    | "EmailAddress"
    | "AllWatchers"
    | "UserCustomField"
    | "GroupCustomField";
  /**
   * As a group's name can change, use of `recipient` is recommended. The identifier
   * associated with the `notificationType` value that defines the receiver of the
   * notification, where the receiver isn't implied by `notificationType` value. So,
   * when `notificationType` is:
   *
   *  *  `User` The `parameter` is the user account ID.
   *  *  `Group` The `parameter` is the group name.
   *  *  `ProjectRole` The `parameter` is the project role ID.
   *  *  `UserCustomField` The `parameter` is the ID of the custom field.
   *  *  `GroupCustomField` The `parameter` is the ID of the custom field.
   */
  parameter?: string;
  /** The specified project role. */
  projectRole?: ProjectRole;
  /**
   * The identifier associated with the `notificationType` value that defines the
   * receiver of the notification, where the receiver isn't implied by the
   * `notificationType` value. So, when `notificationType` is:
   *
   *  *  `User`, `recipient` is the user account ID.
   *  *  `Group`, `recipient` is the group ID.
   *  *  `ProjectRole`, `recipient` is the project role ID.
   *  *  `UserCustomField`, `recipient` is the ID of the custom field.
   *  *  `GroupCustomField`, `recipient` is the ID of the custom field.
   */
  recipient?: string;
  /** The specified user. */
  user?: UserDetails;
}
/** Details about a notification event. */
export interface NotificationEvent {
  /** The description of the event. */
  description?: string;
  /**
   * The ID of the event. The event can be a [Jira system
   * event](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents)
   * or a [custom event](https://confluence.atlassian.com/x/AIlKLg).
   */
  id?: number;
  /** The name of the event. */
  name?: string;
  /**
   * The template of the event. Only custom events configured by Jira administrators
   * have template.
   */
  templateEvent?: NotificationEvent;
}
export interface NotificationSchemeAndProjectMappingJsonBean {
  notificationSchemeId?: string;
  projectId?: string;
}
/** Details about a notification scheme event. */
export interface NotificationSchemeEvent {
  /** Details about a notification event. */
  event?: NotificationEvent;
  notifications?: EventNotification[];
}
/** Details of a notification scheme event. */
export interface NotificationSchemeEventDetails extends Record<string, unknown> {
  /** The ID of the event. */
  event: NotificationSchemeEventTypeId;
  /** The list of notifications mapped to a specified event. */
  notifications: NotificationSchemeNotificationDetails[];
}
/** The ID of an event that is being mapped to notifications. */
export interface NotificationSchemeEventTypeId extends Record<string, unknown> {
  /** The ID of the notification scheme event. */
  id: string;
}
/** The ID of a notification scheme. */
export interface NotificationSchemeId extends Record<string, unknown> {
  /** The ID of a notification scheme. */
  id: string;
}
/** Details of a notification within a notification scheme. */
export interface NotificationSchemeNotificationDetails extends Record<string, unknown> {
  /** The notification type, e.g `CurrentAssignee`, `Group`, `EmailAddress`. */
  notificationType: string;
  /** The value corresponding to the specified notification type. */
  parameter?: string;
}
/** A page of items. */
export interface PageBeanNotificationScheme {
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
  values?: NotificationScheme[];
}
/** A page of items. */
export interface PageBeanNotificationSchemeAndProjectMappingJsonBean {
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
  values?: NotificationSchemeAndProjectMappingJsonBean[];
}
/** Details of a notification scheme. */
export interface UpdateNotificationSchemeDetails extends Record<string, unknown> {
  /** The description of the notification scheme. */
  description?: string;
  /** The name of the notification scheme. Must be unique. */
  name?: string;
}
