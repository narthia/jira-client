import type {
  IssueTypeDetails,
  Avatar,
  IssueTypeCreateBean,
  IssueTypeUpdateBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issues types. Use it to:
 *
 *  *  get, create, update, and delete issue types.
 *  *  get all issue types for a user.
 *  *  get alternative issue types.
 *  *  set an avatar for an issue type.
 */
export default function issueTypes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates an issue type and adds it to the default issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    createIssueType: async ({
      issueTypeCreateBean,
      opts
    }: {
      /**
       * @example
       * {
       *   "description": "description",
       *   "name": "name",
       *   "type": "standard"
       * }
       */
      issueTypeCreateBean: IssueTypeCreateBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeDetails>> => {
      return jiraRequest<IssueTypeDetails>({
        path: "/rest/api/3/issuetype",
        method: "POST",
        body: JSON.stringify(issueTypeCreateBean),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Loads an avatar for the issue type.
     *
     * Specify the avatar's local file location in the body of the request. Also,
     * include the following headers:
     *
     *  *  `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the
     * request, for more information see [Special Headers](#special-request-headers).
     *  *  `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
     *
     * For example:
     * `curl --request POST \ --user email@example.com:<api_token> \ --header
     * 'X-Atlassian-Token: no-check' \ --header 'Content-Type: image/< image_type>' \
     * --data-binary "<@/path/to/file/with/your/avatar>" \ --url
     * 'https://your-domain.atlassian.net/rest/api/3/issuetype/{issueTypeId}'This`
     *
     * The avatar is cropped to a square. If no crop parameters are specified, the
     * square originates at the top left of the image. The length of the square's
     * sides is set to the smaller of the height or width of the image.
     *
     * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and
     * 48x48 in size.
     *
     * After creating the avatar, use [ Update issue
     * type](#api-rest-api-3-issuetype-id-put) to set it as the issue type's displayed
     * avatar.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "1010",
     *   "isDeletable": true,
     *   "isSelected": false,
     *   "isSystemAvatar": false
     * }
     * ```
     */
    createIssueTypeAvatar: async ({
      id,
      x,
      y,
      size,
      mediaType,
      requestBody,
      opts
    }: {
      /** The ID of the issue type. */
      id: string;
      /** The X coordinate of the top-left corner of the crop region. */
      x?: number;
      /** The Y coordinate of the top-left corner of the crop region. */
      y?: number;
      /** The length of each side of the crop region. */
      size: number;
      mediaType: string;
      requestBody: unknown;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Avatar>> => {
      return jiraRequest<Avatar>({
        path: "/rest/api/3/issuetype/{id}/avatar2",
        method: "POST",
        pathParams: {
          id
        },
        queryParams: {
          x,
          y,
          size
        },
        body: JSON.stringify(requestBody),
        config,
        opts: {
          ...opts,
          headers: {
            "Content-Type": mediaType
          }
        },
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an issue type.
     *
     * If the issue type is in use, all issues created with this issue type are
     * updated to use the request's `alternativeIssueTypeId`. A list of alternative
     * issue types are obtained from the [Get alternative issue
     * types](#api-rest-api-3-issuetype-id-alternatives-get) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deleteIssueType: async ({
      id,
      alternativeIssueTypeId,
      opts
    }: {
      /** The ID of the issue type. */
      id: string;
      /** The ID of the replacement issue type. */
      alternativeIssueTypeId?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issuetype/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          alternativeIssueTypeId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a list of issue types that can be used to replace the issue type. The
     * alternative issue types are those assigned to the same workflow schemes,
     * field configurations, and so on.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getAlternativeIssueTypes: async ({
      id,
      opts
    }: {
      /** The ID of the issue type. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeDetails[]>> => {
      return jiraRequest<IssueTypeDetails[]>({
        path: "/rest/api/3/issuetype/{id}/alternatives",
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
     * Returns all issue types.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getIssueAllTypes: async ({
      opts
    }: WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeDetails[]>> => {
      return jiraRequest<IssueTypeDetails[]>({
        path: "/rest/api/3/issuetype",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns an issue type.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira.
     *
     * @returns Returned if the request is successful.
     */
    getIssueType: async ({
      id,
      opts
    }: {
      /** The ID of the issue type. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeDetails>> => {
      return jiraRequest<IssueTypeDetails>({
        path: "/rest/api/3/issuetype/{id}",
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
     * Returns a list of issue types for a project.
     *
     * The list contains all issue types in the project, whether they are in a project
     * level issue type scheme or inherited from a global issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project in which
     * the issue types are used.
     *
     * @returns Returned if the request is successful.
     */
    getIssueTypesForProject: async ({
      projectId,
      level,
      opts
    }: {
      /** The ID of the project. */
      projectId: number;
      /**
       * The level of the issue type to filter by. Use:
       *
       *  *  `-1` for Subtask.
       *  *  `0` for Base.
       *  *  `1` for Epic.
       */
      level?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeDetails[]>> => {
      return jiraRequest<IssueTypeDetails[]>({
        path: "/rest/api/3/issuetype/project",
        method: "GET",
        queryParams: {
          projectId,
          level
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates the issue type.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateIssueType: async ({
      id,
      issueTypeUpdateBean,
      opts
    }: {
      /** The ID of the issue type. */
      id: string;
      /**
       * @example
       * {
       *   "avatarId": 1,
       *   "description": "description",
       *   "name": "name"
       * }
       */
      issueTypeUpdateBean: IssueTypeUpdateBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeDetails>> => {
      return jiraRequest<IssueTypeDetails>({
        path: "/rest/api/3/issuetype/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(issueTypeUpdateBean),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
