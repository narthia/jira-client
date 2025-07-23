import type { ClientType, DefaultJiraConfig, ForgeJiraConfig } from "../types";
import { validateJiraConfig } from "../utils/configValidation";
import announcementBannerService from "../services/announcementBannerService";
import appDataPoliciesService from "../services/appDataPoliciesService";
import appMigrationService from "../services/appMigrationService";
import appPropertiesService from "../services/appPropertiesService";
import applicationRolesService from "../services/applicationRolesService";
import auditRecordsService from "../services/auditRecordsService";
import avatarsService from "../services/avatarsService";
import classificationLevelsService from "../services/classificationLevelsService";
import dashboardsService from "../services/dashboardsService";
import dynamicModulesService from "../services/dynamicModulesService";
import filterSharingService from "../services/filterSharingService";
import filtersService from "../services/filtersService";
import groupAndUserPickerService from "../services/groupAndUserPickerService";
import groupsService from "../services/groupsService";
import issueAttachmentsService from "../services/issueAttachmentsService";
import issueBulkOperationsService from "../services/issueBulkOperationsService";
import issueCommentPropertiesService from "../services/issueCommentPropertiesService";
import issueCommentsService from "../services/issueCommentsService";
import issueCustomFieldAssociationsService from "../services/issueCustomFieldAssociationsService";
import issueCustomFieldConfigurationAppsService from "../services/issueCustomFieldConfigurationAppsService";
import issueCustomFieldContextsService from "../services/issueCustomFieldContextsService";
import issueCustomFieldOptionsAppsService from "../services/issueCustomFieldOptionsAppsService";
import issueCustomFieldOptionsService from "../services/issueCustomFieldOptionsService";
import issueCustomFieldValuesAppsService from "../services/issueCustomFieldValuesAppsService";
import issueFieldConfigurationsService from "../services/issueFieldConfigurationsService";
import issueFieldsService from "../services/issueFieldsService";
import issueLinkTypesService from "../services/issueLinkTypesService";
import issueLinksService from "../services/issueLinksService";
import issueNavigatorSettingsService from "../services/issueNavigatorSettingsService";
import issueNotificationSchemesService from "../services/issueNotificationSchemesService";
import issuePrioritiesService from "../services/issuePrioritiesService";
import issuePropertiesService from "../services/issuePropertiesService";
import issueRedactionService from "../services/issueRedactionService";
import issueRemoteLinksService from "../services/issueRemoteLinksService";
import issueResolutionsService from "../services/issueResolutionsService";
import issueSearchService from "../services/issueSearchService";
import issueSecurityLevelService from "../services/issueSecurityLevelService";
import issueSecuritySchemesService from "../services/issueSecuritySchemesService";
import issueTypePropertiesService from "../services/issueTypePropertiesService";
import issueTypeSchemesService from "../services/issueTypeSchemesService";
import issueTypeScreenSchemesService from "../services/issueTypeScreenSchemesService";
import issueTypesService from "../services/issueTypesService";
import issueVotesService from "../services/issueVotesService";
import issueWatchersService from "../services/issueWatchersService";
import issueWorklogPropertiesService from "../services/issueWorklogPropertiesService";
import issueWorklogsService from "../services/issueWorklogsService";
import issuesService from "../services/issuesService";
import jiraExpressionsService from "../services/jiraExpressionsService";
import jiraSettingsService from "../services/jiraSettingsService";
import jqlFunctionsAppsService from "../services/jqlFunctionsAppsService";
import jqlService from "../services/jqlService";
import labelsService from "../services/labelsService";
import licenseMetricsService from "../services/licenseMetricsService";
import myselfService from "../services/myselfService";
import permissionSchemesService from "../services/permissionSchemesService";
import permissionsService from "../services/permissionsService";
import plansService from "../services/plansService";
import prioritySchemesService from "../services/prioritySchemesService";
import projectAvatarsService from "../services/projectAvatarsService";
import projectCategoriesService from "../services/projectCategoriesService";
import projectClassificationLevelsService from "../services/projectClassificationLevelsService";
import projectComponentsService from "../services/projectComponentsService";
import projectEmailService from "../services/projectEmailService";
import projectFeaturesService from "../services/projectFeaturesService";
import projectKeyAndNameValidationService from "../services/projectKeyAndNameValidationService";
import projectPermissionSchemesService from "../services/projectPermissionSchemesService";
import projectPropertiesService from "../services/projectPropertiesService";
import projectRoleActorsService from "../services/projectRoleActorsService";
import projectRolesService from "../services/projectRolesService";
import projectTemplatesService from "../services/projectTemplatesService";
import projectTypesService from "../services/projectTypesService";
import projectVersionsService from "../services/projectVersionsService";
import projectsService from "../services/projectsService";
import screenSchemesService from "../services/screenSchemesService";
import screenTabFieldsService from "../services/screenTabFieldsService";
import screenTabsService from "../services/screenTabsService";
import screensService from "../services/screensService";
import serverInfoService from "../services/serverInfoService";
import serviceRegistryService from "../services/serviceRegistryService";
import statusService from "../services/statusService";
import tasksService from "../services/tasksService";
import teamsInPlanService from "../services/teamsInPlanService";
import timeTrackingService from "../services/timeTrackingService";
import uiModificationsAppsService from "../services/uiModificationsAppsService";
import userPropertiesService from "../services/userPropertiesService";
import userSearchService from "../services/userSearchService";
import usernavpropertiesService from "../services/usernavpropertiesService";
import usersService from "../services/usersService";
import webhooksService from "../services/webhooksService";
import workflowSchemeDraftsService from "../services/workflowSchemeDraftsService";
import workflowSchemeProjectAssociationsService from "../services/workflowSchemeProjectAssociationsService";
import workflowSchemesService from "../services/workflowSchemesService";
import workflowStatusCategoriesService from "../services/workflowStatusCategoriesService";
import workflowStatusesService from "../services/workflowStatusesService";
import workflowTransitionPropertiesService from "../services/workflowTransitionPropertiesService";
import workflowTransitionRulesService from "../services/workflowTransitionRulesService";
import workflowsService from "../services/workflowsService";

