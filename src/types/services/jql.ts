import type { ErrorCollection } from "./common";
/** A field auto-complete suggestion. */
export interface AutoCompleteSuggestion {
  /**
   * The display name of a suggested item. If `fieldValue` or `predicateValue` are
   * provided, the matching text is highlighted with the HTML bold tag.
   */
  displayName?: string;
  /** The value of a suggested item. */
  value?: string;
}
/** The results from a JQL query. */
export interface AutoCompleteSuggestions {
  /** The list of suggested item. */
  results?: AutoCompleteSuggestion[];
}
/**
 * A JQL query clause that consists of nested clauses. For example, `(labels in
 * (urgent, blocker) OR lastCommentedBy = currentUser()). Note that, where nesting
 * is not defined, the parser nests JQL clauses based on the operator precedence.
 * For example, "A OR B AND C" is parsed as "(A OR B) AND C". See Setting the
 * precedence of operators for more information about precedence in JQL queries.`
 */
export interface CompoundClause {
  /** The list of nested clauses. */
  clauses: JqlQueryClause[];
  /** The operator between the clauses. */
  operator: "and" | "or" | "not";
}
/** The converted JQL queries. */
export interface ConvertedJqlQueries {
  /**
   * List of queries containing user information that could not be mapped to an
   * existing user
   */
  queriesWithUnknownUsers?: JqlQueryWithUnknownUsers[];
  /**
   * The list of converted query strings with account IDs in place of user
   * identifiers.
   */
  queryStrings?: string[];
}
/**
 * A clause that asserts whether a field was changed. For example, `status CHANGED
 * AFTER startOfMonth(-1M)`.See
 * [CHANGED](https://confluence.atlassian.com/x/dgiiLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED)
 * for more information about the CHANGED operator.
 */
export interface FieldChangedClause {
  /**
   * A field used in a JQL query. See [Advanced searching - fields
   * reference](https://confluence.atlassian.com/x/dAiiLQ) for more information
   * about fields in JQL queries.
   */
  field: JqlQueryField;
  /** The operator applied to the field. */
  operator: "changed";
  /** The list of time predicates. */
  predicates: JqlQueryClauseTimePredicate[];
}
/** Details of a field that can be used in advanced searches. */
export interface FieldReferenceData {
  /** Whether the field provide auto-complete suggestions. */
  auto?: "true" | "false";
  /** If the item is a custom field, the ID of the custom field. */
  cfid?: string;
  /** Whether this field has been deprecated. */
  deprecated?: "true" | "false";
  /** The searcher key of the field, only passed when the field is deprecated. */
  deprecatedSearcherKey?: string;
  /**
   * The display name contains the following:
   *
   *  *  for system fields, the field name. For example, `Summary`.
   *  *  for collapsed custom fields, the field name followed by a hyphen and then
   * the field name and field type. For example, `Component - Component[Dropdown]`.
   *  *  for other custom fields, the field name followed by a hyphen and then the
   * custom field ID. For example, `Component - cf[10061]`.
   */
  displayName?: string;
  /** The valid search operators for the field. */
  operators?: string[];
  /** Whether the field can be used in a query's `ORDER BY` clause. */
  orderable?: "true" | "false";
  /** Whether the content of this field can be searched. */
  searchable?: "true" | "false";
  /** The data types of items in the field. */
  types?: string[];
  /** The field identifier. */
  value?: string;
}
/**
 * A clause that asserts the current value of a field. For example, `summary ~
 * test`.
 */
export interface FieldValueClause {
  /**
   * A field used in a JQL query. See [Advanced searching - fields
   * reference](https://confluence.atlassian.com/x/dAiiLQ) for more information
   * about fields in JQL queries.
   */
  field: JqlQueryField;
  /** Details of an operand in a JQL clause. */
  operand: JqlQueryClauseOperand;
  /** The operator between the field and operand. */
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=" | "in" | "not in" | "~" | "~=" | "is" | "is not";
}
/**
 * A clause that asserts a previous value of a field. For example, `status WAS
 * "Resolved" BY currentUser() BEFORE "2019/02/02"`. See
 * [WAS](https://confluence.atlassian.com/x/dgiiLQ#Advancedsearching-operatorsreference-WASWAS)
 * for more information about the WAS operator.
 */
