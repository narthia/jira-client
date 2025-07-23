import type {
  SecurityLevel,
  PageBeanIssueSecurityLevelMember,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue security levels. Use it to obtain the details of
 * any issue security level. For more information about issue security levels, see
 * [Configuring issue-level security](https://confluence.atlassian.com/x/J4lKLg).
 */
export default function issueSecurityLevel<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns details of an issue security level.
     *
     * Use [Get issue security scheme](#api-rest-api-3-issuesecurityschemes-id-get) to
     * obtain the IDs of issue security levels associated with the issue security
     * scheme.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "description": "Only the reporter and internal staff can see this issue.",
     *   "id": "10021",
     *   "name": "Reporter Only",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/securitylevel/10021"
     * }
     * ```
     */
    getIssueSecurityLevel: async ({
      id,
      opts
    }: {
      /** The ID of the issue security level. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SecurityLevel>> => {
      return jiraRequest<SecurityLevel>({
        path: "/rest/api/3/securitylevel/{id}",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns issue security level members.
     *
     * Only issue security level members in context of classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 100,
     *   "startAt": 0,
     *   "total": 3,
     *   "values": [
     *     {
     *       "id": 10000,
     *       "issueSecurityLevelId": 10020,
     *       "holder": {
     *         "expand": "user",
     *         "type": "user",
     *         "user": {
     *           "accountId": "5b10a2844c20165700ede21g",
     *           "active": true,
     *           "avatarUrls": {
     *             "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *             "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *             "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *             "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *           },
     *           "displayName": "Mia Krystof",
     *           "emailAddress": "mia@example.com",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *           "timeZone": "Australia/Sydney"
     *         }
     *       }
     *     },
     *     {
     *       "id": 10001,
     *       "issueSecurityLevelId": 10020,
     *       "holder": {
     *         "expand": "group",
     *         "parameter": "jira-core-users",
     *         "type": "group",
     *         "value": "9c559b11-6c5d-4f96-992c-a746cabab28b"
     *       }
     *     },
     *     {
     *       "id": 10002,
     *       "issueSecurityLevelId": 10021,
     *       "holder": {
     *         "type": "assignee"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getIssueSecurityLevelMembers: async ({
      issueSecuritySchemeId,
      startAt,
      maxResults,
      issueSecurityLevelId,
      expand,
      opts
    }: {
      /**
       * The ID of the issue security scheme. Use the [Get issue security
       * schemes](#api-rest-api-3-issuesecurityschemes-get) operation to get a list of
       * issue security scheme IDs.
       */
      issueSecuritySchemeId: number;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * The list of issue security level IDs. To include multiple issue security levels
       * separate IDs with ampersand:
       * `issueSecurityLevelId=10000&issueSecurityLevelId=10001`.
       */
      issueSecurityLevelId?: string[];
      /**
       * Use expand to include additional information in the response. This parameter
       * accepts a comma-separated list. Expand options include:
       *
       *  *  `all` Returns all expandable information.
       *  *  `field` Returns information about the custom field granted the permission.
       *  *  `group` Returns information about the group that is granted the permission.
       *  *  `projectRole` Returns information about the project role granted the
       * permission.
       *  *  `user` Returns information about the user who is granted the permission.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanIssueSecurityLevelMember>> => {
      return jiraRequest<PageBeanIssueSecurityLevelMember>({
        path: "/rest/api/3/issuesecurityschemes/{issueSecuritySchemeId}/members",
        method: "GET",
        pathParams: {
          issueSecuritySchemeId
        },
        queryParams: {
          startAt,
          maxResults,
          issueSecurityLevelId,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
