import type {
  JqlReferenceData,
  SearchAutoCompleteFilter,
  AutoCompleteSuggestions,
  JqlQueriesToParse,
  ParsedJqlQueries,
  JqlPersonalDataMigrationRequest,
  ConvertedJqlQueries,
  JqlQueriesToSanitize,
  SanitizedJqlQueries,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents JQL search auto-complete details. Use it to obtain JQL
 * search auto-complete data and suggestions for use in programmatic construction
 * of queries or custom query builders. It also provides operations to:
 *
 *  *  convert one or more JQL queries with user identifiers (username or user
 * key) to equivalent JQL queries with account IDs.
 *  *  convert readable details in one or more JQL queries to IDs where a user
 * doesn't have permission to view the entity whose details are readable.
 */
export default function jql<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns reference data for JQL searches. This is a downloadable version of the
     * documentation provided in [Advanced searching - fields
     * reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching -
     * functions reference](https://confluence.atlassian.com/x/hgORLQ), along with a
     * list of JQL-reserved words. Use this information to assist with the
     * programmatic creation of JQL queries or the validation of queries built in a
     * custom query builder.
     *
     * To filter visible field details by project or collapse non-unique fields by
     * field type then [Get field reference data
     * (POST)](#api-rest-api-3-jql-autocompletedata-post) can be used.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "jqlReservedWords": [
     *     "empty",
     *     "and",
     *     "or",
     *     "in",
     *     "distinct"
     *   ],
     *   "visibleFieldNames": [
     *     {
     *       "displayName": "summary",
     *       "operators": [
     *         "~",
     *         "!~",
     *         "is",
     *         "is not"
     *       ],
     *       "orderable": "true",
     *       "searchable": "true",
     *       "types": [
     *         "java.lang.String"
     *       ],
     *       "value": "summary"
     *     },
     *     {
     *       "auto": "true",
     *       "cfid": "cf[10880]",
     *       "displayName": "Sprint - cf[10880]",
     *       "operators": [
     *         "=",
     *         "!=",
     *         "in",
     *         "not in",
     *         "is",
     *         "is not"
     *       ],
     *       "orderable": "true",
     *       "searchable": "true",
     *       "types": [
     *         "com.atlassian.greenhopper.service.sprint.Sprint"
     *       ],
     *       "value": "Sprint"
     *     }
     *   ],
     *   "visibleFunctionNames": [
     *     {
     *       "displayName": "standardIssueTypes()",
     *       "isList": "true",
     *       "types": [
     *         "com.atlassian.jira.issue.issuetype.IssueType"
     *       ],
     *       "value": "standardIssueTypes()"
     *     },
     *     {
     *       "displayName": "issuesWithText()",
     *       "supportsListAndSingleValueOperators": "true",
     *       "types": [
     *         "com.atlassian.jira.issue.issuetype.IssueType"
     *       ],
     *       "value": "issuesWithText()"
     *     }
     *   ]
     * }
     * ```
     */
    getAutoComplete: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<JqlReferenceData>
    > => {
      return jiraRequest<JqlReferenceData>({
        path: "/rest/api/3/jql/autocompletedata",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns reference data for JQL searches. This is a downloadable version of the
     * documentation provided in [Advanced searching - fields
     * reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching -
     * functions reference](https://confluence.atlassian.com/x/hgORLQ), along with a
     * list of JQL-reserved words. Use this information to assist with the
     * programmatic creation of JQL queries or the validation of queries built in a
     * custom query builder.
     *
     * This operation can filter the custom fields returned by project. Invalid
     * project IDs in `projectIds` are ignored. System fields are always returned.
     *
     * It can also return the collapsed field for custom fields. Collapsed fields
     * enable searches to be performed across all fields with the same name and of the
     * same field type. For example, the collapsed field `Component -
     * Component[Dropdown]` enables dropdown fields `Component - cf[10061]` and
     * `Component - cf[10062]` to be searched simultaneously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "jqlReservedWords": [
     *     "empty",
     *     "and",
     *     "or",
     *     "in",
     *     "distinct"
     *   ],
     *   "visibleFieldNames": [
     *     {
     *       "displayName": "summary",
     *       "operators": [
     *         "~",
     *         "!~",
     *         "is",
     *         "is not"
     *       ],
     *       "orderable": "true",
     *       "searchable": "true",
     *       "types": [
     *         "java.lang.String"
     *       ],
     *       "value": "summary"
     *     },
     *     {
     *       "auto": "true",
     *       "cfid": "cf[10061]",
     *       "displayName": "Component - cf[10061]",
     *       "operators": [
     *         "=",
     *         "!=",
     *         "in",
     *         "not in",
     *         "is",
     *         "is not"
     *       ],
     *       "orderable": "true",
     *       "types": [
     *         "com.atlassian.jira.issue.customfields.option.Option"
     *       ],
     *       "value": "cf[10061]"
     *     },
     *     {
     *       "auto": "true",
     *       "cfid": "cf[10062]",
     *       "displayName": "Component - cf[10062]",
     *       "operators": [
     *         "=",
     *         "!=",
     *         "in",
     *         "not in",
     *         "is",
     *         "is not"
     *       ],
     *       "orderable": "true",
     *       "types": [
     *         "com.atlassian.jira.issue.customfields.option.Option"
     *       ],
     *       "value": "cf[10062]"
     *     },
     *     {
     *       "auto": "true",
     *       "displayName": "Component - Component[Dropdown]",
     *       "operators": [
     *         "=",
     *         "!=",
     *         "in",
     *         "not in",
     *         "is",
     *         "is not"
     *       ],
     *       "searchable": "true",
     *       "types": [
     *         "com.atlassian.jira.issue.customfields.option.Option"
     *       ],
     *       "value": "\"Component[Dropdown]\""
     *     }
     *   ],
     *   "visibleFunctionNames": [
     *     {
     *       "displayName": "standardIssueTypes()",
     *       "isList": "true",
     *       "types": [
     *         "com.atlassian.jira.issue.issuetype.IssueType"
     *       ],
     *       "value": "standardIssueTypes()"
     *     }
     *   ]
     * }
     * ```
     */
    getAutoCompletePost: async ({
      searchAutoCompleteFilter,
      opts
    }: {
      /**
       * @example
       * {
       *   "includeCollapsedFields": true,
       *   "projectIds": [
       *     10000,
       *     10001,
       *     10002
       *   ]
       * }
       */
      searchAutoCompleteFilter: SearchAutoCompleteFilter;
    } & WithRequestOpts<TClient>): Promise<JiraResult<JqlReferenceData>> => {
      return jiraRequest<JqlReferenceData>({
        path: "/rest/api/3/jql/autocompletedata",
        method: "POST",
        body: JSON.stringify(searchAutoCompleteFilter),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the JQL search auto complete suggestions for a field.
     *
     * Suggestions can be obtained by providing:
     *
     *  *  `fieldName` to get a list of all values for the field.
     *  *  `fieldName` and `fieldValue` to get a list of values containing the text in
     * `fieldValue`.
     *  *  `fieldName` and `predicateName` to get a list of all predicate values for
     * the field.
     *  *  `fieldName`, `predicateName`, and `predicateValue` to get a list of
     * predicate values containing the text in `predicateValue`.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "results": [
     *     {
     *       "displayName": "<b>Ac</b>tiveObjects (AO)",
     *       "value": "ActiveObjects"
     *     },
     *     {
     *       "displayName": "Atlassian Connect (<b>AC</b>)",
     *       "value": "Atlassian Connect"
     *     },
     *     {
     *       "displayName": "Atlassian Connect in Jira (<b>AC</b>JIRA)",
     *       "value": "Atlassian Connect in Jira"
     *     }
     *   ]
     * }
     * ```
     */
    getFieldAutoCompleteForQueryString: async ({
      fieldName,
      fieldValue,
      predicateName,
      predicateValue,
      opts
    }: {
      /** The name of the field. */
      fieldName?: string;
      /** The partial field item name entered by the user. */
      fieldValue?: string;
      /**
       * The name of the [ CHANGED operator
       * predicate](https://confluence.atlassian.com/x/hQORLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED)
       * for which the suggestions are generated. The valid predicate operators are
       * *by*, *from*, and *to*.
       */
      predicateName?: string;
      /** The partial predicate item name entered by the user. */
      predicateValue?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<AutoCompleteSuggestions>> => {
      return jiraRequest<AutoCompleteSuggestions>({
        path: "/rest/api/3/jql/autocompletedata/suggestions",
        method: "GET",
        queryParams: {
          fieldName,
          fieldValue,
          predicateName,
          predicateValue
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Converts one or more JQL queries with user identifiers (username or user key)
     * to equivalent JQL queries with account IDs.
     *
     * You may wish to use this operation if your system stores JQL queries and you
     * want to make them GDPR-compliant. For more information about GDPR-related
     * changes, see the [migration
     * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful. Note that the JQL queries are returned in the same order that they were passed.
     *
     * example:
     * ```
     * {
     *   "queriesWithUnknownUsers": [
     *     {
     *       "convertedQuery": "assignee = unknown",
     *       "originalQuery": "assignee = mia"
     *     }
     *   ],
     *   "queryStrings": [
     *     "issuetype = Bug AND assignee in (abcde-12345) AND reporter in (abc551-c4e99) order by lastViewed DESC"
     *   ]
     * }
     * ```
     */
    migrateQueries: async ({
      jqlPersonalDataMigrationRequest,
      opts
    }: {
      /**
       * @example
       * {
       *   "queryStrings": [
       *     "assignee = mia",
       *     "issuetype = Bug AND assignee in (mia) AND reporter in (alana) order by lastViewed DESC"
       *   ]
       * }
       */
      jqlPersonalDataMigrationRequest: JqlPersonalDataMigrationRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ConvertedJqlQueries>> => {
      return jiraRequest<ConvertedJqlQueries>({
        path: "/rest/api/3/jql/pdcleaner",
        method: "POST",
        body: JSON.stringify(jqlPersonalDataMigrationRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Parses and validates JQL queries.
     *
     * Validation is performed in context of the current user.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "queries": [
     *     {
     *       "query": "summary ~ test AND (labels in (urgent, blocker) OR lastCommentedBy = currentUser()) AND status CHANGED AFTER -5d ORDER BY updated DESC",
     *       "structure": {
     *         "orderBy": {
     *           "fields": [
     *             {
     *               "direction": "desc",
     *               "field": {
     *                 "encodedName": "updated",
     *                 "name": "updated"
     *               }
     *             }
     *           ]
     *         },
     *         "where": {
     *           "clauses": [
     *             {
     *               "field": {
     *                 "encodedName": "summary",
     *                 "name": "summary"
     *               },
     *               "operand": {
     *                 "encodedValue": "test",
     *                 "value": "test"
     *               },
     *               "operator": "~"
     *             },
     *             {
     *               "clauses": [
     *                 {
     *                   "field": {
     *                     "encodedName": "labels",
     *                     "name": "labels"
     *                   },
     *                   "operand": {
     *                     "encodedOperand": "urgent, blocker)",
     *                     "values": [
     *                       {
     *                         "encodedValue": "urgent",
     *                         "value": "urgent"
     *                       },
     *                       {
     *                         "encodedValue": "blocker",
     *                         "value": "blocker"
     *                       }
     *                     ]
     *                   },
     *                   "operator": "in"
     *                 },
     *                 {
     *                   "field": {
     *                     "encodedName": "lastCommentedBy",
     *                     "name": "lastCommentedBy",
     *                     "property": [
     *                       {
     *                         "entity": "issue",
     *                         "key": "propertyKey",
     *                         "path": "path.in.property",
     *                         "type": "user"
     *                       }
     *                     ]
     *                   },
     *                   "operand": {
     *                     "arguments": [],
     *                     "encodedOperand": "currentUser()",
     *                     "function": "currentUser"
     *                   },
     *                   "operator": "="
     *                 }
     *               ],
     *               "operator": "or"
     *             },
     *             {
     *               "field": {
     *                 "encodedName": "status",
     *                 "name": "status"
     *               },
     *               "operator": "changed",
     *               "predicates": [
     *                 {
     *                   "operand": {
     *                     "arguments": [
     *                       "-1M"
     *                     ],
     *                     "encodedOperand": "startOfMonth(-1M)",
     *                     "function": "startOfMonth"
     *                   },
     *                   "operator": "after"
     *                 }
     *               ]
     *             }
     *           ],
     *           "operator": "and"
     *         }
     *       }
     *     },
     *     {
     *       "query": "issue.property[\"spaces here\"].value in (\"Service requests\", Incidents)",
     *       "structure": {
     *         "where": {
     *           "field": {
     *             "encodedName": "issue.property[\"spaces here\"].value",
     *             "name": "issue.property[spaces here].value",
     *             "property": [
     *               {
     *                 "entity": "issue",
     *                 "key": "spaces here",
     *                 "path": "value"
     *               }
     *             ]
     *           },
     *           "operand": {
     *             "encodedOperand": "(\"Service requests\", Incidents)",
     *             "values": [
     *               {
     *                 "encodedValue": "\"Service requests\"",
     *                 "value": "Service requests"
     *               },
     *               {
     *                 "encodedValue": "Incidents",
     *                 "value": "Incidents"
     *               }
     *             ]
     *           },
     *           "operator": "in"
     *         }
     *       }
     *     },
     *     {
     *       "errors": [
     *         "Error in the JQL Query: Expecting operator but got 'query'. The valid operators are '=', '!=', '<', '>', '<=', '>=', '~', '!~', 'IN', 'NOT IN', 'IS' and 'IS NOT'. (line 1, character 9)"
     *       ],
     *       "query": "invalid query"
     *     },
     *     {
     *       "errors": [
     *         "The operator '=' is not supported by the 'summary' field."
     *       ],
     *       "query": "summary = test"
     *     },
     *     {
     *       "errors": [
     *         "Operator 'in' does not support the non-list value '\"test\"' for field 'summary'."
     *       ],
     *       "query": "summary in test"
     *     },
     *     {
     *       "query": "project = INVALID",
     *       "warnings": [
     *         "The value 'INVALID' does not exist for the field 'project'."
     *       ]
     *     },
     *     {
     *       "errors": [
     *         "Field 'universe' does not exist or you do not have permission to view it."
     *       ],
     *       "query": "universe = 42"
     *     }
     *   ]
     * }
     * ```
     */
    parseJqlQueries: async ({
      validation,
      jqlQueriesToParse,
      opts
    }: {
      /**
       * How to validate the JQL query and treat the validation results. Validation
       * options include:
       *
       *  *  `strict` Returns all errors. If validation fails, the query structure is
       * not returned.
       *  *  `warn` Returns all errors. If validation fails but the JQL query is
       * correctly formed, the query structure is returned.
       *  *  `none` No validation is performed. If JQL query is correctly formed, the
       * query structure is returned.
       */
      validation: "strict" | "warn" | "none";
      /**
       * @example
       * {
       *   "queries": [
       *     "summary ~ test AND (labels in (urgent, blocker) OR lastCommentedBy = currentUser()) AND status CHANGED AFTER startOfMonth(-1M) ORDER BY updated DESC",
       *     "issue.property[\"spaces here\"].value in (\"Service requests\", Incidents)",
       *     "invalid query",
       *     "summary = test",
       *     "summary in test",
       *     "project = INVALID",
       *     "universe = 42"
       *   ]
       * }
       */
      jqlQueriesToParse: JqlQueriesToParse;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ParsedJqlQueries>> => {
      return jiraRequest<ParsedJqlQueries>({
        path: "/rest/api/3/jql/parse",
        method: "POST",
        queryParams: {
          validation
        },
        body: JSON.stringify(jqlQueriesToParse),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sanitizes one or more JQL queries by converting readable details into IDs where
     * a user doesn't have permission to view the entity.
     *
     * For example, if the query contains the clause *project = 'Secret project'*, and
     * a user does not have browse permission for the project "Secret project", the
     * sanitized query replaces the clause with *project = 12345"* (where 12345 is the
     * ID of the project). If a user has the required permission, the clause is not
     * sanitized. If the account ID is null, sanitizing is performed for an anonymous
     * user.
     *
     * Note that sanitization doesn't make the queries GDPR-compliant, because it
     * doesn't remove user identifiers (username or user key). If you need to make
     * queries GDPR-compliant, use [Convert user identifiers to account IDs in JQL
     * queries](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-rest-api-3-jql-sanitize-post).
     *
     * Before sanitization each JQL query is parsed. The queries are returned in the
     * same order that they were passed.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "queries": [
     *     {
     *       "initialQuery": "project = 'Sample project'",
     *       "sanitizedQuery": "project = 12345"
     *     },
     *     {
     *       "initialQuery": "project = 'Sample project'",
     *       "sanitizedQuery": "project = 'Sample project'",
     *       "accountId": "5b10ac8d82e05b22cc7d4ef5"
     *     },
     *     {
     *       "initialQuery": "project = 'Sample project'",
     *       "sanitizedQuery": "project = 12345",
     *       "accountId": "cda2aa1395ac195d951b3387"
     *     },
     *     {
     *       "initialQuery": "non-parsable query",
     *       "errors": {
     *         "errorMessages": [
     *           "Error in the JQL Query: Expecting operator but got 'query'. The valid operators are '=', '!=', '<', '>', '<=', '>=', '~', '!~', 'IN', 'NOT IN', 'IS' and 'IS NOT'. (line 1, character 9)"
     *         ],
     *         "errors": {}
     *       },
     *       "accountId": "5b10ac8d82e05b22cc7d4ef5"
     *     }
     *   ]
     * }
     * ```
     */
    sanitiseJqlQueries: async ({
      jqlQueriesToSanitize,
      opts
    }: {
      /**
       * @example
       * {
       *   "queries": [
       *     {
       *       "query": "project = 'Sample project'"
       *     },
       *     {
       *       "accountId": "5b10ac8d82e05b22cc7d4ef5",
       *       "query": "project = 'Sample project'"
       *     },
       *     {
       *       "accountId": "cda2aa1395ac195d951b3387",
       *       "query": "project = 'Sample project'"
       *     },
       *     {
       *       "accountId": "5b10ac8d82e05b22cc7d4ef5",
       *       "query": "invalid query"
       *     }
       *   ]
       * }
       */
      jqlQueriesToSanitize: JqlQueriesToSanitize;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SanitizedJqlQueries>> => {
      return jiraRequest<SanitizedJqlQueries>({
        path: "/rest/api/3/jql/sanitize",
        method: "POST",
        body: JSON.stringify(jqlQueriesToSanitize),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
