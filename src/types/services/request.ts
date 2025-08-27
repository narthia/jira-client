import type {
  SelfLinkDto,
  DateDto,
  UserDto,
  PagedDtoUserDto,
  RequestTypeDto,
  ServiceDeskDto,
  PagedLinkDto,
  JsonTypeBean,
  JsonNode
} from "./common";
/** Additional content of the comment */
export interface AdditionalCommentDto {
  /** Content of the comment. */
  body?: string;
}
export interface ApprovalDecisionRequestDto {
  /** Response to the approval request. */
  decision?: "approve" | "decline";
}
export interface ApprovalDto {
  /** The REST API URL of the approval. */
  _links?: SelfLinkDto;
  /** Detailed list of the users who must provide a response to the approval. */
  approvers?: ApproverDto[];
  /**
   * Indicates whether the user making the request is one of the approvers and can
   * respond to the approval (true) or not (false).
   */
  canAnswerApproval?: boolean;
  /** Date the approval was completed. */
  completedDate?: DateDto;
  /** Date the approval was created. */
  createdDate?: DateDto;
  /** Outcome of the approval, based on the approvals provided by all approvers. */
  finalDecision?: "approved" | "declined" | "pending";
  /** ID of the approval. */
  id?: string;
  /** Description of the approval being sought or provided. */
  name?: string;
}
export interface ApproverDto {
  /** Details of the User who is providing approval. */
  approver?: UserDto;
  /** Decision made by the approver. */
  approverDecision?: "approved" | "declined" | "pending";
}
export interface AttachmentCreateDto {
  /** Additional content of the comment */
  additionalComment?: AdditionalCommentDto;
  /** Controls whether the comment and its attachments are visible to customers */
  public?: boolean;
  /** List of IDs for the temporary attachments to be added to the customer request. */
  temporaryAttachmentIds?: string[];
}
export interface AttachmentCreateResultDto {
  /** List of the attachments added. */
  attachments?: PagedDtoAttachmentDto;
  /** Details of the comment included with the attachments. */
  comment?: CommentDto;
}
export interface AttachmentDto {
  /** Various URLs for the attachment. */
  _links?: AttachmentLinkDto;
  /** Details of the user who attached the file. */
  author?: UserDto;
  /** Date the attachment was added. */
  created?: DateDto;
  /** Filename of the item attached. */
  filename?: string;
  /** MIME type of the attachment. */
  mimeType?: string;
  /** Size of the attachment in bytes. */
  size?: number;
}
/** Various URLs for the attachment. */
export interface AttachmentLinkDto {
  /** URL for the attachment. */
  content?: string;
  /** REST API URL for the attachment */
  jiraRest?: string;
  self?: string;
  /** URL for the attachment's thumbnail image. */
  thumbnail?: string;
}
export interface CommentCreateDto {
  /** Content of the comment. */
  body?: string;
  /** Indicates whether the comment is public (true) or private/internal (false). */
  public?: boolean;
}
export interface CommentDto {
  /**
   * List of items that can be expanded in the response by specifying the expand
   * query parameter.
   */
  _expands?: string[];
  /** REST API URL link to the comment. */
  _links?: SelfLinkDto;
  /** List of the attachments included in the comment. */
  attachments?: PagedDtoAttachmentDto;
  /** Details of the customer who authored the comment. */
  author?: UserDto;
  /** Content of the comment. */
  body?: string;
  /** Date the comment was created. */
  created?: DateDto;
  /** ID of the comment. */
  id?: string;
  /** Indicates whether the comment is public (true) or private/internal (false). */
  public?: boolean;
  /** The rendered body of the comment. */
  renderedBody?: RenderedValueDto;
}
export interface CsatFeedbackFullDto {
  /** (Optional) The comment provided with this feedback. */
  comment?: AdditionalCommentDto;
  /**
   * A numeric representation of the rating, this must be an integer value between 1
   * and 5.
   */
  rating?: number;
  /** Indicates the type of feedback, supported values: `csat`. */
  type?: string;
}
/** Action of removing participants from a request. */
export interface CustomerRequestActionDto {
  /** Indicates whether the user can undertake the action (true) or not (false). */
  allowed?: boolean;
}
/** List of actions that the user can take on the request. */
export interface CustomerRequestActionsDto {
  /** Action of adding attachments to a request. */
  addAttachment?: CustomerRequestActionDto;
  /** Action of adding comments to a request. */
  addComment?: CustomerRequestActionDto;
  /** Action of adding participants to a request. */
  addParticipant?: CustomerRequestActionDto;
  /** Action of removing participants from a request. */
  removeParticipant?: CustomerRequestActionDto;
}
export interface CustomerRequestDto {
  /**
   * List of items that can be expanded in the response by specifying the expand
   * query parameter.
   */
  _expands?: string[];
  /** List of links associated with the request. */
  _links?: CustomerRequestLinkDto;
  /** List of actions that the user can take on the request. */
  actions?: CustomerRequestActionsDto;
  /** List of attachments included with the request. */
  attachments?: PagedDtoAttachmentDto;
  /** List of comments included with the request. */
  comments?: PagedDtoCommentDto;
  /** Date on which the request was created. */
  createdDate?: DateDto;
  /** Status of the request. */
  currentStatus?: CustomerRequestStatusDto;
  /** ID of the request, as the peer issue ID. */
  issueId?: string;
  /** Key of the request, as the peer issue key. */
  issueKey?: string;
  /** Expandable details of the customers participating in the request. */
  participants?: PagedDtoUserDto;
  /** Details of the customer reporting the request. */
  reporter?: UserDto;
  /**
   * JSON map of Jira field IDs and their values representing the content of the
   * request. This list does not include hidden fields.
   */
  requestFieldValues?: CustomerRequestFieldValueDto[];
  /** Expandable details of the request type. */
  requestType?: RequestTypeDto;
  /** ID of the request type for the request. */
  requestTypeId?: string;
  /** Expandable details of the service desk. */
  serviceDesk?: ServiceDeskDto;
  /** ID of the service desk the request belongs to. */
  serviceDeskId?: string;
  /** Expandable details of the SLAs relating to the request. */
  sla?: PagedDtoSlaInformationDto;
  /** Expandable details of the request's status history. */
  status?: PagedDtoCustomerRequestStatusDto;
  /** Summary of the request created */
  summary?: string;
}
export interface CustomerRequestFieldValueDto {
  /** ID of the field. */
  fieldId?: string;
  /** Text label for the field. */
  label?: string;
  /** Value of the field rendered in the UI. */
  renderedValue?: {
    [key: string]: unknown;
  };
  /** Value of the field. */
  value?: unknown;
}
/** List of links associated with the request. */
export interface CustomerRequestLinkDto {
  /** Jira agent view URL for the request. */
  agent?: string;
  /** REST API URL for the request. */
  jiraRest?: string;
  self?: string;
  /** Web URL for the request. */
  web?: string;
}
/** Status of the request. */
export interface CustomerRequestStatusDto {
  /** Name of the status condition. */
  status?: string;
  /** Status category the status belongs to. */
  statusCategory?: "UNDEFINED" | "NEW" | "INDETERMINATE" | "DONE";
  /** Date on which the status was attained. */
  statusDate?: DateDto;
}
export interface CustomerTransitionDto {
  /** ID of the transition. */
  id?: string;
  /** Name of the transition. */
  name?: string;
}
export interface CustomerTransitionExecutionDto {
  /** Comment explaining the reason for the transition. */
  additionalComment?: AdditionalCommentDto;
  /** ID of the transition to be performed. */
  id?: string;
}
/** Duration remaining after the service was completed. */
export interface DurationDto {
  /** Duration in a user-friendly text format. */
  friendly?: string;
  /** Duration in milliseconds. */
  millis?: number;
}
/**
 * Provides answers to the form associated with a request type that is attached to
 * the request on creation. Jira fields should be omitted from
 * `requestFieldValues` if they are linked to form answers. Form answers in ADF
 * format should have `isAdfRequest` set to true. Form answers are not currently
 * validated.
 */
