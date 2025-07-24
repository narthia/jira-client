import type {
  IssueLinkType,
  IssueLinkTypes,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents [issue link](#api-group-Issue-links) types. Use it to
 * get, create, update, and delete link issue types as well as get lists of all
 * link issue types.
 *
 * To use it, the site must have [issue
 * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
 */
export default function issueLinkTypes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates an issue link type. Use this operation to create descriptions of the
     * reasons why issues are linked. The issue link type consists of a name and
     * descriptions for a link's inward and outward relationships.
     *
     * To use this operation, the site must have [issue
     * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "1000",
     *   "inward": "Duplicated by",
     *   "name": "Duplicate",
     *   "outward": "Duplicates",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issueLinkType/1000"
     * }
     * ```
     */
    createIssueLinkType: async ({
      issueLinkType,
      opts
    }: {
      /**
       * @example
       * {
       *   "inward": "Duplicated by",
       *   "name": "Duplicate",
       *   "outward": "Duplicates"
       * }
       */
      issueLinkType: IssueLinkType;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueLinkType>> => {
      return jiraRequest<IssueLinkType>({
        path: "/rest/api/3/issueLinkType",
        method: "POST",
        body: JSON.stringify(issueLinkType),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an issue link type.
     *
     * To use this operation, the site must have [issue
     * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteIssueLinkType: async ({
      issueLinkTypeId,
      opts
    }: {
      /** The ID of the issue link type. */
      issueLinkTypeId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issueLinkType/{issueLinkTypeId}",
        method: "DELETE",
        pathParams: {
          issueLinkTypeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns an issue link type.
     *
     * To use this operation, the site must have [issue
     * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for a project in the
     * site.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "1000",
     *   "inward": "Duplicated by",
     *   "name": "Duplicate",
     *   "outward": "Duplicates",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issueLinkType/1000"
     * }
     * ```
     */
    getIssueLinkType: async ({
      issueLinkTypeId,
      opts
    }: {
      /** The ID of the issue link type. */
      issueLinkTypeId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueLinkType>> => {
      return jiraRequest<IssueLinkType>({
        path: "/rest/api/3/issueLinkType/{issueLinkTypeId}",
        method: "GET",
        pathParams: {
          issueLinkTypeId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of all issue link types.
     *
     * To use this operation, the site must have [issue
     * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for a project in the
     * site.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "issueLinkTypes": [
     *     {
     *       "id": "1000",
     *       "inward": "Duplicated by",
     *       "name": "Duplicate",
     *       "outward": "Duplicates",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issueLinkType/1000"
     *     },
     *     {
     *       "id": "1010",
     *       "inward": "Blocked by",
     *       "name": "Blocks",
     *       "outward": "Blocks",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/issueLinkType/1010"
     *     }
     *   ]
     * }
     * ```
     */
    getIssueLinkTypes: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<IssueLinkTypes>
    > => {
      return jiraRequest<IssueLinkTypes>({
        path: "/rest/api/3/issueLinkType",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates an issue link type.
     *
     * To use this operation, the site must have [issue
     * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "1000",
     *   "inward": "Duplicated by",
     *   "name": "Duplicate",
     *   "outward": "Duplicates",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/issueLinkType/1000"
     * }
     * ```
     */
    updateIssueLinkType: async ({
      issueLinkTypeId,
      issueLinkType,
      opts
    }: {
      /** The ID of the issue link type. */
      issueLinkTypeId: string;
      /**
       * @example
       * {
       *   "inward": "Duplicated by",
       *   "name": "Duplicate",
       *   "outward": "Duplicates"
       * }
       */
      issueLinkType: IssueLinkType;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueLinkType>> => {
      return jiraRequest<IssueLinkType>({
        path: "/rest/api/3/issueLinkType/{issueLinkTypeId}",
        method: "PUT",
        pathParams: {
          issueLinkTypeId
        },
        body: JSON.stringify(issueLinkType),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