export default class JiraClientImpl<TClient extends ClientType = ClientType> {
  /**
   * This resource represents an announcement banner. Use it to retrieve and update
   * banner configuration.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-announcement-banner
   */
  public announcementBanner: ReturnType<typeof announcementBannerService<TClient>>;

  /**
   * This resource represents app access rule data policies.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-data-policies
   */
  public appDataPolicies: ReturnType<typeof appDataPoliciesService<TClient>>;
  /**
   * This resource represents application roles. Use it to get details of an
   * application role or all application roles.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-application-roles
   */
  public applicationRoles: ReturnType<typeof applicationRolesService<TClient>>;
  /**
   * This resource supports [app
   * migrations](https://developer.atlassian.com/platform/app-migration/). Use it to:
   * - [to request migrated workflow rules
   * details](https://developer.atlassian.com/platform/app-migration/tutorials/migration-app-workflow-rules/).
   * - [perform bulk updates of entity
   * properties](https://developer.atlassian.com/platform/app-migration/tutorials/entity-properties-bulk-api/).
   * - [perform bulk updates of issue custom field
   * values](https://developer.atlassian.com/platform/app-migration/tutorials/migrating-app-custom-fields/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-migration
   */
  public appMigration: ReturnType<typeof appMigrationService<TClient>>;
  /**
   * This resource represents app properties. Use it to store arbitrary data for your
   * [Connect
   * app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-properties
   */
  public appProperties: ReturnType<typeof appPropertiesService<TClient>>;
  /**
   * This resource represents audits that record activities undertaken in Jira. Use
   * it to get a list of audit records.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records
   */
  public auditRecords: ReturnType<typeof auditRecordsService<TClient>>;
  /**
   * This resource represents system and custom avatars. Use it to obtain the
   * details of system or custom avatars, add and remove avatars from a project,
   * issue type or priority and obtain avatar images.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars
   */
  public avatars: ReturnType<typeof avatarsService<TClient>>;
  /**
   * This resource represents classification levels.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-classification-levels
   */
  public classificationLevels: ReturnType<typeof classificationLevelsService<TClient>>;
  /**
   * This resource represents dashboards. Use it to obtain the details of dashboards
   * as well as get, create, update, or remove item properties and gadgets from
   * dashboards.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dashboards
   */
  public dashboards: ReturnType<typeof dashboardsService<TClient>>;
  /**
   * This resource represents [modules registered
   * dynamically](https://developer.atlassian.com/cloud/jira/platform/dynamic-modules/)
   * by [Connect
   * apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dynamic-modules
   */
  public dynamicModules: ReturnType<typeof dynamicModulesService<TClient>>;
  /**
   * This resource represents options for sharing [filters](#api-group-Filters). Use
   * it to get share scopes as well as add and remove share scopes from filters.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filter-sharing
   */
  public filterSharing: ReturnType<typeof filterSharingService<TClient>>;
  /**
   * This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ).
   * Use it to get, create, update, or delete filters. Also use it to configure the
   * columns for a filter and set favorite filters.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters
   */
  public filters: ReturnType<typeof filtersService<TClient>>;
  /**
   * This resource represents a list of users and a list of groups. Use it to obtain
   * the details to populate user and group picker suggestions list.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-group-and-user-picker
   */
  public groupAndUserPicker: ReturnType<typeof groupAndUserPickerService<TClient>>;
  /**
   * This resource represents groups of users. Use it to get, create, find, and
   * delete groups as well as add and remove users from groups. (\[WARNING\] The
   * standard Atlassian group names are default names only and can be edited or
   * deleted. For example, an admin or Atlassian support could delete the default
   * group jira-software-users or rename it to jsw-users at any point. See
   * https://support.atlassian.com/user-management/docs/create-and-update-groups/
   * for details.)
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-groups
   */
  public groups: ReturnType<typeof groupsService<TClient>>;
  /**
   * This resource represents issue attachments and the attachment settings for
   * Jira. Use it to get the metadata for an attachment, delete an attachment, and
   * view the metadata for the contents of an attachment. Also, use it to get the
   * attachment settings for Jira.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-attachments
   */
  public issueAttachments: ReturnType<typeof issueAttachmentsService<TClient>>;
  /**
   * This resource represents the issue bulk operations. Use it to move multiple
   * issues from one project to another project or edit fields of multiple issues in
   * one go.
   *
   *
   * For additional clarity, we have created a page with further examples and
   * answers to frequently asked questions related to these APIs. You can access it
   * here: [Bulk operation APIs: additional examples and
   * FAQ](https://developer.atlassian.com/cloud/jira/platform/bulk-operation-additional-examples-and-faqs/).
   *
   * ### Authentication ###
   *
   * Access to the issue bulk operations requires authentication. For information on
   * how to authenticate API requests, refer to the [Basic auth for REST APIs
   * documentation](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/).
   *
   * ### Rate limiting ###
   *
   * The bulk edit and move APIs are subject to the usual rate limiting
   * infrastructure in Jira. For more information, refer to [Rate
   * limiting](https://developer.atlassian.com/cloud/jira/platform/rate-limiting/).
   * Additionally, at any given time, only 5 concurrent requests can be sent across
   * all users.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-bulk-operations
   */
  public issueBulkOperations: ReturnType<typeof issueBulkOperationsService<TClient>>;
  /**
   * This resource represents [issue comment](#api-group-Issue-comments) properties,
   * which provides for storing custom data against an issue comment. Use is to get,
   * set, and delete issue comment properties as well as obtain the keys of all
   * properties on a comment. Comment properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comment-properties
   */
  public issueCommentProperties: ReturnType<typeof issueCommentPropertiesService<TClient>>;
  /**
   * This resource represents issue comments. Use it to:
   *
   *  *  get, create, update, and delete a comment from an issue.
   *  *  get all comments from issue.
   *  *  get a list of comments by comment ID.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comments
   */
  public issueComments: ReturnType<typeof issueCommentsService<TClient>>;
  /**
   * This resource represents the fields associated to project and issue type
   * contexts. Use it to:
   *
   *  *  assign custom field to projects and issue types.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-associations
   */
  public issueCustomFieldAssociations: ReturnType<
    typeof issueCustomFieldAssociationsService<TClient>
  >;
  /**
   * This resource represents configurations stored against a custom field context
   * by a [Forge app](https://developer.atlassian.com/platform/forge/).
   * Configurations are information used by the Forge app at runtime to determine
   * how to handle or process the data in a custom field in a given context. Use
   * this resource to set and read configurations.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-configuration-apps-
   */
  public issueCustomFieldConfigurationApps: ReturnType<
    typeof issueCustomFieldConfigurationAppsService<TClient>
  >;
  /**
   * This resource represents issue custom field contexts. Use it to:
   *
   *  *  get, create, update, and delete custom field contexts.
   *  *  get context to issue types and projects mappings.
   *  *  get custom field contexts for projects and issue types.
   *  *  assign custom field contexts to projects.
   *  *  remove custom field contexts from projects.
   *  *  add issue types to custom field contexts.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-contexts
   */
  public issueCustomFieldContexts: ReturnType<typeof issueCustomFieldContextsService<TClient>>;
  /**
   * This resource represents custom issue field select list options created by a
   * Connect app. See [Issue custom field
   * options](#api-group-Issue-custom-field-options) to manipulate options created
   * in Jira or using the REST API.
   *
   * A select list issue field is a type of [issue
   * field](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field/)
   * that enables a user to select an option from a list. Use it to add, remove, and
   * update the options of a select list issue field.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options-apps-
   */
  public issueCustomFieldOptionsApps: ReturnType<
    typeof issueCustomFieldOptionsAppsService<TClient>
  >;
  /**
   * This resource represents custom issue field select list options created in Jira
   * or using the REST API. This resource supports the following field types:
   *
   *  *  Checkboxes.
   *  *  Radio Buttons.
   *  *  Select List (single choice).
   *  *  Select List (multiple choices).
   *  *  Select List (cascading).
   *
   * See [Issue custom field options
   * (apps)](#api-group-Issue-custom-field-options--apps-) to manipulate custom
   * issue field select list options created by a Connect app.
   *
   * Use it to retrieve, create, update, order, and delete custom field options.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options
   */
  public issueCustomFieldOptions: ReturnType<typeof issueCustomFieldOptionsService<TClient>>;
  /**
   * This resource represents the values of custom fields added by [Forge
   * apps](https://developer.atlassian.com/platform/forge/). Use it to update the
   * value of a custom field on issues.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-values-apps-
   */
  public issueCustomFieldValuesApps: ReturnType<typeof issueCustomFieldValuesAppsService<TClient>>;
  /**
   * This resource represents issue field configurations. Use it to get, set, and
   * delete field configurations and field configuration schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations
   */
  public issueFieldConfigurations: ReturnType<typeof issueFieldConfigurationsService<TClient>>;
  /**
   * This resource represents issue fields, both system and custom fields. Use it to
   * get fields, field configurations, and create custom fields.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields
   */
  public issueFields: ReturnType<typeof issueFieldsService<TClient>>;
  /**
   * This resource represents links between issues. Use it to get, create, and
   * delete links between issues.
   *
   * To use it, the site must have [issue
   * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-links
   */
  public issueLinks: ReturnType<typeof issueLinksService<TClient>>;
  /**
   * This resource represents [issue link](#api-group-Issue-links) types. Use it to
   * get, create, update, and delete link issue types as well as get lists of all
   * link issue types.
   *
   * To use it, the site must have [issue
   * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-link-types
   */
  public issueLinkTypes: ReturnType<typeof issueLinkTypesService<TClient>>;
  /**
   * This resource represents issue navigator settings. Use it to get and set issue
   * navigator default columns.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-navigator-settings
   */
  public issueNavigatorSettings: ReturnType<typeof issueNavigatorSettingsService<TClient>>;
  /**
   * This resource represents notification schemes, lists of events and the
   * recipients who will receive notifications for those events. Use it to get
   * details of a notification scheme and a list of notification schemes.
   *
   * ### About notification schemes ###
   *
   * A notification scheme is a list of events and recipients who will receive
   * notifications for those events. The list is contained within the
   * `notificationSchemeEvents` object and contains pairs of `events` and
   * `notifications`:
   *
   *  *  `event` Identifies the type of event. The events can be [Jira system
   * events](https://support.atlassian.com/jira-cloud-administration/docs/configure-notification-schemes/)
   * (see the *Events* section) or [custom
   * events](https://support.atlassian.com/jira-cloud-administration/docs/add-a-custom-event/).
   *  *  `notifications` Identifies the
   * [recipients](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-recipientsRecipients)
   * of notifications for each event. Recipients can be any of the following types:
   *
   *      *  `CurrentAssignee`
   *      *  `Reporter`
   *      *  `CurrentUser`
   *      *  `ProjectLead`
   *      *  `ComponentLead`
   *      *  `User` (the `parameter` is the user key)
   *      *  `Group` (the `parameter` is the group name)
   *      *  `ProjectRole` (the `parameter` is the project role ID)
   *      *  `EmailAddress` *(deprecated)*
   *      *  `AllWatchers`
   *      *  `UserCustomField` (the `parameter` is the ID of the custom field)
   *      *  `GroupCustomField`(the `parameter` is the ID of the custom field)
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-notification-schemes
   */
  public issueNotificationSchemes: ReturnType<typeof issueNotificationSchemesService<TClient>>;
  /**
   * This resource represents issue priorities. Use it to get, create and update
   * issue priorities and details for individual issue priorities.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-priorities
   */
  public issuePriorities: ReturnType<typeof issuePrioritiesService<TClient>>;
  /**
   * This resource represents [issue](#api-group-Issues) properties, which provides
   * for storing custom data against an issue. Use it to get, set, and delete issue
   * properties as well as obtain details of all properties on an issue. Operations
   * to bulk update and delete issue properties are also provided. Issue properties
   * are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-properties
   */
  public issueProperties: ReturnType<typeof issuePropertiesService<TClient>>;
  /**
   * This resource represents Issue Redaction. Provides APIs to redact issue data.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-redaction
   */
  public issueRedaction: ReturnType<typeof issueRedactionService<TClient>>;
  /**
   * This resource represents remote issue links, a way of linking Jira to
   * information in other systems. Use it to get, create, update, and delete remote
   * issue links either by ID or global ID. The global ID provides a way of
   * accessing remote issue links using information about the item's remote system
   * host and remote system identifier.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-remote-links
   */
  public issueRemoteLinks: ReturnType<typeof issueRemoteLinksService<TClient>>;
  /**
   * This resource represents issue resolution values. Use it to obtain a list of
   * all issue resolution values and the details of individual resolution values.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-resolutions
   */
  public issueResolutions: ReturnType<typeof issueResolutionsService<TClient>>;
  /**
   * This resource represents various ways to search for issues. Use it to search
   * for issues with a JQL query and find issues to populate an issue picker.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search
   */
  public issueSearch: ReturnType<typeof issueSearchService<TClient>>;
  /**
   * This resource represents issue security levels. Use it to obtain the details of
   * any issue security level. For more information about issue security levels, see
   * [Configuring issue-level security](https://confluence.atlassian.com/x/J4lKLg).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-level
   */
  public issueSecurityLevel: ReturnType<typeof issueSecurityLevelService<TClient>>;
  /**
   * This resource represents issue security schemes. Use it to get an issue
   * security scheme or a list of issue security schemes.
   *
   * Issue security schemes control which users or groups of users can view an
   * issue. When an issue security scheme is associated with a project, its security
   * levels can be applied to issues in that project. Sub-tasks also inherit the
   * security level of their parent issue.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-schemes
   */
  public issueSecuritySchemes: ReturnType<typeof issueSecuritySchemesService<TClient>>;
  /**
   * This resource represents Jira issues. Use it to:
   *
   *  *  create or edit issues, individually or in bulk.
   *  *  retrieve metadata about the options for creating or editing issues.
   *  *  delete an issue.
   *  *  assign a user to an issue.
   *  *  get issue changelogs.
   *  *  send notifications about an issue.
   *  *  get details of the transitions available for an issue.
   *  *  transition an issue.
   *  *  Archive issues.
   *  *  Unarchive issues.
   *  *  Export archived issues.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues
   */
  public issues: ReturnType<typeof issuesService<TClient>>;
  /**
   * This resource represents [issue type](#api-group-Issue-types) properties, which
   * provides for storing custom data against an issue type. Use it to get, create,
   * and delete issue type properties as well as obtain the keys of all properties
   * on a issues type. Issue type properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-properties
   */
  public issueTypeProperties: ReturnType<typeof issueTypePropertiesService<TClient>>;
  /**
   * This resource represents issue type schemes in classic projects. Use it to:
   *
   *  *  get issue type schemes and a list of the projects that use them.
   *  *  associate issue type schemes with projects.
   *  *  add issue types to issue type schemes.
   *  *  delete issue types from issue type schemes.
   *  *  create, update, and delete issue type schemes.
   *  *  change the order of issue types in issue type schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes
   */
  public issueTypeSchemes: ReturnType<typeof issueTypeSchemesService<TClient>>;
  /**
   * This resource represents issue type screen schemes. Use it to:
   *
   *  *  get issue type screen schemes and a list of the projects that use them.
   *  *  create issue type screen schemes.
   *  *  update issue type screen schemes.
   *  *  delete issue type screen schemes.
   *  *  associate issue type screen schemes with projects.
   *  *  append issue type to screen scheme mappings to issue type screen schemes.
   *  *  remove issue type to screen scheme mappings from issue type screen schemes.
   *  *  update default screen scheme of issue type screen scheme.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes
   */
  public issueTypeScreenSchemes: ReturnType<typeof issueTypeScreenSchemesService<TClient>>;
  /**
   * This resource represents issues types. Use it to:
   *
   *  *  get, create, update, and delete issue types.
   *  *  get all issue types for a user.
   *  *  get alternative issue types.
   *  *  set an avatar for an issue type.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-types
   */
  public issueTypes: ReturnType<typeof issueTypesService<TClient>>;
  /**
   * This resource represents votes cast by users on an issue. Use it to get details
   * of votes on an issue as well as cast and withdrawal votes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-votes
   */
  public issueVotes: ReturnType<typeof issueVotesService<TClient>>;
  /**
   * This resource represents users watching an issue. Use it to get details of
   * users watching an issue as well as start and stop a user watching an issue.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-watchers
   */
  public issueWatchers: ReturnType<typeof issueWatchersService<TClient>>;
  /**
   * This resource represents [issue worklog](#api-group-Issue-worklogs) properties,
   * which provides for storing custom data against an issue worklog. Use it to get,
   * create, and delete issue worklog properties as well as obtain the keys of all
   * properties on a issue worklog. Issue worklog properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklog-properties
   */
  public issueWorklogProperties: ReturnType<typeof issueWorklogPropertiesService<TClient>>;
  /**
   * This resource represents issue worklogs. Use it to:
   *
   *  *  get, create, update, and delete worklogs.
   *  *  obtain lists of updated or deleted worklogs.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs
   */
  public issueWorklogs: ReturnType<typeof issueWorklogsService<TClient>>;
  /**
   * This resource is a collection of operations for [Jira
   * expressions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-expressions
   */
  public jiraExpressions: ReturnType<typeof jiraExpressionsService<TClient>>;
  /**
   * This resource represents various settings in Jira. Use it to get and update
   * Jira settings and properties.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-settings
   */
  public jiraSettings: ReturnType<typeof jiraSettingsService<TClient>>;
  /**
   * This resource represents JQL function's precomputations. Precomputation is a
   * mapping between custom function call and JQL fragment returned by this
   * function. Use it to get and update precomputations.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql-functions-apps-
   */
  public jqlFunctionsApps: ReturnType<typeof jqlFunctionsAppsService<TClient>>;
  /**
   * This resource represents JQL search auto-complete details. Use it to obtain JQL
   * search auto-complete data and suggestions for use in programmatic construction
   * of queries or custom query builders. It also provides operations to:
   *
   *  *  convert one or more JQL queries with user identifiers (username or user
   * key) to equivalent JQL queries with account IDs.
   *  *  convert readable details in one or more JQL queries to IDs where a user
   * doesn't have permission to view the entity whose details are readable.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql
   */
  public jql: ReturnType<typeof jqlService<TClient>>;
  /**
   * This resource represents available labels. Use it to get available labels for
   * the global label field.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-labels
   */
  public labels: ReturnType<typeof labelsService<TClient>>;
  /**
   * This resource represents license metrics. Use it to get available metrics for
   * Jira licences.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-license-metrics
   */
  public licenseMetrics: ReturnType<typeof licenseMetricsService<TClient>>;
  /**
   * This resource represents information about the current user, such as basic
   * details, group membership, application roles, preferences, and locale. Use it
   * to get, create, update, and delete (restore default) values of the user's
   * preferences and locale.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-myself
   */
  public myself: ReturnType<typeof myselfService<TClient>>;
  /**
   * This resource represents permission schemes. Use it to get, create, update, and
   * delete permission schemes as well as get, create, update, and delete details of
   * the permissions granted in those schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes
   */
  public permissionSchemes: ReturnType<typeof permissionSchemesService<TClient>>;
  /**
   * This resource represents permissions. Use it to obtain details of all
   * permissions and determine whether the user has certain permissions.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permissions
   */
  public permissions: ReturnType<typeof permissionsService<TClient>>;
  /**
   * This resource represents plans. Use it to get, create, duplicate, update, trash
   * and archive plans.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-plans
   */
  public plans: ReturnType<typeof plansService<TClient>>;
  /**
   * This resource represents issue priority schemes. Use it to get priority schemes
   * and related information, and to create, update and delete priority schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-priority-schemes
   */
  public prioritySchemes: ReturnType<typeof prioritySchemesService<TClient>>;
  /**
   * This resource represents avatars associated with a project. Use it to get,
   * load, set, and remove project avatars.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-avatars
   */
  public projectAvatars: ReturnType<typeof projectAvatarsService<TClient>>;
  /**
   * This resource represents project categories. Use it to create, update, and
   * delete project categories as well as obtain a list of all project categories
   * and details of individual categories. For more information on managing project
   * categories, see [Adding, assigning, and deleting project
   * categories](https://confluence.atlassian.com/x/-A5WMg).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-categories
   */
  public projectCategories: ReturnType<typeof projectCategoriesService<TClient>>;
  /**
   * This resource represents classification levels used in a project. Use it to
   * view and manage classification levels in your projects.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-classification-levels
   */
  public projectClassificationLevels: ReturnType<
    typeof projectClassificationLevelsService<TClient>
  >;
  /**
   * This resource represents project components. Use it to get, create, update, and
   * delete project components. Also get components for project and get a count of
   * issues by component.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-components
   */
  public projectComponents: ReturnType<typeof projectComponentsService<TClient>>;
  /**
   * This resource represents the email address used to send a project's
   * notifications. Use it to get and set the [project's sender email
   * address](https://confluence.atlassian.com/x/dolKLg).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-email
   */
  public projectEmail: ReturnType<typeof projectEmailService<TClient>>;
  /**
   * This resource represents project features. Use it to get the list of features
   * for a project and modify the state of a feature. The project feature endpoint
   * is available only for Jira Software, both for team- and company-managed
   * projects.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-features
   */
  public projectFeatures: ReturnType<typeof projectFeaturesService<TClient>>;
  /**
   * This resource provides validation for project keys and names.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-key-and-name-validation
   */
  public projectKeyAndNameValidation: ReturnType<
    typeof projectKeyAndNameValidationService<TClient>
  >;
  /**
   * This resource represents permission schemes for a project. Use this resource to:
   *
   *  *  get details of a project's issue security levels available to the calling
   * user.
   *  *  get the permission scheme associated with the project or assign different
   * permission scheme to the project.
   *  *  get details of a project's issue security scheme.
   *
   * See [Managing project permissions](https://confluence.atlassian.com/x/yodKLg)
   * for more information about permission schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-permission-schemes
   */
  public projectPermissionSchemes: ReturnType<typeof projectPermissionSchemesService<TClient>>;
  /**
   * This resource represents [project](#api-group-Projects) properties, which
   * provides for storing custom data against a project. Use it to get, create, and
   * delete project properties as well as get a list of property keys for a project.
   * Project properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-properties
   */
  public projectProperties: ReturnType<typeof projectPropertiesService<TClient>>;
  /**
   * This resource represents the users assigned to [project
   * roles](#api-group-Issue-comments). Use it to get, add, and remove default users
   * from project roles. Also use it to add and remove users from a project role
   * associated with a project.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-role-actors
   */
  public projectRoleActors: ReturnType<typeof projectRoleActorsService<TClient>>;
  /**
   * This resource represents the roles that users can play in projects. Use this
   * resource to get, create, update, and delete project roles.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-roles
   */
  public projectRoles: ReturnType<typeof projectRolesService<TClient>>;
  /**
   * This resource represents projects. Use it to get, create, update, and delete
   * projects. Also get statuses available to a project, a project's notification
   * schemes, and update a project's type.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects
   */
  public projects: ReturnType<typeof projectsService<TClient>>;
  /**
   * This resource represents project templates. Use it to create a new project from
   * a custom template.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-templates
   */
  public projectTemplates: ReturnType<typeof projectTemplatesService<TClient>>;
  /**
   * This resource represents project types. Use it to obtain a list of all project
   * types, a list of project types accessible to the calling user, and details of a
   * project type.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-types
   */
  public projectTypes: ReturnType<typeof projectTypesService<TClient>>;
  /**
   * This resource represents project versions. Use it to get, get lists of, create,
   * update, move, merge, and delete project versions. This resource also provides
   * counts of issues by version.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-versions
   */
  public projectVersions: ReturnType<typeof projectVersionsService<TClient>>;
  /**
   * This resource represents screen schemes in classic projects. Use it to get,
   * create, update, and delete screen schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes
   */
  public screenSchemes: ReturnType<typeof screenSchemesService<TClient>>;
  /**
   * This resource represents the screens used to record issue details. Use it to:
   *
   *  *  get details of all screens.
   *  *  get details of all the fields available for use on screens.
   *  *  create screens.
   *  *  delete screens.
   *  *  update screens.
   *  *  add a field to the default screen.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens
   */
  public screens: ReturnType<typeof screensService<TClient>>;
  /**
   * This resource represents the screen tab fields used to record issue details.
   * Use it to get, add, move, and remove fields from screen tabs.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields
   */
  public screenTabFields: ReturnType<typeof screenTabFieldsService<TClient>>;
  /**
   * This resource represents the screen tabs used to record issue details. Use it
   * to get, create, update, move, and delete screen tabs.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tabs
   */
  public screenTabs: ReturnType<typeof screenTabsService<TClient>>;
  /**
   * This resource provides information about the Jira instance.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-server-info
   */
  public serverInfo: ReturnType<typeof serverInfoService<TClient>>;
  /**
   * This resource represents a service registry. Use it to retrieve attributes
   * related to a [service
   * registry](https://support.atlassian.com/jira-service-management-cloud/docs/what-is-services/)
   * in JSM.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-service-registry
   */
  public serviceRegistry: ReturnType<typeof serviceRegistryService<TClient>>;
  /**
   * This resource represents statuses. Use it to search, get, create, delete, and
   * change statuses.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status
   */
  public status: ReturnType<typeof statusService<TClient>>;
  /**
   * This resource represents a [long-running asynchronous
   * tasks](#async-operations). Use it to obtain details about the progress of a
   * long-running task or cancel a long-running task.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks
   */
  public tasks: ReturnType<typeof tasksService<TClient>>;
  /**
   * This resource represents planning settings for plan-only and Atlassian teams in
   * a plan. Use it to get, create, update and delete planning settings.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-teams-in-plan
   */
  public teamsInPlan: ReturnType<typeof teamsInPlanService<TClient>>;
  /**
   * This resource represents time tracking and time tracking providers. Use it to
   * get and set the time tracking provider, get and set the time tracking options,
   * and disable time tracking.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-time-tracking
   */
  public timeTracking: ReturnType<typeof timeTrackingService<TClient>>;
  /**
   * UI modifications is a feature available for **Forge apps only**. It enables
   * Forge apps to control how selected Jira fields behave on the following views:
   * global issue create, issue view, issue transition. For example: hide specific
   * fields, set them as required, etc.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-ui-modifications-apps-
   */
  public uiModificationsApps: ReturnType<typeof uiModificationsAppsService<TClient>>;
  /**
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-usernavproperties
   */
  public usernavproperties: ReturnType<typeof usernavpropertiesService<TClient>>;
  /**
   * This resource represents [user](#api-group-Users) properties and provides for
   * storing custom data against a user. Use it to get, create, and delete user
   * properties as well as get a list of property keys for a user. This resourse is
   * designed for integrations and apps to store per-user data and settings. This
   * enables data used to customized the user experience to be kept in the Jira
   * Cloud instance's database. User properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * This resource does not access the [user
   * properties](https://confluence.atlassian.com/x/8YxjL) created and maintained in
   * Jira.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-properties
   */
  public userProperties: ReturnType<typeof userPropertiesService<TClient>>;
  /**
   * This resource represents various ways to search for and find users. Use it to
   * obtain list of users including users assignable to projects and issues, users
   * with permissions, user lists for pickup fields, and user lists generated using
   * structured queries. Note that the operations in this resource only return users
   * found within the first 1000 users.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-search
   */
  public userSearch: ReturnType<typeof userSearchService<TClient>>;
  /**
   * This resource represent users. Use it to:
   *
   *  *  get, get a list of, create, and delete users.
   *  *  get, set, and reset a user's default issue table columns.
   *  *  get a list of the groups the user belongs to.
   *  *  get a list of user account IDs for a list of usernames or user keys.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users
   */
  public users: ReturnType<typeof usersService<TClient>>;
  /**
   * This resource represents webhooks. Webhooks are calls sent to a URL when an
   * event occurs in Jira for issues specified by a JQL query. Only Connect and
   * OAuth 2.0 apps can register and manage webhooks. For more information, see
   * [Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/#registering-a-webhook-via-the-jira-rest-api-for-connect-apps).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks
   */
  public webhooks: ReturnType<typeof webhooksService<TClient>>;
  /**
   * This resource represents draft workflow schemes. Use it to manage drafts of
   * workflow schemes.
   *
   * A workflow scheme maps issue types to workflows. A workflow scheme can be
   * associated with one or more projects, which enables the projects to use the
   * workflow-issue type mappings.
   *
   * Active workflow schemes (workflow schemes that are used by projects) cannot be
   * edited. Editing an active workflow scheme creates a draft copy of the scheme.
   * The draft workflow scheme can then be edited and published (replacing the
   * active scheme).
   *
   * See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg)
   * for more information.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-scheme-drafts
   */
  public workflowSchemeDrafts: ReturnType<typeof workflowSchemeDraftsService<TClient>>;
  /**
   * This resource represents the associations between workflow schemes and projects.
   *
   * For more information, see [Managing your
   * workflows](https://confluence.atlassian.com/x/q4hKLg).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-scheme-project-associations
   */
  public workflowSchemeProjectAssociations: ReturnType<
    typeof workflowSchemeProjectAssociationsService<TClient>
  >;
  /**
   * This resource represents workflow schemes. Use it to manage workflow schemes
   * and the workflow scheme's workflows and issue types.
   *
   * A workflow scheme maps issue types to workflows. A workflow scheme can be
   * associated with one or more projects, which enables the projects to use the
   * workflow-issue type mappings.
   *
   * Active workflow schemes (workflow schemes that are used by projects) cannot be
   * edited. When an active workflow scheme is edited, a draft copy of the scheme is
   * created. The draft workflow scheme is then be edited and published (replacing
   * the active scheme).
   *
   * See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg)
   * for more information.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-schemes
   */
  public workflowSchemes: ReturnType<typeof workflowSchemesService<TClient>>;
  /**
   * This resource represents workflows. Use it to:
   *
   *  *  Get workflows
   *  *  Create workflows
   *  *  Update workflows
   *  *  Delete inactive workflows
   *  *  Get workflow capabilities
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows
   */
  public workflows: ReturnType<typeof workflowsService<TClient>>;
  /**
   * This resource represents status categories. Use it to obtain a list of all
   * status categories and the details of a category. Status categories provided a
   * mechanism for categorizing [statuses](#api-group-Workflow-statuses).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-status-categories
   */
  public workflowStatusCategories: ReturnType<typeof workflowStatusCategoriesService<TClient>>;
  /**
   * This resource represents issue workflow statuses. Use it to obtain a list of
   * all statuses associated with workflows and the details of a status.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-statuses
   */
  public workflowStatuses: ReturnType<typeof workflowStatusesService<TClient>>;
  /**
   * This resource represents workflow transition properties, which provides for
   * storing custom data against a workflow transition. Use it to get, create, and
   * delete workflow transition properties as well as get a list of property keys
   * for a workflow transition. Workflow transition properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @deprecated
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-properties
   */
  public workflowTransitionProperties: ReturnType<
    typeof workflowTransitionPropertiesService<TClient>
  >;
  /**
   * This resource represents workflow transition rules. Workflow transition rules
   * define a Connect or a Forge app routine, such as a [workflow post
   * functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
   * that is executed in association with the workflow. Use it to read and modify
   * configuration of workflow transition rules.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules
   */
  public workflowTransitionRules: ReturnType<typeof workflowTransitionRulesService<TClient>>;

