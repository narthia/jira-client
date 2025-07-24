import type {
  User,
  Locale,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents information about the current user, such as basic
 * details, group membership, application roles, preferences, and locale. Use it
 * to get, create, update, and delete (restore default) values of the user's
 * preferences and locale.
 */
export default function myself<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns details for the current user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "accountId": "5b10a2844c20165700ede21g",
     *   "accountType": "atlassian",
     *   "active": true,
     *   "applicationRoles": {
     *     "items": [],
     *     "size": 1
     *   },
     *   "avatarUrls": {
     *     "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *     "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *     "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *     "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *   },
     *   "displayName": "Mia Krystof",
     *   "emailAddress": "mia@example.com",
     *   "groups": {
     *     "items": [],
     *     "size": 3
     *   },
     *   "key": "",
     *   "name": "",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *   "timeZone": "Australia/Sydney"
     * }
     * ```
     */
    getCurrentUser: async ({
      expand,
      opts
    }: {
      /**
       * Use [expand](#expansion) to include additional information about user in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `groups` Returns all groups, including nested groups, the user belongs to.
       *  *  `applicationRoles` Returns the application roles the user is assigned to.
       */
      expand?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<User>> => {
      return jiraRequest<User>({
        path: "/rest/api/3/myself",
        method: "GET",
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the locale for the user.
     *
     * If the user has no language preference set (which is the default setting) or
     * this resource is accessed anonymous, the browser locale detected by Jira is
     * returned. Jira detects the browser locale using the *Accept-Language* header in
     * the request. However, if this doesn't match a locale available Jira, the site
     * default locale is returned.
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
     *   "locale": "en_US"
     * }
     * ```
     */
    getLocale: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<JiraResult<Locale>> => {
      return jiraRequest<Locale>({
        path: "/rest/api/3/mypreferences/locale",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the value of a preference of the current user.
     *
     * Note that these keys are deprecated:
     *
     *  *  *jira.user.locale* The locale of the user. By default this is not set and
     * the user takes the locale of the instance.
     *  *  *jira.user.timezone* The time zone of the user. By default this is not set
     * and the user takes the timezone of the instance.
     *
     * These system preferences keys will be deprecated by 15/07/2024. You can still
     * retrieve these keys, but it will not have any impact on Notification behaviour.
     *
     *  *  *user.notifications.watcher* Whether the user gets notified when they are
     * watcher.
     *  *  *user.notifications.assignee* Whether the user gets notified when they are
     * assignee.
     *  *  *user.notifications.reporter* Whether the user gets notified when they are
     * reporter.
     *  *  *user.notifications.mentions* Whether the user gets notified when they are
     * mentions.
     *
     * Use [ Update a user
     * profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
     * from the user management REST API to manage timezone and locale instead.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getPreference: async ({
      key,
      opts
    }: {
      /** The key of the preference. */
      key: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<string>> => {
      return jiraRequest<string>({
        path: "/rest/api/3/mypreferences",
        method: "GET",
        queryParams: {
          key
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a preference of the user, which restores the default value of system
     * defined settings.
     *
     * Note that these keys are deprecated:
     *
     *  *  *jira.user.locale* The locale of the user. By default, not set. The user
     * takes the instance locale.
     *  *  *jira.user.timezone* The time zone of the user. By default, not set. The
     * user takes the instance timezone.
     *
     * Use [ Update a user
     * profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
     * from the user management REST API to manage timezone and locale instead.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     */
    removePreference: async ({
      key,
      opts
    }: {
      /** The key of the preference. */
      key: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/mypreferences",
        method: "DELETE",
        queryParams: {
          key
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deprecated, use [ Update a user
     * profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
     * from the user management REST API instead.
     *
     * Sets the locale of the user. The locale must be one supported by the instance
     * of Jira.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @deprecated
     * @returns Returned if the request is successful.
     */
    setLocale: async ({
      locale,
      opts
    }: {
      /**
       * The locale defined in a LocaleBean.
       *
       * @example
       * {
       *   "locale": "en_US"
       * }
       */
      locale: Locale;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/mypreferences/locale",
        method: "PUT",
        body: JSON.stringify(locale),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Creates a preference for the user or updates a preference's value by sending a
     * plain text string. For example, `false`. An arbitrary preference can be created
     * with the value containing up to 255 characters. In addition, the following keys
     * define system preferences that can be set or created:
     *
     *  *  *user.notifications.mimetype* The mime type used in notifications sent to
     * the user. Defaults to `html`.
     *  *  *user.default.share.private* Whether new [
     * filters](https://confluence.atlassian.com/x/eQiiLQ) are set to private.
     * Defaults to `true`.
     *  *  *user.keyboard.shortcuts.disabled* Whether keyboard shortcuts are disabled.
     * Defaults to `false`.
     *  *  *user.autowatch.disabled* Whether the user automatically watches issues
     * they create or add a comment to. By default, not set: the user takes the
     * instance autowatch setting.
     *  *  *user.notifiy.own.changes* Whether the user gets notified of their own
     * changes.
     *
     * Note that these keys are deprecated:
     *
     *  *  *jira.user.locale* The locale of the user. By default, not set. The user
     * takes the instance locale.
     *  *  *jira.user.timezone* The time zone of the user. By default, not set. The
     * user takes the instance timezone.
     *
     * These system preferences keys will be deprecated by 15/07/2024. You can still
     * use these keys to create arbitrary preferences, but it will not have any impact
     * on Notification behaviour.
     *
     *  *  *user.notifications.watcher* Whether the user gets notified when they are
     * watcher.
     *  *  *user.notifications.assignee* Whether the user gets notified when they are
     * assignee.
     *  *  *user.notifications.reporter* Whether the user gets notified when they are
     * reporter.
     *  *  *user.notifications.mentions* Whether the user gets notified when they are
     * mentions.
     *
     * Use [ Update a user
     * profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch)
     * from the user management REST API to manage timezone and locale instead.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    setPreference: async ({
      key,
      mediaType = "application/json",
      requestBody,
      opts
    }: {
      /** The key of the preference. The maximum length is 255 characters. */
      key: string;
    } & (
      | {
          mediaType?: "application/json";
          /**
           * The value of the preference as a plain text string. The maximum length is 255
           * characters.
           */
          requestBody: string;
        }
      | {
          mediaType: "text/plain";
          /**
           * The value of the preference as a plain text string. The maximum length is 255
           * characters.
           */
          requestBody: string;
        }
    ) &
      WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/mypreferences",
        method: "PUT",
        queryParams: {
          key
        },
        body: JSON.stringify(requestBody),
        config,
        opts: {
          ...opts,
          headers: {
            "Content-Type": mediaType
          }
        },
        isResponseAvailable: false
      });
    }
  };
}
