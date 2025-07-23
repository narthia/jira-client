import type {
  PropertyKeys,
  EntityProperty,
  IssueEntityProperties,
  BulkIssuePropertyUpdateRequest,
  IssueFilterForBulkPropertyDelete,
  MultiIssueEntityProperties,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents [issue](#api-group-Issues) properties, which provides
 * for storing custom data against an issue. Use it to get, set, and delete issue
 * properties as well as obtain details of all properties on an issue. Operations
 * to bulk update and delete issue properties are also provided. Issue properties
 * are a type of [entity
 * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 */
export default function issueProperties<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes a property value from multiple issues. The issues to be updated can be
     * specified by filter criteria.
     *
     * The criteria the filter used to identify eligible issues are:
     *
     *  *  `entityIds` Only issues from this list are eligible.
     *  *  `currentValue` Only issues with the property set to this value are eligible.
     *
     * If both criteria is specified, they are joined with the logical *AND*: only
     * issues that satisfy both criteria are considered eligible.
     *
     * If no filter criteria are specified, all the issues visible to the user and
     * where the user has the EDIT\_ISSUES permission for the issue are considered
     * eligible.
     *
     * This operation is:
     *
     *  *  transactional, either the property is deleted from all eligible issues or,
     * when errors occur, no properties are deleted.
     *  *  [asynchronous](#async). Follow the `location` link in the response to
     * determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [ project
     * permission](https://confluence.atlassian.com/x/yodKLg) for each project
     * containing issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  *Edit issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for each issue.
     */
    bulkDeleteIssueProperty: async ({
      propertyKey,
      issueFilterForBulkPropertyDelete,
      opts
    }: {
      /** The key of the property. */
      propertyKey: string;
      /**
       * @example
       * {
       *   "currentValue": "deprecated value",
       *   "entityIds": [
       *     10100,
       *     100010
       *   ]
       * }
       */
      issueFilterForBulkPropertyDelete: IssueFilterForBulkPropertyDelete;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          propertyKey
        },
        body: JSON.stringify(issueFilterForBulkPropertyDelete),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets or updates entity property values on issues. Up to 10 entity properties
     * can be specified for each issue and up to 100 issues included in the request.
     *
     * The value of the request body must be a
     * [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON.
     *
     * This operation is:
     *
     *  *  [asynchronous](#async). Follow the `location` link in the response to
     * determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *  *  non-transactional. Updating some entities may fail. Such information will
     * available in the task result.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Edit issues* [project
     * permissions](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     */
    bulkSetIssuePropertiesByIssue: async ({
      multiIssueEntityProperties,
      opts
    }: {
      /**
       * Details of the issue properties to be set or updated. Note that if an issue is
       * not found, it is ignored.
       *
       * @example
       * {
       *   "issues": [
       *     {
       *       "issueID": 1000,
       *       "properties": {
       *         "myProperty": {
       *           "owner": "admin",
       *           "weight": 100
       *         }
       *       }
       *     },
       *     {
       *       "issueID": 1001,
       *       "properties": {
       *         "myOtherProperty": {
       *           "cost": 150,
       *           "transportation": "car"
       *         }
       *       }
       *     }
       *   ]
       * }
       */
      multiIssueEntityProperties: MultiIssueEntityProperties;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/properties/multi",
        method: "POST",
        body: JSON.stringify(multiIssueEntityProperties),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets a property value on multiple issues.
     *
     * The value set can be a constant or determined by a [Jira
     * expression](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).
     * Expressions must be computable with constant complexity when applied to a set
     * of issues. Expressions must also comply with the
     * [restrictions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions)
     * that apply to all Jira expressions.
     *
     * The issues to be updated can be specified by a filter.
     *
     * The filter identifies issues eligible for update using these criteria:
     *
     *  *  `entityIds` Only issues from this list are eligible.
     *  *  `currentValue` Only issues with the property set to this value are eligible.
     *  *  `hasProperty`:
     *
     *      *  If *true*, only issues with the property are eligible.
     *      *  If *false*, only issues without the property are eligible.
     *
     * If more than one criteria is specified, they are joined with the logical *AND*:
     * only issues that satisfy all criteria are eligible.
     *
     * If an invalid combination of criteria is provided, an error is returned. For
     * example, specifying a `currentValue` and `hasProperty` as *false* would not
     * match any issues (because without the property the property cannot have a
     * value).
     *
     * The filter is optional. Without the filter all the issues visible to the user
     * and where the user has the EDIT\_ISSUES permission for the issue are considered
     * eligible.
     *
     * This operation is:
     *
     *  *  transactional, either all eligible issues are updated or, when errors
     * occur, none are updated.
     *  *  [asynchronous](#async). Follow the `location` link in the response to
     * determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for each project
     * containing issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  *Edit issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for each issue.
     */
    bulkSetIssueProperty: async ({
      propertyKey,
      bulkIssuePropertyUpdateRequest,
      opts
    }: {
      /** The key of the property. The maximum length is 255 characters. */
      propertyKey: string;
      /**
       * @example
       * {
       *   "filter": {
       *     "currentValue": {
       *       "owner": "admin",
       *       "weight": 50
       *     },
       *     "entityIds": [
       *       10100,
       *       100010
       *     ],
       *     "hasProperty": true
       *   },
       *   "value": {
       *     "owner": "admin",
       *     "weight": 100
       *   }
       * }
       */
      bulkIssuePropertyUpdateRequest: BulkIssuePropertyUpdateRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          propertyKey
        },
        body: JSON.stringify(bulkIssuePropertyUpdateRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets or updates a list of entity property values on issues. A list of up to 10
     * entity properties can be specified along with up to 10,000 issues on which to
     * set or update that list of entity properties.
     *
     * The value of the request body must be a
     * [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON. The maximum length
     * of single issue property value is 32768 characters. This operation can be
     * accessed anonymously.
     *
     * This operation is:
     *
     *  *  transactional, either all properties are updated in all eligible issues or,
     * when errors occur, no properties are updated.
     *  *  [asynchronous](#async). Follow the `location` link in the response to
     * determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Edit issues* [project
     * permissions](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     */
    bulkSetIssuesPropertiesList: async ({
      issueEntityProperties,
      opts
    }: {
      /** Issue properties to be set or updated with values. */
      issueEntityProperties: IssueEntityProperties;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/properties",
        method: "POST",
        body: JSON.stringify(issueEntityProperties),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes an issue's property.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Edit issues* [project
     * permissions](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     */
    deleteIssueProperty: async ({
      issueIdOrKey,
      propertyKey,
      opts
    }: {
      /** The key or ID of the issue. */
      issueIdOrKey: string;
      /** The key of the property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          issueIdOrKey,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the key and value of an issue's property.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "key": "issue.support",
     *   "value": {
     *     "system.conversation.id": "b1bf38be-5e94-4b40-a3b8-9278735ee1e6",
     *     "system.support.time": "1m"
     *   }
     * }
     * ```
     */
    getIssueProperty: async ({
      issueIdOrKey,
      propertyKey,
      opts
    }: {
      /** The key or ID of the issue. */
      issueIdOrKey: string;
      /** The key of the property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<EntityProperty>> => {
      return jiraRequest<EntityProperty>({
        path: "/rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          issueIdOrKey,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the URLs and keys of an issue's properties.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** Property details are only returned
     * where the user has:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "keys": [
     *     {
     *       "key": "issue.support",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issue/EX-2/properties/issue.support"
     *     }
     *   ]
     * }
     * ```
     */
    getIssuePropertyKeys: async ({
      issueIdOrKey,
      opts
    }: {
      /** The key or ID of the issue. */
      issueIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PropertyKeys>> => {
      return jiraRequest<PropertyKeys>({
        path: "/rest/api/3/issue/{issueIdOrKey}/properties",
        method: "GET",
        pathParams: {
          issueIdOrKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the value of an issue's property. Use this resource to store custom data
     * against an issue.
     *
     * The value of the request body must be a
     * [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
     * length is 32768 characters.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* and *Edit issues* [project
     * permissions](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the issue.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the issue property is updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the issue property is created.
     */
    setIssueProperty: async ({
      issueIdOrKey,
      propertyKey,
      requestBody,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The key of the issue property. The maximum length is 255 characters. */
      propertyKey: string;
      /**
       * The value of the property. The value has to be a valid, non-empty
       * [JSON](https://tools.ietf.org/html/rfc4627) value. The maximum length of the
       * property value is 32768 bytes.
       */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        created: boolean;
        body: unknown;
      }>
    > => {
      return jiraRequest<{
        created: boolean;
        body: unknown;
      }>({
        path: "/rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          issueIdOrKey,
          propertyKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
