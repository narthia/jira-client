import type {
  CustomFieldValueUpdateDetails,
  MultipleCustomFieldValuesUpdateDetails,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the values of custom fields added by [Forge
 * apps](https://developer.atlassian.com/platform/forge/). Use it to update the
 * value of a custom field on issues.
 */
export default function issueCustomFieldValuesApps<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Updates the value of a custom field on one or more issues.
     *
     * Apps can only perform this operation on [custom
     * fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/)
     * and [custom field
     * types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
     * declared in their own manifests.
     *
     * **[Permissions](#permissions) required:** Only the app that owns the custom
     * field or custom field type can update its values with this operation.
     *
     * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using
     * it won't break your app. However, we recommend adding it to your app's scope
     * list because we will eventually make it mandatory.
     *
     * @returns Returned if the request is successful.
     */
    updateCustomFieldValue: async ({
      fieldIdOrKey,
      generateChangelog,
      customFieldValueUpdateDetails,
      opts
    }: {
      /** The ID or key of the custom field. For example, `customfield_10010`. */
      fieldIdOrKey: string;
      /** Whether to generate a changelog for this update. */
      generateChangelog?: boolean;
      /**
       * @example
       * {
       *   "updates": [
       *     {
       *       "issueIds": [
       *         10010
       *       ],
       *       "value": "new value"
       *     }
       *   ]
       * }
       */
      customFieldValueUpdateDetails: CustomFieldValueUpdateDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/app/field/{fieldIdOrKey}/value",
        method: "PUT",
        pathParams: {
          fieldIdOrKey
        },
        queryParams: {
          generateChangelog
        },
        body: JSON.stringify(customFieldValueUpdateDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Updates the value of one or more custom fields on one or more issues.
     * Combinations of custom field and issue should be unique within the request.
     *
     * Apps can only perform this operation on [custom
     * fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/)
     * and [custom field
     * types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
     * declared in their own manifests.
     *
     * **[Permissions](#permissions) required:** Only the app that owns the custom
     * field or custom field type can update its values with this operation.
     *
     * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using
     * it won't break your app. However, we recommend adding it to your app's scope
     * list because we will eventually make it mandatory.
     *
     * @returns Returned if the request is successful.
     */
    updateMultipleCustomFieldValues: async ({
      generateChangelog,
      multipleCustomFieldValuesUpdateDetails,
      opts
    }: {
      /** Whether to generate a changelog for this update. */
      generateChangelog?: boolean;
      /**
       * @example
       * {
       *   "updates": [
       *     {
       *       "customField": "customfield_10010",
       *       "issueIds": [
       *         10010,
       *         10011
       *       ],
       *       "value": "new value"
       *     },
       *     {
       *       "customField": "customfield_10011",
       *       "issueIds": [
       *         10010
       *       ],
       *       "value": 1000
       *     }
       *   ]
       * }
       */
      multipleCustomFieldValuesUpdateDetails: MultipleCustomFieldValuesUpdateDetails;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/app/field/value",
        method: "POST",
        queryParams: {
          generateChangelog
        },
        body: JSON.stringify(multipleCustomFieldValuesUpdateDetails),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
