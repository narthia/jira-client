import type {
  License,
  LicenseMetric,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents license metrics. Use it to get available metrics for
 * Jira licences.
 */
export default function licenseMetrics<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns the total approximate number of user accounts for a single Jira
     * license. Note that this information is cached with a 7-day lifecycle and could
     * be stale at the time of call.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "key": "license.jira-software.approximateUserCount",
     *   "value": "115"
     * }
     * ```
     */
    getApproximateApplicationLicenseCount: async ({
      applicationKey,
      opts
    }: {
      /** The ID of the application, represents a specific version of Jira. */
      applicationKey: "jira-core" | "jira-product-discovery" | "jira-software" | "jira-servicedesk";
    } & WithRequestOpts<TClient>): Promise<JiraResult<LicenseMetric>> => {
      return jiraRequest<LicenseMetric>({
        path: "/rest/api/3/license/approximateLicenseCount/product/{applicationKey}",
        method: "GET",
        pathParams: {
          applicationKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the approximate number of user accounts across all Jira licenses. Note
     * that this information is cached with a 7-day lifecycle and could be stale at
     * the time of call.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "key": "license.totalApproximateUserCount",
     *   "value": "1000"
     * }
     * ```
     */
    getApproximateLicenseCount: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<LicenseMetric>
    > => {
      return jiraRequest<LicenseMetric>({
        path: "/rest/api/3/license/approximateLicenseCount",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns licensing information about the Jira instance.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "applications": [
     *     {
     *       "id": "jira-core",
     *       "plan": "PAID"
     *     },
     *     {
     *       "id": "jira-product-discovery",
     *       "plan": "FREE"
     *     },
     *     {
     *       "id": "jira-servicedesk",
     *       "plan": "FREE"
     *     },
     *     {
     *       "id": "jira-software",
     *       "plan": "PAID"
     *     }
     *   ]
     * }
     * ```
     */
    getLicense: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<JiraResult<License>> => {
      return jiraRequest<License>({
        path: "/rest/api/3/instance/license",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
