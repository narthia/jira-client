import type {
  LinkIssueRequestJsonBean,
  IssueLink,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents links between issues. Use it to get, create, and
 * delete links between issues.
 *
 * To use it, the site must have [issue
 * linking](https://confluence.atlassian.com/x/yoXKM) enabled.
 */
export default function issueLinks<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Deletes an issue link.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  Browse project [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for all the projects
     * containing the issues in the link.
     *  *  *Link issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for at least one of the
     * projects containing issues in the link.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, permission to view both of the issues.
     */
    deleteIssueLink: async ({
      linkId,
      opts
    }: {
      /** The ID of the issue link. */
      linkId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/issueLink/{linkId}",
        method: "DELETE",
        pathParams: {
          linkId
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns an issue link.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse project* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for all the projects
     * containing the linked issues.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, permission to view both of the issues.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "id": "10001",
     *   "inwardIssue": {
     *     "fields": {
     *       "issuetype": {
     *         "avatarId": 10002,
     *         "description": "A problem with the software.",
     *         "entityId": "9d7dd6f7-e8b6-4247-954b-7b2c9b2a5ba2",
     *         "hierarchyLevel": 0,
     *         "iconUrl": "https://your-domain.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype\",",
     *         "id": "1",
     *         "name": "Bug",
     *         "scope": {
     *           "project": {
     *             "id": "10000"
     *           },
     *           "type": "PROJECT"
     *         },
     *         "self": "https://your-domain.atlassian.net/rest/api/3/issueType/1",
     *         "subtask": false
     *       },
     *       "priority": {
     *         "description": "Very little impact.",
     *         "iconUrl": "https://your-domain.atlassian.net/images/icons/priorities/trivial.png",
     *         "id": "2",
     *         "name": "Trivial",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/priority/5",
     *         "statusColor": "#cfcfcf"
     *       },
     *       "status": {
     *         "description": "The issue is closed.",
     *         "iconUrl": "https://your-domain.atlassian.net/images/icons/closed.gif",
     *         "id": "5",
     *         "name": "Closed",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/status/5",
     *         "statusCategory": {
     *           "colorName": "green",
     *           "id": 9,
     *           "key": "completed",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/9"
     *         }
     *       }
     *     },
     *     "id": "10004",
     *     "key": "PR-3",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-3"
     *   },
     *   "outwardIssue": {
     *     "fields": {
     *       "issuetype": {
     *         "avatarId": 1,
     *         "description": "A task that needs to be done.",
     *         "hierarchyLevel": 0,
     *         "iconUrl": "https://your-domain.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10299&avatarType=issuetype\",",
     *         "id": "3",
     *         "name": "Task",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/issueType/3",
     *         "subtask": false
     *       },
     *       "priority": {
     *         "description": "Major loss of function.",
     *         "iconUrl": "https://your-domain.atlassian.net/images/icons/priorities/major.png",
     *         "id": "1",
     *         "name": "Major",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/priority/3",
     *         "statusColor": "#009900"
     *       },
     *       "status": {
     *         "description": "The issue is currently being worked on.",
     *         "iconUrl": "https://your-domain.atlassian.net/images/icons/progress.gif",
     *         "id": "10000",
     *         "name": "In Progress",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/status/10000",
     *         "statusCategory": {
     *           "colorName": "yellow",
     *           "id": 1,
     *           "key": "in-flight",
     *           "name": "In Progress",
     *           "self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/1"
     *         }
     *       }
     *     },
     *     "id": "10004L",
     *     "key": "PR-2",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/issue/PR-2"
     *   },
     *   "type": {
     *     "id": "1000",
     *     "inward": "Duplicated by",
     *     "name": "Duplicate",
     *     "outward": "Duplicates",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/issueLinkType/1000"
     *   }
     * }
     * ```
     */
    getIssueLink: async ({
      linkId,
      opts
    }: {
      /** The ID of the issue link. */
      linkId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueLink>> => {
      return jiraRequest<IssueLink>({
        path: "/rest/api/3/issueLink/{linkId}",
        method: "GET",
        pathParams: {
          linkId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Creates a link between two issues. Use this operation to indicate a
     * relationship between two issues and optionally add a comment to the from
     * (outward) issue. To use this resource the site must have [Issue
     * Linking](https://confluence.atlassian.com/x/yoXKM) enabled.
     *
     * This resource returns nothing on the creation of an issue link. To obtain the
     * ID of the issue link, use
     * `https://your-domain.atlassian.net/rest/api/3/issue/[linked issue
     * key]?fields=issuelinks`.
     *
     * If the link request duplicates a link, the response indicates that the issue
     * link was created. If the request included a comment, the comment is added.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse project* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for all the projects
     * containing the issues to be linked,
     *  *  *Link issues* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) on the project
     * containing the from (outward) issue,
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is
     * configured, issue-level security permission to view the issue.
     *  *  If the comment has visibility restrictions, belongs to the group or has the
     * role visibility is restricted to.
     *
     * @returns Returned if the request is successful.
     */
    linkIssues: async ({
      linkIssueRequestJsonBean,
      opts
    }: {
      /**
       * The issue link request.
       *
       * @example
       * {
       *   "comment": {
       *     "body": {
       *       "content": [
       *         {
       *           "content": [
       *             {
       *               "text": "Linked related issue!",
       *               "type": "text"
       *             }
       *           ],
       *           "type": "paragraph"
       *         }
       *       ],
       *       "type": "doc",
       *       "version": 1
       *     },
       *     "visibility": {
       *       "identifier": "276f955c-63d7-42c8-9520-92d01dca0625",
       *       "type": "group",
       *       "value": "jira-software-users"
       *     }
       *   },
       *   "inwardIssue": {
       *     "key": "HSP-1"
       *   },
       *   "outwardIssue": {
       *     "key": "MKY-1"
       *   },
       *   "type": {
       *     "name": "Duplicate"
       *   }
       * }
       */
      linkIssueRequestJsonBean: LinkIssueRequestJsonBean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/issueLink",
        method: "POST",
        body: JSON.stringify(linkIssueRequestJsonBean),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
