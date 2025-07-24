import type {
  Avatar,
  ProjectAvatars,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents avatars associated with a project. Use it to get,
 * load, set, and remove project avatars.
 */
export default function projectAvatars<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Loads an avatar for a project.
     *
     * Specify the avatar's local file location in the body of the request. Also,
     * include the following headers:
     *
     *  *  `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the
     * request, for more information see [Special Headers](#special-request-headers).
     *  *  `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
     *
     * For example:
     * `curl --request POST `
     *
     * `--user email@example.com:<api_token> `
     *
     * `--header 'X-Atlassian-Token: no-check' `
     *
     * `--header 'Content-Type: image/< image_type>' `
     *
     * `--data-binary "<@/path/to/file/with/your/avatar>" `
     *
     * `--url
     * 'https://your-domain.atlassian.net/rest/api/3/project/{projectIdOrKey}/avatar2'`
     *
     * The avatar is cropped to a square. If no crop parameters are specified, the
     * square originates at the top left of the image. The length of the square's
     * sides is set to the smaller of the height or width of the image.
     *
     * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and
     * 48x48 in size.
     *
     * After creating the avatar use [Set project
     * avatar](#api-rest-api-3-project-projectIdOrKey-avatar-put) to set it as the
     * project's displayed avatar.
     *
     * **[Permissions](#permissions) required:** *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg).
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
    createProjectAvatar: async ({
      projectIdOrKey,
      x,
      y,
      size,
      mediaType,
      requestBody,
      opts
    }: {
      /** The ID or (case-sensitive) key of the project. */
      projectIdOrKey: string;
      /** The X coordinate of the top-left corner of the crop region. */
      x?: number;
      /** The Y coordinate of the top-left corner of the crop region. */
      y?: number;
      /** The length of each side of the crop region. */
      size?: number;
      mediaType: string;
      requestBody: string | ArrayBuffer;
    } & WithRequestOpts<TClient>): Promise<JiraResult<Avatar>> => {
      return jiraRequest<Avatar>({
        path: "/rest/api/3/project/{projectIdOrKey}/avatar2",
        method: "POST",
        pathParams: {
          projectIdOrKey
        },
        queryParams: {
          x,
          y,
          size
        },
        body: requestBody,
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
     * Deletes a custom avatar from a project. Note that system avatars cannot be
     * deleted.
     *
     * **[Permissions](#permissions) required:** *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg).
     */
    deleteProjectAvatar: async ({
      projectIdOrKey,
      id,
      opts
    }: {
      /** The project ID or (case-sensitive) key. */
      projectIdOrKey: string;
      /** The ID of the avatar. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectIdOrKey}/avatar/{id}",
        method: "DELETE",
        pathParams: {
          projectIdOrKey,
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns all project avatars, grouped by system and custom avatars.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *
     * @returns Returned if request is successful.
     *
     * example:
     * ```
     * {
     *   "custom": [
     *     {
     *       "id": "1010",
     *       "isDeletable": true,
     *       "isSelected": false,
     *       "isSystemAvatar": false,
     *       "urls": {
     *         "16x16": "https://your-domain.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10080&avatarType=project",
     *         "24x24": "https://your-domain.atlassian.net/secure/viewavatar?size=small&avatarId=10080&avatarType=project",
     *         "32x32": "https://your-domain.atlassian.net/secure/viewavatar?size=medium&avatarId=10080&avatarType=project",
     *         "48x48": "https://your-domain.atlassian.net/secure/viewavatar?avatarId=10080&avatarType=project"
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
     *         "16x16": "https://your-domain.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10040&avatarType=project",
     *         "24x24": "https://your-domain.atlassian.net/secure/viewavatar?size=small&avatarId=10040&avatarType=project",
     *         "32x32": "https://your-domain.atlassian.net/secure/viewavatar?size=medium&avatarId=10040&avatarType=project",
     *         "48x48": "https://your-domain.atlassian.net/secure/viewavatar?avatarId=10040&avatarType=project"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getAllProjectAvatars: async ({
      projectIdOrKey,
      opts
    }: {
      /** The ID or (case-sensitive) key of the project. */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ProjectAvatars>> => {
      return jiraRequest<ProjectAvatars>({
        path: "/rest/api/3/project/{projectIdOrKey}/avatars",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the avatar displayed for a project.
     *
     * Use [Load project avatar](#api-rest-api-3-project-projectIdOrKey-avatar2-post)
     * to store avatars against the project, before using this operation to set the
     * displayed avatar.
     *
     * **[Permissions](#permissions) required:** *Administer projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg).
     *
     * @returns Returned if the request is successful.
     */
    updateProjectAvatar: async ({
      projectIdOrKey,
      avatar,
      opts
    }: {
      /** The ID or (case-sensitive) key of the project. */
      projectIdOrKey: string;
      /**
       * @example
       * {
       *   "id": "10010"
       * }
       */
      avatar: Avatar;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project/{projectIdOrKey}/avatar",
        method: "PUT",
        pathParams: {
          projectIdOrKey
        },
        body: JSON.stringify(avatar),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
