import type { Comment } from "./common";
export interface IssueCommentListRequestBean {
  /** The list of comment IDs. A maximum of 1000 IDs can be specified. */
  ids: number[];
}
/** A page of items. */
export interface PageBeanComment {
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
  values?: Comment[];
}
/** A page of comments. */
export interface PageOfComments extends Record<string, unknown> {
  /** The list of comments. */
  comments?: Comment[];
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
}
