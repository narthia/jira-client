import type {
  AnnouncementBannerConfiguration,
  AnnouncementBannerConfigurationUpdate,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents an announcement banner. Use it to retrieve and update
 * banner configuration.
 */
export default function announcementBanner<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns the current announcement banner configuration.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "hashId": "9HN2FJK9DM8BHRWERVW3RRTGDJ4G4D5C",
     *   "isDismissible": false,
     *   "isEnabled": true,
     *   "message": "This is a public, enabled, non-dismissible banner, set using the API",
     *   "visibility": "public"
     * }
     * ```
     */
    getBanner: async ({
      opts
    }: {} & WithRequestOpts<TClient>): Promise<JiraResult<AnnouncementBannerConfiguration>> => {
      return jiraRequest<AnnouncementBannerConfiguration>({
        path: "/rest/api/3/announcementBanner",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates the announcement banner configuration.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    setBanner: async ({
      announcementBannerConfigurationUpdate,
      opts
    }: {
      /**
       * @example
       * {
       *   "isDismissible": false,
       *   "isEnabled": true,
       *   "message": "This is a public, enabled, non-dismissible banner, set using the API",
       *   "visibility": "public"
       * }
       */
      announcementBannerConfigurationUpdate: AnnouncementBannerConfigurationUpdate;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/announcementBanner",
        method: "PUT",
        body: JSON.stringify(announcementBannerConfigurationUpdate),
        config,
        opts: {
          ...opts,
          headers: {
            "Content-Type": "application/json"
          }
        },
        isResponseAvailable: false
      });
    }
  };
}
