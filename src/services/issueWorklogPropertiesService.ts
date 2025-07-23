import type {
  PropertyKeys,
  EntityProperty,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents [issue worklog](#api-group-Issue-worklogs) properties,
 * which provides for storing custom data against an issue worklog. Use it to get,
 * create, and delete issue worklog properties as well as obtain the keys of all
 * properties on a issue worklog. Issue worklog properties are a type of [entity
 * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 */
export default function issueWorklogProperties<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes a worklog property.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the
     * role visibility is restricted to.
     */
    deleteWorklogProperty: async ({
      issueIdOrKey,
      worklogId,
      propertyKey,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the worklog. */
      worklogId: string;
      /** The key of the property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          issueIdOrKey,
          worklogId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the value of a worklog property.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the
     * role visibility is restricted to.
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
    getWorklogProperty: async ({
      issueIdOrKey,
      worklogId,
      propertyKey,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the worklog. */
      worklogId: string;
      /** The key of the property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<EntityProperty>> => {
      return jiraRequest<EntityProperty>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          issueIdOrKey,
          worklogId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the keys of all properties for a worklog.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the
     * role visibility is restricted to.
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
    getWorklogPropertyKeys: async ({
      issueIdOrKey,
      worklogId,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the worklog. */
      worklogId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PropertyKeys>> => {
      return jiraRequest<PropertyKeys>({
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties",
        method: "GET",
        pathParams: {
          issueIdOrKey,
          worklogId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the value of a worklog property. Use this operation to store custom data
     * against the worklog.
     *
     * The value of the request body must be a
     * [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
     * length is 32768 characters.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  *Edit all worklogs*[ project
     * permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or
     * *Edit own worklogs* to update worklogs created by the user.
     *  *  If the worklog has visibility restrictions, belongs to the group or has the
     * role visibility is restricted to.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the worklog property is updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the worklog property is created.
     */
    setWorklogProperty: async ({
      issueIdOrKey,
      worklogId,
      propertyKey,
      requestBody,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
      /** The ID of the worklog. */
      worklogId: string;
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
        path: "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          issueIdOrKey,
          worklogId,
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
