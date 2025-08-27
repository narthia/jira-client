import type {
  SoftwareInfoDto,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents Jira Service Management instance information. Use it to:
 *
 * * get runtime information about the Jira Service Management instance
 * * retrieve software version and build details
 */
export default function info<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * This method retrieves information about the Jira Service Management instance
     * such as software version, builds, and related links.
     *
     * **[Permissions](#permissions) required**: None, the user does not need to be
     * logged in.
     *
     * @returns Returns the runtime information for the Jira Service Management instance.
     *
     * example:
     * ```
     * {
     *   "_links": {
     *     "self": "https://your-domain.atlassian.net/rest/servicedeskapi/info"
     *   },
     *   "buildChangeSet": "c6679417c550918e7c94a9eaaada133f15dc8ff0",
     *   "buildDate": {
     *     "epochMillis": 1442259240000,
     *     "friendly": "Monday 02:34 AM",
     *     "iso8601": "2015-09-15T02:34:00+0700",
     *     "jira": "2015-09-15T02:34:00.000+0700"
     *   },
     *   "isLicensedForUse": true,
     *   "platformVersion": "7.0.1",
     *   "version": "3.0.1"
     * }
     * ```
     */
    getInfo: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<SoftwareInfoDto>
    > => {
      return jiraRequest<SoftwareInfoDto>({
        path: "/rest/servicedeskapi/info",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
