import type { WorkflowScheme, DocumentVersion, ProjectUsagePage, WorkflowScope } from "./common";
/**
 * Overrides, for the selected issue types, any status mappings provided in
 * `statusMappingsByWorkflows`. Status mappings are required when the new workflow
 * for an issue type doesn't contain all statuses that the old workflow has.
 * Status mappings can be provided by a combination of `statusMappingsByWorkflows`
 * and `statusMappingsByIssueTypeOverride`.
 */
export interface MappingsByIssueTypeOverride {
  /** The ID of the issue type for this mapping. */
  issueTypeId: string;
  /** The list of status mappings. */
  statusMappings: WorkflowAssociationStatusMapping[];
}
/**
 * The status mappings by workflows. Status mappings are required when the new
 * workflow for an issue type doesn't contain all statuses that the old workflow
 * has. Status mappings can be provided by a combination of
 * `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.
 */
export interface MappingsByWorkflow {
  /** The ID of the new workflow. */
  newWorkflowId: string;
  /** The ID of the old workflow. */
  oldWorkflowId: string;
  /** The list of status mappings. */
  statusMappings: WorkflowAssociationStatusMapping[];
}
/** A page of items. */
export interface PageBeanWorkflowScheme {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: WorkflowScheme[];
}
/** The list of required status mappings by issue type. */
export interface RequiredMappingByIssueType {
  /** The ID of the issue type. */
  issueTypeId?: string;
  /** The status IDs requiring mapping. */
  statusIds?: string[];
}
/** The list of required status mappings by workflow. */
export interface RequiredMappingByWorkflows {
  /** The ID of the source workflow. */
  sourceWorkflowId?: string;
  /** The status IDs requiring mapping. */
  statusIds?: string[];
  /** The ID of the target workflow. */
  targetWorkflowId?: string;
}
/** Represents a usage of an entity by a project ID and related issue type IDs. */
export interface SimpleUsage {
  /** The issue type IDs for the usage. */
  issueTypeIds: string[];
  /** The project ID for the usage. */
  projectId: string;
}
/** The statuses associated with each workflow. */
export interface StatusesPerWorkflow {
  /** The ID of the initial status for the workflow. */
  initialStatusId?: string;
  /** The status IDs associated with the workflow. */
  statuses?: string[];
  /** The ID of the workflow. */
  workflowId?: string;
}
/** The details of the statuses in the associated workflows. */
export interface StatusMetadata {
  /** The category of the status. */
  category?: "TODO" | "IN_PROGRESS" | "DONE";
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
}
/** The list of status mappings. */
export interface WorkflowAssociationStatusMapping {
  /** The ID of the status in the new workflow. */
  newStatusId: string;
  /** The ID of the status in the old workflow that isn't present in the new workflow. */
  oldStatusId: string;
}
/** The workflow metadata and issue type IDs which use this workflow. */
export interface WorkflowMetadataAndIssueTypeRestModel {
  /** The list of issue type IDs for the mapping. */
  issueTypeIds: string[];
  /** Workflow metadata and usage detail. */
  workflow: WorkflowMetadataRestModel;
}
/** Workflow metadata and usage detail. */
export interface WorkflowMetadataRestModel {
  /** The description of the workflow. */
  description: string;
  /** The ID of the workflow. */
  id: string;
  /** The name of the workflow. */
  name: string;
  /**
   * Deprecated. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
   * for details.
   *
   * Use the optional `workflows.usages` expand to get additional information about
   * the projects and issue types associated with the workflows in the workflow
   * scheme.
   */
  usage: (SimpleUsage | null)[] | null;
  /** The current version details of this workflow scheme. */
  version: DocumentVersion;
}
/**
 * The explicit association between issue types and a workflow in a workflow
 * scheme.
 */
