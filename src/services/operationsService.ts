import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * APIs related to integrating Incident and Post-Incident Review (PIR) data with
 * Jira Software.
 *
 * These APIs are available to Atlassian Connect apps. To use these APIs you must
 * have the `jiraOperationsInfoProvider` module in your Connect app's descriptor.
 * See
 * https://developer.atlassian.com/cloud/jira/software/modules/operations-information/.
 */
export default function operations<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Bulk delete all Entties that match the given request.
     *
     * One or more query params must be supplied to specify Properties to delete by.
     * If more than one Property is provided, data will be deleted that matches ALL of
     * the Properties (e.g. treated as an AND).
     * See the documentation for the submitEntity operation for more details.
     *
     * e.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
     *
     * Deletion is performed asynchronously. The getIncidentById operation can be used
     * to confirm that data has been deleted successfully (if needed).
     *
     * Only Connect apps that define the `jiraOperationsInfoProvider` module can
     * access this resource.
     * This resource requires the 'DELETE' scope for Connect apps.
     */
    deleteEntityByProperty: async ({
      authorization,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Operations
       * Information module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/operations/1.0/bulkByProperties",
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
     * Delete the Incident data currently stored for the given ID.
     *
     * Deletion is performed asynchronously. The getIncidentById operation can be used
     * to confirm that data has been deleted successfully (if needed).
     *
     * Only Connect apps that define the `jiraOperationsInfoProvider` module can
     * access this resource.
     * This resource requires the 'DELETE' scope for Connect apps.
     */
    deleteIncidentById: async ({
      incidentId,
      authorization,
      opts
    }: {
      /** The ID of the Incident to delete. */
      incidentId: string;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Operations
       * Information module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/operations/1.0/incidents/{incidentId}",
        method: "DELETE",
        pathParams: {
          incidentId
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
     * Delete the Review data currently stored for the given ID.
     *
     * Deletion is performed asynchronously. The getReviewById operation can be used
     * to confirm that data has been deleted successfully (if needed).
     *
     * Only Connect apps that define the `jiraOperationsInfoProvider` module can
     * access this resource.
     * This resource requires the 'DELETE' scope for Connect apps.
     */
    deleteReviewById: async ({
      reviewId,
      authorization,
      opts
    }: {
      /** The ID of the Review to delete. */
      reviewId: string;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Operations
       * Information module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/operations/1.0/post-incident-reviews/{reviewId}",
        method: "DELETE",
        pathParams: {
          reviewId
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
     * Bulk delete all Operations Workspaces that match the given request.
     *
     * Only Connect apps that define the `jiraOperationsInfoProvider` module can
     * access this resource.
     * This resource requires the 'DELETE' scope for Connect apps.
     *
     * e.g. DELETE /bulk?workspaceIds=111-222-333,444-555-666
     */
    deleteWorkspaces: async ({
      authorization,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the Operations
       * module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/operations/1.0/linkedWorkspaces/bulk",
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
     * Retrieve the currently stored Incident data for the given ID.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * Only Connect apps that define the `jiraOperationsInfoProvider` module can
     * access this resource.
     * This resource requires the 'READ' scope for Connect apps.
     *
     * @returns The Incident data currently stored for the given ID.
     */
    getIncidentById: async ({
      incidentId,
      authorization,
      opts
    }: {
      /** The ID of the Incident to fetch. */
      incidentId: string;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Operations
       * Information module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/operations/1.0/incidents/{incidentId}",
        method: "GET",
        pathParams: {
          incidentId
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
     * Retrieve the currently stored Review data for the given ID.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * Only Connect apps that define the `jiraOperationsInfoProvider` module can
     * access this resource.
     * This resource requires the 'READ' scope for Connect apps.
     *
     * @returns The Review data currently stored for the given ID.
     */
    getReviewById: async ({
      reviewId,
      authorization,
      opts
    }: {
      /** The ID of the Review to fetch. */
      reviewId: string;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Operations
       * Information module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/operations/1.0/post-incident-reviews/{reviewId}",
        method: "GET",
        pathParams: {
          reviewId
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
     * Retrieve the either all Operations Workspace IDs associated with the Jira site
     * or a specific Operations Workspace ID for the given ID.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * e.g. GET /workspace?workspaceId=111-222-333
     *
     * Only Connect apps that define the `jiraOperationsInfoProvider` module can
     * access this resource.
     * This resource requires the 'READ' scope for Connect apps.
     *
     * @returns Either the ID provided if stored or a list of available IDs.
     */
    getWorkspaces: async ({
      authorization,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the Operations
       * Information module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/operations/1.0/linkedWorkspaces",
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
     * Update / insert Incident or Review data.
     *
     * Incidents and reviews are identified by their ID, and existing Incident and
     * Review data for the same ID will be replaced if it exists and the
     * updateSequenceNumber of existing data is less than the incoming data.
     *
     * Submissions are performed asynchronously. Submitted data will eventually be
     * available in Jira; most updates are available within a short period of time,
     * but may take some time during peak load and/or maintenance times. The
     * getIncidentById or getReviewById operation can be used to confirm that data has
     * been stored successfully (if needed).
     *
     * In the case of multiple Incidents and Reviews being submitted in one request,
     * each is validated individually prior to submission. Details of which entities
     * failed submission (if any) are available in the response object.
     *
     * A maximum of 1000 incidents can be submitted in one request.
     *
     * Only Connect apps that define the `jiraOperationsInfoProvider` module can
     * access this resource.
     * This resource requires the 'WRITE' scope for Connect apps.
     *
     * @returns Submission accepted. Each submitted Incident that is of a valid format will be eventually available in Jira.
     *
     * Details of which Incidents were submitted and which failed submission (due to data format problems etc.) are available in the response object.
     */
    submitEntity: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the Operations
       * Information module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
      /** Incident data to submit. */
      requestBody:
        | ({
            /**
             * Properties
             *
             * Properties assigned to incidents/components/review data that can then be used
             * for delete / query operations.
             *
             * Examples might be an account or user ID that can then be used to clean up data
             * if an account is removed from the Provider system.
             *
             * Properties are supplied as key/value pairs, and a maximum of 5 properties can
             * be supplied, keys cannot contain ':' or start with '_'.
             *
             * @example
             * {
             *   "accountId": "account-234",
             *   "projectId": "project-123"
             * }
             */
            properties?: {
              [key: string]: string;
            };
            /**
             * ProviderMetadata
             *
             * Information about the provider. This is useful for auditing, logging, debugging,
             * and other internal uses. It is not considered private information. Hence, it
             * may not contain personally
             * identifiable information.
             */
            providerMetadata?: {
              /**
               * An optional name of the source of the incidents.
               *
               * @example
               * Atlassian Operations Platform 2.1.0
               */
              product?: string;
            };
            incidents?: unknown[];
          } & {
            [key: string]: unknown;
          })
        | ({
            /**
             * Properties
             *
             * Properties assigned to incidents/components/review data that can then be used
             * for delete / query operations.
             *
             * Examples might be an account or user ID that can then be used to clean up data
             * if an account is removed from the Provider system.
             *
             * Properties are supplied as key/value pairs, and a maximum of 5 properties can
             * be supplied, keys cannot contain ':' or start with '_'.
             *
             * @example
             * {
             *   "accountId": "account-234",
             *   "projectId": "project-123"
             * }
             */
            properties?: {
              [key: string]: string;
            };
            /**
             * ProviderMetadata
             *
             * Information about the provider. This is useful for auditing, logging, debugging,
             * and other internal uses. It is not considered private information. Hence, it
             * may not contain personally
             * identifiable information.
             */
            providerMetadata?: {
              /**
               * An optional name of the source of the incidents.
               *
               * @example
               * Atlassian Operations Platform 2.1.0
               */
              product?: string;
            };
            reviews?: unknown[];
          } & {
            [key: string]: unknown;
          });
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/operations/1.0/bulk",
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
     * Insert Operations Workspace IDs to establish a relationship between them and
     * the Jira site the app is installed in. If a relationship between the Workspace
     * ID and Jira already exists then the workspace ID will be ignored and Jira will
     * process the rest of the entries.
     *
     * Only Connect apps that define the `jiraOperationsInfoProvider` module can
     * access this resource.
     * This resource requires the 'WRITE' scope for Connect apps.
     *
     * @returns Submission accepted. Each submitted Operations Workspace ID will be linked to Jira.
     */
    submitOperationsWorkspaces: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the Operations
       * module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
      /** Operations Workspace ids to submit. */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/operations/1.0/linkedWorkspaces/bulk",
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
    }
  };
}
