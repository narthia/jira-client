import * as commonHttpClient from "../core/common-http-client";
import { CommonHttpService } from "../core/common-http-service";
import type { PropertyKeys, EntityProperty, PagedDtoUserDto } from "../models/common";
import type { PagedDtoOrganizationDto, OrganizationCreateDto, OrganizationDto, UsersOrganizationUpdateDto, OrganizationServiceDeskUpdateDto } from "../models/organization";
export class OrganizationService extends CommonHttpService {
  /**
   * This method adds an organization to a service desk. If the organization ID is
   * already associated with the service desk, no change is made and the resource
   * returns a 204 success code.
   * 
   * **[Permissions](#permissions) required**: Service desk's agent.
   */
  addOrganization = ({
    serviceDeskId,
    organizationServiceDeskUpdateDto
  }: {
    /**
     * The ID of the service desk to which the organization will be added. This can
     * alternatively be a [project identifier.](#project-identifiers)
     */
    serviceDeskId: string;
    /**
     * @example
     * {
     *   "organizationId": 1
     * }
     */
    organizationServiceDeskUpdateDto: OrganizationServiceDeskUpdateDto;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/organization",
      method: "POST",
      pathParams: {
        serviceDeskId
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: organizationServiceDeskUpdateDto
    }).then(commonHttpClient.discardResult);
  };
  /**
   * This method adds users to an organization.
   * 
   * **[Permissions](#permissions) required**: Service desk administrator or agent.
   * Note: Permission to add users to an organization can be switched to users with
   * the Jira administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  addUsersToOrganization = ({
    organizationId,
    usersOrganizationUpdateDto
  }: {
    /** The ID of the organization. */
    organizationId: number;
    /**
     * @example
     * {
     *   "accountIds": [
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd"
     *   ],
     *   "usernames": []
     * }
     */
    usersOrganizationUpdateDto: UsersOrganizationUpdateDto;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization/{organizationId}/user",
      method: "POST",
      pathParams: {
        organizationId
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: usersOrganizationUpdateDto
    }).then(commonHttpClient.discardResult);
  };
  /**
   * This method creates an organization by passing the name of the organization.
   * 
   * **[Permissions](#permissions) required**: Service desk administrator or agent.
   * Note: Permission to create organizations can be switched to users with the Jira
   * administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   * 
   * @returns Returns the created organization or the existing organization if name already exists.
   * 
   * example:
   * ```
   * {
   *   "_links": {
   *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1"
   *   },
   *   "id": "1",
   *   "name": "Charlie Cakes Franchises",
   *   "scimManaged": false
   * }
   * ```
   */
  createOrganization = ({
    organizationCreateDto
  }: {
    /**
     * @example
     * {
     *   "name": "Charlie Cakes Franchises"
     * }
     */
    organizationCreateDto: OrganizationCreateDto;
  }): Promise<OrganizationDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: organizationCreateDto
    }).then(this.getClientInstance().responseHandler({
      201: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 201;
      mediaType: "application/json";
      body: OrganizationDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method deletes an organization. Note that the organization is deleted
   * regardless of other associations it may have. For example, associations with
   * service desks.
   * 
   * **[Permissions](#permissions) required**: Jira administrator.
   */
  deleteOrganization = ({
    organizationId
  }: {
    /** The ID of the organization. */
    organizationId: number;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization/{organizationId}",
      method: "DELETE",
      pathParams: {
        organizationId
      }
    }).then(commonHttpClient.discardResult);
  };
  /**
   * Removes an organization property. Organization properties are a type of entity
   * property which are available to the API only, and not shown in Jira Service
   * Management. [Learn
   * more](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   * 
   * For operations relating to organization detail field values which are visible
   * in Jira Service Management, see the [Customer Service Management REST
   * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
   * 
   * **[Permissions](#permissions) required**: Service Desk Administrator or Agent.
   * 
   * Note: Permission to manage organizations can be switched to users with the Jira
   * administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  deleteProperty = ({
    organizationId,
    propertyKey
  }: {
    /** The ID of the organization from which the property will be removed. */
    organizationId: string;
    /** The key of the property to remove. */
    propertyKey: string;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization/{organizationId}/property/{propertyKey}",
      method: "DELETE",
      pathParams: {
        organizationId,
        propertyKey
      }
    }).then(commonHttpClient.discardResult);
  };
  /**
   * This method returns details of an organization. Use this method to get
   * organization details whenever your application component is passed an
   * organization ID but needs to display other organization details.
   * 
   * To get organization detail field values which are visible in Jira Service
   * Management, see the [Customer Service Management REST
   * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
   * 
   * **[Permissions](#permissions) required**: Any
   * 
   * **Response limitations**: Customers can only retrieve organization of which
   * they are members.
   * 
   * @returns Returns the requested organization.
   * 
   * example:
   * ```
   * {
   *   "_links": {
   *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1"
   *   },
   *   "id": "1",
   *   "name": "Charlie Cakes Franchises",
   *   "scimManaged": false
   * }
   * ```
   */
  getOrganization = ({
    organizationId
  }: {
    /** The ID of the organization. */
    organizationId: number;
  }): Promise<OrganizationDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization/{organizationId}",
      method: "GET",
      pathParams: {
        organizationId
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: OrganizationDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns a list of organizations in the Jira Service Management
   * instance. Use this method when you want to present a list of organizations or
   * want to locate an organization by name.
   * 
   * **[Permissions](#permissions) required**: Any. However, to fetch organizations
   * based on `accountId` the user must have a Service Desk agent license.
   * 
   * **Response limitations**: If the user is a customer, only those organizations
   * of which the customer is a member are listed.
   * 
   * @returns Returns paginated list of organizations.
   * 
   * example:
   * ```
   * {
   *   "_expands": [],
   *   "size": 1,
   *   "start": 1,
   *   "limit": 1,
   *   "isLastPage": false,
   *   "_links": {
   *     "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
   *     "context": "context",
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/organization?start=2&limit=1",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/organization?start=0&limit=1"
   *   },
   *   "values": [
   *     {
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1"
   *       },
   *       "id": "1",
   *       "name": "Charlie Cakes Franchises",
   *       "scimManaged": false
   *     }
   *   ]
   * }
   * ```
   */
  getOrganizations = ({
    start,
    limit,
    accountId
  }: {
    /**
     * The starting index of the returned objects. Base index: 0. See the
     * [Pagination](#pagination) section for more details.
     */
    start?: number;
    /**
     * The maximum number of organizations to return per page. Default: 50. See the
     * [Pagination](#pagination) section for more details.
     */
    limit?: number;
    /**
     * The account ID of the user, which uniquely identifies the user across all
     * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
     */
    accountId?: string;
  } = {}): Promise<PagedDtoOrganizationDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization",
      method: "GET",
      query: {
        start,
        limit,
        accountId
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: PagedDtoOrganizationDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns a list of all organizations associated with a service desk.
   * 
   * **[Permissions](#permissions) required**: Service desk's agent.
   * 
   * @returns Returns the requested organizations list.
   * 
   * example:
   * ```
   * {
   *   "_expands": [],
   *   "size": 3,
   *   "start": 3,
   *   "limit": 3,
   *   "isLastPage": false,
   *   "_links": {
   *     "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
   *     "context": "context",
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10001/organization?start=6&limit=3",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10001/organization?start=0&limit=3"
   *   },
   *   "values": [
   *     {
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1"
   *       },
   *       "id": "1",
   *       "name": "Charlie Cakes Franchises",
   *       "scimManaged": false
   *     },
   *     {
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/organization/2"
   *       },
   *       "id": "2",
   *       "name": "Atlas Coffee Co",
   *       "scimManaged": false
   *     },
   *     {
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/organization/3"
   *       },
   *       "id": "3",
   *       "name": "The Adjustment Bureau",
   *       "scimManaged": false
   *     }
   *   ]
   * }
   * ```
   */
  getOrganizations = ({
    serviceDeskId,
    start,
    limit,
    accountId
  }: {
    /**
     * The ID of the service desk from which the organization list will be returned.
     * This can alternatively be a [project identifier.](#project-identifiers)
     */
    serviceDeskId: string;
    /**
     * The starting index of the returned objects. Base index: 0. See the
     * [Pagination](#pagination) section for more details.
     */
    start?: number;
    /**
     * The maximum number of items to return per page. Default: 50. See the
     * [Pagination](#pagination) section for more details.
     */
    limit?: number;
    /**
     * The account ID of the user, which uniquely identifies the user across all
     * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
     */
    accountId?: string;
  }): Promise<PagedDtoOrganizationDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/organization",
      method: "GET",
      pathParams: {
        serviceDeskId
      },
      query: {
        start,
        limit,
        accountId
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: PagedDtoOrganizationDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * Returns the keys of all organization properties. Organization properties are a
   * type of entity property which are available to the API only, and not shown in
   * Jira Service Management. [Learn
   * more](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   * 
   * To get organization detail field values which are visible in Jira Service
   * Management, see the [Customer Service Management REST
   * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
   * 
   * **[Permissions](#permissions) required**: Any
   * 
   * **Response limitations**: Customers can only access properties of organizations
   * of which they are members.
   * 
   * @returns Returned if the organization was found.
   * 
   * example:
   * ```
   * {
   *   "entityPropertyKeyBeans": [
   *     {
   *       "key": "organization.attributes",
   *       "self": "/rest/servicedeskapi/organization/1/property/propertyKey"
   *     }
   *   ]
   * }
   * ```
   */
  getPropertiesKeys = ({
    organizationId
  }: {
    /** The ID of the organization from which keys will be returned. */
    organizationId: string;
  }): Promise<PropertyKeys> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization/{organizationId}/property",
      method: "GET",
      pathParams: {
        organizationId
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: PropertyKeys;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * Returns the value of an organization property. Use this method to obtain the
   * JSON content for an organization's property. Organization properties are a type
   * of entity property which are available to the API only, and not shown in Jira
   * Service Management. [Learn
   * more](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   * 
   * To get organization detail field values which are visible in Jira Service
   * Management, see the [Customer Service Management REST
   * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
   * 
   * **[Permissions](#permissions) required**: Any
   * 
   * **Response limitations**: Customers can only access properties of organizations
   * of which they are members.
   * 
   * @returns Returns the organization's property.
   * 
   * example:
   * ```
   * {
   *   "key": "organization.attributes",
   *   "value": {
   *     "mail": "charlie@example.com",
   *     "phone": "0800-1233456789"
   *   }
   * }
   * ```
   */
  getProperty = ({
    organizationId,
    propertyKey
  }: {
    /** The ID of the organization from which the property will be returned. */
    organizationId: string;
    /** The key of the property to return. */
    propertyKey: string;
  }): Promise<EntityProperty> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization/{organizationId}/property/{propertyKey}",
      method: "GET",
      pathParams: {
        organizationId,
        propertyKey
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: EntityProperty;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns all the users associated with an organization. Use this
   * method where you want to provide a list of users for an organization or
   * determine if a user is associated with an organization.
   * 
   * **[Permissions](#permissions) required**: Service desk administrator or agent.
   * 
   * @returns Returns a paged list of users associated with the organization, ordered by their accountId.
   * 
   * example:
   * ```
   * {
   *   "_expands": [],
   *   "size": 1,
   *   "start": 1,
   *   "limit": 1,
   *   "isLastPage": false,
   *   "_links": {
   *     "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
   *     "context": "context",
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1/user?start=2&limit=1",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/organization/1/user?start=0&limit=1"
   *   },
   *   "values": [
   *     {
   *       "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *       "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *       "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *       "emailAddress": "fred@example.com",
   *       "displayName": "Fred F. User",
   *       "active": true,
   *       "timeZone": "Australia/Sydney",
   *       "_links": {
   *         "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "avatarUrls": {
   *           "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *           "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *           "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *           "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *         },
   *         "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *       }
   *     },
   *     {
   *       "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
   *       "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
   *       "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
   *       "emailAddress": "bob@example.com",
   *       "displayName": "Bob D. Builder",
   *       "active": true,
   *       "timeZone": "Australia/Sydney",
   *       "_links": {
   *         "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
   *         "avatarUrls": {
   *           "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *           "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *           "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *           "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *         },
   *         "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd"
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  getUsersInOrganization = ({
    organizationId,
    start,
    limit
  }: {
    /** The ID of the organization. */
    organizationId: number;
    /**
     * The starting index of the returned objects. Base index: 0. See the
     * [Pagination](#pagination) section for more details.
     */
    start?: number;
    /**
     * The maximum number of users to return per page. Default: 50. See the
     * [Pagination](#pagination) section for more details.
     */
    limit?: number;
  }): Promise<PagedDtoUserDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization/{organizationId}/user",
      method: "GET",
      pathParams: {
        organizationId
      },
      query: {
        start,
        limit
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: PagedDtoUserDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method removes an organization from a service desk. If the organization ID
   * does not match an organization associated with the service desk, no change is
   * made and the resource returns a 204 success code.
   * 
   * **[Permissions](#permissions) required**: Service desk's agent.
   */
  removeOrganization = ({
    serviceDeskId,
    organizationServiceDeskUpdateDto
  }: {
    /**
     * The ID of the service desk from which the organization will be removed. This
     * can alternatively be a [project identifier.](#project-identifiers)
     */
    serviceDeskId: string;
    /**
     * @example
     * {
     *   "organizationId": 1
     * }
     */
    organizationServiceDeskUpdateDto: OrganizationServiceDeskUpdateDto;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/organization",
      method: "DELETE",
      pathParams: {
        serviceDeskId
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: organizationServiceDeskUpdateDto
    }).then(commonHttpClient.discardResult);
  };
  /**
   * This method removes users from an organization.
   * 
   * **[Permissions](#permissions) required**: Service desk administrator or agent.
   * Note: Permission to delete users from an organization can be switched to users
   * with the Jira administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  removeUsersFromOrganization = ({
    organizationId,
    usersOrganizationUpdateDto
  }: {
    /** The ID of the organization. */
    organizationId: number;
    /**
     * @example
     * {
     *   "accountIds": [
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd"
     *   ],
     *   "usernames": []
     * }
     */
    usersOrganizationUpdateDto: UsersOrganizationUpdateDto;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization/{organizationId}/user",
      method: "DELETE",
      pathParams: {
        organizationId
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: usersOrganizationUpdateDto
    }).then(commonHttpClient.discardResult);
  };
  /**
   * Sets the value of an organization property. Use this resource to store custom
   * data against an organization. Organization properties are a type of entity
   * property which are available to the API only, and not shown in Jira Service
   * Management. [Learn
   * more](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   * 
   * To store organization detail field values which are visible in Jira Service
   * Management, see the [Customer Service Management REST
   * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
   * 
   * **[Permissions](#permissions) required**: Service Desk Administrator or Agent.
   * 
   * Note: Permission to manage organizations can be switched to users with the Jira
   * administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   * 
   * @returns
   *  * status: 200, mediaType: application/json
   *    
   *    Returned if the organization property was updated.
   * 
   *  * status: 201, mediaType: application/json
   *    
   *    Returned if the organization property was created.
   */
  setProperty = ({
    organizationId,
    propertyKey,
    requestBody
  }: {
    /** The ID of the organization on which the property will be set. */
    organizationId: string;
    /**
     * The key of the organization's property. The maximum length of the key is 255
     * bytes.
     */
    propertyKey: string;
    /**
     * The value of the property. The value has to be a valid, non-empty
     * [JSON](https://tools.ietf.org/html/rfc4627) value. The maximum length of the
     * property value is 32768 bytes.
     * 
     * @example
     * {
     *   "mail": "charlie@example.com",
     *   "phone": "0800-1233456789"
     * }
     */
    requestBody: unknown;
  }): Promise<{
    created: boolean;
    body: unknown;
  }> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/organization/{organizationId}/property/{propertyKey}",
      method: "PUT",
      pathParams: {
        organizationId,
        propertyKey
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBody
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      },
      201: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200 | 201;
      mediaType: "application/json";
      body: unknown;
    }>()).then(commonHttpClient.asCreatedResponse("body"));
  };
}