import type {
  ServiceDeskDto,
  PagedDtoUserDto,
  PagedDtoArticleDto,
  PagedDtoRequestTypeDto,
  RequestTypeDto,
  CustomerRequestCreateMetaDto,
  PropertyKeys,
  EntityProperty,
  PagedDtoServiceDeskDto,
  MultipartFile,
  ServiceDeskCustomerDto,
  PagedDtoQueueDto,
  QueueDto,
  PagedDtoIssueBean,
  RequestTypeCreateDto,
  RequestTypePermissionCheckRequestDto,
  RequestTypePermissionCheckResponse,
  PagedDtoRequestTypeGroupDto,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

export default function servicedesk<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds one or more customers to a service desk. If any of the passed customers
     * are associated with the service desk, no changes will be made for those
     * customers and the resource returns a 204 success code.
     *
     * **[Permissions](#permissions) required**: Service desk administrator
     */
    addCustomers: async ({
      serviceDeskId,
      serviceDeskCustomerDto,
      opts
    }: {
      /**
       * The ID of the service desk the customer list should be returned from. This can
       * alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /**
       * @example
       * {
       *   "accountIds": [
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d69abfa3980ce712caae"
       *   ],
       *   "usernames": [
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d69abfa3980ce712caae"
       *   ]
       * }
       */
      serviceDeskCustomerDto: ServiceDeskCustomerDto;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/customer",
        method: "POST",
        pathParams: {
          serviceDeskId
        },
        body: JSON.stringify(serviceDeskCustomerDto),
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * This method adds one or more temporary attachments to a service desk, which can
     * then be permanently attached to a customer request using
     * [servicedeskapi/request/\{issueIdOrKey\}/attachment](#api-request-issueIdOrKey-attachment-post).
     *
     * **Note**: It is possible for a service desk administrator to turn off the
     * ability to add attachments to a service desk.
     *
     * This method expects a multipart request. The media-type multipart/form-data is
     * defined in RFC 1867. Most client libraries have classes that make dealing with
     * multipart posts simple. For instance, in Java the Apache HTTP Components
     * library provides
     * [MultiPartEntity](http://hc.apache.org/httpcomponents-client-ga/httpmime/apidocs/org/apache/http/entity/mime/MultipartEntity.html).
     *
     * Because this method accepts multipart/form-data, it has XSRF protection on it.
     * This means you must submit a header of X-Atlassian-Token: no-check with the
     * request or it will be blocked.
     *
     * The name of the multipart/form-data parameter that contains the attachments
     * must be `file`.
     *
     * For example, to upload a file called `myfile.txt` in the Service Desk with ID
     * 10001 use
     *
     *     curl -D- -u customer:customer -X POST -H "X-ExperimentalApi: opt-in" -H
     * "X-Atlassian-Token: no-check" -F "file=@myfile.txt"
     * https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10001/attachTemporaryFile
     *
     * **[Permissions](#permissions) required**: Permission to add attachments in this
     * Service Desk.
     *
     * @returns Returns if the file(s) were attached.
     *
     * example:
     * ```
     * {
     *   "temporaryAttachments": [
     *     {
     *       "temporaryAttachmentId": "temp8186986881700442965",
     *       "fileName": "atlassian.png"
     *     },
     *     {
     *       "temporaryAttachmentId": "temp589064256337898328",
     *       "fileName": "readme.txt"
     *     }
     *   ]
     * }
     * ```
     */
    attachTemporaryFile: async ({
      serviceDeskId,
      multipartFiles,
      opts
    }: {
      /**
       * The ID of the Service Desk to which the file will be attached. This can
       * alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      multipartFiles: MultipartFile[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/attachTemporaryFile",
        method: "POST",
        pathParams: {
          serviceDeskId
        },
        body: JSON.stringify(multipartFiles),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns:
     *
     *  *  a list of request type IDs where the given user has permission to
     * administer.
     *  *  a list of request type IDs where the given user has permission to submit
     * the request.
     *
     * If no account ID is provided, the operation returns details for the logged in
     * user.
     *
     * Note that:
     *
     *  *  invalid request type IDs are ignored.
     *  *  a maximum of 50 request types can be checked.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* or *Project Administrator* to check the permissions for
     * other users.
     *
     * However, Connect apps can make a call from the app server to the product to
     * obtain permission details for any user, without admin permission. This Connect
     * app ability doesn't apply to calls made using AP.request() in a browser.
     *
     * @returns Returned if the request is successful.
     */
    checkRequestTypePermissions: async ({
      serviceDeskId,
      requestTypePermissionCheckRequestDto,
      opts
    }: {
      serviceDeskId: string;
      /** Details of the permissions to check. */
      requestTypePermissionCheckRequestDto: RequestTypePermissionCheckRequestDto;
    } & WithRequestOpts<TClient>): Promise<JiraResult<RequestTypePermissionCheckResponse>> => {
      return jiraRequest<RequestTypePermissionCheckResponse>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype/permissions/check",
        method: "POST",
        pathParams: {
          serviceDeskId
        },
        body: JSON.stringify(requestTypePermissionCheckRequestDto),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method enables a customer request type to be added to a service desk based
     * on an issue type. Note that not all customer request type fields can be
     * specified in the request and these fields are given the following default
     * values:
     *
     *  *  Request type icon is given the headset icon.
     *  *  Request type groups is left empty, which means this customer request type
     * will not be visible on the [customer
     * portal](https://confluence.atlassian.com/servicedeskcloud/configuring-the-customer-portal-732528918.html).
     *  *  Request type status mapping is left empty, so the request type has no
     * custom status mapping but inherits the status map from the issue type upon
     * which it is based.
     *  *  Request type field mapping is set to show the required fields as specified
     * by the issue type used to create the customer request type.
     *
     *
     * These fields can be updated by a service desk administrator using the **Request
     * types** option in **Project settings**.
     * Request Types are created in next-gen projects by creating Issue Types. Please
     * use the Jira Cloud Platform Create issue type endpoint instead.
     *
     * **[Permissions](#permissions) required**: Service desk's administrator
     *
     * @returns Returns the customer request type created.
     *
     * example:
     * ```
     * {
     *   "_expands": [],
     *   "id": "11001",
     *   "_links": {
     *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001"
     *   },
     *   "name": "Get IT Help",
     *   "description": "Get IT Help",
     *   "helpText": "Please tell us clearly the problem you have within 100 words.",
     *   "issueTypeId": "12345",
     *   "serviceDeskId": "28",
     *   "portalId": "2",
     *   "groupIds": [
     *     "12"
     *   ],
     *   "icon": {
     *     "id": "12345",
     *     "_links": {
     *       "iconUrls": {
     *         "48x48": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=large",
     *         "24x24": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=small",
     *         "16x16": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=xsmall",
     *         "32x32": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=medium"
     *       }
     *     }
     *   }
     * }
     * ```
     */
    createRequestType: async ({
      serviceDeskId,
      requestTypeCreateDto,
      opts
    }: {
      /**
       * The ID of the service desk where the customer request type is to be created.
       * This can alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /**
       * @example
       * {
       *   "description": "Get IT Help",
       *   "helpText": "Please tell us clearly the problem you have within 100 words.",
       *   "issueTypeId": "12345",
       *   "name": "Get IT Help"
       * }
       */
      requestTypeCreateDto: RequestTypeCreateDto;
    } & WithRequestOpts<TClient>): Promise<JiraResult<RequestTypeDto>> => {
      return jiraRequest<RequestTypeDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype",
        method: "POST",
        pathParams: {
          serviceDeskId
        },
        body: JSON.stringify(requestTypeCreateDto),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Removes a property from a request type.
     *
     * Properties for a Request Type in next-gen are stored as Issue Type properties
     * and therefore can also be deleted by calling the Jira Cloud Platform [Delete
     * issue type
     * property](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-propertyKey-delete)
     * endpoint.
     *
     * **[Permissions](#permissions) required**: Jira project administrator with a
     * Jira Service Management agent license.
     */
    deleteProperty: async ({
      serviceDeskId,
      requestTypeId,
      propertyKey,
      opts
    }: {
      /**
       * The ID of the service desk which contains the request type. This can
       * alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /** The ID of the request type for which the property will be removed. */
      requestTypeId: number;
      /** The key of the property to remove. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/property/{propertyKey}",
        method: "DELETE",
        pathParams: {
          serviceDeskId,
          requestTypeId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * This method deletes a customer request type from a service desk, and removes it
     * from all customer requests.
     * This only supports classic projects.
     *
     * **[Permissions](#permissions) required**: Service desk administrator.
     */
    deleteRequestType: async ({
      serviceDeskId,
      requestTypeId,
      opts
    }: {
      /** The ID or [project identifier](#project-identifiers) of the service desk. */
      serviceDeskId: string;
      /** The ID of the request type. */
      requestTypeId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}",
        method: "DELETE",
        pathParams: {
          serviceDeskId,
          requestTypeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Returns articles which match the given query and belong to the knowledge base
     * linked to the service desk.
     *
     * **[Permissions](#permissions) required**: Permission to access the service desk.
     *
     * @returns Returns the articles, on the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "_expands": [],
     *   "size": 2,
     *   "start": 2,
     *   "limit": 2,
     *   "isLastPage": false,
     *   "_links": {
     *     "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
     *     "context": "context",
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/%7BserviceDeskId%7D/knowledgebase/article?start=4&limit=2",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/%7BserviceDeskId%7D/knowledgebase/article?start=0&limit=2"
     *   },
     *   "values": [
     *     {
     *       "title": "Stolen computer",
     *       "excerpt": "assuming your computer was stolen",
     *       "source": {
     *         "type": "confluence",
     *         "pageId": "8786177",
     *         "spaceKey": "IT"
     *       },
     *       "content": {
     *         "iframeSrc": "https://your-domain.atlassian.net/rest/servicedeskapi/knowledgebase/article/view/8786177"
     *       }
     *     },
     *     {
     *       "title": "Upgrading computer",
     *       "excerpt": "each computer older then 3 years can be upgraded",
     *       "source": {
     *         "type": "confluence",
     *         "pageId": "8785228",
     *         "spaceKey": "IT"
     *       },
     *       "content": {
     *         "iframeSrc": "https://your-domain.atlassian.net/rest/servicedeskapi/knowledgebase/article/view/8785228"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getArticles: ({
      serviceDeskId,
      query,
      highlight,
      start,
      limit,
      cursor,
      prev,
      opts
    }: {
      serviceDeskId: string;
      /** The string used to filter the articles (required). */
      query: string;
      /**
       * If set to true matching query term in the title and excerpt will be highlighted
       * using the `@@@hl@@@term@@@endhl@@@` syntax. Default: false.
       */
      highlight?: boolean;
      /** (Deprecated) The starting index of the returned objects. Base index: 0. */
      start?: number;
      /**
       * The maximum number of items to return per page. Default: 50. See the section
       * for more details.
       */
      limit?: number;
      /**
       * Pointer to a set of search results, returned as part of the next or prev URL
       * from the previous search call.
       */
      cursor?: string;
      /**
       * Should navigate to the previous page. Defaulted to false. Set to true as part
       * of prev URL from the previous search call.
       */
      prev?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PagedDtoArticleDto>> => {
      return jiraRequest<PagedDtoArticleDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/knowledgebase/article",
        method: "GET",
        pathParams: {
          serviceDeskId
        },
        queryParams: {
          query,
          highlight,
          start,
          limit,
          cursor,
          prev
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method returns a list of the customers on a service desk.
     *
     * The returned list of customers can be filtered using the `query` parameter. The
     * parameter is matched against customers' `displayName`, `name`, or `email`. For
     * example, searching for "John", "Jo", "Smi", or "Smith" will match a user with
     * display name "John Smith".
     *
     * **[Permissions](#permissions) required**: Permission to view this Service
     * Desk's customers.
     *
     * @returns Returns the service desk's customer list.
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
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/customer?start=2&limit=1",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/customer?start=0&limit=1"
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
     *     }
     *   ]
     * }
     * ```
     */
    getCustomers: ({
      serviceDeskId,
      query,
      start,
      limit,
      opts
    }: {
      /**
       * The ID of the service desk the customer list should be returned from. This can
       * alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /** The string used to filter the customer list. */
      query?: string;
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
    } & WithRequestOpts<TClient>): Promise<JiraResult<PagedDtoUserDto>> => {
      return jiraRequest<PagedDtoUserDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/customer",
        method: "GET",
        pathParams: {
          serviceDeskId
        },
        queryParams: {
          query,
          start,
          limit
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method returns the customer requests in a queue. Only fields that the
     * queue is configured to show are returned. For example, if a queue is configured
     * to show description and due date, then only those two fields are returned for
     * each customer request in the queue.
     *
     * **[Permissions](#permissions) required**: Service desk's agent.
     *
     * @returns Returns the customer requests belonging to the queue, on the specified page of the results.
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
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/queue/10/issue?start=2&limit=1",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/queue/10/issue?start=0&limit=1"
     *   },
     *   "values": [
     *     {
     *       "fields": {
     *         "summary": "My keyboard is broken",
     *         "issuetype": {
     *           "avatarId": 10002,
     *           "description": "For general IT problems and questions. Created by Jira Service Management.",
     *           "iconUrl": "https://your-domain.atlassian.net/servicedesk/issue-type-icons?icon=it-help",
     *           "id": "13",
     *           "name": "IT Help",
     *           "self": "https://your-domain.atlassian.net/rest/api/2/issuetype/13",
     *           "subtask": false
     *         },
     *         "duedate": "2015-11-11T14:17:13.000+0700",
     *         "created": "2015-11-09T14:17:13.000+0700",
     *         "reporter": {
     *           "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *           "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *           "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *           "emailAddress": "fred@example.com",
     *           "displayName": "Fred F. User",
     *           "active": true,
     *           "timeZone": "Australia/Sydney",
     *           "_links": {
     *             "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *             "avatarUrls": {
     *               "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
     *               "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
     *               "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
     *               "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
     *             },
     *             "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
     *           }
     *         }
     *       },
     *       "id": "10001",
     *       "key": "SD-1",
     *       "self": "https://your-domain.atlassian.net/rest/servicedeskapi/rest/api/2/issue/10001"
     *     }
     *   ]
     * }
     * ```
     */
    getIssuesInQueue: ({
      serviceDeskId,
      queueId,
      start,
      limit,
      opts
    }: {
      /**
       * The ID of the service desk containing the queue to be queried. This can
       * alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /** The ID of the queue whose customer requests will be returned. */
      queueId: number;
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
    } & WithRequestOpts<TClient>): Promise<JiraResult<PagedDtoIssueBean>> => {
      return jiraRequest<PagedDtoIssueBean>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/queue/{queueId}/issue",
        method: "GET",
        pathParams: {
          serviceDeskId,
          queueId
        },
        queryParams: {
          start,
          limit
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns the keys of all properties for a request type.
     *
     * Properties for a Request Type in next-gen are stored as Issue Type properties
     * and therefore the keys of all properties for a request type are also available
     * by calling the Jira Cloud Platform [Get issue type property
     * keys](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-get)
     * endpoint.
     *
     * **[Permissions](#permissions) required**: The user must have permission to view
     * the request type.
     *
     * @returns Returned if the request type was found.
     *
     * example:
     * ```
     * {
     *   "entityPropertyKeyBeans": [
     *     {
     *       "key": "requestType.attributes",
     *       "self": "/rest/servicedeskapi/servicedesk/1/requestType/2/property/propertyKey"
     *     }
     *   ]
     * }
     * ```
     */
    getPropertiesKeys: ({
      requestTypeId,
      serviceDeskId,
      opts
    }: {
      /** The ID of the request type for which keys will be retrieved. */
      requestTypeId: number;
      /**
       * The ID of the service desk which contains the request type. This can
       * alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PropertyKeys>> => {
      return jiraRequest<PropertyKeys>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/property",
        method: "GET",
        pathParams: {
          requestTypeId,
          serviceDeskId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns the value of the property from a request type.
     *
     * Properties for a Request Type in next-gen are stored as Issue Type properties
     * and therefore also available by calling the Jira Cloud Platform [Get issue type
     * property](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-propertyKey-get)
     * endpoint.
     *
     * **[Permissions](#permissions) required**: User must have permission to view the
     * request type.
     *
     * @returns Returned if the request type property was returned.
     *
     * example:
     * ```
     * {
     *   "key": "organization.attributes",
     *   "value": {
     *     "color": "green",
     *     "priority": "high"
     *   }
     * }
     * ```
     */
    getProperty: async ({
      serviceDeskId,
      requestTypeId,
      propertyKey,
      opts
    }: {
      /**
       * The ID of the service desk which contains the request type. This can
       * alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /** The ID of the request type from which the property will be retrieved. */
      requestTypeId: number;
      /** The key of the property to return. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<EntityProperty>> => {
      return jiraRequest<EntityProperty>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/property/{propertyKey}",
        method: "GET",
        pathParams: {
          serviceDeskId,
          requestTypeId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method returns a specific queues in a service desk. To include a customer
     * request count for the queue (in the `issueCount` field) in the response, set
     * the query parameter `includeCount` to true (its default is false).
     *
     * **[Permissions](#permissions) required**: service desk's Agent.
     *
     * @returns Returns the specific queue of the service desk.
     *
     * example:
     * ```
     * {
     *   "id": "20",
     *   "name": "Assigned to me",
     *   "jql": "project = SD AND assignee = currentUser() AND resolution = Unresolved ORDER BY \"Time to resolution\" ASC",
     *   "fields": [
     *     "issuetype",
     *     "issuekey",
     *     "summary",
     *     "created",
     *     "reporter",
     *     "duedate"
     *   ],
     *   "issueCount": 10,
     *   "_links": {
     *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/queue/20"
     *   }
     * }
     * ```
     */
    getQueue: async ({
      serviceDeskId,
      queueId,
      includeCount,
      opts
    }: {
      /**
       * ID of the service desk whose queues will be returned. This can alternatively be
       * a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /** ID of the required queue. */
      queueId: number;
      /**
       * Specifies whether to include each queue's customer request (issue) count in the
       * response.
       */
      includeCount?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<QueueDto>> => {
      return jiraRequest<QueueDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/queue/{queueId}",
        method: "GET",
        pathParams: {
          serviceDeskId,
          queueId
        },
        queryParams: {
          includeCount
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method returns the queues in a service desk. To include a customer request
     * count for each queue (in the `issueCount` field) in the response, set the query
     * parameter `includeCount` to true (its default is false).
     *
     * **[Permissions](#permissions) required**: service desk's Agent.
     *
     * @returns Returns the queues of the service desk, on the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "_expands": [],
     *   "size": 2,
     *   "start": 2,
     *   "limit": 2,
     *   "isLastPage": false,
     *   "_links": {
     *     "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
     *     "context": "context",
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/queue?start=4&limit=2",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/queue?start=0&limit=2"
     *   },
     *   "values": [
     *     {
     *       "id": "10",
     *       "name": "Unassigned issues",
     *       "jql": "project = SD AND assignee is EMPTY AND resolution = Unresolved ORDER BY \"Time to resolution\" ASC",
     *       "fields": [
     *         "issuetype",
     *         "issuekey",
     *         "summary",
     *         "created",
     *         "reporter",
     *         "duedate"
     *       ],
     *       "issueCount": 10,
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/queue/10"
     *       }
     *     },
     *     {
     *       "id": "20",
     *       "name": "Assigned to me",
     *       "jql": "project = SD AND assignee = currentUser() AND resolution = Unresolved ORDER BY \"Time to resolution\" ASC",
     *       "fields": [
     *         "issuetype",
     *         "issuekey",
     *         "summary",
     *         "created",
     *         "reporter",
     *         "duedate"
     *       ],
     *       "issueCount": 10,
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/1/queue/20"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getQueues: async ({
      serviceDeskId,
      includeCount,
      start,
      limit,
      opts
    }: {
      /**
       * ID of the service desk whose queues will be returned. This can alternatively be
       * a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /**
       * Specifies whether to include each queue's customer request (issue) count in the
       * response.
       */
      includeCount?: boolean;
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
    } & WithRequestOpts<TClient>): Promise<JiraResult<PagedDtoQueueDto>> => {
      return jiraRequest<PagedDtoQueueDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/queue",
        method: "GET",
        pathParams: {
          serviceDeskId
        },
        queryParams: {
          includeCount,
          start,
          limit
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method returns a customer request type from a service desk.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required**: Permission to access the service desk.
     *
     * @returns Returns the customer request type item.
     *
     * example:
     * ```
     * {
     *   "_expands": [],
     *   "id": "11001",
     *   "_links": {
     *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001"
     *   },
     *   "name": "Get IT Help",
     *   "description": "Get IT Help",
     *   "helpText": "Please tell us clearly the problem you have within 100 words.",
     *   "issueTypeId": "12345",
     *   "serviceDeskId": "28",
     *   "portalId": "2",
     *   "groupIds": [
     *     "12"
     *   ],
     *   "icon": {
     *     "id": "12345",
     *     "_links": {
     *       "iconUrls": {
     *         "48x48": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=large",
     *         "24x24": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=small",
     *         "16x16": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=xsmall",
     *         "32x32": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=medium"
     *       }
     *     }
     *   }
     * }
     * ```
     */
    getRequestTypeById: async ({
      serviceDeskId,
      requestTypeId,
      expand,
      opts
    }: {
      /**
       * The ID of the service desk whose customer request type is to be returned. This
       * can alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /** The ID of the customer request type to be returned. */
      requestTypeId: string;
      expand?: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<RequestTypeDto>> => {
      return jiraRequest<RequestTypeDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}",
        method: "GET",
        pathParams: {
          serviceDeskId,
          requestTypeId
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
     * This method returns the fields for a service desk's customer request type.
     *
     * Also, the following information about the user's permissions for the request
     * type is returned:
     *
     *  *  `canRaiseOnBehalfOf` returns `true` if the user has permission to raise
     * customer requests on behalf of other customers. Otherwise, returns `false`.
     *  *  `canAddRequestParticipants` returns `true` if the user can add customer
     * request participants. Otherwise, returns `false`.
     *
     * **[Permissions](#permissions) required**: Permission to view the Service Desk.
     * However, hidden fields would be visible to only Service desk's Administrator.
     *
     * @returns Returns the request type's fields and user permission details, on the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "canAddRequestParticipants": true,
     *   "canRaiseOnBehalfOf": true,
     *   "requestTypeFields": [
     *     {
     *       "fieldId": "summary",
     *       "jiraSchema": {
     *         "system": "summary",
     *         "type": "string"
     *       },
     *       "name": "What do you need?",
     *       "required": true,
     *       "validValues": [],
     *       "visible": true
     *     },
     *     {
     *       "fieldId": "customfield_10000",
     *       "jiraSchema": {
     *         "custom": "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
     *         "customId": 10000,
     *         "type": "user"
     *       },
     *       "name": "Nominee",
     *       "required": true,
     *       "validValues": [],
     *       "visible": true
     *     },
     *     {
     *       "fieldId": "customfield_10001",
     *       "jiraSchema": {
     *         "custom": "com.atlassian.jira.plugin.system.customfieldtypes:radiobuttons",
     *         "customId": 10001,
     *         "type": "string"
     *       },
     *       "name": "Gifts",
     *       "required": true,
     *       "validValues": [
     *         {
     *           "children": [],
     *           "label": "Bottle of Wine",
     *           "value": "10000"
     *         },
     *         {
     *           "children": [],
     *           "label": "Threadless Voucher",
     *           "value": "10001"
     *         },
     *         {
     *           "children": [],
     *           "label": "2 Movie Tickets",
     *           "value": "10002"
     *         }
     *       ],
     *       "visible": false
     *     }
     *   ]
     * }
     * ```
     */
    getRequestTypeFields: async ({
      serviceDeskId,
      requestTypeId,
      expand,
      opts
    }: {
      /**
       * The ID of the service desk containing the request types whose fields are to be
       * returned. This can alternatively be a [project
       * identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /** The ID of the request types whose fields are to be returned. */
      requestTypeId: number;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts `hiddenFields` that returns hidden fields associated
       * with the request type.
       */
      expand?: string[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<CustomerRequestCreateMetaDto>> => {
      return jiraRequest<CustomerRequestCreateMetaDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/field",
        method: "GET",
        pathParams: {
          serviceDeskId,
          requestTypeId
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
     * This method returns a service desk's customer request type groups. Jira Service
     * Management administrators can arrange the customer request type groups in an
     * arbitrary order for display on the customer portal; the groups are returned in
     * this order.
     *
     * **[Permissions](#permissions) required**: Permission to view the service desk.
     *
     * @returns Returns the service desk's customer request type groups, on the specified page of the results.
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
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/%7BserviceDeskId%7D/requesttypegroup?start=6&limit=3",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/%7BserviceDeskId%7D/requesttypegroup?start=0&limit=3"
     *   },
     *   "values": [
     *     {
     *       "id": "12",
     *       "name": "Common Requests"
     *     },
     *     {
     *       "id": "13",
     *       "name": "Logins and Accounts"
     *     },
     *     {
     *       "id": "14",
     *       "name": "Servers and Infrastructure"
     *     }
     *   ]
     * }
     * ```
     */
    getRequestTypeGroups: async ({
      serviceDeskId,
      start,
      limit,
      opts
    }: {
      /**
       * The ID of the service desk whose customer request type groups are to be
       * returned. This can alternatively be a [project
       * identifier.](#project-identifiers)
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
    } & WithRequestOpts<TClient>): Promise<JiraResult<PagedDtoRequestTypeGroupDto>> => {
      return jiraRequest<PagedDtoRequestTypeGroupDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttypegroup",
        method: "GET",
        pathParams: {
          serviceDeskId
        },
        queryParams: {
          start,
          limit
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method returns all customer request types from a service desk. There are
     * two parameters for filtering the returned list:
     *
     *  *  `groupId` which filters the results to items in the customer request type
     * group.
     *  *  `searchQuery` which is matched against request types' `name` or
     * `description`. For example, the strings "Install", "Inst", "Equi", or
     * "Equipment" will match a request type with the *name* "Equipment Installation
     * Request".
     *
     * **Note:** This API by default will filter out request types hidden in the
     * portal (i.e. request types without groups and request types where a user
     * doesn't have permission) when `searchQuery` is provided, unless
     * `includeHiddenRequestTypesInSearch` is set to true. Restricted request types
     * will not be returned for those who aren't admins.
     *
     * **[Permissions](#permissions) required**: Permission to access the service desk.
     *
     * @returns Returns the requested customer request types, on the specified page of the results.
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
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype?start=6&limit=3",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype?start=0&limit=3"
     *   },
     *   "values": [
     *     {
     *       "_expands": [],
     *       "id": "11001",
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11001"
     *       },
     *       "name": "Get IT Help",
     *       "description": "Get IT Help",
     *       "helpText": "Please tell us clearly the problem you have within 100 words.",
     *       "issueTypeId": "12345",
     *       "serviceDeskId": "28",
     *       "portalId": "2",
     *       "groupIds": [
     *         "12"
     *       ],
     *       "icon": {
     *         "id": "12345",
     *         "_links": {
     *           "iconUrls": {
     *             "48x48": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=large",
     *             "24x24": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=small",
     *             "16x16": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=xsmall",
     *             "32x32": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12345?size=medium"
     *           }
     *         }
     *       }
     *     },
     *     {
     *       "_expands": [],
     *       "id": "11002",
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11002"
     *       },
     *       "name": "Request a new account",
     *       "description": "Request a new account",
     *       "issueTypeId": "12345",
     *       "serviceDeskId": "28",
     *       "portalId": "2",
     *       "groupIds": [
     *         "13",
     *         "14"
     *       ],
     *       "icon": {
     *         "id": "12346",
     *         "_links": {
     *           "iconUrls": {
     *             "48x48": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12346?size=large",
     *             "24x24": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12346?size=small",
     *             "16x16": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12346?size=xsmall",
     *             "32x32": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12346?size=medium"
     *           }
     *         }
     *       }
     *     },
     *     {
     *       "_expands": [],
     *       "id": "11003",
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/28/requesttype/11003"
     *       },
     *       "name": "Hardware request",
     *       "description": "Request a hardware support",
     *       "issueTypeId": "12345",
     *       "serviceDeskId": "28",
     *       "portalId": "2",
     *       "groupIds": [
     *         "13"
     *       ],
     *       "icon": {
     *         "id": "12347",
     *         "_links": {
     *           "iconUrls": {
     *             "48x48": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12347?size=large",
     *             "24x24": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12347?size=small",
     *             "16x16": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12347?size=xsmall",
     *             "32x32": "https://your-domain.atlassian.net/rest/api/2/universal_avatar/view/type/SD_REQTYPE/avatar/12347?size=medium"
     *           }
     *         }
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getRequestTypes: async ({
      serviceDeskId,
      groupId,
      expand,
      searchQuery,
      start,
      limit,
      includeHiddenRequestTypesInSearch,
      restrictionStatus,
      opts
    }: {
      /**
       * The ID of the service desk whose customer request types are to be returned.
       * This can alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /** Filters results to those in a customer request type group. */
      groupId?: number;
      expand?: string[];
      /** The string to be used to filter the results. */
      searchQuery?: string;
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
      /** Whether to include hidden request types when searching with `searchQuery`. */
      includeHiddenRequestTypesInSearch?: boolean;
      /**
       * Request type restriction status (`open` or `restricted`) used to filter the
       * results.
       */
      restrictionStatus?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PagedDtoRequestTypeDto>> => {
      return jiraRequest<PagedDtoRequestTypeDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype",
        method: "GET",
        pathParams: {
          serviceDeskId
        },
        queryParams: {
          groupId,
          expand,
          searchQuery,
          start,
          limit,
          includeHiddenRequestTypesInSearch,
          restrictionStatus
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method returns a service desk. Use this method to get service desk details
     * whenever your application component is passed a service desk ID but needs to
     * display other service desk details.
     *
     * **[Permissions](#permissions) required**: Permission to access the Service
     * Desk. For example, being the Service Desk's Administrator or one of its Agents
     * or Users.
     *
     * @returns Returns the requested service desk.
     *
     * example:
     * ```
     * {
     *   "id": "10001",
     *   "projectId": "11001",
     *   "projectName": "IT Help Desk",
     *   "projectKey": "ITH",
     *   "_links": {
     *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10001"
     *   }
     * }
     * ```
     */
    getServiceDeskById: async ({
      serviceDeskId,
      opts
    }: {
      /**
       * The ID of the service desk to return. This can alternatively be a [project
       * identifier.](#project-identifiers)
       */
      serviceDeskId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ServiceDeskDto>> => {
      return jiraRequest<ServiceDeskDto>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}",
        method: "GET",
        pathParams: {
          serviceDeskId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method returns all the service desks in the Jira Service Management
     * instance that the user has permission to access. Use this method where you need
     * a list of service desks or need to locate a service desk by name or keyword.
     *
     * **Note:** This method will be slow if the instance has hundreds of service
     * desks. If you want to fetch a single service desk by its ID, use
     * [/rest/servicedeskapi/servicedesk/\{serviceDeskId\}](./#api-rest-servicedeskapi-servicedesk-servicedeskid-get)
     * instead.
     *
     * **[Permissions](#permissions) required**: Any
     *
     * @returns Returns the service desks, on the specified page of the results.
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
     *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk?start=6&limit=3",
     *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk?start=0&limit=3"
     *   },
     *   "values": [
     *     {
     *       "id": "10001",
     *       "projectId": "11001",
     *       "projectName": "IT Help Desk",
     *       "projectKey": "ITH",
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10001"
     *       }
     *     },
     *     {
     *       "id": "10002",
     *       "projectId": "11002",
     *       "projectName": "HR Self Serve Desk",
     *       "projectKey": "HR",
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10002"
     *       }
     *     },
     *     {
     *       "id": "10003",
     *       "projectId": "11003",
     *       "projectName": "Foundation Leave",
     *       "projectKey": "FL",
     *       "_links": {
     *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10003"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getServiceDesks: async ({
      start,
      limit,
      opts
    }: {
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
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PagedDtoServiceDeskDto>> => {
      return jiraRequest<PagedDtoServiceDeskDto>({
        path: "/rest/servicedeskapi/servicedesk",
        method: "GET",
        queryParams: {
          start,
          limit
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * This method removes one or more customers from a service desk. The service desk
     * must have closed access. If any of the passed customers are not associated with
     * the service desk, no changes will be made for those customers and the resource
     * returns a 204 success code.
     *
     * **[Permissions](#permissions) required**: Services desk administrator
     */
    removeCustomers: async ({
      serviceDeskId,
      serviceDeskCustomerDto,
      opts
    }: {
      /**
       * The ID of the service desk the customers should be removed from. This can
       * alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /**
       * @example
       * {
       *   "accountIds": [
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d69abfa3980ce712caae"
       *   ],
       *   "usernames": [
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
       *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d69abfa3980ce712caae"
       *   ]
       * }
       */
      serviceDeskCustomerDto: ServiceDeskCustomerDto;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/customer",
        method: "DELETE",
        pathParams: {
          serviceDeskId
        },
        body: JSON.stringify(serviceDeskCustomerDto),
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Sets the value of a request type property. Use this resource to store custom
     * data against a request type.
     *
     * Properties for a Request Type in next-gen are stored as Issue Type properties
     * and therefore can also be set by calling the Jira Cloud Platform [Set issue
     * type
     * property](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-propertyKey-put)
     * endpoint.
     *
     * **[Permissions](#permissions) required**: Jira project administrator with a
     * Jira Service Management agent license.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the request type property is updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the request type property is created.
     */
    setProperty: async ({
      serviceDeskId,
      requestTypeId,
      propertyKey,
      opts
    }: {
      /**
       * The ID of the service desk which contains the request type. This can
       * alternatively be a [project identifier.](#project-identifiers)
       */
      serviceDeskId: string;
      /** The ID of the request type on which the property will be set. */
      requestTypeId: number;
      /**
       * The key of the request type property. The maximum length of the key is 255
       * bytes.
       */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        created: boolean;
        body: unknown;
      }>
    > => {
      return jiraRequest<{
        created: boolean;
        body: unknown;
      }>({
        path: "/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/property/{propertyKey}",
        method: "PUT",
        pathParams: {
          serviceDeskId,
          requestTypeId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
