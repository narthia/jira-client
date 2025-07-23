/**
 * A [Connect
 * module](https://developer.atlassian.com/cloud/jira/platform/about-jira-modules/)
 * in the same format as in the
 * [app
 * descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/).
 *
 * @example
 * {
 *   "description": {
 *     "value": "field with team"
 *   },
 *   "type": "single_select",
 *   "extractions": [
 *     {
 *       "path": "category",
 *       "type": "text",
 *       "name": "categoryName"
 *     }
 *   ],
 *   "name": {
 *     "value": "Team"
 *   },
 *   "key": "team-field"
 * }
 */
export interface ConnectModule {
  [key: string]: unknown;
}
/**
 * @example
 * {
 *   "jiraEntityProperties": [
 *     {
 *       "keyConfigurations": [
 *         {
 *           "extractions": [
 *             {
 *               "objectName": "extension",
 *               "type": "text",
 *               "alias": "attachmentExtension"
 *             }
 *           ],
 *           "propertyKey": "attachment"
 *         }
 *       ],
 *       "entityType": "issue",
 *       "name": {
 *         "value": "Attachment Index Document"
 *       },
 *       "key": "dynamic-attachment-entity-property"
 *     }
 *   ],
 *   "jiraIssueFields": [
 *     {
 *       "description": {
 *         "value": "A dynamically added single-select field"
 *       },
 *       "type": "single_select",
 *       "extractions": [
 *         {
 *           "path": "category",
 *           "type": "text",
 *           "name": "categoryName"
 *         }
 *       ],
 *       "name": {
 *         "value": "Dynamic single select"
 *       },
 *       "key": "dynamic-select-field"
 *     }
 *   ]
 * }
 */
export interface ConnectModules extends Record<string, unknown> {
  /**
   * A list of app modules in the same format as the `modules` property in the
   * [app
   * descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/).
   */
  modules: ConnectModule[];
}
