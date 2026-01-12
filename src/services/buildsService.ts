import type {
  IssueIdOrKeysAssociation,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * APIs related to integrating build data with Jira Software.
 *
 * These APIs are available to Atlassian Connect apps. To use these APIs you must
 * have the `jiraBuildInfoProvider` module in your Connect app's descriptor. See
 * https://developer.atlassian.com/cloud/jira/software/modules/build/. They are
 * also related to integrating Jira Software Cloud with on-premises tools using
 * OAuth 2.0 credentials. See
 * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/.
 *
 * These APIs are available to Forge apps with the `devops:buildInfoProvider`
 * module in the Forge app's manifest. See
 * https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-software-build-info/.
 */
export default function builds<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Delete the build data currently stored for the given `pipelineId` and
     * `buildNumber` combination.
     *
     * Deletion is performed asynchronously. The `getBuildByKey` operation can be used
     * to confirm that data has been
     * deleted successfully (if needed).
     */
    deleteBuildByKey: async ({
      pipelineId,
      buildNumber,
      updateSequenceNumber,
      authorization,
      opts
    }: {
      /** The `pipelineId` of the build to delete. */
      pipelineId: string;
      /** The `buildNumber` of the build to delete. */
      buildNumber: number;
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
       * `jiraBuildInfoProvider` module it will be rejected with a 403.
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
        path: "/rest/builds/0.1/pipelines/{pipelineId}/builds/{buildNumber}",
        method: "DELETE",
        pathParams: {
          pipelineId,
          buildNumber
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
     * Bulk delete all builds data that match the given request.
     *
     * One or more query params must be supplied to specify Properties to delete by.
     * Optional param `_updateSequenceNumber` is no longer supported.
     * If more than one Property is provided, data will be deleted that matches ALL of
     * the
     * Properties (e.g. treated as an AND).
     *
     * See the documentation for the `submitBuilds` operation for more details.
     *
     * e.g. DELETE /bulkByProperties?accountId=account-123&repoId=repo-345
     *
     * Deletion is performed asynchronously. The `getBuildByKey` operation can be used
     * to confirm that data has been
     * deleted successfully (if needed).
     */
    deleteBuildsByProperty: async ({
      updateSequenceNumber,
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
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraBuildInfoProvider` module it will be rejected with a 403.
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
        path: "/rest/builds/0.1/bulkByProperties",
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
     * Retrieve the currently stored build data for the given `pipelineId` and
     * `buildNumber` combination.
     *
     * The result will be what is currently stored, ignoring any pending updates or
     * deletes.
     *
     * @returns The build data currently stored for the given key.
     */
    getBuildByKey: async ({
      pipelineId,
      buildNumber,
      authorization,
      opts
    }: {
      /** The `pipelineId` of the build. */
      pipelineId: string;
      /** The `buildNumber` of the build. */
      buildNumber: number;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraBuildInfoProvider` module it will be rejected with a 403.
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
        path: "/rest/builds/0.1/pipelines/{pipelineId}/builds/{buildNumber}",
        method: "GET",
        pathParams: {
          pipelineId,
          buildNumber
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
     * Update / insert builds data.
     *
     * Builds are identified by the combination of `pipelineId` and `buildNumber`, and
     * existing build data for the same
     * build will be replaced if it exists and the `updateSequenceNumber` of the
     * existing data is less than the
     * incoming data.
     *
     * Submissions are performed asynchronously. Submitted data will eventually be
     * available in Jira; most updates are
     * available within a short period of time, but may take some time during peak
     * load and/or maintenance times.
     * The `getBuildByKey` operation can be used to confirm that data has been stored
     * successfully (if needed).
     *
     * In the case of multiple builds being submitted in one request, each is
     * validated individually prior to
     * submission. Details of which build failed submission (if any) are available in
     * the response object.
     *
     * @returns Submission accepted. Each submitted build that is of a valid format will be eventually available in Jira.
     *
     * Details of which builds were submitted and which failed submission (due to data format problems etc.)
     * are available in the response object.
     */
    submitBuilds: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira.
       *
       * If the Connect JWT token corresponds to an app that does not define
       * `jiraBuildInfoProvider` module it will be rejected with a 403.
       *
       * See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens.
       * See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
      /** Builds data to submit. */
      requestBody: {
        /**
         * Properties
         *
         * Properties assigned to build data that can then be used for delete / query
         * operations.
         *
         * Examples might be an account or user ID that can then be used to clean up data
         * if an account is removed from
         * the Provider system.
         *
         * Note that these properties will never be returned with build data. They are not
         * intended for use as
         * metadata to associate with a build. Internally they are stored as a hash so
         * that personal information etc.
         * is never stored within Jira.
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
         * A list of builds to submit to Jira.
         *
         * Each build may be associated with one or more Jira issue keys, and will be
         * associated with any properties
         * included in this request.
         */
        builds: unknown[];
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
           * An optional name of the source of the builds data.
           *
           * @example
           * Bamboo 6.10.2
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
           * The keys of builds that have been accepted for submission. A build key is a
           * composite key that consists of
           * `pipelineId` and `buildNumber`.
           *
           * A build may be rejected if it was only associated with unknown issue keys, or
           * if the submitted data for that
           * build does not match the required schema.
           *
           * Note that a build that isn't updated due to it's `updateSequenceNumber` being
           * out of order is not
           * considered a failed submission.
           */
          acceptedBuilds?: ({
            /**
             * An ID that relates a sequence of builds. Depending on your system this might be
             * a project ID, pipeline ID,
             * plan key etc. - whatever logical unit you use to group a sequence of builds.
             *
             * The combination of `pipelineId` and `buildNumber` must uniquely identify the
             * build.
             *
             * @example
             * my-build-plan
             */
            pipelineId: string;
            /**
             * Identifies a build within the sequence of builds identified by the build
             * `pipelineId`.
             *
             * Used to identify the 'most recent' build in that sequence of builds.
             *
             * The combination of `pipelineId` and `buildNumber` must uniquely identify the
             * build.
             *
             * @example
             * 16
             */
            buildNumber: number;
          } & {
            [key: string]: unknown;
          })[];
          /**
           * Details of builds that have not been accepted for submission.
           *
           * A build may be rejected if it was only associated with unknown issue keys, or
           * if the submitted data for the
           * build does not match the required schema.
           */
          rejectedBuilds?: ({
            /**
             * BuildKey
             *
             * Fields that uniquely reference a build.
             */
            key: {
              /**
               * An ID that relates a sequence of builds. Depending on your system this might be
               * a project ID, pipeline ID,
               * plan key etc. - whatever logical unit you use to group a sequence of builds.
               *
               * The combination of `pipelineId` and `buildNumber` must uniquely identify the
               * build.
               *
               * @example
               * my-build-plan
               */
              pipelineId: string;
              /**
               * Identifies a build within the sequence of builds identified by the build
               * `pipelineId`.
               *
               * Used to identify the 'most recent' build in that sequence of builds.
               *
               * The combination of `pipelineId` and `buildNumber` must uniquely identify the
               * build.
               *
               * @example
               * 16
               */
              buildNumber: number;
            } & {
              [key: string]: unknown;
            };
            /** The error messages for the rejected build */
            errors: ({
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
          } & {
            [key: string]: unknown;
          })[];
          /**
           * Issue keys that are not known on this Jira instance (if any).
           *
           * These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as
           * a Jira issue key), or they
           * may be for projects that no longer exist.
           *
           * If a build has been associated with issue keys other than those in this array
           * it will still be stored against
           * those valid keys. If a build was only associated with issue keys deemed to be
           * invalid it won't be persisted.
           */
          unknownIssueKeys?: string[];
          /**
           * Associations that are not known on this Jira instance (if any).
           *
           * These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as
           * a Jira issue key), or they may be for projects that no longer exist.
           *
           * If a build has been associated with any other association other than those in
           * this array it will still be stored against those valid associations.
           * If a build was only associated with the associations in this array, it is
           * deemed to be invalid and it won't be persisted.
           */
          unknownAssociations?: IssueIdOrKeysAssociation[];
        } & {
          [key: string]: unknown;
        }
      >
    > => {
      return jiraRequest({
        path: "/rest/builds/0.1/bulk",
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