export interface Form extends Record<string, unknown> {
  /**
   * JSON mapping of form field answers containing form field IDs and corresponding
   * values.
   */
  answers?: {
    [key: string]: FormAnswer;
  };
}
export interface FormAnswer {
  /** Answer in Atlassian Document Format (ADF) */
  adf?: JsonNode;
  /** IDs of selected choices */
  choices?: string[];
  /** Answer in date format (yyyy-MM-dd) */
  date?: string;
  /**
   * The IDs of files to be attached to the form that are obtained by calling the
   * ‘attach temporary file’ endpoint on the corresponding service desk.
   */
  files?: string[];
  /** Answer in free text format */
  text?: string;
  /** Answer in timestamp format (HH:mm) */
  time?: string;
  /** IDs of selected users */
  users?: string[];
}
export interface PagedDtoApprovalDto {
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
  values?: ApprovalDto[];
}
/** List of attachments included with the request. */
export interface PagedDtoAttachmentDto {
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
  values?: AttachmentDto[];
}
/** List of comments included with the request. */
export interface PagedDtoCommentDto {
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
  values?: CommentDto[];
}
export interface PagedDtoCustomerRequestDto {
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
  values?: CustomerRequestDto[];
}
/** Expandable details of the request's status history. */
export interface PagedDtoCustomerRequestStatusDto {
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
  values?: CustomerRequestStatusDto[];
}
export interface PagedDtoCustomerTransitionDto {
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
  values?: CustomerTransitionDto[];
}
/** Expandable details of the SLAs relating to the request. */
export interface PagedDtoSlaInformationDto {
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
  values?: SlaInformationDto[];
}
/** The rendered body of the comment. */
export interface RenderedValueDto {
  html?: string;
}
export interface RequestCreateDto {
  /** (Experimental) Shows extra information for the request channel. */
  channel?: string;
  /**
   * Provides answers to the form associated with a request type that is attached to
   * the request on creation. Jira fields should be omitted from
   * `requestFieldValues` if they are linked to form answers. Form answers in ADF
   * format should have `isAdfRequest` set to true. Form answers are not currently
   * validated.
   */
  form?: Form;
  /**
   * (Experimental) Whether to accept rich text fields in Atlassian Document Format
   * (ADF).
   */
  isAdfRequest?: boolean;
  /** The `accountId` of the customer that the request is being raised on behalf of. */
  raiseOnBehalfOf?: string;
  /**
   * JSON map of Jira field IDs and their values representing the content of the
   * request.
   */
  requestFieldValues?: {
    [key: string]: unknown;
  };
  /**
   * List of customers to participate in the request, as a list of `accountId`
   * values.
   */
  requestParticipants?: string[];
  /** ID of the request type for the request. */
  requestTypeId?: string;
  /** ID of the service desk in which to create the request. */
  serviceDeskId?: string;
}
export interface RequestNotificationSubscriptionDto {
  /**
   * Indicates whether the user is subscribed (true) or not (false) to the request's
   * notifications.
   */
  subscribed?: boolean;
}
export interface RequestParticipantUpdateDto {
  /**
   * List of users, specified by account IDs, to add to or remove as participants in
   * the request.
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
export interface RequestTypeFieldDto {
  /** List of default values for the field. */
  defaultValues?: RequestTypeFieldValueDto[];
  /** Description of the field. */
  description?: string;
  /** ID of the field. */
  fieldId?: string;
  /** Jira specific implementation details for the field in the UI. */
  jiraSchema?: JsonTypeBean;
  /** Name of the field. */
  name?: string;
  /** List of preset values for the field. */
  presetValues?: string[];
  /** Indicates if the field is required (true) or not (false). */
  required?: boolean;
  /** List of valid values for the field. */
  validValues?: RequestTypeFieldValueDto[];
  visible?: boolean;
}
export interface RequestTypeFieldValueDto {
  /** List of child fields. */
  children?: RequestTypeFieldValueDto[];
  /** Label for the field. */
  label?: string;
  /** Value of the field. */
  value?: string;
}
/** Links to the request type's icons. */
export interface RequestTypeIconDto {
  /** Map of the URLs for the request type icons. */
  _links?: RequestTypeIconLinkDto;
  /** ID of the request type icon. */
  id?: string;
}
/** Map of the URLs for the request type icons. */
export interface RequestTypeIconLinkDto {
  /** URLs for the request type icons. */
  iconUrls?: {
    [key: string]: string;
  };
}
export interface SlaInformationCompletedCycleDto {
  /**
   * Time and date at which the SLA cycle breached in case of completed breached
   * cycle or would have breached in case of non-breached completed cycle.
   */
  breachTime?: DateDto;
  /** Indicates if the SLA (duration) was exceeded (true) or not (false). */
  breached?: boolean;
  /** Duration in which the service was completed. */
  elapsedTime?: DurationDto;
  /** Duration within which the service should have been completed. */
  goalDuration?: DurationDto;
  /** Duration remaining after the service was completed. */
  remainingTime?: DurationDto;
  /** Time and date at which the SLA cycle started. */
  startTime?: DateDto;
  /** Time and date at which the SLA cycle completed. */
  stopTime?: DateDto;
}
export interface SlaInformationDto {
  /** REST API URL for the SLA. */
  _links?: SelfLinkDto;
  /** List of completed cycles for the SLA. */
  completedCycles?: SlaInformationCompletedCycleDto[];
  /** ID of the Service Level Agreement (SLA). */
  id?: string;
  /** Description of the SLA. */
  name?: string;
  /** Details of the active cycle for the SLA. */
  ongoingCycle?: SlaInformationOngoingCycleDto;
  /** Format in which SLA is to be displayed in the UI */
  slaDisplayFormat?: string;
}
/** Details of the active cycle for the SLA. */
export interface SlaInformationOngoingCycleDto {
  /** Time and date at which the SLA cycle would have breached its limit. */
  breachTime?: DateDto;
  /** Indicates whether the SLA has been breached (true) or not (false). */
  breached?: boolean;
  /** Duration of the service. */
  elapsedTime?: DurationDto;
  /** Duration within which the service should be completed. */
  goalDuration?: DurationDto;
  /** Indicates whether the SLA is paused (true) or not (false). */
  paused?: boolean;
  /** Duration remaining in which to complete the service. */
  remainingTime?: DurationDto;
  /** Time and date at which the SLA cycle started. */
  startTime?: DateDto;
  /**
   * Indicates whether the SLA it timed during calendared working hours only (true)
   * or not (false).
   */
  withinCalendarHours?: boolean;
}
