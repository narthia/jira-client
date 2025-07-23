/** The application the linked item is in. */
export interface Application extends Record<string, unknown> {
  /**
   * The name of the application. Used in conjunction with the (remote) object icon
   * title to display a tooltip for the link's icon. The tooltip takes the format
   * "\[application name\] icon title". Blank items are excluded from the tooltip
   * title. If both items are blank, the icon tooltop displays as "Web Link".
   * Grouping and sorting of links may place links without an application name last.
   */
  name?: string;
  /** The name-spaced type of the application, used by registered rendering apps. */
  type?: string;
}
/**
 * An icon. If no icon is defined:
 *
 *  *  for a status icon, no status icon displays in Jira.
 *  *  for the remote object icon, the default link icon displays in Jira.
 */
export interface Icon extends Record<string, unknown> {
  /**
   * The URL of the tooltip, used only for a status icon. If not set, the status
   * icon in Jira is not clickable.
   */
  link?: string;
  /**
   * The title of the icon. This is used as follows:
   *
   *  *  For a status icon it is used as a tooltip on the icon. If not set, the
   * status icon doesn't display a tooltip in Jira.
   *  *  For the remote object icon it is used in conjunction with the application
   * name to display a tooltip for the link's icon. The tooltip takes the format
   * "\[application name\] icon title". Blank itemsare excluded from the tooltip
   * title. If both items are blank, the icon tooltop displays as "Web Link".
   */
  title?: string;
  /** The URL of an icon that displays at 16x16 pixel in Jira. */
  url16x16?: string;
}
/** Details of an issue remote link. */
export interface RemoteIssueLink {
  /** Details of the remote application the linked item is in. */
  application?: Application;
  /** The global ID of the link, such as the ID of the item on the remote system. */
  globalId?: string;
  /** The ID of the link. */
  id?: number;
  /** Details of the item linked to. */
  object?: RemoteObject;
  /** Description of the relationship between the issue and the linked item. */
  relationship?: string;
  /** The URL of the link. */
  self?: string;
}
/** Details of the identifiers for a created or updated remote issue link. */
export interface RemoteIssueLinkIdentifies {
  /**
   * The ID of the remote issue link, such as the ID of the item on the remote
   * system.
   */
  id?: number;
  /** The URL of the remote issue link. */
  self?: string;
}
/** Details of a remote issue link. */
export interface RemoteIssueLinkRequest extends Record<string, unknown> {
  /** Details of the remote application the linked item is in. For example, trello. */
  application?: Application;
  /**
   * An identifier for the remote item in the remote system. For example, the global
   * ID for a remote item in Confluence would consist of the app ID and page ID,
   * like this: `appId=456&pageId=123`.
   *
   * Setting this field enables the remote issue link details to be updated or
   * deleted using remote system and item details as the record identifier, rather
   * than using the record's Jira ID.
   *
   * The maximum length is 255 characters.
   */
  globalId?: string;
  /** Details of the item linked to. */
  object: RemoteObject;
  /**
   * Description of the relationship between the issue and the linked item. If not
   * set, the relationship description "links to" is used in Jira.
   */
  relationship?: string;
}
/** The linked item. */
export interface RemoteObject extends Record<string, unknown> {
  /**
   * Details of the icon for the item. If no icon is defined, the default link icon
   * is used in Jira.
   */
  icon?: Icon;
  /** The status of the item. */
  status?: Status;
  /** The summary details of the item. */
  summary?: string;
  /** The title of the item. */
  title: string;
  /** The URL of the item. */
  url: string;
}
/** The status of the item. */
export interface Status extends Record<string, unknown> {
  /**
   * Details of the icon representing the status. If not provided, no status icon
   * displays in Jira.
   */
  icon?: Icon;
  /**
   * Whether the item is resolved. If set to "true", the link to the issue is
   * displayed in a strikethrough font, otherwise the link displays in normal font.
   */
  resolved?: boolean;
}
