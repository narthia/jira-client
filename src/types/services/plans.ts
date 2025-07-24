export interface CreateCrossProjectReleaseRequest {
  /** The cross-project release name. */
  name: string;
  /** The IDs of the releases to include in the cross-project release. */
  releaseIds?: number[];
}
export interface CreateCustomFieldRequest {
  /** The custom field ID. */
  customFieldId: number;
  /** Allows filtering issues based on their values for the custom field. */
  filter?: boolean;
}
/** The start date field for the plan. */
export interface CreateDateFieldRequest {
  /** A date custom field ID. This is required if the type is "DateCustomField". */
  dateCustomFieldId?: number;
  /**
   * The date field type. This must be "DueDate", "TargetStartDate", "TargetEndDate"
   * or "DateCustomField".
   */
  type: "DueDate" | "TargetStartDate" | "TargetEndDate" | "DateCustomField";
}
/** The exclusion rules for the plan. */
export interface CreateExclusionRulesRequest {
  /** The IDs of the issues to exclude from the plan. */
  issueIds?: number[];
  /** The IDs of the issue types to exclude from the plan. */
  issueTypeIds?: number[];
  /** Issues completed this number of days ago will be excluded from the plan. */
  numberOfDaysToShowCompletedIssues?: number;
  /** The IDs of the releases to exclude from the plan. */
  releaseIds?: number[];
  /** The IDs of the work status categories to exclude from the plan. */
  workStatusCategoryIds?: number[];
  /** The IDs of the work statuses to exclude from the plan. */
  workStatusIds?: number[];
}
export interface CreateIssueSourceRequest {
  /** The issue source type. This must be "Board", "Project" or "Filter". */
  type: "Board" | "Project" | "Filter";
  /**
   * The issue source value. This must be a board ID if the type is "Board", a
   * project ID if the type is "Project" or a filter ID if the type is "Filter".
   */
  value: number;
}
/** The permission holder. */
export interface CreatePermissionHolderRequest {
  /** The permission holder type. This must be "Group" or "AccountId". */
  type: "Group" | "AccountId";
  /**
   * The permission holder value. This must be a group name if the type is "Group"
   * or an account ID if the type is "AccountId".
   */
  value: string;
}
export interface CreatePermissionRequest {
  /** The permission holder. */
  holder: CreatePermissionHolderRequest;
  /** The permission type. This must be "View" or "Edit". */
  type: "View" | "Edit";
}
export interface CreatePlanRequest {
  /** The cross-project releases to include in the plan. */
  crossProjectReleases?: CreateCrossProjectReleaseRequest[];
  /** The custom fields for the plan. */
  customFields?: CreateCustomFieldRequest[];
  /** The exclusion rules for the plan. */
  exclusionRules?: CreateExclusionRulesRequest;
  /** The issue sources to include in the plan. */
  issueSources: CreateIssueSourceRequest[];
  /** The account ID of the plan lead. */
  leadAccountId?: string;
  /** The plan name. */
  name: string;
  /** The permissions for the plan. */
  permissions?: CreatePermissionRequest[];
  /** The scheduling settings for the plan. */
  scheduling: CreateSchedulingRequest;
}
/** The scheduling settings for the plan. */
export interface CreateSchedulingRequest {
  /** The dependencies for the plan. This must be "Sequential" or "Concurrent". */
  dependencies?: "Sequential" | "Concurrent";
  /** The end date field for the plan. */
  endDate?: CreateDateFieldRequest;
  /** The estimation unit for the plan. This must be "StoryPoints", "Days" or "Hours". */
  estimation: "StoryPoints" | "Days" | "Hours";
  /**
   * The inferred dates for the plan. This must be "None", "SprintDates" or
   * "ReleaseDates".
   */
  inferredDates?: "None" | "SprintDates" | "ReleaseDates";
  /** The start date field for the plan. */
  startDate?: CreateDateFieldRequest;
}
export interface DuplicatePlanRequest {
  /** The plan name. */
  name: string;
}
export interface GetCrossProjectReleaseResponse {
  /** The cross-project release name. */
  name?: string;
  /** The IDs of the releases included in the cross-project release. */
  releaseIds?: number[];
}
export interface GetCustomFieldResponse {
  /** The custom field ID. */
  customFieldId: number;
  /** Allows filtering issues based on their values for the custom field. */
  filter?: boolean;
}
/** The start date field for the plan. */
export interface GetDateFieldResponse {
  /** A date custom field ID. This is returned if the type is "DateCustomField". */
  dateCustomFieldId?: number;
  /**
   * The date field type. This is "DueDate", "TargetStartDate", "TargetEndDate" or
   * "DateCustomField".
   */
  type: "DueDate" | "TargetStartDate" | "TargetEndDate" | "DateCustomField";
}
/** The exclusion rules for the plan. */
export interface GetExclusionRulesResponse {
  /** The IDs of the issues excluded from the plan. */
  issueIds?: number[];
  /** The IDs of the issue types excluded from the plan. */
  issueTypeIds?: number[];
  /** Issues completed this number of days ago are excluded from the plan. */
  numberOfDaysToShowCompletedIssues: number;
  /** The IDs of the releases excluded from the plan. */
  releaseIds?: number[];
  /** The IDs of the work status categories excluded from the plan. */
  workStatusCategoryIds?: number[];
  /** The IDs of the work statuses excluded from the plan. */
  workStatusIds?: number[];
}
export interface GetIssueSourceResponse {
  /** The issue source type. This is "Board", "Project" or "Filter". */
  type: "Board" | "Project" | "Filter" | "Custom";
  /**
   * The issue source value. This is a board ID if the type is "Board", a project ID
   * if the type is "Project" or a filter ID if the type is "Filter".
   */
  value: number;
}
/** The permission holder. */
export interface GetPermissionHolderResponse {
  /** The permission holder type. This is "Group" or "AccountId". */
  type: "Group" | "AccountId";
  /**
   * The permission holder value. This is a group name if the type is "Group" or an
   * account ID if the type is "AccountId".
   */
  value: string;
}
export interface GetPermissionResponse {
  /** The permission holder. */
  holder: GetPermissionHolderResponse;
  /** The permission type. This is "View" or "Edit". */
  type: "View" | "Edit";
}
export interface GetPlanResponse {
  /** The cross-project releases included in the plan. */
  crossProjectReleases?: GetCrossProjectReleaseResponse[];
  /** The custom fields for the plan. */
  customFields?: GetCustomFieldResponse[];
  /** The exclusion rules for the plan. */
  exclusionRules?: GetExclusionRulesResponse;
  /** The plan ID. */
  id: number;
  /** The issue sources included in the plan. */
  issueSources?: GetIssueSourceResponse[];
  /** The date when the plan was last saved in UTC. */
  lastSaved?: string;
  /** The account ID of the plan lead. */
  leadAccountId?: string;
  /** The plan name. */
  name?: string;
  /** The permissions for the plan. */
  permissions?: GetPermissionResponse[];
  /** The scheduling settings for the plan. */
  scheduling: GetSchedulingResponse;
  /** The plan status. This is "Active", "Trashed" or "Archived". */
  status: "Active" | "Trashed" | "Archived";
}
export interface GetPlanResponseForPage {
  /** The plan ID. */
  id: string;
  /** The issue sources included in the plan. */
  issueSources?: GetIssueSourceResponse[];
  /** The plan name. */
  name: string;
  /** Default scenario ID. */
  scenarioId: string;
  /** The plan status. This is "Active", "Trashed" or "Archived". */
  status: "Active" | "Trashed" | "Archived";
}
/** The scheduling settings for the plan. */
export interface GetSchedulingResponse {
  /** The dependencies for the plan. This is "Sequential" or "Concurrent". */
  dependencies: "Sequential" | "Concurrent";
  /** The end date field for the plan. */
  endDate: GetDateFieldResponse;
  /** The estimation unit for the plan. This is "StoryPoints", "Days" or "Hours". */
  estimation: "StoryPoints" | "Days" | "Hours";
  /**
   * The inferred dates for the plan. This is "None", "SprintDates" or
   * "ReleaseDates".
   */
  inferredDates: "None" | "SprintDates" | "ReleaseDates";
  /** The start date field for the plan. */
  startDate: GetDateFieldResponse;
}
export interface PageWithCursorGetPlanResponseForPage {
  cursor?: string;
  last?: boolean;
  nextPageCursor?: string;
  size?: number;
  total?: number;
  values?: GetPlanResponseForPage[];
}
