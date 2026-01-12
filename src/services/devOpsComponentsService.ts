import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * APIs related to integrating Dev Ops Components affected by Incident data with
 * Jira Software.
 *
 * These APIs are available to Atlassian Connect apps. To use these APIs you must
 * have the `jiraDevOpsComponentProvider` in your Connect app's descriptor. See
 * https://developer.atlassian.com/cloud/jira/software/modules/devops-components/.
 */
export default function devOpsComponents<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Delete the Component data currently stored for the given ID.
     *
     * Deletion is performed asynchronously. The getComponentById operation can be
     * used to confirm that data has been deleted successfully (if needed).
     *
     * Only Connect apps that define the `jiraDevOpsComponentProvider` module can
     * access this resource.
     * This resource requires the 'DELETE' scope for Connect apps.
     */
    deleteComponentById: async ({
      componentId,
      authorization,
      opts
    }: {
      /** The ID of the Component to delete. */
      componentId: string;
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
        path: "/rest/devopscomponents/1.0/devopscomponents/{componentId}",
        method: "DELETE",
        pathParams: {
          componentId
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
     * Bulk delete all Components that match the given request.
     *
     * One or more query params must be supplied to specify Properties to delete by.
     * If more than one Property is provided, data will be deleted that matches ALL of
     * the Properties (e.g. treated as an AND).
     * See the documentation for the submitComponents operation for more details.
     *
     * e.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
     *
     * Deletion is performed asynchronously. The getComponentById operation can be
     * used to confirm that data has been deleted successfully (if needed).
     *
     * Only Connect apps that define the `jiraDevOpsComponentProvider` module can
     * access this resource.
     * This resource requires the 'DELETE' scope for Connect apps.
     */
    deleteComponentsByProperty: async ({
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
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/devopscomponents/1.0/bulkByProperties",
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
     * Retrieve the currently stored Component data for the given ID.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * Only Connect apps that define the `jiraDevOpsComponentProvider` module can
     * access this resource.
     * This resource requires the 'READ' scope for Connect apps.
     *
     * @returns The Component data currently stored for the given ID.
     */
    getComponentById: async ({
      componentId,
      authorization,
      opts
    }: {
      /** The ID of the Component to fetch. */
      componentId: string;
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
        path: "/rest/devopscomponents/1.0/devopscomponents/{componentId}",
        method: "GET",
        pathParams: {
          componentId
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
     * Update / insert DevOps Component data.
     *
     * Components are identified by their ID, and existing Component data for the same
     * ID will be replaced if it exists and the updateSequenceNumber of existing data
     * is less than the incoming data.
     *
     * Submissions are performed asynchronously. Submitted data will eventually be
     * available in Jira; most updates are available within a short period of time,
     * but may take some time during peak load and/or maintenance times. The
     * getComponentById operation can be used to confirm that data has been stored
     * successfully (if needed).
     *
     * In the case of multiple Components being submitted in one request, each is
     * validated individually prior to submission. Details of which Components failed
     * submission (if any) are available in the response object.
     *
     * A maximum of 1000 components can be submitted in one request.
     *
     * Only Connect apps that define the `jiraDevOpsComponentProvider` module can
     * access this resource.
     * This resource requires the 'WRITE' scope for Connect apps.
     *
     * @returns Submission accepted. Each submitted Component that is of a valid format will be eventually available in Jira.
     * Details of which Components were submitted and which failed submission (due to data format problems etc.) are available in the response object.
     */
    submitComponents: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define the DevOps
       * Information module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
      /** DevOps Component data to submit. */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/devopscomponents/1.0/bulk",
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
