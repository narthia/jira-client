import type {
  ProjectEmailAddress,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the email address used to send a project's
 * notifications. Use it to get and set the [project's sender email
 * address](https://confluence.atlassian.com/x/dolKLg).
 */
export default function projectEmail<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns the [project's sender email
     * address](https://confluence.atlassian.com/x/dolKLg).
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "emailAddress": "jira@example.customdomain.com",
     *   "emailAddressStatus": [
     *     "Email address or domain not verified."
     *   ]
     * }
     * ```
     */
    getProjectEmail: async ({
      projectId,
      opts
    }: {
      /** The project ID. */
      projectId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectEmailAddress>> => {
      return jiraRequest<ProjectEmailAddress>({
        path: "/rest/api/3/project/{projectId}/email",
        method: "GET",
        pathParams: {
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the [project's sender email
     * address](https://confluence.atlassian.com/x/dolKLg).
     *
     * If `emailAddress` is an empty string, the default email address is restored.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     * [project permission.](https://confluence.atlassian.com/x/yodKLg)
     *
     * @returns Returned if the project's sender email address is successfully set.
     */
    updateProjectEmail: async ({
      projectId,
      projectEmailAddress,
      opts
    }: {
      /** The project ID. */
      projectId: number;
      /**
       * The project's sender email address to be set.
       *
       * @example
       * {
       *   "emailAddress": "jira@example.atlassian.net"
       * }
       */
      projectEmailAddress: ProjectEmailAddress;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectId}/email",
        method: "PUT",
        pathParams: {
          projectId
        },
        body: JSON.stringify(projectEmailAddress),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
