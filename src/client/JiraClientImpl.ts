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
import requestService from "../services/requestService";
import assetsService from "../services/assetsService";
import servicedeskService from "../services/servicedeskService";
import customerService from "../services/customerService";
import infoService from "../services/infoService";
import knowledgebaseService from "../services/knowledgebaseService";
import organizationService from "../services/organizationService";
import requestTypeService from "../services/requesttypeService";

export default class JiraClientImpl<TClient extends ClientType = ClientType> {
  private config: DefaultJiraConfig | ForgeJiraConfig;
  private _announcementBanner?: ReturnType<typeof announcementBannerService<TClient>>;
  private _appDataPolicies?: ReturnType<typeof appDataPoliciesService<TClient>>;
  private _applicationRoles?: ReturnType<typeof applicationRolesService<TClient>>;
  private _appMigration?: ReturnType<typeof appMigrationService<TClient>>;
  private _appProperties?: ReturnType<typeof appPropertiesService<TClient>>;
  private _auditRecords?: ReturnType<typeof auditRecordsService<TClient>>;
  private _avatars?: ReturnType<typeof avatarsService<TClient>>;
  private _classificationLevels?: ReturnType<typeof classificationLevelsService<TClient>>;
  private _dashboards?: ReturnType<typeof dashboardsService<TClient>>;
  private _dynamicModules?: ReturnType<typeof dynamicModulesService<TClient>>;
  private _filterSharing?: ReturnType<typeof filterSharingService<TClient>>;
  private _filters?: ReturnType<typeof filtersService<TClient>>;
  private _groupAndUserPicker?: ReturnType<typeof groupAndUserPickerService<TClient>>;
  private _groups?: ReturnType<typeof groupsService<TClient>>;
  private _issueAttachments?: ReturnType<typeof issueAttachmentsService<TClient>>;
  private _issueBulkOperations?: ReturnType<typeof issueBulkOperationsService<TClient>>;
  private _issueCommentProperties?: ReturnType<typeof issueCommentPropertiesService<TClient>>;
  private _issueComments?: ReturnType<typeof issueCommentsService<TClient>>;
  private _issueCustomFieldAssociations?: ReturnType<
    typeof issueCustomFieldAssociationsService<TClient>
  >;
  private _issueCustomFieldConfigurationApps?: ReturnType<
    typeof issueCustomFieldConfigurationAppsService<TClient>
  >;
  private _issueCustomFieldContexts?: ReturnType<typeof issueCustomFieldContextsService<TClient>>;
  private _issueCustomFieldOptionsApps?: ReturnType<
    typeof issueCustomFieldOptionsAppsService<TClient>
  >;
  private _issueCustomFieldOptions?: ReturnType<typeof issueCustomFieldOptionsService<TClient>>;
  private _issueCustomFieldValuesApps?: ReturnType<
    typeof issueCustomFieldValuesAppsService<TClient>
  >;
  private _issueFieldConfigurations?: ReturnType<typeof issueFieldConfigurationsService<TClient>>;
  private _issueFields?: ReturnType<typeof issueFieldsService<TClient>>;
  private _issueLinks?: ReturnType<typeof issueLinksService<TClient>>;
  private _issueLinkTypes?: ReturnType<typeof issueLinkTypesService<TClient>>;
  private _issueNavigatorSettings?: ReturnType<typeof issueNavigatorSettingsService<TClient>>;
  private _issueNotificationSchemes?: ReturnType<typeof issueNotificationSchemesService<TClient>>;
  private _issuePriorities?: ReturnType<typeof issuePrioritiesService<TClient>>;
  private _issueProperties?: ReturnType<typeof issuePropertiesService<TClient>>;
  private _issueRedaction?: ReturnType<typeof issueRedactionService<TClient>>;
  private _issueRemoteLinks?: ReturnType<typeof issueRemoteLinksService<TClient>>;
  private _issueResolutions?: ReturnType<typeof issueResolutionsService<TClient>>;
  private _issueSearch?: ReturnType<typeof issueSearchService<TClient>>;
  private _issueSecurityLevel?: ReturnType<typeof issueSecurityLevelService<TClient>>;
  private _issueSecuritySchemes?: ReturnType<typeof issueSecuritySchemesService<TClient>>;
  private _issueTypeProperties?: ReturnType<typeof issueTypePropertiesService<TClient>>;
  private _issueTypeSchemes?: ReturnType<typeof issueTypeSchemesService<TClient>>;
  private _issueTypeScreenSchemes?: ReturnType<typeof issueTypeScreenSchemesService<TClient>>;
  private _issueTypes?: ReturnType<typeof issueTypesService<TClient>>;
  private _issueVotes?: ReturnType<typeof issueVotesService<TClient>>;
  private _issueWatchers?: ReturnType<typeof issueWatchersService<TClient>>;
  private _issueWorklogProperties?: ReturnType<typeof issueWorklogPropertiesService<TClient>>;
  private _issueWorklogs?: ReturnType<typeof issueWorklogsService<TClient>>;
  private _issues?: ReturnType<typeof issuesService<TClient>>;
  private _jiraExpressions?: ReturnType<typeof jiraExpressionsService<TClient>>;
  private _jiraSettings?: ReturnType<typeof jiraSettingsService<TClient>>;
  private _jqlFunctionsApps?: ReturnType<typeof jqlFunctionsAppsService<TClient>>;
  private _jql?: ReturnType<typeof jqlService<TClient>>;
  private _labels?: ReturnType<typeof labelsService<TClient>>;
  private _licenseMetrics?: ReturnType<typeof licenseMetricsService<TClient>>;
  private _myself?: ReturnType<typeof myselfService<TClient>>;
  private _permissionSchemes?: ReturnType<typeof permissionSchemesService<TClient>>;
  private _permissions?: ReturnType<typeof permissionsService<TClient>>;
  private _plans?: ReturnType<typeof plansService<TClient>>;
  private _prioritySchemes?: ReturnType<typeof prioritySchemesService<TClient>>;
  private _projectAvatars?: ReturnType<typeof projectAvatarsService<TClient>>;
  private _projectCategories?: ReturnType<typeof projectCategoriesService<TClient>>;
  private _projectClassificationLevels?: ReturnType<
    typeof projectClassificationLevelsService<TClient>
  >;
  private _projectComponents?: ReturnType<typeof projectComponentsService<TClient>>;
  private _projectEmail?: ReturnType<typeof projectEmailService<TClient>>;
  private _projectFeatures?: ReturnType<typeof projectFeaturesService<TClient>>;
  private _projectKeyAndNameValidation?: ReturnType<
    typeof projectKeyAndNameValidationService<TClient>
  >;
  private _projectPermissionSchemes?: ReturnType<typeof projectPermissionSchemesService<TClient>>;
  private _projectProperties?: ReturnType<typeof projectPropertiesService<TClient>>;
  private _projectRoleActors?: ReturnType<typeof projectRoleActorsService<TClient>>;
  private _projectRoles?: ReturnType<typeof projectRolesService<TClient>>;
  private _projectTemplates?: ReturnType<typeof projectTemplatesService<TClient>>;
  private _projectTypes?: ReturnType<typeof projectTypesService<TClient>>;
  private _projectVersions?: ReturnType<typeof projectVersionsService<TClient>>;
  private _projects?: ReturnType<typeof projectsService<TClient>>;
  private _screenSchemes?: ReturnType<typeof screenSchemesService<TClient>>;
  private _screenTabFields?: ReturnType<typeof screenTabFieldsService<TClient>>;
  private _screenTabs?: ReturnType<typeof screenTabsService<TClient>>;
  private _screens?: ReturnType<typeof screensService<TClient>>;
  private _serverInfo?: ReturnType<typeof serverInfoService<TClient>>;
  private _serviceRegistry?: ReturnType<typeof serviceRegistryService<TClient>>;
  private _status?: ReturnType<typeof statusService<TClient>>;
  private _tasks?: ReturnType<typeof tasksService<TClient>>;
  private _teamsInPlan?: ReturnType<typeof teamsInPlanService<TClient>>;
  private _timeTracking?: ReturnType<typeof timeTrackingService<TClient>>;
  private _uiModificationsApps?: ReturnType<typeof uiModificationsAppsService<TClient>>;
  private _userProperties?: ReturnType<typeof userPropertiesService<TClient>>;
  private _userSearch?: ReturnType<typeof userSearchService<TClient>>;
  private _usernavproperties?: ReturnType<typeof usernavpropertiesService<TClient>>;
  private _users?: ReturnType<typeof usersService<TClient>>;
  private _webhooks?: ReturnType<typeof webhooksService<TClient>>;
  private _workflowSchemeDrafts?: ReturnType<typeof workflowSchemeDraftsService<TClient>>;
  private _workflowSchemeProjectAssociations?: ReturnType<
    typeof workflowSchemeProjectAssociationsService<TClient>
  >;
  private _workflowSchemes?: ReturnType<typeof workflowSchemesService<TClient>>;
  private _workflowStatusCategories?: ReturnType<typeof workflowStatusCategoriesService<TClient>>;
  private _workflowStatuses?: ReturnType<typeof workflowStatusesService<TClient>>;
  private _workflowTransitionProperties?: ReturnType<
    typeof workflowTransitionPropertiesService<TClient>
  >;
  private _workflowTransitionRules?: ReturnType<typeof workflowTransitionRulesService<TClient>>;
  private _workflows?: ReturnType<typeof workflowsService<TClient>>;
  private _servicedesk?: ReturnType<typeof servicedeskService<TClient>>;
  private _request?: ReturnType<typeof requestService<TClient>>;
  private _customer?: ReturnType<typeof customerService<TClient>>;
  private _assets?: ReturnType<typeof assetsService<TClient>>;
  private _info?: ReturnType<typeof infoService<TClient>>;
  private _knowledgebase?: ReturnType<typeof knowledgebaseService<TClient>>;
  private _organization?: ReturnType<typeof organizationService<TClient>>;
  private _requestType?: ReturnType<typeof requestTypeService<TClient>>;

