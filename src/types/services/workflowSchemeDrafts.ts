/** Details about the status mappings for publishing a draft workflow scheme. */
export interface PublishDraftWorkflowScheme {
  /** Mappings of statuses to new statuses for issue types. */
  statusMappings?: StatusMapping[];
}
/** Details about the mapping from a status to a new status for an issue type. */
export interface StatusMapping {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the new status. */
  newStatusId: string;
  /** The ID of the status. */
  statusId: string;
}