export interface FieldWasClause {
  /**
   * A field used in a JQL query. See [Advanced searching - fields
   * reference](https://confluence.atlassian.com/x/dAiiLQ) for more information
   * about fields in JQL queries.
   */
  field: JqlQueryField;
  /** Details of an operand in a JQL clause. */
  operand: JqlQueryClauseOperand;
  /** The operator between the field and operand. */
  operator: "was" | "was in" | "was not in" | "was not";
  /** The list of time predicates. */
  predicates: JqlQueryClauseTimePredicate[];
}
/**
 * An operand that is a function. See [Advanced searching - functions
 * reference](https://confluence.atlassian.com/x/dwiiLQ) for more information
 * about JQL functions.
 */
export interface FunctionOperand extends Record<string, unknown> {
  /** The list of function arguments. */
  arguments: string[];
  /** Encoded operand, which can be used directly in a JQL query. */
  encodedOperand?: string;
  /** The name of the function. */
  function: string;
}
/** Details of functions that can be used in advanced searches. */
export interface FunctionReferenceData {
  /** The display name of the function. */
  displayName?: string;
  /** Whether the function can take a list of arguments. */
  isList?: "true" | "false";
  /** Whether the function supports both single and list value operators. */
  supportsListAndSingleValueOperators?: "true" | "false";
  /** The data types returned by the function. */
  types?: string[];
  /** The function identifier. */
  value?: string;
}
/** The JQL queries to be converted. */
export interface JqlPersonalDataMigrationRequest {
  /** A list of queries with user identifiers. Maximum of 100 queries. */
  queryStrings?: string[];
}
/** A list of JQL queries to parse. */
export interface JqlQueriesToParse {
  /** A list of queries to parse. */
  queries: string[];
}
/** The list of JQL queries to sanitize for the given account IDs. */
export interface JqlQueriesToSanitize {
  /**
   * The list of JQL queries to sanitize. Must contain unique values. Maximum of 20
   * queries.
   */
  queries: JqlQueryToSanitize[];
}
/** A parsed JQL query. */
export interface JqlQuery {
  /** Details of the order-by JQL clause. */
  orderBy?: JqlQueryOrderByClause;
  /** A JQL query clause. */
  where?: JqlQueryClause;
}
/** A JQL query clause. */
export type JqlQueryClause =
  | CompoundClause
  | FieldValueClause
  | FieldWasClause
  | FieldChangedClause;
/** Details of an operand in a JQL clause. */
export type JqlQueryClauseOperand = ListOperand | ValueOperand | FunctionOperand | KeywordOperand;
/** A time predicate for a temporal JQL clause. */
export interface JqlQueryClauseTimePredicate extends Record<string, unknown> {
  /** Details of an operand in a JQL clause. */
  operand: JqlQueryClauseOperand;
  /** The operator between the field and the operand. */
  operator: "before" | "after" | "from" | "to" | "on" | "during" | "by";
}
/**
 * A field used in a JQL query. See [Advanced searching - fields
 * reference](https://confluence.atlassian.com/x/dAiiLQ) for more information
 * about fields in JQL queries.
 */
export interface JqlQueryField {
  /** The encoded name of the field, which can be used directly in a JQL query. */
  encodedName?: string;
  /** The name of the field. */
  name: string;
  /**
   * When the field refers to a value in an entity property, details of the entity
   * property value.
   */
  property?: JqlQueryFieldEntityProperty[];
}
/** Details of an entity property. */
export interface JqlQueryFieldEntityProperty extends Record<string, unknown> {
  /**
   * The object on which the property is set.
   *
   * @example
   * issue
   */
  entity: string;
  /**
   * The key of the property.
   *
   * @example
   * stats
   */
  key: string;
  /**
   * The path in the property value to query.
   *
   * @example
   * comments.count
   */
  path: string;
  /**
   * The type of the property value extraction. Not available if the extraction for
   * the property is not registered on the instance with the [Entity
   * property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/)
   * module.
   *
   * @example
   * number
   */
  type?: "number" | "string" | "text" | "date" | "user";
}
/** Details of the order-by JQL clause. */
export interface JqlQueryOrderByClause {
  /** The list of order-by clause fields and their ordering directives. */
  fields: JqlQueryOrderByClauseElement[];
}
/** An element of the order-by JQL clause. */
export interface JqlQueryOrderByClauseElement {
  /** The direction in which to order the results. */
  direction?: "asc" | "desc";
  /**
   * A field used in a JQL query. See [Advanced searching - fields
   * reference](https://confluence.atlassian.com/x/dAiiLQ) for more information
   * about fields in JQL queries.
   */
  field: JqlQueryField;
}
/**
 * The JQL query to sanitize for the account ID. If the account ID is null,
 * sanitizing is performed for an anonymous user.
 */