  constructor(config: DefaultJiraConfig | ForgeJiraConfig) {
    // Validate config has required properties
    validateJiraConfig(config);

    this.config = config;
  }

  /**
   * This resource represents an announcement banner. Use it to retrieve and update
   * banner configuration.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-announcement-banner
   */
  get announcementBanner() {
    if (!this._announcementBanner) {
      this._announcementBanner = announcementBannerService(this.config);
    }
    return this._announcementBanner;
  }

  /**
   * This resource represents app access rule data policies.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-data-policies
   */
  get appDataPolicies() {
    if (!this._appDataPolicies) {
      this._appDataPolicies = appDataPoliciesService(this.config);
    }
    return this._appDataPolicies;
  }

  /**
   * This resource represents application roles. Use it to get details of an
   * application role or all application roles.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-application-roles
   */
  get applicationRoles() {
    if (!this._applicationRoles) {
      this._applicationRoles = applicationRolesService(this.config);
    }
    return this._applicationRoles;
  }

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
  get appMigration() {
    if (!this._appMigration) {
      this._appMigration = appMigrationService(this.config);
    }
    return this._appMigration;
  }

  /**
   * This resource represents app properties. Use it to store arbitrary data for your
   * [Connect
   * app](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-properties
   */
  get appProperties() {
    if (!this._appProperties) {
      this._appProperties = appPropertiesService(this.config);
    }
    return this._appProperties;
  }

