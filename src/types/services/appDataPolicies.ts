/** Details about data policies for a list of projects. */
export interface ProjectDataPolicies {
  /** List of projects with data policies. */
  projectDataPolicies?: ProjectWithDataPolicy[];
}
/** Details about data policy. */
export interface ProjectDataPolicy {
  /**
   * Whether the project contains any content inaccessible to the requesting
   * application.
   */
  anyContentBlocked?: boolean;
}
/** Details about data policies for a project. */
export interface ProjectWithDataPolicy {
  /** Data policy. */
  dataPolicy?: ProjectDataPolicy;
  /** The project ID. */
  id?: number;
}
/** Details about data policy. */
export interface WorkspaceDataPolicy {
  /**
   * Whether the workspace contains any content inaccessible to the requesting
   * application.
   */
  anyContentBlocked?: boolean;
}
