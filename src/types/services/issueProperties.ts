import type { JsonNode } from "./common";
/** Bulk issue property update request details. */
export interface BulkIssuePropertyUpdateRequest {
  /**
   * EXPERIMENTAL. The Jira expression to calculate the value of the property. The
   * value of the expression must be an object that can be converted to JSON, such
   * as a number, boolean, string, list, or map. The context variables available to
   * the expression are `issue` and `user`. Issues for which the expression returns
   * a value whose JSON representation is longer than 32768 characters are ignored.
   */
  expression?: string;
  /** The bulk operation filter. */
  filter?: IssueFilterForBulkPropertySet;
  /**
   * The value of the property. The value must be a
   * [valid](https://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
   * length is 32768 characters.
   */
  value?: unknown;
}
/**
 * Lists of issues and entity properties. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/)
 * for more information.
 */
export interface IssueEntityProperties {
  /** A list of entity property IDs. */
  entitiesIds?: number[];
  /** A list of entity property keys and values. */
  properties?: {
    [key: string]: JsonNode;
  };
}
/**
 * An issue ID with entity property values. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/)
 * for more information.
 */
export interface IssueEntityPropertiesForMultiUpdate {
  /** The ID of the issue. */
  issueID?: number;
  /**
   * Entity properties to set on the issue. The maximum length of an issue property
   * value is 32768 characters.
   */
  properties?: {
    [key: string]: JsonNode;
  };
}
/** Bulk operation filter details. */
export interface IssueFilterForBulkPropertyDelete {
  /** The value of properties to perform the bulk operation on. */
  currentValue?: unknown;
  /** List of issues to perform the bulk delete operation on. */
  entityIds?: number[];
}
/** Bulk operation filter details. */
export interface IssueFilterForBulkPropertySet {
  /** The value of properties to perform the bulk operation on. */
  currentValue?: unknown;
  /** List of issues to perform the bulk operation on. */
  entityIds?: number[];
  /**
   * Whether the bulk operation occurs only when the property is present on or
   * absent from an issue.
   */
  hasProperty?: boolean;
}
/**
 * A list of issues and their respective properties to set or update. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/)
 * for more information.
 */
export interface MultiIssueEntityProperties {
  /** A list of issue IDs and their respective properties. */
  issues?: IssueEntityPropertiesForMultiUpdate[];
}
