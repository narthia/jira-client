import type {
  SystemAvatars,
  Avatars,
  StreamingResponseBody,
  Avatar,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents system and custom avatars. Use it to obtain the
 * details of system or custom avatars, add and remove avatars from a project,
 * issue type or priority and obtain avatar images.
 */
export default function avatars<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes an avatar from a project, issue type or priority.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteAvatar: async ({
      type,
      owningObjectId,
      id,
      opts
    }: {
      /** The avatar type. */
      type: "project" | "issuetype" | "priority";
      /** The ID of the item the avatar is associated with. */
      owningObjectId: string;
      /** The ID of the avatar. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/universal_avatar/type/{type}/owner/{owningObjectId}/avatar/{id}",
        method: "DELETE",
        pathParams: {
          type,
          owningObjectId,
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a list of system avatar details by owner type, where the owner types
     * are issue type, project, user or priority.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "system": [
     *     {
     *       "id": "1000",
     *       "isDeletable": false,
     *       "isSelected": false,
     *       "isSystemAvatar": true,
     *       "urls": {
     *         "16x16": "/secure/useravatar?size=xsmall&avatarId=10040&avatarType=project",
     *         "24x24": "/secure/useravatar?size=small&avatarId=10040&avatarType=project",
     *         "32x32": "/secure/useravatar?size=medium&avatarId=10040&avatarType=project",
     *         "48x48": "/secure/useravatar?avatarId=10040&avatarType=project"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getAllSystemAvatars: async ({
      type,
      opts
    }: {
      /** The avatar type. */
      type: "issuetype" | "project" | "user" | "priority";
    } & WithRequestOpts<TClient>): Promise<JiraResult<SystemAvatars>> => {
      return jiraRequest<SystemAvatars>({
        path: "/rest/api/3/avatar/{type}/system",
        method: "GET",
        pathParams: {
          type
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a project, issue type or priority avatar image by ID.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  For system avatars, none.
     *  *  For custom project avatars, *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the
     * avatar belongs to.
     *  *  For custom issue type avatars, *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the
     * issue type belongs to.
     *  *  For custom priority avatars, *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the
     * priority belongs to.
     *
     * @returns Returned if the request is successful.
     */
    getAvatarImageById: async ({
      type,
      id,
      size,
      format,
      opts
    }: {
      /** The icon type of the avatar. */
      type: "issuetype" | "project" | "priority";
      /** The ID of the avatar. */
      id: number;
      /** The size of the avatar image. If not provided the default size is returned. */
      size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
      /**
       * The format to return the avatar image in. If not provided the original content
       * format is returned.
       */
      format?: "png" | "svg";
    } & WithRequestOpts<TClient>): Promise<JiraResult<Blob | StreamingResponseBody>> => {
      return jiraRequest<Blob | StreamingResponseBody>({
        path: "/rest/api/3/universal_avatar/view/type/{type}/avatar/{id}",
        method: "GET",
        pathParams: {
          type,
          id
        },
        queryParams: {
          size,
          format
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a project, issue type or priority avatar image by owner.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  For system avatars, none.
     *  *  For custom project avatars, *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the
     * avatar belongs to.
     *  *  For custom issue type avatars, *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the
     * issue type belongs to.
     *  *  For custom priority avatars, *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the
     * priority belongs to.
     *
     * @returns Returned if the request is successful.
     */
    getAvatarImageByOwner: async ({
      type,
      entityId,
      size,
      format,
      opts
    }: {
      /** The icon type of the avatar. */
      type: "issuetype" | "project" | "priority";
      /** The ID of the project or issue type the avatar belongs to. */
      entityId: string;
      /** The size of the avatar image. If not provided the default size is returned. */
      size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
      /**
       * The format to return the avatar image in. If not provided the original content
       * format is returned.
       */
      format?: "png" | "svg";
    } & WithRequestOpts<TClient>): Promise<JiraResult<Blob | StreamingResponseBody>> => {
      return jiraRequest<Blob | StreamingResponseBody>({
        path: "/rest/api/3/universal_avatar/view/type/{type}/owner/{entityId}",
        method: "GET",
        pathParams: {
          type,
          entityId
        },
        queryParams: {
          size,
          format
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the default avatar image for a project or issue type.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     */
    getAvatarImageByType: async ({
      type,
      size,
      format,
      opts
    }: {
      /** The icon type of the avatar. */
      type: "issuetype" | "project" | "priority";
      /** The size of the avatar image. If not provided the default size is returned. */
      size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
      /**
       * The format to return the avatar image in. If not provided the original content
       * format is returned.
       */
      format?: "png" | "svg";
    } & WithRequestOpts<TClient>): Promise<JiraResult<Blob | StreamingResponseBody>> => {
      return jiraRequest<Blob | StreamingResponseBody>({
        path: "/rest/api/3/universal_avatar/view/type/{type}",
        method: "GET",
        pathParams: {
          type
        },
        queryParams: {
          size,
          format
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the system and custom avatars for a project or issue type.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  For custom project avatars, *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the
     * avatar belongs to.
     *  *  For custom issue type avatars, *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the
     * issue type belongs to.
     *  *  For custom priority avatars, *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the
     * priority belongs to.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "custom": [
     *     {
     *       "id": "1000",
     *       "isDeletable": true,
     *       "isSelected": true,
     *       "isSystemAvatar": false,
     *       "urls": {
     *         "16x16": "/secure/useravatar?size=xsmall&avatarId=10040&avatarType=project",
     *         "24x24": "/secure/useravatar?size=small&avatarId=10040&avatarType=project",
     *         "32x32": "/secure/useravatar?size=medium&avatarId=10040&avatarType=project",
     *         "48x48": "/secure/useravatar?avatarId=10040&avatarType=project"
     *       }
     *     }
     *   ],
     *   "system": [
     *     {
     *       "id": "1000",
     *       "isDeletable": false,
     *       "isSelected": false,
     *       "isSystemAvatar": true,
     *       "urls": {
     *         "16x16": "/secure/useravatar?size=xsmall&avatarId=10040&avatarType=project",
     *         "24x24": "/secure/useravatar?size=small&avatarId=10040&avatarType=project",
     *         "32x32": "/secure/useravatar?size=medium&avatarId=10040&avatarType=project",
     *         "48x48": "/secure/useravatar?avatarId=10040&avatarType=project"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getAvatars: async ({
      type,
      entityId,
      opts
    }: {
      /** The avatar type. */
      type: "project" | "issuetype" | "priority";
      /** The ID of the item the avatar is associated with. */
      entityId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Avatars>> => {
      return jiraRequest<Avatars>({
        path: "/rest/api/3/universal_avatar/type/{type}/owner/{entityId}",
        method: "GET",
        pathParams: {
          type,
          entityId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Loads a custom avatar for a project or issue type.
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
     * 'https://your-domain.atlassian.net/rest/api/3/universal_avatar/type/{type}/owner/{entityId}'`
     *
     * The avatar is cropped to a square. If no crop parameters are specified, the
     * square originates at the top left of the image. The length of the square's
     * sides is set to the smaller of the height or width of the image.
     *
     * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and
     * 48x48 in size.
     *
     * After creating the avatar, use [ Set project avatar](#api-rest-api-3-project-projectIdOrKey-avatar-put)
     * or [ Set issue type avatar](#api-rest-api-3-issuetype-id-avatar-put) to set it
     * as the project or issue type's displayed avatar.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "1000",
     *   "isDeletable": true,
     *   "isSelected": false,
     *   "isSystemAvatar": false,
     *   "urls": {
     *     "16x16": "/secure/useravatar?size=xsmall&avatarId=10040&avatarType=project",
     *     "24x24": "/secure/useravatar?size=small&avatarId=10040&avatarType=project",
     *     "32x32": "/secure/useravatar?size=medium&avatarId=10040&avatarType=project",
     *     "48x48": "/secure/useravatar?avatarId=10040&avatarType=project"
     *   }
     * }
     * ```
     */
    storeAvatar: async ({
      type,
      entityId,
      x,
      y,
      size,
      mediaType,
      requestBody,
      opts
    }: {
      /** The avatar type. */
      type: "project" | "issuetype" | "priority";
      /** The ID of the item the avatar is associated with. */
      entityId: string;
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
        path: "/rest/api/3/universal_avatar/type/{type}/owner/{entityId}",
        method: "POST",
        pathParams: {
          type,
          entityId
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
    }
  };
}
