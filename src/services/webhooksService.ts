import type {
  PageBeanWebhook,
  WebhookRegistrationDetails,
  ContainerForRegisteredWebhooks,
  ContainerForWebhookIds,
  FailedWebhooks,
  WebhooksExpirationDate,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents webhooks. Webhooks are calls sent to a URL when an
 * event occurs in Jira for issues specified by a JQL query. Only Connect and
 * OAuth 2.0 apps can register and manage webhooks. For more information, see
 * [Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/#registering-a-webhook-via-the-jira-rest-api-for-connect-apps).
 */
export default function webhooks<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Removes webhooks by ID. Only webhooks registered by the calling app are
     * removed. If webhooks created by other apps are specified, they are ignored.
     *
     * **[Permissions](#permissions) required:** Only
     * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps)
     * and [OAuth
     * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps
     * can use this operation.
     */
    deleteWebhookById: async ({
      containerForWebhookIds,
      opts
    }: {
      /**
       * @example
       * {
       *   "webhookIds": [
       *     10000,
       *     10001,
       *     10042
       *   ]
       * }
       */
      containerForWebhookIds: ContainerForWebhookIds;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/webhook",
        method: "DELETE",
        body: JSON.stringify(containerForWebhookIds),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of the webhooks registered by the
     * calling app.
     *
     * **[Permissions](#permissions) required:** Only
     * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps)
     * and [OAuth
     * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps
     * can use this operation.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 3,
     *   "startAt": 0,
     *   "total": 3,
     *   "values": [
     *     {
     *       "events": [
     *         "jira:issue_updated",
     *         "jira:issue_created"
     *       ],
     *       "expirationDate": "2019-06-01T12:42:30.000+0000",
     *       "fieldIdsFilter": [
     *         "summary",
     *         "customfield_10029"
     *       ],
     *       "id": 10000,
     *       "jqlFilter": "project = PRJ",
     *       "url": "https://your-app.example.com/webhook-received"
     *     },
     *     {
     *       "events": [
     *         "jira:issue_created"
     *       ],
     *       "expirationDate": "2019-06-01T12:42:30.000+0000",
     *       "id": 10001,
     *       "jqlFilter": "issuetype = Bug",
     *       "url": "https://your-app.example.com/webhook-received"
     *     },
     *     {
     *       "events": [
     *         "issue_property_set"
     *       ],
     *       "expirationDate": "2019-06-01T12:42:30.000+0000",
     *       "id": 10002,
     *       "issuePropertyKeysFilter": [
     *         "my-issue-property-key"
     *       ],
     *       "jqlFilter": "project = PRJ",
     *       "url": "https://your-app.example.com/webhook-received"
     *     }
     *   ]
     * }
     * ```
     */
    getDynamicWebhooksForApp: async ({
      startAt,
      maxResults,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanWebhook>> => {
      return jiraRequest<PageBeanWebhook>({
        path: "/rest/api/3/webhook",
        method: "GET",
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns webhooks that have recently failed to be delivered to the requesting
     * app after the maximum number of retries.
     *
     * After 72 hours the failure may no longer be returned by this operation.
     *
     * The oldest failure is returned first.
     *
     * This method uses a cursor-based pagination. To request the next page use the
     * failure time of the last webhook on the list as the `failedAfter` value or use
     * the URL provided in `next`.
     *
     * **[Permissions](#permissions) required:** Only [Connect
     * apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps)
     * can use this operation.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "values": [
     *     {
     *       "id": "1",
     *       "body": "{\"data\":\"webhook data\"}",
     *       "url": "https://example.com",
     *       "failureTime": 1573118132000
     *     },
     *     {
     *       "id": "2",
     *       "url": "https://example.com",
     *       "failureTime": 1573540473480
     *     }
     *   ],
     *   "maxResults": 100,
     *   "next": "https://your-domain.atlassian.net/rest/api/3/webhook/failed?failedAfter=1573540473480&maxResults=100"
     * }
     * ```
     */
    getFailedWebhooks: async ({
      maxResults,
      after,
      opts
    }: {
      /**
       * The maximum number of webhooks to return per page. If obeying the maxResults
       * directive would result in records with the same failure time being split across
       * pages, the directive is ignored and all records with the same failure time
       * included on the page.
       */
      maxResults?: number;
      /**
       * The time after which any webhook failure must have occurred for the record to
       * be returned, expressed as milliseconds since the UNIX epoch.
       */
      after?: number;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<FailedWebhooks>> => {
      return jiraRequest<FailedWebhooks>({
        path: "/rest/api/3/webhook/failed",
        method: "GET",
        queryParams: {
          maxResults,
          after
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Extends the life of webhook. Webhooks registered through the REST API expire
     * after 30 days. Call this operation to keep them alive.
     *
     * Unrecognized webhook IDs (those that are not found or belong to other apps) are
     * ignored.
     *
     * **[Permissions](#permissions) required:** Only
     * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps)
     * and [OAuth
     * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps
     * can use this operation.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "expirationDate": "2019-06-01T12:42:30.000+0000"
     * }
     * ```
     */
    refreshWebhooks: async ({
      containerForWebhookIds,
      opts
    }: {
      /**
       * @example
       * {
       *   "webhookIds": [
       *     10000,
       *     10001,
       *     10042
       *   ]
       * }
       */
      containerForWebhookIds: ContainerForWebhookIds;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WebhooksExpirationDate>> => {
      return jiraRequest<WebhooksExpirationDate>({
        path: "/rest/api/3/webhook/refresh",
        method: "PUT",
        body: JSON.stringify(containerForWebhookIds),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Registers webhooks.
     *
     * **NOTE:** for non-public OAuth apps, webhooks are delivered only if there is a
     * match between the app owner and the user who registered a dynamic webhook.
     *
     * **[Permissions](#permissions) required:** Only
     * [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps)
     * and [OAuth
     * 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps
     * can use this operation.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "webhookRegistrationResult": [
     *     {
     *       "createdWebhookId": 1000
     *     },
     *     {
     *       "errors": [
     *         "The clause watchCount is unsupported"
     *       ]
     *     },
     *     {
     *       "createdWebhookId": 1001
     *     }
     *   ]
     * }
     * ```
     */
    registerDynamicWebhooks: async ({
      webhookRegistrationDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "url": "https://your-app.example.com/webhook-received",
       *   "webhooks": [
       *     {
       *       "events": [
       *         "jira:issue_created",
       *         "jira:issue_updated"
       *       ],
       *       "fieldIdsFilter": [
       *         "summary",
       *         "customfield_10029"
       *       ],
       *       "jqlFilter": "project = PROJ"
       *     },
       *     {
       *       "events": [
       *         "jira:issue_deleted"
       *       ],
       *       "jqlFilter": "project IN (PROJ, EXP) AND status = done"
       *     },
       *     {
       *       "events": [
       *         "issue_property_set"
       *       ],
       *       "issuePropertyKeysFilter": [
       *         "my-issue-property-key"
       *       ],
       *       "jqlFilter": "project = PROJ"
       *     }
       *   ]
       * }
       */
      webhookRegistrationDetails: WebhookRegistrationDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ContainerForRegisteredWebhooks>> => {
      return jiraRequest<ContainerForRegisteredWebhooks>({
        path: "/rest/api/3/webhook",
        method: "POST",
        body: JSON.stringify(webhookRegistrationDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
