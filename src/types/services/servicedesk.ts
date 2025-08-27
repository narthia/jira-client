import type { IssueBean, PagedLinkDto, ServiceDeskDto, SelfLinkDto } from "./common";

export interface PagedDtoIssueBean {
  _expands?: string[];
  /** List of the links relating to the page. */
  _links?: PagedLinkDto;
  /** Indicates if this is the last page of records (true) or not (false). */
  isLastPage?: boolean;
  /**
   * Number of items to be returned per page, up to the maximum set for these
   * objects in the current implementation.
   */
  limit?: number;
  /** Number of items returned in the page. */
  size?: number;
  /** Index of the first item returned in the page. */
  start?: number;
  /** Details of the items included in the page. */
  values?: IssueBean[];
}
export interface PagedDtoQueueDto {
  _expands?: string[];
  /** List of the links relating to the page. */
  _links?: PagedLinkDto;
  /** Indicates if this is the last page of records (true) or not (false). */
  isLastPage?: boolean;
  /**
   * Number of items to be returned per page, up to the maximum set for these
   * objects in the current implementation.
   */
  limit?: number;
  /** Number of items returned in the page. */
  size?: number;
  /** Index of the first item returned in the page. */
  start?: number;
  /** Details of the items included in the page. */
  values?: QueueDto[];
}
export interface PagedDtoRequestTypeGroupDto {
  _expands?: string[];
  /** List of the links relating to the page. */
  _links?: PagedLinkDto;
  /** Indicates if this is the last page of records (true) or not (false). */
  isLastPage?: boolean;
  /**
   * Number of items to be returned per page, up to the maximum set for these
   * objects in the current implementation.
   */
  limit?: number;
  /** Number of items returned in the page. */
  size?: number;
  /** Index of the first item returned in the page. */
  start?: number;
  /** Details of the items included in the page. */
  values?: RequestTypeGroupDto[];
}
export interface PagedDtoServiceDeskDto {
  _expands?: string[];
  /** List of the links relating to the page. */
  _links?: PagedLinkDto;
  /** Indicates if this is the last page of records (true) or not (false). */
  isLastPage?: boolean;
  /**
   * Number of items to be returned per page, up to the maximum set for these
   * objects in the current implementation.
   */
  limit?: number;
  /** Number of items returned in the page. */
  size?: number;
  /** Index of the first item returned in the page. */
  start?: number;
  /** Details of the items included in the page. */
  values?: ServiceDeskDto[];
}
export interface QueueDto {
  /** REST API URL to the queue. */
  _links?: SelfLinkDto;
  /** Fields returned for each request in the queue. */
  fields?: string[];
  /** ID for the queue. */
  id?: string;
  /** The count of customer requests in the queue. */
  issueCount?: number;
  /** JQL query that filters reqeusts for the queue. */
  jql?: string;
  /** Short name for the queue. */
  name?: string;
}
export interface RequestTypeCreateDto {
  /** Description of the request type on the service desk. */
  description?: string;
  /** Help text for the request type on the service desk. */
  helpText?: string;
  /** ID of the request type to add to the service desk. */
  issueTypeId?: string;
  /** Name of the request type on the service desk. */
  name?: string;
}
export interface RequestTypeGroupDto {
  /** ID of the request type group */
  id?: string;
  /** Name of the request type group. */
  name?: string;
}
export interface RequestTypePermissionCheckRequestDto {
  /** The account ID of a user. */
  accountId?: string;
  /** List of requested permissions. */
  permissions?: ("canCreateRequest" | "canAdminister")[];
  /** List of request type IDs. */
  requestTypeIds?: number[];
}
export interface RequestTypePermissionCheckResponse {
  /** List of request type IDs for which the user has permission to administer. */
  canAdminister?: number[];
  /** List of request type IDs for which the user can create requests. */
  canCreateRequest?: number[];
}
export interface ServiceDeskCustomerDto {
  /**
   * List of users, specified by account IDs, to add to or remove from a service
   * desk.
   */
  accountIds?: string[];
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. Use `accountIds` instead.
   */
  usernames?: string[];
}
