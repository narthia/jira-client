import * as commonHttpClient from "../core/common-http-client";
import { CommonHttpService } from "../core/common-http-service";
import type { PagedDtoUserDto } from "../models/common";
import type { PagedDtoCustomerRequestDto, RequestCreateDto, CustomerRequestDto, PagedDtoApprovalDto, ApprovalDto, ApprovalDecisionRequestDto, PagedDtoAttachmentDto, AttachmentCreateDto, AttachmentCreateResultDto, PagedDtoCommentDto, CommentCreateDto, CommentDto, RequestNotificationSubscriptionDto, RequestParticipantUpdateDto, PagedDtoSlaInformationDto, SlaInformationDto, PagedDtoCustomerRequestStatusDto, PagedDtoCustomerTransitionDto, CustomerTransitionExecutionDto, CsatFeedbackFullDto } from "../models/request";
export class RequestService extends CommonHttpService {
  /**
   * This method adds participants to a customer request.
   * 
   * **[Permissions](#permissions) required**: Permission to manage participants on
   * the customer request.
   * 
   * Note, participants can be added when creating a customer request using the
   * [request](#api-request-post) resource, by defining the participants in the
   * `requestParticipants` field.
   * 
   * @returns Returns the participants added to the customer request.
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1000/participant?start=2&limit=1",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1000/participant?start=0&limit=1"
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
  addRequestParticipants = ({
    issueIdOrKey,
    requestParticipantUpdateDto
  }: {
    /** The ID or key of the customer request to have participants added. */
    issueIdOrKey: string;
    /**
     * @example
     * {
     *   "accountIds": [],
     *   "usernames": [
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d69abfa3980ce712caae"
     *   ]
     * }
     */
    requestParticipantUpdateDto: RequestParticipantUpdateDto;
  }): Promise<PagedDtoUserDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/participant",
      method: "POST",
      pathParams: {
        issueIdOrKey
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: requestParticipantUpdateDto
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
   * This method enables a user to **Approve** or **Decline** an approval on a
   * customer request. The approval is assumed to be owned by the user making the
   * call.
   * 
   * **[Permissions](#permissions) required**: User is assigned to the approval
   * request.
   * 
   * @returns Returns the updated approval.
   * 
   * example:
   * ```
   * {
   *   "id": "1",
   *   "name": "Please approve this request",
   *   "finalDecision": "approved",
   *   "canAnswerApproval": false,
   *   "approvers": [
   *     {
   *       "approver": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "approverDecision": "approved"
   *     }
   *   ],
   *   "createdDate": {
   *     "epochMillis": 1475046060000,
   *     "friendly": "Monday 14:01 PM",
   *     "iso8601": "2016-09-28T14:01:00+0700",
   *     "jira": "2016-09-28T14:01:00.000+0700"
   *   },
   *   "completedDate": {
   *     "epochMillis": 1475134200000,
   *     "friendly": "Today 14:30 PM",
   *     "iso8601": "2016-09-29T14:30:00+0700",
   *     "jira": "2016-09-29T14:30:00.000+0700"
   *   },
   *   "_links": {
   *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2/approval/1"
   *   }
   * }
   * ```
   */
  answerApproval = ({
    issueIdOrKey,
    approvalId,
    approvalDecisionRequestDto
  }: {
    /** The ID or key of the customer request to be updated. */
    issueIdOrKey: string;
    /** The ID of the approval to be updated. */
    approvalId: number;
    /**
     * @example
     * {
     *   "decision": "approve"
     * }
     */
    approvalDecisionRequestDto: ApprovalDecisionRequestDto;
  }): Promise<ApprovalDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/approval/{approvalId}",
      method: "POST",
      pathParams: {
        issueIdOrKey,
        approvalId
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: approvalDecisionRequestDto
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: ApprovalDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method creates a comment on a customer request using one or more
   * attachment files (uploaded using
   * [servicedeskapi/servicedesk/\{serviceDeskId\}/attachTemporaryFile](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-attachtemporaryfile-post)),
   * with the visibility set by `public`. See
   * 
   *  *  GET
   * [servicedeskapi/request/\{issueIdOrKey\}/attachment](./#api-rest-servicedeskapi-request-issueidorkey-attachment-get)
   *  *  GET
   * [servicedeskapi/request/\{issueIdOrKey\}/comment/\{commentId\}/attachment](./#api-rest-servicedeskapi-request-issueidorkey-comment-commentid-attachment-get)
   * 
   * **[Permissions](#permissions) required**: Permission to add an attachment.
   * 
   * **Request limitations**: Customers can set public visibility only.
   * 
   * @returns Returns the attachments and comment.
   * 
   * example:
   * ```
   * {
   *   "comment": {
   *     "_expands": [
   *       "attachment",
   *       "renderedBody"
   *     ],
   *     "id": "1000",
   *     "body": "Please find the screenshot and the log file attached. !screenshot.png|thumbnail! [^log.txt] _(32 kB)_",
   *     "public": true,
   *     "author": {
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
   *     "created": {
   *       "epochMillis": 1444360920000,
   *       "friendly": "Today 10:22 AM",
   *       "iso8601": "2015-10-09T10:22:00+0700",
   *       "jira": "2015-10-09T10:22:00.000+0700"
   *     },
   *     "_links": {
   *       "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2000/comment/1000"
   *     }
   *   },
   *   "attachments": {
   *     "_expands": [],
   *     "size": 2,
   *     "start": 2,
   *     "limit": 2,
   *     "isLastPage": false,
   *     "_links": {
   *       "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
   *       "context": "context",
   *       "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/IT-15/comment/1001/attachment?start=4&limit=2",
   *       "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/IT-15/comment/1001/attachment?start=0&limit=2"
   *     },
   *     "values": [
   *       {
   *         "filename": "screenshot.png",
   *         "author": {
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
   *         },
   *         "created": {
   *           "epochMillis": 1444360920000,
   *           "friendly": "Today 10:22 AM",
   *           "iso8601": "2015-10-09T10:22:00+0700",
   *           "jira": "2015-10-09T10:22:00.000+0700"
   *         },
   *         "size": 23123,
   *         "mimeType": "image/png",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/attachment/10000",
   *           "content": "https://your-domain.atlassian.net/servicedesk/customershim/secure/attachment/10000/screenshot.png",
   *           "thumbnail": "https://your-domain.atlassian.net/servicedesk/customershim/secure/thumbnail/10000/_thumb_10000.png"
   *         }
   *       },
   *       {
   *         "filename": "log.txt",
   *         "author": {
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
   *         },
   *         "created": {
   *           "epochMillis": 1444360920000,
   *           "friendly": "Today 10:22 AM",
   *           "iso8601": "2015-10-09T10:22:00+0700",
   *           "jira": "2015-10-09T10:22:00.000+0700"
   *         },
   *         "size": 32132,
   *         "mimeType": "text/plain",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/attachment/10001",
   *           "content": "https://your-domain.atlassian.net/servicedesk/customershim/secure/attachment/10001/log.txt"
   *         }
   *       }
   *     ]
   *   }
   * }
   * ```
   */
  createCommentWithAttachment = ({
    issueIdOrKey,
    attachmentCreateDto
  }: {
    /** The ID or key of the customer request to which the attachment will be added. */
    issueIdOrKey: string;
    /**
     * @example
     * {
     *   "additionalComment": {
     *     "body": "Please find the screenshot and the log file attached."
     *   },
     *   "public": true,
     *   "temporaryAttachmentIds": [
     *     "temp910441317820424274",
     *     "temp3600755449679003114"
     *   ]
     * }
     */
    attachmentCreateDto: AttachmentCreateDto;
  }): Promise<AttachmentCreateResultDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/attachment",
      method: "POST",
      pathParams: {
        issueIdOrKey
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: attachmentCreateDto
    }).then(this.getClientInstance().responseHandler({
      201: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 201;
      mediaType: "application/json";
      body: AttachmentCreateResultDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method creates a customer request in a service desk.
   * 
   * The JSON request must include the service desk and customer request type, as
   * well as any fields that are required for the request type. A list of the fields
   * required by a customer request type can be obtained using
   * [servicedesk/\{serviceDeskId\}/requesttype/\{requestTypeId\}/field](#api-servicedesk-serviceDeskId-requesttype-requestTypeId-field-get).
   * 
   * The fields required for a customer request type depend on the user's
   * permissions:
   * 
   *  *  `raiseOnBehalfOf` is not available to Users who have the customer
   * permission only.
   *  *  `requestParticipants` is not available to Users who have the customer
   * permission only or if the feature is turned off for customers.
   * 
   * `requestFieldValues` is a map of Jira field IDs and their values. See [Field
   * input formats](#fieldformats), for details of each field's JSON semantics and
   * the values they can take.
   * 
   * **[Permissions](#permissions) required**: Permission to create requests in the
   * specified service desk.
   * 
   * @returns Returned if the customer request was created.
   * 
   * example:
   * ```
   * {
   *   "_expands": [
   *     "participant",
   *     "status",
   *     "sla",
   *     "requestType",
   *     "serviceDesk",
   *     "attachment",
   *     "action",
   *     "comment"
   *   ],
   *   "issueId": "107001",
   *   "issueKey": "HELPDESK-1",
   *   "summary": "Request JSD help via REST",
   *   "requestTypeId": "25",
   *   "serviceDeskId": "10",
   *   "createdDate": {
   *     "epochMillis": 1444290120000,
   *     "friendly": "Monday 14:42 PM",
   *     "iso8601": "2015-10-08T14:42:00+0700",
   *     "jira": "2015-10-08T14:42:00.000+0700"
   *   },
   *   "reporter": {
   *     "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "emailAddress": "fred@example.com",
   *     "displayName": "Fred F. User",
   *     "active": true,
   *     "timeZone": "Australia/Sydney",
   *     "_links": {
   *       "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *       "avatarUrls": {
   *         "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *         "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *         "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *         "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *       },
   *       "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *     }
   *   },
   *   "requestFieldValues": [
   *     {
   *       "fieldId": "summary",
   *       "label": "What do you need?",
   *       "value": "Request JSD help via REST"
   *     },
   *     {
   *       "fieldId": "description",
   *       "label": "Why do you need this?",
   *       "renderedValue": {
   *         "html": "<p>I need a new <b>mouse</b> for my Mac</p>"
   *       },
   *       "value": "I need a new *mouse* for my Mac"
   *     }
   *   ],
   *   "currentStatus": {
   *     "status": "Waiting for Support",
   *     "statusCategory": "NEW",
   *     "statusDate": {
   *       "epochMillis": 1444287660000,
   *       "friendly": "Today 14:01 PM",
   *       "iso8601": "2015-10-08T14:01:00+0700",
   *       "jira": "2015-10-08T14:01:00.000+0700"
   *     }
   *   },
   *   "_links": {
   *     "jiraRest": "https://your-domain.atlassian.net/rest/api/2/issue/107001",
   *     "web": "https://your-domain.atlassian.net/servicedesk/customer/portal/10/HELPDESK-1",
   *     "agent": "https://your-domain.atlassian.net/browse/HELPDESK-1",
   *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/107001"
   *   }
   * }
   * ```
   */
  createCustomerRequest = ({
    requestCreateDto
  }: {
    /**
     * @example
     * {
     *   "form": {
     *     "answers": {
     *       "1": {
     *         "text": "Answer to a text form field"
     *       },
     *       "2": {
     *         "date": "2023-07-06"
     *       },
     *       "3": {
     *         "time": "14:35"
     *       },
     *       "4": {
     *         "choices": [
     *           "5"
     *         ]
     *       },
     *       "5": {
     *         "users": [
     *           "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d69abfa3980ce712caae"
     *         ]
     *       }
     *     }
     *   },
     *   "isAdfRequest": false,
     *   "requestFieldValues": {
     *     "description": "I need a new *mouse* for my Mac",
     *     "summary": "Request JSD help via REST"
     *   },
     *   "requestParticipants": [
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d69abfa3980ce712caae"
     *   ],
     *   "requestTypeId": "25",
     *   "serviceDeskId": "10"
     * }
     */
    requestCreateDto: RequestCreateDto;
  }): Promise<CustomerRequestDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestCreateDto
    }).then(this.getClientInstance().responseHandler({
      201: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 201;
      mediaType: "application/json";
      body: CustomerRequestDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method creates a public or private (internal) comment on a customer
   * request, with the comment visibility set by `public`. The user recorded as the
   * author of the comment.
   * 
   * **[Permissions](#permissions) required**: User has Add Comments permission.
   * 
   * **Request limitations**: Customers can set comments to public visibility only.
   * 
   * @returns Returns the comment.
   * 
   * example:
   * ```
   * {
   *   "_expands": [
   *     "attachment",
   *     "renderedBody"
   *   ],
   *   "id": "1000",
   *   "body": "Hello there",
   *   "public": true,
   *   "author": {
   *     "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "emailAddress": "fred@example.com",
   *     "displayName": "Fred F. User",
   *     "active": true,
   *     "timeZone": "Australia/Sydney",
   *     "_links": {
   *       "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *       "avatarUrls": {
   *         "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *         "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *         "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *         "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *       },
   *       "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *     }
   *   },
   *   "created": {
   *     "epochMillis": 1444360920000,
   *     "friendly": "Today 10:22 AM",
   *     "iso8601": "2015-10-09T10:22:00+0700",
   *     "jira": "2015-10-09T10:22:00.000+0700"
   *   },
   *   "_links": {
   *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2000/comment/1000"
   *   }
   * }
   * ```
   */
  createRequestComment = ({
    issueIdOrKey,
    commentCreateDto
  }: {
    /** The ID or key of the customer request to which the comment will be added. */
    issueIdOrKey: string;
    /**
     * @example
     * {
     *   "body": "Hello there",
     *   "public": true
     * }
     */
    commentCreateDto: CommentCreateDto;
  }): Promise<CommentDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/comment",
      method: "POST",
      pathParams: {
        issueIdOrKey
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: commentCreateDto
    }).then(this.getClientInstance().responseHandler({
      201: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 201;
      mediaType: "application/json";
      body: CommentDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method deletes the feedback of request using it's `requestKey` or
   * `requestId`
   * 
   * **[Permissions](#permissions) required**: User must be the reporter or an
   * Atlassian Connect app.
   * 
   * @returns No content.
   */
  deleteFeedback = ({
    requestIdOrKey
  }: {
    /** The id or the key of the request to post the feedback on */
    requestIdOrKey: string;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{requestIdOrKey}/feedback",
      method: "DELETE",
      pathParams: {
        requestIdOrKey
      }
    }).then(this.getClientInstance().responseHandler({
      204: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 204;
      mediaType: "application/json";
      body: void;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns an approval. Use this method to determine the status of an
   * approval and the list of approvers.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * @returns Returns the requested approval.
   * 
   * example:
   * ```
   * {
   *   "id": "1",
   *   "name": "Please approve this request",
   *   "finalDecision": "approved",
   *   "canAnswerApproval": false,
   *   "approvers": [
   *     {
   *       "approver": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "approverDecision": "approved"
   *     }
   *   ],
   *   "createdDate": {
   *     "epochMillis": 1475046060000,
   *     "friendly": "Monday 14:01 PM",
   *     "iso8601": "2016-09-28T14:01:00+0700",
   *     "jira": "2016-09-28T14:01:00.000+0700"
   *   },
   *   "completedDate": {
   *     "epochMillis": 1475134200000,
   *     "friendly": "Today 14:30 PM",
   *     "iso8601": "2016-09-29T14:30:00+0700",
   *     "jira": "2016-09-29T14:30:00.000+0700"
   *   },
   *   "_links": {
   *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2/approval/1"
   *   }
   * }
   * ```
   */
  getApprovalById = ({
    issueIdOrKey,
    approvalId
  }: {
    /** The ID or key of the customer request the approval is on. */
    issueIdOrKey: string;
    /** The ID of the approval to be returned. */
    approvalId: number;
  }): Promise<ApprovalDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/approval/{approvalId}",
      method: "GET",
      pathParams: {
        issueIdOrKey,
        approvalId
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: ApprovalDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns all approvals on a customer request.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * @returns Returns the customer request's approvals.
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2/approval?start=6&limit=3",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2/approval?start=0&limit=3"
   *   },
   *   "values": [
   *     {
   *       "id": "1",
   *       "name": "Please approve this request",
   *       "finalDecision": "approved",
   *       "canAnswerApproval": false,
   *       "approvers": [
   *         {
   *           "approver": {
   *             "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *             "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *             "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *             "emailAddress": "fred@example.com",
   *             "displayName": "Fred F. User",
   *             "active": true,
   *             "timeZone": "Australia/Sydney",
   *             "_links": {
   *               "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *               "avatarUrls": {
   *                 "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *                 "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *                 "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *                 "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *               },
   *               "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *             }
   *           },
   *           "approverDecision": "approved"
   *         }
   *       ],
   *       "createdDate": {
   *         "epochMillis": 1475046060000,
   *         "friendly": "Monday 14:01 PM",
   *         "iso8601": "2016-09-28T14:01:00+0700",
   *         "jira": "2016-09-28T14:01:00.000+0700"
   *       },
   *       "completedDate": {
   *         "epochMillis": 1475134200000,
   *         "friendly": "Today 14:30 PM",
   *         "iso8601": "2016-09-29T14:30:00+0700",
   *         "jira": "2016-09-29T14:30:00.000+0700"
   *       },
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2/approval/1"
   *       }
   *     },
   *     {
   *       "id": "2",
   *       "name": "Waiting for approval",
   *       "finalDecision": "declined",
   *       "canAnswerApproval": false,
   *       "approvers": [
   *         {
   *           "approver": {
   *             "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *             "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *             "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *             "emailAddress": "fred@example.com",
   *             "displayName": "Fred F. User",
   *             "active": true,
   *             "timeZone": "Australia/Sydney",
   *             "_links": {
   *               "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *               "avatarUrls": {
   *                 "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *                 "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *                 "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *                 "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *               },
   *               "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *             }
   *           },
   *           "approverDecision": "approved"
   *         }
   *       ],
   *       "createdDate": {
   *         "epochMillis": 1475650860000,
   *         "friendly": "Wednesday 14:01 PM",
   *         "iso8601": "2016-10-05T14:01:00+0700",
   *         "jira": "2016-10-05T14:01:00.000+0700"
   *       },
   *       "completedDate": {
   *         "epochMillis": 1475739000000,
   *         "friendly": "Thursday 14:30 PM",
   *         "iso8601": "2016-10-06T14:30:00+0700",
   *         "jira": "2016-10-06T14:30:00.000+0700"
   *       },
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2/approval/2"
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  getApprovals = ({
    issueIdOrKey,
    start,
    limit
  }: {
    /** The ID or key of the customer request to be queried for its approvals. */
    issueIdOrKey: string;
    /**
     * The starting index of the returned objects. Base index: 0. See the
     * [Pagination](#pagination) section for more details.
     */
    start?: number;
    /**
     * The maximum number of approvals to return per page. Default: 50. See the
     * [Pagination](#pagination) section for more details.
     */
    limit?: number;
  }): Promise<PagedDtoApprovalDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/approval",
      method: "GET",
      pathParams: {
        issueIdOrKey
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
      body: PagedDtoApprovalDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * Returns the contents of an attachment.
   * 
   * To return a thumbnail of the attachment, use
   * [servicedeskapi/request/\{issueIdOrKey\}/attachment/\{attachmentId\}/thumbnail](./#api-rest-servicedeskapi-request-issueidorkey-attachment-attachmentid-thumbnail-get).
   * 
   * **[Permissions](#permissions) required:** For the issue containing the
   * attachment:
   * 
   *  *  *Browse projects* [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
   * issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
   * configured, issue-level security permission to view the issue.
   * 
   * @returns 200 response
   */
  getAttachmentContent = ({
    issueIdOrKey,
    attachmentId
  }: {
    /** The ID or key for the customer request the attachment is associated with */
    issueIdOrKey: string;
    /** The ID for the attachment */
    attachmentId: number;
  }): Promise<unknown> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/attachment/{attachmentId}",
      method: "GET",
      pathParams: {
        issueIdOrKey,
        attachmentId
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: unknown;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns all the attachments for a customer requests.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * **Response limitations**: Customers will only get a list of public attachments.
   * 
   * @returns Returns the visible attachments from the customer request.
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/IT-15/comment/1001/attachment?start=4&limit=2",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/IT-15/comment/1001/attachment?start=0&limit=2"
   *   },
   *   "values": [
   *     {
   *       "filename": "screenshot.png",
   *       "author": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "created": {
   *         "epochMillis": 1444360920000,
   *         "friendly": "Today 10:22 AM",
   *         "iso8601": "2015-10-09T10:22:00+0700",
   *         "jira": "2015-10-09T10:22:00.000+0700"
   *       },
   *       "size": 23123,
   *       "mimeType": "image/png",
   *       "_links": {
   *         "jiraRest": "https://your-domain.atlassian.net/rest/api/2/attachment/10000",
   *         "content": "https://your-domain.atlassian.net/servicedesk/customershim/secure/attachment/10000/screenshot.png",
   *         "thumbnail": "https://your-domain.atlassian.net/servicedesk/customershim/secure/thumbnail/10000/_thumb_10000.png"
   *       }
   *     },
   *     {
   *       "filename": "log.txt",
   *       "author": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "created": {
   *         "epochMillis": 1444360920000,
   *         "friendly": "Today 10:22 AM",
   *         "iso8601": "2015-10-09T10:22:00+0700",
   *         "jira": "2015-10-09T10:22:00.000+0700"
   *       },
   *       "size": 32132,
   *       "mimeType": "text/plain",
   *       "_links": {
   *         "jiraRest": "https://your-domain.atlassian.net/rest/api/2/attachment/10001",
   *         "content": "https://your-domain.atlassian.net/servicedesk/customershim/secure/attachment/10001/log.txt"
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  getAttachmentsForRequest = ({
    issueIdOrKey,
    start,
    limit
  }: {
    /** The ID or key of the customer request from which the attachments will be listed. */
    issueIdOrKey: string;
    /**
     * The starting index of the returned attachment. Base index: 0. See the
     * [Pagination](#pagination) section for more details.
     */
    start: number;
    /**
     * The maximum number of comments to return per page. Default: 50. See the
     * [Pagination](#pagination) section for more details.
     */
    limit: number;
  }): Promise<PagedDtoAttachmentDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/attachment",
      method: "GET",
      pathParams: {
        issueIdOrKey
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
      body: PagedDtoAttachmentDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * Returns the thumbnail of an attachment.
   * 
   * To return the attachment contents, use
   * [servicedeskapi/request/\{issueIdOrKey\}/attachment/\{attachmentId\}](#api-rest-servicedeskapi-request-issueidorkey-attachment-attachmentid-get).
   * 
   * **[Permissions](#permissions) required:** For the issue containing the
   * attachment:
   * 
   *  *  *Browse projects* [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
   * issue is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
   * configured, issue-level security permission to view the issue.
   * 
   * @returns 200 response
   */
  getAttachmentThumbnail = ({
    issueIdOrKey,
    attachmentId
  }: {
    /** The ID or key for the customer request the attachment is associated with */
    issueIdOrKey: string;
    /** The ID of the attachment. */
    attachmentId: number;
  }): Promise<unknown> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/attachment/{attachmentId}/thumbnail",
      method: "GET",
      pathParams: {
        issueIdOrKey,
        attachmentId
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: unknown;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns the attachments referenced in a comment.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * **Response limitations**: Customers can only view public comments, and retrieve
   * their attachments, on requests where they are the reporter or a participant
   * whereas agents can see both internal and public comments.
   * 
   * @returns Returns the attachments, on the specified page of the results.
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/IT-15/comment/1001/attachment?start=4&limit=2",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/IT-15/comment/1001/attachment?start=0&limit=2"
   *   },
   *   "values": [
   *     {
   *       "filename": "screenshot.png",
   *       "author": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "created": {
   *         "epochMillis": 1444360920000,
   *         "friendly": "Today 10:22 AM",
   *         "iso8601": "2015-10-09T10:22:00+0700",
   *         "jira": "2015-10-09T10:22:00.000+0700"
   *       },
   *       "size": 23123,
   *       "mimeType": "image/png",
   *       "_links": {
   *         "jiraRest": "https://your-domain.atlassian.net/rest/api/2/attachment/10000",
   *         "content": "https://your-domain.atlassian.net/servicedesk/customershim/secure/attachment/10000/screenshot.png",
   *         "thumbnail": "https://your-domain.atlassian.net/servicedesk/customershim/secure/thumbnail/10000/_thumb_10000.png"
   *       }
   *     },
   *     {
   *       "filename": "log.txt",
   *       "author": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "created": {
   *         "epochMillis": 1444360920000,
   *         "friendly": "Today 10:22 AM",
   *         "iso8601": "2015-10-09T10:22:00+0700",
   *         "jira": "2015-10-09T10:22:00.000+0700"
   *       },
   *       "size": 32132,
   *       "mimeType": "text/plain",
   *       "_links": {
   *         "jiraRest": "https://your-domain.atlassian.net/rest/api/2/attachment/10001",
   *         "content": "https://your-domain.atlassian.net/servicedesk/customershim/secure/attachment/10001/log.txt"
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  getCommentAttachments = ({
    issueIdOrKey,
    commentId,
    start,
    limit
  }: {
    /** The ID or key of the customer request that contains the comment. */
    issueIdOrKey: string;
    /** The ID of the comment. */
    commentId: number;
    /**
     * The starting index of the returned comments. Base index: 0. See the
     * [Pagination](#pagination) section for more details.
     */
    start?: number;
    /**
     * The maximum number of comments to return per page. Default: 50. See the
     * [Pagination](#pagination) section for more details.
     */
    limit?: number;
  }): Promise<PagedDtoAttachmentDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/comment/{commentId}/attachment",
      method: "GET",
      pathParams: {
        issueIdOrKey,
        commentId
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
      body: PagedDtoAttachmentDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns a customer request.
   * 
   * **[Permissions](#permissions) required**: Permission to access the specified
   * service desk.
   * 
   * **Response limitations**: For customers, only a request they created, was
   * created on their behalf, or they are participating in will be returned.
   * 
   * **Note:** `requestFieldValues` does not include hidden fields. To get a list of
   * request type fields that includes hidden fields, see
   * [/rest/servicedeskapi/servicedesk/\{serviceDeskId\}/requesttype/\{requestTypeId\}/field](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-requesttype-requesttypeid-field-get)
   * 
   * @returns Returns the customer request.
   * 
   * example:
   * ```
   * {
   *   "_expands": [
   *     "participant",
   *     "status",
   *     "sla",
   *     "requestType",
   *     "serviceDesk",
   *     "attachment",
   *     "action",
   *     "comment"
   *   ],
   *   "issueId": "107001",
   *   "issueKey": "HELPDESK-1",
   *   "summary": "Request JSD help via REST",
   *   "requestTypeId": "25",
   *   "serviceDeskId": "10",
   *   "createdDate": {
   *     "epochMillis": 1444290120000,
   *     "friendly": "Monday 14:42 PM",
   *     "iso8601": "2015-10-08T14:42:00+0700",
   *     "jira": "2015-10-08T14:42:00.000+0700"
   *   },
   *   "reporter": {
   *     "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "emailAddress": "fred@example.com",
   *     "displayName": "Fred F. User",
   *     "active": true,
   *     "timeZone": "Australia/Sydney",
   *     "_links": {
   *       "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *       "avatarUrls": {
   *         "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *         "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *         "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *         "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *       },
   *       "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *     }
   *   },
   *   "requestFieldValues": [
   *     {
   *       "fieldId": "summary",
   *       "label": "What do you need?",
   *       "value": "Request JSD help via REST"
   *     },
   *     {
   *       "fieldId": "description",
   *       "label": "Why do you need this?",
   *       "renderedValue": {
   *         "html": "<p>I need a new <b>mouse</b> for my Mac</p>"
   *       },
   *       "value": "I need a new *mouse* for my Mac"
   *     }
   *   ],
   *   "currentStatus": {
   *     "status": "Waiting for Support",
   *     "statusCategory": "NEW",
   *     "statusDate": {
   *       "epochMillis": 1444287660000,
   *       "friendly": "Today 14:01 PM",
   *       "iso8601": "2015-10-08T14:01:00+0700",
   *       "jira": "2015-10-08T14:01:00.000+0700"
   *     }
   *   },
   *   "_links": {
   *     "jiraRest": "https://your-domain.atlassian.net/rest/api/2/issue/107001",
   *     "web": "https://your-domain.atlassian.net/servicedesk/customer/portal/10/HELPDESK-1",
   *     "agent": "https://your-domain.atlassian.net/browse/HELPDESK-1",
   *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/107001"
   *   }
   * }
   * ```
   */
  getCustomerRequestByIdOrKey = ({
    issueIdOrKey,
    expand
  }: {
    /** The ID or Key of the customer request to be returned */
    issueIdOrKey: string;
    /**
     * A multi-value parameter indicating which properties of the customer request to
     * expand, where:
     * 
     *  *  `serviceDesk` returns additional service desk details.
     *  *  `requestType` returns additional customer request type details.
     *  *  `participant` returns the participant details.
     *  *  `sla` returns the SLA information.
     *  *  `status` returns the status transitions, in chronological order.
     *  *  `attachment` returns the attachments.
     *  *  `action` returns the actions that the user can or cannot perform.
     *  *  `comment` returns the comments.
     *  *  `comment.attachment` returns the attachment details for each comment.
     *  *  `comment.renderedBody` (Experimental) return the rendered body in HTML
     * format (in addition to the raw body) for each comment.
     */
    expand?: string[];
  }): Promise<CustomerRequestDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}",
      method: "GET",
      pathParams: {
        issueIdOrKey
      },
      query: {
        expand
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: CustomerRequestDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns all customer requests for the user executing the query.
   * 
   * The returned customer requests are ordered chronologically by the latest
   * activity on each request. For example, the latest status transition or comment.
   * 
   * **[Permissions](#permissions) required**: Permission to access the specified
   * service desk.
   * 
   * **Response limitations**: For customers, the list returned will include request
   * they created (or were created on their behalf) or are participating in only.
   * 
   * @returns Returns the customer requests, on the specified page of the results.
   * 
   * example:
   * ```
   * {
   *   "_expands": [
   *     "participant",
   *     "status",
   *     "sla",
   *     "requestType",
   *     "serviceDesk",
   *     "attachment",
   *     "action",
   *     "comment"
   *   ],
   *   "size": 3,
   *   "start": 3,
   *   "limit": 3,
   *   "isLastPage": false,
   *   "_links": {
   *     "base": "https://your-domain.atlassian.net/rest/servicedeskapi",
   *     "context": "context",
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request?start=6&limit=3",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request?start=0&limit=3"
   *   },
   *   "values": [
   *     {
   *       "_expands": [
   *         "participant",
   *         "status",
   *         "sla",
   *         "requestType",
   *         "serviceDesk",
   *         "attachment",
   *         "action",
   *         "comment"
   *       ],
   *       "issueId": "107001",
   *       "issueKey": "HELPDESK-1",
   *       "summary": "Request JSD help via REST",
   *       "requestTypeId": "25",
   *       "serviceDeskId": "10",
   *       "createdDate": {
   *         "epochMillis": 1444290120000,
   *         "friendly": "Monday 14:42 PM",
   *         "iso8601": "2015-10-08T14:42:00+0700",
   *         "jira": "2015-10-08T14:42:00.000+0700"
   *       },
   *       "reporter": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "requestFieldValues": [
   *         {
   *           "fieldId": "summary",
   *           "label": "What do you need?",
   *           "value": "Request JSD help via REST"
   *         },
   *         {
   *           "fieldId": "description",
   *           "label": "Why do you need this?",
   *           "renderedValue": {
   *             "html": "<p>I need a new <b>mouse</b> for my Mac</p>"
   *           },
   *           "value": "I need a new *mouse* for my Mac"
   *         }
   *       ],
   *       "currentStatus": {
   *         "status": "Waiting for Support",
   *         "statusCategory": "NEW",
   *         "statusDate": {
   *           "epochMillis": 1444287660000,
   *           "friendly": "Today 14:01 PM",
   *           "iso8601": "2015-10-08T14:01:00+0700",
   *           "jira": "2015-10-08T14:01:00.000+0700"
   *         }
   *       },
   *       "_links": {
   *         "jiraRest": "https://your-domain.atlassian.net/rest/api/2/issue/107001",
   *         "web": "https://your-domain.atlassian.net/servicedesk/customer/portal/10/HELPDESK-1",
   *         "agent": "https://your-domain.atlassian.net/browse/HELPDESK-1",
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/107001"
   *       }
   *     },
   *     {
   *       "_expands": [
   *         "participant",
   *         "status",
   *         "sla",
   *         "requestType",
   *         "serviceDesk",
   *         "attachment",
   *         "action",
   *         "comment"
   *       ],
   *       "issueId": "107002",
   *       "issueKey": "HELPDESK-2",
   *       "requestTypeId": "25",
   *       "serviceDeskId": "10",
   *       "createdDate": {
   *         "epochMillis": 1444289400000,
   *         "friendly": "Monday 14:30 PM",
   *         "iso8601": "2015-10-08T14:30:00+0700",
   *         "jira": "2015-10-08T14:30:00.000+0700"
   *       },
   *       "reporter": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "requestFieldValues": [
   *         {
   *           "fieldId": "summary",
   *           "label": "What do you need?",
   *           "value": "Request a new account"
   *         },
   *         {
   *           "fieldId": "description",
   *           "label": "Why do you need this?",
   *           "value": "Create an account on Jira"
   *         }
   *       ],
   *       "currentStatus": {
   *         "status": "Waiting for Support",
   *         "statusCategory": "NEW",
   *         "statusDate": {
   *           "epochMillis": 1444287660000,
   *           "friendly": "Today 14:01 PM",
   *           "iso8601": "2015-10-08T14:01:00+0700",
   *           "jira": "2015-10-08T14:01:00.000+0700"
   *         }
   *       },
   *       "_links": {
   *         "jiraRest": "https://your-domain.atlassian.net/rest/api/2/issue/107002",
   *         "web": "https://your-domain.atlassian.net/servicedesk/customer/portal/10/HELPDESK-2",
   *         "agent": "https://your-domain.atlassian.net/browse/HELPDESK-2",
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/107002"
   *       }
   *     },
   *     {
   *       "_expands": [
   *         "participant",
   *         "status",
   *         "sla",
   *         "requestType",
   *         "serviceDesk",
   *         "attachment",
   *         "action",
   *         "comment"
   *       ],
   *       "issueId": "109006",
   *       "issueKey": "SIMPLEDESK-6",
   *       "requestTypeId": "33",
   *       "serviceDeskId": "12",
   *       "createdDate": {
   *         "epochMillis": 1444030200000,
   *         "friendly": "Monday 14:30 PM",
   *         "iso8601": "2015-10-05T14:30:00+0700",
   *         "jira": "2015-10-05T14:30:00.000+0700"
   *       },
   *       "reporter": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "requestFieldValues": [
   *         {
   *           "fieldId": "summary",
   *           "label": "Summarize the problem",
   *           "value": "Printer on level 3 did not work"
   *         },
   *         {
   *           "fieldId": "description",
   *           "value": "Ink cartridge is empty"
   *         }
   *       ],
   *       "currentStatus": {
   *         "status": "Waiting for Support",
   *         "statusCategory": "NEW",
   *         "statusDate": {
   *           "epochMillis": 1444287600000,
   *           "friendly": "Today 14:00 PM",
   *           "iso8601": "2015-10-08T14:00:00+0700",
   *           "jira": "2015-10-08T14:00:00.000+0700"
   *         }
   *       },
   *       "_links": {
   *         "jiraRest": "https://your-domain.atlassian.net/rest/api/2/issue/109006",
   *         "web": "https://your-domain.atlassian.net/servicedesk/customer/portal/12/SIMPLEDESK-6",
   *         "agent": "https://your-domain.atlassian.net/browse/SIMPLEDESK-6",
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/109006"
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  getCustomerRequests = ({
    searchTerm,
    requestOwnership,
    requestStatus,
    approvalStatus,
    organizationId,
    serviceDeskId,
    requestTypeId,
    expand,
    start,
    limit
  }: {
    /**
     * Filters customer requests where the request summary matches the `searchTerm`.
     * [Wildcards](https://confluence.atlassian.com/display/JIRACORECLOUD/Search+syntax+for+text+fields)
     * can be used in the `searchTerm` parameter.
     */
    searchTerm?: string;
    /**
     * Filters customer requests using the following values:
     * 
     *  *  `OWNED_REQUESTS` returns customer requests where the user is the creator.
     *  *  `PARTICIPATED_REQUESTS` returns customer requests where the user is a
     * participant.
     *  *  `ORGANIZATION` returns customer requests for an organization of which the
     * user is a member when used in conjunction with `organizationId`.
     *  *  `ALL_ORGANIZATIONS` returns customer requests that belong to all
     * organizations of which the user is a member.
     *  *  `APPROVER` returns customer requests where the user is an approver. Can be
     * used in conjunction with `approvalStatus` to filter pending or complete
     * approvals.
     *  *  `ALL_REQUESTS` returns all customer requests. **Deprecated and will be
     * removed, as the returned requests may change if more values are added in the
     * future. Instead, explicitly list the desired filtering strategies.**
     * 
     * Multiple values of the query parameter are supported. For example,
     * `requestOwnership=OWNED_REQUESTS&requestOwnership=PARTICIPATED_REQUESTS` will
     * only return customer requests where the user is the creator or a participant.
     * If not specified, filtering defaults to `OWNED_REQUESTS`,
     * `PARTICIPATED_REQUESTS`, and `ALL_ORGANIZATIONS`.
     */
    requestOwnership?: string[];
    /**
     * Filters customer requests where the request is closed, open, or either of the
     * two where:
     * 
     *  *  `CLOSED_REQUESTS` returns customer requests that are closed.
     *  *  `OPEN_REQUESTS` returns customer requests that are open.
     *  *  `ALL_REQUESTS` returns all customer requests.
     */
    requestStatus?: string;
    /**
     * Filters results to customer requests based on their approval status:
     * 
     *  *  `MY_PENDING_APPROVAL` returns customer requests pending the user's approval.
     *  *  `MY_HISTORY_APPROVAL` returns customer requests where the user was an
     * approver.
     * 
     * **Note**: Valid only when used with requestOwnership=APPROVER.
     */
    approvalStatus?: string;
    /**
     * Filters customer requests that belong to a specific organization (note that the
     * user must be a member of that organization). **Note**: Valid only when used
     * with requestOwnership=ORGANIZATION.
     */
    organizationId?: number;
    /** Filters customer requests by service desk. */
    serviceDeskId?: number;
    /**
     * Filters customer requests by request type. Note that the `serviceDeskId` must
     * be specified for the service desk in which the request type belongs.
     */
    requestTypeId?: number;
    /**
     * A multi-value parameter indicating which properties of the customer request to
     * expand, where:
     * 
     *  *  `serviceDesk` returns additional details for each service desk.
     *  *  `requestType` returns additional details for each request type.
     *  *  `participant` returns the participant details, if any, for each customer
     * request.
     *  *  `sla` returns the SLA information on each customer request.
     *  *  `status` returns the status transitions, in chronological order, for each
     * customer request.
     *  *  `attachment` returns the attachments for the customer request.
     *  *  `action` returns the actions that the user can or cannot perform on this
     * customer request.
     *  *  `comment` returns the comments, if any, for each customer request.
     *  *  `comment.attachment` returns the attachment details, if any, for each
     * comment.
     *  *  `comment.renderedBody` (Experimental) returns the rendered body in HTML
     * format (in addition to the raw body) for each comment.
     */
    expand?: string[];
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
  } = {}): Promise<PagedDtoCustomerRequestDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request",
      method: "GET",
      query: {
        searchTerm,
        requestOwnership,
        requestStatus,
        approvalStatus,
        organizationId,
        serviceDeskId,
        requestTypeId,
        expand,
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
      body: PagedDtoCustomerRequestDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns a list of all the statuses a customer Request has achieved.
   * A status represents the state of an issue in its workflow. An issue can have
   * one active status only. The list returns the status history in chronological
   * order, most recent (current) status first.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * @returns Returns the customer request's status history, on the specified page of the results.
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1/status?start=6&limit=3",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1/status?start=0&limit=3"
   *   },
   *   "values": [
   *     {
   *       "status": "Waiting for Customer",
   *       "statusDate": {
   *         "epochMillis": 1444287900000,
   *         "friendly": "Today 14:05 PM",
   *         "iso8601": "2015-10-08T14:05:00+0700",
   *         "jira": "2015-10-08T14:05:00.000+0700"
   *       }
   *     },
   *     {
   *       "status": "Waiting for Support",
   *       "statusDate": {
   *         "epochMillis": 1444287660000,
   *         "friendly": "Today 14:01 PM",
   *         "iso8601": "2015-10-08T14:01:00+0700",
   *         "jira": "2015-10-08T14:01:00.000+0700"
   *       }
   *     },
   *     {
   *       "status": "Waiting for Customer",
   *       "statusDate": {
   *         "epochMillis": 1444287600000,
   *         "friendly": "Today 14:00 PM",
   *         "iso8601": "2015-10-08T14:00:00+0700",
   *         "jira": "2015-10-08T14:00:00.000+0700"
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  getCustomerRequestStatus = ({
    issueIdOrKey,
    start,
    limit
  }: {
    /** The ID or key of the customer request to be retrieved. */
    issueIdOrKey: string;
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
  }): Promise<PagedDtoCustomerRequestStatusDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/status",
      method: "GET",
      pathParams: {
        issueIdOrKey
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
      body: PagedDtoCustomerRequestStatusDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns a list of transitions, the workflow processes that moves a
   * customer request from one status to another, that the user can perform on a
   * request. Use this method to provide a user with a list if the actions they can
   * take on a customer request.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * @returns Returns the transitions available to the user on the customer request.
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1/transition?start=4&limit=2",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1/transition?start=0&limit=2"
   *   },
   *   "values": [
   *     {
   *       "id": "1",
   *       "name": "Close Request"
   *     },
   *     {
   *       "id": "2",
   *       "name": "Escalate Request"
   *     }
   *   ]
   * }
   * ```
   */
  getCustomerTransitions = ({
    issueIdOrKey,
    start,
    limit
  }: {
    /** The ID or key of the customer request whose transitions will be retrieved. */
    issueIdOrKey: string;
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
  }): Promise<PagedDtoCustomerTransitionDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/transition",
      method: "GET",
      pathParams: {
        issueIdOrKey
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
      body: PagedDtoCustomerTransitionDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method retrieves a feedback of a request using it's `requestKey` or
   * `requestId`
   * 
   * **[Permissions](#permissions) required**: User has view request permissions.
   * 
   * @returns Returns the comment.
   * 
   * example:
   * ```
   * {
   *   "type": "csat",
   *   "rating": 4,
   *   "comment": {
   *     "body": "Great work!"
   *   }
   * }
   * ```
   */
  getFeedback = ({
    requestIdOrKey
  }: {
    /** The id or the key of the request to post the feedback on */
    requestIdOrKey: string;
  }): Promise<CsatFeedbackFullDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{requestIdOrKey}/feedback",
      method: "GET",
      pathParams: {
        requestIdOrKey
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: CsatFeedbackFullDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns details of a customer request's comment.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * **Response limitations**: Customers can only view public comments on requests
   * where they are the reporter or a participant whereas agents can see both
   * internal and public comments.
   * 
   * @returns Returns the comment.
   * 
   * example:
   * ```
   * {
   *   "_expands": [
   *     "attachment",
   *     "renderedBody"
   *   ],
   *   "id": "1000",
   *   "body": "Hello there",
   *   "public": true,
   *   "author": {
   *     "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *     "emailAddress": "fred@example.com",
   *     "displayName": "Fred F. User",
   *     "active": true,
   *     "timeZone": "Australia/Sydney",
   *     "_links": {
   *       "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *       "avatarUrls": {
   *         "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *         "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *         "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *         "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *       },
   *       "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *     }
   *   },
   *   "created": {
   *     "epochMillis": 1444360920000,
   *     "friendly": "Today 10:22 AM",
   *     "iso8601": "2015-10-09T10:22:00+0700",
   *     "jira": "2015-10-09T10:22:00.000+0700"
   *   },
   *   "_links": {
   *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2000/comment/1000"
   *   }
   * }
   * ```
   */
  getRequestCommentById = ({
    issueIdOrKey,
    commentId,
    expand
  }: {
    /** The ID or key of the customer request that contains the comment. */
    issueIdOrKey: string;
    /** The ID of the comment to retrieve. */
    commentId: number;
    /**
     * A multi-value parameter indicating which properties of the comment to expand:
     * 
     *  *  `attachment` returns the attachment details, if any, for the comment. (If
     * you want to get all attachments for a request, use
     * [servicedeskapi/request/\{issueIdOrKey\}/attachment](#api-request-issueIdOrKey-attachment-get).)
     *  *  `renderedBody` (Experimental) returns the rendered body in HTML format (in
     * addition to the raw body) of the comment.
     */
    expand?: string[];
  }): Promise<CommentDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/comment/{commentId}",
      method: "GET",
      pathParams: {
        issueIdOrKey,
        commentId
      },
      query: {
        expand
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: CommentDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns all comments on a customer request. No permissions error is
   * provided if, for example, the user doesn't have access to the service desk or
   * request, the method simply returns an empty response.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * **Response limitations**: Customers are returned public comments only.
   * 
   * @returns Returns the comments, on the specified page of the results.
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2000/comment?start=2&limit=1",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2000/comment?start=0&limit=1"
   *   },
   *   "values": [
   *     {
   *       "_expands": [
   *         "attachment",
   *         "renderedBody"
   *       ],
   *       "id": "1000",
   *       "body": "Hello there",
   *       "public": true,
   *       "author": {
   *         "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *         "emailAddress": "fred@example.com",
   *         "displayName": "Fred F. User",
   *         "active": true,
   *         "timeZone": "Australia/Sydney",
   *         "_links": {
   *           "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
   *           "avatarUrls": {
   *             "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
   *             "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
   *             "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
   *             "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
   *           },
   *           "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
   *         }
   *       },
   *       "created": {
   *         "epochMillis": 1444360920000,
   *         "friendly": "Today 10:22 AM",
   *         "iso8601": "2015-10-09T10:22:00+0700",
   *         "jira": "2015-10-09T10:22:00.000+0700"
   *       },
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/2000/comment/1000"
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  getRequestComments = ({
    issueIdOrKey,
    public: publicQuery,
    internal,
    expand,
    start,
    limit
  }: {
    /** The ID or key of the customer request whose comments will be retrieved. */
    issueIdOrKey: string;
    /** Specifies whether to return public comments or not. Default: true. */
    public?: boolean;
    /** Specifies whether to return internal comments or not. Default: true. */
    internal?: boolean;
    /**
     * A multi-value parameter indicating which properties of the comment to expand:
     * 
     *  *  `attachment` returns the attachment details, if any, for each comment. (If
     * you want to get all attachments for a request, use
     * [servicedeskapi/request/\{issueIdOrKey\}/attachment](#api-request-issueIdOrKey-attachment-get).)
     *  *  `renderedBody` (Experimental) returns the rendered body in HTML format (in
     * addition to the raw body) for each comment.
     */
    expand?: string[];
    /**
     * The starting index of the returned comments. Base index: 0. See the
     * [Pagination](#pagination) section for more details.
     */
    start?: number;
    /**
     * The maximum number of comments to return per page. Default: 50. See the
     * [Pagination](#pagination) section for more details.
     */
    limit?: number;
  }): Promise<PagedDtoCommentDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/comment",
      method: "GET",
      pathParams: {
        issueIdOrKey
      },
      query: {
        public: publicQuery,
        internal,
        expand,
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
      body: PagedDtoCommentDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns a list of all the participants on a customer request.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * @returns Returns the customer request's participants, on the specified page of the results.
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1000/participant?start=2&limit=1",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1000/participant?start=0&limit=1"
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
  getRequestParticipants = ({
    issueIdOrKey,
    start,
    limit
  }: {
    /** The ID or key of the customer request to be queried for its participants. */
    issueIdOrKey: string;
    /**
     * The starting index of the returned objects. Base index: 0. See the
     * [Pagination](#pagination) section for more details.
     */
    start?: number;
    /**
     * The maximum number of request types to return per page. Default: 50. See the
     * [Pagination](#pagination) section for more details.
     */
    limit?: number;
  }): Promise<PagedDtoUserDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/participant",
      method: "GET",
      pathParams: {
        issueIdOrKey
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
   * This method returns all the SLA records on a customer request. A customer
   * request can have zero or more SLAs. Each SLA can have recordings for zero or
   * more "completed cycles" and zero or 1 "ongoing cycle". Each cycle includes
   * information on when it started and stopped, and whether it breached the SLA
   * goal.
   * 
   * **[Permissions](#permissions) required**: Agent for the Service Desk containing
   * the queried customer request.
   * 
   * @returns Returns the SLA records on the customer request, on the specified page of the results.
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/101102/sla?start=6&limit=3",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/101102/sla?start=0&limit=3"
   *   },
   *   "values": [
   *     {
   *       "name": "Time To First Response",
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/101102/sla/10030"
   *       },
   *       "completedCycles": [
   *         {
   *           "startTime": {
   *             "epochMillis": 1444362323000,
   *             "friendly": "Yesterday 10:45 AM",
   *             "iso8601": "2015-10-09T10:45:23+0700",
   *             "jira": "2015-10-09T10:45:23.000+0700"
   *           },
   *           "stopTime": {
   *             "epochMillis": 1444362743000,
   *             "friendly": "Yesterday 10:52 AM",
   *             "iso8601": "2015-10-09T10:52:23+0700",
   *             "jira": "2015-10-09T10:52:23.000+0700"
   *           },
   *           "breachTime": {
   *             "epochMillis": 1444362623000,
   *             "friendly": "Yesterday 10:50 AM",
   *             "iso8601": "2015-10-09T10:50:23+0700",
   *             "jira": "2015-10-09T10:50:23.000+0700"
   *           },
   *           "breached": false,
   *           "goalDuration": {
   *             "millis": 14400000,
   *             "friendly": "4h 240m"
   *           },
   *           "elapsedTime": {
   *             "millis": 420000,
   *             "friendly": "0h 7m"
   *           },
   *           "remainingTime": {
   *             "millis": 13980000,
   *             "friendly": "3h 233m"
   *           }
   *         },
   *         {
   *           "startTime": {
   *             "epochMillis": 1444449143000,
   *             "friendly": "Today 10:52 AM",
   *             "iso8601": "2015-10-10T10:52:23+0700",
   *             "jira": "2015-10-10T10:52:23.000+0700"
   *           },
   *           "stopTime": {
   *             "epochMillis": 1444468523000,
   *             "friendly": "Today 16:15 PM",
   *             "iso8601": "2015-10-10T16:15:23+0700",
   *             "jira": "2015-10-10T16:15:23.000+0700"
   *           },
   *           "breachTime": {
   *             "epochMillis": 1444464743000,
   *             "friendly": "Today 15:12 PM",
   *             "iso8601": "2015-10-10T15:12:23+0700",
   *             "jira": "2015-10-10T15:12:23.000+0700"
   *           },
   *           "breached": true,
   *           "goalDuration": {
   *             "millis": 14400000,
   *             "friendly": "4h 240m"
   *           },
   *           "elapsedTime": {
   *             "millis": 19380000,
   *             "friendly": "5h 323m"
   *           },
   *           "remainingTime": {
   *             "millis": -4980000,
   *             "friendly": "-1h -83m"
   *           }
   *         }
   *       ],
   *       "ongoingCycle": {
   *         "startTime": {
   *           "epochMillis": 1444479323000,
   *           "friendly": "Today 19:15 PM",
   *           "iso8601": "2015-10-10T19:15:23+0700",
   *           "jira": "2015-10-10T19:15:23.000+0700"
   *         },
   *         "breached": false,
   *         "paused": false,
   *         "withinCalendarHours": false,
   *         "goalDuration": {
   *           "millis": 14400000,
   *           "friendly": "4h 240m"
   *         },
   *         "elapsedTime": {
   *           "millis": 5640000,
   *           "friendly": "1h 94m"
   *         },
   *         "remainingTime": {
   *           "millis": 8760000,
   *           "friendly": "2h 146m"
   *         }
   *       }
   *     },
   *     {
   *       "name": "Time To Resolution",
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/101102/sla/10040"
   *       },
   *       "completedCycles": [
   *         {
   *           "startTime": {
   *             "epochMillis": 1444362323000,
   *             "friendly": "Yesterday 10:45 AM",
   *             "iso8601": "2015-10-09T10:45:23+0700",
   *             "jira": "2015-10-09T10:45:23.000+0700"
   *           },
   *           "stopTime": {
   *             "epochMillis": 1444398743000,
   *             "friendly": "Yesterday 20:52 PM",
   *             "iso8601": "2015-10-09T20:52:23+0700",
   *             "jira": "2015-10-09T20:52:23.000+0700"
   *           },
   *           "breachTime": {
   *             "epochMillis": 1444398623000,
   *             "friendly": "Yesterday 20:50 PM",
   *             "iso8601": "2015-10-09T20:50:23+0700",
   *             "jira": "2015-10-09T20:50:23.000+0700"
   *           },
   *           "breached": false,
   *           "goalDuration": {
   *             "millis": 72000000,
   *             "friendly": "20h 1200m"
   *           },
   *           "elapsedTime": {
   *             "millis": 36420000,
   *             "friendly": "10h 607m"
   *           },
   *           "remainingTime": {
   *             "millis": 35580000,
   *             "friendly": "9h 593m"
   *           }
   *         },
   *         {
   *           "startTime": {
   *             "epochMillis": 1444485143000,
   *             "friendly": "Today 20:52 PM",
   *             "iso8601": "2015-10-10T20:52:23+0700",
   *             "jira": "2015-10-10T20:52:23.000+0700"
   *           },
   *           "stopTime": {
   *             "epochMillis": 1444504523000,
   *             "friendly": "Today 02:15 AM",
   *             "iso8601": "2015-10-11T02:15:23+0700",
   *             "jira": "2015-10-11T02:15:23.000+0700"
   *           },
   *           "breachTime": {
   *             "epochMillis": 1444500743000,
   *             "friendly": "Today 01:12 AM",
   *             "iso8601": "2015-10-11T01:12:23+0700",
   *             "jira": "2015-10-11T01:12:23.000+0700"
   *           },
   *           "breached": true,
   *           "goalDuration": {
   *             "millis": 72000000,
   *             "friendly": "20h 1200m"
   *           },
   *           "elapsedTime": {
   *             "millis": 19380000,
   *             "friendly": "5h 323m"
   *           },
   *           "remainingTime": {
   *             "millis": 52620000,
   *             "friendly": "14h 877m"
   *           }
   *         }
   *       ],
   *       "ongoingCycle": {
   *         "startTime": {
   *           "epochMillis": 1444515323000,
   *           "friendly": "Today 05:15 AM",
   *           "iso8601": "2015-10-11T05:15:23+0700",
   *           "jira": "2015-10-11T05:15:23.000+0700"
   *         },
   *         "breached": false,
   *         "paused": false,
   *         "withinCalendarHours": false,
   *         "goalDuration": {
   *           "millis": 72000000,
   *           "friendly": "20h 1200m"
   *         },
   *         "elapsedTime": {
   *           "millis": 5640000,
   *           "friendly": "1h 94m"
   *         },
   *         "remainingTime": {
   *           "millis": 66360000,
   *           "friendly": "18h 1106m"
   *         }
   *       }
   *     },
   *     {
   *       "name": "Time To Retrospective",
   *       "_links": {
   *         "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/101102/sla/10050"
   *       },
   *       "completedCycles": [
   *         {
   *           "startTime": {
   *             "epochMillis": 1444362323000,
   *             "friendly": "Yesterday 10:45 AM",
   *             "iso8601": "2015-10-09T10:45:23+0700",
   *             "jira": "2015-10-09T10:45:23.000+0700"
   *           },
   *           "stopTime": {
   *             "epochMillis": 1444449143000,
   *             "friendly": "Yesterday 10:52 AM",
   *             "iso8601": "2015-10-10T10:52:23+0700",
   *             "jira": "2015-10-10T10:52:23.000+0700"
   *           },
   *           "breachTime": {
   *             "epochMillis": 1444449023000,
   *             "friendly": "Yesterday 10:50 AM",
   *             "iso8601": "2015-10-10T10:50:23+0700",
   *             "jira": "2015-10-10T10:50:23.000+0700"
   *           },
   *           "breached": false,
   *           "goalDuration": {
   *             "millis": 144000000,
   *             "friendly": "40h 2400m"
   *           },
   *           "elapsedTime": {
   *             "millis": 86820000,
   *             "friendly": "24h 1447m"
   *           },
   *           "remainingTime": {
   *             "millis": 57180000,
   *             "friendly": "15h 953m"
   *           }
   *         },
   *         {
   *           "startTime": {
   *             "epochMillis": 1444535543000,
   *             "friendly": "Today 10:52 AM",
   *             "iso8601": "2015-10-11T10:52:23+0700",
   *             "jira": "2015-10-11T10:52:23.000+0700"
   *           },
   *           "stopTime": {
   *             "epochMillis": 1444554923000,
   *             "friendly": "Today 16:15 PM",
   *             "iso8601": "2015-10-11T16:15:23+0700",
   *             "jira": "2015-10-11T16:15:23.000+0700"
   *           },
   *           "breachTime": {
   *             "epochMillis": 1444551143000,
   *             "friendly": "Today 15:12 PM",
   *             "iso8601": "2015-10-11T15:12:23+0700",
   *             "jira": "2015-10-11T15:12:23.000+0700"
   *           },
   *           "breached": true,
   *           "goalDuration": {
   *             "millis": 144000000,
   *             "friendly": "40h 2400m"
   *           },
   *           "elapsedTime": {
   *             "millis": 19380000,
   *             "friendly": "5h 323m"
   *           },
   *           "remainingTime": {
   *             "millis": 124620000,
   *             "friendly": "34h 2077m"
   *           }
   *         }
   *       ],
   *       "ongoingCycle": {
   *         "startTime": {
   *           "epochMillis": 1444565723000,
   *           "friendly": "Today 19:15 PM",
   *           "iso8601": "2015-10-11T19:15:23+0700",
   *           "jira": "2015-10-11T19:15:23.000+0700"
   *         },
   *         "breached": false,
   *         "paused": false,
   *         "withinCalendarHours": false,
   *         "goalDuration": {
   *           "millis": 144000000,
   *           "friendly": "40h 2400m"
   *         },
   *         "elapsedTime": {
   *           "millis": 5640000,
   *           "friendly": "1h 94m"
   *         },
   *         "remainingTime": {
   *           "millis": 138360000,
   *           "friendly": "38h 2306m"
   *         }
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  getSlaInformation = ({
    issueIdOrKey,
    start,
    limit
  }: {
    /** The ID or key of the customer request whose SLAs will be retrieved. */
    issueIdOrKey: string;
    /**
     * The starting index of the returned objects. Base index: 0. See the
     * [Pagination](#pagination) section for more details.
     */
    start?: number;
    /**
     * The maximum number of request types to return per page. Default: 50. See the
     * [Pagination](#pagination) section for more details.
     */
    limit?: number;
  }): Promise<PagedDtoSlaInformationDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/sla",
      method: "GET",
      pathParams: {
        issueIdOrKey
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
      body: PagedDtoSlaInformationDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns the details for an SLA on a customer request.
   * 
   * **[Permissions](#permissions) required**: Agent for the Service Desk containing
   * the queried customer request.
   * 
   * @returns Returns the SLA record, on the specified page of the results.
   * 
   * example:
   * ```
   * {
   *   "name": "Time To First Response",
   *   "_links": {
   *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/request/101102/sla/10030"
   *   },
   *   "completedCycles": [
   *     {
   *       "startTime": {
   *         "epochMillis": 1444362323000,
   *         "friendly": "Yesterday 10:45 AM",
   *         "iso8601": "2015-10-09T10:45:23+0700",
   *         "jira": "2015-10-09T10:45:23.000+0700"
   *       },
   *       "stopTime": {
   *         "epochMillis": 1444362743000,
   *         "friendly": "Yesterday 10:52 AM",
   *         "iso8601": "2015-10-09T10:52:23+0700",
   *         "jira": "2015-10-09T10:52:23.000+0700"
   *       },
   *       "breachTime": {
   *         "epochMillis": 1444362623000,
   *         "friendly": "Yesterday 10:50 AM",
   *         "iso8601": "2015-10-09T10:50:23+0700",
   *         "jira": "2015-10-09T10:50:23.000+0700"
   *       },
   *       "breached": false,
   *       "goalDuration": {
   *         "millis": 14400000,
   *         "friendly": "4h 240m"
   *       },
   *       "elapsedTime": {
   *         "millis": 420000,
   *         "friendly": "0h 7m"
   *       },
   *       "remainingTime": {
   *         "millis": 13980000,
   *         "friendly": "3h 233m"
   *       }
   *     },
   *     {
   *       "startTime": {
   *         "epochMillis": 1444449143000,
   *         "friendly": "Today 10:52 AM",
   *         "iso8601": "2015-10-10T10:52:23+0700",
   *         "jira": "2015-10-10T10:52:23.000+0700"
   *       },
   *       "stopTime": {
   *         "epochMillis": 1444468523000,
   *         "friendly": "Today 16:15 PM",
   *         "iso8601": "2015-10-10T16:15:23+0700",
   *         "jira": "2015-10-10T16:15:23.000+0700"
   *       },
   *       "breachTime": {
   *         "epochMillis": 1444464743000,
   *         "friendly": "Today 15:12 PM",
   *         "iso8601": "2015-10-10T15:12:23+0700",
   *         "jira": "2015-10-10T15:12:23.000+0700"
   *       },
   *       "breached": true,
   *       "goalDuration": {
   *         "millis": 14400000,
   *         "friendly": "4h 240m"
   *       },
   *       "elapsedTime": {
   *         "millis": 19380000,
   *         "friendly": "5h 323m"
   *       },
   *       "remainingTime": {
   *         "millis": -4980000,
   *         "friendly": "-1h -83m"
   *       }
   *     }
   *   ],
   *   "ongoingCycle": {
   *     "startTime": {
   *       "epochMillis": 1444479323000,
   *       "friendly": "Today 19:15 PM",
   *       "iso8601": "2015-10-10T19:15:23+0700",
   *       "jira": "2015-10-10T19:15:23.000+0700"
   *     },
   *     "breached": false,
   *     "paused": false,
   *     "withinCalendarHours": false,
   *     "goalDuration": {
   *       "millis": 14400000,
   *       "friendly": "4h 240m"
   *     },
   *     "elapsedTime": {
   *       "millis": 5640000,
   *       "friendly": "1h 94m"
   *     },
   *     "remainingTime": {
   *       "millis": 8760000,
   *       "friendly": "2h 146m"
   *     }
   *   }
   * }
   * ```
   */
  getSlaInformationById = ({
    issueIdOrKey,
    slaMetricId
  }: {
    /** The ID or key of the customer request whose SLAs will be retrieved. */
    issueIdOrKey: string;
    /** The ID or key of the SLAs metric to be retrieved. */
    slaMetricId: number;
  }): Promise<SlaInformationDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/sla/{slaMetricId}",
      method: "GET",
      pathParams: {
        issueIdOrKey,
        slaMetricId
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: SlaInformationDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method returns the notification subscription status of the user making the
   * request. Use this method to determine if the user is subscribed to a customer
   * request's notifications.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   * 
   * @returns Returns the status of the notification subscription.
   * 
   * example:
   * ```
   * {
   *   "subscribed": true
   * }
   * ```
   */
  getSubscriptionStatus = ({
    issueIdOrKey
  }: {
    /** The ID or key of the customer request to be queried for subscription status. */
    issueIdOrKey: string;
  }): Promise<RequestNotificationSubscriptionDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/notification",
      method: "GET",
      pathParams: {
        issueIdOrKey
      }
    }).then(this.getClientInstance().responseHandler({
      200: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 200;
      mediaType: "application/json";
      body: RequestNotificationSubscriptionDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method performs a customer transition for a given request and transition.
   * An optional comment can be included to provide a reason for the transition.
   * 
   * **[Permissions](#permissions) required**: The user must be able to view the
   * request and have the Transition Issues permission. If a comment is passed the
   * user must have the Add Comments permission.
   */
  performCustomerTransition = ({
    issueIdOrKey,
    customerTransitionExecutionDto
  }: {
    /** ID or key of the issue to transition */
    issueIdOrKey: string;
    /**
     * @example
     * {
     *   "additionalComment": {
     *     "body": "I have fixed the problem."
     *   },
     *   "id": "1"
     * }
     */
    customerTransitionExecutionDto: CustomerTransitionExecutionDto;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/transition",
      method: "POST",
      pathParams: {
        issueIdOrKey
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: customerTransitionExecutionDto
    }).then(commonHttpClient.discardResult);
  };
  /**
   * This method adds a feedback on an request using it's `requestKey` or `requestId`
   * 
   * **[Permissions](#permissions) required**: User must be the reporter or an
   * Atlassian Connect app.
   * 
   * @returns Returns the comment.
   * 
   * example:
   * ```
   * {
   *   "type": "csat",
   *   "rating": 4,
   *   "comment": {
   *     "body": "Great work!"
   *   }
   * }
   * ```
   */
  postFeedback = ({
    requestIdOrKey,
    csatFeedbackFullDto
  }: {
    /** The id or the key of the request to post the feedback on */
    requestIdOrKey: string;
    /**
     * The feedback to be added on the request
     * 
     * @example
     * {
     *   "comment": {
     *     "body": "Great work!"
     *   },
     *   "rating": 4,
     *   "type": "csat"
     * }
     */
    csatFeedbackFullDto: CsatFeedbackFullDto;
  }): Promise<CsatFeedbackFullDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{requestIdOrKey}/feedback",
      method: "POST",
      pathParams: {
        requestIdOrKey
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: csatFeedbackFullDto
    }).then(this.getClientInstance().responseHandler({
      201: {
        "application/json": "json"
      }
    })).then(commonHttpClient.castResponse<{
      status: 201;
      mediaType: "application/json";
      body: CsatFeedbackFullDto;
    }>()).then(commonHttpClient.getBody);
  };
  /**
   * This method removes participants from a customer request.
   * 
   * **[Permissions](#permissions) required**: Permission to manage participants on
   * the customer request.
   * 
   * @returns Returns the first page of the customer request's participants (after removal of the users).
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
   *     "next": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1000/participant?start=2&limit=1",
   *     "prev": "https://your-domain.atlassian.net/rest/servicedeskapi/request/1000/participant?start=0&limit=1"
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
  removeRequestParticipants = ({
    issueIdOrKey,
    requestParticipantUpdateDto
  }: {
    /** The ID or key of the customer request to have participants removed. */
    issueIdOrKey: string;
    /**
     * @example
     * {
     *   "accountIds": [],
     *   "usernames": [
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3a01db05e2a66fa80bd",
     *     "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d69abfa3980ce712caae"
     *   ]
     * }
     */
    requestParticipantUpdateDto: RequestParticipantUpdateDto;
  }): Promise<PagedDtoUserDto> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/participant",
      method: "DELETE",
      pathParams: {
        issueIdOrKey
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: requestParticipantUpdateDto
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
   * This method subscribes the user to receiving notifications from a customer
   * request.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   */
  subscribe = ({
    issueIdOrKey
  }: {
    /** The ID or key of the customer request to be subscribed to. */
    issueIdOrKey: string;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/notification",
      method: "PUT",
      pathParams: {
        issueIdOrKey
      }
    }).then(commonHttpClient.discardResult);
  };
  /**
   * This method unsubscribes the user from notifications from a customer request.
   * 
   * **[Permissions](#permissions) required**: Permission to view the customer
   * request.
   */
  unsubscribe = ({
    issueIdOrKey
  }: {
    /** The ID or key of the customer request to be unsubscribed from. */
    issueIdOrKey: string;
  }): Promise<void> => {
    return this.getClientInstance().request({
      path: "/rest/servicedeskapi/request/{issueIdOrKey}/notification",
      method: "DELETE",
      pathParams: {
        issueIdOrKey
      }
    }).then(commonHttpClient.discardResult);
  };
}