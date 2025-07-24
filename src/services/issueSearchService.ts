import type {
  IssuePickerSuggestions,
  IssuesAndJqlQueries,
  IssueMatches,
  SearchResults,
  SearchRequestBean,
  JqlCountRequestBean,
  JqlCountResultsBean,
  SearchAndReconcileResults,
  SearchAndReconcileRequestBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult,
  IssueFieldKeys,
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents various ways to search for issues. Use it to search
 * for issues with a JQL query and find issues to populate an issue picker.
 */
export default function issueSearch<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Provide an estimated count of the issues that match the
     * [JQL](https://confluence.atlassian.com/x/egORLQ). Recent updates might not be
     * immediately visible in the returned output. This endpoint requires JQL to be
     * bounded.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Issues are included in the response
     * where the user has:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "count": 153
     * }
     * ```
     */
    countIssues: async ({
      jqlCountRequestBean,
      opts,
    }: {
      /**
       * A JSON object containing the search request.
       *
       * @example
       * {
       *   "jql": "project = HSP"
       * }
       */
      jqlCountRequestBean: JqlCountRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<JqlCountResultsBean>> => {
      return jiraRequest<JqlCountResultsBean>({
        path: "/rest/api/3/search/approximate-count",
        method: "POST",
        body: JSON.stringify(jqlCountRequestBean),
        config,
        opts,
        isResponseAvailable: true,
      });
    },

    /**
     * Returns lists of issues matching a query string. Use this resource to provide
     * auto-completion suggestions when the user is looking for an issue using a word
     * or string.
     *
     * This operation returns two lists:
     *
     *  *  `History Search` which includes issues from the user's history of created,
     * edited, or viewed issues that contain the string in the `query` parameter.
     *  *  `Current Search` which includes issues that match the JQL expression in
     * `currentJQL` and contain the string in the `query` parameter.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     */
    getIssuePickerResource: async ({
      query,
      currentJql,
      currentIssueKey,
      currentProjectId,
      showSubTasks,
      showSubTaskParent,
      opts,
    }: {
      /**
       * A string to match against text fields in the issue such as title, description,
       * or comments.
       */
      query?: string;
      /**
       * A JQL query defining a list of issues to search for the query term. Note that
       * `username` and `userkey` cannot be used as search terms for this parameter, due
       * to privacy reasons. Use `accountId` instead.
       */
      currentJql?: string;
      /**
       * The key of an issue to exclude from search results. For example, the issue the
       * user is viewing when they perform this query.
       */
      currentIssueKey?: string;
      /** The ID of a project that suggested issues must belong to. */
      currentProjectId?: string;
      /** Indicate whether to include subtasks in the suggestions list. */
      showSubTasks?: boolean;
      /**
       * When `currentIssueKey` is a subtask, whether to include the parent issue in the
       * suggestions if it matches the query.
       */
      showSubTaskParent?: boolean;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<IssuePickerSuggestions>> => {
      return jiraRequest<IssuePickerSuggestions>({
        path: "/rest/api/3/issue/picker",
        method: "GET",
        queryParams: {
          query,
          currentJQL: currentJql,
          currentIssueKey,
          currentProjectId,
          showSubTasks,
          showSubTaskParent,
        },
        config,
        opts,
        isResponseAvailable: true,
      });
    },

    /**
     * Checks whether one or more issues would be returned by one or more JQL queries.
     *
     * **[Permissions](#permissions) required:** None, however, issues are only
     * matched against JQL queries where the user has:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "matches": [
     *     {
     *       "matchedIssues": [
     *         10000,
     *         10004
     *       ],
     *       "errors": []
     *     },
     *     {
     *       "matchedIssues": [
     *         100134,
     *         10025,
     *         10236
     *       ],
     *       "errors": []
     *     },
     *     {
     *       "matchedIssues": [],
     *       "errors": []
     *     },
     *     {
     *       "matchedIssues": [],
     *       "errors": [
     *         "Invalid JQL: broken = value"
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    matchIssues: async ({
      issuesAndJqlQueries,
      opts,
    }: {
      /**
       * @example
       * {
       *   "issueIds": [
       *     10001,
       *     1000,
       *     10042
       *   ],
       *   "jqls": [
       *     "project = FOO",
       *     "issuetype = Bug",
       *     "summary ~ \"some text\" AND project in (FOO, BAR)"
       *   ]
       * }
       */
      issuesAndJqlQueries: IssuesAndJqlQueries;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueMatches>> => {
      return jiraRequest<IssueMatches>({
        path: "/rest/api/3/jql/match",
        method: "POST",
        body: JSON.stringify(issuesAndJqlQueries),
        config,
        opts,
        isResponseAvailable: true,
      });
    },

    /**
     * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
     * Recent updates might not be immediately visible in the returned search results.
     * If you need
     * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/)
     * consistency, you can utilize the `reconcileIssues` parameter to ensure stronger
     * consistency assurances. This operation can be accessed anonymously.
     *
     * If the JQL query expression is too large to be encoded as a query parameter,
     * use the [POST](#api-rest-api-3-search-post) version of this resource.
     *
     * **[Permissions](#permissions) required:** Issues are included in the response
     * where the user has:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "watcher": {
     *           "isWatching": false,
     *           "self": "https://your-domain.atlassian.net/rest/api/3/issue/EX-1/watchers",
     *           "watchCount": 1
     *         },
     *         "attachment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "accountType": "atlassian",
     *               "active": false,
     *               "avatarUrls": {
     *                 "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *                 "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *                 "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *                 "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *               },
     *               "displayName": "Mia Krystof",
     *               "key": "",
     *               "name": "",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "content": "https://your-domain.atlassian.net/jira/rest/api/3/attachment/content/10001",
     *             "created": "2023-06-24T19:24:50.000+0000",
     *             "filename": "debuglog.txt",
     *             "id": 10001,
     *             "mimeType": "text/plain",
     *             "self": "https://your-domain.atlassian.net/rest/api/2/attachments/10001",
     *             "size": 2460
     *           }
     *         ],
     *         "sub-tasks": [
     *           {
     *             "id": "10000",
     *             "outwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10003",
     *               "key": "ED-2",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/ED-2"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "Parent",
     *               "name": "",
     *               "outward": "Sub-task"
     *             }
     *           }
     *         ],
     *         "description": "Main order flow broken",
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.",
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "issuelinks": [
     *           {
     *             "id": "10001",
     *             "outwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10004L",
     *               "key": "PR-2",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-2"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "depends on",
     *               "name": "Dependent",
     *               "outward": "is depended by"
     *             }
     *           },
     *           {
     *             "id": "10002",
     *             "inwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10004",
     *               "key": "PR-3",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-3"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "depends on",
     *               "name": "Dependent",
     *               "outward": "is depended by"
     *             }
     *           }
     *         ],
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": "I did some work here.",
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10002",
     *       "key": "ED-1",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issue/10002"
     *     }
     *   ]
     * }
     * ```
     */
    searchAndReconsileIssuesUsingJql: async ({
      jql,
      nextPageToken,
      maxResults,
      fields,
      expand,
      properties,
      fieldsByKeys,
      failFast,
      reconcileIssues,
      opts,
    }: {
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
       * The token for a page to fetch that is not the first page. The first page has a
       * `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of
       * issues.
       *
       * Note: The `nextPageToken` field is **not included** in the response for the
       * last page, indicating there is no next page.
       */
      nextPageToken?: string;
      /**
       * The maximum number of items to return per page. To manage page size, API may
       * return fewer items per page where a large number of fields or properties are
       * requested. The greatest number of items returned per page is achieved when
       * requesting `id` or `key` only. It returns max 5000 issues.
       */
      maxResults?: number;
      /**
       * A list of fields to return for each issue, use it to retrieve a subset of
       * fields. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `*all` Returns all fields.
       *  *  `*navigable` Returns navigable fields.
       *  *  `id` Returns only issue IDs.
       *  *  Any issue field, prefixed with a minus to exclude.
       *
       * The default is `id`.
       *
       * Examples:
       *
       *  *  `summary,comment` Returns only the summary and comments fields only.
       *  *  `-description` Returns all navigable (default) fields except description.
       *  *  `*all,-comment` Returns all fields except comments.
       *
       * Multiple `fields` parameters can be included in a request.
       *
       * Note: By default, this resource returns IDs only. This differs from [GET
       * issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.
       */
      fields?: IssueFieldKeys;
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
       * A list of up to 5 issue properties to include in the results. This parameter
       * accepts a comma-separated list.
       */
      properties?: string[];
      /** Reference fields by their key (rather than ID). The default is `false`. */
      fieldsByKeys?: boolean;
      /** Fail this request early if we can't retrieve all field data. */
      failFast?: boolean;
      /**
       * Strong consistency issue ids to be reconciled with search results. Accepts max
       * 50 ids
       */
      reconcileIssues?: number[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<SearchAndReconcileResults>> => {
      return jiraRequest<SearchAndReconcileResults>({
        path: "/rest/api/3/search/jql",
        method: "GET",
        queryParams: {
          jql,
          nextPageToken,
          maxResults,
          fields,
          expand,
          properties,
          fieldsByKeys,
          failFast,
          reconcileIssues,
        },
        config,
        opts,
        isResponseAvailable: true,
      });
    },

    /**
     * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
     * Recent updates might not be immediately visible in the returned search results.
     * If you need
     * [read-after-write](https://developer.atlassian.com/cloud/jira/platform/search-and-reconcile/)
     * consistency, you can utilize the `reconcileIssues` parameter to ensure stronger
     * consistency assurances. This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Issues are included in the response
     * where the user has:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "watcher": {
     *           "isWatching": false,
     *           "self": "https://your-domain.atlassian.net/rest/api/3/issue/EX-1/watchers",
     *           "watchCount": 1
     *         },
     *         "attachment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "accountType": "atlassian",
     *               "active": false,
     *               "avatarUrls": {
     *                 "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *                 "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *                 "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *                 "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *               },
     *               "displayName": "Mia Krystof",
     *               "key": "",
     *               "name": "",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "content": "https://your-domain.atlassian.net/jira/rest/api/3/attachment/content/10001",
     *             "created": "2023-06-24T19:24:50.000+0000",
     *             "filename": "debuglog.txt",
     *             "id": 10001,
     *             "mimeType": "text/plain",
     *             "self": "https://your-domain.atlassian.net/rest/api/2/attachments/10001",
     *             "size": 2460
     *           }
     *         ],
     *         "sub-tasks": [
     *           {
     *             "id": "10000",
     *             "outwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10003",
     *               "key": "ED-2",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/ED-2"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "Parent",
     *               "name": "",
     *               "outward": "Sub-task"
     *             }
     *           }
     *         ],
     *         "description": "Main order flow broken",
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.",
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "issuelinks": [
     *           {
     *             "id": "10001",
     *             "outwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10004L",
     *               "key": "PR-2",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-2"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "depends on",
     *               "name": "Dependent",
     *               "outward": "is depended by"
     *             }
     *           },
     *           {
     *             "id": "10002",
     *             "inwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10004",
     *               "key": "PR-3",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-3"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "depends on",
     *               "name": "Dependent",
     *               "outward": "is depended by"
     *             }
     *           }
     *         ],
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": "I did some work here.",
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10002",
     *       "key": "ED-1",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issue/10002"
     *     }
     *   ]
     * }
     * ```
     */
    searchAndReconsileIssuesUsingJqlPost: async ({
      expand,
      fields,
      fieldsByKeys,
      jql,
      maxResults,
      nextPageToken,
      properties,
      reconcileIssues,
      opts,
    }: SearchAndReconcileRequestBean & WithRequestOpts<TClient>): Promise<
      JiraResult<SearchAndReconcileResults>
    > => {
      return jiraRequest<SearchAndReconcileResults>({
        path: "/rest/api/3/search/jql",
        method: "POST",
        body: JSON.stringify({
          expand,
          fields,
          fieldsByKeys,
          jql,
          maxResults,
          nextPageToken,
          properties,
          reconcileIssues,
        }),
        config,
        opts,
        isResponseAvailable: true,
      });
    },

    /**
     * Endpoint is currently being removed. [More
     * details](https://developer.atlassian.com/changelog/#CHANGE-2046)
     *
     * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
     *
     * If the JQL query expression is too large to be encoded as a query parameter,
     * use the [POST](#api-rest-api-3-search-post) version of this resource.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Issues are included in the response
     * where the user has:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @deprecated
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "expand": "names,schema",
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "watcher": {
     *           "isWatching": false,
     *           "self": "https://your-domain.atlassian.net/rest/api/3/issue/EX-1/watchers",
     *           "watchCount": 1
     *         },
     *         "attachment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "accountType": "atlassian",
     *               "active": false,
     *               "avatarUrls": {
     *                 "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *                 "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *                 "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *                 "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *               },
     *               "displayName": "Mia Krystof",
     *               "key": "",
     *               "name": "",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "content": "https://your-domain.atlassian.net/jira/rest/api/3/attachment/content/10000",
     *             "created": "2022-10-06T07:32:47.000+0000",
     *             "filename": "picture.jpg",
     *             "id": 10000,
     *             "mimeType": "image/jpeg",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/attachments/10000",
     *             "size": 23123,
     *             "thumbnail": "https://your-domain.atlassian.net/jira/rest/api/3/attachment/thumbnail/10000"
     *           }
     *         ],
     *         "sub-tasks": [
     *           {
     *             "id": "10000",
     *             "outwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10003",
     *               "key": "ED-2",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/ED-2"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "Parent",
     *               "name": "",
     *               "outward": "Sub-task"
     *             }
     *           }
     *         ],
     *         "description": {
     *           "type": "doc",
     *           "version": 1,
     *           "content": [
     *             {
     *               "type": "paragraph",
     *               "content": [
     *                 {
     *                   "type": "text",
     *                   "text": "Main order flow broken"
     *                 }
     *               ]
     *             }
     *           ]
     *         },
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "issuelinks": [
     *           {
     *             "id": "10001",
     *             "outwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10004L",
     *               "key": "PR-2",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-2"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "depends on",
     *               "name": "Dependent",
     *               "outward": "is depended by"
     *             }
     *           },
     *           {
     *             "id": "10002",
     *             "inwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10004",
     *               "key": "PR-3",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-3"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "depends on",
     *               "name": "Dependent",
     *               "outward": "is depended by"
     *             }
     *           }
     *         ],
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "I did some work here."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10002",
     *       "key": "ED-1",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issue/10002"
     *     }
     *   ],
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1,
     *   "warningMessages": [
     *     "The value 'bar' does not exist for the field 'foo'."
     *   ]
     * }
     * ```
     */
    searchForIssuesUsingJql: async ({
      jql,
      startAt,
      maxResults,
      validateQuery,
      fields,
      expand,
      properties,
      fieldsByKeys,
      failFast,
      opts,
    }: {
      /**
       * The [JQL](https://confluence.atlassian.com/x/egORLQ) that defines the search.
       * Note:
       *
       *  *  If no JQL expression is provided, all issues are returned.
       *  *  `username` and `userkey` cannot be used as search terms due to privacy
       * reasons. Use `accountId` instead.
       *  *  If a user has hidden their email address in their user profile, partial
       * matches of the email address will not find the user. An exact match is required.
       */
      jql?: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /**
       * The maximum number of items to return per page. To manage page size, Jira may
       * return fewer items per page where a large number of fields or properties are
       * requested. The greatest number of items returned per page is achieved when
       * requesting `id` or `key` only.
       */
      maxResults?: number;
      /**
       * Determines how to validate the JQL query and treat the validation results.
       * Supported values are:
       *
       *  *  `strict` Returns a 400 response code if any errors are found, along with a
       * list of all errors (and warnings).
       *  *  `warn` Returns all errors as warnings.
       *  *  `none` No validation is performed.
       *  *  `true` *Deprecated* A legacy synonym for `strict`.
       *  *  `false` *Deprecated* A legacy synonym for `warn`.
       *
       * Note: If the JQL is not correctly formed a 400 response code is returned,
       * regardless of the `validateQuery` value.
       */
      validateQuery?: "strict" | "warn" | "none" | "true" | "false";
      /**
       * A list of fields to return for each issue, use it to retrieve a subset of
       * fields. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `*all` Returns all fields.
       *  *  `*navigable` Returns navigable fields.
       *  *  Any issue field, prefixed with a minus to exclude.
       *
       * Examples:
       *
       *  *  `summary,comment` Returns only the summary and comments fields.
       *  *  `-description` Returns all navigable (default) fields except description.
       *  *  `*all,-comment` Returns all fields except comments.
       *
       * This parameter may be specified multiple times. For example,
       * `fields=field1,field2&fields=field3`.
       *
       * Note: All navigable fields are returned by default. This differs from [GET
       * issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.
       */
      fields?: IssueFieldKeys;
      /**
       * Use [expand](#expansion) to include additional information about issues in the
       * response. This parameter accepts a comma-separated list. Expand options include:
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
      expand?: string;
      /**
       * A list of issue property keys for issue properties to include in the results.
       * This parameter accepts a comma-separated list. Multiple properties can also be
       * provided using an ampersand separated list. For example,
       * `properties=prop1,prop2&properties=prop3`. A maximum of 5 issue property keys
       * can be specified.
       */
      properties?: string[];
      /** Reference fields by their key (rather than ID). */
      fieldsByKeys?: boolean;
      /**
       * Whether to fail the request quickly in case of an error while loading fields
       * for an issue. For `failFast=true`, if one field fails, the entire operation
       * fails. For `failFast=false`, the operation will continue even if a field fails.
       * It will return a valid response, but without values for the failed field(s).
       */
      failFast?: boolean;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<SearchResults>> => {
      return jiraRequest<SearchResults>({
        path: "/rest/api/3/search",
        method: "GET",
        queryParams: {
          jql,
          startAt,
          maxResults,
          validateQuery,
          fields,
          expand,
          properties,
          fieldsByKeys,
          failFast,
        },
        config,
        opts,
        isResponseAvailable: true,
      });
    },

    /**
     * Endpoint is currently being removed. [More
     * details](https://developer.atlassian.com/changelog/#CHANGE-2046)
     *
     * Searches for issues using [JQL](https://confluence.atlassian.com/x/egORLQ).
     *
     * There is a [GET](#api-rest-api-3-search-get) version of this resource that can
     * be used for smaller JQL query expressions.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Issues are included in the response
     * where the user has:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @deprecated
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "expand": "names,schema",
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "watcher": {
     *           "isWatching": false,
     *           "self": "https://your-domain.atlassian.net/rest/api/3/issue/EX-1/watchers",
     *           "watchCount": 1
     *         },
     *         "attachment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "accountType": "atlassian",
     *               "active": false,
     *               "avatarUrls": {
     *                 "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *                 "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *                 "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *                 "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *               },
     *               "displayName": "Mia Krystof",
     *               "key": "",
     *               "name": "",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "content": "https://your-domain.atlassian.net/jira/rest/api/3/attachment/content/10000",
     *             "created": "2022-10-06T07:32:47.000+0000",
     *             "filename": "picture.jpg",
     *             "id": 10000,
     *             "mimeType": "image/jpeg",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/attachments/10000",
     *             "size": 23123,
     *             "thumbnail": "https://your-domain.atlassian.net/jira/rest/api/3/attachment/thumbnail/10000"
     *           }
     *         ],
     *         "sub-tasks": [
     *           {
     *             "id": "10000",
     *             "outwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10003",
     *               "key": "ED-2",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/ED-2"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "Parent",
     *               "name": "",
     *               "outward": "Sub-task"
     *             }
     *           }
     *         ],
     *         "description": {
     *           "type": "doc",
     *           "version": 1,
     *           "content": [
     *             {
     *               "type": "paragraph",
     *               "content": [
     *                 {
     *                   "type": "text",
     *                   "text": "Main order flow broken"
     *                 }
     *               ]
     *             }
     *           ]
     *         },
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "issuelinks": [
     *           {
     *             "id": "10001",
     *             "outwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10004L",
     *               "key": "PR-2",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-2"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "depends on",
     *               "name": "Dependent",
     *               "outward": "is depended by"
     *             }
     *           },
     *           {
     *             "id": "10002",
     *             "inwardIssue": {
     *               "fields": {
     *                 "status": {
     *                   "iconUrl": "https://your-domain.atlassian.net/images/icons/statuses/open.png",
     *                   "name": "Open"
     *                 }
     *               },
     *               "id": "10004",
     *               "key": "PR-3",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-3"
     *             },
     *             "type": {
     *               "id": "10000",
     *               "inward": "depends on",
     *               "name": "Dependent",
     *               "outward": "is depended by"
     *             }
     *           }
     *         ],
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "I did some work here."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10002",
     *       "key": "ED-1",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issue/10002"
     *     }
     *   ],
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1,
     *   "warningMessages": [
     *     "The value 'bar' does not exist for the field 'foo'."
     *   ]
     * }
     * ```
     */
    searchForIssuesUsingJqlPost: async ({
      searchRequestBean,
      opts,
    }: {
      /**
       * A JSON object containing the search request.
       *
       * @example
       * {
       *   "expand": [
       *     "names",
       *     "schema",
       *     "operations"
       *   ],
       *   "fields": [
       *     "summary",
       *     "status",
       *     "assignee"
       *   ],
       *   "fieldsByKeys": false,
       *   "jql": "project = HSP",
       *   "maxResults": 15,
       *   "startAt": 0
       * }
       */
      searchRequestBean: SearchRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SearchResults>> => {
      return jiraRequest<SearchResults>({
        path: "/rest/api/3/search",
        method: "POST",
        body: JSON.stringify(searchRequestBean),
        config,
        opts,
        isResponseAvailable: true,
      });
    },
  };
}