  /**
   * This resource represents audits that record activities undertaken in Jira. Use
   * it to get a list of audit records.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records
   */
  get auditRecords() {
    if (!this._auditRecords) {
      this._auditRecords = auditRecordsService(this.config);
    }
    return this._auditRecords;
  }

  /**
   * This resource represents system and custom avatars. Use it to obtain the
   * details of system or custom avatars, add and remove avatars from a project,
   * issue type or priority and obtain avatar images.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars
   */
  get avatars() {
    if (!this._avatars) {
      this._avatars = avatarsService(this.config);
    }
    return this._avatars;
  }

  /**
   * This resource represents classification levels.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-classification-levels
   */
  get classificationLevels() {
    if (!this._classificationLevels) {
      this._classificationLevels = classificationLevelsService(this.config);
    }
    return this._classificationLevels;
  }

  /**
   * This resource represents dashboards. Use it to obtain the details of dashboards
   * as well as get, create, update, or remove item properties and gadgets from
   * dashboards.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dashboards
   */
  get dashboards() {
    if (!this._dashboards) {
      this._dashboards = dashboardsService(this.config);
    }
    return this._dashboards;
  }

  /**
   * This resource represents [modules registered
   * dynamically](https://developer.atlassian.com/cloud/jira/platform/dynamic-modules/)
   * by [Connect
   * apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dynamic-modules
   */
  get dynamicModules() {
    if (!this._dynamicModules) {
      this._dynamicModules = dynamicModulesService(this.config);
    }
    return this._dynamicModules;
  }

  /**
   * This resource represents options for sharing [filters](#api-group-Filters). Use
   * it to get share scopes as well as add and remove share scopes from filters.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filter-sharing
   */
  get filterSharing() {
    if (!this._filterSharing) {
      this._filterSharing = filterSharingService(this.config);
    }
    return this._filterSharing;
  }

  /**
   * This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ).
   * Use it to get, create, update, or delete filters. Also use it to configure the
   * columns for a filter and set favorite filters.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters
   */
  get filters() {
    if (!this._filters) {
      this._filters = filtersService(this.config);
    }
    return this._filters;
  }

  /**
   * This resource represents a list of users and a list of groups. Use it to obtain
   * the details to populate user and group picker suggestions list.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-group-and-user-picker
   */
  get groupAndUserPicker() {
    if (!this._groupAndUserPicker) {
      this._groupAndUserPicker = groupAndUserPickerService(this.config);
    }
    return this._groupAndUserPicker;
  }

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
  get groups() {
    if (!this._groups) {
      this._groups = groupsService(this.config);
    }
    return this._groups;
  }

  /**
   * This resource represents issue attachments and the attachment settings for
   * Jira. Use it to get the metadata for an attachment, delete an attachment, and
   * view the metadata for the contents of an attachment. Also, use it to get the
   * attachment settings for Jira.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-attachments
   */
  get issueAttachments() {
    if (!this._issueAttachments) {
      this._issueAttachments = issueAttachmentsService(this.config);
    }
    return this._issueAttachments;
  }

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
  get issueBulkOperations() {
    if (!this._issueBulkOperations) {
      this._issueBulkOperations = issueBulkOperationsService(this.config);
    }
    return this._issueBulkOperations;
  }

  /**
   * This resource represents [issue comment](#api-group-Issue-comments) properties,
   * which provides for storing custom data against an issue comment. Use is to get,
   * set, and delete issue comment properties as well as obtain the keys of all
   * properties on a comment. Comment properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comment-properties
   */
  get issueCommentProperties() {
    if (!this._issueCommentProperties) {
      this._issueCommentProperties = issueCommentPropertiesService(this.config);
    }
    return this._issueCommentProperties;
  }

