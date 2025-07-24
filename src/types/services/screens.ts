import type { Scope, ScreenableTab } from "./common";
/** A page of items. */
export interface PageBeanScreen {
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
  values?: Screen[];
}
/** A page of items. */
export interface PageBeanScreenWithTab {
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
  values?: ScreenWithTab[];
}
/** A screen. */
export interface Screen {
  /** The description of the screen. */
  description?: string;
  /** The ID of the screen. */
  id?: number;
  /** The name of the screen. */
  name?: string;
  /** The scope of the screen. */
  scope?: Scope;
}
/** Details of a screen. */
export interface ScreenDetails {
  /** The description of the screen. The maximum length is 255 characters. */
  description?: string;
  /**
   * The name of the screen. The name must be unique. The maximum length is 255
   * characters.
   */
  name: string;
}
/** A screen with tab details. */
export interface ScreenWithTab {
  /** The description of the screen. */
  description?: string;
  /** The ID of the screen. */
  id?: number;
  /** The name of the screen. */
  name?: string;
  /** The scope of the screen. */
  scope?: Scope;
  /** The tab for the screen. */
  tab?: ScreenableTab;
}
/** Details of a screen. */
export interface UpdateScreenDetails {
  /** The description of the screen. The maximum length is 255 characters. */
  description?: string;
  /**
   * The name of the screen. The name must be unique. The maximum length is 255
   * characters.
   */
  name?: string;
}
