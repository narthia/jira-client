/** Details of an item associated with the changed record. */
export interface AssociatedItemBean {
  /** The ID of the associated record. */
  id?: string;
  /** The name of the associated record. */
  name?: string;
  /** The ID of the associated parent record. */
  parentId?: string;
  /** The name of the associated parent record. */
  parentName?: string;
  /** The type of the associated record. */
  typeName?: string;
}
/** An audit record. */
export interface AuditRecordBean {
  /** The list of items associated with the changed record. */
  associatedItems?: AssociatedItemBean[];
  /**
   * Deprecated, use `authorAccountId` instead. The key of the user who created the
   * audit record.
   */
  authorKey?: string;
  /**
   * The category of the audit record. For a list of these categories, see the help
   * article [Auditing in Jira
   * applications](https://confluence.atlassian.com/x/noXKM).
   */
  category?: string;
  /** The list of values changed in the record event. */
  changedValues?: ChangedValueBean[];
  /** The date and time on which the audit record was created. */
  created?: string;
  /** The description of the audit record. */
  description?: string;
  /** The event the audit record originated from. */
  eventSource?: string;
  /** The ID of the audit record. */
  id?: number;
  /** Details of an item associated with the changed record. */
  objectItem?: AssociatedItemBean;
  /** The URL of the computer where the creation of the audit record was initiated. */
  remoteAddress?: string;
  /** The summary of the audit record. */
  summary?: string;
}
/** Container for a list of audit records. */
export interface AuditRecords {
  /** The requested or default limit on the number of audit items to be returned. */
  limit?: number;
  /** The number of audit items skipped before the first item in this list. */
  offset?: number;
  /** The list of audit items. */
  records?: AuditRecordBean[];
  /** The total number of audit items returned. */
  total?: number;
}
/** Details of names changed in the record event. */
export interface ChangedValueBean {
  /** The value of the field before the change. */
  changedFrom?: string;
  /** The value of the field after the change. */
  changedTo?: string;
  /** The name of the field changed. */
  fieldName?: string;
}
