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
 * APIs related to integrating development information (commits, branches and pull
 * requests) with Jira.
 *
 * These APIs are available to Atlassian Connect apps and on-premise integrations
 * using OAuth. Connect apps using these APIs must have the `jiraDevelopmentTool`
 * module in the Connect app descriptor. See
 * https://developer.atlassian.com/cloud/jira/software/modules/development-tool/.
 * For more details on integrating Jira Software Cloud with on-premises tools
 * using OAuth 2.0 credentials, see
 * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/.
 *
 * These APIs are available to Forge apps with the
 * `devops:developmentInfoProvider` module in the Forge app's manifest. See
 * https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-software-development-info/.
 */
export default function developmentInformation<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes development information entities which have all the provided
     * properties. Repositories which have properties that match ALL of the properties
     * (i.e. treated as an AND), and all their related development information (such
     * as commits, branches and pull requests), will be deleted. For example if
     * request is `DELETE bulk?accountId=123&projectId=ABC` entities which have
     * properties `accountId=123` and `projectId=ABC` will be deleted. Optional param
     * `_updateSequenceId` is no longer supported. Deletion is performed
     * asynchronously: specified entities will eventually be removed from Jira.
     */
    deleteByProperties: async ({
      updateSequenceId,
      authorization,
      opts
    }: {
      /**
       * An optional property to use to control deletion. Only stored data with an
       * updateSequenceId less than or equal to that provided will be deleted. This can
       * be used to help ensure submit/delete requests are applied correctly if they are
       * issued close together.
       */
      updateSequenceId?: number;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira. If the
       * JWT token corresponds to a Connect app that does not define the
       * jiraDevelopmentTool module it will be rejected with a 403. See
       * https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens. See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/devinfo/0.10/bulkByProperties",
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
     * Deletes particular development information entity. Deletion is performed
     * asynchronously.
     */
    deleteEntity: async ({
      repositoryId,
      entityType,
      entityId,
      updateSequenceId,
      authorization,
      opts
    }: {
      repositoryId: string;
      entityType: "commit" | "branch" | "pull_request";
      entityId: string;
      /**
       * An optional property to use to control deletion. Only stored data with an
       * updateSequenceId less than or equal to that provided will be deleted. This can
       * be used to help ensure submit/delete requests are applied correctly if they are
       * issued close together.
       */
      updateSequenceId?: number;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira. If the
       * JWT token corresponds to a Connect app that does not define the
       * jiraDevelopmentTool module it will be rejected with a 403. See
       * https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens. See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/devinfo/0.10/repository/{repositoryId}/{entityType}/{entityId}",
        method: "DELETE",
        pathParams: {
          repositoryId,
          entityType,
          entityId
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
     * Deletes the repository data stored by the given ID and all related development
     * information entities. Deletion is performed asynchronously.
     */
    deleteRepository: async ({
      repositoryId,
      updateSequenceId,
      authorization,
      opts
    }: {
      /** The ID of repository to delete */
      repositoryId: string;
      /**
       * An optional property to use to control deletion. Only stored data with an
       * updateSequenceId less than or equal to that provided will be deleted. This can
       * be used to help ensure submit/delete requests are applied correctly if they are
       * issued close together.
       */
      updateSequenceId?: number;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira. If the
       * JWT token corresponds to a Connect app that does not define the
       * jiraDevelopmentTool module it will be rejected with a 403. See
       * https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens. See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/devinfo/0.10/repository/{repositoryId}",
        method: "DELETE",
        pathParams: {
          repositoryId
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
     * Checks if repositories which have all the provided properties exists. For
     * example, if request is `GET existsByProperties?accountId=123&projectId=ABC`
     * then result will be positive only if there is at least one repository with both
     * properties `accountId=123` and `projectId=ABC`. Special property
     * `_updateSequenceId` can be used to filter all entities with updateSequenceId
     * less or equal than the value specified. In addition to the optional
     * `_updateSequenceId`, one or more query params must be supplied to specify
     * properties to search by.
     *
     * @returns Returns whether data exists for the specified properties.
     */
    existsByProperties: async ({
      updateSequenceId,
      authorization,
      opts
    }: {
      /**
       * An optional property. Filters out entities and repositories which have
       * updateSequenceId greater than specified.
       */
      updateSequenceId?: number;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira. If the
       * JWT token corresponds to a Connect app that does not define the
       * jiraDevelopmentTool module it will be rejected with a 403. See
       * https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens. See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<
        {
          /** Whether there is data matching the query */
          hasDataMatchingProperties?: boolean;
        } & {
          [key: string]: unknown;
        }
      >
    > => {
      return jiraRequest({
        path: "/rest/devinfo/0.10/existsByProperties",
        method: "GET",
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
        isResponseAvailable: true
      });
    },
    /**
     * For the specified repository ID, retrieves the repository and the most recent
     * 400 development information entities. The result will be what is currently
     * stored, ignoring any pending updates or deletes.
     *
     * @returns The repository data currently stored for the given ID.
     */
    getRepository: async ({
      repositoryId,
      authorization,
      opts
    }: {
      /** The ID of repository to fetch */
      repositoryId: string;
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira. If the
       * JWT token corresponds to a Connect app that does not define the
       * jiraDevelopmentTool module it will be rejected with a 403. See
       * https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens. See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<
        {
          /**
           * The name of this repository. Max length is 255 characters.
           *
           * @example
           * atlassian-connect-jira-example
           */
          name: string;
          /**
           * Description of this repository. Max length is 1024 characters.
           *
           * @example
           * The repository which stores code of the Atlassian Connect Add-on Devinfo application.
           */
          description?: string;
          /**
           * The ID of the repository this repository was forked from, if it's a fork. Max
           * length is 1024 characters.
           *
           * @example
           * 56c7c750-cee2-48e2-b920-d7706dfd11f7
           */
          forkOf?: string;
          /**
           * The URL of this repository. Max length is 2000 characters.
           *
           * @example
           * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example
           */
          url: string;
          /**
           * List of commits to update in this repository. Must not contain duplicate entity
           * IDs. Maximum number of commits is 400
           */
          commits?: ({
            /**
             * The identifier or hash of the commit. Will be used for cross entity linking.
             * Must be unique for all commits within a repository, i.e., only one commit can
             * have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to
             * repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are
             * allowed. Max length is 1024 characters
             *
             * @example
             * a7727ee6350c33cdf90826dc21abaa26a5704370
             */
            id: string;
            /**
             * List of issues keys that this entity is associated with. They must be valid
             * Jira issue keys.
             *
             * @deprecated
             * @example
             * ```
             * [
             *   "ISSUE-1",
             *   "TEST-2"
             * ]
             * ```
             */
            issueKeys?: string[];
            /** The Jira issue keys or IDs to associate the commit with. */
            associations?: IssueIdOrKeysAssociation[];
            /**
             * An ID used to apply an ordering to updates for this entity in the case of
             * out-of-order receipt of update requests. This can be any monotonically
             * increasing number. A suggested implementation is to use epoch millis from the
             * provider system, but other alternatives are valid (e.g. a provider could store
             * a counter against each entity and increment that on each update to Jira).
             * Updates for an entity that are received with an updateSqeuenceId lower than
             * what is currently stored will be ignored.
             *
             * @example
             * 1523494301248
             */
            updateSequenceId: number;
            /** Deprecated. Use the id field instead. */
            hash?: string;
            /**
             * The set of flags for this commit
             *
             * @example
             * [MERGE_COMMIT]
             */
            flags?: "MERGE_COMMIT"[];
            /**
             * The commit message. Max length is 1024 characters. If anything longer is
             * supplied, it will be truncated down to 1024 characters.
             *
             * @example
             * README.md edited online with Bitbucket
             */
            message: string;
            /**
             * Author
             *
             * Describes the author of a particular entity
             */
            author: {
              /**
               * Deprecated. The name of this user in a format suitable for display. Max length
               * is 255 characters.
               *
               * @example
               * Jane Doe
               */
              name?: string;
              /**
               * The email address of the user. Used to associate the user with a Jira user. Max
               * length is 255 characters.
               *
               * @example
               * jane_doe@atlassian.com
               */
              email?: string;
              /**
               * Deprecated. The username of the user. Used to associate the user with a Jira
               * user if there are multiple users for a given email. Max length is 255
               * characters.
               *
               * @example
               * jdoe
               */
              username?: string;
              /**
               * Deprecated. The URL of the profile for this user. Max length is 2000 characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe
               */
              url?: string;
              /**
               * Deprecated. The URL of the avatar for this user. Max length is 2000 characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe/avatar/32
               */
              avatar?: string;
            } & {
              [key: string]: unknown;
            };
            /**
             * The total number of files added, removed, or modified by this commit
             *
             * @example
             * 1
             */
            fileCount: number;
            /**
             * The URL of this commit. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/commits/a7727ee6350c33cdf90826dc21abaa26a5704370
             */
            url: string;
            /**
             * List of file changes. Max number of files is 10. Currently, only the first 5
             * files are shown (sorted by path) in the UI. This UI behavior may change without
             * notice.
             */
            files?: ({
              /**
               * The path of the file. Max length is 1024 characters.
               *
               * @example
               * /home/user/src/atlassian-connect-jira-example/README.md
               */
              path: string;
              /**
               * The URL of this file. Max length is 2000 characters.
               *
               * @example
               * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/src/a7727ee6350c33cdf90826dc21abaa26a5704370/README.md
               */
              url: string;
              /**
               * The operation performed on this file
               *
               * @example
               * MODIFIED
               */
              changeType: "ADDED" | "COPIED" | "DELETED" | "MODIFIED" | "MOVED" | "UNKNOWN";
              /**
               * Number of lines added to the file
               *
               * @example
               * 0
               */
              linesAdded: number;
              /**
               * Number of lines removed from the file
               *
               * @example
               * 1
               */
              linesRemoved: number;
            } & {
              [key: string]: unknown;
            })[];
            /**
             * The author timestamp of this commit. Formatted as a UTC ISO 8601 date time
             * format.
             *
             * @example
             * 2016-10-31T23:27:25+00:00
             */
            authorTimestamp: string;
            /**
             * Shortened identifier for this commit, used for display. Max length is 255
             * characters.
             *
             * @example
             * a7727ee
             */
            displayId: string;
          } & {
            [key: string]: unknown;
          })[];
          /**
           * List of branches to update in this repository. Must not contain duplicate
           * entity IDs. Maximum number of branches is 400.
           */
          branches?: ({
            /**
             * The ID of this entity. Will be used for cross entity linking. Must be unique by
             * entity type within a repository, i.e., only one commit can have ID 'X' in
             * repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is
             * acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length
             * is 1024 characters.
             *
             * @example
             * c6c7c750-cee2-48e2-b920-d7706dfd11f9
             */
            id: string;
            /**
             * List of issues keys that this entity is associated with. They must be valid
             * Jira issue keys.
             *
             * @deprecated
             * @example
             * ```
             * [
             *   "ISSUE-1",
             *   "TEST-2"
             * ]
             * ```
             */
            issueKeys?: string[];
            /** The Jira issue keys or IDs to associate the branch with. */
            associations?: IssueIdOrKeysAssociation[];
            /**
             * An ID used to apply an ordering to updates for this entity in the case of
             * out-of-order receipt of update requests. This can be any monotonically
             * increasing number. A suggested implementation is to use epoch millis from the
             * provider system, but other alternatives are valid (e.g. a provider could store
             * a counter against each entity and increment that on each update to Jira).
             * Updates for an entity that are received with an updateSqeuenceId lower than
             * what is currently stored will be ignored.
             *
             * @example
             * 1523494301248
             */
            updateSequenceId: number;
            /**
             * The name of the branch. Max length is 512 characters.
             *
             * @example
             * master
             */
            name: string;
            /**
             * Commit
             *
             * Represents a commit in the version control system.
             */
            lastCommit: {
              /**
               * The identifier or hash of the commit. Will be used for cross entity linking.
               * Must be unique for all commits within a repository, i.e., only one commit can
               * have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to
               * repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are
               * allowed. Max length is 1024 characters
               *
               * @example
               * a7727ee6350c33cdf90826dc21abaa26a5704370
               */
              id: string;
              /**
               * List of issues keys that this entity is associated with. They must be valid
               * Jira issue keys.
               *
               * @example
               * ```
               * [
               *   "ISSUE-1",
               *   "TEST-2"
               * ]
               * ```
               */
              issueKeys: string[];
              /**
               * An ID used to apply an ordering to updates for this entity in the case of
               * out-of-order receipt of update requests. This can be any monotonically
               * increasing number. A suggested implementation is to use epoch millis from the
               * provider system, but other alternatives are valid (e.g. a provider could store
               * a counter against each entity and increment that on each update to Jira).
               * Updates for an entity that are received with an updateSqeuenceId lower than
               * what is currently stored will be ignored.
               *
               * @example
               * 1523494301248
               */
              updateSequenceId: number;
              /** Deprecated. Use the id field instead. */
              hash?: string;
              /**
               * The set of flags for this commit
               *
               * @example
               * [MERGE_COMMIT]
               */
              flags?: "MERGE_COMMIT"[];
              /**
               * The commit message. Max length is 1024 characters. If anything longer is
               * supplied, it will be truncated down to 1024 characters.
               *
               * @example
               * README.md edited online with Bitbucket
               */
              message: string;
              /**
               * Author
               *
               * Describes the author of a particular entity
               */
              author: {
                /**
                 * Deprecated. The name of this user in a format suitable for display. Max length
                 * is 255 characters.
                 *
                 * @example
                 * Jane Doe
                 */
                name?: string;
                /**
                 * The email address of the user. Used to associate the user with a Jira user. Max
                 * length is 255 characters.
                 *
                 * @example
                 * jane_doe@atlassian.com
                 */
                email?: string;
                /**
                 * Deprecated. The username of the user. Used to associate the user with a Jira
                 * user if there are multiple users for a given email. Max length is 255
                 * characters.
                 *
                 * @example
                 * jdoe
                 */
                username?: string;
                /**
                 * Deprecated. The URL of the profile for this user. Max length is 2000 characters.
                 *
                 * @example
                 * https://atlassian.com/account/jane_doe
                 */
                url?: string;
                /**
                 * Deprecated. The URL of the avatar for this user. Max length is 2000 characters.
                 *
                 * @example
                 * https://atlassian.com/account/jane_doe/avatar/32
                 */
                avatar?: string;
              } & {
                [key: string]: unknown;
              };
              /**
               * The total number of files added, removed, or modified by this commit
               *
               * @example
               * 1
               */
              fileCount: number;
              /**
               * The URL of this commit. Max length is 2000 characters.
               *
               * @example
               * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/commits/a7727ee6350c33cdf90826dc21abaa26a5704370
               */
              url: string;
              /**
               * List of file changes. Max number of files is 10. Currently, only the first 5
               * files are shown (sorted by path) in the UI. This UI behavior may change without
               * notice.
               */
              files?: ({
                /**
                 * The path of the file. Max length is 1024 characters.
                 *
                 * @example
                 * /home/user/src/atlassian-connect-jira-example/README.md
                 */
                path: string;
                /**
                 * The URL of this file. Max length is 2000 characters.
                 *
                 * @example
                 * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/src/a7727ee6350c33cdf90826dc21abaa26a5704370/README.md
                 */
                url: string;
                /**
                 * The operation performed on this file
                 *
                 * @example
                 * MODIFIED
                 */
                changeType: "ADDED" | "COPIED" | "DELETED" | "MODIFIED" | "MOVED" | "UNKNOWN";
                /**
                 * Number of lines added to the file
                 *
                 * @example
                 * 0
                 */
                linesAdded: number;
                /**
                 * Number of lines removed from the file
                 *
                 * @example
                 * 1
                 */
                linesRemoved: number;
              } & {
                [key: string]: unknown;
              })[];
              /**
               * The author timestamp of this commit. Formatted as a UTC ISO 8601 date time
               * format.
               *
               * @example
               * 2016-10-31T23:27:25+00:00
               */
              authorTimestamp: string;
              /**
               * Shortened identifier for this commit, used for display. Max length is 255
               * characters.
               *
               * @example
               * a7727ee
               */
              displayId: string;
            } & {
              [key: string]: unknown;
            };
            /**
             * The URL of the page for creating a pull request from this branch. Max length is
             * 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/pull-requests/new
             */
            createPullRequestUrl?: string;
            /**
             * The URL of the branch. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/branch/master
             */
            url: string;
          } & {
            [key: string]: unknown;
          })[];
          /**
           * List of pull requests to update in this repository. Must not contain duplicate
           * entity IDs. Maximum number of pull requests is 400
           */
          pullRequests?: ({
            /**
             * The ID of this entity. Will be used for cross entity linking. Must be unique by
             * entity type within a repository, i.e., only one commit can have ID 'X' in
             * repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is
             * acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length
             * is 1024 characters
             *
             * @example
             * c6c7c750-cee2-48e2-b920-d7706dfd11f9
             */
            id: string;
            /**
             * List of issues keys that this entity is associated with. They must be valid
             * Jira issue keys.
             *
             * @deprecated
             * @example
             * ```
             * [
             *   "ISSUE-1",
             *   "TEST-2"
             * ]
             * ```
             */
            issueKeys?: string[];
            /** The Jira issue keys or IDs to associate the pull request with. */
            associations?: IssueIdOrKeysAssociation[];
            /**
             * An ID used to apply an ordering to updates for this entity in the case of
             * out-of-order receipt of update requests. This can be any monotonically
             * increasing number. A suggested implementation is to use epoch millis from the
             * provider system, but other alternatives are valid (e.g. a provider could store
             * a counter against each entity and increment that on each update to Jira).
             * Updates for an entity that are received with an updateSqeuenceId lower than
             * what is currently stored will be ignored.
             *
             * @example
             * 1523494301248
             */
            updateSequenceId: number;
            /**
             * The status of the pull request. In the case of concurrent updates, priority is
             * given in the order OPEN, MERGED, DECLINED, UNKNOWN
             *
             * @example
             * OPEN
             */
            status: "OPEN" | "MERGED" | "DECLINED" | "UNKNOWN";
            /**
             * Title of the pull request. Max length is 1024 characters.
             *
             * @example
             * Pull request 2, fixing all the issues caused by pull request #1
             */
            title: string;
            /**
             * Author
             *
             * Describes the author of a particular entity
             */
            author: {
              /**
               * Deprecated. The name of this user in a format suitable for display. Max length
               * is 255 characters.
               *
               * @example
               * Jane Doe
               */
              name?: string;
              /**
               * The email address of the user. Used to associate the user with a Jira user. Max
               * length is 255 characters.
               *
               * @example
               * jane_doe@atlassian.com
               */
              email?: string;
              /**
               * Deprecated. The username of the user. Used to associate the user with a Jira
               * user if there are multiple users for a given email. Max length is 255
               * characters.
               *
               * @example
               * jdoe
               */
              username?: string;
              /**
               * Deprecated. The URL of the profile for this user. Max length is 2000 characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe
               */
              url?: string;
              /**
               * Deprecated. The URL of the avatar for this user. Max length is 2000 characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe/avatar/32
               */
              avatar?: string;
            } & {
              [key: string]: unknown;
            };
            /**
             * The number of comments on the pull request
             *
             * @example
             * 42
             */
            commentCount: number;
            /**
             * The name of the source branch of this PR. Max length is 255 characters.
             *
             * @example
             * ISSUE-1-feature-branch
             */
            sourceBranch: string;
            /**
             * The url of the source branch of this PR. This is used to match this PR against
             * the branch. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/branch/ISSUE-1-feature-branch
             */
            sourceBranchUrl?: string;
            /**
             * The most recent update to this PR. Formatted as a UTC ISO 8601 date time format.
             *
             * @example
             * 2016-10-31T23:27:25+00:00
             */
            lastUpdate: string;
            /**
             * The name of destination branch of this PR. Max length is 255 characters.
             *
             * @example
             * master
             */
            destinationBranch?: string;
            /**
             * The url of the destination branch of this PR. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/src/master
             */
            destinationBranchUrl?: string;
            /** The list of reviewers of this pull request */
            reviewers?: ({
              /**
               * Deprecated. The name of this reviewer. Max length is 255 characters.
               *
               * @example
               * Jane Doe
               */
              name?: string;
              /**
               * The approval status of this reviewer, default is UNAPPROVED.
               *
               * @example
               * APPROVED
               */
              approvalStatus?: "APPROVED" | "UNAPPROVED";
              /**
               * Deprecated. The URL of the profile for this reviewer. Max length is 2000
               * characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe
               */
              url?: string;
              /**
               * Deprecated. The URL of the avatar for this reviewer. Max length is 2000
               * characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe/avatar/32
               */
              avatar?: string;
              /**
               * The email address of this reviewer. Max length is 254 characters.
               *
               * @example
               * jane_doe@example.com
               */
              email?: string;
              /**
               * The Atlassian Account ID (AAID) of this reviewer. Max length is 128 characters.
               *
               * @example
               * 655363:e4ca5e2d-a901-40e3-877e-bf5d22c0f130
               */
              accountId?: string;
            } & {
              [key: string]: unknown;
            })[];
            /**
             * The URL of this pull request. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/pull-requests/2
             */
            url: string;
            /**
             * Shortened identifier for this pull request, used for display. Max length is 255
             * characters.
             *
             * @example
             * Pull request 2
             */
            displayId: string;
          } & {
            [key: string]: unknown;
          })[];
          /**
           * The URL of the avatar for this repository. Max length is 2000 characters.
           *
           * @example
           * http://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/avatar/32
           */
          avatar?: string;
          /**
           * Description of the avatar for this repository. Max length is 1024 characters.
           *
           * @example
           * Avatar description
           */
          avatarDescription?: string;
          /**
           * The ID of this entity. Will be used for cross entity linking. Must be unique by
           * entity type within a repository, i.e., only one commit can have ID 'X' in
           * repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is
           * acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length
           * is 1024 characters.
           *
           * @example
           * c6c7c750-cee2-48e2-b920-d7706dfd11f9
           */
          id: string;
          /**
           * An ID used to apply an ordering to updates for this entity in the case of
           * out-of-order receipt of update requests. This can be any monotonically
           * increasing number. A suggested implementation is to use epoch millis from the
           * provider system, but other alternatives are valid (e.g. a provider could store
           * a counter against each entity and increment that on each update to Jira).
           * Updates for an entity that are received with an updateSqeuenceId lower than
           * what is currently stored will be ignored.
           *
           * @example
           * 1523494301248
           */
          updateSequenceId: number;
        } & {
          [key: string]: unknown;
        }
      >
    > => {
      return jiraRequest({
        path: "/rest/devinfo/0.10/repository/{repositoryId}",
        method: "GET",
        pathParams: {
          repositoryId
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
     * Stores development information provided in the request to make it available
     * when viewing issues in Jira. Existing repository and entity data for the same
     * ID will be replaced if the updateSequenceId of existing data is less than the
     * incoming data. Submissions are performed asynchronously. Submitted data will
     * eventually be available in Jira; most updates are available within a short
     * period of time, but may take some time during peak load and/or maintenance
     * times.
     *
     * @returns Submission accepted. Each submitted repository and entity that is of a valid format will be eventually available in Jira.
     */
    storeDevelopmentInformation: async ({
      authorization,
      requestBody,
      opts
    }: {
      /**
       * All requests must be signed with either a Connect JWT token or OAuth token for
       * an on-premise integration that corresponds to an app installed in Jira. If the
       * JWT token corresponds to a Connect app that does not define the
       * jiraDevelopmentTool module it will be rejected with a 403. See
       * https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more
       * details about Connect JWT tokens. See
       * https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/
       * for details about on-premise integrations.
       */
      authorization: string;
      /** Request object, which contains development information */
      requestBody: {
        /**
         * List of repositories containing development information. Must not contain
         * duplicates. Maximum number of entities across all repositories is 1000.
         */
        repositories: ({
          /**
           * The name of this repository. Max length is 255 characters.
           *
           * @example
           * atlassian-connect-jira-example
           */
          name: string;
          /**
           * Description of this repository. Max length is 1024 characters.
           *
           * @example
           * The repository which stores code of the Atlassian Connect Add-on Devinfo application.
           */
          description?: string;
          /**
           * The ID of the repository this repository was forked from, if it's a fork. Max
           * length is 1024 characters.
           *
           * @example
           * 56c7c750-cee2-48e2-b920-d7706dfd11f7
           */
          forkOf?: string;
          /**
           * The URL of this repository. Max length is 2000 characters.
           *
           * @example
           * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example
           */
          url: string;
          /**
           * List of commits to update in this repository. Must not contain duplicate entity
           * IDs. Maximum number of commits is 400
           */
          commits?: ({
            /**
             * The identifier or hash of the commit. Will be used for cross entity linking.
             * Must be unique for all commits within a repository, i.e., only one commit can
             * have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to
             * repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are
             * allowed. Max length is 1024 characters
             *
             * @example
             * a7727ee6350c33cdf90826dc21abaa26a5704370
             */
            id: string;
            /**
             * List of issues keys that this entity is associated with. They must be valid
             * Jira issue keys.
             *
             * @deprecated
             * @example
             * ```
             * [
             *   "ISSUE-1",
             *   "TEST-2"
             * ]
             * ```
             */
            issueKeys?: string[];
            /** The Jira issue keys or IDs to associate the commit with. */
            associations?: IssueIdOrKeysAssociation[];
            /**
             * An ID used to apply an ordering to updates for this entity in the case of
             * out-of-order receipt of update requests. This can be any monotonically
             * increasing number. A suggested implementation is to use epoch millis from the
             * provider system, but other alternatives are valid (e.g. a provider could store
             * a counter against each entity and increment that on each update to Jira).
             * Updates for an entity that are received with an updateSqeuenceId lower than
             * what is currently stored will be ignored.
             *
             * @example
             * 1523494301248
             */
            updateSequenceId: number;
            /** Deprecated. Use the id field instead. */
            hash?: string;
            /**
             * The set of flags for this commit
             *
             * @example
             * [MERGE_COMMIT]
             */
            flags?: "MERGE_COMMIT"[];
            /**
             * The commit message. Max length is 1024 characters. If anything longer is
             * supplied, it will be truncated down to 1024 characters.
             *
             * @example
             * README.md edited online with Bitbucket
             */
            message: string;
            /**
             * Author
             *
             * Describes the author of a particular entity
             */
            author: {
              /**
               * Deprecated. The name of this user in a format suitable for display. Max length
               * is 255 characters.
               *
               * @example
               * Jane Doe
               */
              name?: string;
              /**
               * The email address of the user. Used to associate the user with a Jira user. Max
               * length is 255 characters.
               *
               * @example
               * jane_doe@atlassian.com
               */
              email?: string;
              /**
               * Deprecated. The username of the user. Used to associate the user with a Jira
               * user if there are multiple users for a given email. Max length is 255
               * characters.
               *
               * @example
               * jdoe
               */
              username?: string;
              /**
               * Deprecated. The URL of the profile for this user. Max length is 2000 characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe
               */
              url?: string;
              /**
               * Deprecated. The URL of the avatar for this user. Max length is 2000 characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe/avatar/32
               */
              avatar?: string;
            } & {
              [key: string]: unknown;
            };
            /**
             * The total number of files added, removed, or modified by this commit
             *
             * @example
             * 1
             */
            fileCount: number;
            /**
             * The URL of this commit. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/commits/a7727ee6350c33cdf90826dc21abaa26a5704370
             */
            url: string;
            /**
             * List of file changes. Max number of files is 10. Currently, only the first 5
             * files are shown (sorted by path) in the UI. This UI behavior may change without
             * notice.
             */
            files?: ({
              /**
               * The path of the file. Max length is 1024 characters.
               *
               * @example
               * /home/user/src/atlassian-connect-jira-example/README.md
               */
              path: string;
              /**
               * The URL of this file. Max length is 2000 characters.
               *
               * @example
               * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/src/a7727ee6350c33cdf90826dc21abaa26a5704370/README.md
               */
              url: string;
              /**
               * The operation performed on this file
               *
               * @example
               * MODIFIED
               */
              changeType: "ADDED" | "COPIED" | "DELETED" | "MODIFIED" | "MOVED" | "UNKNOWN";
              /**
               * Number of lines added to the file
               *
               * @example
               * 0
               */
              linesAdded: number;
              /**
               * Number of lines removed from the file
               *
               * @example
               * 1
               */
              linesRemoved: number;
            } & {
              [key: string]: unknown;
            })[];
            /**
             * The author timestamp of this commit. Formatted as a UTC ISO 8601 date time
             * format.
             *
             * @example
             * 2016-10-31T23:27:25+00:00
             */
            authorTimestamp: string;
            /**
             * Shortened identifier for this commit, used for display. Max length is 255
             * characters.
             *
             * @example
             * a7727ee
             */
            displayId: string;
          } & {
            [key: string]: unknown;
          })[];
          /**
           * List of branches to update in this repository. Must not contain duplicate
           * entity IDs. Maximum number of branches is 400.
           */
          branches?: ({
            /**
             * The ID of this entity. Will be used for cross entity linking. Must be unique by
             * entity type within a repository, i.e., only one commit can have ID 'X' in
             * repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is
             * acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length
             * is 1024 characters.
             *
             * @example
             * c6c7c750-cee2-48e2-b920-d7706dfd11f9
             */
            id: string;
            /**
             * List of issues keys that this entity is associated with. They must be valid
             * Jira issue keys.
             *
             * @deprecated
             * @example
             * ```
             * [
             *   "ISSUE-1",
             *   "TEST-2"
             * ]
             * ```
             */
            issueKeys?: string[];
            /** The Jira issue keys or IDs to associate the branch with. */
            associations?: IssueIdOrKeysAssociation[];
            /**
             * An ID used to apply an ordering to updates for this entity in the case of
             * out-of-order receipt of update requests. This can be any monotonically
             * increasing number. A suggested implementation is to use epoch millis from the
             * provider system, but other alternatives are valid (e.g. a provider could store
             * a counter against each entity and increment that on each update to Jira).
             * Updates for an entity that are received with an updateSqeuenceId lower than
             * what is currently stored will be ignored.
             *
             * @example
             * 1523494301248
             */
            updateSequenceId: number;
            /**
             * The name of the branch. Max length is 512 characters.
             *
             * @example
             * master
             */
            name: string;
            /**
             * Commit
             *
             * Represents a commit in the version control system.
             */
            lastCommit: {
              /**
               * The identifier or hash of the commit. Will be used for cross entity linking.
               * Must be unique for all commits within a repository, i.e., only one commit can
               * have ID 'X' in repository 'Y'. But adding, e.g., a branch with ID 'X' to
               * repository 'Y' is acceptable. Only alphanumeric characters, and '~.-_', are
               * allowed. Max length is 1024 characters
               *
               * @example
               * a7727ee6350c33cdf90826dc21abaa26a5704370
               */
              id: string;
              /**
               * List of issues keys that this entity is associated with. They must be valid
               * Jira issue keys.
               *
               * @example
               * ```
               * [
               *   "ISSUE-1",
               *   "TEST-2"
               * ]
               * ```
               */
              issueKeys: string[];
              /**
               * An ID used to apply an ordering to updates for this entity in the case of
               * out-of-order receipt of update requests. This can be any monotonically
               * increasing number. A suggested implementation is to use epoch millis from the
               * provider system, but other alternatives are valid (e.g. a provider could store
               * a counter against each entity and increment that on each update to Jira).
               * Updates for an entity that are received with an updateSqeuenceId lower than
               * what is currently stored will be ignored.
               *
               * @example
               * 1523494301248
               */
              updateSequenceId: number;
              /** Deprecated. Use the id field instead. */
              hash?: string;
              /**
               * The set of flags for this commit
               *
               * @example
               * [MERGE_COMMIT]
               */
              flags?: "MERGE_COMMIT"[];
              /**
               * The commit message. Max length is 1024 characters. If anything longer is
               * supplied, it will be truncated down to 1024 characters.
               *
               * @example
               * README.md edited online with Bitbucket
               */
              message: string;
              /**
               * Author
               *
               * Describes the author of a particular entity
               */
              author: {
                /**
                 * Deprecated. The name of this user in a format suitable for display. Max length
                 * is 255 characters.
                 *
                 * @example
                 * Jane Doe
                 */
                name?: string;
                /**
                 * The email address of the user. Used to associate the user with a Jira user. Max
                 * length is 255 characters.
                 *
                 * @example
                 * jane_doe@atlassian.com
                 */
                email?: string;
                /**
                 * Deprecated. The username of the user. Used to associate the user with a Jira
                 * user if there are multiple users for a given email. Max length is 255
                 * characters.
                 *
                 * @example
                 * jdoe
                 */
                username?: string;
                /**
                 * Deprecated. The URL of the profile for this user. Max length is 2000 characters.
                 *
                 * @example
                 * https://atlassian.com/account/jane_doe
                 */
                url?: string;
                /**
                 * Deprecated. The URL of the avatar for this user. Max length is 2000 characters.
                 *
                 * @example
                 * https://atlassian.com/account/jane_doe/avatar/32
                 */
                avatar?: string;
              } & {
                [key: string]: unknown;
              };
              /**
               * The total number of files added, removed, or modified by this commit
               *
               * @example
               * 1
               */
              fileCount: number;
              /**
               * The URL of this commit. Max length is 2000 characters.
               *
               * @example
               * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/commits/a7727ee6350c33cdf90826dc21abaa26a5704370
               */
              url: string;
              /**
               * List of file changes. Max number of files is 10. Currently, only the first 5
               * files are shown (sorted by path) in the UI. This UI behavior may change without
               * notice.
               */
              files?: ({
                /**
                 * The path of the file. Max length is 1024 characters.
                 *
                 * @example
                 * /home/user/src/atlassian-connect-jira-example/README.md
                 */
                path: string;
                /**
                 * The URL of this file. Max length is 2000 characters.
                 *
                 * @example
                 * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/src/a7727ee6350c33cdf90826dc21abaa26a5704370/README.md
                 */
                url: string;
                /**
                 * The operation performed on this file
                 *
                 * @example
                 * MODIFIED
                 */
                changeType: "ADDED" | "COPIED" | "DELETED" | "MODIFIED" | "MOVED" | "UNKNOWN";
                /**
                 * Number of lines added to the file
                 *
                 * @example
                 * 0
                 */
                linesAdded: number;
                /**
                 * Number of lines removed from the file
                 *
                 * @example
                 * 1
                 */
                linesRemoved: number;
              } & {
                [key: string]: unknown;
              })[];
              /**
               * The author timestamp of this commit. Formatted as a UTC ISO 8601 date time
               * format.
               *
               * @example
               * 2016-10-31T23:27:25+00:00
               */
              authorTimestamp: string;
              /**
               * Shortened identifier for this commit, used for display. Max length is 255
               * characters.
               *
               * @example
               * a7727ee
               */
              displayId: string;
            } & {
              [key: string]: unknown;
            };
            /**
             * The URL of the page for creating a pull request from this branch. Max length is
             * 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/pull-requests/new
             */
            createPullRequestUrl?: string;
            /**
             * The URL of the branch. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/branch/master
             */
            url: string;
          } & {
            [key: string]: unknown;
          })[];
          /**
           * List of pull requests to update in this repository. Must not contain duplicate
           * entity IDs. Maximum number of pull requests is 400
           */
          pullRequests?: ({
            /**
             * The ID of this entity. Will be used for cross entity linking. Must be unique by
             * entity type within a repository, i.e., only one commit can have ID 'X' in
             * repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is
             * acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length
             * is 1024 characters
             *
             * @example
             * c6c7c750-cee2-48e2-b920-d7706dfd11f9
             */
            id: string;
            /**
             * List of issues keys that this entity is associated with. They must be valid
             * Jira issue keys.
             *
             * @deprecated
             * @example
             * ```
             * [
             *   "ISSUE-1",
             *   "TEST-2"
             * ]
             * ```
             */
            issueKeys?: string[];
            /** The Jira issue keys or IDs to associate the pull request with. */
            associations?: IssueIdOrKeysAssociation[];
            /**
             * An ID used to apply an ordering to updates for this entity in the case of
             * out-of-order receipt of update requests. This can be any monotonically
             * increasing number. A suggested implementation is to use epoch millis from the
             * provider system, but other alternatives are valid (e.g. a provider could store
             * a counter against each entity and increment that on each update to Jira).
             * Updates for an entity that are received with an updateSqeuenceId lower than
             * what is currently stored will be ignored.
             *
             * @example
             * 1523494301248
             */
            updateSequenceId: number;
            /**
             * The status of the pull request. In the case of concurrent updates, priority is
             * given in the order OPEN, MERGED, DECLINED, UNKNOWN
             *
             * @example
             * OPEN
             */
            status: "OPEN" | "MERGED" | "DECLINED" | "UNKNOWN";
            /**
             * Title of the pull request. Max length is 1024 characters.
             *
             * @example
             * Pull request 2, fixing all the issues caused by pull request #1
             */
            title: string;
            /**
             * Author
             *
             * Describes the author of a particular entity
             */
            author: {
              /**
               * Deprecated. The name of this user in a format suitable for display. Max length
               * is 255 characters.
               *
               * @example
               * Jane Doe
               */
              name?: string;
              /**
               * The email address of the user. Used to associate the user with a Jira user. Max
               * length is 255 characters.
               *
               * @example
               * jane_doe@atlassian.com
               */
              email?: string;
              /**
               * Deprecated. The username of the user. Used to associate the user with a Jira
               * user if there are multiple users for a given email. Max length is 255
               * characters.
               *
               * @example
               * jdoe
               */
              username?: string;
              /**
               * Deprecated. The URL of the profile for this user. Max length is 2000 characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe
               */
              url?: string;
              /**
               * Deprecated. The URL of the avatar for this user. Max length is 2000 characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe/avatar/32
               */
              avatar?: string;
            } & {
              [key: string]: unknown;
            };
            /**
             * The number of comments on the pull request
             *
             * @example
             * 42
             */
            commentCount: number;
            /**
             * The name of the source branch of this PR. Max length is 255 characters.
             *
             * @example
             * ISSUE-1-feature-branch
             */
            sourceBranch: string;
            /**
             * The url of the source branch of this PR. This is used to match this PR against
             * the branch. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/branch/ISSUE-1-feature-branch
             */
            sourceBranchUrl?: string;
            /**
             * The most recent update to this PR. Formatted as a UTC ISO 8601 date time format.
             *
             * @example
             * 2016-10-31T23:27:25+00:00
             */
            lastUpdate: string;
            /**
             * The name of destination branch of this PR. Max length is 255 characters.
             *
             * @example
             * master
             */
            destinationBranch?: string;
            /**
             * The url of the destination branch of this PR. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/src/master
             */
            destinationBranchUrl?: string;
            /** The list of reviewers of this pull request */
            reviewers?: ({
              /**
               * Deprecated. The name of this reviewer. Max length is 255 characters.
               *
               * @example
               * Jane Doe
               */
              name?: string;
              /**
               * The approval status of this reviewer, default is UNAPPROVED.
               *
               * @example
               * APPROVED
               */
              approvalStatus?: "APPROVED" | "UNAPPROVED";
              /**
               * Deprecated. The URL of the profile for this reviewer. Max length is 2000
               * characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe
               */
              url?: string;
              /**
               * Deprecated. The URL of the avatar for this reviewer. Max length is 2000
               * characters.
               *
               * @example
               * https://atlassian.com/account/jane_doe/avatar/32
               */
              avatar?: string;
              /**
               * The email address of this reviewer. Max length is 254 characters.
               *
               * @example
               * jane_doe@example.com
               */
              email?: string;
              /**
               * The Atlassian Account ID (AAID) of this reviewer. Max length is 128 characters.
               *
               * @example
               * 655363:e4ca5e2d-a901-40e3-877e-bf5d22c0f130
               */
              accountId?: string;
            } & {
              [key: string]: unknown;
            })[];
            /**
             * The URL of this pull request. Max length is 2000 characters.
             *
             * @example
             * https://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/pull-requests/2
             */
            url: string;
            /**
             * Shortened identifier for this pull request, used for display. Max length is 255
             * characters.
             *
             * @example
             * Pull request 2
             */
            displayId: string;
          } & {
            [key: string]: unknown;
          })[];
          /**
           * The URL of the avatar for this repository. Max length is 2000 characters.
           *
           * @example
           * http://bitbucket.org/atlassianlabs/atlassian-connect-jira-example/avatar/32
           */
          avatar?: string;
          /**
           * Description of the avatar for this repository. Max length is 1024 characters.
           *
           * @example
           * Avatar description
           */
          avatarDescription?: string;
          /**
           * The ID of this entity. Will be used for cross entity linking. Must be unique by
           * entity type within a repository, i.e., only one commit can have ID 'X' in
           * repository 'Y'. But adding, e.g., a branch with ID 'X' to repository 'Y' is
           * acceptable. Only alphanumeric characters, and '~.-_', are allowed. Max length
           * is 1024 characters.
           *
           * @example
           * c6c7c750-cee2-48e2-b920-d7706dfd11f9
           */
          id: string;
          /**
           * An ID used to apply an ordering to updates for this entity in the case of
           * out-of-order receipt of update requests. This can be any monotonically
           * increasing number. A suggested implementation is to use epoch millis from the
           * provider system, but other alternatives are valid (e.g. a provider could store
           * a counter against each entity and increment that on each update to Jira).
           * Updates for an entity that are received with an updateSqeuenceId lower than
           * what is currently stored will be ignored.
           *
           * @example
           * 1523494301248
           */
          updateSequenceId: number;
        } & {
          [key: string]: unknown;
        })[];
        /**
         * Flag to prevent automatic issue transitions and smart commits being fired,
         * default is false.
         */
        preventTransitions?: boolean;
        /**
         * Indicates the operation being performed by the provider system when sending
         * this data. "NORMAL" - Data received during normal operation (e.g. a user
         * pushing a branch). "BACKFILL" - Data received while backfilling existing data
         * (e.g. indexing a newly connected account). Default is "NORMAL". Please note
         * that "BACKFILL" operations have a much higher rate-limiting threshold but are
         * also processed slower in comparison to "NORMAL" operations.
         *
         * @example
         * NORMAL
         */
        operationType?: "NORMAL" | "BACKFILL";
        /**
         * Arbitrary properties to tag the submitted repositories with. These properties
         * can be used for delete operations to e.g. clean up all development information
         * associated with an account in the event that the account is removed from the
         * provider system. Note that these properties will never be returned with
         * repository or entity data. They are not intended for use as metadata to
         * associate with a repository. Maximum length of each key or value is 255
         * characters. Maximum allowed number of properties key/value pairs is 5.
         * Properties keys cannot start with '_' character. Properties keys cannot contain
         * ':' character.
         */
        properties?: {
          [key: string]: string;
        };
        /**
         * ProviderMetadata
         *
         * Information about the provider. This is useful for auditing, logging,
         * debugging, and other internal uses. It is not considered private information.
         * Hence, it may not contain personally identifiable information.
         */
        providerMetadata?: {
          /**
           * An optional name of the source of the development information data.
           *
           * @example
           * Bitbucket Server 6.7.2
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
           * The IDs of devinfo entities that have been accepted for submission grouped by
           * their repository IDs. Note that a devinfo entity that isn't updated due to it's
           * updateSequenceId being out of order is not considered a failed submission.
           */
          acceptedDevinfoEntities?: {
            /**
             * EntityIds
             *
             * IDs of entities grouped by entity type
             */
            [entityIds: string]: {
              /** Commits IDs */
              commits?: string[];
              /** Branch IDs */
              branches?: string[];
              /** Pull request IDs */
              pullRequests?: string[];
            } & {
              [key: string]: unknown;
            };
          };
          /**
           * IDs of devinfo entities that have not been accepted for submission and caused
           * error descriptions, usually due to a problem with the request data. The
           * entities (if present) will be grouped by their repository id and type. Entity
           * IDs are listed with errors associated with that devinfo entity that have
           * prevented it being submitted.
           */
          failedDevinfoEntities?: {
            /**
             * RepositoryErrors
             *
             * Represents errors related to a particular repository and its entities
             */
            [repositoryErrors: string]: {
              /** Repository errors */
              errorMessages?: ({
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
              /** Commits errors */
              commits?: ({
                /** Entity id */
                id: string;
                /** Error message */
                errorMessages?: ({
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
              /** Branches errors */
              branches?: ({
                /** Entity id */
                id: string;
                /** Error message */
                errorMessages?: ({
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
              /** Pull requests errors */
              pullRequests?: ({
                /** Entity id */
                id: string;
                /** Error message */
                errorMessages?: ({
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
            } & {
              [key: string]: unknown;
            };
          };
          /**
           * Issue keys that are not known on this Jira instance (if any). These may be
           * invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue
           * key), or they may be for projects that no longer exist. If a devinfo entity has
           * been associated with issue keys other than those in this array it will still be
           * stored against those valid keys.
           */
          unknownIssueKeys?: string[];
          /**
           * Associations that are not known on this Jira instance (if any).
           *
           * These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as
           * a Jira issue key), or they may be for projects that no longer exist.
           *
           * If a development information entity has been associated with any other
           * association other than those in this array it will still be stored against
           * those valid associations.
           * If a development information entity was only associated with the associations
           * in this array, it is deemed to be invalid and it won't be persisted.
           */
          unknownAssociations?: IssueIdOrKeysAssociation[];
        } & {
          [key: string]: unknown;
        }
      >
    > => {
      return jiraRequest({
        path: "/rest/devinfo/0.10/bulk",
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