  /**
   * This resource represents issue comments. Use it to:
   *
   *  *  get, create, update, and delete a comment from an issue.
   *  *  get all comments from issue.
   *  *  get a list of comments by comment ID.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comments
   */
  get issueComments() {
    if (!this._issueComments) {
      this._issueComments = issueCommentsService(this.config);
    }
    return this._issueComments;
  }

  /**
   * This resource represents the fields associated to project and issue type
   * contexts. Use it to:
   *
   *  *  assign custom field to projects and issue types.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-associations
   */
  get issueCustomFieldAssociations() {
    if (!this._issueCustomFieldAssociations) {
      this._issueCustomFieldAssociations = issueCustomFieldAssociationsService(this.config);
    }
    return this._issueCustomFieldAssociations;
  }

  /**
   * This resource represents configurations stored against a custom field context
   * by a [Forge app](https://developer.atlassian.com/platform/forge/).
   * Configurations are information used by the Forge app at runtime to determine
   * how to handle or process the data in a custom field in a given context. Use
   * this resource to set and read configurations.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-configuration-apps-
   */
  get issueCustomFieldConfigurationApps() {
    if (!this._issueCustomFieldConfigurationApps) {
      this._issueCustomFieldConfigurationApps = issueCustomFieldConfigurationAppsService(
        this.config
      );
    }
    return this._issueCustomFieldConfigurationApps;
  }

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
  get issueCustomFieldContexts() {
    if (!this._issueCustomFieldContexts) {
      this._issueCustomFieldContexts = issueCustomFieldContextsService(this.config);
    }
    return this._issueCustomFieldContexts;
  }

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
  get issueCustomFieldOptionsApps() {
    if (!this._issueCustomFieldOptionsApps) {
      this._issueCustomFieldOptionsApps = issueCustomFieldOptionsAppsService(this.config);
    }
    return this._issueCustomFieldOptionsApps;
  }

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
  get issueCustomFieldOptions() {
    if (!this._issueCustomFieldOptions) {
      this._issueCustomFieldOptions = issueCustomFieldOptionsService(this.config);
    }
    return this._issueCustomFieldOptions;
  }

  /**
   * This resource represents the values of custom fields added by [Forge
   * apps](https://developer.atlassian.com/platform/forge/). Use it to update the
   * value of a custom field on issues.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-values-apps-
   */
  get issueCustomFieldValuesApps() {
    if (!this._issueCustomFieldValuesApps) {
      this._issueCustomFieldValuesApps = issueCustomFieldValuesAppsService(this.config);
    }
    return this._issueCustomFieldValuesApps;
  }

  /**
   * This resource represents issue field configurations. Use it to get, set, and
   * delete field configurations and field configuration schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations
   */
  get issueFieldConfigurations() {
    if (!this._issueFieldConfigurations) {
      this._issueFieldConfigurations = issueFieldConfigurationsService(this.config);
    }
    return this._issueFieldConfigurations;
  }

  /**
   * This resource represents issue fields, both system and custom fields. Use it to
   * get fields, field configurations, and create custom fields.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields
   */
  get issueFields() {
    if (!this._issueFields) {
      this._issueFields = issueFieldsService(this.config);
    }
    return this._issueFields;
  }

  /**
   * This resource represents links between issues. Use it to get, create, and
   * delete links between issues.
   *
   * To use it, the site must have [issue
   * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-links
   */
  get issueLinks() {
    if (!this._issueLinks) {
      this._issueLinks = issueLinksService(this.config);
    }
    return this._issueLinks;
  }

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
  get issueLinkTypes() {
    if (!this._issueLinkTypes) {
      this._issueLinkTypes = issueLinkTypesService(this.config);
    }
    return this._issueLinkTypes;
  }

  /**
   * This resource represents issue navigator settings. Use it to get and set issue
   * navigator default columns.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-navigator-settings
   */
  get issueNavigatorSettings() {
    if (!this._issueNavigatorSettings) {
      this._issueNavigatorSettings = issueNavigatorSettingsService(this.config);
    }
    return this._issueNavigatorSettings;
  }

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
  get issueNotificationSchemes() {
    if (!this._issueNotificationSchemes) {
      this._issueNotificationSchemes = issueNotificationSchemesService(this.config);
    }
    return this._issueNotificationSchemes;
  }

  /**
   * This resource represents issue priorities. Use it to get, create and update
   * issue priorities and details for individual issue priorities.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-priorities
   */
  get issuePriorities() {
    if (!this._issuePriorities) {
      this._issuePriorities = issuePrioritiesService(this.config);
    }
    return this._issuePriorities;
  }

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
  get issueProperties() {
    if (!this._issueProperties) {
      this._issueProperties = issuePropertiesService(this.config);
    }
    return this._issueProperties;
  }

  /**
   * This resource represents Issue Redaction. Provides APIs to redact issue data.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-redaction
   */
  get issueRedaction() {
    if (!this._issueRedaction) {
      this._issueRedaction = issueRedactionService(this.config);
    }
    return this._issueRedaction;
  }

  /**
   * This resource represents remote issue links, a way of linking Jira to
   * information in other systems. Use it to get, create, update, and delete remote
   * issue links either by ID or global ID. The global ID provides a way of
   * accessing remote issue links using information about the item's remote system
   * host and remote system identifier.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-remote-links
   */
  get issueRemoteLinks() {
    if (!this._issueRemoteLinks) {
      this._issueRemoteLinks = issueRemoteLinksService(this.config);
    }
    return this._issueRemoteLinks;
  }

