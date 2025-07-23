import type {
  ErrorCollection,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/** This resource provides validation for project keys and names. */
export default function projectKeyAndNameValidation<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Validates a project key and, if the key is invalid or in use, generates a valid
     * random string for the project key.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * "VPNE"
     * ```
     */
    getValidProjectKey: async ({
      key,
      opts
    }: {
      /** The project key. */
      key?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<string>> => {
      return jiraRequest<string>({
        path: "/rest/api/3/projectvalidate/validProjectKey",
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
     * Checks that a project name isn't in use. If the name isn't in use, the passed
     * string is returned. If the name is in use, this operation attempts to generate
     * a valid project name based on the one supplied, usually by adding a sequence
     * number. If a valid project name cannot be generated, a 404 response is returned.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * "Valid Project Name Example"
     * ```
     */
    getValidProjectName: async ({
      name,
      opts
    }: {
      /** The project name. */
      name: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<string>> => {
      return jiraRequest<string>({
        path: "/rest/api/3/projectvalidate/validProjectName",
        method: "GET",
        queryParams: {
          name
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Validates a project key by confirming the key is a valid string and not in use.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "errorMessages": [],
     *   "errors": {
     *     "projectKey": "A project with that project key already exists."
     *   }
     * }
     * ```
     */
    validateProjectKey: async ({
      key,
      opts
    }: {
      /** The project key. */
      key?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<ErrorCollection>> => {
      return jiraRequest<ErrorCollection>({
        path: "/rest/api/3/projectvalidate/key",
        method: "GET",
        queryParams: {
          key
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
