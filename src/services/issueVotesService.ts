import type {
  Votes,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents votes cast by users on an issue. Use it to get details
 * of votes on an issue as well as cast and withdrawal votes.
 */
export default function issueVotes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds the user's vote to an issue. This is the equivalent of the user clicking
     * *Vote* on an issue in Jira.
     *
     * This operation requires the **Allow users to vote on issues** option to be
     * *ON*. This option is set in General configuration for Jira. See [Configuring
     * Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     */
    addVote: async ({
      issueIdOrKey,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/votes",
        method: "POST",
        pathParams: {
          issueIdOrKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns details about the votes on an issue.
     *
     * This operation requires the **Allow users to vote on issues** option to be
     * *ON*. This option is set in General configuration for Jira. See [Configuring
     * Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is ini
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * Note that users with the necessary permissions for this operation but without
     * the *View voters and watchers* project permissions are not returned details in
     * the `voters` field.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "hasVoted": true,
     *   "self": "https://your-domain.atlassian.net/rest/api/issue/MKY-1/votes",
     *   "voters": [
     *     {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "accountType": "atlassian",
     *       "active": false,
     *       "avatarUrls": {
     *         "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *         "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *         "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *         "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *       },
     *       "displayName": "Mia Krystof",
     *       "key": "",
     *       "name": "",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *     }
     *   ],
     *   "votes": 24
     * }
     * ```
     */
    getVotes: async ({
      issueIdOrKey,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Votes>> => {
      return jiraRequest<Votes>({
        path: "/rest/api/3/issue/{issueIdOrKey}/votes",
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
     * Deletes a user's vote from an issue. This is the equivalent of the user
     * clicking *Unvote* on an issue in Jira.
     *
     * This operation requires the **Allow users to vote on issues** option to be
     * *ON*. This option is set in General configuration for Jira. See [Configuring
     * Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     */
    removeVote: async ({
      issueIdOrKey,
      opts
    }: {
      /** The ID or key of the issue. */
      issueIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issue/{issueIdOrKey}/votes",
        method: "DELETE",
        pathParams: {
          issueIdOrKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
