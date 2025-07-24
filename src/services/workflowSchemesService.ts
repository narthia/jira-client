import type {
  WorkflowScheme,
  DefaultWorkflow,
  IssueTypeWorkflowMapping,
  IssueTypesWorkflowMapping,
  PageBeanWorkflowScheme,
  WorkflowSchemeProjectUsageDto,
  WorkflowSchemeReadRequest,
  WorkflowSchemeReadResponse,
  WorkflowSchemeUpdateRequest,
  WorkflowSchemeUpdateRequiredMappingsRequest,
  WorkflowSchemeUpdateRequiredMappingsResponse,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents workflow schemes. Use it to manage workflow schemes
 * and the workflow scheme's workflows and issue types.
 *
 * A workflow scheme maps issue types to workflows. A workflow scheme can be
 * associated with one or more projects, which enables the projects to use the
 * workflow-issue type mappings.
 *
 * Active workflow schemes (workflow schemes that are used by projects) cannot be
 * edited. When an active workflow scheme is edited, a draft copy of the scheme is
 * created. The draft workflow scheme is then be edited and published (replacing
 * the active scheme).
 *
 * See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg)
 * for more information.
 */
export default function workflowSchemes<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Creates a workflow scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "jira",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": false,
     *   "id": 101010,
     *   "issueTypeMappings": {
     *     "10000": "scrum workflow",
     *     "10001": "builds workflow"
     *   },
     *   "name": "Example workflow scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     * }
     * ```
     */
    createWorkflowScheme: async ({
      workflowScheme,
      opts
    }: {
      /**
       * @example
       * {
       *   "defaultWorkflow": "jira",
       *   "description": "The description of the example workflow scheme.",
       *   "issueTypeMappings": {
       *     "10000": "scrum workflow",
       *     "10001": "builds workflow"
       *   },
       *   "name": "Example workflow scheme"
       * }
       */
      workflowScheme: WorkflowScheme;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme",
        method: "POST",
        body: JSON.stringify(workflowScheme),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Resets the default workflow for a workflow scheme. That is, the default
     * workflow is set to Jira's system workflow (the *jira* workflow).
     *
     * Note that active workflow schemes cannot be edited. If the workflow scheme is
     * active, set `updateDraftIfNeeded` to `true` and a draft workflow scheme is
     * created or updated with the default workflow reset. The draft workflow scheme
     * can be published in Jira.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "jira",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": false,
     *   "id": 101010,
     *   "issueTypeMappings": {
     *     "10000": "scrum workflow",
     *     "10001": "builds workflow"
     *   },
     *   "name": "Example workflow scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     * }
     * ```
     */
    deleteDefaultWorkflow: async ({
      id,
      updateDraftIfNeeded,
      opts
    }: {
      /** The ID of the workflow scheme. */
      id: number;
      /**
       * Set to true to create or update the draft of a workflow scheme and delete the
       * mapping from the draft, when the workflow scheme cannot be edited. Defaults to
       * `false`.
       */
      updateDraftIfNeeded?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}/default",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          updateDraftIfNeeded
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes the workflow-issue type mapping for a workflow in a workflow scheme.
     *
     * Note that active workflow schemes cannot be edited. If the workflow scheme is
     * active, set `updateDraftIfNeeded` to `true` and a draft workflow scheme is
     * created or updated with the workflow-issue type mapping deleted. The draft
     * workflow scheme can be published in Jira.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteWorkflowMapping: async ({
      id,
      workflowName,
      updateDraftIfNeeded,
      opts
    }: {
      /** The ID of the workflow scheme. */
      id: number;
      /** The name of the workflow. */
      workflowName: string;
      /**
       * Set to true to create or update the draft of a workflow scheme and delete the
       * mapping from the draft, when the workflow scheme cannot be edited. Defaults to
       * `false`.
       */
      updateDraftIfNeeded?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/workflowscheme/{id}/workflow",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          workflowName,
          updateDraftIfNeeded
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it
     * is active (that is, being used by at least one project).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     */
    deleteWorkflowScheme: async ({
      id,
      opts
    }: {
      /**
       * The ID of the workflow scheme. Find this ID by editing the desired workflow
       * scheme in Jira. The ID is shown in the URL as `schemeId`. For example,
       * *schemeId=10301*.
       */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/workflowscheme/{id}",
        method: "DELETE",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes the issue type-workflow mapping for an issue type in a workflow scheme.
     *
     * Note that active workflow schemes cannot be edited. If the workflow scheme is
     * active, set `updateDraftIfNeeded` to `true` and a draft workflow scheme is
     * created or updated with the issue type-workflow mapping deleted. The draft
     * workflow scheme can be published in Jira.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "jira",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": false,
     *   "id": 101010,
     *   "issueTypeMappings": {
     *     "10000": "scrum workflow",
     *     "10001": "builds workflow"
     *   },
     *   "name": "Example workflow scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     * }
     * ```
     */
    deleteWorkflowSchemeIssueType: async ({
      id,
      issueType,
      updateDraftIfNeeded,
      opts
    }: {
      /** The ID of the workflow scheme. */
      id: number;
      /** The ID of the issue type. */
      issueType: string;
      /**
       * Set to true to create or update the draft of a workflow scheme and update the
       * mapping in the draft, when the workflow scheme cannot be edited. Defaults to
       * `false`.
       */
      updateDraftIfNeeded?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}/issuetype/{issueType}",
        method: "DELETE",
        pathParams: {
          id,
          issueType
        },
        queryParams: {
          updateDraftIfNeeded
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a [paginated](#pagination) list of all workflow schemes, not including
     * draft workflow schemes.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "isLast": true,
     *   "maxResults": 50,
     *   "startAt": 0,
     *   "total": 2,
     *   "values": [
     *     {
     *       "defaultWorkflow": "jira",
     *       "description": "The description of the example workflow scheme.",
     *       "id": 101010,
     *       "issueTypeMappings": {
     *         "10000": "scrum workflow",
     *         "10001": "builds workflow"
     *       },
     *       "name": "Example workflow scheme",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     *     },
     *     {
     *       "defaultWorkflow": "jira",
     *       "description": "The description of the another example workflow scheme.",
     *       "id": 101011,
     *       "issueTypeMappings": {
     *         "10000": "scrum workflow",
     *         "10001": "builds workflow"
     *       },
     *       "name": "Another example workflow scheme",
     *       "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101011"
     *     }
     *   ]
     * }
     * ```
     */
    getAllWorkflowSchemes: async ({
      startAt,
      maxResults,
      opts
    }: {
      /** The index of the first item to return in a page of results (page offset). */
      startAt?: number;
      /** The maximum number of items to return per page. */
      maxResults?: number;
    } & WithRequestOpts<TClient> = {}): Promise<JiraResult<PageBeanWorkflowScheme>> => {
      return jiraRequest<PageBeanWorkflowScheme>({
        path: "/rest/api/3/workflowscheme",
        method: "GET",
        queryParams: {
          startAt,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the default workflow for a workflow scheme. The default workflow is the
     * workflow that is assigned any issue types that have not been mapped to any
     * other workflow. The default workflow has *All Unassigned Issue Types* listed in
     * its issue types for the workflow scheme in Jira.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "workflow": "jira"
     * }
     * ```
     */
    getDefaultWorkflow: async ({
      id,
      returnDraftIfExists,
      opts
    }: {
      /** The ID of the workflow scheme. */
      id: number;
      /**
       * Set to `true` to return the default workflow for the workflow scheme's draft
       * rather than scheme itself. If the workflow scheme does not have a draft, then
       * the default workflow for the workflow scheme is returned.
       */
      returnDraftIfExists?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<DefaultWorkflow>> => {
      return jiraRequest<DefaultWorkflow>({
        path: "/rest/api/3/workflowscheme/{id}/default",
        method: "GET",
        pathParams: {
          id
        },
        queryParams: {
          returnDraftIfExists
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a page of projects using a given workflow scheme.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "projects": {
     *     "nextPageToken": "eyJvIjoyfQ==",
     *     "values": [
     *       {
     *         "id": "1003"
     *       }
     *     ]
     *   },
     *   "workflowSchemeId": "10005"
     * }
     * ```
     */
    getProjectUsagesForWorkflowScheme: async ({
      workflowSchemeId,
      nextPageToken,
      maxResults,
      opts
    }: {
      /** The workflow scheme ID */
      workflowSchemeId: string;
      /** The cursor for pagination */
      nextPageToken?: string;
      /** The maximum number of results to return. Must be an integer between 1 and 200. */
      maxResults?: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowSchemeProjectUsageDto>> => {
      return jiraRequest<WorkflowSchemeProjectUsageDto>({
        path: "/rest/api/3/workflowscheme/{workflowSchemeId}/projectUsages",
        method: "GET",
        pathParams: {
          workflowSchemeId
        },
        queryParams: {
          nextPageToken,
          maxResults
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the workflow-issue type mappings for a workflow scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultMapping": false,
     *   "issueTypes": [
     *     "10000",
     *     "10001"
     *   ],
     *   "workflow": "jira"
     * }
     * ```
     */
    getWorkflow: async ({
      id,
      workflowName,
      returnDraftIfExists,
      opts
    }: {
      /** The ID of the workflow scheme. */
      id: number;
      /**
       * The name of a workflow in the scheme. Limits the results to the workflow-issue
       * type mapping for the specified workflow.
       */
      workflowName?: string;
      /**
       * Returns the mapping from the workflow scheme's draft rather than the workflow
       * scheme, if set to true. If no draft exists, the mapping from the workflow
       * scheme is returned.
       */
      returnDraftIfExists?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypesWorkflowMapping>> => {
      return jiraRequest<IssueTypesWorkflowMapping>({
        path: "/rest/api/3/workflowscheme/{id}/workflow",
        method: "GET",
        pathParams: {
          id
        },
        queryParams: {
          workflowName,
          returnDraftIfExists
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a workflow scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "jira",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": false,
     *   "id": 101010,
     *   "issueTypeMappings": {
     *     "10000": "scrum workflow",
     *     "10001": "builds workflow"
     *   },
     *   "name": "Example workflow scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     * }
     * ```
     */
    getWorkflowScheme: async ({
      id,
      returnDraftIfExists,
      opts
    }: {
      /**
       * The ID of the workflow scheme. Find this ID by editing the desired workflow
       * scheme in Jira. The ID is shown in the URL as `schemeId`. For example,
       * *schemeId=10301*.
       */
      id: number;
      /**
       * Returns the workflow scheme's draft rather than scheme itself, if set to true.
       * If the workflow scheme does not have a draft, then the workflow scheme is
       * returned.
       */
      returnDraftIfExists?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}",
        method: "GET",
        pathParams: {
          id
        },
        queryParams: {
          returnDraftIfExists
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the issue type-workflow mapping for an issue type in a workflow scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "issueType": "10000",
     *   "workflow": "jira"
     * }
     * ```
     */
    getWorkflowSchemeIssueType: async ({
      id,
      issueType,
      returnDraftIfExists,
      opts
    }: {
      /** The ID of the workflow scheme. */
      id: number;
      /** The ID of the issue type. */
      issueType: string;
      /**
       * Returns the mapping from the workflow scheme's draft rather than the workflow
       * scheme, if set to true. If no draft exists, the mapping from the workflow
       * scheme is returned.
       */
      returnDraftIfExists?: boolean;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeWorkflowMapping>> => {
      return jiraRequest<IssueTypeWorkflowMapping>({
        path: "/rest/api/3/workflowscheme/{id}/issuetype/{issueType}",
        method: "GET",
        pathParams: {
          id,
          issueType
        },
        queryParams: {
          returnDraftIfExists
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns a list of workflow schemes by providing workflow scheme IDs or project
     * IDs.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* global permission to access all, including
     * project-scoped, workflow schemes
     *  *  *Administer projects* project permissions to access project-scoped workflow
     * schemes
     *
     * @returns Returned if the request is successful.
     *
     * example:
     *
     * ```
     * [
     *   {
     *     "defaultWorkflow": {
     *       "description": "This is the default workflow for Software Development projects.",
     *       "id": "3e59db0f-ed6c-47ce-8d50-80c0c4572677",
     *       "name": "Default Software Development Workflow",
     *       "usage": [
     *         {
     *           "issueTypeIds": [],
     *           "projectId": "10047"
     *         }
     *       ],
     *       "version": {
     *         "id": "657812fc-bc72-400f-aae0-df8d88db3d9g",
     *         "versionNumber": 1
     *       }
     *     },
     *     "description": "This is the workflow scheme for the Software Development project type.",
     *     "id": "3g78dg2a-ns2n-56ab-9812-42h5j1464567",
     *     "name": "Software Developer Workflow Scheme",
     *     "projectIdsUsingScheme": [
     *       "10047"
     *     ],
     *     "scope": {
     *       "project": {
     *         "id": "10047"
     *       },
     *       "type": "GLOBAL"
     *     },
     *     "taskId": "3f83dg2a-ns2n-56ab-9812-42h5j1461629",
     *     "version": {
     *       "id": "527213fc-bc72-400f-aae0-df8d88db2c8a",
     *       "versionNumber": 1
     *     },
     *     "workflowsForIssueTypes": [
     *       {
     *         "issueTypeIds": [
     *           "10013"
     *         ],
     *         "workflow": {
     *           "description": "This is the workflow for the Software Development bug issue type.",
     *           "id": "5e79ae0f-ed6c-47ce-8d50-80c0c4572745",
     *           "name": "Software Development Bug Workflow",
     *           "usage": [
     *             {
     *               "issueTypeIds": [
     *                 "10013"
     *               ],
     *               "projectId": "10047"
     *             }
     *           ],
     *           "version": {
     *             "id": "897812dc-bc72-400f-aae0-df8d88fe3d8f",
     *             "versionNumber": 1
     *           }
     *         }
     *       }
     *     ]
     *   }
     * ]
     * ```
     *
     */
    readWorkflowSchemes: async ({
      expand,
      workflowSchemeReadRequest,
      opts
    }: {
      /**
       * Deprecated. See the [deprecation
       * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
       * for details.
       *
       * Use [expand](#expansion) to include additional information in the response.
       * This parameter accepts a comma-separated list. Expand options include:
       *
       *  *  `workflows.usages` Returns the project and issue types that each workflow
       * in the workflow scheme is associated with.
       */
      expand?: string;
      /**
       * @example
       * {
       *   "projectIds": [
       *     "10047",
       *     "10048"
       *   ],
       *   "workflowSchemeIds": [
       *     "3e59db0f-ed6c-47ce-8d50-80c0c4572677"
       *   ]
       * }
       */
      workflowSchemeReadRequest: WorkflowSchemeReadRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowSchemeReadResponse[]>> => {
      return jiraRequest<WorkflowSchemeReadResponse[]>({
        path: "/rest/api/3/workflowscheme/read",
        method: "POST",
        queryParams: {
          expand
        },
        body: JSON.stringify(workflowSchemeReadRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the workflow for an issue type in a workflow scheme.
     *
     * Note that active workflow schemes cannot be edited. If the workflow scheme is
     * active, set `updateDraftIfNeeded` to `true` in the request body and a draft
     * workflow scheme is created or updated with the new issue type-workflow mapping.
     * The draft workflow scheme can be published in Jira.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "jira",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": false,
     *   "id": 101010,
     *   "issueTypeMappings": {
     *     "10000": "scrum workflow",
     *     "10001": "builds workflow"
     *   },
     *   "name": "Example workflow scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     * }
     * ```
     */
    setWorkflowSchemeIssueType: async ({
      id,
      issueType,
      issueTypeWorkflowMapping,
      opts
    }: {
      /** The ID of the workflow scheme. */
      id: number;
      /** The ID of the issue type. */
      issueType: string;
      /**
       * The issue type-project mapping.
       *
       * @example
       * {
       *   "issueType": "10000",
       *   "updateDraftIfNeeded": false,
       *   "workflow": "jira"
       * }
       */
      issueTypeWorkflowMapping: IssueTypeWorkflowMapping;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}/issuetype/{issueType}",
        method: "PUT",
        pathParams: {
          id,
          issueType
        },
        body: JSON.stringify(issueTypeWorkflowMapping),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the default workflow for a workflow scheme.
     *
     * Note that active workflow schemes cannot be edited. If the workflow scheme is
     * active, set `updateDraftIfNeeded` to `true` in the request object and a draft
     * workflow scheme is created or updated with the new default workflow. The draft
     * workflow scheme can be published in Jira.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "jira",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": false,
     *   "id": 101010,
     *   "issueTypeMappings": {
     *     "10000": "scrum workflow",
     *     "10001": "builds workflow"
     *   },
     *   "name": "Example workflow scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     * }
     * ```
     */
    updateDefaultWorkflow: async ({
      id,
      defaultWorkflow,
      opts
    }: {
      /** The ID of the workflow scheme. */
      id: number;
      /**
       * The new default workflow.
       *
       * @example
       * {
       *   "updateDraftIfNeeded": false,
       *   "workflow": "jira"
       * }
       */
      defaultWorkflow: DefaultWorkflow;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}/default",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(defaultWorkflow),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates company-managed and team-managed project workflow schemes. This API
     * doesn't have a concept of draft, so any changes made to a workflow scheme are
     * immediately available. When changing the available statuses for issue types, an
     * [asynchronous task](#async) migrates the issues as defined in the provided
     * mappings.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* project permission to update all, including
     * global-scoped, workflow schemes.
     *  *  *Administer projects* project permission to update project-scoped workflow
     * schemes.
     *
     * @returns Returned if the request is successful and there is no asynchronous task.
     */
    updateSchemes: async ({
      workflowSchemeUpdateRequest,
      opts
    }: {
      /**
       * @example
       * {
       *   "defaultWorkflowId": "3e59db0f-ed6c-47ce-8d50-80c0c4572677",
       *   "description": "description",
       *   "id": "10000",
       *   "name": "name",
       *   "statusMappingsByIssueTypeOverride": [
       *     {
       *       "issueTypeId": "10001",
       *       "statusMappings": [
       *         {
       *           "newStatusId": "2",
       *           "oldStatusId": "1"
       *         },
       *         {
       *           "newStatusId": "4",
       *           "oldStatusId": "3"
       *         }
       *       ]
       *     },
       *     {
       *       "issueTypeId": "10002",
       *       "statusMappings": [
       *         {
       *           "newStatusId": "4",
       *           "oldStatusId": "1"
       *         },
       *         {
       *           "newStatusId": "2",
       *           "oldStatusId": "3"
       *         }
       *       ]
       *     }
       *   ],
       *   "statusMappingsByWorkflows": [
       *     {
       *       "newWorkflowId": "3e59db0f-ed6c-47ce-8d50-80c0c4572677",
       *       "oldWorkflowId": "3e59db0f-ed6c-47ce-8d50-80c0c4572677",
       *       "statusMappings": [
       *         {
       *           "newStatusId": "2",
       *           "oldStatusId": "1"
       *         },
       *         {
       *           "newStatusId": "4",
       *           "oldStatusId": "3"
       *         }
       *       ]
       *     }
       *   ],
       *   "version": {
       *     "id": "527213fc-bc72-400f-aae0-df8d88db2c8a",
       *     "versionNumber": 1
       *   },
       *   "workflowsForIssueTypes": [
       *     {
       *       "issueTypeIds": [
       *         "10000",
       *         "10003"
       *       ],
       *       "workflowId": "3e59db0f-ed6c-47ce-8d50-80c0c4572677"
       *     },
       *     {
       *       "issueTypeIds": [
       *         "10001`",
       *         "10002"
       *       ],
       *       "workflowId": "3f83dg2a-ns2n-56ab-9812-42h5j1461629"
       *     }
       *   ]
       * }
       */
      workflowSchemeUpdateRequest: WorkflowSchemeUpdateRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<unknown>> => {
      return jiraRequest<unknown>({
        path: "/rest/api/3/workflowscheme/update",
        method: "POST",
        body: JSON.stringify(workflowSchemeUpdateRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the issue types for a workflow in a workflow scheme. The workflow can also
     * be set as the default workflow for the workflow scheme. Unmapped issues types
     * are mapped to the default workflow.
     *
     * Note that active workflow schemes cannot be edited. If the workflow scheme is
     * active, set `updateDraftIfNeeded` to `true` in the request body and a draft
     * workflow scheme is created or updated with the new workflow-issue types
     * mappings. The draft workflow scheme can be published in Jira.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "jira",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": false,
     *   "id": 101010,
     *   "issueTypeMappings": {
     *     "10000": "scrum workflow",
     *     "10001": "builds workflow"
     *   },
     *   "name": "Example workflow scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     * }
     * ```
     */
    updateWorkflowMapping: async ({
      id,
      workflowName,
      issueTypesWorkflowMapping,
      opts
    }: {
      /** The ID of the workflow scheme. */
      id: number;
      /** The name of the workflow. */
      workflowName: string;
      /**
       * @example
       * {
       *   "issueTypes": [
       *     "10000"
       *   ],
       *   "updateDraftIfNeeded": true,
       *   "workflow": "jira"
       * }
       */
      issueTypesWorkflowMapping: IssueTypesWorkflowMapping;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}/workflow",
        method: "PUT",
        pathParams: {
          id
        },
        queryParams: {
          workflowName
        },
        body: JSON.stringify(issueTypesWorkflowMapping),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Updates a company-manged project workflow scheme, including the name, default
     * workflow, issue type to project mappings, and more. If the workflow scheme is
     * active (that is, being used by at least one project), then a draft workflow
     * scheme is created or updated instead, provided that `updateDraftIfNeeded` is
     * set to `true`.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "jira",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": false,
     *   "id": 101010,
     *   "issueTypeMappings": {
     *     "10000": "scrum workflow",
     *     "10001": "builds workflow"
     *   },
     *   "name": "Example workflow scheme",
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/101010"
     * }
     * ```
     */
    updateWorkflowScheme: async ({
      id,
      workflowScheme,
      opts
    }: {
      /**
       * The ID of the workflow scheme. Find this ID by editing the desired workflow
       * scheme in Jira. The ID is shown in the URL as `schemeId`. For example,
       * *schemeId=10301*.
       */
      id: number;
      /**
       * @example
       * {
       *   "defaultWorkflow": "jira",
       *   "description": "The description of the example workflow scheme.",
       *   "issueTypeMappings": {
       *     "10000": "scrum workflow"
       *   },
       *   "name": "Example workflow scheme",
       *   "updateDraftIfNeeded": false
       * }
       */
      workflowScheme: WorkflowScheme;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(workflowScheme),
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Gets the required status mappings for the desired changes to a workflow scheme.
     * The results are provided per issue type and workflow. When updating a workflow
     * scheme, status mappings can be provided per issue type, per workflow, or both.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Administer Jira* permission to update all, including global-scoped,
     * workflow schemes.
     *  *  *Administer projects* project permission to update project-scoped workflow
     * schemes.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "statusMappingsByIssueTypes": [
     *     {
     *       "issueTypeId": "10000",
     *       "statusIds": [
     *         "10000",
     *         "10001"
     *       ]
     *     }
     *   ],
     *   "statusMappingsByWorkflows": [
     *     {
     *       "sourceWorkflowId": "10000",
     *       "statusIds": [
     *         "10000",
     *         "10001"
     *       ],
     *       "targetWorkflowId": "10001"
     *     }
     *   ],
     *   "statuses": [
     *     {
     *       "category": "TODO",
     *       "id": "10000",
     *       "name": "To Do"
     *     }
     *   ],
     *   "statusesPerWorkflow": [
     *     {
     *       "initialStatusId": "10000",
     *       "statuses": [
     *         "10000",
     *         "10001"
     *       ],
     *       "workflowId": "10000"
     *     }
     *   ]
     * }
     * ```
     */
    updateWorkflowSchemeMappings: async ({
      workflowSchemeUpdateRequiredMappingsRequest,
      opts
    }: {
      /**
       * @example
       * {
       *   "defaultWorkflowId": "10010",
       *   "id": "10001",
       *   "workflowsForIssueTypes": [
       *     {
       *       "issueTypeIds": [
       *         "10010",
       *         "10011"
       *       ],
       *       "workflowId": "10001"
       *     }
       *   ]
       * }
       */
      workflowSchemeUpdateRequiredMappingsRequest: WorkflowSchemeUpdateRequiredMappingsRequest;
    } & WithRequestOpts<TClient>): Promise<
      JiraResult<WorkflowSchemeUpdateRequiredMappingsResponse>
    > => {
      return jiraRequest<WorkflowSchemeUpdateRequiredMappingsResponse>({
        path: "/rest/api/3/workflowscheme/update/mappings",
        method: "POST",
        body: JSON.stringify(workflowSchemeUpdateRequiredMappingsRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
