import type {
  PageBeanIssueFieldOption,
  IssueFieldOptionCreateBean,
  IssueFieldOption,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

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
 */
export default function issueCustomFieldOptionsApps<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates an option for a select list issue field.
     *
     * Note that this operation **only works for issue field select list options added
     * by Connect apps**, it cannot be used with issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource.
     *
     * Each field can have a maximum of 10000 options, and each option can have a
     * maximum of 10000 scopes.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are
     * not required for the app providing the field.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": 1,
     *   "value": "Team 1",
     *   "properties": {
     *     "leader": {
     *       "name": "Leader Name",
     *       "email": "lname@example.com"
     *     },
     *     "members": 42,
     *     "description": "The team's description",
     *     "founded": "2016-06-06"
     *   },
     *   "config": {
     *     "scope": {
     *       "projects": [],
     *       "projects2": [
     *         {
     *           "id": 1001,
     *           "attributes": [
     *             "notSelectable"
     *           ]
     *         },
     *         {
     *           "id": 1002,
     *           "attributes": [
     *             "notSelectable"
     *           ]
     *         }
     *       ],
     *       "global": {}
     *     },
     *     "attributes": []
     *   }
     * }
     * ```
     */
    createIssueFieldOption: async ({
      fieldKey,
      issueFieldOptionCreateBean,
      opts
    }: {
      /**
       * The field key is specified in the following format:
       * **$(app-key)\_\_$(field-key)**. For example,
       * *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do
       * one of the following:
       *
       *  *  open the app's plugin descriptor, then **app-key** is the key at the top
       * and **field-key** is the key in the `jiraIssueFields` module. **app-key** can
       * also be found in the app listing in the Atlassian Universal Plugin Manager.
       *  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the
       * value is returned in `key`. For example, `"key":
       * "teams-add-on__team-issue-field"`
       */
      fieldKey: string;
      /**
       * @example
       * {
       *   "config": {
       *     "attributes": [],
       *     "scope": {
       *       "global": {},
       *       "projects": [],
       *       "projects2": [
       *         {
       *           "attributes": [
       *             "notSelectable"
       *           ],
       *           "id": 1001
       *         },
       *         {
       *           "attributes": [
       *             "notSelectable"
       *           ],
       *           "id": 1002
       *         }
       *       ]
       *     }
       *   },
       *   "properties": {
       *     "description": "The team's description",
       *     "founded": "2016-06-06",
       *     "leader": {
       *       "email": "lname@example.com",
       *       "name": "Leader Name"
       *     },
       *     "members": 42
       *   },
       *   "value": "Team 1"
       * }
       */
      issueFieldOptionCreateBean: IssueFieldOptionCreateBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueFieldOption>> => {
      return jiraRequest<IssueFieldOption>({
        path: "/rest/api/3/field/{fieldKey}/option",
        method: "POST",
        pathParams: {
          fieldKey
        },
        body: JSON.stringify(issueFieldOptionCreateBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an option from a select list issue field.
     *
     * Note that this operation **only works for issue field select list options added
     * by Connect apps**, it cannot be used with issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are
     * not required for the app providing the field.
     *
     * @returns Returned if the field option is deleted.
     */
    deleteIssueFieldOption: async ({
      fieldKey,
      optionId,
      opts
    }: {
      /**
       * The field key is specified in the following format:
       * **$(app-key)\_\_$(field-key)**. For example,
       * *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do
       * one of the following:
       *
       *  *  open the app's plugin descriptor, then **app-key** is the key at the top
       * and **field-key** is the key in the `jiraIssueFields` module. **app-key** can
       * also be found in the app listing in the Atlassian Universal Plugin Manager.
       *  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the
       * value is returned in `key`. For example, `"key":
       * "teams-add-on__team-issue-field"`
       */
      fieldKey: string;
      /** The ID of the option to be deleted. */
      optionId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldKey}/option/{optionId}",
        method: "DELETE",
        pathParams: {
          fieldKey,
          optionId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a [paginated](#pagination) list of all the options of a select list
     * issue field. A select list issue field is a type of [issue
     * field](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field/)
     * that enables a user to select a value from a list of options.
     *
     * Note that this operation **only works for issue field select list options added
     * by Connect apps**, it cannot be used with issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are
     * not required for the app providing the field.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 1,
     *   "nextPage": "https://your-domain.atlassian.net/rest/api/3/field/fieldKey/option?startAt=1&maxResults=1",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/field/fieldKey/option?startAt=0&maxResults=1",
     *   "startAt": 0,
     *   "total": 10,
     *   "values": [
     *     {
     *       "id": 1,
     *       "value": "Team 1",
     *       "properties": {
     *         "leader": {
     *           "name": "Leader Name",
     *           "email": "lname@example.com"
     *         },
     *         "members": 42,
     *         "description": "The team's description",
     *         "founded": "2016-06-06"
     *       },
     *       "config": {
     *         "scope": {
     *           "projects": [],
     *           "projects2": [
     *             {
     *               "id": 1001,
     *               "attributes": [
     *                 "notSelectable"
     *               ]
     *             },
     *             {
     *               "id": 1002,
     *               "attributes": [
     *                 "notSelectable"
     *               ]
     *             }
     *           ],
     *           "global": {}
     *         },
     *         "attributes": []
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getAllIssueFieldOptions: async ({
      fieldKey,
      startAt,
      maxResults,
      opts
    }: {
      /**
       * The field key is specified in the following format:
       * **$(app-key)\_\_$(field-key)**. For example,
       * *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do
       * one of the following:
       *
       *  *  open the app's plugin descriptor, then **app-key** is the key at the top
       * and **field-key** is the key in the `jiraIssueFields` module. **app-key** can
       * also be found in the app listing in the Atlassian Universal Plugin Manager.
       *  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the
       * value is returned in `key`. For example, `"key":
       * "teams-add-on__team-issue-field"`
       */
      fieldKey: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanIssueFieldOption>> => {
      return jiraRequest<PageBeanIssueFieldOption>({
        path: "/rest/api/3/field/{fieldKey}/option",
        method: "GET",
        pathParams: {
          fieldKey
        },
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns an option from a select list issue field.
     *
     * Note that this operation **only works for issue field select list options added
     * by Connect apps**, it cannot be used with issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are
     * not required for the app providing the field.
     *
     * @returns Returned if the requested option is returned.
     *
     * example:
     * ```
     * {
     *   "id": 1,
     *   "value": "Team 1",
     *   "properties": {
     *     "leader": {
     *       "name": "Leader Name",
     *       "email": "lname@example.com"
     *     },
     *     "members": 42,
     *     "description": "The team's description",
     *     "founded": "2016-06-06"
     *   },
     *   "config": {
     *     "scope": {
     *       "projects": [],
     *       "projects2": [
     *         {
     *           "id": 1001,
     *           "attributes": [
     *             "notSelectable"
     *           ]
     *         },
     *         {
     *           "id": 1002,
     *           "attributes": [
     *             "notSelectable"
     *           ]
     *         }
     *       ],
     *       "global": {}
     *     },
     *     "attributes": []
     *   }
     * }
     * ```
     */
    getIssueFieldOption: async ({
      fieldKey,
      optionId,
      opts
    }: {
      /**
       * The field key is specified in the following format:
       * **$(app-key)\_\_$(field-key)**. For example,
       * *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do
       * one of the following:
       *
       *  *  open the app's plugin descriptor, then **app-key** is the key at the top
       * and **field-key** is the key in the `jiraIssueFields` module. **app-key** can
       * also be found in the app listing in the Atlassian Universal Plugin Manager.
       *  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the
       * value is returned in `key`. For example, `"key":
       * "teams-add-on__team-issue-field"`
       */
      fieldKey: string;
      /** The ID of the option to be returned. */
      optionId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueFieldOption>> => {
      return jiraRequest<IssueFieldOption>({
        path: "/rest/api/3/field/{fieldKey}/option/{optionId}",
        method: "GET",
        pathParams: {
          fieldKey,
          optionId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of options for a select list issue
     * field that can be viewed and selected by the user.
     *
     * Note that this operation **only works for issue field select list options added
     * by Connect apps**, it cannot be used with issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 1,
     *   "nextPage": "https://your-domain.atlassian.net/rest/api/3/field/fieldKey/option/suggestions?startAt=1&maxResults=1",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/field/fieldKey/option/suggestions?startAt=0&maxResults=1",
     *   "startAt": 0,
     *   "total": 10,
     *   "values": [
     *     {
     *       "id": 1,
     *       "value": "Team 1",
     *       "properties": {
     *         "leader": {
     *           "name": "Leader Name",
     *           "email": "lname@example.com"
     *         },
     *         "members": 42,
     *         "description": "The team's description",
     *         "founded": "2016-06-06"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getSelectableIssueFieldOptions: async ({
      fieldKey,
      startAt,
      maxResults,
      projectId,
      opts
    }: {
      /**
       * The field key is specified in the following format:
       * **$(app-key)\_\_$(field-key)**. For example,
       * *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do
       * one of the following:
       *
       *  *  open the app's plugin descriptor, then **app-key** is the key at the top
       * and **field-key** is the key in the `jiraIssueFields` module. **app-key** can
       * also be found in the app listing in the Atlassian Universal Plugin Manager.
       *  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the
       * value is returned in `key`. For example, `"key":
       * "teams-add-on__team-issue-field"`
       */
      fieldKey: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /** Filters the results to options that are only available in the specified project. */
      projectId?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanIssueFieldOption>> => {
      return jiraRequest<PageBeanIssueFieldOption>({
        path: "/rest/api/3/field/{fieldKey}/option/suggestions/edit",
        method: "GET",
        pathParams: {
          fieldKey
        },
        queryParams: {
          startAt,
          maxResults,
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of options for a select list issue
     * field that can be viewed by the user.
     *
     * Note that this operation **only works for issue field select list options added
     * by Connect apps**, it cannot be used with issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 1,
     *   "nextPage": "https://your-domain.atlassian.net/rest/api/3/field/fieldKey/option/suggestions?startAt=1&maxResults=1",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/field/fieldKey/option/suggestions?startAt=0&maxResults=1",
     *   "startAt": 0,
     *   "total": 10,
     *   "values": [
     *     {
     *       "id": 1,
     *       "value": "Team 1",
     *       "properties": {
     *         "leader": {
     *           "name": "Leader Name",
     *           "email": "lname@example.com"
     *         },
     *         "members": 42,
     *         "description": "The team's description",
     *         "founded": "2016-06-06"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getVisibleIssueFieldOptions: async ({
      fieldKey,
      startAt,
      maxResults,
      projectId,
      opts
    }: {
      /**
       * The field key is specified in the following format:
       * **$(app-key)\_\_$(field-key)**. For example,
       * *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do
       * one of the following:
       *
       *  *  open the app's plugin descriptor, then **app-key** is the key at the top
       * and **field-key** is the key in the `jiraIssueFields` module. **app-key** can
       * also be found in the app listing in the Atlassian Universal Plugin Manager.
       *  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the
       * value is returned in `key`. For example, `"key":
       * "teams-add-on__team-issue-field"`
       */
      fieldKey: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /** Filters the results to options that are only available in the specified project. */
      projectId?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanIssueFieldOption>> => {
      return jiraRequest<PageBeanIssueFieldOption>({
        path: "/rest/api/3/field/{fieldKey}/option/suggestions/search",
        method: "GET",
        pathParams: {
          fieldKey
        },
        queryParams: {
          startAt,
          maxResults,
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deselects an issue-field select-list option from all issues where it is
     * selected. A different option can be selected to replace the deselected option.
     * The update can also be limited to a smaller set of issues by using a JQL query.
     *
     * Connect and Forge app users with *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) can override the screen
     * security configuration using `overrideScreenSecurity` and
     * `overrideEditableFlag`.
     *
     * This is an [asynchronous operation](#async). The response object contains a
     * link to the long-running task.
     *
     * Note that this operation **only works for issue field select list options added
     * by Connect apps**, it cannot be used with issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are
     * not required for the app providing the field.
     */
    replaceIssueFieldOption: async ({
      fieldKey,
      optionId,
      replaceWith,
      jql,
      overrideScreenSecurity,
      overrideEditableFlag,
      opts
    }: {
      /**
       * The field key is specified in the following format:
       * **$(app-key)\_\_$(field-key)**. For example,
       * *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do
       * one of the following:
       *
       *  *  open the app's plugin descriptor, then **app-key** is the key at the top
       * and **field-key** is the key in the `jiraIssueFields` module. **app-key** can
       * also be found in the app listing in the Atlassian Universal Plugin Manager.
       *  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the
       * value is returned in `key`. For example, `"key":
       * "teams-add-on__team-issue-field"`
       */
      fieldKey: string;
      /** The ID of the option to be deselected. */
      optionId: number;
      /** The ID of the option that will replace the currently selected option. */
      replaceWith?: number;
      /**
       * A JQL query that specifies the issues to be updated. For example,
       * *project=10000*.
       */
      jql?: string;
      /**
       * Whether screen security is overridden to enable hidden fields to be edited.
       * Available to Connect and Forge app users with admin permission.
       */
      overrideScreenSecurity?: boolean;
      /**
       * Whether screen security is overridden to enable uneditable fields to be edited.
       * Available to Connect and Forge app users with *Administer Jira* [global
       * permission](https://confluence.atlassian.com/x/x4dKLg).
       */
      overrideEditableFlag?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/{fieldKey}/option/{optionId}/issue",
        method: "DELETE",
        pathParams: {
          fieldKey,
          optionId
        },
        queryParams: {
          replaceWith,
          jql,
          overrideScreenSecurity,
          overrideEditableFlag
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates or creates an option for a select list issue field. This operation
     * requires that the option ID is provided when creating an option, therefore, the
     * option ID needs to be specified as a path and body parameter. The option ID
     * provided in the path and body must be identical.
     *
     * Note that this operation **only works for issue field select list options added
     * by Connect apps**, it cannot be used with issue field select list options
     * created in Jira or using operations from the [Issue custom field
     * options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are
     * not required for the app providing the field.
     *
     * @returns Returned if the option is updated or created.
     *
     * example:
     * ```
     * {
     *   "id": 1,
     *   "value": "Team 1",
     *   "properties": {
     *     "leader": {
     *       "name": "Leader Name",
     *       "email": "lname@example.com"
     *     },
     *     "members": 42,
     *     "description": "The team's description",
     *     "founded": "2016-06-06"
     *   },
     *   "config": {
     *     "scope": {
     *       "projects": [],
     *       "projects2": [
     *         {
     *           "id": 1001,
     *           "attributes": [
     *             "notSelectable"
     *           ]
     *         },
     *         {
     *           "id": 1002,
     *           "attributes": [
     *             "notSelectable"
     *           ]
     *         }
     *       ],
     *       "global": {}
     *     },
     *     "attributes": []
     *   }
     * }
     * ```
     */
    updateIssueFieldOption: async ({
      fieldKey,
      optionId,
      issueFieldOption,
      opts
    }: {
      /**
       * The field key is specified in the following format:
       * **$(app-key)\_\_$(field-key)**. For example,
       * *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do
       * one of the following:
       *
       *  *  open the app's plugin descriptor, then **app-key** is the key at the top
       * and **field-key** is the key in the `jiraIssueFields` module. **app-key** can
       * also be found in the app listing in the Atlassian Universal Plugin Manager.
       *  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the
       * value is returned in `key`. For example, `"key":
       * "teams-add-on__team-issue-field"`
       */
      fieldKey: string;
      /** The ID of the option to be updated. */
      optionId: number;
      /**
       * @example
       * {
       *   "config": {
       *     "attributes": [],
       *     "scope": {
       *       "global": {},
       *       "projects": [],
       *       "projects2": [
       *         {
       *           "attributes": [
       *             "notSelectable"
       *           ],
       *           "id": 1001
       *         },
       *         {
       *           "attributes": [
       *             "notSelectable"
       *           ],
       *           "id": 1002
       *         }
       *       ]
       *     }
       *   },
       *   "id": 1,
       *   "properties": {
       *     "description": "The team's description",
       *     "founded": "2016-06-06",
       *     "leader": {
       *       "email": "lname@example.com",
       *       "name": "Leader Name"
       *     },
       *     "members": 42
       *   },
       *   "value": "Team 1"
       * }
       */
      issueFieldOption: IssueFieldOption;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueFieldOption>> => {
      return jiraRequest<IssueFieldOption>({
        path: "/rest/api/3/field/{fieldKey}/option/{optionId}",
        method: "PUT",
        pathParams: {
          fieldKey,
          optionId
        },
        body: JSON.stringify(issueFieldOption),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
