export type CustomContextVariable =
  | UserContextVariable
  | IssueContextVariable
  | JsonContextVariable;
/**
 * The project that is available under the `project` variable when evaluating the
 * expression.
 */
export interface IdOrKeyBean {
  /** The ID of the referenced item. */
  id?: number;
  /** The key of the referenced item. */
  key?: string;
}
/**
 * An
 * [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)
 * specified by ID or key. All the fields of the issue object are available in the
 * Jira expression.
 */
export interface IssueContextVariable {
  /** Type of custom context variable. */
  type: string;
  /** The issue ID. */
  id?: number;
  /** The issue key. */
  key?: string;
}
/** The description of the page of issues loaded by the provided JQL query. */
export interface IssuesJqlMetaDataBean {
  /** The number of issues that were loaded in this evaluation. */
  count: number;
  /** The maximum number of issues that could be loaded in this evaluation. */
  maxResults: number;
  /** The index of the first issue. */
  startAt: number;
  /** The total number of issues the JQL returned. */
  totalCount: number;
  /**
   * Any warnings related to the JQL query. Present only if the validation mode was
   * set to `warn`.
   */
  validationWarnings?: string[];
}
/** Meta data describing the `issues` context variable. */
export interface IssuesMetaBean {
  /** The description of the page of issues loaded by the provided JQL query. */
  jql?: IssuesJqlMetaDataBean;
}
/**
 * The JQL specifying the issues available in the evaluated Jira expression under
 * the `issues` context variable. This bean will be replacing `JexpIssues` bean as
 * part of new `evaluate` endpoint
 */
export interface JexpEvaluateCtxIssues {
  /** The JQL query that specifies the set of issues available in the Jira expression. */
  jql?: JexpEvaluateCtxJqlIssues;
}
/**
 * The JQL specifying the issues available in the evaluated Jira expression under
 * the `issues` context variable. Not all issues returned by the JQL query are
 * loaded, only those described by the `nextPageToken` and `maxResults`
 * properties. This bean will be replacing JexpJqlIssues bean as part of new
 * `evaluate` endpoint
 */
export interface JexpEvaluateCtxJqlIssues {
  /**
   * The maximum number of issues to return from the JQL query. max results value
   * considered may be lower than the number specific here.
   */
  maxResults?: number;
  /**
   * The token for a page to fetch that is not the first page. The first page has a
   * `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of
   * issues.
   */
  nextPageToken?: string;
  /**
   * The JQL query, required to be bounded. Additionally, `orderBy` clause can
   * contain a maximum of 7 fields
   */
  query?: string;
}
/**
 * The description of the page of issues loaded by the provided JQL query.This
 * bean will be replacing IssuesJqlMetaDataBean bean as part of new `evaluate`
 * endpoint
 */
export interface JexpEvaluateIssuesJqlMetaDataBean {
  /** Indicates whether this is the last page of the paginated response. */
  isLast?: boolean;
  /** Next Page token for the next page of issues. */
  nextPageToken: string;
}
/**
 * Meta data describing the `issues` context variable.This bean will be replacing
 * IssuesMetaBean bean as part of new `evaluate` endpoint
 */
export interface JexpEvaluateIssuesMetaBean {
  /**
   * The description of the page of issues loaded by the provided JQL query.This
   * bean will be replacing IssuesJqlMetaDataBean bean as part of new `evaluate`
   * endpoint
   */
  jql?: JexpEvaluateIssuesJqlMetaDataBean;
}
/**
 * The result of evaluating a Jira expression.This bean will be replacing
 * `JiraExpressionResultBean` bean as part of new evaluate endpoint
 */
export interface JexpEvaluateJiraExpressionResultBean {
  /** Contains various characteristics of the performed expression evaluation. */
  meta?: JexpEvaluateMetaDataBean;
  /**
   * The value of the evaluated expression. It may be a primitive JSON value or a
   * Jira REST API object. (Some expressions do not produce any meaningful
   * results—for example, an expression that returns a lambda function—if that's the
   * case a simple string representation is returned. These string representations
   * should not be relied upon and may change without notice.)
   */
  value: unknown;
}
/**
 * Contains information about the expression evaluation. This bean will be
 * replacing `JiraExpressionEvaluationMetaDataBean` bean as part of new `evaluate`
 * endpoint
 */
