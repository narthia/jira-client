import type {
  ProjectType,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents project types. Use it to obtain a list of all project
 * types, a list of project types accessible to the calling user, and details of a
 * project type.
 */
export default function projectTypes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw) if it is
     * accessible to the user.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "color": "#FFFFFF",
     *   "descriptionI18nKey": "jira.project.type.business.description",
     *   "formattedKey": "Business",
     *   "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzY2NjY2NiIgZD0iTTE2LDBDNy4yLDAsMCw3LjIsMCwxNmMwLDguOCw3LjIsMTYsMTYsMTZjOC44LDAsMTYtNy4yLDE2LTE2QzMyLDcuMiwyNC44LDAsMTYsMHogTTI1LjcsMjMNCgkJYzAsMS44LTEuNCwzLjItMy4yLDMuMkg5LjJDNy41LDI2LjIsNiwyNC44LDYsMjNWOS44QzYsOCw3LjUsNi42LDkuMiw2LjZoMTMuMmMwLjIsMCwwLjQsMCwwLjcsMC4xbC0yLjgsMi44SDkuMg0KCQlDOSw5LjQsOC44LDkuNiw4LjgsOS44VjIzYzAsMC4yLDAuMiwwLjQsMC40LDAuNGgxMy4yYzAuMiwwLDAuNC0wLjIsMC40LTAuNHYtNS4zbDIuOC0yLjhWMjN6IE0xNS45LDIxLjNMMTEsMTYuNGwyLTJsMi45LDIuOQ0KCQlMMjYuNCw2LjhjMC42LDAuNywxLjIsMS41LDEuNywyLjNMMTUuOSwyMS4zeiIvPg0KPC9nPg0KPC9zdmc+",
     *   "key": "business"
     * }
     * ```
     */
    getAccessibleProjectTypeByKey: async ({
      projectTypeKey,
      opts
    }: {
      /** The key of the project type. */
      projectTypeKey: "software" | "service_desk" | "business" | "product_discovery";
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectType>> => {
      return jiraRequest<ProjectType>({
        path: "/rest/api/3/project/type/{projectTypeKey}/accessible",
        method: "GET",
        pathParams: {
          projectTypeKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all [project types](https://confluence.atlassian.com/x/Var1Nw) with a
     * valid license.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "color": "#FFFFFF",
     *     "descriptionI18nKey": "jira.project.type.business.description",
     *     "formattedKey": "Business",
     *     "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzY2NjY2NiIgZD0iTTE2LDBDNy4yLDAsMCw3LjIsMCwxNmMwLDguOCw3LjIsMTYsMTYsMTZjOC44LDAsMTYtNy4yLDE2LTE2QzMyLDcuMiwyNC44LDAsMTYsMHogTTI1LjcsMjMNCgkJYzAsMS44LTEuNCwzLjItMy4yLDMuMkg5LjJDNy41LDI2LjIsNiwyNC44LDYsMjNWOS44QzYsOCw3LjUsNi42LDkuMiw2LjZoMTMuMmMwLjIsMCwwLjQsMCwwLjcsMC4xbC0yLjgsMi44SDkuMg0KCQlDOSw5LjQsOC44LDkuNiw4LjgsOS44VjIzYzAsMC4yLDAuMiwwLjQsMC40LDAuNGgxMy4yYzAuMiwwLDAuNC0wLjIsMC40LTAuNHYtNS4zbDIuOC0yLjhWMjN6IE0xNS45LDIxLjNMMTEsMTYuNGwyLTJsMi45LDIuOQ0KCQlMMjYuNCw2LjhjMC42LDAuNywxLjIsMS41LDEuNywyLjNMMTUuOSwyMS4zeiIvPg0KPC9nPg0KPC9zdmc+",
     *     "key": "business"
     *   },
     *   {
     *     "color": "#AAAAAA",
     *     "descriptionI18nKey": "jira.project.type.software.description",
     *     "formattedKey": "Software",
     *     "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzY2NjY2NiIgZD0iTTE2LDBDNy4yLDAsMCw3LjIsMCwxNmMwLDguOCw3LjIsMTYsMTYsMTZjOC44LDAsMTYtNy4yLDE2LTE2QzMyLDcuMiwyNC44LDAsMTYsMHogTTI1LjcsMjMNCgkJYzAsMS44LTEuNCwzLjItMy4yLDMuMkg5LjJDNy41LDI2LjIsNiwyNC44LDYsMjNWOS44QzYsOCw3LjUsNi42LDkuMiw2LjZoMTMuMmMwLjIsMCwwLjQsMCwwLjcsMC4xbC0yLjgsMi44SDkuMg0KCQlDOSw5LjQsOC44LDkuNiw4LjgsOS44VjIzYzAsMC4yLDAuMiwwLjQsMC40LDAuNGgxMy4yYzAuMiwwLDAuNC0wLjIsMC40LTAuNHYtNS4zbDIuOC0yLjhWMjN6IE0xNS45LDIxLjNMMTEsMTYuNGwyLTJsMi45LDIuOQ0KCQlMMjYuNCw2LjhjMC42LDAuNywxLjIsMS41LDEuNywyLjNMMTUuOSwyMS4zeiIvPg0KPC9nPg0KPC9zdmc+",
     *     "key": "software"
     *   }
     * ]
     * ```
     *
     */
    getAllAccessibleProjectTypes: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<ProjectType[]>
    > => {
      return jiraRequest<ProjectType[]>({
        path: "/rest/api/3/project/type/accessible",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns all [project types](https://confluence.atlassian.com/x/Var1Nw), whether
     * or not the instance has a valid license for each type.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "color": "#FFFFFF",
     *     "descriptionI18nKey": "jira.project.type.business.description",
     *     "formattedKey": "Business",
     *     "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzY2NjY2NiIgZD0iTTE2LDBDNy4yLDAsMCw3LjIsMCwxNmMwLDguOCw3LjIsMTYsMTYsMTZjOC44LDAsMTYtNy4yLDE2LTE2QzMyLDcuMiwyNC44LDAsMTYsMHogTTI1LjcsMjMNCgkJYzAsMS44LTEuNCwzLjItMy4yLDMuMkg5LjJDNy41LDI2LjIsNiwyNC44LDYsMjNWOS44QzYsOCw3LjUsNi42LDkuMiw2LjZoMTMuMmMwLjIsMCwwLjQsMCwwLjcsMC4xbC0yLjgsMi44SDkuMg0KCQlDOSw5LjQsOC44LDkuNiw4LjgsOS44VjIzYzAsMC4yLDAuMiwwLjQsMC40LDAuNGgxMy4yYzAuMiwwLDAuNC0wLjIsMC40LTAuNHYtNS4zbDIuOC0yLjhWMjN6IE0xNS45LDIxLjNMMTEsMTYuNGwyLTJsMi45LDIuOQ0KCQlMMjYuNCw2LjhjMC42LDAuNywxLjIsMS41LDEuNywyLjNMMTUuOSwyMS4zeiIvPg0KPC9nPg0KPC9zdmc+",
     *     "key": "business"
     *   },
     *   {
     *     "color": "#AAAAAA",
     *     "descriptionI18nKey": "jira.project.type.software.description",
     *     "formattedKey": "Software",
     *     "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzY2NjY2NiIgZD0iTTE2LDBDNy4yLDAsMCw3LjIsMCwxNmMwLDguOCw3LjIsMTYsMTYsMTZjOC44LDAsMTYtNy4yLDE2LTE2QzMyLDcuMiwyNC44LDAsMTYsMHogTTI1LjcsMjMNCgkJYzAsMS44LTEuNCwzLjItMy4yLDMuMkg5LjJDNy41LDI2LjIsNiwyNC44LDYsMjNWOS44QzYsOCw3LjUsNi42LDkuMiw2LjZoMTMuMmMwLjIsMCwwLjQsMCwwLjcsMC4xbC0yLjgsMi44SDkuMg0KCQlDOSw5LjQsOC44LDkuNiw4LjgsOS44VjIzYzAsMC4yLDAuMiwwLjQsMC40LDAuNGgxMy4yYzAuMiwwLDAuNC0wLjIsMC40LTAuNHYtNS4zbDIuOC0yLjhWMjN6IE0xNS45LDIxLjNMMTEsMTYuNGwyLTJsMi45LDIuOQ0KCQlMMjYuNCw2LjhjMC42LDAuNywxLjIsMS41LDEuNywyLjNMMTUuOSwyMS4zeiIvPg0KPC9nPg0KPC9zdmc+",
     *     "key": "software"
     *   }
     * ]
     * ```
     *
     */
    getAllProjectTypes: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<ProjectType[]>
    > => {
      return jiraRequest<ProjectType[]>({
        path: "/rest/api/3/project/type",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw).
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
     *   "color": "#FFFFFF",
     *   "descriptionI18nKey": "jira.project.type.business.description",
     *   "formattedKey": "Business",
     *   "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzY2NjY2NiIgZD0iTTE2LDBDNy4yLDAsMCw3LjIsMCwxNmMwLDguOCw3LjIsMTYsMTYsMTZjOC44LDAsMTYtNy4yLDE2LTE2QzMyLDcuMiwyNC44LDAsMTYsMHogTTI1LjcsMjMNCgkJYzAsMS44LTEuNCwzLjItMy4yLDMuMkg5LjJDNy41LDI2LjIsNiwyNC44LDYsMjNWOS44QzYsOCw3LjUsNi42LDkuMiw2LjZoMTMuMmMwLjIsMCwwLjQsMCwwLjcsMC4xbC0yLjgsMi44SDkuMg0KCQlDOSw5LjQsOC44LDkuNiw4LjgsOS44VjIzYzAsMC4yLDAuMiwwLjQsMC40LDAuNGgxMy4yYzAuMiwwLDAuNC0wLjIsMC40LTAuNHYtNS4zbDIuOC0yLjhWMjN6IE0xNS45LDIxLjNMMTEsMTYuNGwyLTJsMi45LDIuOQ0KCQlMMjYuNCw2LjhjMC42LDAuNywxLjIsMS41LDEuNywyLjNMMTUuOSwyMS4zeiIvPg0KPC9nPg0KPC9zdmc+",
     *   "key": "business"
     * }
     * ```
     */
    getProjectTypeByKey: async ({
      projectTypeKey,
      opts
    }: {
      /** The key of the project type. */
      projectTypeKey: "software" | "service_desk" | "business" | "product_discovery";
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectType>> => {
      return jiraRequest<ProjectType>({
        path: "/rest/api/3/project/type/{projectTypeKey}",
        method: "GET",
        pathParams: {
          projectTypeKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