  constructor(config: DefaultJiraConfig | ForgeJiraConfig) {
    // Validate config has required properties
    validateJiraConfig(config);

    this.announcementBanner = announcementBannerService(config);
    this.appDataPolicies = appDataPoliciesService(config);
    this.applicationRoles = applicationRolesService(config);
    this.appMigration = appMigrationService(config);
    this.appProperties = appPropertiesService(config);
    this.auditRecords = auditRecordsService(config);
    this.avatars = avatarsService(config);
    this.classificationLevels = classificationLevelsService(config);
    this.dashboards = dashboardsService(config);
    this.dynamicModules = dynamicModulesService(config);
    this.filterSharing = filterSharingService(config);
    this.filters = filtersService(config);
    this.groupAndUserPicker = groupAndUserPickerService(config);
    this.groups = groupsService(config);
    this.issueAttachments = issueAttachmentsService(config);
    this.issueBulkOperations = issueBulkOperationsService(config);
    this.issueCommentProperties = issueCommentPropertiesService(config);
    this.issueComments = issueCommentsService(config);
    this.issueCustomFieldAssociations = issueCustomFieldAssociationsService(config);
    this.issueCustomFieldConfigurationApps = issueCustomFieldConfigurationAppsService(config);
    this.issueCustomFieldContexts = issueCustomFieldContextsService(config);
    this.issueCustomFieldOptionsApps = issueCustomFieldOptionsAppsService(config);
    this.issueCustomFieldOptions = issueCustomFieldOptionsService(config);
    this.issueCustomFieldValuesApps = issueCustomFieldValuesAppsService(config);
    this.issueFieldConfigurations = issueFieldConfigurationsService(config);
    this.issueFields = issueFieldsService(config);
    this.issueLinks = issueLinksService(config);
    this.issueLinkTypes = issueLinkTypesService(config);
    this.issueNavigatorSettings = issueNavigatorSettingsService(config);
    this.issueNotificationSchemes = issueNotificationSchemesService(config);
    this.issuePriorities = issuePrioritiesService(config);
    this.issueProperties = issuePropertiesService(config);
    this.issueRedaction = issueRedactionService(config);
    this.issueRemoteLinks = issueRemoteLinksService(config);
    this.issueResolutions = issueResolutionsService(config);
    this.issueSearch = issueSearchService(config);
    this.issueSecurityLevel = issueSecurityLevelService(config);
    this.issueSecuritySchemes = issueSecuritySchemesService(config);
    this.issues = issuesService(config);
    this.issueTypeProperties = issueTypePropertiesService(config);
    this.issueTypeSchemes = issueTypeSchemesService(config);
    this.issueTypeScreenSchemes = issueTypeScreenSchemesService(config);
    this.issueTypes = issueTypesService(config);
    this.issueVotes = issueVotesService(config);
    this.issueWatchers = issueWatchersService(config);
    this.issueWorklogProperties = issueWorklogPropertiesService(config);
    this.issueWorklogs = issueWorklogsService(config);
    this.jiraExpressions = jiraExpressionsService(config);
    this.jiraSettings = jiraSettingsService(config);
    this.jqlFunctionsApps = jqlFunctionsAppsService(config);
    this.jql = jqlService(config);
    this.labels = labelsService(config);
    this.licenseMetrics = licenseMetricsService(config);
    this.myself = myselfService(config);
    this.permissionSchemes = permissionSchemesService(config);
    this.permissions = permissionsService(config);
    this.plans = plansService(config);
    this.prioritySchemes = prioritySchemesService(config);
    this.projectAvatars = projectAvatarsService(config);
    this.projectCategories = projectCategoriesService(config);
    this.projectClassificationLevels = projectClassificationLevelsService(config);
    this.projectComponents = projectComponentsService(config);
    this.projectEmail = projectEmailService(config);
    this.projectFeatures = projectFeaturesService(config);
    this.projectKeyAndNameValidation = projectKeyAndNameValidationService(config);
    this.projectPermissionSchemes = projectPermissionSchemesService(config);
    this.projectProperties = projectPropertiesService(config);
    this.projectRoleActors = projectRoleActorsService(config);
    this.projectRoles = projectRolesService(config);
    this.projects = projectsService(config);
    this.projectTemplates = projectTemplatesService(config);
    this.projectTypes = projectTypesService(config);
    this.projectVersions = projectVersionsService(config);
    this.screenSchemes = screenSchemesService(config);
    this.screens = screensService(config);
    this.screenTabFields = screenTabFieldsService(config);
    this.screenTabs = screenTabsService(config);
    this.serverInfo = serverInfoService(config);
    this.serviceRegistry = serviceRegistryService(config);
    this.status = statusService(config);
    this.tasks = tasksService(config);
    this.teamsInPlan = teamsInPlanService(config);
    this.timeTracking = timeTrackingService(config);
    this.uiModificationsApps = uiModificationsAppsService(config);
    this.usernavproperties = usernavpropertiesService(config);
    this.userProperties = userPropertiesService(config);
    this.userSearch = userSearchService(config);
    this.users = usersService(config);
    this.webhooks = webhooksService(config);
    this.workflowSchemeDrafts = workflowSchemeDraftsService(config);
    this.workflowSchemeProjectAssociations = workflowSchemeProjectAssociationsService(config);
    this.workflowSchemes = workflowSchemesService(config);
    this.workflows = workflowsService(config);
    this.workflowStatusCategories = workflowStatusCategoriesService(config);
    this.workflowStatuses = workflowStatusesService(config);
    this.workflowTransitionProperties = workflowTransitionPropertiesService(config);
    this.workflowTransitionRules = workflowTransitionRulesService(config);
  }
}
