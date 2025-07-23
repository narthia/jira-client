import type {
  TimeTrackingConfiguration,
  TimeTrackingProvider,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents time tracking and time tracking providers. Use it to
 * get and set the time tracking provider, get and set the time tracking options,
 * and disable time tracking.
 */
export default function timeTracking<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns all time tracking providers. By default, Jira only has one time
     * tracking provider: *JIRA provided time tracking*. However, you can install
     * other time tracking providers via apps from the Atlassian Marketplace. For more
     * information on time tracking providers, see the documentation for the [ Time
     * Tracking
     * Provider](https://developer.atlassian.com/cloud/jira/platform/modules/time-tracking-provider/)
     * module.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "key": "Jira",
     *     "name": "JIRA provided time tracking",
     *     "url": "/example/config/url"
     *   }
     * ]
     * ```
     *
     */
    getAvailableTimeTrackingImplementations: async ({
      opts
    }: WithRequestOpts<TClient> = {}): Promise<JiraResult<TimeTrackingProvider[]>> => {
      return jiraRequest<TimeTrackingProvider[]>({
        path: "/rest/api/3/configuration/timetracking/list",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the time tracking provider that is currently selected. Note that if
     * time tracking is disabled, then a successful but empty response is returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the request is successful and time tracking is enabled.
     *
     *    example:
     *    ```
     *    {
     *      "key": "Jira",
     *      "name": "JIRA provided time tracking",
     *      "url": "/example/config/url"
     *    }
     *    ```
     *
     *  * status: 204, mediaType: application/json
     *
     *    Returned if the request is successful but time tracking is disabled.
     */
    getSelectedTimeTrackingImplementation: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<TimeTrackingProvider | void>
    > => {
      return jiraRequest<TimeTrackingProvider | void>({
        path: "/rest/api/3/configuration/timetracking",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the time tracking settings. This includes settings such as the time
     * format, default time unit, and others. For more information, see [Configuring
     * time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultUnit": "hour",
     *   "timeFormat": "pretty",
     *   "workingDaysPerWeek": 5.5,
     *   "workingHoursPerDay": 7.6
     * }
     * ```
     */
    getSharedTimeTrackingConfiguration: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<TimeTrackingConfiguration>
    > => {
      return jiraRequest<TimeTrackingConfiguration>({
        path: "/rest/api/3/configuration/timetracking/options",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Selects a time tracking provider.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    selectTimeTrackingImplementation: async ({
      timeTrackingProvider,
      opts
    }: {
      /**
       * @example
       * {
       *   "key": "Jira"
       * }
       */
      timeTrackingProvider: TimeTrackingProvider;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/configuration/timetracking",
        method: "PUT",
        body: JSON.stringify(timeTrackingProvider),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets the time tracking settings.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultUnit": "hour",
     *   "timeFormat": "pretty",
     *   "workingDaysPerWeek": 5.5,
     *   "workingHoursPerDay": 7.6
     * }
     * ```
     */
    setSharedTimeTrackingConfiguration: async ({
      timeTrackingConfiguration,
      opts
    }: {
      /**
       * @example
       * {
       *   "defaultUnit": "hour",
       *   "timeFormat": "pretty",
       *   "workingDaysPerWeek": 5.5,
       *   "workingHoursPerDay": 7.6
       * }
       */
      timeTrackingConfiguration: TimeTrackingConfiguration;
    } & WithRequestOpts<TClient>): Promise<JiraResult<TimeTrackingConfiguration>> => {
      return jiraRequest<TimeTrackingConfiguration>({
        path: "/rest/api/3/configuration/timetracking/options",
        method: "PUT",
        body: JSON.stringify(timeTrackingConfiguration),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
