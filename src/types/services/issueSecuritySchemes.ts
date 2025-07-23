import type { SecurityLevel, PermissionHolder, SecurityScheme } from "./common";
export interface AddSecuritySchemeLevelsRequestBean {
  /** The list of scheme levels which should be added to the security scheme. */
  levels?: SecuritySchemeLevelBean[];
}
/** Issue security scheme, project, and remapping details. */
export interface AssociateSecuritySchemeWithProjectDetails {
  /**
   * The list of scheme levels which should be remapped to new levels of the issue
   * security scheme.
   */
  oldToNewSecurityLevelMappings?: OldToNewSecurityLevelMappingsBean[];
  /** The ID of the project. */
  projectId: string;
  /**
   * The ID of the issue security scheme. Providing null will clear the association
   * with the issue security scheme.
   */
  schemeId: string;
}
/** Issue security scheme and it's details */
export interface CreateIssueSecuritySchemeDetails extends Record<string, unknown> {
  /** The description of the issue security scheme. */
  description?: string;
  /** The list of scheme levels which should be added to the security scheme. */
  levels?: SecuritySchemeLevelBean[];
  /** The name of the issue security scheme. Must be unique (case-insensitive). */
  name: string;
}
/** Details of scheme and new default level. */
export interface DefaultLevelValue extends Record<string, unknown> {
  /**
   * The ID of the issue security level to set as default for the specified scheme.
   * Providing null will reset the default level.
   */
  defaultLevelId: string;
  /** The ID of the issue security scheme to set default level for. */
  issueSecuritySchemeId: string;
}
/** Details about an project using security scheme mapping. */
export interface IssueSecuritySchemeToProjectMapping extends Record<string, unknown> {
  issueSecuritySchemeId?: string;
  projectId?: string;
}
export interface OldToNewSecurityLevelMappingsBean {
  /**
   * The new issue security level ID. Providing null will clear the assigned old
   * level from issues.
   */
  newLevelId: string;
  /**
   * The old issue security level ID. Providing null will remap all issues without
   * any assigned levels.
   */
  oldLevelId: string;
}
/** A page of items. */
export interface PageBeanIssueSecuritySchemeToProjectMapping {
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
  values?: IssueSecuritySchemeToProjectMapping[];
}
/** A page of items. */
export interface PageBeanSecurityLevel {
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
  values?: SecurityLevel[];
}
/** A page of items. */
export interface PageBeanSecurityLevelMember {
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
  values?: SecurityLevelMember[];
}
/** A page of items. */
export interface PageBeanSecuritySchemeWithProjects {
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
  values?: SecuritySchemeWithProjects[];
}
/** Issue security level member. */
export interface SecurityLevelMember extends Record<string, unknown> {
  /**
   * The user or group being granted the permission. It consists of a `type` and a
   * type-dependent `parameter`. See [Holder
   * object](../api-group-permission-schemes/#holder-object) in *Get all permission
   * schemes* for more information.
   */
  holder: PermissionHolder;
  /** The ID of the issue security level member. */
  id: string;
  /** The ID of the issue security level. */
  issueSecurityLevelId: string;
  /** The ID of the issue security scheme. */
  issueSecuritySchemeId: string;
  managed?: boolean;
}
/** The ID of the issue security scheme. */
export interface SecuritySchemeId extends Record<string, unknown> {
  /** The ID of the issue security scheme. */
  id: string;
}
export interface SecuritySchemeLevelBean {
  /** The description of the issue security scheme level. */
  description?: string;
  /** Specifies whether the level is the default level. False by default. */
  isDefault?: boolean;
  /**
   * The list of level members which should be added to the issue security scheme
   * level.
   */
  members?: SecuritySchemeLevelMemberBean[];
  /** The name of the issue security scheme level. Must be unique. */
  name: string;
}
export interface SecuritySchemeLevelMemberBean {
  /** The value corresponding to the specified member type. */
  parameter?: string;
  /**
   * The issue security level member type, e.g `reporter`, `group`, `user`,
   * `projectrole`, `applicationRole`.
   */
  type: string;
}
/** Details of issue security scheme level new members. */
export interface SecuritySchemeMembersRequest {
  /**
   * The list of level members which should be added to the issue security scheme
   * level.
   */
  members?: SecuritySchemeLevelMemberBean[];
}
/** List of security schemes. */
export interface SecuritySchemes {
  /** List of security schemes. */
  issueSecuritySchemes?: SecurityScheme[];
}
/** Details about an issue security scheme. */
export interface SecuritySchemeWithProjects extends Record<string, unknown> {
  /** The default level ID of the issue security scheme. */
  defaultLevel?: number;
  /** The description of the issue security scheme. */
  description?: string;
  /** The ID of the issue security scheme. */
  id: number;
  /** The name of the issue security scheme. */
  name: string;
  /** The list of project IDs associated with the issue security scheme. */
  projectIds?: number[];
  /** The URL of the issue security scheme. */
  self: string;
}
/** Details of new default levels. */
export interface SetDefaultLevelsRequest extends Record<string, unknown> {
  /** List of objects with issue security scheme ID and new default level ID. */
  defaultValues: DefaultLevelValue[];
}
/** Details of issue security scheme level. */
export interface UpdateIssueSecurityLevelDetails extends Record<string, unknown> {
  /** The description of the issue security scheme level. */
  description?: string;
  /** The name of the issue security scheme level. Must be unique. */
  name?: string;
}
export interface UpdateIssueSecuritySchemeRequestBean {
  /** The description of the security scheme scheme. */
  description?: string;
  /** The name of the security scheme scheme. Must be unique. */
  name?: string;
}
