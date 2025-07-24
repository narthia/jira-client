import type { PageBeanProjectDetails, JsonNode } from "./common";
/** Details of a new priority scheme */
export interface CreatePrioritySchemeDetails {
  /** The ID of the default priority for the priority scheme. */
  defaultPriorityId: number;
  /** The description of the priority scheme. */
  description?: string;
  /**
   * Instructions to migrate the priorities of issues.
   *
   * `in` mappings are used to migrate the priorities of issues to priorities used
   * within the priority scheme.
   *
   * `out` mappings are used to migrate the priorities of issues to priorities not
   * used within the priority scheme.
   *
   *  *  When **priorities** are **added** to the new priority scheme, no mapping
   * needs to be provided as the new priorities are not used by any issues.
   *  *  When **priorities** are **removed** from the new priority scheme, no
   * mapping needs to be provided as the removed priorities are not used by any
   * issues.
   *  *  When **projects** are **added** to the priority scheme, the priorities of
   * issues in those projects might need to be migrated to new priorities used by
   * the priority scheme. This can occur when the current scheme does not use all
   * the priorities in the project(s)' priority scheme(s).
   *
   *      *  An `in` mapping must be provided for each of these priorities.
   *  *  When **projects** are **removed** from the priority scheme, no mapping
   * needs to be provided as the removed projects are not using the priorities of
   * the new priority scheme.
   *
   * For more information on `in` and `out` mappings, see the child properties
   * documentation for the `PriorityMapping` object below.
   */
  mappings?: PriorityMapping;
  /** The name of the priority scheme. Must be unique. */
  name: string;
  /** The IDs of priorities in the scheme. */
  priorityIds: number[];
  /** The IDs of projects that will use the priority scheme. */
  projectIds?: number[];
}
/** A page of items. */
export interface PageBeanPrioritySchemeWithPaginatedPrioritiesAndProjects {
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
  values?: PrioritySchemeWithPaginatedPrioritiesAndProjects[];
}
/** A page of items. */
export interface PageBeanPriorityWithSequence {
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
  values?: PriorityWithSequence[];
}
/** Mapping of issue priorities for changes in priority schemes. */
export interface PriorityMapping {
  /**
   * The mapping of priorities for issues being migrated **into** this priority
   * scheme. Key is the old priority ID, value is the new priority ID (must exist in
   * this priority scheme).
   *
   * E.g. The current priority scheme has priority ID `10001`. Issues with priority
   * ID `10000` are being migrated into this priority scheme will need mapping to
   * new priorities. The `in` mapping would be `{"10000": 10001}`.
   */
  in?: {
    [key: string]: number;
  };
  /**
   * The mapping of priorities for issues being migrated **out of** this priority
   * scheme. Key is the old priority ID (must exist in this priority scheme), value
   * is the new priority ID (must exist in the default priority scheme). Required
   * for updating an existing priority scheme. Not used when creating a new priority
   * scheme.
   *
   * E.g. The current priority scheme has priority ID `10001`. Issues with priority
   * ID `10001` are being migrated out of this priority scheme will need mapping to
   * new priorities. The `out` mapping would be `{"10001": 10000}`.
   */
  out?: {
    [key: string]: number;
  };
}
/** Priorities to remove from a scheme */
export interface PrioritySchemeChangesWithoutMappings {
  /** Affected entity ids. */
  ids: number[];
}
/** The ID of a priority scheme. */
export interface PrioritySchemeId {
  /** The ID of the priority scheme. */
  id?: string;
  /** The in-progress issue migration task. */
  task?: TaskProgressBeanJsonNode;
}
/** A priority scheme with paginated priorities and projects. */
export interface PrioritySchemeWithPaginatedPrioritiesAndProjects extends Record<string, unknown> {
  default?: boolean;
  /** The ID of the default issue priority. */
  defaultPriorityId?: string;
  /** The description of the priority scheme */
  description?: string;
  /** The ID of the priority scheme. */
  id: string;
  isDefault?: boolean;
  /** The name of the priority scheme */
  name: string;
  /** The paginated list of priorities. */
  priorities?: PageBeanPriorityWithSequence;
  /** The paginated list of projects. */
  projects?: PageBeanProjectDetails;
  /** The URL of the priority scheme. */
  self?: string;
}
/** An issue priority with sequence information. */
export interface PriorityWithSequence {
  /** The description of the issue priority. */
  description?: string;
  /** The URL of the icon for the issue priority. */
  iconUrl?: string;
  /** The ID of the issue priority. */
  id?: string;
  /** Whether this priority is the default. */
  isDefault?: boolean;
  /** The name of the issue priority. */
  name?: string;
  /** The URL of the issue priority. */
  self?: string;
  /** The sequence of the issue priority. */
  sequence?: string;
  /** The color used to indicate the issue priority. */
  statusColor?: string;
}
/**
 * Details of changes to a priority scheme's priorities that require suggested
 * priority mappings.
 */
