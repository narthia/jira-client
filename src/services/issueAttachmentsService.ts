import type {
  AttachmentMetadata,
  AttachmentArchiveMetadataReadable,
  AttachmentArchiveImpl,
  AttachmentSettings,
  MultipartFile,
  Attachment,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue attachments and the attachment settings for
 * Jira. Use it to get the metadata for an attachment, delete an attachment, and
 * view the metadata for the contents of an attachment. Also, use it to get the
 * attachment settings for Jira.
 */
export default function issueAttachments<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Adds one or more attachments to an issue. Attachments are posted as
     * multipart/form-data ([RFC 1867](https://www.ietf.org/rfc/rfc1867.txt)).
     *
     * Note that:
     *
     *  *  The request must have a `X-Atlassian-Token: no-check` header, if not it is
     * blocked. See [Special headers](#special-request-headers) for more information.
     *  *  The name of the multipart/form-data parameter that contains the attachments
     * must be `file`.
     *
     * The following examples upload a file called *myfile.txt* to the issue
     * *TEST-123*:
     *
     * #### curl ####
     *
     *     curl --location --request POST
     * 'https://your-domain.atlassian.net/rest/api/3/issue/TEST-123/attachments'
     *      -u 'email@example.com:<api_token>'
     *      -H 'X-Atlassian-Token: no-check'
     *      --form 'file=@"myfile.txt"'
     *
     * #### Node.js ####
     *
     *     // This code sample uses the 'node-fetch' and 'form-data' libraries:
     *      // https://www.npmjs.com/package/node-fetch
     *      // https://www.npmjs.com/package/form-data
     *      const fetch = require('node-fetch');
     *      const FormData = require('form-data');
     *      const fs = require('fs');
     *
     *      const filePath = 'myfile.txt';
     *      const form = new FormData();
     *      const stats = fs.statSync(filePath);
     *      const fileSizeInBytes = stats.size;
     *      const fileStream = fs.createReadStream(filePath);
     *
     *      form.append('file', fileStream, {knownLength: fileSizeInBytes});
     *
     *      fetch('https://your-domain.atlassian.net/rest/api/3/issue/TEST-123/attachments',
     * {
     *          method: 'POST',
     *          body: form,
     *          headers: {
     *              'Authorization': `Basic ${Buffer.from(
     *                  'email@example.com:'
     *              ).toString('base64')}`,
     *              'Accept': 'application/json',
     *              'X-Atlassian-Token': 'no-check'
     *          }
     *      })
     *          .then(response => {
     *              console.log(
     *                  `Response: ${response.status} ${response.statusText}`
     *              );
     *              return response.text();
     *          })
     *          .then(text => console.log(text))
     *          .catch(err => console.error(err));
     *
     * #### Java ####
     *
     *     // This code sample uses the  'Unirest' library:
     *      // http://unirest.io/java.html
     *      HttpResponse response =
     * Unirest.post("https://your-domain.atlassian.net/rest/api/2/issue/{issueIdOrKey}/attachments")
     *              .basicAuth("email@example.com", "")
     *              .header("Accept", "application/json")
     *              .header("X-Atlassian-Token", "no-check")
     *              .field("file", new File("myfile.txt"))
     *              .asJson();
     *
     *              System.out.println(response.getBody());
     *
     * #### Python ####
     *
     *     # This code sample uses the 'requests' library:
     *      # http://docs.python-requests.org
     *      import requests
     *      from requests.auth import HTTPBasicAuth
     *      import json
     *
     *      url =
     * "https://your-domain.atlassian.net/rest/api/2/issue/{issueIdOrKey}/attachments"
     *
     *      auth = HTTPBasicAuth("email@example.com", "")
     *
     *      headers = {
     *         "Accept": "application/json",
     *         "X-Atlassian-Token": "no-check"
     *      }
     *
     *      response = requests.request(
     *         "POST",
     *         url,
     *         headers = headers,
     *         auth = auth,
     *         files = {
     *              "file": ("myfile.txt", open("myfile.txt","rb"), "application-type")
     *         }
     *      )
     *
     *      print(json.dumps(json.loads(response.text), sort_keys=True, indent=4,
     * separators=(",", ": ")))
     *
     * #### PHP ####
     *
     *     // This code sample uses the 'Unirest' library:
     *      // http://unirest.io/php.html
     *      Unirest\Request::auth('email@example.com', '');
     *
     *      $headers = array(
     *        'Accept' => 'application/json',
     *        'X-Atlassian-Token' => 'no-check'
     *      );
     *
     *      $parameters = array(
     *        'file' => File::add('myfile.txt')
     *      );
     *
     *      $response = Unirest\Request::post(
     *        'https://your-domain.atlassian.net/rest/api/2/issue/{issueIdOrKey}/attachments',
     *        $headers,
     *        $parameters
     *      );
     *
     *      var_dump($response)
     *
     * #### Forge ####
     *
     *     // This sample uses Atlassian Forge and the `form-data` library.
     *      // https://developer.atlassian.com/platform/forge/
     *      // https://www.npmjs.com/package/form-data
     *      import api from "@forge/api";
     *      import FormData from "form-data";
     *
     *      const form = new FormData();
     *      form.append('file', fileStream, {knownLength: fileSizeInBytes});
     *
     *      const response = await
     * api.asApp().requestJira('/rest/api/2/issue/{issueIdOrKey}/attachments', {
     *          method: 'POST',
     *          body: form,
     *          headers: {
     *              'Accept': 'application/json',
     *              'X-Atlassian-Token': 'no-check'
     *          }
     *      });
     *
     *      console.log(`Response: ${response.status} ${response.statusText}`);
     *      console.log(await response.json());
     *
     * Tip: Use a client library. Many client libraries have classes for handling
     * multipart POST operations. For example, in Java, the Apache HTTP Components
     * library provides a
     * [MultiPartEntity](http://hc.apache.org/httpcomponents-client-ga/httpmime/apidocs/org/apache/http/entity/mime/MultipartEntity.html)
     * class for multipart POST operations.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse Projects* and *Create attachments* [ project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "author": {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "active": true,
     *       "avatarUrls": {
     *         "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *         "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *         "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *         "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *       },
     *       "displayName": "Mia Krystof",
     *       "emailAddress": "mia@example.com",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *       "timeZone": "Australia/Sydney"
     *     },
     *     "content": "https://your-domain.atlassian.net/rest/api/3/attachment/content/10000",
     *     "created": 1651316514000,
     *     "filename": "picture.jpg",
     *     "id": "10001",
     *     "mimeType": "image/jpeg",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/attachments/10000",
     *     "size": 23123,
     *     "thumbnail": "https://your-domain.atlassian.net/rest/api/3/attachment/thumbnail/10000"
     *   },
     *   {
     *     "author": {
     *       "accountId": "5b10a2844c20165700ede21g",
     *       "active": true,
     *       "avatarUrls": {
     *         "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *         "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *         "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *         "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *       },
     *       "displayName": "Mia Krystof",
     *       "emailAddress": "mia@example.com",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *       "timeZone": "Australia/Sydney"
     *     },
     *     "content": "https://your-domain.atlassian.net/rest/api/3/attachment/content/10001",
     *     "created": 1658898511000,
     *     "filename": "dbeuglog.txt",
     *     "mimeType": "text/plain",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/attachments/10001",
     *     "size": 2460
     *   }
     * ]
     * ```
     *
     */
    addAttachment: async ({
      issueIdOrKey,
      multipartFiles,
      opts
    }: {
      /** The ID or key of the issue that attachments are added to. */
      issueIdOrKey: string;
      multipartFiles: MultipartFile[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<Attachment[]>> => {
      return jiraRequest<Attachment[]>({
        path: "/rest/api/3/issue/{issueIdOrKey}/attachments",
        method: "POST",
        pathParams: {
          issueIdOrKey
        },
        body: JSON.stringify(multipartFiles),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the metadata for the contents of an attachment, if it is an archive,
     * and metadata for the attachment itself. For example, if the attachment is a ZIP
     * archive, then information about the files in the archive is returned and
     * metadata for the ZIP archive. Currently, only the ZIP archive format is
     * supported.
     *
     * Use this operation to retrieve data that is presented to the user, as this
     * operation returns the metadata for the attachment itself, such as the
     * attachment's ID and name. Otherwise, use [ Get contents metadata for an
     * expanded attachment](#api-rest-api-3-attachment-id-expand-raw-get), which only
     * returns the metadata for the attachment's contents.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** For the issue containing the
     * attachment:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If attachments are added in private comments, the comment-level restriction
     * will be applied.
     *
     * @returns Returned if the request is successful. If an empty list is returned in the response, the attachment is empty, corrupt, or not an archive.
     *
     * example:
     * ```
     * {
     *   "entries": [
     *     {
     *       "index": 0,
     *       "label": "MG00N067.JPG",
     *       "mediaType": "image/jpeg",
     *       "path": "MG00N067.JPG",
     *       "size": "119 kB"
     *     },
     *     {
     *       "index": 1,
     *       "label": "Allegro from Duet in C Major.mp3",
     *       "mediaType": "audio/mpeg",
     *       "path": "Allegro from Duet in C Major.mp3",
     *       "size": "1.36 MB"
     *     },
     *     {
     *       "index": 2,
     *       "label": "long/path/thanks/to/.../reach/the/leaf.txt",
     *       "mediaType": "text/plain",
     *       "path": "long/path/thanks/to/lots/of/subdirectories/inside/making/it/quite/hard/to/reach/the/leaf.txt",
     *       "size": "0.0 k"
     *     }
     *   ],
     *   "id": 7237823,
     *   "mediaType": "application/zip",
     *   "name": "images.zip",
     *   "totalEntryCount": 39
     * }
     * ```
     */
    expandAttachmentForHumans: async ({
      id,
      opts
    }: {
      /** The ID of the attachment. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<AttachmentArchiveMetadataReadable>> => {
      return jiraRequest<AttachmentArchiveMetadataReadable>({
        path: "/rest/api/3/attachment/{id}/expand/human",
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
     * Returns the metadata for the contents of an attachment, if it is an archive.
     * For example, if the attachment is a ZIP archive, then information about the
     * files in the archive is returned. Currently, only the ZIP archive format is
     * supported.
     *
     * Use this operation if you are processing the data without presenting it to the
     * user, as this operation only returns the metadata for the contents of the
     * attachment. Otherwise, to retrieve data to present to the user, use [ Get all
     * metadata for an expanded
     * attachment](#api-rest-api-3-attachment-id-expand-human-get) which also returns
     * the metadata for the attachment itself, such as the attachment's ID and name.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** For the issue containing the
     * attachment:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If attachments are added in private comments, the comment-level restriction
     * will be applied.
     *
     * @returns Returned if the request is successful. If an empty list is returned in the response, the attachment is empty, corrupt, or not an archive.
     *
     * example:
     * ```
     * {
     *   "entries": [
     *     {
     *       "entryIndex": 0,
     *       "mediaType": "audio/mpeg",
     *       "name": "Allegro from Duet in C Major.mp3",
     *       "size": 1430174
     *     },
     *     {
     *       "entryIndex": 1,
     *       "mediaType": "text/rtf",
     *       "name": "lrm.rtf",
     *       "size": 331
     *     }
     *   ],
     *   "totalEntryCount": 24
     * }
     * ```
     */
    expandAttachmentForMachines: async ({
      id,
      opts
    }: {
      /** The ID of the attachment. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<AttachmentArchiveImpl>> => {
      return jiraRequest<AttachmentArchiveImpl>({
        path: "/rest/api/3/attachment/{id}/expand/raw",
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
     * Returns the metadata for an attachment. Note that the attachment itself is not
     * returned.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If attachments are added in private comments, the comment-level restriction
     * will be applied.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "author": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": false,
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g"
     *   },
     *   "content": "https://your-domain.atlassian.net/jira/rest/api/3/attachment/content/10000",
     *   "created": "2022-10-06T07:32:47.000+0000",
     *   "filename": "picture.jpg",
     *   "id": 10000,
     *   "mimeType": "image/jpeg",
     *   "self": "https://your-domain.atlassian.net/jira/rest/api/3/attachment/10000",
     *   "size": 23123,
     *   "thumbnail": "https://your-domain.atlassian.net/jira/rest/api/3/attachment/thumbnail/10000"
     * }
     * ```
     */
    getAttachment: async ({
      id,
      opts
    }: {
      /** The ID of the attachment. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<AttachmentMetadata>> => {
      return jiraRequest<AttachmentMetadata>({
        path: "/rest/api/3/attachment/{id}",
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
     * Returns the contents of an attachment. A `Range` header can be set to define a
     * range of bytes within the attachment to download. See the [HTTP Range header
     * standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range) for
     * details.
     *
     * To return a thumbnail of the attachment, use [Get attachment
     * thumbnail](#api-rest-api-3-attachment-thumbnail-id-get).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** For the issue containing the
     * attachment:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If attachments are added in private comments, the comment-level restriction
     * will be applied.
     *
     * @returns Returned if the request is successful when `redirect` is set to `false`.
     */
    getAttachmentContent: async ({
      id,
      redirect,
      opts
    }: {
      /** The ID of the attachment. */
      id: string;
      /**
       * Whether a redirect is provided for the attachment download. Clients that do not
       * automatically follow redirects can set this to `false` to avoid making multiple
       * requests to download the attachment.
       */
      redirect?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown[]>> => {
      return jiraRequest<unknown[]>({
        path: "/rest/api/3/attachment/content/{id}",
        method: "GET",
        pathParams: {
          id
        },
        queryParams: {
          redirect
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the attachment settings, that is, whether attachments are enabled and
     * the maximum attachment size allowed.
     *
     * Note that there are also [project
     * permissions](https://confluence.atlassian.com/x/yodKLg) that restrict whether
     * users can create and delete attachments.
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
     *   "enabled": true,
     *   "uploadLimit": 1000000
     * }
     * ```
     */
    getAttachmentMeta: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<AttachmentSettings>
    > => {
      return jiraRequest<AttachmentSettings>({
        path: "/rest/api/3/attachment/meta",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the thumbnail of an attachment.
     *
     * To return the attachment contents, use [Get attachment
     * content](#api-rest-api-3-attachment-content-id-get).
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** For the issue containing the
     * attachment:
     *
     *  *  *Browse projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that the
     * issue is in.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If attachments are added in private comments, the comment-level restriction
     * will be applied.
     *
     * @returns Returned if the request is successful when `redirect` is set to `false`.
     */
    getAttachmentThumbnail: async ({
      id,
      redirect,
      fallbackToDefault,
      width,
      height,
      opts
    }: {
      /** The ID of the attachment. */
      id: string;
      /**
       * Whether a redirect is provided for the attachment download. Clients that do not
       * automatically follow redirects can set this to `false` to avoid making multiple
       * requests to download the attachment.
       */
      redirect?: boolean;
      /**
       * Whether a default thumbnail is returned when the requested thumbnail is not
       * found.
       */
      fallbackToDefault?: boolean;
      /** The maximum width to scale the thumbnail to. */
      width?: number;
      /** The maximum height to scale the thumbnail to. */
      height?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown[]>> => {
      return jiraRequest<unknown[]>({
        path: "/rest/api/3/attachment/thumbnail/{id}",
        method: "GET",
        pathParams: {
          id
        },
        queryParams: {
          redirect,
          fallbackToDefault,
          width,
          height
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes an attachment from an issue.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** For the project holding the issue
     * containing the attachment:
     *
     *  *  *Delete own attachments* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
     * created by the calling user.
     *  *  *Delete all attachments* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
     * created by any user.
     */
    removeAttachment: async ({
      id,
      opts
    }: {
      /** The ID of the attachment. */
      id: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/attachment/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
