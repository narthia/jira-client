import type { WorkflowScheme } from "./common";
/**
 * A container for a list of workflow schemes together with the projects they are
 * associated with.
 */
export interface ContainerOfWorkflowSchemeAssociations {
  /** A list of workflow schemes together with projects they are associated with. */
  values: WorkflowSchemeAssociations[];
}
/** A workflow scheme along with a list of projects that use it. */
export interface WorkflowSchemeAssociations {
  /** The list of projects that use the workflow scheme. */
  projectIds: string[];
  /** The workflow scheme. */
  workflowScheme: WorkflowScheme;
}
/** An associated workflow scheme and project. */
export interface WorkflowSchemeProjectAssociation {
  /** The ID of the project. */
  projectId: string;
  /**
   * The ID of the workflow scheme. If the workflow scheme ID is `null`, the
   * operation assigns the default workflow scheme.
   */
  workflowSchemeId?: string;
}