export interface JexpEvaluateMetaDataBean {
  /**
   * Contains information about the expression complexity. For example, the number
   * of steps it took to evaluate the expression.
   */
  complexity?: JiraExpressionsComplexityBean;
  /**
   * Contains information about the `issues` variable in the context. For example,
   * is the issues were loaded with JQL, information about the page will be included
   * here.
   */
  issues?: JexpEvaluateIssuesMetaBean;
}
/**
 * The JQL specifying the issues available in the evaluated Jira expression under
 * the `issues` context variable.
 */
export interface JexpIssues {
  /** The JQL query that specifies the set of issues available in the Jira expression. */
  jql?: JexpJqlIssues;
}
/**
 * The JQL specifying the issues available in the evaluated Jira expression under
 * the `issues` context variable. Not all issues returned by the JQL query are
 * loaded, only those described by the `startAt` and `maxResults` properties. To
 * determine whether it is necessary to iterate to ensure all the issues returned
 * by the JQL query are evaluated, inspect `meta.issues.jql.count` in the response.
 */
export interface JexpJqlIssues {
  /**
   * The maximum number of issues to return from the JQL query. Inspect
   * `meta.issues.jql.maxResults` in the response to ensure the maximum value has
   * not been exceeded.
   */
  maxResults?: number;
  /** The JQL query. */
  query?: string;
  /** The index of the first issue to return from the JQL query. */
  startAt?: number;
  /** Determines how to validate the JQL query and treat the validation results. */
  validation?: "strict" | "warn" | "none";
}
/** Details about the analysed Jira expression. */
export interface JiraExpressionAnalysis {
  /** Details about the complexity of the analysed Jira expression. */
  complexity?: JiraExpressionComplexity;
  /** A list of validation errors. Not included if the expression is valid. */
  errors?: JiraExpressionValidationError[];
  /** The analysed expression. */
  expression: string;
  /** EXPERIMENTAL. The inferred type of the expression. */
  type?: string;
  /**
   * Whether the expression is valid and the interpreter will evaluate it. Note that
   * the expression may fail at runtime (for example, if it executes too many
   * expensive operations).
   */
  valid: boolean;
}
/** Details about the complexity of the analysed Jira expression. */
export interface JiraExpressionComplexity {
  /**
   * Information that can be used to determine how many [expensive
   * operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations)
   * the evaluation of the expression will perform. This information may be a
   * formula or number. For example:
   *
   *  *  `issues.map(i => i.comments)` performs as many expensive operations as
   * there are issues on the issues list. So this parameter returns `N`, where `N`
   * is the size of issue list.
   *  *  `new Issue(10010).comments` gets comments for one issue, so its complexity
   * is `2` (`1` to retrieve issue 10010 from the database plus `1` to get its
   * comments).
   */
  expensiveOperations: string;
  /**
   * Variables used in the formula, mapped to the parts of the expression they refer
   * to.
   */
  variables?: {
    /**
     * Variables used in the formula, mapped to the parts of the expression they refer
     * to.
     */
    [key: string]: string;
  };
}
/** The context in which the Jira expression is evaluated. */
export interface JiraExpressionEvalContextBean {
  /**
   * The ID of the board that is available under the `board` variable when
   * evaluating the expression.
   */
  board?: number;
  /**
   * Custom context variables and their types. These variable types are available
   * for use in a custom context:
   *
   *  *  `user`: A
   * [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)
   * specified as an Atlassian account ID.
   *  *  `issue`: An
   * [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)
   * specified by ID or key. All the fields of the issue object are available in the
   * Jira expression.
   *  *  `json`: A JSON object containing custom content.
   *  *  `list`: A JSON list of `user`, `issue`, or `json` variable types.
   */
  custom?: CustomContextVariable[];
  /**
   * The ID of the customer request that is available under the `customerRequest`
   * variable when evaluating the expression. This is the same as the ID of the
   * underlying Jira issue, but the customer request context variable will have a
   * different type.
   */
  customerRequest?: number;
  /**
   * The issue that is available under the `issue` variable when evaluating the
   * expression.
   */
  issue?: IdOrKeyBean;
  /**
   * The collection of issues that is available under the `issues` variable when
   * evaluating the expression.
   */
  issues?: JexpIssues;
  /**
   * The project that is available under the `project` variable when evaluating the
   * expression.
   */
  project?: IdOrKeyBean;
  /**
   * The ID of the service desk that is available under the `serviceDesk` variable
   * when evaluating the expression.
   */
  serviceDesk?: number;
  /**
   * The ID of the sprint that is available under the `sprint` variable when
   * evaluating the expression.
   */
  sprint?: number;
}
export interface JiraExpressionEvalRequestBean {
  /** The context in which the Jira expression is evaluated. */
  context?: JiraExpressionEvalContextBean;
  /**
   * The Jira expression to evaluate.
   *
   * @example
   * { key: issue.key, type: issue.issueType.name, links: issue.links.map(link => link.linkedIssue.id) }
   */
  expression: string;
}
/** The context in which the Jira expression is evaluated. */
export interface JiraExpressionEvaluateContextBean {
  /**
   * The ID of the board that is available under the `board` variable when
   * evaluating the expression.
   */
  board?: number;
  /**
   * Custom context variables and their types. These variable types are available
   * for use in a custom context:
   *
   *  *  `user`: A
   * [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)
   * specified as an Atlassian account ID.
   *  *  `issue`: An
   * [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)
   * specified by ID or key. All the fields of the issue object are available in the
   * Jira expression.
   *  *  `json`: A JSON object containing custom content.
   *  *  `list`: A JSON list of `user`, `issue`, or `json` variable types.
   */
  custom?: CustomContextVariable[];
  /**
   * The ID of the customer request that is available under the `customerRequest`
   * variable when evaluating the expression. This is the same as the ID of the
   * underlying Jira issue, but the customer request context variable will have a
   * different type.
   */
  customerRequest?: number;
  /**
   * The issue that is available under the `issue` variable when evaluating the
   * expression.
   */
  issue?: IdOrKeyBean;
  /**
   * The collection of issues that is available under the `issues` variable when
   * evaluating the expression.
   */
  issues?: JexpEvaluateCtxIssues;
  /**
   * The project that is available under the `project` variable when evaluating the
   * expression.
   */
  project?: IdOrKeyBean;
  /**
   * The ID of the service desk that is available under the `serviceDesk` variable
   * when evaluating the expression.
   */
  serviceDesk?: number;
  /**
   * The ID of the sprint that is available under the `sprint` variable when
   * evaluating the expression.
   */
  sprint?: number;
}
/**
 * The request to evaluate a Jira expression. This bean will be replacing
 * `JiraExpressionEvaluateRequest` as part of new `evaluate` endpoint
 */
