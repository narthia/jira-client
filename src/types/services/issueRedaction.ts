export interface BulkRedactionRequest {
  redactions?: SingleRedactionRequest[];
}
export interface BulkRedactionResponse {
  /** Result for requested redactions */
  results: SingleRedactionResponse[];
}
/** Represents the content to redact */
export interface ContentItem {
  /**
   * The ID of the content entity.
   *
   *  *  For redacting an issue field, this will be the field ID (e.g., summary,
   * customfield\_10000).
   *  *  For redacting a comment, this will be the comment ID.
   *  *  For redacting a worklog, this will be the worklog ID.
   *
   * @example
   * summary
   */
  entityId: string;
  /**
   * The type of the entity to redact; It will be one of the following:
   *
   *  *  **issuefieldvalue** \- To redact in issue fields
   *  *  **issue-comment** \- To redact in issue comments.
   *  *  **issue-worklog** \- To redact in issue worklogs
   */
  entityType: "issuefieldvalue" | "issue-comment" | "issue-worklog";
  /**
   * This would be the issue ID
   *
   * @example
   * 10000
   */
  id: string;
}
export interface RedactionJobStatusResponse {
  bulkRedactionResponse?: BulkRedactionResponse;
  jobStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}
/** Represents the position of the redaction */
export interface RedactionPosition {
  /**
   * The ADF pointer indicating the position of the text to be redacted. This is
   * only required when redacting from rich text(ADF) fields. For plain text fields,
   * this field can be omitted.
   *
   * @example
   * /content/0/content/0/text
   */
  adfPointer?: string;
  /**
   * The text which will be redacted, encoded using SHA256 hash and Base64 digest
   *
   * @example
   * ODFiNjM3ZDhmY2QyYzZkYTYzNTllNjk2MzExM2ExMTcwZGU3OTVlNGI3MjViODRkMWUwYjRjZmQ5ZWM1OGNlOQ==
   */
  expectedText: string;
  /**
   * The start index(inclusive) for the redaction in specified content
   *
   * @example
   * 14
   */
  from: number;
  /**
   * The ending index(exclusive) for the redaction in specified content
   *
   * @example
   * 20
   */
  to: number;
}
export interface SingleRedactionRequest {
  /** Represents the content to redact */
  contentItem: ContentItem;
  /**
   * Unique id for the redaction request; ID format should be of UUID
   *
   * @example
   * 51101de6-d001-429d-a095-b2b96dd57fcb
   */
  externalId: string;
  /**
   * The reason why the content is being redacted
   *
   * @example
   * PII data
   */
  reason: string;
  /** Represents the position of the redaction */
  redactionPosition: RedactionPosition;
}
/** Result for requested redactions */
export interface SingleRedactionResponse {
  /** An unique id for the redaction request */
  externalId: string;
  /** Indicates if redaction was success/failure */
  successful: boolean;
}
