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
 * This resource represents [issue comment](#api-group-Issue-comments) properties,
 * which provides for storing custom data against an issue comment. Use is to get,
 * set, and delete issue comment properties as well as obtain the keys of all
 * properties on a comment. Comment properties are a type of [entity
 * property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 */
export default function issueCommentProperties<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes a comment property.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Edit All Comments* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) to delete a property
     * from any comment.
     *  *  *Edit Own Comments* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) to delete a property
     * from a comment created by the user.
     *
     * Also, when the visibility of a comment is restricted to a role or group the
     * user must be a member of that role or group.
     */
    deleteCommentProperty: async ({
      commentId,
      propertyKey,
      opts
    }: {
      /** The ID of the comment. */
      commentId: string;
      /** The key of the property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/comment/{commentId}/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          commentId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns the value of a comment property.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If the comment has visibility restrictions, belongs to the group or has the
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
    getCommentProperty: async ({
      commentId,
      propertyKey,
      opts
    }: {
      /** The ID of the comment. */
      commentId: string;
      /** The key of the property. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<EntityProperty>> => {
      return jiraRequest<EntityProperty>({
        path: "/rest/api/3/comment/{commentId}/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          commentId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the keys of all the properties of a comment.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If the comment has visibility restrictions, belongs to the group or has the
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
    getCommentPropertyKeys: async ({
      commentId,
      opts
    }: {
      /** The ID of the comment. */
      commentId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PropertyKeys>> => {
      return jiraRequest<PropertyKeys>({
        path: "/rest/api/3/comment/{commentId}/properties",
        method: "GET",
        pathParams: {
          commentId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates or updates the value of a property for a comment. Use this resource to
     * store custom data against a comment.
     *
     * The value of the request body must be a
     * [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
     * length is 32768 characters.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Edit All Comments* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) to create or update the
     * value of a property on any comment.
     *  *  *Edit Own Comments* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) to create or update the
     * value of a property on a comment created by the user.
     *
     * Also, when the visibility of a comment is restricted to a role or group the
     * user must be a member of that role or group.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the comment property is updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the comment property is created.
     */
    setCommentProperty: async ({
      commentId,
      propertyKey,
      requestBody,
      opts
    }: {
      /** The ID of the comment. */
      commentId: string;
      /** The key of the property. The maximum length is 255 characters. */
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
        path: "/rest/api/3/comment/{commentId}/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          commentId,
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
