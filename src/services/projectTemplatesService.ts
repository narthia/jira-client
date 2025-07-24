import type {
  ProjectCustomTemplateCreateRequestDto,
  EditTemplateRequest,
  ProjectTemplateModel,
  SaveTemplateRequest,
  SaveTemplateResponse,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents project templates. Use it to create a new project from
 * a custom template.
 */
export default function projectTemplates<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a project based on a custom template provided in the request.
     *
     * The request body should contain the project details and the capabilities that
     * comprise the project:
     *
     *  *  `details` \- represents the project details settings
     *  *  `template` \- represents a list of capabilities responsible for creating
     * specific parts of a project
     *
     * A capability is defined as a unit of configuration for the project you want to
     * create.
     *
     * This operation is:
     *
     *  *  [asynchronous](#async). Follow the `Location` link in the response header
     * to determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
     *
     * ***Note: This API is only supported for Jira Enterprise edition.***
     */
    createProjectWithCustomTemplate: async ({
      projectCustomTemplateCreateRequestDto,
      opts
    }: {
      /** The JSON payload containing the project details and capabilities */
      projectCustomTemplateCreateRequestDto: ProjectCustomTemplateCreateRequestDto;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/project-template",
        method: "POST",
        body: JSON.stringify(projectCustomTemplateCreateRequestDto),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Edit custom template
     *
     * This API endpoint allows you to edit an existing customised template.
     *
     * ***Note: Custom Templates are only supported for Jira Enterprise edition.***
     *
     * @returns 200 response
     */
    editTemplate: async ({
      editTemplateRequest,
      opts
    }: {
      /** The object containing the updated template details: name, description */
      editTemplateRequest: EditTemplateRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/project-template/edit-template",
        method: "PUT",
        body: JSON.stringify(editTemplateRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Get custom template
     *
     * This API endpoint allows you to get a live custom project template details by
     * either templateKey or projectId
     *
     * ***Note: Custom Templates are only supported for Jira Enterprise edition.***
     *
     * @returns 200 response
     */
    liveTemplate: async ({
      projectId,
      templateKey,
      opts
    }: {
      /**
       * optional - The \{@link String\} containing the project key linked to the custom
       * template to retrieve
       */
      projectId?: string;
      /**
       * optional - The \{@link String\} containing the key of the custom template to
       * retrieve
       */
      templateKey?: string;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<ProjectTemplateModel>> => {
      return jiraRequest<ProjectTemplateModel>({
        path: "/rest/api/3/project-template/live-template",
        method: "GET",
        queryParams: {
          projectId,
          templateKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Remove custom template
     *
     * This API endpoint allows you to remove a specified customised template
     *
     * ***Note: Custom Templates are only supported for Jira Enterprise edition.***
     *
     * @returns 200 response
     */
    removeTemplate: async ({
      templateKey,
      opts
    }: {
      /** The \{@link String\} containing the key of the custom template to remove */
      templateKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/project-template/remove-template",
        method: "DELETE",
        queryParams: {
          templateKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Save custom template
     *
     * This API endpoint allows you to save a customised template
     *
     * ***Note: Custom Templates are only supported for Jira Enterprise edition.***
     *
     * @returns 200 response
     */
    saveTemplate: async ({
      saveTemplateRequest,
      opts
    }: {
      /** The object containing the template basic details: name, description */
      saveTemplateRequest: SaveTemplateRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<SaveTemplateResponse>> => {
      return jiraRequest<SaveTemplateResponse>({
        path: "/rest/api/3/project-template/save-template",
        method: "POST",
        body: JSON.stringify(saveTemplateRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
