import type {
  AuditRecords,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents audits that record activities undertaken in Jira. Use
 * it to get a list of audit records.
 */
export default function auditRecords<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns a list of audit records. The list can be filtered to include items:
     *
     *  *  where each item in `filter` has at least one match in any of these fields:
     *
     *      *  `summary`
     *      *  `category`
     *      *  `eventSource`
     *      *  `objectItem.name` If the object is a user, account ID is available to
     * filter.
     *      *  `objectItem.parentName`
     *      *  `objectItem.typeName`
     *      *  `changedValues.changedFrom`
     *      *  `changedValues.changedTo`
     *      *  `remoteAddress`
     *
     *     For example, if `filter` contains *man ed*, an audit record containing
     * `summary": "User added to group"` and `"category": "group management"` is
     * returned.
     *  *  created on or after a date and time.
     *  *  created or or before a date and time.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "limit": 1000,
     *   "offset": 0,
     *   "records": [
     *     {
     *       "associatedItems": [
     *         {
     *           "id": "jira-software-users",
     *           "name": "jira-software-users",
     *           "parentId": "1",
     *           "parentName": "Jira Internal Directory",
     *           "typeName": "GROUP"
     *         }
     *       ],
     *       "authorAccountId": "5ab8f18d741e9c2c7e9d4538",
     *       "authorKey": "administrator",
     *       "category": "user management",
     *       "changedValues": [
     *         {
     *           "changedFrom": "user@atlassian.com",
     *           "changedTo": "newuser@atlassian.com",
     *           "fieldName": "email"
     *         }
     *       ],
     *       "created": "2014-03-19T18:45:42.967+0000",
     *       "description": "Optional description",
     *       "eventSource": "Jira Connect Plugin",
     *       "id": 1,
     *       "objectItem": {
     *         "id": "user",
     *         "name": "user",
     *         "parentId": "1",
     *         "parentName": "Jira Internal Directory",
     *         "typeName": "USER"
     *       },
     *       "remoteAddress": "192.168.1.1",
     *       "summary": "User created"
     *     }
     *   ],
     *   "total": 1
     * }
     * ```
     */
    getAuditRecords: async ({
      offset,
      limit,
      filter,
      from,
      to,
      opts
    }: {
      /** The number of records to skip before returning the first result. */
      offset?: number;
      /** The maximum number of results to return. */
      limit?: number;
      /** The strings to match with audit field content, space separated. */
      filter?: string;
      /**
       * The date and time on or after which returned audit records must have been
       * created. If `to` is provided `from` must be before `to` or no audit records are
       * returned.
       */
      from?: string;
      /**
       * The date and time on or before which returned audit results must have been
       * created. If `from` is provided `to` must be after `from` or no audit records
       * are returned.
       */
      to?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<AuditRecords>> => {
      return jiraRequest<AuditRecords>({
        path: "/rest/api/3/auditing/record",
        method: "GET",
        queryParams: {
          offset,
          limit,
          filter,
          from,
          to
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
