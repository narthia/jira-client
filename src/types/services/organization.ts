import type { SelfLinkDto, DateDto, PagedLinkDto } from "./common";
export interface OrganizationCreateDto {
  /** Name of the organization. Must contain 1-200 characters. */
  name: string;
}
export interface OrganizationDto {
  /** REST API URL to the organization. */
  _links?: SelfLinkDto;
  /**
   * Date the organization was created. This field may not be present in some older
   * organizations.
   */
  created?: DateDto;
  /** A unique system generated ID for the organization. */
  id?: string;
  /** Name of the organization. */
  name?: string;
  /**
   * Returns if an organization is managed by scim. This field may not be present in
   * some older organizations
   */
  scimManaged?: boolean;
  /**
   * A unique system generated ID for the organization. This is identity from the
   * group directory id
   */
  uuid?: string;
}
export interface OrganizationServiceDeskUpdateDto extends Record<string, unknown> {
  /**
   * List of organizations, specified by 'ID' field values, to add to or remove from
   * the service desk.
   */
  organizationId: number;
  /** Service desk Id for which, organization needs to be updated */
  serviceDeskId?: string;
}
export interface PagedDtoOrganizationDto {
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
  values?: OrganizationDto[];
}

export interface UsersOrganizationUpdateDto extends Record<string, unknown> {
  /**
   * List of customers, specific by account IDs, to add to or remove from the
   * organization.
   */
  accountIds?: string[];
  /** The organizationId in which users need to be added */
  organizationId?: number;
  /**
   * This property is no longer available and will be removed from the documentation
   * soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. Use `accountIds` instead.
   */
  usernames?: string[];
}
