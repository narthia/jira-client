import type { IssueBean, IssueFieldKeys, JsonTypeBean } from "./common";
/**
 * A list of matched issues or errors for each JQL query, in the order the JQL
 * queries were passed.
 */
export interface IssueMatches {
  matches: IssueMatchesForJql[];
}
/**
 * A list of the issues matched to a JQL query or details of errors encountered
 * during matching.
 */
export interface IssueMatchesForJql {
  /** A list of errors. */
  errors: string[];
  /** A list of issue IDs. */
  matchedIssues: number[];
}
/** A list of issues suggested for use in auto-completion. */
export interface IssuePickerSuggestions {
  /** A list of issues for an issue type suggested for use in auto-completion. */
  sections?: IssuePickerSuggestionsIssueType[];
}
/** A type of issue suggested for use in auto-completion. */
export interface IssuePickerSuggestionsIssueType {
  /** The ID of the type of issues suggested for use in auto-completion. */
  id?: string;
  /** A list of issues suggested for use in auto-completion. */
  issues?: SuggestedIssue[];
  /** The label of the type of issues suggested for use in auto-completion. */
  label?: string;
  /**
   * If no issue suggestions are found, returns a message indicating no suggestions
   * were found,
   */
  msg?: string;
  /**
   * If issue suggestions are found, returns a message indicating the number of
   * issues suggestions found and returned.
   */
  sub?: string;
}
/** List of issues and JQL queries. */
export interface IssuesAndJqlQueries {
  /** A list of issue IDs. */
  issueIds: number[];
  /** A list of JQL queries. */
  jqls: string[];
}
export interface JqlCountRequestBean {
  /**
   * A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance
   * reasons, this parameter requires a bounded query. A bounded query is a query
   * with a search restriction.
   */
  jql: string;
}
export interface JqlCountResultsBean {
  /** Number of issues matching JQL query. */
  count: number;
}
export interface SearchAndReconcileRequestBean {
  /**
   * Use [expand](#expansion) to include additional information about issues in the
   * response. Note that, unlike the majority of instances where `expand` is
   * specified, `expand` is defined as a comma-delimited string of values. The
   * expand options are:
   *
   *  *  `renderedFields` Returns field values rendered in HTML format.
   *  *  `names` Returns the display name of each field.
   *  *  `schema` Returns the schema describing a field type.
   *  *  `transitions` Returns all possible transitions for the issue.
   *  *  `operations` Returns all possible operations for the issue.
   *  *  `editmeta` Returns information about how each field can be edited.
   *  *  `changelog` Returns a list of recent updates to an issue, sorted by date,
   * starting from the most recent.
   *  *  `versionedRepresentations` Instead of `fields`, returns
   * `versionedRepresentations` a JSON array containing each version of a field's
   * value, with the highest numbered item representing the most recent version.
   *
   * Examples: `"names,changelog"` Returns the display name of each field as well as
   * a list of recent updates to an issue.
   */
  expand?: string;
  /**
   * A list of fields to return for each issue. Use it to retrieve a subset of
   * fields. This parameter accepts a comma-separated list. Expand options include:
   *
   *  *  `*all` Returns all fields.
   *  *  `*navigable` Returns navigable fields.
   *  *  `id` Returns only issue IDs.
   *  *  Any issue field, prefixed with a dash to exclude.
   *
   * The default is `id`.
   *
   * Examples:
   *
   *  *  `summary,comment` Returns the summary and comments fields only.
   *  *  `*all,-comment` Returns all fields except comments.
   *
   * Multiple `fields` parameters can be included in a request.
   *
   * Note: By default, this resource returns IDs only. This differs from [GET
   * issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.
   */
  fields?: IssueFieldKeys;
  /** Reference fields by their key (rather than ID). The default is `false`. */
  fieldsByKeys?: boolean;
  /**
   * A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance
   * reasons, this parameter requires a bounded query. A bounded query is a query
   * with a search restriction.
   *
   *  *  Example of an unbounded query: `order by key desc`.
   *  *  Example of a bounded query: `assignee = currentUser() order by key`.
   *
   * Additionally, `orderBy` clause can contain a maximum of 7 fields.
   */
  jql: string;
  /**
   * The maximum number of items to return per page. To manage page size, API may
   * return fewer items per page where a large number of fields are requested. The
   * greatest number of items returned per page is achieved when requesting `id` or
   * `key` only. It returns max 5000 issues.
   */
  maxResults?: number;
  /**
   * The token for a page to fetch that is not the first page. The first page has a
   * `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of
   * issues.
   */
  nextPageToken?: string;
  /**
   * A list of up to 5 issue properties to include in the results. This parameter
   * accepts a comma-separated list.
   */
  properties?: string[];
  /**
   * Strong consistency issue ids to be reconciled with search results. Accepts max
   * 50 ids
   */
  reconcileIssues?: number[];
}
/** The result of a JQL search with issues reconsilation. */
export interface SearchAndReconcileResults {
  /** Indicates whether this is the last page of the paginated response. */
  isLast?: boolean;
  /** The list of issues found by the search or reconsiliation. */
  issues?: IssueBean[];
  /** The ID and name of each field in the search results. */
  names?: {
    [key: string]: string;
  };
  /**
   * Continuation token to fetch the next page. If this result represents the last
   * or the only page this token will be null. This token will expire in 7 days.
   */
  nextPageToken?: string;
  /** The schema describing the field types in the search results. */
  schema?: {
    /** The schema of a field. */ [key: string]: JsonTypeBean;
  };
}
export interface SearchRequestBean {
  /**
   * Use [expand](#expansion) to include additional information about issues in the
   * response. Note that, unlike the majority of instances where `expand` is
   * specified, `expand` is defined as a list of values. The expand options are:
   *
   *  *  `renderedFields` Returns field values rendered in HTML format.
   *  *  `names` Returns the display name of each field.
   *  *  `schema` Returns the schema describing a field type.
   *  *  `transitions` Returns all possible transitions for the issue.
   *  *  `operations` Returns all possible operations for the issue.
   *  *  `editmeta` Returns information about how each field can be edited.
   *  *  `changelog` Returns a list of recent updates to an issue, sorted by date,
   * starting from the most recent.
   *  *  `versionedRepresentations` Instead of `fields`, returns
   * `versionedRepresentations` a JSON array containing each version of a field's
   * value, with the highest numbered item representing the most recent version.
   */
  expand?: string[];
  /**
   * A list of fields to return for each issue, use it to retrieve a subset of
   * fields. This parameter accepts a comma-separated list. Expand options include:
   *
   *  *  `*all` Returns all fields.
   *  *  `*navigable` Returns navigable fields.
   *  *  Any issue field, prefixed with a minus to exclude.
   *
   * The default is `*navigable`.
   *
   * Examples:
   *
   *  *  `summary,comment` Returns the summary and comments fields only.
   *  *  `-description` Returns all navigable (default) fields except description.
   *  *  `*all,-comment` Returns all fields except comments.
   *
   * Multiple `fields` parameters can be included in a request.
   *
   * Note: All navigable fields are returned by default. This differs from [GET
   * issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.
   */
  fields?: string[];
  /** Reference fields by their key (rather than ID). The default is `false`. */
  fieldsByKeys?: boolean;
  /** A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. */
  jql?: string;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * A list of up to 5 issue properties to include in the results. This parameter
   * accepts a comma-separated list.
   */
  properties?: string[];
  /**
   * The index of the first item to return in the page of results (page offset). The
   * base index is `0`.
   */
  startAt?: number;
  /**
   * Determines how to validate the JQL query and treat the validation results.
   * Supported values:
   *
   *  *  `strict` Returns a 400 response code if any errors are found, along with a
   * list of all errors (and warnings).
   *  *  `warn` Returns all errors as warnings.
   *  *  `none` No validation is performed.
   *  *  `true` *Deprecated* A legacy synonym for `strict`.
   *  *  `false` *Deprecated* A legacy synonym for `warn`.
   *
   * The default is `strict`.
   *
   * Note: If the JQL is not correctly formed a 400 response code is returned,
   * regardless of the `validateQuery` value.
   */
  validateQuery?: "strict" | "warn" | "none" | "true" | "false";
}
/** The result of a JQL search. */
export interface SearchResults {
  /** Expand options that include additional search result details in the response. */
  expand?: string;
  /** The list of issues found by the search. */
  issues?: IssueBean[];
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The ID and name of each field in the search results. */
  names?: {
    [key: string]: string;
  };
  /** The schema describing the field types in the search results. */
  schema?: {
    /** The schema of a field. */ [key: string]: JsonTypeBean;
  };
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
  /** Any warnings related to the JQL query. */
  warningMessages?: string[];
}
/** An issue suggested for use in the issue picker auto-completion. */
export interface SuggestedIssue {
  /** The ID of the issue. */
  id?: number;
  /** The URL of the issue type's avatar. */
  img?: string;
  /** The key of the issue. */
  key?: string;
  /** The key of the issue in HTML format. */
  keyHtml?: string;
  /**
   * The phrase containing the query string in HTML format, with the string
   * highlighted with HTML bold tags.
   */
  summary?: string;
  /** The phrase containing the query string, as plain text. */
  summaryText?: string;
}
