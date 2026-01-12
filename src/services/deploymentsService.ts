import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * APIs related to integrating deployment data with Jira Software.
 *
 * These APIs are available to Atlassian Connect apps. To use these APIs you must
 * have the `jiraDeploymentInfoProvider` module in your Connect app's descriptor.
 * See https://developer.atlassian.com/cloud/jira/software/modules/deployment/.
 * They are also related to integrating Jira Software Cloud with on-premises tools
 * using OAuth 2.0 credentials. See
 * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/.
 *
 * These APIs are available to Forge apps with the `devops:deploymentInfoProvider`
 * module in the Forge app's manifest. See
 * https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-software-deployment-info/.
 */
export default function deployments<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Delete the currently stored deployment data for the given `pipelineId`,
     * `environmentId` and `deploymentSequenceNumber` combination.
     *
     * Deletion is performed asynchronously. The `getDeploymentByKey` operation can be
     * used to confirm that data has been deleted successfully (if needed).
     */
    deleteDeploymentByKey: async ({
      pipelineId,
      environmentId,
      deploymentSequenceNumber,
      updateSequenceNumber,
      authorization,
      opts
    }: {
      /** The ID of the deployment's pipeline. */
      pipelineId: string;
      /** The ID of the deployment's environment. */
      environmentId: string;
      /** The deployment's deploymentSequenceNumber. */
      deploymentSequenceNumber: number;
      /**
       * This parameter usage is no longer supported.
       *
       * An optional `_updateSequenceNumber` to use to control deletion.
       *
       * Only stored data with an `updateSequenceNumber` less than or equal to that
       * provided will be deleted.
       * This can be used help ensure submit/delete requests are applied correctly if
       * issued close together.
       *
       * @deprecated
       */
      updateSequenceNumber?: number;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraDeploymentInfoProvider` module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens.
       * See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/deployments/0.1/pipelines/{pipelineId}/environments/{environmentId}/deployments/{deploymentSequenceNumber}",
        method: "DELETE",
        pathParams: {
          pipelineId,
          environmentId,
          deploymentSequenceNumber
        },
        queryParams: {
          _updateSequenceNumber: updateSequenceNumber
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
     * Bulk delete all deployments that match the given request.
     *
     * One or more query params must be supplied to specify the Properties to delete
     * by. Optional param `_updateSequenceNumber` is no longer supported.
     * If more than one Property is provided, data will be deleted that matches ALL of
     * the Properties (i.e. treated as AND).
     * See the documentation for the `submitDeployments` operation for more details.
     *
     * Example operation: DELETE
     * /bulkByProperties?accountId=account-123&createdBy=user-456
     *
     * Deletion is performed asynchronously. The `getDeploymentByKey` operation can be
     * used to confirm that data has been deleted successfully (if needed).
     */
    deleteDeploymentsByProperty: async ({
      updateSequenceNumber,
      authorization,
      opts
    }: {
      /**
       * This parameter usage is no longer supported.
       *
       * An optional `updateSequenceNumber` to use to control deletion.
       *
       * Only stored data with an `updateSequenceNumber` less than or equal to that
       * provided will be deleted.
       * This can be used help ensure submit/delete requests are applied correctly if
       * issued close together.
       *
       * If not provided, all stored data that matches the request will be deleted.
       *
       * @deprecated
       */
      updateSequenceNumber?: number;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraDeploymentInfoProvider` module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens.
       * See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/deployments/0.1/bulkByProperties",
        method: "DELETE",
        queryParams: {
          _updateSequenceNumber: updateSequenceNumber
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
     * Retrieve the currently stored deployment data for the given `pipelineId`,
     * `environmentId` and `deploymentSequenceNumber` combination.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * @returns The deployment data currently stored for the given ID.
     */
    getDeploymentByKey: async ({
      pipelineId,
      environmentId,
      deploymentSequenceNumber,
      authorization,
      opts
    }: {
      /** The ID of the deployment's pipeline. */
      pipelineId: string;
      /** The ID of the deployment's environment. */
      environmentId: string;
      /** The deployment's deploymentSequenceNumber. */
      deploymentSequenceNumber: number;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraDeploymentInfoProvider` module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens.
       * See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/deployments/0.1/pipelines/{pipelineId}/environments/{environmentId}/deployments/{deploymentSequenceNumber}",
        method: "GET",
        pathParams: {
          pipelineId,
          environmentId,
          deploymentSequenceNumber
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
     * Retrieve the  Deployment gating status for the given `pipelineId +
     * environmentId + deploymentSequenceNumber` combination.
     * Only apps that define the `jiraDeploymentInfoProvider` module can access this
     * resource. This resource requires the 'READ' scope.
     *
     * @returns The current gating status for the given Deployment
     */
    getDeploymentGatingStatusByKey: async ({
      pipelineId,
      environmentId,
      deploymentSequenceNumber,
      opts
    }: {
      /** The ID of the Deployment's pipeline. */
      pipelineId: string;
      /** The ID of the Deployment's environment. */
      environmentId: string;
      /** The Deployment's deploymentSequenceNumber. */
      deploymentSequenceNumber: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/deployments/0.1/pipelines/{pipelineId}/environments/{environmentId}/deployments/{deploymentSequenceNumber}/gating-status",
        method: "GET",
        pathParams: {
          pipelineId,
          environmentId,
          deploymentSequenceNumber
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Update / insert deployment data.
     *
     * Deployments are identified by the combination of `pipelineId`, `environmentId`
     * and `deploymentSequenceNumber`, and existing deployment data for the same
     * deployment will be replaced if it exists and the `updateSequenceNumber` of
     * existing data is less than the incoming data.
     *
     * Submissions are processed asynchronously. Submitted data will eventually be
     * available in Jira. Most updates are available within a short period of time,
     * but may take some time during peak load and/or maintenance times. The
     * `getDeploymentByKey` operation can be used to confirm that data has been stored
     * successfully (if needed).
     *
     * In the case of multiple deployments being submitted in one request, each is
     * validated individually prior to submission. Details of which deployments failed
     * submission (if any) are available in the response object.
     *
     * @returns Submission accepted. Each submitted deployment that is of a valid format will eventually be available in Jira.
     *
     * Details of which deployments were submitted and which failed submission (due to data format problems etc.) are available in the response object.
     */
    submitDeployments: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraDeploymentInfoProvider` module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens.
       * See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
      /** Deployment data to submit. */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/deployments/0.1/bulk",
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
