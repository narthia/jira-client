import type {
  ContainerOfWorkflowSchemeAssociations,
  WorkflowSchemeProjectAssociation,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents the associations between workflow schemes and projects.
 *
 * For more information, see [Managing your
 * workflows](https://confluence.atlassian.com/x/q4hKLg).
 */
export default function workflowSchemeProjectAssociations<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Assigns a workflow scheme to a project. This operation is performed only when
     * there are no issues in the project.
     *
     * Workflow schemes can only be assigned to classic projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    assignSchemeToProject: async ({
      workflowSchemeProjectAssociation,
      opts
    }: {
      /**
       * @example
       * {
       *   "projectId": "10001",
       *   "workflowSchemeId": "10032"
       * }
       */
      workflowSchemeProjectAssociation: WorkflowSchemeProjectAssociation;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/workflowscheme/project",
        method: "PUT",
        body: JSON.stringify(workflowSchemeProjectAssociation),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Returns a list of the workflow schemes associated with a list of projects. Each
     * returned workflow scheme includes a list of the requested projects associated
     * with it. Any team-managed or non-existent projects in the request are ignored
     * and no errors are returned.
     *
     * If the project is associated with the `Default Workflow Scheme` no ID is
     * returned. This is because the way the `Default Workflow Scheme` is stored means
     * it has no ID.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "values": [
     *     {
     *       "projectIds": [
     *         "10010",
     *         "10020"
     *       ],
     *       "workflowScheme": {
     *         "defaultWorkflow": "jira",
     *         "description": "The description of the example workflow scheme.",
     *         "id": 101010,
     *         "issueTypeMappings": {
     *           "10000": "scrum workflow",
     *           "10001": "builds workflow"
     *         },
     *         "name": "Example workflow scheme",
     *         "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     *       }
     *     }
     *   ]
     * }
     * ```
     */
    getWorkflowSchemeProjectAssociations: async ({
      projectId,
      opts
    }: {
      /**
       * The ID of a project to return the workflow schemes for. To include multiple
       * projects, provide an ampersand-Jim: oneseparated list. For example,
       * `projectId=10000&projectId=10001`.
       */
      projectId: number[];
    } & WithRequestOpts<TClient>): Promise<JiraResult<ContainerOfWorkflowSchemeAssociations>> => {
      return jiraRequest<ContainerOfWorkflowSchemeAssociations>({
        path: "/rest/api/3/workflowscheme/project",
        method: "GET",
        queryParams: {
          projectId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