  /**
   * This resource represents issue resolution values. Use it to obtain a list of
   * all issue resolution values and the details of individual resolution values.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-resolutions
   */
  get issueResolutions() {
    if (!this._issueResolutions) {
      this._issueResolutions = issueResolutionsService(this.config);
    }
    return this._issueResolutions;
  }

  /**
   * This resource represents various ways to search for issues. Use it to search
   * for issues with a JQL query and find issues to populate an issue picker.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search
   */
  get issueSearch() {
    if (!this._issueSearch) {
      this._issueSearch = issueSearchService(this.config);
    }
    return this._issueSearch;
  }

  /**
   * This resource represents issue security levels. Use it to obtain the details of
   * any issue security level. For more information about issue security levels, see
   * [Configuring issue-level security](https://confluence.atlassian.com/x/J4lKLg).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-level
   */
  get issueSecurityLevel() {
    if (!this._issueSecurityLevel) {
      this._issueSecurityLevel = issueSecurityLevelService(this.config);
    }
    return this._issueSecurityLevel;
  }

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
  get issueSecuritySchemes() {
    if (!this._issueSecuritySchemes) {
      this._issueSecuritySchemes = issueSecuritySchemesService(this.config);
    }
    return this._issueSecuritySchemes;
  }

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
  get issues() {
    if (!this._issues) {
      this._issues = issuesService(this.config);
    }
    return this._issues;
  }

  /**
   * This resource represents [issue type](#api-group-Issue-types) properties, which
   * provides for storing custom data against an issue type. Use it to get, create,
   * and delete issue type properties as well as obtain the keys of all properties
   * on a issues type. Issue type properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-properties
   */
  get issueTypeProperties() {
    if (!this._issueTypeProperties) {
      this._issueTypeProperties = issueTypePropertiesService(this.config);
    }
    return this._issueTypeProperties;
  }

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
  get issueTypeSchemes() {
    if (!this._issueTypeSchemes) {
      this._issueTypeSchemes = issueTypeSchemesService(this.config);
    }
    return this._issueTypeSchemes;
  }

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
  get issueTypeScreenSchemes() {
    if (!this._issueTypeScreenSchemes) {
      this._issueTypeScreenSchemes = issueTypeScreenSchemesService(this.config);
    }
    return this._issueTypeScreenSchemes;
  }

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
  get issueTypes() {
    if (!this._issueTypes) {
      this._issueTypes = issueTypesService(this.config);
    }
    return this._issueTypes;
  }

  /**
   * This resource represents votes cast by users on an issue. Use it to get details
   * of votes on an issue as well as cast and withdrawal votes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-votes
   */
  get issueVotes() {
    if (!this._issueVotes) {
      this._issueVotes = issueVotesService(this.config);
    }
    return this._issueVotes;
  }

  /**
   * This resource represents users watching an issue. Use it to get details of
   * users watching an issue as well as start and stop a user watching an issue.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-watchers
   */
  get issueWatchers() {
    if (!this._issueWatchers) {
      this._issueWatchers = issueWatchersService(this.config);
    }
    return this._issueWatchers;
  }

  /**
   * This resource represents [issue worklog](#api-group-Issue-worklogs) properties,
   * which provides for storing custom data against an issue worklog. Use it to get,
   * create, and delete issue worklog properties as well as obtain the keys of all
   * properties on a issue worklog. Issue worklog properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklog-properties
   */
  get issueWorklogProperties() {
    if (!this._issueWorklogProperties) {
      this._issueWorklogProperties = issueWorklogPropertiesService(this.config);
    }
    return this._issueWorklogProperties;
  }

  /**
   * This resource represents issue worklogs. Use it to:
   *
   *  *  get, create, update, and delete worklogs.
   *  *  obtain lists of updated or deleted worklogs.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs
   */
  get issueWorklogs() {
    if (!this._issueWorklogs) {
      this._issueWorklogs = issueWorklogsService(this.config);
    }
    return this._issueWorklogs;
  }

  /**
   * This resource is a collection of operations for [Jira
   * expressions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-expressions
   */
  get jiraExpressions() {
    if (!this._jiraExpressions) {
      this._jiraExpressions = jiraExpressionsService(this.config);
    }
    return this._jiraExpressions;
  }

  /**
   * This resource represents various settings in Jira. Use it to get and update
   * Jira settings and properties.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-settings
   */
  get jiraSettings() {
    if (!this._jiraSettings) {
      this._jiraSettings = jiraSettingsService(this.config);
    }
    return this._jiraSettings;
  }

  /**
   * This resource represents JQL function's precomputations. Precomputation is a
   * mapping between custom function call and JQL fragment returned by this
   * function. Use it to get and update precomputations.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql-functions-apps-
   */
  get jqlFunctionsApps() {
    if (!this._jqlFunctionsApps) {
      this._jqlFunctionsApps = jqlFunctionsAppsService(this.config);
    }
    return this._jqlFunctionsApps;
  }

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
  get jql() {
    if (!this._jql) {
      this._jql = jqlService(this.config);
    }
    return this._jql;
  }