export interface SuggestedMappingsForPrioritiesRequestBean {
  /** The ids of priorities being removed from the scheme. */
  add?: number[];
  /** The ids of priorities being removed from the scheme. */
  remove?: number[];
}
/**
 * Details of changes to a priority scheme's projects that require suggested
 * priority mappings.
 */
export interface SuggestedMappingsForProjectsRequestBean {
  /** The ids of projects being added to the scheme. */
  add?: number[];
}
/**
 * Details of changes to a priority scheme that require suggested priority
 * mappings.
 */
export interface SuggestedMappingsRequestBean {
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The priority changes in the scheme. */
  priorities?: SuggestedMappingsForPrioritiesRequestBean;
  /** The project changes in the scheme. */
  projects?: SuggestedMappingsForProjectsRequestBean;
  /** The id of the priority scheme. */
  schemeId?: number;
  /** The index of the first item returned on the page. */
  startAt?: number;
}
/** Details about a task. */
export interface TaskProgressBeanJsonNode {
  /** The description of the task. */
  description?: string;
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: number;
  /** A timestamp recording when the task was finished. */
  finished?: number;
  /** The ID of the task. */
  id: string;
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: number;
  /** Information about the progress of the task. */
  message?: string;
  /** The progress of the task, as a percentage complete. */
  progress: number;
  /** The result of the task execution. */
  result?: JsonNode;
  /** The URL of the task. */
  self: string;
  /** A timestamp recording when the task was started. */
  started?: number;
  /** The status of the task. */
  status:
    | "ENQUEUED"
    | "RUNNING"
    | "COMPLETE"
    | "FAILED"
    | "CANCEL_REQUESTED"
    | "CANCELLED"
    | "DEAD";
  /** A timestamp recording when the task was submitted. */
  submitted: number;
  /** The ID of the user who submitted the task. */
  submittedBy: number;
}
/** Update priorities in a scheme */
export interface UpdatePrioritiesInSchemeRequestBean extends Record<string, unknown> {
  /** Priorities to add to a scheme */
  add?: PrioritySchemeChangesWithoutMappings;
  /** Priorities to remove from a scheme */
  remove?: PrioritySchemeChangesWithoutMappings;
}
/** Details of a priority scheme. */
export interface UpdatePrioritySchemeRequestBean {
  /** The default priority of the scheme. */
  defaultPriorityId?: number;
  /** The description of the priority scheme. */
  description?: string;
  /**
   * Instructions to migrate the priorities of issues.
   *
   * `in` mappings are used to migrate the priorities of issues to priorities used
   * within the priority scheme.
   *
   * `out` mappings are used to migrate the priorities of issues to priorities not
   * used within the priority scheme.
   *
   *  *  When **priorities** are **added** to the priority scheme, no mapping needs
   * to be provided as the new priorities are not used by any issues.
   *  *  When **priorities** are **removed** from the priority scheme, issues that
   * are using those priorities must be migrated to new priorities used by the
   * priority scheme.
   *
   *      *  An `in` mapping must be provided for each of these priorities.
   *  *  When **projects** are **added** to the priority scheme, the priorities of
   * issues in those projects might need to be migrated to new priorities used by
   * the priority scheme. This can occur when the current scheme does not use all
   * the priorities in the project(s)' priority scheme(s).
   *
   *      *  An `in` mapping must be provided for each of these priorities.
   *  *  When **projects** are **removed** from the priority scheme, the priorities
   * of issues in those projects might need to be migrated to new priorities within
   * the **Default Priority Scheme** that are not used by the priority scheme. This
   * can occur when the **Default Priority Scheme** does not use all the priorities
   * within the current scheme.
   *
   *      *  An `out` mapping must be provided for each of these priorities.
   *
   * For more information on `in` and `out` mappings, see the child properties
   * documentation for the `PriorityMapping` object below.
   */
  mappings?: PriorityMapping;
  /** The name of the priority scheme. Must be unique. */
  name?: string;
  /** The priorities in the scheme. */
  priorities?: UpdatePrioritiesInSchemeRequestBean;
  /** The projects in the scheme. */
  projects?: UpdateProjectsInSchemeRequestBean;
}
/** Details of the updated priority scheme. */
export interface UpdatePrioritySchemeResponseBean extends Record<string, unknown> {
  /** A priority scheme with paginated priorities and projects. */
  priorityScheme?: PrioritySchemeWithPaginatedPrioritiesAndProjects;
  /** The in-progress issue migration task. */
  task?: TaskProgressBeanJsonNode;
}
/** Update projects in a scheme */
export interface UpdateProjectsInSchemeRequestBean extends Record<string, unknown> {
  /** Projects to add to a scheme */
  add?: PrioritySchemeChangesWithoutMappings;
  /** Projects to remove from a scheme */
  remove?: PrioritySchemeChangesWithoutMappings;
}
