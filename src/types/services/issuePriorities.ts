import type { Priority } from "./common";
/** Details of an issue priority. */
export interface CreatePriorityDetails extends Record<string, unknown> {
  /**
   * The ID for the avatar for the priority. Either the iconUrl or avatarId must be
   * defined, but not both. This parameter is nullable and will become mandatory
   * once the iconUrl parameter is deprecated.
   */
  avatarId?: number;
  /** The description of the priority. */
  description?: string | null;
  /**
   * The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS.
   * Built in icons can also be used. Either the iconUrl or avatarId must be
   * defined, but not both.
   */
  iconUrl?:
    | "/images/icons/priorities/blocker.png"
    | "/images/icons/priorities/critical.png"
    | "/images/icons/priorities/high.png"
    | "/images/icons/priorities/highest.png"
    | "/images/icons/priorities/low.png"
    | "/images/icons/priorities/lowest.png"
    | "/images/icons/priorities/major.png"
    | "/images/icons/priorities/medium.png"
    | "/images/icons/priorities/minor.png"
    | "/images/icons/priorities/trivial.png"
    | "/images/icons/priorities/blocker_new.png"
    | "/images/icons/priorities/critical_new.png"
    | "/images/icons/priorities/high_new.png"
    | "/images/icons/priorities/highest_new.png"
    | "/images/icons/priorities/low_new.png"
    | "/images/icons/priorities/lowest_new.png"
    | "/images/icons/priorities/major_new.png"
    | "/images/icons/priorities/medium_new.png"
    | "/images/icons/priorities/minor_new.png"
    | "/images/icons/priorities/trivial_new.png"
    | null;
  /** The name of the priority. Must be unique. */
  name: string;
  /** The status color of the priority in 3-digit or 6-digit hexadecimal format. */
  statusColor: string;
}
/** A page of items. */
export interface PageBeanPriority {
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
  values?: Priority[];
}
/** The ID of an issue priority. */
export interface PriorityId extends Record<string, unknown> {
  /** The ID of the issue priority. */
  id: string;
}
/** Change the order of issue priorities. */
export interface ReorderIssuePriorities {
  /** The ID of the priority. Required if `position` isn't provided. */
  after?: string;
  /** The list of issue IDs to be reordered. Cannot contain duplicates nor after ID. */
  ids: string[];
  /**
   * The position for issue priorities to be moved to. Required if `after` isn't
   * provided.
   */
  position?: string;
}
/** The new default issue priority. */
export interface SetDefaultPriorityRequest {
  /**
   * The ID of the new default issue priority. Must be an existing ID or null.
   * Setting this to null erases the default priority setting.
   */
  id: string;
}
/** Details of an issue priority. */
export interface UpdatePriorityDetails extends Record<string, unknown> {
  /**
   * The ID for the avatar for the priority. This parameter is nullable and both
   * iconUrl and avatarId cannot be defined.
   */
  avatarId?: number;
  /** The description of the priority. */
  description?: string | null;
  /**
   * The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS.
   * Built in icons can also be used. Both iconUrl and avatarId cannot be defined.
   */
  iconUrl?:
    | "/images/icons/priorities/blocker.png"
    | "/images/icons/priorities/critical.png"
    | "/images/icons/priorities/high.png"
    | "/images/icons/priorities/highest.png"
    | "/images/icons/priorities/low.png"
    | "/images/icons/priorities/lowest.png"
    | "/images/icons/priorities/major.png"
    | "/images/icons/priorities/medium.png"
    | "/images/icons/priorities/minor.png"
    | "/images/icons/priorities/trivial.png"
    | "/images/icons/priorities/blocker_new.png"
    | "/images/icons/priorities/critical_new.png"
    | "/images/icons/priorities/high_new.png"
    | "/images/icons/priorities/highest_new.png"
    | "/images/icons/priorities/low_new.png"
    | "/images/icons/priorities/lowest_new.png"
    | "/images/icons/priorities/major_new.png"
    | "/images/icons/priorities/medium_new.png"
    | "/images/icons/priorities/minor_new.png"
    | "/images/icons/priorities/trivial_new.png"
    | null;
  /** The name of the priority. Must be unique. */
  name?: string | null;
  /** The status color of the priority in 3-digit or 6-digit hexadecimal format. */
  statusColor?: string | null;
}