export interface WorkflowSchemeAssociation {
  /** The issue types assigned to the workflow. */
  issueTypeIds: string[];
  /** The ID of the workflow. */
  workflowId: string;
}
/** Projects using the workflow scheme. */
export interface WorkflowSchemeProjectUsageDto {
  /** A page of projects. */
  projects?: ProjectUsagePage;
  /** The workflow scheme ID. */
  workflowSchemeId?: string;
}
/** The workflow scheme read request body. */
export interface WorkflowSchemeReadRequest {
  /** The list of project IDs to query. */
  projectIds?: (string | null)[] | null;
  /** The list of workflow scheme IDs to query. */
  workflowSchemeIds?: (string | null)[] | null;
}
export interface WorkflowSchemeReadResponse {
  /** Workflow metadata and usage detail. */
  defaultWorkflow?: WorkflowMetadataRestModel;
  /** The description of the workflow scheme. */
  description?: string | null;
  /** The ID of the workflow scheme. */
  id: string;
  /** The name of the workflow scheme. */
  name: string;
  /**
   * Deprecated. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
   * for details.
   *
   * The IDs of projects using the workflow scheme.
   */
  projectIdsUsingScheme?: (string | null)[] | null;
  /** The scope of the workflow. */
  scope: WorkflowScope;
  /**
   * Indicates if there's an [asynchronous task](#async-operations) for this
   * workflow scheme.
   */
  taskId?: string | null;
  /** The current version details of this workflow scheme. */
  version: DocumentVersion;
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes: WorkflowMetadataAndIssueTypeRestModel[];
}
/** The update workflow scheme payload. */
export interface WorkflowSchemeUpdateRequest extends Record<string, unknown> {
  /**
   * The ID of the workflow for issue types without having a mapping defined in this
   * workflow scheme. Only used in global-scoped workflow schemes. If the
   * `defaultWorkflowId` isn't specified, this is set to *Jira Workflow (jira)*.
   */
  defaultWorkflowId?: string;
  /** The new description for this workflow scheme. */
  description: string;
  /** The ID of this workflow scheme. */
  id: string;
  /** The new name for this workflow scheme. */
  name: string;
  /**
   * Overrides, for the selected issue types, any status mappings provided in
   * `statusMappingsByWorkflows`. Status mappings are required when the new workflow
   * for an issue type doesn't contain all statuses that the old workflow has.
   * Status mappings can be provided by a combination of `statusMappingsByWorkflows`
   * and `statusMappingsByIssueTypeOverride`.
   */
  statusMappingsByIssueTypeOverride?: MappingsByIssueTypeOverride[];
  /**
   * The status mappings by workflows. Status mappings are required when the new
   * workflow for an issue type doesn't contain all statuses that the old workflow
   * has. Status mappings can be provided by a combination of
   * `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.
   */
  statusMappingsByWorkflows?: MappingsByWorkflow[];
  /** The current version details of this workflow scheme. */
  version: DocumentVersion;
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes?: WorkflowSchemeAssociation[];
}
/** The request payload to get the required mappings for updating a workflow scheme. */
export interface WorkflowSchemeUpdateRequiredMappingsRequest {
  /**
   * The ID of the new default workflow for this workflow scheme. Only used in
   * global-scoped workflow schemes. If it isn't specified, is set to *Jira Workflow
   * (jira)*.
   */
  defaultWorkflowId?: string | null;
  /** The ID of the workflow scheme. */
  id: string;
  /** The new workflow to issue type mappings for this workflow scheme. */
  workflowsForIssueTypes: WorkflowSchemeAssociation[];
}
export interface WorkflowSchemeUpdateRequiredMappingsResponse {
  /** The list of required status mappings by issue type. */
  statusMappingsByIssueTypes?: RequiredMappingByIssueType[];
  /** The list of required status mappings by workflow. */
  statusMappingsByWorkflows?: RequiredMappingByWorkflows[];
  /** The details of the statuses in the associated workflows. */
  statuses?: StatusMetadata[];
  /** The statuses associated with each workflow. */
  statusesPerWorkflow?: StatusesPerWorkflow[];
}
