import type {
  NotificationScheme,
  PageBeanNotificationScheme,
  CreateNotificationSchemeDetails,
  NotificationSchemeId,
  UpdateNotificationSchemeDetails,
  AddNotificationsDetails,
  PageBeanNotificationSchemeAndProjectMappingJsonBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

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
 */
export default function issueNotificationSchemes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds notifications to a notification scheme. You can add up to 1000
     * notifications per request.
     *
     * *Deprecated: The notification type `EmailAddress` is no longer supported in
     * Cloud. Refer to the
     * [changelog](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1031)
     * for more details.*
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    addNotifications: async ({
      id,
      addNotificationsDetails,
      opts
    }: {
      /** The ID of the notification scheme. */
      id: string;
      /**
       * @example
       * {
       *   "notificationSchemeEvents": [
       *     {
       *       "event": {
       *         "id": "1"
       *       },
       *       "notifications": [
       *         {
       *           "notificationType": "Group",
       *           "parameter": "jira-administrators"
       *         }
       *       ]
       *     }
       *   ]
       * }
       */
      addNotificationsDetails: AddNotificationsDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/notificationscheme/{id}/notification",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(addNotificationsDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates a notification scheme with notifications. You can create up to 1000
     * notifications per request.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "10001"
     * }
     * ```
     */
    createNotificationScheme: async ({
      createNotificationSchemeDetails,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "My new scheme description",
       *   "name": "My new notification scheme",
       *   "notificationSchemeEvents": [
       *     {
       *       "event": {
       *         "id": "1"
       *       },
       *       "notifications": [
       *         {
       *           "notificationType": "Group",
       *           "parameter": "jira-administrators"
       *         }
       *       ]
       *     }
       *   ]
       * }
       */
      createNotificationSchemeDetails: CreateNotificationSchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<NotificationSchemeId>> => {
      return jiraRequest<NotificationSchemeId>({
        path: "/rest/api/3/notificationscheme",
        method: "POST",
        body: JSON.stringify(createNotificationSchemeDetails),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a notification scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deleteNotificationScheme: async ({
      notificationSchemeId,
      opts
    }: {
      /** The ID of the notification scheme. */
      notificationSchemeId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/notificationscheme/{notificationSchemeId}",
        method: "DELETE",
        pathParams: {
          notificationSchemeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [notification scheme](https://confluence.atlassian.com/x/8YdKLg),
     * including the list of events and the recipients who will receive notifications
     * for those events.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however,
     * the user must have permission to administer at least one project associated
     * with the notification scheme.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "description",
     *   "expand": "notificationSchemeEvents,user,group,projectRole,field,all",
     *   "id": 10100,
     *   "name": "notification scheme name",
     *   "notificationSchemeEvents": [
     *     {
     *       "event": {
     *         "description": "Event published when an issue is created",
     *         "id": 1,
     *         "name": "Issue created"
     *       },
     *       "notifications": [
     *         {
     *           "expand": "group",
     *           "group": {
     *             "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
     *             "name": "jira-administrators",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/group?groupId=276f955c-63d7-42c8-9520-92d01dca0625"
     *           },
     *           "id": 1,
     *           "notificationType": "Group",
     *           "parameter": "jira-administrators",
     *           "recipient": "276f955c-63d7-42c8-9520-92d01dca0625"
     *         },
     *         {
     *           "id": 2,
     *           "notificationType": "CurrentAssignee"
     *         },
     *         {
     *           "expand": "projectRole",
     *           "id": 3,
     *           "notificationType": "ProjectRole",
     *           "parameter": "10360",
     *           "projectRole": {
     *             "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360",
     *             "name": "Developers",
     *             "id": 10360,
     *             "description": "A project role that represents developers in a project",
     *             "actors": [
     *               {
     *                 "actorGroup": {
     *                   "name": "jira-developers",
     *                   "displayName": "jira-developers",
     *                   "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
     *                 },
     *                 "displayName": "jira-developers",
     *                 "id": 10240,
     *                 "name": "jira-developers",
     *                 "type": "atlassian-group-role-actor"
     *               },
     *               {
     *                 "actorUser": {
     *                   "accountId": "5b10a2844c20165700ede21g"
     *                 },
     *                 "displayName": "Mia Krystof",
     *                 "id": 10241,
     *                 "type": "atlassian-user-role-actor"
     *               }
     *             ],
     *             "scope": {
     *               "project": {
     *                 "id": "10000",
     *                 "key": "KEY",
     *                 "name": "Next Gen Project"
     *               },
     *               "type": "PROJECT"
     *             }
     *           },
     *           "recipient": "10360"
     *         },
     *         {
     *           "emailAddress": "rest-developer@atlassian.com",
     *           "id": 4,
     *           "notificationType": "EmailAddress",
     *           "parameter": "rest-developer@atlassian.com",
     *           "recipient": "rest-developer@atlassian.com"
     *         },
     *         {
     *           "expand": "user",
     *           "id": 5,
     *           "notificationType": "User",
     *           "parameter": "5b10a2844c20165700ede21g",
     *           "recipient": "5b10a2844c20165700ede21g",
     *           "user": {
     *             "accountId": "5b10a2844c20165700ede21g",
     *             "active": false,
     *             "displayName": "Mia Krystof",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *           }
     *         },
     *         {
     *           "expand": "field",
     *           "field": {
     *             "clauseNames": [
     *               "cf[10101]",
     *               "New custom field"
     *             ],
     *             "custom": true,
     *             "id": "customfield_10101",
     *             "key": "customfield_10101",
     *             "name": "New custom field",
     *             "navigable": true,
     *             "orderable": true,
     *             "schema": {
     *               "custom": "com.atlassian.jira.plugin.system.customfieldtypes:project",
     *               "customId": 10101,
     *               "type": "project"
     *             },
     *             "searchable": true,
     *             "untranslatedName": "New custom field"
     *           },
     *           "id": 6,
     *           "notificationType": "GroupCustomField",
     *           "parameter": "customfield_10101",
     *           "recipient": "customfield_10101"
     *         }
     *       ]
     *     },
     *     {
     *       "event": {
     *         "description": "Custom event that is published together with an issue created event",
     *         "id": 20,
     *         "name": "Custom event",
     *         "templateEvent": {
     *           "description": "Event published when an issue is created",
     *           "id": 1,
     *           "name": "Issue created"
     *         }
     *       },
     *       "notifications": [
     *         {
     *           "expand": "group",
     *           "group": {
     *             "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
     *             "name": "jira-administrators",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/group?groupId=276f955c-63d7-42c8-9520-92d01dca0625"
     *           },
     *           "id": 1,
     *           "notificationType": "Group",
     *           "parameter": "jira-administrators",
     *           "recipient": "276f955c-63d7-42c8-9520-92d01dca0625"
     *         },
     *         {
     *           "id": 2,
     *           "notificationType": "CurrentAssignee"
     *         },
     *         {
     *           "expand": "projectRole",
     *           "id": 3,
     *           "notificationType": "ProjectRole",
     *           "parameter": "10360",
     *           "projectRole": {
     *             "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360",
     *             "name": "Developers",
     *             "id": 10360,
     *             "description": "A project role that represents developers in a project",
     *             "actors": [
     *               {
     *                 "actorGroup": {
     *                   "name": "jira-developers",
     *                   "displayName": "jira-developers",
     *                   "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
     *                 },
     *                 "displayName": "jira-developers",
     *                 "id": 10240,
     *                 "name": "jira-developers",
     *                 "type": "atlassian-group-role-actor"
     *               },
     *               {
     *                 "actorUser": {
     *                   "accountId": "5b10a2844c20165700ede21g"
     *                 },
     *                 "displayName": "Mia Krystof",
     *                 "id": 10241,
     *                 "type": "atlassian-user-role-actor"
     *               }
     *             ],
     *             "scope": {
     *               "project": {
     *                 "id": "10000",
     *                 "key": "KEY",
     *                 "name": "Next Gen Project"
     *               },
     *               "type": "PROJECT"
     *             }
     *           },
     *           "recipient": "10360"
     *         },
     *         {
     *           "emailAddress": "rest-developer@atlassian.com",
     *           "id": 4,
     *           "notificationType": "EmailAddress",
     *           "parameter": "rest-developer@atlassian.com",
     *           "recipient": "rest-developer@atlassian.com"
     *         },
     *         {
     *           "expand": "user",
     *           "id": 5,
     *           "notificationType": "User",
     *           "parameter": "5b10a2844c20165700ede21g",
     *           "recipient": "5b10a2844c20165700ede21g",
     *           "user": {
     *             "accountId": "5b10a2844c20165700ede21g",
     *             "active": false,
     *             "displayName": "Mia Krystof",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *           }
     *         },
     *         {
     *           "expand": "field",
     *           "field": {
     *             "clauseNames": [
     *               "cf[10101]",
     *               "New custom field"
     *             ],
     *             "custom": true,
     *             "id": "customfield_10101",
     *             "key": "customfield_10101",
     *             "name": "New custom field",
     *             "navigable": true,
     *             "orderable": true,
     *             "schema": {
     *               "custom": "com.atlassian.jira.plugin.system.customfieldtypes:project",
     *               "customId": 10101,
     *               "type": "project"
     *             },
     *             "searchable": true,
     *             "untranslatedName": "New custom field"
     *           },
     *           "id": 6,
     *           "notificationType": "GroupCustomField",
     *           "parameter": "customfield_10101",
     *           "recipient": "customfield_10101"
     *         }
     *       ]
     *     }
     *   ],
     *   "projects": [
     *     10001,
     *     10002
     *   ],
     *   "self": "https://your-domain.atlassian.net/rest/api/3/notificationscheme"
     * }
     * ```
     */
    getNotificationScheme: async ({
      id,
      expand,
      opts
    }: {
      /**
       * The ID of the notification scheme. Use [Get notification schemes
       * paginated](#api-rest-api-3-notificationscheme-get) to get a list of
       * notification scheme IDs.
       */
      id: number;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `all` Returns all expandable information
       *  *  `field` Returns information about any custom fields assigned to receive an
       * event
       *  *  `group` Returns information about any groups assigned to receive an event
       *  *  `notificationSchemeEvents` Returns a list of event associations. This list
       * is returned for all expandable information
       *  *  `projectRole` Returns information about any project roles assigned to
       * receive an event
       *  *  `user` Returns information about any users assigned to receive an event
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<NotificationScheme>> => {
      return jiraRequest<NotificationScheme>({
        path: "/rest/api/3/notificationscheme/{id}",
        method: "GET",
        pathParams: {
          id
        },
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of [notification
     * schemes](https://confluence.atlassian.com/x/8YdKLg) ordered by the display name.
     *
     * *Note that you should allow for events without recipients to appear in
     * responses.*
     *
     * **[Permissions](#permissions) required:** Permission to access Jira, however,
     * the user must have permission to administer at least one project associated
     * with a notification scheme for it to be returned.
     *
     * @returns Returned if the request is successful. Only returns notification schemes that the user has permission to access. An empty list is returned if the user lacks permission to access all notification schemes.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 6,
     *   "startAt": 1,
     *   "total": 5,
     *   "values": [
     *     {
     *       "description": "description",
     *       "expand": "notificationSchemeEvents,user,group,projectRole,field,all",
     *       "id": 10100,
     *       "name": "notification scheme name",
     *       "notificationSchemeEvents": [
     *         {
     *           "event": {
     *             "description": "Event published when an issue is created",
     *             "id": 1,
     *             "name": "Issue created"
     *           },
     *           "notifications": [
     *             {
     *               "expand": "group",
     *               "group": {
     *                 "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
     *                 "name": "jira-administrators",
     *                 "self": "https://your-domain.atlassian.net/rest/api/3/group?groupId=276f955c-63d7-42c8-9520-92d01dca0625"
     *               },
     *               "id": 1,
     *               "notificationType": "Group",
     *               "parameter": "jira-administrators",
     *               "recipient": "276f955c-63d7-42c8-9520-92d01dca0625"
     *             },
     *             {
     *               "id": 2,
     *               "notificationType": "CurrentAssignee"
     *             },
     *             {
     *               "expand": "projectRole",
     *               "id": 3,
     *               "notificationType": "ProjectRole",
     *               "parameter": "10360",
     *               "projectRole": {
     *                 "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360",
     *                 "name": "Developers",
     *                 "id": 10360,
     *                 "description": "A project role that represents developers in a project",
     *                 "actors": [
     *                   {
     *                     "actorGroup": {
     *                       "name": "jira-developers",
     *                       "displayName": "jira-developers",
     *                       "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
     *                     },
     *                     "displayName": "jira-developers",
     *                     "id": 10240,
     *                     "name": "jira-developers",
     *                     "type": "atlassian-group-role-actor"
     *                   },
     *                   {
     *                     "actorUser": {
     *                       "accountId": "5b10a2844c20165700ede21g"
     *                     },
     *                     "displayName": "Mia Krystof",
     *                     "id": 10241,
     *                     "type": "atlassian-user-role-actor"
     *                   }
     *                 ],
     *                 "scope": {
     *                   "project": {
     *                     "id": "10000",
     *                     "key": "KEY",
     *                     "name": "Next Gen Project"
     *                   },
     *                   "type": "PROJECT"
     *                 }
     *               },
     *               "recipient": "10360"
     *             },
     *             {
     *               "emailAddress": "rest-developer@atlassian.com",
     *               "id": 4,
     *               "notificationType": "EmailAddress",
     *               "parameter": "rest-developer@atlassian.com",
     *               "recipient": "rest-developer@atlassian.com"
     *             },
     *             {
     *               "expand": "user",
     *               "id": 5,
     *               "notificationType": "User",
     *               "parameter": "5b10a2844c20165700ede21g",
     *               "recipient": "5b10a2844c20165700ede21g",
     *               "user": {
     *                 "accountId": "5b10a2844c20165700ede21g",
     *                 "active": false,
     *                 "displayName": "Mia Krystof",
     *                 "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *               }
     *             },
     *             {
     *               "expand": "field",
     *               "field": {
     *                 "clauseNames": [
     *                   "cf[10101]",
     *                   "New custom field"
     *                 ],
     *                 "custom": true,
     *                 "id": "customfield_10101",
     *                 "key": "customfield_10101",
     *                 "name": "New custom field",
     *                 "navigable": true,
     *                 "orderable": true,
     *                 "schema": {
     *                   "custom": "com.atlassian.jira.plugin.system.customfieldtypes:project",
     *                   "customId": 10101,
     *                   "type": "project"
     *                 },
     *                 "searchable": true,
     *                 "untranslatedName": "New custom field"
     *               },
     *               "id": 6,
     *               "notificationType": "GroupCustomField",
     *               "parameter": "customfield_10101",
     *               "recipient": "customfield_10101"
     *             }
     *           ]
     *         },
     *         {
     *           "event": {
     *             "description": "Custom event that is published together with an issue created event",
     *             "id": 20,
     *             "name": "Custom event",
     *             "templateEvent": {
     *               "description": "Event published when an issue is created",
     *               "id": 1,
     *               "name": "Issue created"
     *             }
     *           },
     *           "notifications": [
     *             {
     *               "expand": "group",
     *               "group": {
     *                 "groupId": "276f955c-63d7-42c8-9520-92d01dca0625",
     *                 "name": "jira-administrators",
     *                 "self": "https://your-domain.atlassian.net/rest/api/3/group?groupId=276f955c-63d7-42c8-9520-92d01dca0625"
     *               },
     *               "id": 1,
     *               "notificationType": "Group",
     *               "parameter": "jira-administrators",
     *               "recipient": "276f955c-63d7-42c8-9520-92d01dca0625"
     *             },
     *             {
     *               "id": 2,
     *               "notificationType": "CurrentAssignee"
     *             },
     *             {
     *               "expand": "projectRole",
     *               "id": 3,
     *               "notificationType": "ProjectRole",
     *               "parameter": "10360",
     *               "projectRole": {
     *                 "self": "https://your-domain.atlassian.net/rest/api/3/project/MKY/role/10360",
     *                 "name": "Developers",
     *                 "id": 10360,
     *                 "description": "A project role that represents developers in a project",
     *                 "actors": [
     *                   {
     *                     "actorGroup": {
     *                       "name": "jira-developers",
     *                       "displayName": "jira-developers",
     *                       "groupId": "952d12c3-5b5b-4d04-bb32-44d383afc4b2"
     *                     },
     *                     "displayName": "jira-developers",
     *                     "id": 10240,
     *                     "name": "jira-developers",
     *                     "type": "atlassian-group-role-actor"
     *                   },
     *                   {
     *                     "actorUser": {
     *                       "accountId": "5b10a2844c20165700ede21g"
     *                     },
     *                     "displayName": "Mia Krystof",
     *                     "id": 10241,
     *                     "type": "atlassian-user-role-actor"
     *                   }
     *                 ],
     *                 "scope": {
     *                   "project": {
     *                     "id": "10000",
     *                     "key": "KEY",
     *                     "name": "Next Gen Project"
     *                   },
     *                   "type": "PROJECT"
     *                 }
     *               },
     *               "recipient": "10360"
     *             },
     *             {
     *               "emailAddress": "rest-developer@atlassian.com",
     *               "id": 4,
     *               "notificationType": "EmailAddress",
     *               "parameter": "rest-developer@atlassian.com",
     *               "recipient": "rest-developer@atlassian.com"
     *             },
     *             {
     *               "expand": "user",
     *               "id": 5,
     *               "notificationType": "User",
     *               "parameter": "5b10a2844c20165700ede21g",
     *               "recipient": "5b10a2844c20165700ede21g",
     *               "user": {
     *                 "accountId": "5b10a2844c20165700ede21g",
     *                 "active": false,
     *                 "displayName": "Mia Krystof",
     *                 "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *               }
     *             },
     *             {
     *               "expand": "field",
     *               "field": {
     *                 "clauseNames": [
     *                   "cf[10101]",
     *                   "New custom field"
     *                 ],
     *                 "custom": true,
     *                 "id": "customfield_10101",
     *                 "key": "customfield_10101",
     *                 "name": "New custom field",
     *                 "navigable": true,
     *                 "orderable": true,
     *                 "schema": {
     *                   "custom": "com.atlassian.jira.plugin.system.customfieldtypes:project",
     *                   "customId": 10101,
     *                   "type": "project"
     *                 },
     *                 "searchable": true,
     *                 "untranslatedName": "New custom field"
     *               },
     *               "id": 6,
     *               "notificationType": "GroupCustomField",
     *               "parameter": "customfield_10101",
     *               "recipient": "customfield_10101"
     *             }
     *           ]
     *         }
     *       ],
     *       "projects": [
     *         10001,
     *         10002
     *       ],
     *       "self": "https://your-domain.atlassian.net/rest/api/3/notificationscheme"
     *     }
     *   ]
     * }
     * ```
     */
    getNotificationSchemes: async ({
      startAt,
      maxResults,
      id,
      projectId,
      onlyDefault,
      expand,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /** The list of notification schemes IDs to be filtered by */
      id?: string[];
      /** The list of projects IDs to be filtered by */
      projectId?: string[];
      /**
       * When set to true, returns only the default notification scheme. If you provide
       * project IDs not associated with the default, returns an empty page. The default
       * value is false.
       */
      onlyDefault?: boolean;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `all` Returns all expandable information
       *  *  `field` Returns information about any custom fields assigned to receive an
       * event
       *  *  `group` Returns information about any groups assigned to receive an event
       *  *  `notificationSchemeEvents` Returns a list of event associations. This list
       * is returned for all expandable information
       *  *  `projectRole` Returns information about any project roles assigned to
       * receive an event
       *  *  `user` Returns information about any users assigned to receive an event
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanNotificationScheme>> => {
      return jiraRequest<PageBeanNotificationScheme>({
        path: "/rest/api/3/notificationscheme",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          id,
          projectId,
          onlyDefault,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) mapping of project that have notification
     * scheme assigned. You can provide either one or multiple notification scheme IDs
     * or project IDs to filter by. If you don't provide any, this will return a list
     * of all mappings. Note that only company-managed (classic) projects are
     * supported. This is because team-managed projects don't have a concept of a
     * default notification scheme. The mappings are ordered by projectId.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 4,
     *   "values": [
     *     {
     *       "notificationSchemeId": "10001",
     *       "projectId": "100001"
     *     }
     *   ]
     * }
     * ```
     */
    getNotificationSchemeToProjectMappings: async ({
      startAt,
      maxResults,
      notificationSchemeId,
      projectId,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: string;
      /** The maximum number of items to return per page. */
      maxResults?: string;
      /** The list of notifications scheme IDs to be filtered out */
      notificationSchemeId?: string[];
      /** The list of project IDs to be filtered out */
      projectId?: string[];
    } & WithRequestOpts<TClient> = {}): Promise<
      JiraResult<PageBeanNotificationSchemeAndProjectMappingJsonBean>
    > => {
      return jiraRequest<PageBeanNotificationSchemeAndProjectMappingJsonBean>({
        path: "/rest/api/3/notificationscheme/project",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          notificationSchemeId,
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Removes a notification from a notification scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    removeNotificationFromNotificationScheme: async ({
      notificationSchemeId,
      notificationId,
      opts
    }: {
      /** The ID of the notification scheme. */
      notificationSchemeId: string;
      /** The ID of the notification. */
      notificationId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/notificationscheme/{notificationSchemeId}/notification/{notificationId}",
        method: "DELETE",
        pathParams: {
          notificationSchemeId,
          notificationId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates a notification scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateNotificationScheme: async ({
      id,
      updateNotificationSchemeDetails,
      opts
    }: {
      /** The ID of the notification scheme. */
      id: string;
      /**
       * @example
       * {
       *   "description": "My updated notification scheme description",
       *   "name": "My updated notification scheme"
       * }
       */
      updateNotificationSchemeDetails: UpdateNotificationSchemeDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/notificationscheme/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(updateNotificationSchemeDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
