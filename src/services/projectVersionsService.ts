import type {
  Version,
  PageBeanVersion,
  VersionMoveBean,
  VersionIssueCounts,
  VersionRelatedWork,
  DeleteAndReplaceVersionBean,
  VersionUnresolvedIssuesCount,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents project versions. Use it to get, get lists of, create,
 * update, move, merge, and delete project versions. This resource also provides
 * counts of issues by version.
 */
export default function projectVersions<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a related work for the given version. You can only create a generic
     * link type of related works via this API. relatedWorkId will be auto-generated
     * UUID, that does not need to be provided.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Resolve issues:* and *Edit issues*
     * [Managing project
     * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html)
     * for the project that contains the version.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "category": "Design",
     *   "relatedWorkId": "fabcdef6-7878-1234-beaf-43211234abcd",
     *   "title": "Design link",
     *   "url": "https://www.atlassian.com"
     * }
     * ```
     */
    createRelatedWork: async ({
      id,
      versionRelatedWork,
      opts
    }: {
      id: string;
      /**
       * @example
       * {
       *   "category": "Design",
       *   "title": "Design link",
       *   "url": "https://www.atlassian.com"
       * }
       */
      versionRelatedWork: VersionRelatedWork;
    } & WithRequestOpts<TClient>): Promise<JiraResult<VersionRelatedWork>> => {
      return jiraRequest<VersionRelatedWork>({
        path: "/rest/api/3/version/{id}/relatedwork",
        method: "POST",
        pathParams: {
          id
        },
        body: JSON.stringify(versionRelatedWork),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates a project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * the version is added to.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "archived": false,
     *   "description": "An excellent version",
     *   "id": "10000",
     *   "name": "New Version 1",
     *   "project": "PXA",
     *   "projectId": 10000,
     *   "releaseDate": "2010-07-06",
     *   "released": true,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/version/10000",
     *   "userReleaseDate": "6/Jul/2010"
     * }
     * ```
     */
    createVersion: async ({
      version,
      opts
    }: {
      /**
       * @example
       * {
       *   "archived": false,
       *   "description": "An excellent version",
       *   "name": "New Version 1",
       *   "projectId": 10000,
       *   "releaseDate": "2010-07-06",
       *   "released": true
       * }
       */
      version: Version;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Version>> => {
      return jiraRequest<Version>({
        path: "/rest/api/3/version",
        method: "POST",
        body: JSON.stringify(version),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes a project version.
     *
     * Alternative versions can be provided to update issues that use the deleted
     * version in `fixVersion`, `affectedVersion`, or any version picker custom
     * fields. If alternatives are not provided, occurrences of `fixVersion`,
     * `affectedVersion`, and any version picker custom field, that contain the
     * deleted version, are cleared. Any replacement version must be in the same
     * project as the version being deleted and cannot be the version being deleted.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * that contains the version.
     *
     * @returns Returned if the version is deleted.
     */
    deleteAndReplaceVersion: async ({
      id,
      deleteAndReplaceVersionBean,
      opts
    }: {
      /** The ID of the version. */
      id: string;
      deleteAndReplaceVersionBean: DeleteAndReplaceVersionBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/version/{id}/removeAndSwap",
        method: "POST",
        pathParams: {
          id
        },
        body: JSON.stringify(deleteAndReplaceVersionBean),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes the given related work for the given version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Resolve issues:* and *Edit issues*
     * [Managing project
     * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html)
     * for the project that contains the version.
     */
    deleteRelatedWork: async ({
      versionId,
      relatedWorkId,
      opts
    }: {
      /** The ID of the version that the target related work belongs to. */
      versionId: string;
      /** The ID of the related work to delete. */
      relatedWorkId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/version/{versionId}/relatedwork/{relatedWorkId}",
        method: "DELETE",
        pathParams: {
          versionId,
          relatedWorkId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes a project version.
     *
     * Deprecated, use [ Delete and replace
     * version](#api-rest-api-3-version-id-removeAndSwap-post) that supports swapping
     * version values in custom fields, in addition to the swapping for `fixVersion`
     * and `affectedVersion` provided in this resource.
     *
     * Alternative versions can be provided to update issues that use the deleted
     * version in `fixVersion` or `affectedVersion`. If alternatives are not provided,
     * occurrences of `fixVersion` and `affectedVersion` that contain the deleted
     * version are cleared.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * that contains the version.
     *
     * @deprecated
     */
    deleteVersion: async ({
      id,
      moveFixIssuesTo,
      moveAffectedIssuesTo,
      opts
    }: {
      /** The ID of the version. */
      id: string;
      /**
       * The ID of the version to update `fixVersion` to when the field contains the
       * deleted version. The replacement version must be in the same project as the
       * version being deleted and cannot be the version being deleted.
       */
      moveFixIssuesTo?: string;
      /**
       * The ID of the version to update `affectedVersion` to when the field contains
       * the deleted version. The replacement version must be in the same project as the
       * version being deleted and cannot be the version being deleted.
       */
      moveAffectedIssuesTo?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/version/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          moveFixIssuesTo,
          moveAffectedIssuesTo
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns all versions in a project. The response is not paginated. Use [Get
     * project versions paginated](#api-rest-api-3-project-projectIdOrKey-version-get)
     * if you want to get the versions in a project with pagination.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "archived": false,
     *     "description": "An excellent version",
     *     "id": "10000",
     *     "name": "New Version 1",
     *     "overdue": true,
     *     "projectId": 10000,
     *     "releaseDate": 1278385482288,
     *     "releaseDateSet": true,
     *     "released": true,
     *     "self": "https://your-domain.atlassian.net/rest/api/3/version/10000",
     *     "startDateSet": false,
     *     "userReleaseDate": "6/Jul/2010"
     *   },
     *   {
     *     "archived": false,
     *     "description": "Minor Bugfix version",
     *     "id": "10010",
     *     "issuesStatusForFixVersion": {
     *       "done": 100,
     *       "inProgress": 20,
     *       "toDo": 10,
     *       "unmapped": 0
     *     },
     *     "name": "Next Version",
     *     "overdue": false,
     *     "projectId": 10000,
     *     "releaseDateSet": false,
     *     "released": false,
     *     "self": "https://your-domain.atlassian.net/rest/api/3/version/10010",
     *     "startDateSet": false
     *   }
     * ]
     * ```
     *
     */
    getProjectVersions: async ({
      projectIdOrKey,
      expand,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts `operations`, which returns actions that can be
       * performed on the version.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Version[]>> => {
      return jiraRequest<Version[]>({
        path: "/rest/api/3/project/{projectIdOrKey}/versions",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of all versions in a project. See the
     * [Get project versions](#api-rest-api-3-project-projectIdOrKey-versions-get)
     * resource if you want to get a full list of versions without pagination.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "nextPage": "https://your-domain.atlassian.net/rest/api/3/project/PR/version?startAt=2&maxResults=2",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/project/PR/version?startAt=0&maxResults=2",
     *   "startAt": 0,
     *   "total": 7,
     *   "values": [
     *     {
     *       "archived": false,
     *       "description": "An excellent version",
     *       "id": "10000",
     *       "name": "New Version 1",
     *       "overdue": true,
     *       "projectId": 10000,
     *       "releaseDate": "2010-07-06",
     *       "released": true,
     *       "self": "https://your-domain.atlassian.net/rest/api/3/version/10000",
     *       "userReleaseDate": "6/Jul/2010"
     *     },
     *     {
     *       "archived": false,
     *       "description": "Minor Bugfix version",
     *       "id": "10010",
     *       "issuesStatusForFixVersion": {
     *         "done": 100,
     *         "inProgress": 20,
     *         "toDo": 10,
     *         "unmapped": 0
     *       },
     *       "name": "Next Version",
     *       "overdue": false,
     *       "projectId": 10000,
     *       "released": false,
     *       "self": "https://your-domain.atlassian.net/rest/api/3/version/10010"
     *     }
     *   ]
     * }
     * ```
     */
    getProjectVersionsPaginated: async ({
      projectIdOrKey,
      startAt,
      maxResults,
      orderBy,
      query,
      status,
      expand,
      opts
    }: {
      /** The project ID or project key (case sensitive). */
      projectIdOrKey: string;
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
      /**
       * [Order](#ordering) the results by a field:
       *
       *  *  `description` Sorts by version description.
       *  *  `name` Sorts by version name.
       *  *  `releaseDate` Sorts by release date, starting with the oldest date.
       * Versions with no release date are listed last.
       *  *  `sequence` Sorts by the order of appearance in the user interface.
       *  *  `startDate` Sorts by start date, starting with the oldest date. Versions
       * with no start date are listed last.
       */
      orderBy?:
        | "description"
        | "-description"
        | "+description"
        | "name"
        | "-name"
        | "+name"
        | "releaseDate"
        | "-releaseDate"
        | "+releaseDate"
        | "sequence"
        | "-sequence"
        | "+sequence"
        | "startDate"
        | "-startDate"
        | "+startDate";
      /**
       * Filter the results using a literal string. Versions with matching `name` or
       * `description` are returned (case insensitive).
       */
      query?: string;
      /**
       * A list of status values used to filter the results by version status. This
       * parameter accepts a comma-separated list. The status values are `released`,
       * `unreleased`, and `archived`.
       */
      status?: string;
      /**
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `issuesstatus` Returns the number of issues in each status category for
       * each version.
       *  *  `operations` Returns actions that can be performed on the specified version.
       *  *  `driver` Returns the Atlassian account ID of the version driver.
       *  *  `approvers` Returns a list containing the approvers for this version.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<PageBeanVersion>> => {
      return jiraRequest<PageBeanVersion>({
        path: "/rest/api/3/project/{projectIdOrKey}/version",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        queryParams: {
          startAt,
          maxResults,
          orderBy,
          query,
          status,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns related work items for the given version id.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the version.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "category": "Design",
     *     "issueId": 10001,
     *     "relatedWorkId": "fabcdef6-7878-1234-beaf-43211234abcd",
     *     "title": "Design link",
     *     "url": "https://www.atlassian.com"
     *   },
     *   {
     *     "category": "Communications",
     *     "relatedWorkId": "fabcdef6-7878-1234-beaf-43211234abce",
     *     "title": "Chat application",
     *     "url": "https://www.atlassian.com"
     *   },
     *   {
     *     "category": "External Link",
     *     "issueId": 10003,
     *     "relatedWorkId": "fabcdef6-7878-1234-beaf-43211234abcf",
     *     "url": "https://www.atlassian.com"
     *   }
     * ]
     * ```
     *
     */
    getRelatedWork: async ({
      id,
      opts
    }: {
      /** The ID of the version. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<VersionRelatedWork[]>> => {
      return jiraRequest<VersionRelatedWork[]>({
        path: "/rest/api/3/version/{id}/relatedwork",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * containing the version.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "archived": false,
     *   "description": "An excellent version",
     *   "id": "10000",
     *   "name": "New Version 1",
     *   "overdue": true,
     *   "projectId": 10000,
     *   "releaseDate": "2010-07-06",
     *   "released": true,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/version/10000",
     *   "userReleaseDate": "6/Jul/2010"
     * }
     * ```
     */
    getVersion: async ({
      id,
      expand,
      opts
    }: {
      /** The ID of the version. */
      id: string;
      /**
       * Use [expand](#expansion) to include additional information about version in the
       * response. This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `operations` Returns the list of operations available for this version.
       *  *  `issuesstatus` Returns the count of issues in this version for each of the
       * status categories *to do*, *in progress*, *done*, and *unmapped*. The
       * *unmapped* property represents the number of issues with a status other than
       * *to do*, *in progress*, and *done*.
       *  *  `driver` Returns the Atlassian account ID of the version driver.
       *  *  `approvers` Returns a list containing the Atlassian account IDs of
       * approvers for this version.
       */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Version>> => {
      return jiraRequest<Version>({
        path: "/rest/api/3/version/{id}",
        method: "GET",
        pathParams: {
          id
        },
        queryParams: {
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the following counts for a version:
     *
     *  *  Number of issues where the `fixVersion` is set to the version.
     *  *  Number of issues where the `affectedVersion` is set to the version.
     *  *  Number of issues where a version custom field is set to the version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* project permission
     * for the project that contains the version.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "customFieldUsage": [
     *     {
     *       "customFieldId": 10000,
     *       "fieldName": "Field1",
     *       "issueCountWithVersionInCustomField": 2
     *     },
     *     {
     *       "customFieldId": 10010,
     *       "fieldName": "Field2",
     *       "issueCountWithVersionInCustomField": 3
     *     }
     *   ],
     *   "issueCountWithCustomFieldsShowingVersion": 54,
     *   "issuesAffectedCount": 101,
     *   "issuesFixedCount": 23,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/version/10000"
     * }
     * ```
     */
    getVersionRelatedIssues: async ({
      id,
      opts
    }: {
      /** The ID of the version. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<VersionIssueCounts>> => {
      return jiraRequest<VersionIssueCounts>({
        path: "/rest/api/3/version/{id}/relatedIssueCounts",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns counts of the issues and unresolved issues for the project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* project permission
     * for the project that contains the version.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "issuesCount": 30,
     *   "issuesUnresolvedCount": 23,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/version/10000"
     * }
     * ```
     */
    getVersionUnresolvedIssues: async ({
      id,
      opts
    }: {
      /** The ID of the version. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<VersionUnresolvedIssuesCount>> => {
      return jiraRequest<VersionUnresolvedIssuesCount>({
        path: "/rest/api/3/version/{id}/unresolvedIssueCount",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Merges two project versions. The merge is completed by deleting the version
     * specified in `id` and replacing any occurrences of its ID in `fixVersion` with
     * the version ID specified in `moveIssuesTo`.
     *
     * Consider using [ Delete and replace
     * version](#api-rest-api-3-version-id-removeAndSwap-post) instead. This resource
     * supports swapping version values in `fixVersion`, `affectedVersion`, and custom
     * fields.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * that contains the version.
     *
     * @returns Returned if the version is deleted.
     */
    mergeVersions: async ({
      id,
      moveIssuesTo,
      opts
    }: {
      /** The ID of the version to delete. */
      id: string;
      /** The ID of the version to merge into. */
      moveIssuesTo: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/version/{id}/mergeto/{moveIssuesTo}",
        method: "PUT",
        pathParams: {
          id,
          moveIssuesTo
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Modifies the version's sequence within the project, which affects the display
     * order of the versions in Jira.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* project permission
     * for the project that contains the version.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "archived": false,
     *   "description": "An excellent version",
     *   "id": "10000",
     *   "name": "New Version 1",
     *   "overdue": true,
     *   "projectId": 10000,
     *   "releaseDate": "2010-07-06",
     *   "released": true,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/version/10000",
     *   "userReleaseDate": "6/Jul/2010"
     * }
     * ```
     */
    moveVersion: async ({
      id,
      versionMoveBean,
      opts
    }: {
      /** The ID of the version to be moved. */
      id: string;
      /**
       * @example
       * {
       *   "after": "https://your-domain.atlassian.net/rest/api/~ver~/version/10000"
       * }
       */
      versionMoveBean: VersionMoveBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Version>> => {
      return jiraRequest<Version>({
        path: "/rest/api/3/version/{id}/move",
        method: "POST",
        pathParams: {
          id
        },
        body: JSON.stringify(versionMoveBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates the given related work. You can only update generic link related works
     * via Rest APIs. Any archived version related works can't be edited.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Resolve issues:* and *Edit issues*
     * [Managing project
     * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html)
     * for the project that contains the version.
     *
     * @returns Returned if the request is successful together with updated related work.
     *
     * example:
     * ```
     * {
     *   "category": "Design",
     *   "relatedWorkId": "fabcdef6-7878-1234-beaf-43211234abcd",
     *   "title": "Design link",
     *   "url": "https://www.atlassian.com"
     * }
     * ```
     */
    updateRelatedWork: async ({
      id,
      versionRelatedWork,
      opts
    }: {
      /**
       * The ID of the version to update the related work on. For the related work id,
       * pass it to the input JSON.
       */
      id: string;
      /**
       * @example
       * {
       *   "category": "Design",
       *   "relatedWorkId": "fabcdef6-7878-1234-beaf-43211234abcd",
       *   "title": "Design link",
       *   "url": "https://www.atlassian.com"
       * }
       */
      versionRelatedWork: VersionRelatedWork;
    } & WithRequestOpts<TClient>): Promise<JiraResult<VersionRelatedWork>> => {
      return jiraRequest<VersionRelatedWork>({
        path: "/rest/api/3/version/{id}/relatedwork",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(versionRelatedWork),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     * [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
     * that contains the version.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "archived": false,
     *   "description": "An excellent version",
     *   "id": "10000",
     *   "name": "New Version 1",
     *   "project": "PXA",
     *   "projectId": 10000,
     *   "releaseDate": "2010-07-06",
     *   "released": true,
     *   "self": "https://your-domain.atlassian.net/rest/api/3/version/10000",
     *   "userReleaseDate": "6/Jul/2010"
     * }
     * ```
     */
    updateVersion: async ({
      id,
      version,
      opts
    }: {
      /** The ID of the version. */
      id: string;
      /**
       * @example
       * {
       *   "archived": false,
       *   "description": "An excellent version",
       *   "id": "10000",
       *   "name": "New Version 1",
       *   "overdue": true,
       *   "projectId": 10000,
       *   "releaseDate": "2010-07-06",
       *   "released": true,
       *   "self": "https://your-domain.atlassian.net/rest/api/~ver~/version/10000",
       *   "userReleaseDate": "6/Jul/2010"
       * }
       */
      version: Version;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Version>> => {
      return jiraRequest<Version>({
        path: "/rest/api/3/version/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(version),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
