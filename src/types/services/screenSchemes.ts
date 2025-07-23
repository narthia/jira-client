import type { PageBeanIssueTypeScreenScheme } from "./common";
/** A page of items. */
export interface PageBeanScreenScheme {
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
  values?: ScreenScheme[];
}
/** A screen scheme. */
export interface ScreenScheme {
  /** The description of the screen scheme. */
  description?: string;
  /** The ID of the screen scheme. */
  id?: number;
  /** Details of the issue type screen schemes associated with the screen scheme. */
  issueTypeScreenSchemes?: PageBeanIssueTypeScreenScheme;
  /** The name of the screen scheme. */
  name?: string;
  /** The IDs of the screens for the screen types of the screen scheme. */
  screens?: ScreenTypes;
}
/** Details of a screen scheme. */
export interface ScreenSchemeDetails {
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description?: string;
  /**
   * The name of the screen scheme. The name must be unique. The maximum length is
   * 255 characters.
   */
  name: string;
  /**
   * The IDs of the screens for the screen types of the screen scheme. Only screens
   * used in classic projects are accepted.
   */
  screens: ScreenTypes;
}
/** The ID of a screen scheme. */
export interface ScreenSchemeId {
  /** The ID of the screen scheme. */
  id: number;
}
/** The IDs of the screens for the screen types of the screen scheme. */
export interface ScreenTypes {
  /** The ID of the create screen. */
  create?: number;
  /** The ID of the default screen. Required when creating a screen scheme. */
  default: number;
  /** The ID of the edit screen. */
  edit?: number;
  /** The ID of the view screen. */
  view?: number;
}
/** Details of a screen scheme. */
export interface UpdateScreenSchemeDetails {
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description?: string;
  /**
   * The name of the screen scheme. The name must be unique. The maximum length is
   * 255 characters.
   */
  name?: string;
  /**
   * The IDs of the screens for the screen types of the screen scheme. Only screens
   * used in classic projects are accepted.
   */
  screens?: UpdateScreenTypes;
}
/** The IDs of the screens for the screen types of the screen scheme. */
export interface UpdateScreenTypes {
  /** The ID of the create screen. To remove the screen association, pass a null. */
  create?: string;
  /**
   * The ID of the default screen. When specified, must include a screen ID as a
   * default screen is required.
   */
  default?: string;
  /** The ID of the edit screen. To remove the screen association, pass a null. */
  edit?: string;
  /** The ID of the view screen. To remove the screen association, pass a null. */
  view?: string;
}
