import type {
  ConnectCustomFieldValues,
  EntityPropertyDetails,
  WorkflowRulesSearch,
  WorkflowRulesSearchDetails,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource supports [app
 * migrations](https://developer.atlassian.com/platform/app-migration/). Use it to:
 * - [to request migrated workflow rules
 * details](https://developer.atlassian.com/platform/app-migration/tutorials/migration-app-workflow-rules/).
 * - [perform bulk updates of entity
 * properties](https://developer.atlassian.com/platform/app-migration/tutorials/entity-properties-bulk-api/).
 * - [perform bulk updates of issue custom field
 * values](https://developer.atlassian.com/platform/app-migration/tutorials/migrating-app-custom-fields/).
 */
export default function appMigration<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Updates the value of a custom field added by Connect apps on one or more issues.
     * The values of up to 200 custom fields can be updated.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this
     * request
     *
     * @returns Returned if the request is successful.
     */
    appIssueFieldValueUpdateResourceUpdateIssueFieldsPut: async ({
      atlassianTransferId,
      connectCustomFieldValues,
      opts
    }: {
      /** The ID of the transfer. */
      atlassianTransferId: string;
      /**
       * @example
       * {
       *   "updateValueList": [
       *     {
       *       "_type": "StringIssueField",
       *       "issueID": 10001,
       *       "fieldID": 10076,
       *       "string": "new string value"
       *     },
       *     {
       *       "_type": "TextIssueField",
       *       "issueID": 10002,
       *       "fieldID": 10077,
       *       "text": "new text value"
       *     },
       *     {
       *       "_type": "SingleSelectIssueField",
       *       "issueID": 10003,
       *       "fieldID": 10078,
       *       "optionID": "1"
       *     },
       *     {
       *       "_type": "MultiSelectIssueField",
       *       "issueID": 10004,
       *       "fieldID": 10079,
       *       "optionID": "2"
       *     },
       *     {
       *       "_type": "RichTextIssueField",
       *       "issueID": 10005,
       *       "fieldID": 10080,
       *       "richText": "new rich text value"
       *     },
       *     {
       *       "_type": "NumberIssueField",
       *       "issueID": 10006,
       *       "fieldID": 10082,
       *       "number": 54
       *     }
       *   ]
       * }
       */
      connectCustomFieldValues: ConnectCustomFieldValues;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/atlassian-connect/1/migration/field",
        method: "PUT",
        body: JSON.stringify(connectCustomFieldValues),
        config,
        opts: {
          ...opts,
          headers: {
            "Atlassian-Transfer-Id": atlassianTransferId,
            "Content-Type": "application/json"
          }
        },
        isResponseAvailable: true
      });
    },

    /**
     * Updates the values of multiple entity properties for an object, up to 50
     * updates per request. This operation is for use by Connect apps during app
     * migration.
     */
    migrationResourceUpdateEntityPropertiesValuePut: async ({
      entityType,
      atlassianTransferId,
      entityPropertyDetailses,
      opts
    }: {
      /** The type indicating the object that contains the entity properties. */
      entityType:
        | "IssueProperty"
        | "CommentProperty"
        | "DashboardItemProperty"
        | "IssueTypeProperty"
        | "ProjectProperty"
        | "UserProperty"
        | "WorklogProperty"
        | "BoardProperty"
        | "SprintProperty";
      /** The app migration transfer ID. */
      atlassianTransferId: string;
      entityPropertyDetailses: EntityPropertyDetails[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/atlassian-connect/1/migration/properties/{entityType}",
        method: "PUT",
        pathParams: {
          entityType
        },
        body: JSON.stringify(entityPropertyDetailses),
        config,
        opts: {
          ...opts,
          headers: {
            "Atlassian-Transfer-Id": atlassianTransferId,
            "Content-Type": "application/json"
          }
        },
        isResponseAvailable: false
      });
    },

    /**
     * Returns configurations for workflow transition rules migrated from server to
     * cloud and owned by the calling Connect app.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "workflowEntityId": "a498d711-685d-428d-8c3e-bc03bb450ea7",
     *   "invalidRules": [
     *     "55d44f1d-c859-42e5-9c27-2c5ec3f340b1"
     *   ],
     *   "validRules": [
     *     {
     *       "workflowId": {
     *         "name": "Workflow name",
     *         "draft": true
     *       },
     *       "postFunctions": [
     *         {
     *           "id": "123",
     *           "key": "WorkflowKey",
     *           "configuration": {
     *             "value": "WorkflowValidator"
     *           },
     *           "transition": {
     *             "name": "transition",
     *             "id": 123
     *           }
     *         }
     *       ],
     *       "conditions": [
     *         {
     *           "id": "123",
     *           "key": "WorkflowKey",
     *           "configuration": {
     *             "value": "WorkflowValidator"
     *           },
     *           "transition": {
     *             "name": "transition",
     *             "id": 123
     *           }
     *         }
     *       ],
     *       "validators": [
     *         {
     *           "id": "123",
     *           "key": "WorkflowKey",
     *           "configuration": {
     *             "value": "WorkflowValidator"
     *           },
     *           "transition": {
     *             "name": "transition",
     *             "id": 123
     *           }
     *         }
     *       ]
     *     }
     *   ]
     * }
     * ```
     */
    migrationResourceWorkflowRuleSearchPost: async ({
      atlassianTransferId,
      workflowRulesSearch,
      opts
    }: {
      /** The app migration transfer ID. */
      atlassianTransferId: string;
      workflowRulesSearch: WorkflowRulesSearch;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowRulesSearchDetails>> => {
      return jiraRequest<WorkflowRulesSearchDetails>({
        path: "/rest/atlassian-connect/1/migration/workflow/rule/search",
        method: "POST",
        body: JSON.stringify(workflowRulesSearch),
        config,
        opts: {
          ...opts,
          headers: {
            "Atlassian-Transfer-Id": atlassianTransferId,
            "Content-Type": "application/json"
          }
        },
        isResponseAvailable: true
      });
    }
  };
}
