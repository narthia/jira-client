import type { UserDetails } from "./common";
/** A container for the watch status of a list of issues. */
export interface BulkIssueIsWatching {
  /** The map of issue ID to boolean watch status. */
  issuesIsWatching?: {
    [key: string]: boolean;
  };
}
/** A list of issue IDs. */
export interface IssueList {
  /** The list of issue IDs. */
  issueIds: string[];
}
/** The details of watchers on an issue. */
export interface Watchers {
  /** Whether the calling user is watching this issue. */
  isWatching?: boolean;
  /** The URL of these issue watcher details. */
  self?: string;
  /** The number of users watching this issue. */
  watchCount?: number;
  /** Details of the users watching this issue. */
  watchers?: UserDetails[];
}
