/**
 * Defines the behavior of the option within the global context. If this property
 * is set, even if set to an empty object, then the option is available in all
 * projects.
 */
export interface GlobalScopeBean {
  /**
   * Defines the behavior of the option in the global context.If notSelectable is
   * set, the option cannot be set as the field's value. This is useful for
   * archiving an option that has previously been selected but shouldn't be used
   * anymore.If defaultValue is set, the option is selected by default.
   */
  attributes?: ("notSelectable" | "defaultValue")[];
}
/** Details of the options for a select list issue field. */
export interface IssueFieldOption {
  /** Details of the projects the option is available in. */
  config?: IssueFieldOptionConfiguration;
  /**
   * The unique identifier for the option. This is only unique within the select
   * field's set of options.
   */
  id: number;
  /**
   * The properties of the object, as arbitrary key-value pairs. These properties
   * can be searched using JQL, if the extractions (see [Issue Field Option Property
   * Index](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/))
   * are defined in the descriptor for the issue field module.
   */
  properties?: {
    [key: string]: unknown;
  };
  /** The option's name, which is displayed in Jira. */
  value: string;
}
/** Details of the projects the option is available in. */
export interface IssueFieldOptionConfiguration {
  /** DEPRECATED */
  attributes?: ("notSelectable" | "defaultValue")[];
  /**
   * Defines the projects that the option is available in. If the scope is not
   * defined, then the option is available in all projects.
   */
  scope?: IssueFieldOptionScopeBean;
}
export interface IssueFieldOptionCreateBean extends Record<string, unknown> {
  /** Details of the projects the option is available in. */
  config?: IssueFieldOptionConfiguration;
  /**
   * The properties of the option as arbitrary key-value pairs. These properties can
   * be searched using JQL, if the extractions (see
   * https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)
   * are defined in the descriptor for the issue field module.
   */
  properties?: {
    [key: string]: unknown;
  };
  /** The option's name, which is displayed in Jira. */
  value: string;
}
/**
 * Defines the projects that the option is available in. If the scope is not
 * defined, then the option is available in all projects.
 */
export interface IssueFieldOptionScopeBean {
  /**
   * Defines the behavior of the option within the global context. If this property
   * is set, even if set to an empty object, then the option is available in all
   * projects.
   */
  global?: GlobalScopeBean;
  /** DEPRECATED */
  projects?: number[];
  /**
   * Defines the projects in which the option is available and the behavior of the
   * option within each project. Specify one object per project. The behavior of the
   * option in a project context overrides the behavior in the global context.
   */
  projects2?: ProjectScopeBean[];
}
/** A page of items. */
export interface PageBeanIssueFieldOption {
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
  values?: IssueFieldOption[];
}
export interface ProjectScopeBean {
  /**
   * Defines the behavior of the option in the project.If notSelectable is set, the
   * option cannot be set as the field's value. This is useful for archiving an
   * option that has previously been selected but shouldn't be used anymore.If
   * defaultValue is set, the option is selected by default.
   */
  attributes?: ("notSelectable" | "defaultValue")[];
  /** The ID of the project that the option's behavior applies to. */
  id?: number;
}
