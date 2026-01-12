import type {
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * APIs related to integrating feature flags with Jira Software.
 *
 * These APIs are available to Atlassian Connect apps. To use these APIs you must
 * have the `jiraFeatureFlagInfoProvider` module in your Connect app's descriptor.
 * See https://developer.atlassian.com/cloud/jira/software/modules/feature-flag/.
 *
 * These APIs are available to Forge apps with the
 * `devops:featureFlagInfoProvider` module in the Forge app's manifest. See
 * https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-software-feature-flag-info/.
 */
export default function featureFlags<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Delete the Feature Flag data currently stored for the given ID.
     *
     * Deletion is performed asynchronously. The getFeatureFlagById operation can be
     * used to confirm that data has been deleted successfully (if needed).
     */
    deleteFeatureFlagById: async ({
      featureFlagId,
      updateSequenceId,
      authorization,
      opts
    }: {
      /** The ID of the Feature Flag to delete. */
      featureFlagId: string;
      /**
       * This parameter usage is no longer supported.
       *
       * An optional `_updateSequenceId` to use to control deletion.
       *
       * Only stored data with an `updateSequenceId` less than or equal to that provided
       * will be deleted.
       * This can be used help ensure submit/delete requests are applied correctly if
       * issued close together.
       *
       * @deprecated
       */
      updateSequenceId?: number;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Feature Flags
       * module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/featureflags/0.1/flag/{featureFlagId}",
        method: "DELETE",
        pathParams: {
          featureFlagId
        },
        queryParams: {
          _updateSequenceId: updateSequenceId
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
     * Bulk delete all Feature Flags that match the given request.
     *
     * One or more query params must be supplied to specify Properties to delete by.
     * Optional param `_updateSequenceId` is no longer supported.
     * If more than one Property is provided, data will be deleted that matches ALL of
     * the Properties (e.g. treated as an AND).
     * See the documentation for the submitFeatureFlags operation for more details.
     *
     * e.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
     *
     * Deletion is performed asynchronously. The getFeatureFlagById operation can be
     * used to confirm that data has been deleted successfully (if needed).
     */
    deleteFeatureFlagsByProperty: async ({
      updateSequenceId,
      authorization,
      opts
    }: {
      /**
       * This parameter usage is no longer supported.
       *
       * An optional `_updateSequenceId` to use to control deletion.
       *
       * Only stored data with an `updateSequenceId` less than or equal to that provided
       * will be deleted.
       * This can be used help ensure submit/delete requests are applied correctly if
       * issued close together.
       *
       * If not provided, all stored data that matches the request will be deleted.
       *
       * @deprecated
       */
      updateSequenceId?: number;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Feature Flags
       * module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/featureflags/0.1/bulkByProperties",
        method: "DELETE",
        queryParams: {
          _updateSequenceId: updateSequenceId
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
     * Retrieve the currently stored Feature Flag data for the given ID.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * @returns The Feature Flag data currently stored for the given ID.
     */
    getFeatureFlagById: async ({
      featureFlagId,
      authorization,
      opts
    }: {
      /** The ID of the Feature Flag to fetch. */
      featureFlagId: string;
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Feature Flags
       * module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/featureflags/0.1/flag/{featureFlagId}",
        method: "GET",
        pathParams: {
          featureFlagId
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
     * Update / insert Feature Flag data.
     *
     * Feature Flags are identified by their ID, and existing Feature Flag data for
     * the same ID will be replaced if it exists and the updateSequenceId of existing
     * data is less than the incoming data.
     *
     * Submissions are performed asynchronously. Submitted data will eventually be
     * available in Jira; most updates are available within a short period of time,
     * but may take some time during peak load and/or maintenance times. The
     * getFeatureFlagById operation can be used to confirm that data has been stored
     * successfully (if needed).
     *
     * In the case of multiple Feature Flags being submitted in one request, each is
     * validated individually prior to submission. Details of which Feature Flags
     * failed submission (if any) are available in the response object.
     *
     * @returns Submission accepted. Each submitted Feature Flag that is of a valid format will be eventually available in Jira.
     *
     * Details of which Feature Flags were submitted and which failed submission (due to data format problems etc.) are available in the response object.
     */
    submitFeatureFlags: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to the
       * Provider app installed in Jira.
       *
       * If the JWT token corresponds to an app that does not define Feature Flags
       * module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details.
       */
      authorization: string;
      /** Feature Flag data to submit. */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/featureflags/0.1/bulk",
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
