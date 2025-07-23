import type {
  RemoteIssueLink,
  RemoteIssueLinkRequest,
  RemoteIssueLinkIdentifies,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents remote issue links, a way of linking Jira to
 * information in other systems. Use it to get, create, update, and delete remote
 * issue links either by ID or global ID. The global ID provides a way of
 * accessing remote issue links using information about the item's remote system
 * host and remote system identifier.
 */
export default function issueRemoteLinks<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates or updates a remote issue link for an issue.
     *
     * If a `globalId` is provided and a remote issue link with that global ID is
     * found it is updated. Any fields without values in the request are set to null.
     * Otherwise, the remote issue link is created.
     *
     * This operation requires [issue linking to be
     * active](https://confluence.atlassian.com/x/yoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Link issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the remote issue link is updated.
     *
     *    example:
     *    ```
     *    {
     *      "id": 10000,
     *      "self": "https://your-domain.atlassian.net/rest/api/issue/MKY-1/remotelink/10000"
     *    }
     *    ```
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the remote issue link is created.
     *
     *    example:
     *    ```
     *    {
     *      "id": 10000,
     *      "self": "https://your-domain.atlassian.net/rest/api/issue/MKY-1/remotelink/10000"
     *    }
     *    ```
     */
    createOrUpdateRemoteIssueLink: async ({
      issueIdOrKey,
      remoteIssueLinkRequest,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /**
       * @example
       * {
       *   "application": {
       *     "name": "My Acme Tracker",
       *     "type": "com.acme.tracker"
       *   },
       *   "globalId": "system=http://www.mycompany.com/support&id=1",
       *   "object": {
       *     "icon": {
       *       "title": "Support Ticket",
       *       "url16x16": "http://www.mycompany.com/support/ticket.png"
       *     },
       *     "status": {
       *       "icon": {
       *         "link": "http://www.mycompany.com/support?id=1&details=closed",
       *         "title": "Case Closed",
       *         "url16x16": "http://www.mycompany.com/support/resolved.png"
       *       },
       *       "resolved": true
       *     },
       *     "summary": "Customer support issue",
       *     "title": "TSTSUP-111",
       *     "url": "http://www.mycompany.com/support?id=1"
       *   },
       *   "relationship": "causes"
       * }
       */
      remoteIssueLinkRequest: RemoteIssueLinkRequest;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        created: boolean;
        remoteIssueLinkIdentifies: RemoteIssueLinkIdentifies;
      }>
    > => {
      return jiraRequest<{
        created: boolean;
        remoteIssueLinkIdentifies: RemoteIssueLinkIdentifies;
      }>({
        path: "/rest/api/3/issue/{issueIdOrKey}/remotelink",
        method: "POST",
        pathParams: {
          issueIdOrKey
        },
        body: JSON.stringify(remoteIssueLinkRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes the remote issue link from the issue using the link's global ID. Where
     * the global ID includes reserved URL characters these must be escaped in the
     * request. For example, pass `system=http://www.mycompany.com/support&id=1` as
     * `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.
     *
     * This operation requires [issue linking to be
     * active](https://confluence.atlassian.com/x/yoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Link issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * implemented, issue-level security permission to view the issue.
     */
    deleteRemoteIssueLinkByGlobalId: async ({
      issueIdOrKey,
      globalId,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The global ID of a remote issue link. */
      globalId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/remotelink",
        method: "DELETE",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          globalId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes a remote issue link from an issue.
     *
     * This operation requires [issue linking to be
     * active](https://confluence.atlassian.com/x/yoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects*, *Edit issues*, and *Link issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     */
    deleteRemoteIssueLinkById: async ({
      issueIdOrKey,
      linkId,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of a remote issue link. */
      linkId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}",
        method: "DELETE",
        pathParams: {
          issueIdOrKey,
          linkId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a remote issue link for an issue.
     *
     * This operation requires [issue linking to be
     * active](https://confluence.atlassian.com/x/yoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
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
     *   "application": {
     *     "name": "My Acme Tracker",
     *     "type": "com.acme.tracker"
     *   },
     *   "globalId": "system=http://www.mycompany.com/support&id=1",
     *   "id": 10000,
     *   "object": {
     *     "icon": {
     *       "title": "Support Ticket",
     *       "url16x16": "http://www.mycompany.com/support/ticket.png"
     *     },
     *     "status": {
     *       "icon": {
     *         "link": "http://www.mycompany.com/support?id=1&details=closed",
     *         "title": "Case Closed",
     *         "url16x16": "http://www.mycompany.com/support/resolved.png"
     *       },
     *       "resolved": true
     *     },
     *     "summary": "Customer support issue",
     *     "title": "TSTSUP-111",
     *     "url": "http://www.mycompany.com/support?id=1"
     *   },
     *   "relationship": "causes",
     *   "self": "https://your-domain.atlassian.net/rest/api/issue/MKY-1/remotelink/10000"
     * }
     * ```
     */
    getRemoteIssueLinkById: async ({
      issueIdOrKey,
      linkId,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the remote issue link. */
      linkId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<RemoteIssueLink>> => {
      return jiraRequest<RemoteIssueLink>({
        path: "/rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}",
        method: "GET",
        pathParams: {
          issueIdOrKey,
          linkId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the remote issue links for an issue. When a remote issue link global ID
     * is provided the record with that global ID is returned, otherwise all remote
     * issue links are returned. Where a global ID includes reserved URL characters
     * these must be escaped in the request. For example, pass
     * `system=http://www.mycompany.com/support&id=1` as
     * `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.
     *
     * This operation requires [issue linking to be
     * active](https://confluence.atlassian.com/x/yoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
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
     *
     * ```
     * [
     *   {
     *     "application": {
     *       "name": "My Acme Tracker",
     *       "type": "com.acme.tracker"
     *     },
     *     "globalId": "system=http://www.mycompany.com/support&id=1",
     *     "id": 10000,
     *     "object": {
     *       "icon": {
     *         "title": "Support Ticket",
     *         "url16x16": "http://www.mycompany.com/support/ticket.png"
     *       },
     *       "status": {
     *         "icon": {
     *           "link": "http://www.mycompany.com/support?id=1&details=closed",
     *           "title": "Case Closed",
     *           "url16x16": "http://www.mycompany.com/support/resolved.png"
     *         },
     *         "resolved": true
     *       },
     *       "summary": "Customer support issue",
     *       "title": "TSTSUP-111",
     *       "url": "http://www.mycompany.com/support?id=1"
     *     },
     *     "relationship": "causes",
     *     "self": "https://your-domain.atlassian.net/rest/api/issue/MKY-1/remotelink/10000"
     *   },
     *   {
     *     "application": {
     *       "name": "My Acme Tester",
     *       "type": "com.acme.tester"
     *     },
     *     "globalId": "system=http://www.anothercompany.com/tester&id=1234",
     *     "id": 10001,
     *     "object": {
     *       "icon": {
     *         "title": "Test Case",
     *         "url16x16": "http://www.anothercompany.com/tester/images/testcase.gif"
     *       },
     *       "status": {
     *         "icon": {
     *           "link": "http://www.anothercompany.com/tester/person?accountId=5b10a2844c20165700ede21g",
     *           "title": "Tested by Mia Krystof",
     *           "url16x16": "http://www.anothercompany.com/tester/images/person/mia.gif"
     *         },
     *         "resolved": false
     *       },
     *       "summary": "Test that the submit button saves the item",
     *       "title": "Test Case #1234",
     *       "url": "http://www.anothercompany.com/tester/testcase/1234"
     *     },
     *     "relationship": "is tested by",
     *     "self": "https://your-domain.atlassian.net/rest/api/issue/MKY-1/remotelink/10001"
     *   }
     * ]
     * ```
     *
     */
    getRemoteIssueLinks: async ({
      issueIdOrKey,
      globalId,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The global ID of the remote issue link. */
      globalId?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<RemoteIssueLink>> => {
      return jiraRequest<RemoteIssueLink>({
        path: "/rest/api/3/issue/{issueIdOrKey}/remotelink",
        method: "GET",
        pathParams: {
          issueIdOrKey
        },
        queryParams: {
          globalId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a remote issue link for an issue.
     *
     * Note: Fields without values in the request are set to null.
     *
     * This operation requires [issue linking to be
     * active](https://confluence.atlassian.com/x/yoXKM).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Link issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     */
    updateRemoteIssueLink: async ({
      issueIdOrKey,
      linkId,
      remoteIssueLinkRequest,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the remote issue link. */
      linkId: string;
      /**
       * @example
       * {
       *   "application": {
       *     "name": "My Acme Tracker",
       *     "type": "com.acme.tracker"
       *   },
       *   "globalId": "system=http://www.mycompany.com/support&id=1",
       *   "object": {
       *     "icon": {
       *       "title": "Support Ticket",
       *       "url16x16": "http://www.mycompany.com/support/ticket.png"
       *     },
       *     "status": {
       *       "icon": {
       *         "link": "http://www.mycompany.com/support?id=1&details=closed",
       *         "title": "Case Closed",
       *         "url16x16": "http://www.mycompany.com/support/resolved.png"
       *       },
       *       "resolved": true
       *     },
       *     "summary": "Customer support issue",
       *     "title": "TSTSUP-111",
       *     "url": "http://www.mycompany.com/support?id=1"
       *   },
       *   "relationship": "causes"
       * }
       */
      remoteIssueLinkRequest: RemoteIssueLinkRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}",
        method: "PUT",
        pathParams: {
          issueIdOrKey,
          linkId
        },
        body: JSON.stringify(remoteIssueLinkRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