export interface JqlQueryToSanitize {
  /**
   * The account ID of the user, which uniquely identifies the user across all
   * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
   */
  accountId?: string | null;
  /** The query to sanitize. */
  query: string;
}
/** An operand that can be part of a list operand. */
export type JqlQueryUnitaryOperand = ValueOperand | FunctionOperand | KeywordOperand;
/** JQL queries that contained users that could not be found */
export interface JqlQueryWithUnknownUsers {
  /**
   * The converted query, with accountIDs instead of user identifiers, or 'unknown'
   * for users that could not be found
   */
  convertedQuery?: string;
  /** The original query, for reference */
  originalQuery?: string;
}
/** Lists of JQL reference data. */
export interface JqlReferenceData {
  /** List of JQL query reserved words. */
  jqlReservedWords?: string[];
  /** List of fields usable in JQL queries. */
  visibleFieldNames?: FieldReferenceData[];
  /** List of functions usable in JQL queries. */
  visibleFunctionNames?: FunctionReferenceData[];
}
/**
 * An operand that is a JQL keyword. See [Advanced searching - keywords
 * reference](https://confluence.atlassian.com/jiracorecloud/advanced-searching-keywords-reference-765593717.html#Advancedsearching-keywordsreference-EMPTYEMPTY)
 * for more information about operand keywords.
 */
export interface KeywordOperand extends Record<string, unknown> {
  /** The keyword that is the operand value. */
  keyword: "empty";
}
/** An operand that is a list of values. */
export interface ListOperand extends Record<string, unknown> {
  /** Encoded operand, which can be used directly in a JQL query. */
  encodedOperand?: string;
  /** The list of operand values. */
  values: JqlQueryUnitaryOperand[];
}
/** A list of parsed JQL queries. */
export interface ParsedJqlQueries {
  /** A list of parsed JQL queries. */
  queries: ParsedJqlQuery[];
}
/** Details of a parsed JQL query. */
export interface ParsedJqlQuery {
  /** The list of syntax or validation errors. */
  errors?: string[];
  /** The JQL query that was parsed and validated. */
  query: string;
  /** The syntax tree of the query. Empty if the query was invalid. */
  structure?: JqlQuery;
  /** The list of warning messages */
  warnings?: string[];
}
/** The sanitized JQL queries for the given account IDs. */
export interface SanitizedJqlQueries {
  /** The list of sanitized JQL queries. */
  queries?: SanitizedJqlQuery[];
}
/** Details of the sanitized JQL query. */
export interface SanitizedJqlQuery {
  /** The account ID of the user for whom sanitization was performed. */
  accountId?: string | null;
  /** The list of errors. */
  errors?: ErrorCollection;
  /** The initial query. */
  initialQuery?: string;
  /** The sanitized query, if there were no errors. */
  sanitizedQuery?: string | null;
}
/** Details of how to filter and list search auto complete information. */
export interface SearchAutoCompleteFilter {
  /** Include collapsed fields for fields that have non-unique names. */
  includeCollapsedFields?: boolean;
  /** List of project IDs used to filter the visible field details returned. */
  projectIds?: number[];
}
/** An operand that is a user-provided value. */
export interface ValueOperand extends Record<string, unknown> {
  /** Encoded value, which can be used directly in a JQL query. */
  encodedValue?: string;
  /** The operand value. */
  value: string;
}
