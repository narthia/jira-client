import type {
  ColumnItem,
  ColumnRequestBody,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents issue navigator settings. Use it to get and set issue
 * navigator default columns.
 */
export default function issueNavigatorSettings<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns the default issue navigator columns.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "label": "Key",
     *     "value": "issuekey"
     *   },
     *   {
     *     "label": "Summary",
     *     "value": "summary"
     *   }
     * ]
     * ```
     *
     */
    getIssueNavigatorDefaultColumns: async ({ opts }: WithRequestOpts<TClient> = {}): Promise<
      JiraResult<ColumnItem[]>
    > => {
      return jiraRequest<ColumnItem[]>({
        path: "/rest/api/3/settings/columns",
        method: "GET",
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the default issue navigator columns.
     *
     * The `columns` parameter accepts a navigable field value and is expressed as
     * HTML form data. To specify multiple columns, pass multiple `columns`
     * parameters. For example, in curl:
     *
     * `curl -X PUT -d columns=summary -d columns=description
     * https://your-domain.atlassian.net/rest/api/3/settings/columns`
     *
     * If no column details are sent, then all default columns are removed.
     *
     * A navigable field is one that can be used as a column on the issue navigator.
     * Find details of navigable issue columns using [Get
     * fields](#api-rest-api-3-field-get).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    setIssueNavigatorDefaultColumns: async ({
      columnRequestBody,
      opts
    }: {
      /** A navigable field value. */
      columnRequestBody: ColumnRequestBody;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/settings/columns",
        method: "PUT",
        body: JSON.stringify(columnRequestBody),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
