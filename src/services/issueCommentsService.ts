import type {
  Comment,
  IssueCommentListRequestBean,
  PageBeanComment,
  PageOfComments,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue comments. Use it to:
 *
 *  *  get, create, update, and delete a comment from an issue.
 *  *  get all comments from issue.
 *  *  get a list of comments by comment ID.
 */
export default function issueComments<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds a comment to an issue.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Add comments* [ project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue containing the comment is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "author": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "active": false,
     *     "displayName": "Mia Krystof",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "body": {
     *     "type": "doc",
     *     "version": 1,
     *     "content": [
     *       {
     *         "type": "paragraph",
     *         "content": [
     *           {
     *             "type": "text",
     *             "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *           }
     *         ]
     *       }
     *     ]
     *   },
     *   "created": "2021-01-17T12:34:00.000+0000",
     *   "id": "10000",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *   "updateAuthor": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "active": false,
     *     "displayName": "Mia Krystof",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "updated": "2021-01-18T23:45:00.000+0000",
     *   "visibility": {
     *     "identifier": "Administrators",
     *     "type": "role",
     *     "value": "Administrators"
     *   }
     * }
     * ```
     */
    addComment: async ({
      issueIdOrKey,
      expand,
      comment,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /**
       * Use [expand](#expansion) to include additional information about comments in
       * the response. This parameter accepts `renderedBody`, which returns the comment
       * body rendered in HTML.
       */
      expand?: string;
      /**
       * @example
       * {
       *   "body": {
       *     "content": [
       *       {
       *         "content": [
       *           {
       *             "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.",
       *             "type": "text"
       *           }
       *         ],
       *         "type": "paragraph"
       *       }
       *     ],
       *     "type": "doc",
       *     "version": 1
       *   },
       *   "visibility": {
       *     "identifier": "Administrators",
       *     "type": "role",
       *     "value": "Administrators"
       *   }
       * }
       */
      comment: Comment;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Comment>> => {
      return jiraRequest<Comment>({
        path: "/rest/api/3/issue/{issueIdOrKey}/comment",
        method: "POST",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          expand
        },
        body: JSON.stringify(comment),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a comment.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  *Delete all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or *Delete own comments* to delete comment created by the user,
     *  *  If the comment has visibility restrictions, the user belongs to the group or has the role that is permitted to view the comment.
     *
     * @returns Returned if the request is successful.
     */
    deleteComment: async ({
      issueIdOrKey,
      id,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the comment. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/comment/{id}",
        method: "DELETE",
        pathParams: {
          issueIdOrKey,
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a comment.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the comment has visibility restrictions, the user belongs to the group or has the role that is permitted to view the comment.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "author": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "active": false,
     *     "displayName": "Mia Krystof",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "body": {
     *     "type": "doc",
     *     "version": 1,
     *     "content": [
     *       {
     *         "type": "paragraph",
     *         "content": [
     *           {
     *             "type": "text",
     *             "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *           }
     *         ]
     *       }
     *     ]
     *   },
     *   "created": "2021-01-17T12:34:00.000+0000",
     *   "id": "10000",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *   "updateAuthor": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "active": false,
     *     "displayName": "Mia Krystof",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "updated": "2021-01-18T23:45:00.000+0000",
     *   "visibility": {
     *     "identifier": "Administrators",
     *     "type": "role",
     *     "value": "Administrators"
     *   }
     * }
     * ```
     */
    getComment: async ({
      issueIdOrKey,
      id,
      expand,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the comment. */
      id: string;
      /**
       * Use [expand](#expansion) to include additional information about comments in
       * the response. This parameter accepts `renderedBody`, which returns the comment
       * body rendered in HTML.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Comment>> => {
      return jiraRequest<Comment>({
        path: "/rest/api/3/issue/{issueIdOrKey}/comment/{id}",
        method: "GET",
        pathParams: {
          issueIdOrKey,
          id
        },
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all comments for an issue.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the issue has comments, the user has permission to view the comments.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "comments": [
     *     {
     *       "author": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "active": false,
     *         "displayName": "Mia Krystof",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "body": {
     *         "type": "doc",
     *         "version": 1,
     *         "content": [
     *           {
     *             "type": "paragraph",
     *             "content": [
     *               {
     *                 "type": "text",
     *                 "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *               }
     *             ]
     *           }
     *         ]
     *       },
     *       "created": "2021-01-17T12:34:00.000+0000",
     *       "id": "10000",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *       "updateAuthor": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "active": false,
     *         "displayName": "Mia Krystof",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "updated": "2021-01-18T23:45:00.000+0000",
     *       "visibility": {
     *         "identifier": "Administrators",
     *         "type": "role",
     *         "value": "Administrators"
     *       }
     *     }
     *   ],
     *   "maxResults": 1,
     *   "startAt": 0,
     *   "total": 1
     * }
     * ```
     */
    getComments: async ({
      issueIdOrKey,
      startAt,
      maxResults,
      orderBy,
      expand,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * [Order](#ordering) the results by a field. Accepts *created* to sort comments
       * by their created date.
       */
      orderBy?: "created" | "-created" | "+created";
      /**
       * Use [expand](#expansion) to include additional information about comments in
       * the response. This parameter accepts `renderedBody`, which returns the comment
       * body rendered in HTML.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageOfComments>> => {
      return jiraRequest<PageOfComments>({
        path: "/rest/api/3/issue/{issueIdOrKey}/comment",
        method: "GET",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          startAt,
          maxResults,
          orderBy,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of comments specified by a list of comment IDs.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Comments are returned only where the user:
     *
     *  *  has permission to view the comment.
     *  *  If the comment has visibility restrictions, belongs to the group or has the role that is permitted to view the comment.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 2,
     *   "nextPage": "https://your-domain.atlassian.net/rest/api/3/comment/list?startAt=2&maxResults=2",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/comment/list?startAt=0&maxResults=2",
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "author": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "active": false,
     *         "displayName": "Mia Krystof",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "body": {
     *         "type": "doc",
     *         "version": 1,
     *         "content": [
     *           {
     *             "type": "paragraph",
     *             "content": [
     *               {
     *                 "type": "text",
     *                 "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *               }
     *             ]
     *           }
     *         ]
     *       },
     *       "created": "2021-01-17T12:34:00.000+0000",
     *       "id": "10000",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *       "updateAuthor": {
     *         "accountId": "5b10a2844c20165700ede21g",
     *         "active": false,
     *         "displayName": "Mia Krystof",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *       },
     *       "updated": "2021-01-18T23:45:00.000+0000",
     *       "visibility": {
     *         "identifier": "Administrators",
     *         "type": "role",
     *         "value": "Administrators"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getCommentsByIds: async ({
      expand,
      issueCommentListRequestBean,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information about comments in
       * the response. This parameter accepts a comma-separated list. Expand options
       * include:
       *
       *  *  `renderedBody` Returns the comment body rendered in HTML.
       *  *  `properties` Returns the comment's properties.
       */
      expand?: string;
      /**
       * The list of comment IDs.
       *
       * @example
       * {
       *   "ids": [
       *     1,
       *     2,
       *     5,
       *     10
       *   ]
       * }
       */
      issueCommentListRequestBean: IssueCommentListRequestBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanComment>> => {
      return jiraRequest<PageBeanComment>({
        path: "/rest/api/3/comment/list",
        method: "POST",
        queryParams: {
          expand
        },
        body: JSON.stringify(issueCommentListRequestBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a comment.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  *Edit all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any comment or *Edit own comments* to update comment created by the user.
     *  *  If the comment has visibility restrictions, the user belongs to the group or has the role that is permitted to view the comment.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "author": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "active": false,
     *     "displayName": "Mia Krystof",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "body": {
     *     "type": "doc",
     *     "version": 1,
     *     "content": [
     *       {
     *         "type": "paragraph",
     *         "content": [
     *           {
     *             "type": "text",
     *             "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *           }
     *         ]
     *       }
     *     ]
     *   },
     *   "created": "2021-01-17T12:34:00.000+0000",
     *   "id": "10000",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *   "updateAuthor": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "active": false,
     *     "displayName": "Mia Krystof",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "updated": "2021-01-18T23:45:00.000+0000",
     *   "visibility": {
     *     "identifier": "Administrators",
     *     "type": "role",
     *     "value": "Administrators"
     *   }
     * }
     * ```
     */
    updateComment: async ({
      issueIdOrKey,
      id,
      notifyUsers,
      overrideEditableFlag,
      expand,
      comment,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the comment. */
      id: string;
      /** Whether users are notified when a comment is updated. */
      notifyUsers?: boolean;
      /**
       * Whether screen security is overridden to enable uneditable fields to be edited.
       * Available to Connect app users with the *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on
       * behalf of users with *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg).
       */
      overrideEditableFlag?: boolean;
      /**
       * Use [expand](#expansion) to include additional information about comments in
       * the response. This parameter accepts `renderedBody`, which returns the comment
       * body rendered in HTML.
       */
      expand?: string;
      /**
       * @example
       * {
       *   "body": {
       *     "content": [
       *       {
       *         "content": [
       *           {
       *             "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.",
       *             "type": "text"
       *           }
       *         ],
       *         "type": "paragraph"
       *       }
       *     ],
       *     "type": "doc",
       *     "version": 1
       *   },
       *   "visibility": {
       *     "identifier": "Administrators",
       *     "type": "role",
       *     "value": "Administrators"
       *   }
       * }
       */
      comment: Comment;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Comment>> => {
      return jiraRequest<Comment>({
        path: "/rest/api/3/issue/{issueIdOrKey}/comment/{id}",
        method: "PUT",
        pathParams: {
          issueIdOrKey,
          id
        },
        queryParams: {
          notifyUsers,
          overrideEditableFlag,
          expand
        },
        body: JSON.stringify(comment),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
