import type {
  JiraExpressionForAnalysis,
  JiraExpressionsAnalysis,
  JiraExpressionEvalRequestBean,
  JiraExpressionResult,
  JiraExpressionEvaluateRequestBean,
  JexpEvaluateJiraExpressionResultBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource is a collection of operations for [Jira
 * expressions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).
 */
export default function jiraExpressions<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Analyses and validates Jira expressions.
     *
     * As an experimental feature, this operation can also attempt to type-check the
     * expressions.
     *
     * Learn more about Jira expressions in the
     * [documentation](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).
     *
     * **[Permissions](#permissions) required**: None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "results": [
     *     {
     *       "expression": "analysed expression",
     *       "errors": [
     *         {
     *           "line": 1,
     *           "column": 4,
     *           "message": "!, -, typeof, (, IDENTIFIER, null, true, false, NUMBER, STRING, TEMPLATE_LITERAL, new, [ or { expected, > encountered.",
     *           "type": "syntax"
     *         },
     *         {
     *           "message": "Jira expression is too long (1040), limit: 1000 characters",
     *           "type": "other"
     *         },
     *         {
     *           "message": "Jira expression has too many nodes (150), limit: 100 leaves",
     *           "type": "other"
     *         }
     *       ],
     *       "valid": false
     *     },
     *     {
     *       "expression": "issues.map(i => {idAndKey: [i.id, i.key], summary: i.summary, comments: i.comments})",
     *       "valid": true,
     *       "type": "List<{idAndKey: [Number, String], summary: String, comments: List<Comment>}>",
     *       "complexity": {
     *         "expensiveOperations": "N",
     *         "variables": {
     *           "N": "issues"
     *         }
     *       }
     *     },
     *     {
     *       "expression": "issues.map(i => i.id > '0')",
     *       "errors": [
     *         {
     *           "expression": "i.id > 0",
     *           "message": "Can't compare Number to String.",
     *           "type": "type"
     *         }
     *       ],
     *       "valid": false,
     *       "type": "TypeError"
     *     }
     *   ]
     * }
     * ```
     */
    analyseExpression: async ({
      check,
      jiraExpressionForAnalysis,
      opts
    }: {
      /**
       * The check to perform:
       *
       *  *  `syntax` Each expression's syntax is checked to ensure the expression can
       * be parsed. Also, syntactic limits are validated. For example, the expression's
       * length.
       *  *  `type` EXPERIMENTAL. Each expression is type checked and the final type of
       * the expression inferred. Any type errors that would result in the expression
       * failure at runtime are reported. For example, accessing properties that don't
       * exist or passing the wrong number of arguments to functions. Also performs the
       * syntax check.
       *  *  `complexity` EXPERIMENTAL. Determines the formulae for how many [expensive
       * operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations)
       * each expression may execute.
       */
      check?: "syntax" | "type" | "complexity";
      /**
       * The Jira expressions to analyse.
       *
       * @example
       * {
       *   "contextVariables": {
       *     "listOfStrings": "List<String>",
       *     "record": "{ a: Number, b: String }",
       *     "value": "User"
       *   },
       *   "expressions": [
       *     "issues.map(issue => issue.properties['property_key'])"
       *   ]
       * }
       */
      jiraExpressionForAnalysis: JiraExpressionForAnalysis;
    } & WithRequestOpts<TClient>): Promise<JiraResult<JiraExpressionsAnalysis>> => {
      return jiraRequest<JiraExpressionsAnalysis>({
        path: "/rest/api/3/expression/analyse",
        method: "POST",
        queryParams: {
          check
        },
        body: JSON.stringify(jiraExpressionForAnalysis),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Endpoint is currently being removed. [More
     * details](https://developer.atlassian.com/changelog/#CHANGE-2046)
     *
     * Evaluates a Jira expression and returns its value.
     *
     * This resource can be used to test Jira expressions that you plan to use
     * elsewhere, or to fetch data in a flexible way. Consult the [Jira expressions
     * documentation](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/)
     * for more details.
     *
     * #### Context variables ####
     *
     * The following context variables are available to Jira expressions evaluated by
     * this resource. Their presence depends on various factors; usually you need to
     * manually request them in the context object sent in the payload, but some of
     * them are added automatically under certain conditions.
     *
     *  *  `user`
     * ([User](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)):
     * The current user. Always available and equal to `null` if the request is
     * anonymous.
     *  *  `app`
     * ([App](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#app)):
     * The [Connect
     * app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps)
     * that made the request. Available only for authenticated requests made by
     * Connect Apps (read more here: [Authentication for Connect
     * apps](https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/)).
     *  *  `issue`
     * ([Issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)):
     * The current issue. Available only when the issue is provided in the request
     * context object.
     *  *  `issues`
     * ([List](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#list)
     * of
     * [Issues](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)):
     * A collection of issues matching a JQL query. Available only when JQL is
     * provided in the request context object.
     *  *  `project`
     * ([Project](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#project)):
     * The current project. Available only when the project is provided in the request
     * context object.
     *  *  `sprint`
     * ([Sprint](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#sprint)):
     * The current sprint. Available only when the sprint is provided in the request
     * context object.
     *  *  `board`
     * ([Board](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#board)):
     * The current board. Available only when the board is provided in the request
     * context object.
     *  *  `serviceDesk`
     * ([ServiceDesk](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#servicedesk)):
     * The current service desk. Available only when the service desk is provided in
     * the request context object.
     *  *  `customerRequest`
     * ([CustomerRequest](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#customerrequest)):
     * The current customer request. Available only when the customer request is
     * provided in the request context object.
     *
     * Also, custom context variables can be passed in the request with their types.
     * Those variables can be accessed by key in the Jira expression. These variable
     * types are available for use in a custom context:
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
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required**: None. However, an expression may
     * return different results for different users depending on their permissions.
     * For example, different users may see different comments on the same issue.
     * Permission to access Jira Software is required to access Jira Software context
     * variables (`board` and `sprint`) or fields (for example, `issue.sprint`).
     *
     * @deprecated
     * @returns Returned if the evaluation results in a value. The result is a JSON primitive value, list, or object.
     *
     * example:
     * ```
     * {
     *   "value": "The expression's result. This value can be any JSON, not necessarily a String",
     *   "meta": {
     *     "complexity": {
     *       "steps": {
     *         "value": 1,
     *         "limit": 10000
     *       },
     *       "expensiveOperations": {
     *         "value": 3,
     *         "limit": 10
     *       },
     *       "beans": {
     *         "value": 0,
     *         "limit": 1000
     *       },
     *       "primitiveValues": {
     *         "value": 1,
     *         "limit": 10000
     *       }
     *     },
     *     "issues": {
     *       "jql": {
     *         "startAt": 0,
     *         "maxResults": 1000,
     *         "count": 140,
     *         "totalCount": 140,
     *         "validationWarnings": [
     *           "There is a problem with the JQL query."
     *         ]
     *       }
     *     }
     *   }
     * }
     * ```
     */
    evaluateJiraExpression: async ({
      expand,
      jiraExpressionEvalRequestBean,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts `meta.complexity` that returns information about the
       * expression complexity. For example, the number of expensive operations used by
       * the expression and how close the expression is to reaching the [complexity
       * limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions).
       * Useful when designing and debugging your expressions.
       */
      expand?: string;
      /**
       * The Jira expression and the evaluation context.
       *
       * @example
       * {
       *   "context": {
       *     "board": 10100,
       *     "custom": {
       *       "config": {
       *         "type": "json",
       *         "value": {
       *           "userId": "10002"
       *         }
       *       },
       *       "issuesList": [
       *         {
       *           "key": "ACJIRA-1471",
       *           "type": "issue"
       *         },
       *         {
       *           "id": 100001,
       *           "type": "issue"
       *         }
       *       ],
       *       "myUser": {
       *         "accountId": "100001",
       *         "type": "user"
       *       },
       *       "nullField": {
       *         "type": "json"
       *       }
       *     },
       *     "customerRequest": 1450,
       *     "issue": {
       *       "key": "ACJIRA-1470"
       *     },
       *     "issues": {
       *       "jql": {
       *         "maxResults": 100,
       *         "query": "project = HSP",
       *         "startAt": 0,
       *         "validation": "strict"
       *       }
       *     },
       *     "project": {
       *       "key": "ACJIRA"
       *     },
       *     "serviceDesk": 10023,
       *     "sprint": 10001
       *   },
       *   "expression": "{ key: issue.key, type: issue.issueType.name, links: issue.links.map(link => link.linkedIssue.id), listCustomVariable: issuesList.includes(issue), customVariables: myUser.accountId == config.userId}"
       * }
       */
      jiraExpressionEvalRequestBean: JiraExpressionEvalRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<JiraExpressionResult>> => {
      return jiraRequest<JiraExpressionResult>({
        path: "/rest/api/3/expression/eval",
        method: "POST",
        queryParams: {
          expand
        },
        body: JSON.stringify(jiraExpressionEvalRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Evaluates a Jira expression and returns its value. The difference between this
     * and `eval` is that this endpoint uses the enhanced search API when evaluating
     * JQL queries. This API is eventually consistent, unlike the strongly consistent
     * `eval` API. This allows for better performance and scalability. In addition,
     * this API's response for JQL evaluation is based on a scrolling view (backed by
     * a `nextPageToken`) instead of a paginated view (backed by `startAt` and
     * `totalCount`).
     *
     * This resource can be used to test Jira expressions that you plan to use
     * elsewhere, or to fetch data in a flexible way. Consult the [Jira expressions
     * documentation](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/)
     * for more details.
     *
     * #### Context variables ####
     *
     * The following context variables are available to Jira expressions evaluated by
     * this resource. Their presence depends on various factors; usually you need to
     * manually request them in the context object sent in the payload, but some of
     * them are added automatically under certain conditions.
     *
     *  *  `user`
     * ([User](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)):
     * The current user. Always available and equal to `null` if the request is
     * anonymous.
     *  *  `app`
     * ([App](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#app)):
     * The [Connect
     * app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps)
     * that made the request. Available only for authenticated requests made by
     * Connect apps (read more here: [Authentication for Connect
     * apps](https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/)).
     *  *  `issue`
     * ([Issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)):
     * The current issue. Available only when the issue is provided in the request
     * context object.
     *  *  `issues`
     * ([List](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#list)
     * of
     * [Issues](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)):
     * A collection of issues matching a JQL query. Available only when JQL is
     * provided in the request context object.
     *  *  `project`
     * ([Project](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#project)):
     * The current project. Available only when the project is provided in the request
     * context object.
     *  *  `sprint`
     * ([Sprint](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#sprint)):
     * The current sprint. Available only when the sprint is provided in the request
     * context object.
     *  *  `board`
     * ([Board](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#board)):
     * The current board. Available only when the board is provided in the request
     * context object.
     *  *  `serviceDesk`
     * ([ServiceDesk](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#servicedesk)):
     * The current service desk. Available only when the service desk is provided in
     * the request context object.
     *  *  `customerRequest`
     * ([CustomerRequest](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#customerrequest)):
     * The current customer request. Available only when the customer request is
     * provided in the request context object.
     *
     * In addition, you can pass custom context variables along with their types. You
     * can then access them from the Jira expression by key. You can use the following
     * variables in a custom context:
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
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required**: None. However, an expression may
     * return different results for different users depending on their permissions.
     * For example, different users may see different comments on the same issue.
     * Permission to access Jira Software is required to access Jira Software context
     * variables (`board` and `sprint`) or fields (for example, `issue.sprint`).
     *
     * @returns Returned if the evaluation results in a value. The result is a JSON primitive value, list, or object.
     *
     * example:
     * ```
     * {
     *   "value": "The expression's result. This value can be any JSON, not necessarily a String",
     *   "meta": {
     *     "complexity": {
     *       "steps": {
     *         "value": 1,
     *         "limit": 10000
     *       },
     *       "expensiveOperations": {
     *         "value": 3,
     *         "limit": 10
     *       },
     *       "beans": {
     *         "value": 0,
     *         "limit": 1000
     *       },
     *       "primitiveValues": {
     *         "value": 1,
     *         "limit": 10000
     *       }
     *     },
     *     "issues": {
     *       "jql": {
     *         "nextPageToken": "EgQIlMIC",
     *         "isLast": false
     *       }
     *     }
     *   }
     * }
     * ```
     */
    evaluateJsisJiraExpression: async ({
      expand,
      jiraExpressionEvaluateRequestBean,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts `meta.complexity` that returns information about the
       * expression complexity. For example, the number of expensive operations used by
       * the expression and how close the expression is to reaching the [complexity
       * limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions).
       * Useful when designing and debugging your expressions.
       */
      expand?: string;
      /**
       * The Jira expression and the evaluation context.
       *
       * @example
       * {
       *   "context": {
       *     "board": 10100,
       *     "custom": {
       *       "config": {
       *         "type": "json",
       *         "value": {
       *           "userId": "10002"
       *         }
       *       },
       *       "issuesList": [
       *         {
       *           "key": "ACJIRA-1471",
       *           "type": "issue"
       *         },
       *         {
       *           "id": 100001,
       *           "type": "issue"
       *         }
       *       ],
       *       "myUser": {
       *         "accountId": "100001",
       *         "type": "user"
       *       },
       *       "nullField": {
       *         "type": "json"
       *       }
       *     },
       *     "customerRequest": 1450,
       *     "issue": {
       *       "key": "ACJIRA-1470"
       *     },
       *     "issues": {
       *       "jql": {
       *         "maxResults": 100,
       *         "nextPageToken": "EgQIlMIC",
       *         "query": "project = HSP"
       *       }
       *     },
       *     "project": {
       *       "key": "ACJIRA"
       *     },
       *     "serviceDesk": 10023,
       *     "sprint": 10001
       *   },
       *   "expression": "{ key: issue.key, type: issue.issueType.name, links: issue.links.map(link => link.linkedIssue.id), listCustomVariable: issuesList.includes(issue), customVariables: myUser.accountId == config.userId}"
       * }
       */
      jiraExpressionEvaluateRequestBean: JiraExpressionEvaluateRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<JexpEvaluateJiraExpressionResultBean>> => {
      return jiraRequest<JexpEvaluateJiraExpressionResultBean>({
        path: "/rest/api/3/expression/evaluate",
        method: "POST",
        queryParams: {
          expand
        },
        body: JSON.stringify(jiraExpressionEvaluateRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
