/**
 * Container for a list of registered webhooks. Webhook details are returned in
 * the same order as the request.
 */
export interface ContainerForRegisteredWebhooks {
  /** A list of registered webhooks. */
  webhookRegistrationResult?: RegisteredWebhook[];
}
/** Container for a list of webhook IDs. */
export interface ContainerForWebhookIds {
  /** A list of webhook IDs. */
  webhookIds: number[];
}
/** Details about a failed webhook. */
export interface FailedWebhook {
  /** The webhook body. */
  body?: string;
  /**
   * The time the webhook was added to the list of failed webhooks (that is, the
   * time of the last failed retry).
   */
  failureTime: number;
  /**
   * The webhook ID, as sent in the `X-Atlassian-Webhook-Identifier` header with the
   * webhook.
   */
  id: string;
  /** The original webhook destination. */
  url: string;
}
/** A page of failed webhooks. */
export interface FailedWebhooks {
  /**
   * The maximum number of items on the page. If the list of values is shorter than
   * this number, then there are no more pages.
   */
  maxResults: number;
  /**
   * The URL to the next page of results. Present only if the request returned at
   * least one result.The next page may be empty at the time of receiving the
   * response, but new failed webhooks may appear in time. You can save the URL to
   * the next page and query for new results periodically (for example, every hour).
   */
  next?: string;
  /** The list of webhooks. */
  values: FailedWebhook[];
}
/** A page of items. */
export interface PageBeanWebhook {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: Webhook[];
}
/**
 * ID of a registered webhook or error messages explaining why a webhook wasn't
 * registered.
 */
export interface RegisteredWebhook {
  /** The ID of the webhook. Returned if the webhook is created. */
  createdWebhookId?: number;
  /** Error messages specifying why the webhook creation failed. */
  errors?: string[];
}
/** A webhook. */
export interface Webhook {
  /** The Jira events that trigger the webhook. */
  events: (
    | "jira:issue_created"
    | "jira:issue_updated"
    | "jira:issue_deleted"
    | "comment_created"
    | "comment_updated"
    | "comment_deleted"
    | "issue_property_set"
    | "issue_property_deleted"
  )[];
  /**
   * The date after which the webhook is no longer sent. Use [Extend webhook
   * life](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-refresh-put)
   * to extend the date.
   */
  expirationDate?: number;
  /**
   * A list of field IDs. When the issue changelog contains any of the fields, the
   * webhook `jira:issue_updated` is sent. If this parameter is not present, the app
   * is notified about all field updates.
   */
  fieldIdsFilter?: string[];
  /** The ID of the webhook. */
  id: number;
  /**
   * A list of issue property keys. A change of those issue properties triggers the
   * `issue_property_set` or `issue_property_deleted` webhooks. If this parameter is
   * not present, the app is notified about all issue property updates.
   */
  issuePropertyKeysFilter?: string[];
  /** The JQL filter that specifies which issues the webhook is sent for. */
  jqlFilter: string;
  /** The URL that specifies where the webhooks are sent. */
  url: string;
}
/** A list of webhooks. */
export interface WebhookDetails {
  /** The Jira events that trigger the webhook. */
  events: (
    | "jira:issue_created"
    | "jira:issue_updated"
    | "jira:issue_deleted"
    | "comment_created"
    | "comment_updated"
    | "comment_deleted"
    | "issue_property_set"
    | "issue_property_deleted"
  )[];
  /**
   * A list of field IDs. When the issue changelog contains any of the fields, the
   * webhook `jira:issue_updated` is sent. If this parameter is not present, the app
   * is notified about all field updates.
   */
  fieldIdsFilter?: string[];
  /**
   * A list of issue property keys. A change of those issue properties triggers the
   * `issue_property_set` or `issue_property_deleted` webhooks. If this parameter is
   * not present, the app is notified about all issue property updates.
   */
  issuePropertyKeysFilter?: string[];
  /**
   * The JQL filter that specifies which issues the webhook is sent for. Only a
   * subset of JQL can be used. The supported elements are:
   *
   *  *  Fields: `issueKey`, `project`, `issuetype`, `status`, `assignee`,
   * `reporter`, `issue.property`, and `cf[id]`. For custom fields (`cf[id]`), only
   * the epic label custom field is supported.".
   *  *  Operators: `=`, `!=`, `IN`, and `NOT IN`.
   */
  jqlFilter: string;
}
/** Details of webhooks to register. */
export interface WebhookRegistrationDetails {
  /**
   * The URL that specifies where to send the webhooks. This URL must use the same
   * base URL as the Connect app. Only a single URL per app is allowed to be
   * registered.
   */
  url: string;
  /** A list of webhooks. */
  webhooks: WebhookDetails[];
}
/** The date the refreshed webhooks expire. */
export interface WebhooksExpirationDate {
  /** The expiration date of all the refreshed webhooks. */
  expirationDate: number;
}
