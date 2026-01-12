import type {
  SearchResults,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * Apis related to boards
 */
export default function board<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a new board. Board name, type and filter ID is required.
     *
     *  *  `name` \- Must be less than 255 characters.
     *  *  `type` \- Valid values: scrum, kanban
     *  *  `filterId` \- ID of a filter that the user has permissions to view. Note,
     * if the user does not have the 'Create shared objects' permission and tries to
     * create a shared board, a private board will be created instead (remember that
     * board sharing depends on the filter sharing).
     *  *  `location` \- The container that the board will be located in. `location`
     * must include the `type` property (Valid values: project, user). If choosing
     * 'project', then a project must be specified by a `projectKeyOrId` property in
     * `location`. If choosing 'user', the current user is chosen by default. The
     * `projectKeyOrId` property should not be provided.
     *
     * Note:
     *
     *  *  If you want to create a new project with an associated board, use the [Jira
     * platform REST API](https://docs.atlassian.com/jira/REST/latest). For more
     * information, see the [Create project](#api-rest-api-3-project-post) method. The
     * `projectTypeKey` for software boards must be 'software' and the
     * `projectTemplateKey` must be either
     * `com.pyxis.greenhopper.jira:gh-kanban-template` or
     * `com.pyxis.greenhopper.jira:gh-scrum-template`.
     *  *  You can create a filter using the [Jira REST
     * API](https://docs.atlassian.com/jira/REST/latest). For more information, see
     * the [Create filter](#api-rest-api-3-filter-post) method.
     *  *  If you do not ORDER BY the Rank field for the filter of your board, you
     * will not be able to reorder issues on the board.
     *
     * @returns Returns the created board.
     *
     * example:
     * ```
     * {
     *   "id": 84,
     *   "name": "scrum board",
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/84",
     *   "type": "scrum"
     * }
     * ```
     */
    createBoard: async ({
      requestBody,
      opts
    }: {
      /**
       * @example
       * {
       *   "filterId": 10040,
       *   "location": {
       *     "projectKeyOrId": "10000",
       *     "type": "project"
       *   },
       *   "name": "scrum board",
       *   "type": "scrum"
       * }
       */
      requestBody: {
        filterId?: number;
        location?: {
          projectKeyOrId?: string;
          type?: "project" | "user";
        };
        name?: string;
        type?: "kanban" | "scrum" | "agility";
      };
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        admins?: {
          groups?: {
            name?: string;
            self?: string;
          }[];
          users?: {
            /**
             * The account ID of the user, which uniquely identifies the user across all
             * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
             */
            accountId?: string;
            /** Whether the user is active. */
            active?: boolean;
            /** The avatars of the user. */
            avatarUrls?: {
              /** The URL of the user's 16x16 pixel avatar. */
              "16x16"?: string;
              /** The URL of the user's 24x24 pixel avatar. */
              "24x24"?: string;
              /** The URL of the user's 32x32 pixel avatar. */
              "32x32"?: string;
              /** The URL of the user's 48x48 pixel avatar. */
              "48x48"?: string;
            };
            /**
             * The display name of the user. Depending on the user's privacy setting, this may
             * return an alternative value.
             */
            displayName?: string;
            /**
             * This property is deprecated in favor of `accountId` because of privacy changes.
             * See the [migration
             * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
             * for details.
             * The key of the user.
             */
            key?: string;
            /**
             * This property is deprecated in favor of `accountId` because of privacy changes.
             * See the [migration
             * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
             * for details.
             * The username of the user.
             */
            name?: string;
            /** The URL of the user. */
            self?: string;
          }[];
        };
        /** Whether the board can be edited. */
        canEdit?: boolean;
        /** Whether the board is selected as a favorite. */
        favourite?: boolean;
        /** The ID of the board. */
        id?: number;
        /** Whether the board is private. */
        isPrivate?: boolean;
        /** The container that the board is located in. */
        location?: {
          avatarURI?: string;
          displayName?: string;
          name?: string;
          projectId?: number;
          projectKey?: string;
          projectName?: string;
          projectTypeKey?: string;
          userAccountId?: string;
          userId?: number;
        };
        /** The name of the board. */
        name?: string;
        /** The URL of the board. */
        self?: string;
        /** The type the board. */
        type?: string;
      }>
    > => {
      return jiraRequest<{
        admins?: {
          groups?: {
            name?: string;
            self?: string;
          }[];
          users?: {
            accountId?: string;
            active?: boolean;
            avatarUrls?: {
              "16x16"?: string;
              "24x24"?: string;
              "32x32"?: string;
              "48x48"?: string;
            };
            displayName?: string;
            key?: string;
            name?: string;
            self?: string;
          }[];
        };
        canEdit?: boolean;
        favourite?: boolean;
        id?: number;
        isPrivate?: boolean;
        location?: {
          avatarURI?: string;
          displayName?: string;
          name?: string;
          projectId?: number;
          projectKey?: string;
          projectName?: string;
          projectTypeKey?: string;
          userAccountId?: string;
          userId?: number;
        };
        name?: string;
        self?: string;
        type?: string;
      }>({
        path: "/rest/agile/1.0/board",
        method: "POST",
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /** Deletes the board. Admin without the view permission can still remove the board. */
    deleteBoard: async ({
      boardId,
      opts
    }: {
      /** ID of the board to be deleted */
      boardId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/agile/1.0/board/{boardId}",
        method: "DELETE",
        pathParams: {
          boardId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Removes the property from the board identified by the id. Ths user removing the
     * property is required to have permissions to modify the board.
     */
    deleteBoardProperty: async ({
      boardId,
      propertyKey,
      opts
    }: {
      /** the id of the board from which the property will be removed. */
      boardId: string;
      /** the key of the property to remove. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/agile/1.0/board/{boardId}/properties/{propertyKey}",
        method: "DELETE",
        pathParams: {
          boardId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Returns all boards. This only includes boards that the user has permission to
     * view.
     *
     * **Deprecation notice:** The required OAuth 2.0 scopes will be updated on
     * February 15, 2024.
     *
     *  *  `read:board-scope:jira-software`, `read:project:jira`
     *
     * @returns Returns the requested boards, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "startAt": 1,
     *   "total": 5,
     *   "values": [
     *     {
     *       "id": 84,
     *       "name": "scrum board",
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/84",
     *       "type": "scrum"
     *     },
     *     {
     *       "id": 92,
     *       "name": "kanban board",
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/92",
     *       "type": "kanban"
     *     }
     *   ]
     * }
     * ```
     */
    getAllBoards: async ({
      startAt,
      maxResults,
      type,
      name,
      projectKeyOrId,
      accountIdLocation,
      projectLocation,
      includePrivate,
      negateLocationFiltering,
      orderBy,
      expand,
      projectTypeLocation,
      filterId,
      opts
    }: {
      /**
       * The starting index of the returned boards. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of boards to return per page. See the 'Pagination' section
       * at the top of this page for more details.
       */
      maxResults?: number;
      /**
       * Filters results to boards of the specified types. Valid values: scrum, kanban,
       * simple.
       */
      type?: {};
      /** Filters results to boards that match or partially match the specified name. */
      name?: string;
      /**
       * Filters results to boards that are relevant to a project. Relevance means that
       * the jql filter defined in board contains a reference to a project.
       */
      projectKeyOrId?: string;
      accountIdLocation?: string;
      projectLocation?: string;
      /**
       * Appends private boards to the end of the list. The name and type fields are
       * excluded for security reasons.
       */
      includePrivate?: boolean;
      /** If set to true, negate filters used for querying by location. By default false. */
      negateLocationFiltering?: boolean;
      /**
       * Ordering of the results by a given field. If not provided, values will not be
       * sorted. Valid values: name.
       */
      orderBy?: "name" | "-name" | "+name";
      /** List of fields to expand for each board. Valid values: admins, permissions. */
      expand?: string;
      /**
       * Filters results to boards that are relevant to a project types. Support Jira
       * Software, Jira Service Management. Valid values: software, service\_desk. By
       * default software.
       */
      projectTypeLocation?: string[];
      /**
       * Filters results to boards that are relevant to a filter. Not supported for
       * next-gen boards.
       */
      filterId?: number;
    } & WithRequestOpts<TClient> = {}): Promise<
      JiraResult<{
        isLast?: boolean;
        maxResults?: number;
        startAt?: number;
        total?: number;
        values?: {
          admins?: {
            groups?: {
              name?: string;
              self?: string;
            }[];
            users?: {
              /**
               * The account ID of the user, which uniquely identifies the user across all
               * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
               */
              accountId?: string;
              /** Whether the user is active. */
              active?: boolean;
              /** The avatars of the user. */
              avatarUrls?: {
                /** The URL of the user's 16x16 pixel avatar. */
                "16x16"?: string;
                /** The URL of the user's 24x24 pixel avatar. */
                "24x24"?: string;
                /** The URL of the user's 32x32 pixel avatar. */
                "32x32"?: string;
                /** The URL of the user's 48x48 pixel avatar. */
                "48x48"?: string;
              };
              /**
               * The display name of the user. Depending on the user’s privacy setting, this may
               * return an alternative value.
               */
              displayName?: string;
              /**
               * This property is deprecated in favor of `accountId` because of privacy changes.
               * See the [migration
               * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
               * for details.
               * The key of the user.
               */
              key?: string;
              /**
               * This property is deprecated in favor of `accountId` because of privacy changes.
               * See the [migration
               * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
               * for details.
               * The username of the user.
               */
              name?: string;
              /** The URL of the user. */
              self?: string;
            }[];
          };
          /** Whether the board can be edited. */
          canEdit?: boolean;
          /** Whether the board is selected as a favorite. */
          favourite?: boolean;
          /** The ID of the board. */
          id?: number;
          /** Whether the board is private. */
          isPrivate?: boolean;
          /** The container that the board is located in. */
          location?: {
            avatarURI?: string;
            displayName?: string;
            name?: string;
            projectId?: number;
            projectKey?: string;
            projectName?: string;
            projectTypeKey?: string;
            userAccountId?: string;
            userId?: number;
          };
          /** The name of the board. */
          name?: string;
          /** The URL of the board. */
          self?: string;
          /** The type the board. */
          type?: string;
        }[];
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board",
        method: "GET",
        queryParams: {
          startAt,
          maxResults,
          type,
          name,
          projectKeyOrId,
          accountIdLocation,
          projectLocation,
          includePrivate,
          negateLocationFiltering,
          orderBy,
          expand,
          projectTypeLocation,
          filterId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all quick filters from a board, for a given board ID.
     *
     * @returns Returns the requested quick filters, at the specified page of the results. Quick filters will be ordered first by position.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "startAt": 1,
     *   "total": 5,
     *   "values": [
     *     {
     *       "boardId": 1,
     *       "description": "Issues of type bug",
     *       "id": 1,
     *       "jql": "issueType = bug",
     *       "name": "Bugs",
     *       "position": 0
     *     },
     *     {
     *       "boardId": 1,
     *       "description": "Issues of type task",
     *       "id": 2,
     *       "jql": "issueType = task",
     *       "name": "Tasks",
     *       "position": 0
     *     }
     *   ]
     * }
     * ```
     */
    getAllQuickFilters: async ({
      boardId,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID of the board that contains the requested quick filters. */
      boardId: number;
      /**
       * The starting index of the returned quick filters. Base index: 0. See the
       * 'Pagination' section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of sprints to return per page. See the 'Pagination' section
       * at the top of this page for more details.
       */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        isLast?: boolean;
        maxResults?: number;
        startAt?: number;
        total?: number;
        values?: {
          boardId?: number;
          description?: string;
          id?: number;
          jql?: string;
          name?: string;
          position?: number;
        }[];
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/quickfilter",
        method: "GET",
        pathParams: {
          boardId
        },
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all sprints from a board, for a given board ID. This only includes
     * sprints that the user has permission to view.
     *
     * @returns Returns the requested sprints, at the specified page of the results. Sprints will be ordered first by state (i.e. closed, active, future) then by their position in the backlog.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "startAt": 1,
     *   "total": 5,
     *   "values": [
     *     {
     *       "id": 37,
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *       "state": "closed",
     *       "name": "sprint 1",
     *       "startDate": "2015-04-11T15:22:00.000+10:00",
     *       "endDate": "2015-04-20T01:22:00.000+10:00",
     *       "completeDate": "2015-04-20T11:04:00.000+10:00",
     *       "originBoardId": 5,
     *       "goal": "sprint 1 goal"
     *     },
     *     {
     *       "id": 72,
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/73",
     *       "state": "future",
     *       "name": "sprint 2",
     *       "goal": "sprint 2 goal"
     *     }
     *   ]
     * }
     * ```
     */
    getAllSprints: async ({
      boardId,
      startAt,
      maxResults,
      state,
      opts
    }: {
      /** The ID of the board that contains the requested sprints. */
      boardId: number;
      /**
       * The starting index of the returned sprints. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of sprints to return per page. See the 'Pagination' section
       * at the top of this page for more details.
       */
      maxResults?: number;
      /**
       * Filters results to sprints in specified states. Valid values: future, active,
       * closed. You can define multiple states separated by commas, e.g.
       * state=active,closed
       */
      state?: {};
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/sprint",
        method: "GET",
        pathParams: {
          boardId
        },
        queryParams: {
          startAt,
          maxResults,
          state
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all versions from a board, for a given board ID. This only includes
     * versions that the user has permission to view. Note, if the user does not have
     * permission to view the board, no versions will be returned at all. Returned
     * versions are ordered by the name of the project from which they belong and then
     * by sequence defined by user.
     *
     * @returns Returns the requested versions, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "startAt": 1,
     *   "total": 5,
     *   "values": [
     *     {
     *       "archived": false,
     *       "description": "A first version",
     *       "id": 10000,
     *       "name": "Version 1",
     *       "projectId": 10000,
     *       "releaseDate": "2015-04-20T01:02:00.000+10:00",
     *       "released": true,
     *       "self": "https://your-domain.atlassian.net/version/10000"
     *     },
     *     {
     *       "archived": false,
     *       "description": "Minor Bugfix version",
     *       "id": 10010,
     *       "name": "Next Version",
     *       "projectId": 10000,
     *       "released": false,
     *       "self": "https://your-domain.atlassian.net/version/10010"
     *     }
     *   ]
     * }
     * ```
     */
    getAllVersions: async ({
      boardId,
      startAt,
      maxResults,
      released,
      opts
    }: {
      /** The ID of the board that contains the requested versions. */
      boardId: number;
      /**
       * The starting index of the returned versions. Base index: 0. See the
       * 'Pagination' section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of versions to return per page. See the 'Pagination' section
       * at the top of this page for more details.
       */
      maxResults?: number;
      /**
       * Filters results to versions that are either released or unreleased. Valid
       * values: true, false.
       */
      released?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/version",
        method: "GET",
        pathParams: {
          boardId
        },
        queryParams: {
          startAt,
          maxResults,
          released
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns the board for the given board ID. This board will only be returned if
     * the user has permission to view it. Admins without the view permission will see
     * the board as a private one, so will see only a subset of the board's data
     * (board location for instance).
     *
     * @returns Returns the requested board.
     *
     * example:
     * ```
     * {
     *   "id": 84,
     *   "location": {
     *     "displayName": "Example Project",
     *     "name": "Example Project",
     *     "projectId": 10040,
     *     "projectKey": "Example Project Key",
     *     "projectName": "Example Project",
     *     "projectTypeKey": "KEY",
     *     "userAccountId": "5b10a2844c20165700ede21g",
     *     "userId": 10040
     *   },
     *   "name": "scrum board",
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/84",
     *   "type": "scrum"
     * }
     * ```
     */
    getBoard: async ({
      boardId,
      opts
    }: {
      /** The ID of the requested board. */
      boardId: number;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        admins?: {
          groups?: {
            name?: string;
            self?: string;
          }[];
          users?: {
            /**
             * The account ID of the user, which uniquely identifies the user across all
             * Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
             */
            accountId?: string;
            /** Whether the user is active. */
            active?: boolean;
            /** The avatars of the user. */
            avatarUrls?: {
              /** The URL of the user's 16x16 pixel avatar. */
              "16x16"?: string;
              /** The URL of the user's 24x24 pixel avatar. */
              "24x24"?: string;
              /** The URL of the user's 32x32 pixel avatar. */
              "32x32"?: string;
              /** The URL of the user's 48x48 pixel avatar. */
              "48x48"?: string;
            };
            /**
             * The display name of the user. Depending on the user’s privacy setting, this may
             * return an alternative value.
             */
            displayName?: string;
            /**
             * This property is deprecated in favor of `accountId` because of privacy changes.
             * See the [migration
             * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
             * for details.
             * The key of the user.
             */
            key?: string;
            /**
             * This property is deprecated in favor of `accountId` because of privacy changes.
             * See the [migration
             * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
             * for details.
             * The username of the user.
             */
            name?: string;
            /** The URL of the user. */
            self?: string;
          }[];
        };
        /** Whether the board can be edited. */
        canEdit?: boolean;
        /** Whether the board is selected as a favorite. */
        favourite?: boolean;
        /** The ID of the board. */
        id?: number;
        /** Whether the board is private. */
        isPrivate?: boolean;
        /** The container that the board is located in. */
        location?: {
          avatarURI?: string;
          displayName?: string;
          name?: string;
          projectId?: number;
          projectKey?: string;
          projectName?: string;
          projectTypeKey?: string;
          userAccountId?: string;
          userId?: number;
        };
        /** The name of the board. */
        name?: string;
        /** The URL of the board. */
        self?: string;
        /** The type the board. */
        type?: string;
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}",
        method: "GET",
        pathParams: {
          boardId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns any boards which use the provided filter id. This method can be
     * executed by users without a valid software license in order to find which
     * boards are using a particular filter.
     *
     * @returns Returns the requested boards, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "id": 84,
     *   "name": "scrum board",
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/84"
     * }
     * ```
     */
    getBoardByFilterId: async ({
      filterId,
      startAt,
      maxResults,
      opts
    }: {
      /**
       * Filters results to boards that are relevant to a filter. Not supported for
       * next-gen boards.
       */
      filterId: number;
      /**
       * The starting index of the returned boards. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of boards to return per page. Default: 50. See the
       * 'Pagination' section at the top of this page for more details.
       */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        isLast?: boolean;
        maxResults?: number;
        startAt?: number;
        total?: number;
        values?: {
          id?: number;
          name?: string;
          self?: string;
        }[];
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/filter/{filterId}",
        method: "GET",
        pathParams: {
          filterId
        },
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all issues that belong to an epic on the board, for the given epic ID
     * and the board ID. This only includes issues that the user has permission to
     * view. Issues returned from this resource include Agile fields, like sprint,
     * closedSprints, flagged, and epic. By default, the returned issues are ordered
     * by rank.
     *
     * @returns Returns the requested issues, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "expand": "names,schema",
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "flagged": true,
     *         "sprint": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/13",
     *           "state": "future",
     *           "name": "sprint 2",
     *           "goal": "sprint 2 goal"
     *         },
     *         "closedSprints": [
     *           {
     *             "id": 37,
     *             "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *             "state": "closed",
     *             "name": "sprint 1",
     *             "startDate": "2015-04-11T15:22:00.000+10:00",
     *             "endDate": "2015-04-20T01:22:00.000+10:00",
     *             "completeDate": "2015-04-20T11:04:00.000+10:00",
     *             "goal": "sprint 1 goal"
     *           }
     *         ],
     *         "description": "example bug report",
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "epic": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *           "name": "epic 1",
     *           "summary": "epic 1 summary",
     *           "color": {
     *             "key": "color_4"
     *           },
     *           "done": true
     *         },
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "I did some work here."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10001",
     *       "key": "HSP-1",
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/92/issue/10001"
     *     }
     *   ],
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1
     * }
     * ```
     */
    getBoardIssuesForEpic: async ({
      boardId,
      epicId,
      startAt,
      maxResults,
      jql,
      validateQuery,
      fields,
      expand,
      opts
    }: {
      /** The ID of the board that contains the requested issues. */
      boardId: number;
      /** The ID of the epic that contains the requested issues. */
      epicId: number;
      /**
       * The starting index of the returned issues. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of issues to return per page. Default: 50. See the
       * 'Pagination' section at the top of this page for more details. Note, the total
       * number of issues returned is limited by the property
       * 'jira.search.views.default.max' in your Jira instance. If you exceed this
       * limit, your results will be truncated.
       */
      maxResults?: number;
      /**
       * Filters results using a JQL query. If you define an order in your JQL query, it
       * will override the default order of the returned issues.
       */
      jql?: string;
      /** Specifies whether to validate the JQL query or not. Default: true. */
      validateQuery?: boolean;
      /**
       * The list of fields to return for each issue. By default, all navigable and
       * Agile fields are returned.
       */
      fields?: {}[];
      /** A comma-separated list of the parameters to expand. */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/epic/{epicId}/issue",
        method: "GET",
        pathParams: {
          boardId,
          epicId
        },
        queryParams: {
          startAt,
          maxResults,
          jql,
          validateQuery,
          fields,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Get all issues you have access to that belong to the sprint from the board.
     * Issue returned from this resource contains additional fields like: sprint,
     * closedSprints, flagged and epic. Issues are returned ordered by rank. JQL order
     * has higher priority than default rank.
     *
     * @returns Returns the requested issues, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "expand": "names,schema",
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "flagged": true,
     *         "sprint": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/13",
     *           "state": "future",
     *           "name": "sprint 2",
     *           "goal": "sprint 2 goal"
     *         },
     *         "closedSprints": [
     *           {
     *             "id": 37,
     *             "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *             "state": "closed",
     *             "name": "sprint 1",
     *             "startDate": "2015-04-11T15:22:00.000+10:00",
     *             "endDate": "2015-04-20T01:22:00.000+10:00",
     *             "completeDate": "2015-04-20T11:04:00.000+10:00",
     *             "goal": "sprint 1 goal"
     *           }
     *         ],
     *         "description": "example bug report",
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "epic": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *           "name": "epic 1",
     *           "summary": "epic 1 summary",
     *           "color": {
     *             "key": "color_4"
     *           },
     *           "done": true
     *         },
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "I did some work here."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10001",
     *       "key": "HSP-1",
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/92/issue/10001"
     *     }
     *   ],
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1
     * }
     * ```
     */
    getBoardIssuesForSprint: async ({
      boardId,
      sprintId,
      startAt,
      maxResults,
      jql,
      validateQuery,
      fields,
      expand,
      opts
    }: {
      /** The ID of the board that contains requested issues. */
      boardId: number;
      /** The ID of the sprint that contains requested issues. */
      sprintId: number;
      /**
       * The starting index of the returned issues. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of issues to return per page. See the 'Pagination' section
       * at the top of this page for more details. Note, the total number of issues
       * returned is limited by the property 'jira.search.views.default.max' in your
       * Jira instance. If you exceed this limit, your results will be truncated.
       */
      maxResults?: number;
      /**
       * Filters results using a JQL query. If you define an order in your JQL query, it
       * will override the default order of the returned issues.
       * Note that `username` and `userkey` can't be used as search terms for this
       * parameter due to privacy reasons. Use `accountId` instead.
       */
      jql?: string;
      /** Specifies whether to validate the JQL query or not. Default: true. */
      validateQuery?: boolean;
      /**
       * The list of fields to return for each issue. By default, all navigable and
       * Agile fields are returned.
       */
      fields?: {}[];
      /** A comma-separated list of the parameters to expand. */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/sprint/{sprintId}/issue",
        method: "GET",
        pathParams: {
          boardId,
          sprintId
        },
        queryParams: {
          startAt,
          maxResults,
          jql,
          validateQuery,
          fields,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns the value of the property with a given key from the board identified by
     * the provided id. The user who retrieves the property is required to have
     * permissions to view the board.
     *
     * @returns Returned if the board exists and the property was found.
     */
    getBoardProperty: async ({
      boardId,
      propertyKey,
      opts
    }: {
      /** the ID of the board from which the property will be returned. */
      boardId: string;
      /** the key of the property to return. */
      propertyKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/properties/{propertyKey}",
        method: "GET",
        pathParams: {
          boardId,
          propertyKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns the keys of all properties for the board identified by the id. The user
     * who retrieves the property keys is required to have permissions to view the
     * board.
     *
     * @returns Returned if the board with given id exists.
     */
    getBoardPropertyKeys: async ({
      boardId,
      opts
    }: {
      /** the ID of the board from which property keys will be returned. */
      boardId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/properties",
        method: "GET",
        pathParams: {
          boardId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Get the board configuration. The response contains the following fields:
     *
     *  *  `id` \- ID of the board.
     *  *  `name` \- Name of the board.
     *  *  `filter` \- Reference to the filter used by the given board.
     *  *  `location` \- Reference to the container that the board is located in.
     * Includes the container type (Valid values: project, user).
     *  *  `subQuery` (Kanban only) - JQL subquery used by the given board.
     *  *  `columnConfig` \- The column configuration lists the columns for the board,
     * in the order defined in the column configuration. For each column, it shows the
     * issue status mapping as well as the constraint type (Valid values: none,
     * issueCount, issueCountExclSubs) for the min/max number of issues. Note, the
     * last column with statuses mapped to it is treated as the "Done" column, which
     * means that issues in that column will be marked as already completed.
     *  *  `estimation` (Scrum only) - Contains information about type of estimation
     * used for the board. Valid values: none, issueCount, field. If the estimation
     * type is "field", the ID and display name of the field used for estimation is
     * also returned. Note, estimates for an issue can be updated by a PUT
     * /rest/api/3/issue/\{issueIdOrKey\} request, however the fields must be on the
     * screen. "timeoriginalestimate" field will never be on the screen, so in order
     * to update it "originalEstimate" in "timetracking" field should be updated.
     *  *  `ranking` \- Contains information about custom field used for ranking in
     * the given board.
     *
     * @returns Returns the configuration of the board for given boardId.
     *
     * example:
     * ```
     * {
     *   "columnConfig": {
     *     "columns": [
     *       {
     *         "name": "To Do",
     *         "statuses": [
     *           {
     *             "id": "1",
     *             "self": "https://your-domain.atlassian.net/status/1"
     *           },
     *           {
     *             "id": "4",
     *             "self": "https://your-domain.atlassian.net/status/4"
     *           }
     *         ]
     *       },
     *       {
     *         "max": 4,
     *         "min": 2,
     *         "name": "In progress",
     *         "statuses": [
     *           {
     *             "id": "3",
     *             "self": "https://your-domain.atlassian.net/status/3"
     *           }
     *         ]
     *       },
     *       {
     *         "name": "Done",
     *         "statuses": [
     *           {
     *             "id": "5",
     *             "self": "https://your-domain.atlassian.net/status/5"
     *           }
     *         ]
     *       }
     *     ],
     *     "constraintType": "issueCount"
     *   },
     *   "estimation": {
     *     "field": {
     *       "displayName": "Story Points",
     *       "fieldId": "customfield_10002"
     *     },
     *     "type": "field"
     *   },
     *   "filter": {
     *     "id": "1001",
     *     "self": "https://your-domain.atlassian.net/filter/1001"
     *   },
     *   "id": 10000,
     *   "location": {
     *     "id": "10010",
     *     "key": "PROJ",
     *     "name": "name",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/project/10010",
     *     "type": "project"
     *   },
     *   "name": "Board",
     *   "ranking": {
     *     "rankCustomFieldId": 10020
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/84/config"
     * }
     * ```
     */
    getConfiguration: async ({
      boardId,
      opts
    }: {
      /** The ID of the board for which configuration is requested. */
      boardId: number;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        columnConfig?: {
          columns?: {
            max?: number;
            min?: number;
            name?: string;
            statuses?: {
              id?: string;
              self?: string;
            }[];
          }[];
          constraintType?: string;
        };
        estimation?: {
          field?: {
            displayName?: string;
            fieldId?: string;
          };
          type?: string;
        };
        filter?: {
          id?: string;
          self?: string;
        };
        id?: number;
        location?: {
          projectKeyOrId?: string;
          type?: "project" | "user";
        };
        name?: string;
        ranking?: {
          rankCustomFieldId?: number;
        };
        self?: string;
        subQuery?: {
          query?: string;
        };
        type?: string;
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/configuration",
        method: "GET",
        pathParams: {
          boardId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all epics from the board, for the given board ID. This only includes
     * epics that the user has permission to view. Note, if the user does not have
     * permission to view the board, no epics will be returned at all.
     *
     * @returns Returns the requested epics, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "isLast": false,
     *   "maxResults": 2,
     *   "startAt": 1,
     *   "total": 5,
     *   "values": [
     *     {
     *       "id": 37,
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *       "name": "epic 1",
     *       "summary": "epic 1 summary",
     *       "color": {
     *         "key": "color_4"
     *       },
     *       "done": true
     *     },
     *     {
     *       "id": 37,
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/13",
     *       "name": "epic 2",
     *       "summary": "epic 2 summary",
     *       "color": {
     *         "key": "color_2"
     *       },
     *       "done": false
     *     }
     *   ]
     * }
     * ```
     */
    getEpics: async ({
      boardId,
      startAt,
      maxResults,
      done,
      opts
    }: {
      /** The ID of the board that contains the requested epics. */
      boardId: number;
      /**
       * The starting index of the returned epics. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of epics to return per page. See the 'Pagination' section at
       * the top of this page for more details.
       */
      maxResults?: number;
      /**
       * Filters results to epics that are either done or not done. Valid values: true,
       * false.
       */
      done?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/epic",
        method: "GET",
        pathParams: {
          boardId
        },
        queryParams: {
          startAt,
          maxResults,
          done
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /** @returns 200 response */
    getFeaturesForBoard: async ({
      boardId,
      opts
    }: {
      boardId: number;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        features?: {
          boardFeature?:
            | "SIMPLE_ROADMAP"
            | "BACKLOG"
            | "SPRINTS"
            | "CALENDAR"
            | "DEVTOOLS"
            | "REPORTS"
            | "ESTIMATION"
            | "PAGES"
            | "CODE"
            | "SECURITY"
            | "REQUESTS"
            | "INCIDENTS"
            | "RELEASES"
            | "DEPLOYMENTS"
            | "ISSUE_NAVIGATOR"
            | "ON_CALL_SCHEDULE"
            | "BOARD"
            | "GOALS"
            | "LIST_VIEW";
          boardId?: number;
          featureId?: string;
          featureType?: "BASIC" | "ESTIMATION";
          imageUri?: string;
          learnMoreArticleId?: string;
          learnMoreLink?: string;
          localisedDescription?: string;
          localisedGroup?: string;
          localisedName?: string;
          permissibleEstimationTypes?: {
            localisedDescription?: string;
            localisedName?: string;
            value?: "STORY_POINTS" | "ORIGINAL_ESTIMATE";
          }[];
          state?: "ENABLED" | "DISABLED" | "COMING_SOON";
          toggleLocked?: boolean;
        }[];
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/features",
        method: "GET",
        pathParams: {
          boardId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all issues from the board's backlog, for the given board ID. This only
     * includes issues that the user has permission to view. The backlog contains
     * incomplete issues that are not assigned to any future or active sprint. Note,
     * if the user does not have permission to view the board, no issues will be
     * returned at all. Issues returned from this resource include Agile fields, like
     * sprint, closedSprints, flagged, and epic. By default, the returned issues are
     * ordered by rank.
     *
     * @returns Returns the requested issues, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "expand": "names,schema",
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "flagged": true,
     *         "sprint": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/13",
     *           "state": "future",
     *           "name": "sprint 2",
     *           "goal": "sprint 2 goal"
     *         },
     *         "closedSprints": [
     *           {
     *             "id": 37,
     *             "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *             "state": "closed",
     *             "name": "sprint 1",
     *             "startDate": "2015-04-11T15:22:00.000+10:00",
     *             "endDate": "2015-04-20T01:22:00.000+10:00",
     *             "completeDate": "2015-04-20T11:04:00.000+10:00",
     *             "goal": "sprint 1 goal"
     *           }
     *         ],
     *         "description": "example bug report",
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "epic": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *           "name": "epic 1",
     *           "summary": "epic 1 summary",
     *           "color": {
     *             "key": "color_4"
     *           },
     *           "done": true
     *         },
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "I did some work here."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10001",
     *       "key": "HSP-1",
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/92/issue/10001"
     *     }
     *   ],
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1
     * }
     * ```
     */
    getIssuesForBacklog: async ({
      boardId,
      startAt,
      maxResults,
      jql,
      validateQuery,
      fields,
      expand,
      opts
    }: {
      /** The ID of the board that has the backlog containing the requested issues. */
      boardId: number;
      /**
       * The starting index of the returned issues. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of issues to return per page. Default: 50. See the
       * 'Pagination' section at the top of this page for more details. Note, the total
       * number of issues returned is limited by the property
       * 'jira.search.views.default.max' in your Jira instance. If you exceed this
       * limit, your results will be truncated.
       */
      maxResults?: number;
      /**
       * Filters results using a JQL query. If you define an order in your JQL query, it
       * will override the default order of the returned issues.
       * Note that `username` and `userkey` can't be used as search terms for this
       * parameter due to privacy reasons. Use `accountId` instead.
       */
      jql?: string;
      /** Specifies whether to validate the JQL query or not. Default: true. */
      validateQuery?: boolean;
      /**
       * The list of fields to return for each issue. By default, all navigable and
       * Agile fields are returned.
       */
      fields?: {}[];
      /** This parameter is currently not used. */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SearchResults>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/backlog",
        method: "GET",
        pathParams: {
          boardId
        },
        queryParams: {
          startAt,
          maxResults,
          jql,
          validateQuery,
          fields,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all issues from a board, for a given board ID. This only includes
     * issues that the user has permission to view. An issue belongs to the board if
     * its status is mapped to the board's column. Epic issues do not belongs to the
     * scrum boards. Note, if the user does not have permission to view the board, no
     * issues will be returned at all. Issues returned from this resource include
     * Agile fields, like sprint, closedSprints, flagged, and epic. By default, the
     * returned issues are ordered by rank.
     *
     * @returns Returns the requested issues, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "expand": "names,schema",
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "flagged": true,
     *         "sprint": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/13",
     *           "state": "future",
     *           "name": "sprint 2",
     *           "goal": "sprint 2 goal"
     *         },
     *         "closedSprints": [
     *           {
     *             "id": 37,
     *             "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *             "state": "closed",
     *             "name": "sprint 1",
     *             "startDate": "2015-04-11T15:22:00.000+10:00",
     *             "endDate": "2015-04-20T01:22:00.000+10:00",
     *             "completeDate": "2015-04-20T11:04:00.000+10:00",
     *             "goal": "sprint 1 goal"
     *           }
     *         ],
     *         "description": "example bug report",
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "epic": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *           "name": "epic 1",
     *           "summary": "epic 1 summary",
     *           "color": {
     *             "key": "color_4"
     *           },
     *           "done": true
     *         },
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "I did some work here."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10001",
     *       "key": "HSP-1",
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/92/issue/10001"
     *     }
     *   ],
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1
     * }
     * ```
     */
    getIssuesForBoard: async ({
      boardId,
      startAt,
      maxResults,
      jql,
      validateQuery,
      fields,
      expand,
      opts
    }: {
      /** The ID of the board that contains the requested issues. */
      boardId: number;
      /**
       * The starting index of the returned issues. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of issues to return per page. See the 'Pagination' section
       * at the top of this page for more details. Note, the total number of issues
       * returned is limited by the property 'jira.search.views.default.max' in your
       * Jira instance. If you exceed this limit, your results will be truncated.
       */
      maxResults?: number;
      /**
       * Filters results using a JQL query. If you define an order in your JQL query, it
       * will override the default order of the returned issues.
       * Note that `username` and `userkey` can't be used as search terms for this
       * parameter due to privacy reasons. Use `accountId` instead.
       */
      jql?: string;
      /** Specifies whether to validate the JQL query or not. Default: true. */
      validateQuery?: boolean;
      /**
       * The list of fields to return for each issue. By default, all navigable and
       * Agile fields are returned.
       */
      fields?: {}[];
      /** This parameter is currently not used. */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SearchResults>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/issue",
        method: "GET",
        pathParams: {
          boardId
        },
        queryParams: {
          startAt,
          maxResults,
          jql,
          validateQuery,
          fields,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all issues that do not belong to any epic on a board, for a given board
     * ID. This only includes issues that the user has permission to view. Issues
     * returned from this resource include Agile fields, like sprint, closedSprints,
     * flagged, and epic. By default, the returned issues are ordered by rank.
     *
     * @returns Returns the requested issues, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "expand": "names,schema",
     *   "issues": [
     *     {
     *       "expand": "",
     *       "fields": {
     *         "flagged": true,
     *         "sprint": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/13",
     *           "state": "future",
     *           "name": "sprint 2",
     *           "goal": "sprint 2 goal"
     *         },
     *         "closedSprints": [
     *           {
     *             "id": 37,
     *             "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
     *             "state": "closed",
     *             "name": "sprint 1",
     *             "startDate": "2015-04-11T15:22:00.000+10:00",
     *             "endDate": "2015-04-20T01:22:00.000+10:00",
     *             "completeDate": "2015-04-20T11:04:00.000+10:00",
     *             "goal": "sprint 1 goal"
     *           }
     *         ],
     *         "description": "example bug report",
     *         "project": {
     *           "avatarUrls": {
     *             "16x16": "https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000",
     *             "24x24": "https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000",
     *             "32x32": "https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000",
     *             "48x48": "https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000"
     *           },
     *           "id": "10000",
     *           "insight": {
     *             "lastIssueUpdateTime": "2021-04-22T05:37:05.000+0000",
     *             "totalIssueCount": 100
     *           },
     *           "key": "EX",
     *           "name": "Example",
     *           "projectCategory": {
     *             "description": "First Project Category",
     *             "id": "10000",
     *             "name": "FIRST",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000"
     *           },
     *           "self": "https://your-domain.atlassian.net/rest/api/3/project/EX",
     *           "simplified": false,
     *           "style": "classic"
     *         },
     *         "comment": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "body": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "created": "2021-01-17T12:34:00.000+0000",
     *             "id": "10000",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "Administrators",
     *               "type": "role",
     *               "value": "Administrators"
     *             }
     *           }
     *         ],
     *         "epic": {
     *           "id": 37,
     *           "self": "https://your-domain.atlassian.net/rest/agile/1.0/epic/23",
     *           "name": "epic 1",
     *           "summary": "epic 1 summary",
     *           "color": {
     *             "key": "color_4"
     *           },
     *           "done": true
     *         },
     *         "worklog": [
     *           {
     *             "author": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "comment": {
     *               "type": "doc",
     *               "version": 1,
     *               "content": [
     *                 {
     *                   "type": "paragraph",
     *                   "content": [
     *                     {
     *                       "type": "text",
     *                       "text": "I did some work here."
     *                     }
     *                   ]
     *                 }
     *               ]
     *             },
     *             "id": "100028",
     *             "issueId": "10002",
     *             "self": "https://your-domain.atlassian.net/rest/api/3/issue/10010/worklog/10000",
     *             "started": "2021-01-17T12:34:00.000+0000",
     *             "timeSpent": "3h 20m",
     *             "timeSpentSeconds": 12000,
     *             "updateAuthor": {
     *               "accountId": "5b10a2844c20165700ede21g",
     *               "active": false,
     *               "displayName": "Mia Krystof",
     *               "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *             },
     *             "updated": "2021-01-18T23:45:00.000+0000",
     *             "visibility": {
     *               "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
     *               "type": "group",
     *               "value": "jira-developers"
     *             }
     *           }
     *         ],
     *         "updated": 1,
     *         "timetracking": {
     *           "originalEstimate": "10m",
     *           "originalEstimateSeconds": 600,
     *           "remainingEstimate": "3m",
     *           "remainingEstimateSeconds": 200,
     *           "timeSpent": "6m",
     *           "timeSpentSeconds": 400
     *         }
     *       },
     *       "id": "10001",
     *       "key": "HSP-1",
     *       "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/92/issue/10001"
     *     }
     *   ],
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 1
     * }
     * ```
     */
    getIssuesWithoutEpicForBoard: async ({
      boardId,
      startAt,
      maxResults,
      jql,
      validateQuery,
      fields,
      expand,
      opts
    }: {
      /** The ID of the board that contains the requested issues. */
      boardId: number;
      /**
       * The starting index of the returned issues. Base index: 0. See the 'Pagination'
       * section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of issues to return per page. See the 'Pagination' section
       * at the top of this page for more details. Note, the total number of issues
       * returned is limited by the property 'jira.search.views.default.max' in your
       * Jira instance. If you exceed this limit, your results will be truncated.
       */
      maxResults?: number;
      /**
       * Filters results using a JQL query. If you define an order in your JQL query, it
       * will override the default order of the returned issues.
       * Note that `username` and `userkey` can't be used as search terms for this
       * parameter due to privacy reasons. Use `accountId` instead.
       */
      jql?: string;
      /** Specifies whether to validate the JQL query or not. Default: true. */
      validateQuery?: boolean;
      /**
       * The list of fields to return for each issue. By default, all navigable and
       * Agile fields are returned.
       */
      fields?: {}[];
      /** A comma-separated list of the parameters to expand. */
      expand?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/epic/none/issue",
        method: "GET",
        pathParams: {
          boardId
        },
        queryParams: {
          startAt,
          maxResults,
          jql,
          validateQuery,
          fields,
          expand
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all projects that are associated with the board, for the given board
     * ID. If the user does not have permission to view the board, no projects will be
     * returned at all. Returned projects are ordered by the name.
     *
     * A project is associated with a board if the board filter contains reference the
     * project or there is an issue from the project that belongs to the board.
     *
     * The board filter contains reference the project only if JQL query guarantees
     * that returned issues will be returned from the project set defined in JQL. For
     * instance the query `project in (ABC, BCD) AND reporter = admin` have reference
     * to ABC and BCD projects but query `project in (ABC, BCD) OR reporter = admin`
     * doesn't have reference to any project.
     *
     * An issue belongs to the board if its status is mapped to the board's column.
     * Epic issues do not belongs to the scrum boards.
     *
     * @returns Returns the board's projects, at the specified page of the results.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 10,
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "avatarUrls": {
     *         "16x16": "secure/projectavatar?size=xsmall&pid=10000",
     *         "24x24": "secure/projectavatar?size=small&pid=10000",
     *         "32x32": "secure/projectavatar?size=medium&pid=10000",
     *         "48x48": "secure/projectavatar?size=large&pid=10000"
     *       },
     *       "id": "10000",
     *       "key": "EX",
     *       "name": "Example",
     *       "projectCategory": {
     *         "description": "Project category description",
     *         "id": "10000",
     *         "name": "A project category"
     *       },
     *       "projectTypeKey": "ProjectTypeKey{key='software'}",
     *       "self": "project/EX",
     *       "simplified": false
     *     }
     *   ]
     * }
     * ```
     */
    getProjects: async ({
      boardId,
      startAt,
      maxResults,
      opts
    }: {
      /** The ID of the board that contains returned projects. */
      boardId: number;
      /**
       * The starting index of the returned projects. Base index: 0. See the
       * 'Pagination' section at the top of this page for more details.
       */
      startAt?: number;
      /**
       * The maximum number of projects to return per page. See the 'Pagination' section
       * at the top of this page for more details.
       */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/project",
        method: "GET",
        pathParams: {
          boardId
        },
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Returns all projects that are statically associated with the board, for the
     * given board ID. Returned projects are ordered by the name.
     *
     * A project is associated with a board if the board filter contains reference the
     * project.
     *
     * The board filter contains reference the project only if JQL query guarantees
     * that returned issues will be returned from the project set defined in JQL. For
     * instance the query `project in (ABC, BCD) AND reporter = admin` have reference
     * to ABC and BCD projects but query `project in (ABC, BCD) OR reporter = admin`
     * doesn't have reference to any project.
     */
    getProjectsFull: async ({
      boardId,
      opts
    }: {
      /** The ID of the board that contains returned projects. */
      boardId: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/project/full",
        method: "GET",
        pathParams: {
          boardId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },
    /**
     * Returns the quick filter for a given quick filter ID. The quick filter will
     * only be returned if the user can view the board that the quick filter belongs
     * to.
     *
     * @returns Returns the requested quick filter.
     *
     * example:
     * ```
     * {
     *   "boardId": 1,
     *   "description": "Issues of type bug",
     *   "id": 1,
     *   "jql": "issueType = bug",
     *   "name": "Bugs",
     *   "position": 0
     * }
     * ```
     */
    getQuickFilter: async ({
      boardId,
      quickFilterId,
      opts
    }: {
      boardId: number;
      /** The ID of the requested quick filter. */
      quickFilterId: number;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        boardId?: number;
        description?: string;
        id?: number;
        jql?: string;
        name?: string;
        position?: number;
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/quickfilter/{quickFilterId}",
        method: "GET",
        pathParams: {
          boardId,
          quickFilterId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /** @returns 200 response */
    getReportsForBoard: async ({
      boardId,
      opts
    }: {
      boardId: number;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        reports?: {}[];
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/reports",
        method: "GET",
        pathParams: {
          boardId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Move issues from the backog to the board (if they are already in the backlog of
     * that board).
     * This operation either moves an issue(s) onto a board from the backlog (by
     * adding it to the issueList for the board) Or transitions the issue(s) to the
     * first column for a kanban board with backlog. At most 50 issues may be moved at
     * once.
     *
     * @returns Returns the list of issue with status of rank operation.
     *
     * example:
     * ```
     * {
     *   "entries": [
     *     {
     *       "issueId": 10000,
     *       "issueKey": "PR-1",
     *       "status": 200
     *     },
     *     {
     *       "issueId": 10001,
     *       "issueKey": "PR-2",
     *       "status": 200
     *     },
     *     {
     *       "errors": [
     *         "JIRA Agile cannot execute the rank operation at this time. Please try again later."
     *       ],
     *       "issueId": 10002,
     *       "issueKey": "PR-3",
     *       "status": 503
     *     }
     *   ]
     * }
     * ```
     */
    moveIssuesToBoard: async ({
      boardId,
      requestBody,
      opts
    }: {
      boardId: number;
      /**
       * @example
       * {
       *   "issues": [
       *     "PR-1",
       *     "10001",
       *     "PR-3"
       *   ],
       *   "rankBeforeIssue": "PR-4",
       *   "rankCustomFieldId": 10521
       * }
       */
      requestBody: {
        issues?: string[];
        rankAfterIssue?: string;
        rankBeforeIssue?: string;
        rankCustomFieldId?: number;
      };
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        entries?: {
          errors?: string[];
          issueId?: number;
          issueKey?: string;
          status?: number;
        }[];
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/issue",
        method: "POST",
        pathParams: {
          boardId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /**
     * Sets the value of the specified board's property.
     *
     * You can use this resource to store a custom data against the board identified
     * by the id. The user who stores the data is required to have permissions to
     * modify the board.
     *
     * @returns
     *  * status: 200, mediaType: application/json
     *
     *    Returned if the board property is successfully updated.
     *
     *  * status: 201, mediaType: application/json
     *
     *    Returned if the board property is successfully created.
     */
    setBoardProperty: async ({
      boardId,
      propertyKey,
      requestBody,
      opts
    }: {
      /** the ID of the board on which the property will be set. */
      boardId: string;
      /** the key of the board's property. The maximum length of the key is 255 bytes. */
      propertyKey: string;
      /**
       * The value of the property. The value has to be a valid, non-empty
       * [JSON](https://tools.ietf.org/html/rfc4627) value. The maximum length of the
       * property value is 32768 bytes.
       */
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        created: boolean;
        body: unknown;
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/properties/{propertyKey}",
        method: "PUT",
        pathParams: {
          boardId,
          propertyKey
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    },
    /** @returns 200 response */
    toggleFeatures: async ({
      boardId,
      requestBody,
      opts
    }: {
      boardId: number;
      requestBody: {
        boardId?: number;
        enabling?: boolean;
        feature?: string;
      };
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<{
        features?: {
          boardFeature?:
            | "SIMPLE_ROADMAP"
            | "BACKLOG"
            | "SPRINTS"
            | "CALENDAR"
            | "DEVTOOLS"
            | "REPORTS"
            | "ESTIMATION"
            | "PAGES"
            | "CODE"
            | "SECURITY"
            | "REQUESTS"
            | "INCIDENTS"
            | "RELEASES"
            | "DEPLOYMENTS"
            | "ISSUE_NAVIGATOR"
            | "ON_CALL_SCHEDULE"
            | "BOARD"
            | "GOALS"
            | "LIST_VIEW";
          boardId?: number;
          featureId?: string;
          featureType?: "BASIC" | "ESTIMATION";
          imageUri?: string;
          learnMoreArticleId?: string;
          learnMoreLink?: string;
          localisedDescription?: string;
          localisedGroup?: string;
          localisedName?: string;
          permissibleEstimationTypes?: {
            localisedDescription?: string;
            localisedName?: string;
            value?: "STORY_POINTS" | "ORIGINAL_ESTIMATE";
          }[];
          state?: "ENABLED" | "DISABLED" | "COMING_SOON";
          toggleLocked?: boolean;
        }[];
      }>
    > => {
      return jiraRequest({
        path: "/rest/agile/1.0/board/{boardId}/features",
        method: "PUT",
        pathParams: {
          boardId
        },
        body: JSON.stringify(requestBody),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