  /**
   * This resource represents available labels. Use it to get available labels for
   * the global label field.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-labels
   */
  get labels() {
    if (!this._labels) {
      this._labels = labelsService(this.config);
    }
    return this._labels;
  }

  /**
   * This resource represents license metrics. Use it to get available metrics for
   * Jira licences.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-license-metrics
   */
  get licenseMetrics() {
    if (!this._licenseMetrics) {
      this._licenseMetrics = licenseMetricsService(this.config);
    }
    return this._licenseMetrics;
  }

  /**
   * This resource represents information about the current user, such as basic
   * details, group membership, application roles, preferences, and locale. Use it
   * to get, create, update, and delete (restore default) values of the user's
   * preferences and locale.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-myself
   */
  get myself() {
    if (!this._myself) {
      this._myself = myselfService(this.config);
    }
    return this._myself;
  }

  /**
   * This resource represents permission schemes. Use it to get, create, update, and
   * delete permission schemes as well as get, create, update, and delete details of
   * the permissions granted in those schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes
   */
  get permissionSchemes() {
    if (!this._permissionSchemes) {
      this._permissionSchemes = permissionSchemesService(this.config);
    }
    return this._permissionSchemes;
  }

  /**
   * This resource represents permissions. Use it to obtain details of all
   * permissions and determine whether the user has certain permissions.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permissions
   */
  get permissions() {
    if (!this._permissions) {
      this._permissions = permissionsService(this.config);
    }
    return this._permissions;
  }

  /**
   * This resource represents plans. Use it to get, create, duplicate, update, trash
   * and archive plans.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-plans
   */
  get plans() {
    if (!this._plans) {
      this._plans = plansService(this.config);
    }
    return this._plans;
  }

  /**
   * This resource represents issue priority schemes. Use it to get priority schemes
   * and related information, and to create, update and delete priority schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-priority-schemes
   */
  get prioritySchemes() {
    if (!this._prioritySchemes) {
      this._prioritySchemes = prioritySchemesService(this.config);
    }
    return this._prioritySchemes;
  }

  /**
   * This resource represents avatars associated with a project. Use it to get,
   * load, set, and remove project avatars.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-avatars
   */
  get projectAvatars() {
    if (!this._projectAvatars) {
      this._projectAvatars = projectAvatarsService(this.config);
    }
    return this._projectAvatars;
  }

  /**
   * This resource represents project categories. Use it to create, update, and
   * delete project categories as well as obtain a list of all project categories
   * and details of individual categories. For more information on managing project
   * categories, see [Adding, assigning, and deleting project
   * categories](https://confluence.atlassian.com/x/-A5WMg).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-categories
   */
  get projectCategories() {
    if (!this._projectCategories) {
      this._projectCategories = projectCategoriesService(this.config);
    }
    return this._projectCategories;
  }

  /**
   * This resource represents classification levels used in a project. Use it to
   * view and manage classification levels in your projects.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-classification-levels
   */
  get projectClassificationLevels() {
    if (!this._projectClassificationLevels) {
      this._projectClassificationLevels = projectClassificationLevelsService(this.config);
    }
    return this._projectClassificationLevels;
  }

  /**
   * This resource represents project components. Use it to get, create, update, and
   * delete project components. Also get components for project and get a count of
   * issues by component.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-components
   */
  get projectComponents() {
    if (!this._projectComponents) {
      this._projectComponents = projectComponentsService(this.config);
    }
    return this._projectComponents;
  }

  /**
   * This resource represents the email address used to send a project's
   * notifications. Use it to get and set the [project's sender email
   * address](https://confluence.atlassian.com/x/dolKLg).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-email
   */
  get projectEmail() {
    if (!this._projectEmail) {
      this._projectEmail = projectEmailService(this.config);
    }
    return this._projectEmail;
  }

  /**
   * This resource represents project features. Use it to get the list of features
   * for a project and modify the state of a feature. The project feature endpoint
   * is available only for Jira Software, both for team- and company-managed
   * projects.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-features
   */
  get projectFeatures() {
    if (!this._projectFeatures) {
      this._projectFeatures = projectFeaturesService(this.config);
    }
    return this._projectFeatures;
  }

  /**
   * This resource provides validation for project keys and names.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-key-and-name-validation
   */
  get projectKeyAndNameValidation() {
    if (!this._projectKeyAndNameValidation) {
      this._projectKeyAndNameValidation = projectKeyAndNameValidationService(this.config);
    }
    return this._projectKeyAndNameValidation;
  }

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
  get projectPermissionSchemes() {
    if (!this._projectPermissionSchemes) {
      this._projectPermissionSchemes = projectPermissionSchemesService(this.config);
    }
    return this._projectPermissionSchemes;
  }

  /**
   * This resource represents [project](#api-group-Projects) properties, which
   * provides for storing custom data against a project. Use it to get, create, and
   * delete project properties as well as get a list of property keys for a project.
   * Project properties are a type of [entity
   * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-properties
   */
  get projectProperties() {
    if (!this._projectProperties) {
      this._projectProperties = projectPropertiesService(this.config);
    }
    return this._projectProperties;
  }

