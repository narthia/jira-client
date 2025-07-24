/** The payload for creating a board column */
export interface BoardColumnPayload {
  /** The maximum issue constraint for the column */
  maximumIssueConstraint?: number;
  /** The minimum issue constraint for the column */
  minimumIssueConstraint?: number;
  /**
   * The name of the column
   *
   * @example
   * TODO
   */
  name?: string;
  /**
   * The status IDs for the column
   *
   * @example
   * pcri:status:ref:done
   */
  statusIds?: ProjectCreateResourceIdentifier[];
}
/** The payload for setting a board feature */
export interface BoardFeaturePayload {
  /** The key of the feature */
  featureKey?: "ESTIMATION" | "SPRINTS";
  /** Whether the feature should be turned on or off */
  state?: boolean;
}
/** The payload for creating a board */
export interface BoardPayload {
  /**
   * Takes in a JQL string to create a new filter. If no value is provided, it'll
   * default to a JQL filter for the project creating
   *
   * @example
   * project = 'My Project'
   */
  boardFilterJQL?: string;
  /** Card color settings of the board */
  cardColorStrategy?: "ISSUE_TYPE" | "REQUEST_TYPE" | "ASSIGNEE" | "PRIORITY" | "NONE" | "CUSTOM";
  /** Card layout configuration. */
  cardLayout?: CardLayout;
  /** Card layout settings of the board */
  cardLayouts?: CardLayoutField[];
  /** The columns of the board */
  columns?: BoardColumnPayload[];
  /** Feature settings for the board */
  features?: BoardFeaturePayload[];
  /** The name of the board */
  name?: string;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /** The quick filters for the board. */
  quickFilters?: QuickFilterPayload[];
  /** Whether sprints are supported on the board */
  supportsSprint?: boolean;
  /** The payload for customising a swimlanes on a board */
  swimlanes?: SwimlanesPayload;
  /** Working days configuration */
  workingDaysConfig?: WorkingDaysConfig;
}
export interface BoardsPayload {
  /** The boards to be associated with the project. */
  boards?: BoardPayload[];
}
/** Card layout configuration. */
export interface CardLayout {
  /** Whether to show days in column */
  showDaysInColumn?: boolean;
}
/** Card layout settings of the board */
export interface CardLayoutField {
  fieldId?: string;
  id?: number;
  mode?: "PLAN" | "WORK";
  position?: number;
}
/** The payload for creating a condition group in a workflow */
export interface ConditionGroupPayload {
  /** The nested conditions of the condition group. */
  conditionGroup?: ConditionGroupPayload[];
  /** The rules for this condition. */
  conditions?: RulePayload[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY`
   * or `ALL`. If `ANY` is used, at least one condition in the group must be true
   * for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation?: "ANY" | "ALL";
}
/**
 * Defines the payload for the custom field definitions. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/\#api-rest-api-3-field-post
 */
export interface CustomFieldPayload {
  /**
   * The type of the custom field
   *
   * @example
   * See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-post `type` for values
   */
  cfType?: string;
  /**
   * The description of the custom field
   *
   * @example
   * This is a custom field
   */
  description?: string;
  /**
   * The name of the custom field
   *
   * @example
   * My Custom Field
   */
  name?: string;
  /**
   * The strategy to use when there is a conflict with an existing custom field.
   * FAIL - Fail execution, this always needs to be unique; USE - Use the existing
   * entity and ignore new entity parameters
   */
  onConflict?: "FAIL" | "USE" | "NEW";
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /**
   * The searcher key of the custom field
   *
   * @example
   * See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-post `searcherKey` for values
   */
  searcherKey?: string;
}
export interface CustomTemplateOptions {
  /**
   * Enable screen delegated admin support for the template. This means screen and
   * associated schemes will be copied rather than referenced.
   */
  enableScreenDelegatedAdminSupport?: boolean;
  /**
   * Enable workflow delegated admin support for the template. This means workflows
   * and workflow schemes will be copied rather than referenced.
   */
  enableWorkflowDelegatedAdminSupport?: boolean;
}
/** The specific request object for creating a project with template. */
export interface CustomTemplateRequestDto {
  boards?: BoardsPayload | null;
  /**
   * Defines the payload for the fields, screens, screen schemes, issue type screen
   * schemes, field layouts, and field layout schemes
   */
  field?: FieldCapabilityPayload | null;
  /** The payload for creating issue types in a project */
  issueType?: IssueTypeProjectCreatePayload | null;
  /**
   * The payload for creating a notification scheme. The user has to supply the ID
   * for the default notification scheme. For CMP this is provided in the project
   * payload and should be left empty, for TMP it's provided using this payload
   *
   * @example
   * CMP:  "project": {
   *                  "pcri": "pcri:project:ref:new-project1",
   *                  "notificationSchemeId": "pcri:notificationScheme:id:10000",
   *                  ...
   *               }
   * TMP: "notification": {
   *        "pcri": "pcri:notificationScheme:ref:notification1",
   *        "name": "Simplified Notification Scheme",
   *        "notificationSchemeEvents": [
   *          {
   *            "event": {
   *              "id": "1"
   *            },
   *            "notifications": [
   *              {
   *                "notificationType": "CurrentAssignee"
   *              },
   *              {
   *                "notificationType": "Reporter"
   *              },
   *              {
   *                "notificationType": "AllWatchers"
   *              }
   *            ]
   *          },
   *          {
   *            "event": {
   *              "id": "2"
   *            },
   *            "notifications": [
   *              {
   *                "notificationType": "CurrentAssignee"
   *              },
   *              {
   *                "notificationType": "Reporter"
   *              },
   *              {
   *                "notificationType": "AllWatchers"
   *              }
   *            ]
   *          },...
   *        ]
   *      }
   */
  notification?: NotificationSchemePayload | null;
  /** The payload to create a permission scheme */
  permissionScheme?: PermissionPayloadDto | null;
  /** The payload for creating a project */
  project?: ProjectPayload;
  role?: RolesCapabilityPayload | null;
  /**
   * The payload for creating a scope. Defines if a project is team-managed project
   * or company-managed project
   */
  scope?: ScopePayload | null;
  /**
   * The payload for creating a security scheme. See
   * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
   */
  security?: SecuritySchemePayload | null;
  /**
   * The payload for creating a workflows. See
   * https://www.atlassian.com/software/jira/guides/workflows/overview\#what-is-a-jira-workflow
   */
  workflow?: WorkflowCapabilityPayload | null;
}
/** Project Details */
export interface CustomTemplatesProjectDetails {
  /**
   * The access level of the project. Only used by team-managed project
   *
   * @example
   * private
   */
  accessLevel?: "open" | "limited" | "private" | "free";
  /** Additional properties of the project */
  additionalProperties?: {
    /** Additional properties of the project */ [key: string]: string;
  };
  /**
   * The default assignee when creating issues in the project
   *
   * @example
   * PROJECT_LEAD
   */
  assigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
  /**
   * The ID of the project's avatar. Use the \[Get project
   * avatars\](\#api-rest-api-3-project-projectIdOrKey-avatar-get) operation to list
   * the available avatars in a project.
   *
   * @example
   * 10200
   */
  avatarId?: number;
  /**
   * The ID of the project's category. A complete list of category IDs is found
   * using the [Get all project categories](#api-rest-api-3-projectCategory-get)
   * operation.
   */
  categoryId?: number;
  /**
   * Brief description of the project
   *
   * @example
   * This is a project for Foo Bar
   */
  description?: string;
  /**
   * Whether components are enabled for the project. Only used by company-managed
   * project
   *
   * @example
   * false
   */
  enableComponents?: boolean;
  /**
   * Project keys must be unique and start with an uppercase letter followed by one
   * or more uppercase alphanumeric characters. The maximum length is 10 characters.
   *
   * @example
   * PRJ
   */
  key?: string;
  /**
   * The default language for the project
   *
   * @example
   * en
   */
  language?: string;
  /**
   * The account ID of the project lead. Either `lead` or `leadAccountId` must be
   * set when creating a project. Cannot be provided with `lead`.
   *
   * @example
   * 1234567890
   */
  leadAccountId?: string;
  /**
   * Name of the project
   *
   * @example
   * Project Foo Bar
   */
  name?: string;
  /**
   * A link to information about this project, such as project documentation
   *
   * @example
   * https://www.example.com
   */
  url?: string;
}
/** Request to edit a custom template */
export interface EditTemplateRequest {
  /** The description of the template */
  templateDescription?: string;
  templateGenerationOptions?: CustomTemplateOptions;
  /** The unique identifier of the template */
  templateKey?: string;
  /** The name of the template */
  templateName?: string;
}
/**
 * Defines the payload for the fields, screens, screen schemes, issue type screen
 * schemes, field layouts, and field layout schemes
 */
export interface FieldCapabilityPayload {
  /**
   * The custom field definitions. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/\#api-rest-api-3-field-post
   */
  customFieldDefinitions?: (CustomFieldPayload | null)[] | null;
  /**
   * Defines the payload for the field layout schemes. See "Field Configuration
   * Scheme" -
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/\#api-rest-api-3-fieldconfigurationscheme-post
   * https://support.atlassian.com/jira-cloud-administration/docs/configure-a-field-configuration-scheme/
   */
  fieldLayoutScheme?: FieldLayoutSchemePayload | null;
  /** The field layouts configuration. */
  fieldLayouts?: (FieldLayoutPayload | null)[] | null;
  /** The issue layouts configuration */
  issueLayouts?: (IssueLayoutPayload | null)[] | null;
  /**
   * Defines the payload for the issue type screen schemes. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes/\#api-rest-api-3-issuetypescreenscheme-post
   */
  issueTypeScreenScheme?: IssueTypeScreenSchemePayload | null;
  /**
   * The screen schemes See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/\#api-rest-api-3-screenscheme-post
   */
  screenScheme?: (ScreenSchemePayload | null)[] | null;
  /**
   * The screens. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/\#api-rest-api-3-screens-post
   */
  screens?: (ScreenPayload | null)[] | null;
}
/**
 * Defines the payload for the field layout configuration. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/\#api-rest-api-3-fieldconfiguration-post
 */
export interface FieldLayoutConfiguration {
  /** Whether to show the field */
  field?: boolean;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /** Whether the field is required */
  required?: boolean;
}
/**
 * Defines the payload for the field layouts. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/\#api-group-issue-field-configurations"
 * + fieldlayout is what users would see as "Field Configuration" in Jira's UI -
 * https://support.atlassian.com/jira-cloud-administration/docs/manage-issue-field-configurations/
 */
export interface FieldLayoutPayload {
  /**
   * The field layout configuration. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/\#api-rest-api-3-fieldconfiguration-post
   */
  configuration?: FieldLayoutConfiguration[];
  /**
   * The description of the field layout
   *
   * @example
   * This is a field layout
   */
  description?: string;
  /**
   * The name of the field layout
   *
   * @example
   * My Field Layout
   */
  name?: string;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
/**
 * Defines the payload for the field layout schemes. See "Field Configuration
 * Scheme" -
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/\#api-rest-api-3-fieldconfigurationscheme-post
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-a-field-configuration-scheme/
 */
export interface FieldLayoutSchemePayload {
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  defaultFieldLayout?: ProjectCreateResourceIdentifier;
  /**
   * The description of the field layout scheme
   *
   * @example
   * This is a field layout scheme
   */
  description?: string;
  /**
   * There is a default configuration "fieldlayout" that is applied to all issue
   * types using this scheme that don't have an explicit mapping users can create
   * (or re-use existing) configurations for other issue types and map them to this
   * scheme
   */
  explicitMappings?: {
    /**
     * Every project-created entity has an ID that must be unique within the scope of
     * the project creation. PCRI (Project Create Resource Identifier) is a standard
     * format for creating IDs and references to other project entities. PCRI format
     * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
     * the type of an entity, e.g. status, role, workflow type - PCRI type, either
     * `id` - The ID of an entity that already exists in the target site, or `ref` - A
     * unique reference to an entity that is being created entityId - entity
     * identifier, if type is `id` - must be an existing entity ID that exists in the
     * Jira site, if `ref` - must be unique across all entities in the scope of this
     * project template creation
     *
     * @example
     * pcri:permissionScheme:id:10001
     */
    [key: string]: ProjectCreateResourceIdentifier;
  };
  /**
   * The name of the field layout scheme
   *
   * @example
   * My Field Layout Scheme
   */
  name?: string;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
/** The payload for the layout details for the start end of a transition */
export interface FromLayoutPayload {
  /** The port that the transition can be made from */
  fromPort?: number;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  status?: ProjectCreateResourceIdentifier;
  /** The port that the transition goes to */
  toPortOverride?: number;
}
/** Defines the payload to configure the issue layout item for a project. */
export interface IssueLayoutItemPayload {
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  itemKey?: ProjectCreateResourceIdentifier;
  /** The item section type */
  sectionType?: "content" | "primaryContext" | "secondaryContext";
  /** The item type. Currently only support FIELD */
  type?: "FIELD";
}
/** Defines the payload to configure the issue layouts for a project. */
export interface IssueLayoutPayload {
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  containerId?: ProjectCreateResourceIdentifier;
  /** The issue layout type */
  issueLayoutType?: "ISSUE_VIEW" | "ISSUE_CREATE" | "REQUEST_FORM";
  /** The configuration of items in the issue layout */
  items?: IssueLayoutItemPayload[];
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
/** The payload for creating an issue type hierarchy */
export interface IssueTypeHierarchyPayload {
  /**
   * The hierarchy level of the issue type. 0, 1, 2, 3 .. n; Negative values for
   * subtasks
   */
  hierarchyLevel?: number;
  /** The name of the issue type */
  name?: string;
  /**
   * The conflict strategy to use when the issue type already exists. FAIL - Fail
   * execution, this always needs to be unique; USE - Use the existing entity and
   * ignore new entity parameters
   */
  onConflict?: "FAIL" | "USE" | "NEW";
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
/** The payload for creating an issue type */
export interface IssueTypePayload {
  /**
   * The avatar ID of the issue type. Go to
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/\#api-rest-api-3-avatar-type-system-get
   * to choose an avatarId existing in Jira
   */
  avatarId?: number | null;
  /** The description of the issue type */
  description?: string | null;
  /**
   * The hierarchy level of the issue type. 0, 1, 2, 3 .. n; Negative values for
   * subtasks
   */
  hierarchyLevel?: number;
  /** The name of the issue type */
  name?: string;
  /**
   * The conflict strategy to use when the issue type already exists. FAIL - Fail
   * execution, this always needs to be unique; USE - Use the existing entity and
   * ignore new entity parameters
   */
  onConflict?: "FAIL" | "USE" | "NEW";
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
/** The payload for creating issue types in a project */
export interface IssueTypeProjectCreatePayload {
  /**
   * Defines the issue type hierarhy to be created and used during this project
   * creation. This will only add new levels if there isn't an existing level
   */
  issueTypeHierarchy?: (IssueTypeHierarchyPayload | null)[] | null;
  /** The payload for creating issue type schemes */
  issueTypeScheme?: IssueTypeSchemePayload;
  /**
   * Only needed if you want to create issue types, you can otherwise use the ids of
   * issue types in the scheme configuration
   */
  issueTypes?: (IssueTypePayload | null)[] | null;
}
/** The payload for creating issue type schemes */
export interface IssueTypeSchemePayload {
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  defaultIssueTypeId?: ProjectCreateResourceIdentifier;
  /** The description of the issue type scheme */
  description?: string | null;
  /**
   * The issue type IDs for the issue type scheme
   *
   * @example
   * pcri:issueType:id:10001
   */
  issueTypeIds?: ProjectCreateResourceIdentifier[];
  /** The name of the issue type scheme */
  name?: string;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
/**
 * Defines the payload for the issue type screen schemes. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes/\#api-rest-api-3-issuetypescreenscheme-post
 */
export interface IssueTypeScreenSchemePayload {
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  defaultScreenScheme?: ProjectCreateResourceIdentifier;
  /**
   * The description of the issue type screen scheme
   *
   * @example
   * This is an issue type screen scheme
   */
  description?: string;
  /**
   * The IDs of the screen schemes for the issue type IDs and default. A default
   * entry is required to create an issue type screen scheme, it defines the mapping
   * for all issue types without a screen scheme.
   */
  explicitMappings?: {
    /**
     * Every project-created entity has an ID that must be unique within the scope of
     * the project creation. PCRI (Project Create Resource Identifier) is a standard
     * format for creating IDs and references to other project entities. PCRI format
     * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
     * the type of an entity, e.g. status, role, workflow type - PCRI type, either
     * `id` - The ID of an entity that already exists in the target site, or `ref` - A
     * unique reference to an entity that is being created entityId - entity
     * identifier, if type is `id` - must be an existing entity ID that exists in the
     * Jira site, if `ref` - must be unique across all entities in the scope of this
     * project template creation
     *
     * @example
     * pcri:permissionScheme:id:10001
     */
    [key: string]: ProjectCreateResourceIdentifier;
  };
  /**
   * The name of the issue type screen scheme
   *
   * @example
   * My Issue Type Screen Scheme
   */
  name?: string;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
export interface NonWorkingDay {
  id?: number;
  iso8601Date?: string;
}
/** The event ID to use for reference in the payload */
export interface NotificationSchemeEventIdPayload {
  /**
   * The event ID to use for reference in the payload
   *
   * @example
   * 1
   */
  id?: string;
}
/**
 * The payload for creating a notification scheme event. Defines which
 * notifications should be sent for a specific event
 */
export interface NotificationSchemeEventPayload {
  /** The event ID to use for reference in the payload */
  event?: NotificationSchemeEventIdPayload;
  /** The configuration for notification recipents */
  notifications?: NotificationSchemeNotificationDetailsPayload[];
}
/** The configuration for notification recipents */
export interface NotificationSchemeNotificationDetailsPayload {
  /** The type of notification. */
  notificationType?: string;
  /**
   * The parameter of the notification, should be eiither null if not required, or
   * PCRI.
   */
  parameter?: string;
}
/**
 * The payload for creating a notification scheme. The user has to supply the ID
 * for the default notification scheme. For CMP this is provided in the project
 * payload and should be left empty, for TMP it's provided using this payload
 *
 * @example
 * CMP:  "project": {
 *                  "pcri": "pcri:project:ref:new-project1",
 *                  "notificationSchemeId": "pcri:notificationScheme:id:10000",
 *                  ...
 *               }
 * TMP: "notification": {
 *        "pcri": "pcri:notificationScheme:ref:notification1",
 *        "name": "Simplified Notification Scheme",
 *        "notificationSchemeEvents": [
 *          {
 *            "event": {
 *              "id": "1"
 *            },
 *            "notifications": [
 *              {
 *                "notificationType": "CurrentAssignee"
 *              },
 *              {
 *                "notificationType": "Reporter"
 *              },
 *              {
 *                "notificationType": "AllWatchers"
 *              }
 *            ]
 *          },
 *          {
 *            "event": {
 *              "id": "2"
 *            },
 *            "notifications": [
 *              {
 *                "notificationType": "CurrentAssignee"
 *              },
 *              {
 *                "notificationType": "Reporter"
 *              },
 *              {
 *                "notificationType": "AllWatchers"
 *              }
 *            ]
 *          },...
 *        ]
 *      }
 */
export interface NotificationSchemePayload {
  /** The description of the notification scheme */
  description?: string;
  /** The name of the notification scheme */
  name?: string;
  /** The events and notifications for the notification scheme */
  notificationSchemeEvents?: NotificationSchemeEventPayload[];
  /** The strategy to use when there is a conflict with an existing entity */
  onConflict?: "FAIL" | "USE" | "NEW";
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
/** List of permission grants */
export interface PermissionGrantDto {
  applicationAccess?: string[];
  groupCustomFields?: ProjectCreateResourceIdentifier[];
  groups?: ProjectCreateResourceIdentifier[];
  permissionKeys?: string[];
  projectRoles?: ProjectCreateResourceIdentifier[];
  specialGrants?: string[];
  userCustomFields?: ProjectCreateResourceIdentifier[];
  users?: ProjectCreateResourceIdentifier[];
}
/** The payload to create a permission scheme */
export interface PermissionPayloadDto {
  /** Configuration to generate addon role. Default is false if null */
  addAddonRole?: boolean;
  /** The description of the permission scheme */
  description?: string;
  /** List of permission grants */
  grants?: PermissionGrantDto[];
  /** The name of the permission scheme */
  name?: string;
  /**
   * The strategy to use when there is a conflict with an existing permission
   * scheme. FAIL - Fail execution, this always needs to be unique; USE - Use the
   * existing entity and ignore new entity parameters; NEW - If the entity exist,
   * try and create a new one with a different name
   */
  onConflict?: "FAIL" | "USE" | "NEW";
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
export interface ProjectArchetype {
  realType?:
    | "BUSINESS"
    | "SOFTWARE"
    | "PRODUCT_DISCOVERY"
    | "SERVICE_DESK"
    | "CUSTOMER_SERVICE"
    | "OPS";
  style?: "classic" | "next-gen";
  type?:
    | "BUSINESS"
    | "SOFTWARE"
    | "PRODUCT_DISCOVERY"
    | "SERVICE_DESK"
    | "CUSTOMER_SERVICE"
    | "OPS";
}
/**
 * Every project-created entity has an ID that must be unique within the scope of
 * the project creation. PCRI (Project Create Resource Identifier) is a standard
 * format for creating IDs and references to other project entities. PCRI format
 * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
 * the type of an entity, e.g. status, role, workflow type - PCRI type, either
 * `id` - The ID of an entity that already exists in the target site, or `ref` - A
 * unique reference to an entity that is being created entityId - entity
 * identifier, if type is `id` - must be an existing entity ID that exists in the
 * Jira site, if `ref` - must be unique across all entities in the scope of this
 * project template creation
 *
 * @example
 * pcri:permissionScheme:id:10001
 */
export interface ProjectCreateResourceIdentifier {
  anID?: boolean;
  areference?: boolean;
  entityId?: string;
  entityType?: string;
  id?: string;
  type?: "id" | "ref";
}
/** Request to create a project using a custom template */
export interface ProjectCustomTemplateCreateRequestDto {
  /** Project Details */
  details?: CustomTemplatesProjectDetails;
  /** The specific request object for creating a project with template. */
  template?: CustomTemplateRequestDto;
}
/** The payload for creating a project */
export interface ProjectPayload {
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  fieldLayoutSchemeId?: ProjectCreateResourceIdentifier;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  issueSecuritySchemeId?: ProjectCreateResourceIdentifier;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  issueTypeSchemeId?: ProjectCreateResourceIdentifier;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  issueTypeScreenSchemeId?: ProjectCreateResourceIdentifier;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  notificationSchemeId?: ProjectCreateResourceIdentifier;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  permissionSchemeId?: ProjectCreateResourceIdentifier;
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes),
   * which defines the application-specific feature set. If you don't specify the
   * project template you have to specify the project type.
   *
   * @example
   * software
   */
  projectTypeKey?: "software" | "business" | "service_desk" | "product_discovery";
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  workflowSchemeId?: ProjectCreateResourceIdentifier;
}
export interface ProjectTemplateKey {
  key?: string;
  uuid?: string;
}
export interface ProjectTemplateModel {
  archetype?: ProjectArchetype;
  defaultBoardView?: string;
  description?: string;
  liveTemplateProjectIdReference?: number;
  name?: string;
  projectTemplateKey?: ProjectTemplateKey;
  snapshotTemplate?: {
    [key: string]: unknown;
  };
  templateGenerationOptions?: CustomTemplateOptions;
  type?: "LIVE" | "SNAPSHOT";
}
/** The payload for defining quick filters */
export interface QuickFilterPayload {
  /** The description of the quick filter */
  description?: string;
  /** The jql query for the quick filter */
  jqlQuery?: string;
  /** The name of the quick filter */
  name?: string;
}
/**
 * The payload used to create a project role. It is optional for CMP projects, as
 * a default role actor will be provided. TMP will add new role actors to the
 * table.
 */
export interface RolePayload {
  /**
   * The default actors for the role. By adding default actors, the role will be
   * added to any future projects created
   *
   * @example
   * [pcri:user:id:1234]
   */
  defaultActors?: ProjectCreateResourceIdentifier[];
  /** The description of the role */
  description?: string;
  /** The name of the role */
  name?: string;
  /**
   * The strategy to use when there is a conflict with an existing project role.
   * FAIL - Fail execution, this always needs to be unique; USE - Use the existing
   * entity and ignore new entity parameters
   */
  onConflict?: "FAIL" | "USE" | "NEW";
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /**
   * The type of the role. Only used by project-scoped project
   *
   * @example
   * EDITABLE
   */
  type?: "HIDDEN" | "VIEWABLE" | "EDITABLE";
}
export interface RolesCapabilityPayload {
  /**
   * A map of role PCRI (can be ID or REF) to a list of user or group PCRI IDs to
   * associate with the role and project.
   */
  roleToProjectActors?: {
    /**
     * A map of role PCRI (can be ID or REF) to a list of user or group PCRI IDs to
     * associate with the role and project.
     */
    [key: string]: ProjectCreateResourceIdentifier[];
  };
  /** The list of roles to create. */
  roles?: RolePayload[];
}
/** The payload for creating rules in a workflow */
export interface RulePayload {
  /** The parameters of the rule */
  parameters?: {
    /** The parameters of the rule */ [key: string]: string;
  };
  /**
   * The key of the rule. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/\#api-rest-api-3-workflows-capabilities-get
   *
   * @example
   * system:update-field
   */
  ruleKey?: string;
}
/** The request details to generate template from a project */
export interface SaveProjectTemplateRequest {
  /** The ID of the target project */
  projectId?: number;
  templateGenerationOptions?: CustomTemplateOptions;
  /** The type of the template: LIVE | SNAPSHOT */
  templateType?: "LIVE" | "SNAPSHOT";
}
/** Request to save a custom template */
export interface SaveTemplateRequest {
  /** The description of the template */
  templateDescription?: string;
  /** The request details to generate template from a project */
  templateFromProjectRequest?: SaveProjectTemplateRequest;
  /** The name of the template */
  templateName?: string;
}
export interface SaveTemplateResponse {
  projectTemplateKey?: ProjectTemplateKey;
}
/**
 * The payload for creating a scope. Defines if a project is team-managed project
 * or company-managed project
 */
export interface ScopePayload {
  /**
   * The type of the scope. Use `GLOBAL` or empty for company-managed project, and
   * `PROJECT` for team-managed project
   */
  type?: "GLOBAL" | "PROJECT";
}
/**
 * Defines the payload for the field screens. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/\#api-rest-api-3-screens-post
 */
export interface ScreenPayload {
  /**
   * The description of the screen
   *
   * @example
   * This is a screen
   */
  description?: string;
  /**
   * The name of the screen
   *
   * @example
   * My Screen
   */
  name?: string;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /**
   * The tabs of the screen. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/\#api-rest-api-3-screens-screenid-tabs-tabid-fields-post
   */
  tabs?: TabPayload[];
}
/**
 * Defines the payload for the screen schemes. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/\#api-rest-api-3-screenscheme-post
 */
export interface ScreenSchemePayload {
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  defaultScreen?: ProjectCreateResourceIdentifier;
  /**
   * The description of the screen scheme
   *
   * @example
   * This is a screen scheme
   */
  description?: string;
  /**
   * The name of the screen scheme
   *
   * @example
   * My Screen Scheme
   */
  name?: string;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /**
   * Similar to the field layout scheme those mappings allow users to set different
   * screens for different operations: default - always there, applied to all
   * operations that don't have an explicit mapping `create`, `view`, `edit` -
   * specific operations that are available and users can assign a different screen
   * for each one of them
   * https://support.atlassian.com/jira-cloud-administration/docs/manage-screen-schemes/\#Associating-a-screen-with-an-issue-operation
   */
  screens?: {
    /**
     * Every project-created entity has an ID that must be unique within the scope of
     * the project creation. PCRI (Project Create Resource Identifier) is a standard
     * format for creating IDs and references to other project entities. PCRI format
     * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
     * the type of an entity, e.g. status, role, workflow type - PCRI type, either
     * `id` - The ID of an entity that already exists in the target site, or `ref` - A
     * unique reference to an entity that is being created entityId - entity
     * identifier, if type is `id` - must be an existing entity ID that exists in the
     * Jira site, if `ref` - must be unique across all entities in the scope of this
     * project template creation
     *
     * @example
     * pcri:permissionScheme:id:10001
     */
    [key: string]: ProjectCreateResourceIdentifier;
  };
}
/**
 * The payload for creating a security level member. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */
export interface SecurityLevelMemberPayload {
  /**
   * Defines the value associated with the type. For reporter this would be
   * \{"null"\}; for users this would be the names of specific users); for group
   * this would be group names like \{"administrators", "jira-administrators",
   * "jira-users"\}
   */
  parameter?: string;
  /** The type of the security level member */
  type?: "group" | "reporter" | "users";
}
/**
 * The payload for creating a security level. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */
export interface SecurityLevelPayload {
  /**
   * The description of the security level
   *
   * @example
   * Newly created issue security level
   */
  description?: string;
  /** Whether the security level is default for the security scheme */
  isDefault?: boolean;
  /**
   * The name of the security level
   *
   * @example
   * New Security Level
   */
  name?: string;
  /** The members of the security level */
  securityLevelMembers?: SecurityLevelMemberPayload[];
}
/**
 * The payload for creating a security scheme. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */
export interface SecuritySchemePayload {
  /**
   * The description of the security scheme
   *
   * @example
   * Newly created issue security scheme
   */
  description?: string;
  /**
   * The name of the security scheme
   *
   * @example
   * New Security Scheme
   */
  name?: string;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /** The security levels for the security scheme */
  securityLevels?: SecurityLevelPayload[];
}
/** The payload for creating a status */
export interface StatusPayload {
  /** The description of the status */
  description?: string;
  /** The name of the status */
  name?: string;
  /**
   * The conflict strategy for the status already exists. FAIL - Fail execution,
   * this always needs to be unique; USE - Use the existing entity and ignore new
   * entity parameters; NEW - Create a new entity
   */
  onConflict?: "FAIL" | "USE" | "NEW";
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /** The status category of the status. The value is case-sensitive. */
  statusCategory?: "TODO" | "IN_PROGRESS" | "DONE";
}
/** The payload for custom swimlanes */
export interface SwimlanePayload {
  /** The description of the quick filter */
  description?: string;
  /** The jql query for the quick filter */
  jqlQuery?: string;
  /** The name of the quick filter */
  name?: string;
}
/** The payload for customising a swimlanes on a board */
export interface SwimlanesPayload {
  /** The custom swimlane definitions. */
  customSwimlanes?: SwimlanePayload[];
  /**
   * The name of the custom swimlane to use for work items that don't match any
   * other swimlanes.
   */
  defaultCustomSwimlaneName?: string;
  /** The swimlane strategy for the board. */
  swimlaneStrategy?:
    | "none"
    | "custom"
    | "parentChild"
    | "assignee"
    | "assigneeUnassignedFirst"
    | "epic"
    | "project"
    | "issueparent"
    | "issuechildren"
    | "request_type";
}
/**
 * Defines the payload for the tabs of the screen. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/\#api-rest-api-3-screens-screenid-tabs-tabid-fields-post
 */
export interface TabPayload {
  /**
   * The list of resource identifier of the field associated to the tab. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/\#api-rest-api-3-screens-screenid-tabs-tabid-fields-post
   */
  fields?: ProjectCreateResourceIdentifier[];
  /** The name of the tab */
  name?: string;
}
/** The payload for the layout details for the destination end of a transition */
export interface ToLayoutPayload {
  /**
   * Defines where the transition line will be connected to a status. Port 0 to 7
   * are acceptable values.
   *
   * @example
   * 1
   */
  port?: number;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  status?: ProjectCreateResourceIdentifier;
}
/**
 * The payload for creating a transition in a workflow. Can be DIRECTED, GLOBAL,
 * SELF-LOOPED, GLOBAL LOOPED
 */
export interface TransitionPayload {
  /** The actions that are performed when the transition is made */
  actions?: RulePayload[];
  /** The payload for creating a condition group in a workflow */
  conditions?: ConditionGroupPayload;
  /**
   * Mechanism in Jira for triggering certain actions, like notifications,
   * automations, etc. Unless a custom notification scheme is configure, it's better
   * not to provide any value here
   */
  customIssueEventId?: string;
  /** The description of the transition */
  description?: string;
  /** The statuses that the transition can be made from */
  from?: FromLayoutPayload[];
  /** The id of the transition */
  id?: number;
  /** The name of the transition */
  name?: string;
  /** The properties of the transition */
  properties?: {
    /** The properties of the transition */ [key: string]: string;
  };
  /** The payload for the layout details for the destination end of a transition */
  to?: ToLayoutPayload;
  /** The payload for creating rules in a workflow */
  transitionScreen?: RulePayload;
  /** The triggers that are performed when the transition is made */
  triggers?: RulePayload[];
  /** The type of the transition */
  type?: "global" | "initial" | "directed";
  /** The validators that are performed when the transition is made */
  validators?: RulePayload[];
}
/**
 * The payload for creating a workflows. See
 * https://www.atlassian.com/software/jira/guides/workflows/overview\#what-is-a-jira-workflow
 */
export interface WorkflowCapabilityPayload {
  /** The statuses for the workflow */
  statuses?: StatusPayload[];
  /**
   * The payload for creating a workflow scheme. See
   * https://www.atlassian.com/software/jira/guides/workflows/overview\#what-is-a-jira-workflow-scheme
   */
  workflowScheme?: WorkflowSchemePayload;
  /** The transitions for the workflow */
  workflows?: WorkflowPayload[];
}
/**
 * The payload for creating workflow, see
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/\#api-rest-api-3-workflows-create-post
 */
export interface WorkflowPayload {
  /**
   * The description of the workflow
   *
   * @example
   * a software workflow
   */
  description?: string;
  /** The layout of the workflow status. */
  loopedTransitionContainerLayout?: WorkflowStatusLayoutPayload;
  /**
   * The name of the workflow
   *
   * @example
   * Software Simplified Workflow
   */
  name?: string;
  /** The strategy to use if there is a conflict with another workflow */
  onConflict?: "FAIL" | "USE" | "NEW";
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /** The layout of the workflow status. */
  startPointLayout?: WorkflowStatusLayoutPayload;
  /** The statuses to be used in the workflow */
  statuses?: WorkflowStatusPayload[];
  /** The transitions for the workflow */
  transitions?: TransitionPayload[];
}
/**
 * The payload for creating a workflow scheme. See
 * https://www.atlassian.com/software/jira/guides/workflows/overview\#what-is-a-jira-workflow-scheme
 */
export interface WorkflowSchemePayload {
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  defaultWorkflow?: ProjectCreateResourceIdentifier;
  /** The description of the workflow scheme */
  description?: string;
  /** Association between issuetypes and workflows */
  explicitMappings?: {
    /**
     * Every project-created entity has an ID that must be unique within the scope of
     * the project creation. PCRI (Project Create Resource Identifier) is a standard
     * format for creating IDs and references to other project entities. PCRI format
     * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
     * the type of an entity, e.g. status, role, workflow type - PCRI type, either
     * `id` - The ID of an entity that already exists in the target site, or `ref` - A
     * unique reference to an entity that is being created entityId - entity
     * identifier, if type is `id` - must be an existing entity ID that exists in the
     * Jira site, if `ref` - must be unique across all entities in the scope of this
     * project template creation
     *
     * @example
     * pcri:permissionScheme:id:10001
     */
    [key: string]: ProjectCreateResourceIdentifier;
  };
  /** The name of the workflow scheme */
  name?: string;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
}
/** The layout of the workflow status. */
export interface WorkflowStatusLayoutPayload {
  /**
   * The x coordinate of the status.
   *
   * @example
   * 1
   */
  x?: number;
  /**
   * The y coordinate of the status.
   *
   * @example
   * 2
   */
  y?: number;
}
/** The statuses to be used in the workflow */
export interface WorkflowStatusPayload {
  /** The layout of the workflow status. */
  layout?: WorkflowStatusLayoutPayload;
  /**
   * Every project-created entity has an ID that must be unique within the scope of
   * the project creation. PCRI (Project Create Resource Identifier) is a standard
   * format for creating IDs and references to other project entities. PCRI format
   * is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType -
   * the type of an entity, e.g. status, role, workflow type - PCRI type, either
   * `id` - The ID of an entity that already exists in the target site, or `ref` - A
   * unique reference to an entity that is being created entityId - entity
   * identifier, if type is `id` - must be an existing entity ID that exists in the
   * Jira site, if `ref` - must be unique across all entities in the scope of this
   * project template creation
   *
   * @example
   * pcri:permissionScheme:id:10001
   */
  pcri?: ProjectCreateResourceIdentifier;
  /** The properties of the workflow status. */
  properties?: {
    /** The properties of the workflow status. */ [key: string]: string;
  };
}
/** Working days configuration */
export interface WorkingDaysConfig {
  friday?: boolean;
  id?: number;
  monday?: boolean;
  nonWorkingDays?: NonWorkingDay[];
  saturday?: boolean;
  sunday?: boolean;
  thursday?: boolean;
  timezoneId?: string;
  tuesday?: boolean;
  wednesday?: boolean;
}
