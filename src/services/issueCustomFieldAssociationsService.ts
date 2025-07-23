import type {
  FieldAssociationsRequest,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the fields associated to project and issue type
 * contexts. Use it to:
 *
 *  *  assign custom field to projects and issue types.
 */
export default function issueCustomFieldAssociations<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Associates fields with projects.
     *
     * Fields will be associated with each issue type on the requested projects.
     *
     * Fields will be associated with all projects that share the same field
     * configuration which the provided projects are using. This means that while the
     * field will be associated with the requested projects, it will also be
     * associated with any other projects that share the same field configuration.
     *
     * If a success response is returned it means that the field association has been
     * created in any applicable contexts where it wasn't already present.
     *
     * Up to 50 fields and up to 100 projects can be associated in a single request.
     * If more fields or projects are provided a 400 response will be returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the field association validation passes.
     */
    createAssociations: async ({
      fieldAssociationsRequest,
      opts
    }: {
      /**
       * Payload containing the fields to associate and the projects to associate them
       * to.
       *
       * @example
       * {
       *   "associationContexts": [
       *     {
       *       "identifier": 10000,
       *       "type": "PROJECT_ID"
       *     },
       *     {
       *       "identifier": 10001,
       *       "type": "PROJECT_ID"
       *     }
       *   ],
       *   "fields": [
       *     {
       *       "identifier": "customfield_10000",
       *       "type": "FIELD_ID"
       *     },
       *     {
       *       "identifier": "customfield_10001",
       *       "type": "FIELD_ID"
       *     }
       *   ]
       * }
       */
      fieldAssociationsRequest: FieldAssociationsRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/association",
        method: "PUT",
        body: JSON.stringify(fieldAssociationsRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Unassociates a set of fields with a project and issue type context.
     *
     * Fields will be unassociated with all projects/issue types that share the same
     * field configuration which the provided project and issue types are using. This
     * means that while the field will be unassociated with the provided project and
     * issue types, it will also be unassociated with any other projects and issue
     * types that share the same field configuration.
     *
     * If a success response is returned it means that the field association has been
     * removed in any applicable contexts where it was present.
     *
     * Up to 50 fields and up to 100 projects and issue types can be unassociated in a
     * single request. If more fields or projects are provided a 400 response will be
     * returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the field association validation passes.
     */
    removeAssociations: async ({
      fieldAssociationsRequest,
      opts
    }: {
      /**
       * Payload containing the fields to uassociate and the projects and issue types to
       * unassociate them to.
       *
       * @example
       * {
       *   "associationContexts": [
       *     {
       *       "identifier": 10000,
       *       "type": "PROJECT_ID"
       *     },
       *     {
       *       "identifier": 10001,
       *       "type": "PROJECT_ID"
       *     }
       *   ],
       *   "fields": [
       *     {
       *       "identifier": "customfield_10000",
       *       "type": "FIELD_ID"
       *     },
       *     {
       *       "identifier": "customfield_10001",
       *       "type": "FIELD_ID"
       *     }
       *   ]
       * }
       */
      fieldAssociationsRequest: FieldAssociationsRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/field/association",
        method: "DELETE",
        body: JSON.stringify(fieldAssociationsRequest),
        config,
        opts,
        isResponseAvailable: false
      });
    }
  };
}