  /**
   * This resource represents the users assigned to [project
   * roles](#api-group-Issue-comments). Use it to get, add, and remove default users
   * from project roles. Also use it to add and remove users from a project role
   * associated with a project.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-role-actors
   */
  get projectRoleActors() {
    if (!this._projectRoleActors) {
      this._projectRoleActors = projectRoleActorsService(this.config);
    }
    return this._projectRoleActors;
  }

  /**
   * This resource represents the roles that users can play in projects. Use this
   * resource to get, create, update, and delete project roles.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-roles
   */
  get projectRoles() {
    if (!this._projectRoles) {
      this._projectRoles = projectRolesService(this.config);
    }
    return this._projectRoles;
  }

  /**
   * This resource represents projects. Use it to get, create, update, and delete
   * projects. Also get statuses available to a project, a project's notification
   * schemes, and update a project's type.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects
   */
  get projects() {
    if (!this._projects) {
      this._projects = projectsService(this.config);
    }
    return this._projects;
  }

  /**
   * This resource represents project templates. Use it to create a new project from
   * a custom template.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-templates
   */
  get projectTemplates() {
    if (!this._projectTemplates) {
      this._projectTemplates = projectTemplatesService(this.config);
    }
    return this._projectTemplates;
  }

  /**
   * This resource represents project types. Use it to obtain a list of all project
   * types, a list of project types accessible to the calling user, and details of a
   * project type.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-types
   */
  get projectTypes() {
    if (!this._projectTypes) {
      this._projectTypes = projectTypesService(this.config);
    }
    return this._projectTypes;
  }

  /**
   * This resource represents project versions. Use it to get, get lists of, create,
   * update, move, merge, and delete project versions. This resource also provides
   * counts of issues by version.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-versions
   */
  get projectVersions() {
    if (!this._projectVersions) {
      this._projectVersions = projectVersionsService(this.config);
    }
    return this._projectVersions;
  }

  /**
   * This resource represents screen schemes in classic projects. Use it to get,
   * create, update, and delete screen schemes.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes
   */
  get screenSchemes() {
    if (!this._screenSchemes) {
      this._screenSchemes = screenSchemesService(this.config);
    }
    return this._screenSchemes;
  }

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
  get screens() {
    if (!this._screens) {
      this._screens = screensService(this.config);
    }
    return this._screens;
  }

  /**
   * This resource represents the screen tab fields used to record issue details.
   * Use it to get, add, move, and remove fields from screen tabs.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields
   */
  get screenTabFields() {
    if (!this._screenTabFields) {
      this._screenTabFields = screenTabFieldsService(this.config);
    }
    return this._screenTabFields;
  }

  /**
   * This resource represents the screen tabs used to record issue details. Use it
   * to get, create, update, move, and delete screen tabs.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tabs
   */
  get screenTabs() {
    if (!this._screenTabs) {
      this._screenTabs = screenTabsService(this.config);
    }
    return this._screenTabs;
  }

  /**
   * This resource provides information about the Jira instance.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-server-info
   */
  get serverInfo() {
    if (!this._serverInfo) {
      this._serverInfo = serverInfoService(this.config);
    }
    return this._serverInfo;
  }

  /**
   * This resource represents a service registry. Use it to retrieve attributes
   * related to a [service
   * registry](https://support.atlassian.com/jira-service-management-cloud/docs/what-is-services/)
   * in JSM.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-service-registry
   */
  get serviceRegistry() {
    if (!this._serviceRegistry) {
      this._serviceRegistry = serviceRegistryService(this.config);
    }
    return this._serviceRegistry;
  }

  /**
   * This resource represents statuses. Use it to search, get, create, delete, and
   * change statuses.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status
   */
  get status() {
    if (!this._status) {
      this._status = statusService(this.config);
    }
    return this._status;
  }

  /**
   * This resource represents a [long-running asynchronous
   * tasks](#async-operations). Use it to obtain details about the progress of a
   * long-running task or cancel a long-running task.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks
   */
  get tasks() {
    if (!this._tasks) {
      this._tasks = tasksService(this.config);
    }
    return this._tasks;
  }

  /**
   * This resource represents planning settings for plan-only and Atlassian teams in
   * a plan. Use it to get, create, update and delete planning settings.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-teams-in-plan
   */
  get teamsInPlan() {
    if (!this._teamsInPlan) {
      this._teamsInPlan = teamsInPlanService(this.config);
    }
    return this._teamsInPlan;
  }

  /**
   * This resource represents time tracking and time tracking providers. Use it to
   * get and set the time tracking provider, get and set the time tracking options,
   * and disable time tracking.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-time-tracking
   */
  get timeTracking() {
    if (!this._timeTracking) {
      this._timeTracking = timeTrackingService(this.config);
    }
    return this._timeTracking;
  }

  /**
   * UI modifications is a feature available for **Forge apps only**. It enables
   * Forge apps to control how selected Jira fields behave on the following views:
   * global issue create, issue view, issue transition. For example: hide specific
   * fields, set them as required, etc.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-ui-modifications-apps-
   */
  get uiModificationsApps() {
    if (!this._uiModificationsApps) {
      this._uiModificationsApps = uiModificationsAppsService(this.config);
    }
    return this._uiModificationsApps;
  }