export interface JiraExpressionEvaluateRequestBean {
  /** The context in which the Jira expression is evaluated. */
  context?: JiraExpressionEvaluateContextBean;
  /**
   * The Jira expression to evaluate.
   *
   * @example
   * { key: issue.key, type: issue.issueType.name, links: issue.links.map(link => link.linkedIssue.id) }
   */
  expression: string;
}
/** Contains various characteristics of the performed expression evaluation. */
export interface JiraExpressionEvaluationMetaDataBean {
  /**
   * Contains information about the expression complexity. For example, the number
   * of steps it took to evaluate the expression.
   */
  complexity?: JiraExpressionsComplexityBean;
  /**
   * Contains information about the `issues` variable in the context. For example,
   * is the issues were loaded with JQL, information about the page will be included
   * here.
   */
  issues?: IssuesMetaBean;
}
/** Details of Jira expressions for analysis. */
export interface JiraExpressionForAnalysis {
  /**
   * Context variables and their types. The type checker assumes that [common
   * context
   * variables](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables),
   * such as `issue` or `project`, are available in context and sets their type. Use
   * this property to override the default types or provide details of new variables.
   */
  contextVariables?: {
    /**
     * Context variables and their types. The type checker assumes that
     * https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables
     * common context variables, such as <code>issue</code> or <code>project</code>,
     * are available in context and sets their type. Use this property to override the
     * default types or provide details of new variables.
     */
    [key: string]: string;
  };
  /**
   * The list of Jira expressions to analyse.
   *
   * @example
   * issues.map(issue => issue.properties['property_key'])
   */
  expressions: string[];
}
/** The result of evaluating a Jira expression. */
export interface JiraExpressionResult {
  /** Contains various characteristics of the performed expression evaluation. */
  meta?: JiraExpressionEvaluationMetaDataBean;
  /**
   * The value of the evaluated expression. It may be a primitive JSON value or a
   * Jira REST API object. (Some expressions do not produce any meaningful
   * results—for example, an expression that returns a lambda function—if that's the
   * case a simple string representation is returned. These string representations
   * should not be relied upon and may change without notice.)
   */
  value: unknown;
}
/** Details about the analysed Jira expression. */
export interface JiraExpressionsAnalysis {
  /** The results of Jira expressions analysis. */
  results: JiraExpressionAnalysis[];
}
/**
 * Contains information about the expression complexity. For example, the number
 * of steps it took to evaluate the expression.
 */
