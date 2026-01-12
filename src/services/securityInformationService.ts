import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * Send security information to Jira Software and enable your teams to turn
 * unplanned vulnerabilities into planned and tracked work.
 *
 * Security is everyone's responsibility, and the security feature in Jira lets
 * you triage and track relevant vulnerabilities as a team. Discuss and prioritise
 * issues, minimise errors and duplication, and plan security work to complete in
 * your sprints.
 *
 * APIs related to integrating Security information with Jira Software are
 * available to Atlassian Connect apps. To use these APIs you must have the
 * `jiraSecurityInfoProvider` module in your Connect app's descriptor. See
 * https://developer.atlassian.com/cloud/jira/software/modules/security-information/.
 */
export default function securityInformation<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Bulk delete all linked Security Workspaces that match the given request.
     *
     * Only Connect apps that define the `jiraSecurityInfoProvider` module can access
     * this resource.
     * This resource requires the 'DELETE' scope for Connect apps.
     *
     * e.g. DELETE /bulk?workspaceIds=111-222-333,444-555-666
     */
    deleteLinkedWorkspaces: async ({
      authorization,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the Security
       * Information module it will be rejected with a 403.
       *
       * Read [understanding
       * jwt](https://developer.atlassian.com/blog/2015/01/understanding-jwt/) for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/security/1.0/linkedWorkspaces/bulk",
        method: "DELETE",
        config,
        opts: {
          ...opts,
          headers: {
            ...opts?.headers,
            Authorization: authorization
          }
        },
        isResponseAvailable: false
      });
    },
    /**
     * Bulk delete all Vulnerabilities that match the given request.
     *
     * One or more query params must be supplied to specify Properties to delete by.
     * If more than one Property is provided, data will be deleted that matches ALL of
     * the Properties (e.g. treated as an AND).
     * Read the POST bulk endpoint documentation for more details.
     *
     * e.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
     *
     * Deletion is performed asynchronously. The GET vulnerability endpoint can be
     * used to confirm that data has been deleted successfully (if needed).
     *
     * Only Connect apps that define the `jiraSecurityInfoProvider` module can access
     * this resource.
     * This resource requires the 'DELETE' scope for Connect apps.
     */
    deleteVulnerabilitiesByProperty: async ({
      authorization,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Security
       * Information module it will be rejected with a 403.
       *
       * Read more about JWT
       * [here](https://developer.atlassian.com/blog/2015/01/understanding-jwt/).
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/security/1.0/bulkByProperties",
        method: "DELETE",
        config,
        opts: {
          ...opts,
          headers: {
            ...opts?.headers,
            Authorization: authorization
          }
        },
        isResponseAvailable: false
      });
    },
    /**
     * Delete the Vulnerability data currently stored for the given ID.
     *
     * Deletion is performed asynchronously. The GET vulnerability endpoint can be
     * used to confirm that data has been deleted successfully (if needed).
     *
     * Only Connect apps that define the `jiraSecurityInfoProvider` module can access
     * this resource.
     * This resource requires the 'DELETE' scope for Connect apps.
     */
    deleteVulnerabilityById: async ({
      vulnerabilityId,
      authorization,
      opts
    }: {
      /** The ID of the Vulnerability to delete. */
      vulnerabilityId: string;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Security
       * Information module it will be rejected with a 403.
       *
       * Read more about JWT
       * [here](https://developer.atlassian.com/blog/2015/01/understanding-jwt/).
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/security/1.0/vulnerability/{vulnerabilityId}",
        method: "DELETE",
        pathParams: {
          vulnerabilityId
        },
        config,
        opts: {
          ...opts,
          headers: {
            ...opts?.headers,
            Authorization: authorization
          }
        },
        isResponseAvailable: false
      });
    },
    /**
     * Retrieve a specific Security Workspace linked to the Jira site for the given
     * workspace ID.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * Only Connect apps that define the `jiraSecurityInfoProvider` module can access
     * this resource.
     * This resource requires the 'READ' scope for Connect apps.
     *
     * @returns The Security Workspace information stored for the given ID.
     */
    getLinkedWorkspaceById: async ({
      workspaceId,
      authorization,
      opts
    }: {
      /** The ID of the workspace to fetch. */
      workspaceId: string;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the Security
       * Information module it will be rejected with a 403.
       *
       * Read more about JWT
       * [here](https://developer.atlassian.com/blog/2015/01/understanding-jwt/).
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/security/1.0/linkedWorkspaces/{workspaceId}",
        method: "GET",
        pathParams: {
          workspaceId
        },
        config,
        opts: {
          ...opts,
          headers: {
            ...opts?.headers,
            Authorization: authorization
          }
        },
        isResponseAvailable: true
      });
    },
    /**
     * Retrieve all Security Workspaces linked with the Jira site.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * Only Connect apps that define the `jiraSecurityInfoProvider` module can access
     * this resource.
     * This resource requires the 'READ' scope for Connect apps.
     *
     * @returns A list of all stored workspace IDs.
     */
    getLinkedWorkspaces: async ({
      authorization,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the Security
       * Information module it will be rejected with a 403.
       *
       * Read more about JWT
       * [here](https://developer.atlassian.com/blog/2015/01/understanding-jwt/).
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/security/1.0/linkedWorkspaces",
        method: "GET",
        config,
        opts: {
          ...opts,
          headers: {
            ...opts?.headers,
            Authorization: authorization
          }
        },
        isResponseAvailable: true
      });
    },
    /**
     * Retrieve the currently stored Vulnerability data for the given ID.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * Only Connect apps that define the `jiraSecurityInfoProvider` module can access
     * this resource.
     * This resource requires the 'READ' scope for Connect apps.
     *
     * @returns The Vulnerability data currently stored for the given ID.
     */
    getVulnerabilityById: async ({
      vulnerabilityId,
      authorization,
      opts
    }: {
      /** The ID of the Vulnerability to fetch. */
      vulnerabilityId: string;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Security
       * Information module it will be rejected with a 403.
       *
       * Read more about JWT
       * [here](https://developer.atlassian.com/blog/2015/01/understanding-jwt/).
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/security/1.0/vulnerability/{vulnerabilityId}",
        method: "GET",
        pathParams: {
          vulnerabilityId
        },
        config,
        opts: {
          ...opts,
          headers: {
            ...opts?.headers,
            Authorization: authorization
          }
        },
        isResponseAvailable: true
      });
    },
    /**
     * Update / Insert Vulnerability data.
     *
     * Vulnerabilities are identified by their ID, any existing Vulnerability data
     * with the same ID will be replaced if it exists and the updateSequenceNumber of
     * the existing data is less than the incoming data.
     *
     * Submissions are performed asynchronously. Most updates are available within a
     * short period of time but may take some time during peak load and/or maintenance
     * times. The GET vulnerability endpoint can be used to confirm that data has been
     * stored successfully (if needed).
     *
     * In the case of multiple Vulnerabilities being submitted in one request, each is
     * validated individually prior to submission. Details of Vulnerabilities that
     * failed submission (if any) are available in the response object.
     *
     * A maximum of 1000 vulnerabilities can be submitted in one request.
     *
     * Only Connect apps that define the `jiraSecurityInfoProvider` module can access
     * this resource.
     * This resource requires the 'WRITE' scope for Connect apps.
     *
     * @returns Submission accepted. Each Vulnerability submitted in a valid format will eventually be available in Jira.
     *
     * Details of any Vulnerabilities that were submitted but failed submission (due to data format problems, etc.) are available in the response object.
     */
    submitVulnerabilities: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the Security
       * Information module it will be rejected with a 403.
       *
       * Read more about JWT
       * [here](https://developer.atlassian.com/blog/2015/01/understanding-jwt/).
       */
      authorization: string;
      /** Vulnerability data to submit. */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/security/1.0/bulk",
        method: "POST",
        body: JSON.stringify(requestBody),
        config,
        opts: {
          ...opts,
          headers: {
            ...opts?.headers,
            Authorization: authorization,
            "Content-Type": "application/json"
          }
        },
        isResponseAvailable: true
      });
    },
    /**
     * Insert Security Workspace IDs to establish a relationship between them and the
     * Jira site the app is installed on. If a relationship between the workspace ID
     * and Jira already exists then the workspace ID will be ignored and Jira will
     * process the rest of the entries.
     *
     * Only Connect apps that define the `jiraSecurityInfoProvider` module can access
     * this resource.
     * This resource requires the 'WRITE' scope for Connect apps.
     */
    submitWorkspaces: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the Security
       * Information module it will be rejected with a 403.
       *
       * Read [understanding
       * jwt](https://developer.atlassian.com/blog/2015/01/understanding-jwt/) for more
       * details.
       */
      authorization: string;
      /** Security Workspace IDs to submit. */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/security/1.0/linkedWorkspaces/bulk",
        method: "POST",
        body: JSON.stringify(requestBody),
        config,
        opts: {
          ...opts,
          headers: {
            ...opts?.headers,
            Authorization: authorization,
            "Content-Type": "application/json"
          }
        },
        isResponseAvailable: false
      });
    }
  };
}