  /**
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-usernavproperties
   */
  get usernavproperties() {
    if (!this._usernavproperties) {
      this._usernavproperties = usernavpropertiesService(this.config);
    }
    return this._usernavproperties;
  }

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
  get userProperties() {
    if (!this._userProperties) {
      this._userProperties = userPropertiesService(this.config);
    }
    return this._userProperties;
  }

  /**
   * This resource represents various ways to search for and find users. Use it to
   * obtain list of users including users assignable to projects and issues, users
   * with permissions, user lists for pickup fields, and user lists generated using
   * structured queries. Note that the operations in this resource only return users
   * found within the first 1000 users.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-search
   */
  get userSearch() {
    if (!this._userSearch) {
      this._userSearch = userSearchService(this.config);
    }
    return this._userSearch;
  }

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
  get users() {
    if (!this._users) {
      this._users = usersService(this.config);
    }
    return this._users;
  }

  /**
   * This resource represents webhooks. Webhooks are calls sent to a URL when an
   * event occurs in Jira for issues specified by a JQL query. Only Connect and
   * OAuth 2.0 apps can register and manage webhooks. For more information, see
   * [Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/#registering-a-webhook-via-the-jira-rest-api-for-connect-apps).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks
   */
  get webhooks() {
    if (!this._webhooks) {
      this._webhooks = webhooksService(this.config);
    }
    return this._webhooks;
  }

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
  get workflowSchemeDrafts() {
    if (!this._workflowSchemeDrafts) {
      this._workflowSchemeDrafts = workflowSchemeDraftsService(this.config);
    }
    return this._workflowSchemeDrafts;
  }

  /**
   * This resource represents the associations between workflow schemes and projects.
   *
   * For more information, see [Managing your
   * workflows](https://confluence.atlassian.com/x/q4hKLg).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-scheme-project-associations
   */
  get workflowSchemeProjectAssociations() {
    if (!this._workflowSchemeProjectAssociations) {
      this._workflowSchemeProjectAssociations = workflowSchemeProjectAssociationsService(
        this.config
      );
    }
    return this._workflowSchemeProjectAssociations;
  }

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
  get workflowSchemes() {
    if (!this._workflowSchemes) {
      this._workflowSchemes = workflowSchemesService(this.config);
    }
    return this._workflowSchemes;
  }

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
  get workflows() {
    if (!this._workflows) {
      this._workflows = workflowsService(this.config);
    }
    return this._workflows;
  }

  /**
   * This resource represents status categories. Use it to obtain a list of all
   * status categories and the details of a category. Status categories provided a
   * mechanism for categorizing [statuses](#api-group-Workflow-statuses).
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-status-categories
   */
  get workflowStatusCategories() {
    if (!this._workflowStatusCategories) {
      this._workflowStatusCategories = workflowStatusCategoriesService(this.config);
    }
    return this._workflowStatusCategories;
  }

  /**
   * This resource represents issue workflow statuses. Use it to obtain a list of
   * all statuses associated with workflows and the details of a status.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-statuses
   */
  get workflowStatuses() {
    if (!this._workflowStatuses) {
      this._workflowStatuses = workflowStatusesService(this.config);
    }
    return this._workflowStatuses;
  }

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
  get workflowTransitionProperties() {
    if (!this._workflowTransitionProperties) {
      this._workflowTransitionProperties = workflowTransitionPropertiesService(this.config);
    }
    return this._workflowTransitionProperties;
  }

  /**
   * This resource represents workflow transition rules. Workflow transition rules
   * define a Connect or a Forge app routine, such as a [workflow post
   * functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
   * that is executed in association with the workflow. Use it to read and modify
   * configuration of workflow transition rules.
   *
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules
   */
  get workflowTransitionRules() {
    if (!this._workflowTransitionRules) {
      this._workflowTransitionRules = workflowTransitionRulesService(this.config);
    }
    return this._workflowTransitionRules;
  }

  get servicedesk() {
    if (!this._servicedesk) {
      this._servicedesk = servicedeskService(this.config);
    }
    return this._servicedesk;
  }

  get request() {
    if (!this._request) {
      this._request = requestService(this.config);
    }
    return this._request;
  }

  get customer() {
    if (!this._customer) {
      this._customer = customerService(this.config);
    }
    return this._customer;
  }

  get assets() {
    if (!this._assets) {
      this._assets = assetsService(this.config);
    }
    return this._assets;
  }

  get info() {
    if (!this._info) {
      this._info = infoService(this.config);
    }
    return this._info;
  }

  get knowledgebase() {
    if (!this._knowledgebase) {
      this._knowledgebase = knowledgebaseService(this.config);
    }
    return this._knowledgebase;
  }

  get organization() {
    if (!this._organization) {
      this._organization = organizationService(this.config);
    }
    return this._organization;
  }

  get requestType() {
    if (!this._requestType) {
      this._requestType = requestTypeService(this.config);
    }
    return this._requestType;
  }
}