export interface JiraExpressionsComplexityBean {
  /** The number of Jira REST API beans returned in the response. */
  beans: JiraExpressionsComplexityValueBean;
  /**
   * The number of expensive operations executed while evaluating the expression.
   * Expensive operations are those that load additional data, such as entity
   * properties, comments, or custom fields.
   */
  expensiveOperations: JiraExpressionsComplexityValueBean;
  /** The number of primitive values returned in the response. */
  primitiveValues: JiraExpressionsComplexityValueBean;
  /**
   * The number of steps it took to evaluate the expression, where a step is a
   * high-level operation performed by the expression. A step is an operation such
   * as arithmetic, accessing a property, accessing a context variable, or calling a
   * function.
   */
  steps: JiraExpressionsComplexityValueBean;
}
/**
 * The number of steps it took to evaluate the expression, where a step is a
 * high-level operation performed by the expression. A step is an operation such
 * as arithmetic, accessing a property, accessing a context variable, or calling a
 * function.
 */
export interface JiraExpressionsComplexityValueBean {
  /**
   * The maximum allowed complexity. The evaluation will fail if this value is
   * exceeded.
   */
  limit: number;
  /** The complexity value of the current expression. */
  value: number;
}
/**
 * Details about syntax and type errors. The error details apply to the entire
 * expression, unless the object includes:
 *
 *  *  `line` and `column`
 *  *  `expression`
 */
export interface JiraExpressionValidationError {
  /** The text column in which the error occurred. */
  column?: number;
  /** The part of the expression in which the error occurred. */
  expression?: string;
  /** The text line in which the error occurred. */
  line?: number;
  /**
   * Details about the error.
   *
   * @example
   * !, -, typeof, (, IDENTIFIER, null, true, false, NUMBER, STRING, TEMPLATE_LITERAL, new, [ or { expected, > encountered.
   */
  message: string;
  /** The error type. */
  type: "syntax" | "type" | "other";
}
/** A JSON object with custom content. */
export interface JsonContextVariable {
  /** Type of custom context variable. */
  type: string;
  /** A JSON object containing custom content. */
  value?: {
    [key: string]: unknown;
  };
}
/**
 * A
 * [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)
 * specified as an Atlassian account ID.
 */
export interface UserContextVariable {
  /** Type of custom context variable. */
  type: string;
  /** The account ID of the user. */
  accountId: string;
}
