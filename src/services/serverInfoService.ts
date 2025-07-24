import type {
  ServerInformation,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/** This resource provides information about the Jira instance. */
export default function serverInfo<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns information about the Jira instance.
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
     *   "baseUrl": "https://your-domain.atlassian.net",
     *   "buildDate": "2020-03-26T22:20:59.000+0000",
     *   "buildNumber": 582,
     *   "defaultLocale": {
     *     "locale": "en_AU"
     *   },
     *   "displayUrl": "https://instance.jira.your-domain.com",
     *   "displayUrlConfluence": "https://instance.confluence.your-domain.com",
     *   "displayUrlServicedeskHelpCenter": "https://instance.help.your-domain.com",
     *   "scmInfo": "1f51473f5c7b75c1a69a0090f4832cdc5053702a",
     *   "serverTime": "2020-03-31T16:43:50.000+0000",
     *   "serverTimeZone": "Australia/Sydney",
     *   "serverTitle": "My Jira instance",
     *   "version": "1001.0.0-SNAPSHOT",
     *   "versionNumbers": [
     *     5,
     *     0,
     *     0
     *   ]
     * }
     * ```
     */
    getServerInfo: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<ServerInformation>
    > => {
      return jiraRequest<ServerInformation>({
        path: "/rest/api/3/serverInfo",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
