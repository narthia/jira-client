import type {
  IssueIdOrKeysAssociation,
  ServiceIdOrKeysAssociation,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * APIs related to integrating remote link data with Jira Software.
 *
 * These APIs are available to Atlassian Connect apps. To use these APIs you must
 * have the `jiraRemoteLinkInfoProvider` module in your Connect app's descriptor.
 * See https://developer.atlassian.com/cloud/jira/software/modules/remote-link/.
 *
 * These APIs are available to Forge apps with the `devops:remoteLinkInfoProvider`
 * module in the Forge app's manifest. See
 * https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-software-remote-link-info/.
 */
export default function remoteLinks<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Delete the Remote Link data currently stored for the given ID.
     *
     * Deletion is performed asynchronously. The `getRemoteLinkById` operation can be
     * used to confirm that data has been
     * deleted successfully (if needed).
     */
    deleteRemoteLinkById: async ({
      remoteLinkId,
      updateSequenceNumber,
      authorization,
      opts
    }: {
      /** The ID of the Remote Link to fetch. */
      remoteLinkId: string;
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
       * an on-premise integration that
       * corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraRemoteLinkInfoProvider` module it will be rejected with a 403.
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
        path: "/rest/remotelinks/1.0/remotelink/{remoteLinkId}",
        method: "DELETE",
        pathParams: {
          remoteLinkId
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
     * Bulk delete all Remote Links data that match the given request.
     *
     * One or more query params must be supplied to specify Properties to delete by.
     * Optional param `_updateSequenceNumber` is no longer supported. If more than one
     * Property is provided,
     * data will be deleted that matches ALL of the Properties (e.g. treated as an
     * AND).
     *
     * See the documentation for the `submitRemoteLinks` operation for more details.
     *
     * e.g. DELETE /bulkByProperties?accountId=account-123&repoId=repo-345
     *
     * Deletion is performed asynchronously. The `getRemoteLinkById` operation can be
     * used to confirm that data has been
     * deleted successfully (if needed).
     */
    deleteRemoteLinksByProperty: async ({
      updateSequenceNumber,
      params,
      authorization,
      opts
    }: {
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
       * If not provided, all stored data that matches the request will be deleted.
       *
       * @deprecated
       */
      updateSequenceNumber?: number;
      /**
       * Free-form query parameters to specify which properties to delete by. Properties
       * refer to the arbitrary
       * information the provider tagged Remote Links with previously.
       *
       * For example, if the provider previously tagged a remote link with accountId:
       *   "properties": {
       *     "accountId": "account-123"
       *   }
       *
       * And now they want to delete Remote Links in bulk by that specific accountId as
       * follows:
       * e.g. DELETE /bulkByProperties?accountId=account-123
       */
      params?: {
        [key: string]: unknown;
      };
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that
       * corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraRemoteLinkInfoProvider` module it will be rejected with a 403.
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
        path: "/rest/remotelinks/1.0/bulkByProperties",
        method: "DELETE",
        queryParams: {
          _updateSequenceNumber: updateSequenceNumber,
          ...params
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
     * Retrieve the currently stored Remote Link data for the given ID.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * @returns The Remote Link data currently stored for the given ID.
     */
    getRemoteLinkById: async ({
      remoteLinkId,
      authorization,
      opts
    }: {
      /** The ID of the Remote Link to fetch. */
      remoteLinkId: string;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that
       * corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraRemoteLinkInfoProvider` module it will be rejected with a 403.
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
        path: "/rest/remotelinks/1.0/remotelink/{remoteLinkId}",
        method: "GET",
        pathParams: {
          remoteLinkId
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
     * Update / insert Remote Link data.
     *
     * Remote Links are identified by their ID, existing Remote Link data for the same
     * ID will be replaced if it
     * exists and the updateSequenceId of existing data is less than the incoming data.
     *
     * Submissions are performed asynchronously. Submitted data will eventually be
     * available in Jira; most updates are
     * available within a short period of time, but may take some time during peak
     * load and/or maintenance times.
     * The `getRemoteLinkById` operation can be used to confirm that data has been
     * stored successfully (if needed).
     *
     * In the case of multiple Remote Links being submitted in one request, each is
     * validated individually prior to
     * submission. Details of which Remote LInk failed submission (if any) are
     * available in the response object.
     *
     * @returns Submission accepted. Each submitted Remote Link that is of a valid format will be eventually available in
     * Jira.
     *
     * Details of which Remote Links were submitted and which failed submission (due to data format problems etc.)
     * are available in the response object.
     */
    submitRemoteLinks: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with a Connect JWT token that corresponds to an app
       * installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraRemoteLinkInfoProvider` module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens.
       * See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
      /** Remote Links data to submit. */
      requestBody: {
        /**
         * Properties
         *
         * Properties assigned to Remote Link data that can then be used for delete /
         * query operations.
         *
         * Examples might be an account or user ID that can then be used to clean up data
         * if an account is removed from
         * the Provider system.
         *
         * Properties are supplied as key/value pairs, a maximum of 5 properties can be
         * supplied, and keys must not
         * contain ':' or start with '_'.
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
         * A list of Remote Links to submit to Jira.
         *
         * Each Remote Link may be associated with one or more Jira issue keys, and will
         * be associated with any properties
         * included in this request.
         */
        remoteLinks: unknown[];
        /**
         * ProviderMetadata
         *
         * Information about the provider. This is useful for auditing, logging,
         * debugging, and other internal uses. It is
         * not considered private information. Hence, it may not contain personally
         * identifiable information.
         */
        providerMetadata?: {
          /**
           * An optional name of the source of the Remote Links data.
           *
           * @example
           * Opsgenie 6.10.2
           */
          product?: string;
        } & {
          [key: string]: unknown;
        };
      } & {
        [key: string]: unknown;
      };
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<
        {
          /**
           * The IDs of Remote Links that have been accepted for submission.
           *
           * A Remote Link may be rejected if it was only associated with unknown issue
           * keys, unknown service IDs, or if
           * the submitted data for that Remote Link does not match the required schema.
           *
           * Note that a Remote Link that isn't updated due to it's `updateSequenceNumber`
           * being out of order is not
           * considered a failed submission.
           *
           * @example
           * ```
           * [
           *   "111-222-333",
           *   "444-555-666"
           * ]
           * ```
           */
          acceptedRemoteLinks?: string[];
          /**
           * Details of Remote Links that have not been accepted for submission, usually due
           * to a problem with the request data.
           *
           * A Remote Link may be rejected if it was only associated with unknown issue
           * keys, unknown service IDs, or
           * if the submitted data for the Remote Link does not match the required schema.
           *
           * The object (if present) will be keyed by Remote Link ID and include any errors
           * associated with that
           * Remote Link that have prevented it being submitted.
           */
          rejectedRemoteLinks?: {
            [key: string]: ({
              /** A human-readable message describing the error. */
              message: string;
              /**
               * An optional trace ID that can be used by Jira developers to locate the source
               * of the error.
               */
              errorTraceId?: string;
            } & {
              [key: string]: unknown;
            })[];
          };
          /**
           * Issue keys or services IDs or keys that are not known on this Jira instance (if
           * any).
           */
          unknownAssociations?: (IssueIdOrKeysAssociation | ServiceIdOrKeysAssociation)[];
        } & {
          [key: string]: unknown;
        }
      >
    > => {
      return jiraRequest({
        path: "/rest/remotelinks/1.0/bulk",
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
