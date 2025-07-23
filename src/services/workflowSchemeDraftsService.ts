import type {
  WorkflowScheme,
  DefaultWorkflow,
  IssueTypeWorkflowMapping,
  IssueTypesWorkflowMapping,
  PublishDraftWorkflowScheme,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents draft workflow schemes. Use it to manage drafts of
 * workflow schemes.
 *
 * A workflow scheme maps issue types to workflows. A workflow scheme can be
 * associated with one or more projects, which enables the projects to use the
 * workflow-issue type mappings.
 *
 * Active workflow schemes (workflow schemes that are used by projects) cannot be
 * edited. Editing an active workflow scheme creates a draft copy of the scheme.
 * The draft workflow scheme can then be edited and published (replacing the
 * active scheme).
 *
 * See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg)
 * for more information.
 */
export default function workflowSchemeDrafts<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Create a draft workflow scheme from an active workflow scheme, by copying the
     * active workflow scheme. Note that an active workflow scheme can only have one
     * draft workflow scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "scrum workflow",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": true,
     *   "id": 17218781,
     *   "issueTypeMappings": {
     *     "10000": "jira",
     *     "10001": "jira"
     *   },
     *   "lastModified": "Today 6:38 PM",
     *   "lastModifiedUser": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": true,
     *     "applicationRoles": {
     *       "items": [],
     *       "size": 1
     *     },
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "emailAddress": "mia@example.com",
     *     "groups": {
     *       "items": [],
     *       "size": 3
     *     },
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *     "timeZone": "Australia/Sydney"
     *   },
     *   "name": "Example workflow scheme",
     *   "originalDefaultWorkflow": "jira",
     *   "originalIssueTypeMappings": {
     *     "10001": "builds workflow"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/17218781/draft"
     * }
     * ```
     */
    createWorkflowSchemeDraftFromParent: async ({
      id,
      opts
    }: {
      /** The ID of the active workflow scheme that the draft is created from. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}/createdraft",
        method: "POST",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Resets the default workflow for a workflow scheme's draft. That is, the default
     * workflow is set to Jira's system workflow (the *jira* workflow).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "scrum workflow",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": true,
     *   "id": 17218781,
     *   "issueTypeMappings": {
     *     "10000": "jira",
     *     "10001": "jira"
     *   },
     *   "lastModified": "Today 6:38 PM",
     *   "lastModifiedUser": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": true,
     *     "applicationRoles": {
     *       "items": [],
     *       "size": 1
     *     },
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "emailAddress": "mia@example.com",
     *     "groups": {
     *       "items": [],
     *       "size": 3
     *     },
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *     "timeZone": "Australia/Sydney"
     *   },
     *   "name": "Example workflow scheme",
     *   "originalDefaultWorkflow": "jira",
     *   "originalIssueTypeMappings": {
     *     "10001": "builds workflow"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/17218781/draft"
     * }
     * ```
     */
    deleteDraftDefaultWorkflow: async ({
      id,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}/draft/default",
        method: "DELETE",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Deletes the workflow-issue type mapping for a workflow in a workflow scheme's
     * draft.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteDraftWorkflowMapping: async ({
      id,
      workflowName,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
      id: number;
      /** The name of the workflow. */
      workflowName: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/workflowscheme/{id}/draft/workflow",
        method: "DELETE",
        pathParams: {
          id
        },
        queryParams: {
          workflowName
        },
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Deletes a draft workflow scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteWorkflowSchemeDraft: async ({
      id,
      opts
    }: {
      /** The ID of the active workflow scheme that the draft was created from. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/workflowscheme/{id}/draft",
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
     * Deletes the issue type-workflow mapping for an issue type in a workflow
     * scheme's draft.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "scrum workflow",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": true,
     *   "id": 17218781,
     *   "issueTypeMappings": {
     *     "10000": "jira",
     *     "10001": "jira"
     *   },
     *   "lastModified": "Today 6:38 PM",
     *   "lastModifiedUser": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": true,
     *     "applicationRoles": {
     *       "items": [],
     *       "size": 1
     *     },
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "emailAddress": "mia@example.com",
     *     "groups": {
     *       "items": [],
     *       "size": 3
     *     },
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *     "timeZone": "Australia/Sydney"
     *   },
     *   "name": "Example workflow scheme",
     *   "originalDefaultWorkflow": "jira",
     *   "originalIssueTypeMappings": {
     *     "10001": "builds workflow"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/17218781/draft"
     * }
     * ```
     */
    deleteWorkflowSchemeDraftIssueType: async ({
      id,
      issueType,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
      id: number;
      /** The ID of the issue type. */
      issueType: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}",
        method: "DELETE",
        pathParams: {
          id,
          issueType
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the default workflow for a workflow scheme's draft. The default
     * workflow is the workflow that is assigned any issue types that have not been
     * mapped to any other workflow. The default workflow has *All Unassigned Issue
     * Types* listed in its issue types for the workflow scheme in Jira.
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
    getDraftDefaultWorkflow: async ({
      id,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<DefaultWorkflow>> => {
      return jiraRequest<DefaultWorkflow>({
        path: "/rest/api/3/workflowscheme/{id}/draft/default",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the workflow-issue type mappings for a workflow scheme's draft.
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
    getDraftWorkflow: async ({
      id,
      workflowName,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
      id: number;
      /**
       * The name of a workflow in the scheme. Limits the results to the workflow-issue
       * type mapping for the specified workflow.
       */
      workflowName?: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypesWorkflowMapping>> => {
      return jiraRequest<IssueTypesWorkflowMapping>({
        path: "/rest/api/3/workflowscheme/{id}/draft/workflow",
        method: "GET",
        pathParams: {
          id
        },
        queryParams: {
          workflowName
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the draft workflow scheme for an active workflow scheme. Draft workflow
     * schemes allow changes to be made to the active workflow schemes: When an active
     * workflow scheme is updated, a draft copy is created. The draft is modified,
     * then the changes in the draft are copied back to the active workflow scheme.
     * See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg)
     * for more information.
     * Note that:
     *
     *  *  Only active workflow schemes can have draft workflow schemes.
     *  *  An active workflow scheme can only have one draft workflow scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "scrum workflow",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": true,
     *   "id": 17218781,
     *   "issueTypeMappings": {
     *     "10000": "jira",
     *     "10001": "jira"
     *   },
     *   "lastModified": "Today 6:38 PM",
     *   "lastModifiedUser": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": true,
     *     "applicationRoles": {
     *       "items": [],
     *       "size": 1
     *     },
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "emailAddress": "mia@example.com",
     *     "groups": {
     *       "items": [],
     *       "size": 3
     *     },
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *     "timeZone": "Australia/Sydney"
     *   },
     *   "name": "Example workflow scheme",
     *   "originalDefaultWorkflow": "jira",
     *   "originalIssueTypeMappings": {
     *     "10001": "builds workflow"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/17218781/draft"
     * }
     * ```
     */
    getWorkflowSchemeDraft: async ({
      id,
      opts
    }: {
      /** The ID of the active workflow scheme that the draft was created from. */
      id: number;
    } & WithRequestOpts<TClient>): Promise<JiraResult<WorkflowScheme>> => {
      return jiraRequest<WorkflowScheme>({
        path: "/rest/api/3/workflowscheme/{id}/draft",
        method: "GET",
        pathParams: {
          id
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Returns the issue type-workflow mapping for an issue type in a workflow
     * scheme's draft.
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
    getWorkflowSchemeDraftIssueType: async ({
      id,
      issueType,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
      id: number;
      /** The ID of the issue type. */
      issueType: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<IssueTypeWorkflowMapping>> => {
      return jiraRequest<IssueTypeWorkflowMapping>({
        path: "/rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}",
        method: "GET",
        pathParams: {
          id,
          issueType
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Publishes a draft workflow scheme.
     *
     * Where the draft workflow includes new workflow statuses for an issue type,
     * mappings are provided to update issues with the original workflow status to the
     * new workflow status.
     *
     * This operation is [asynchronous](#async). Follow the `location` link in the
     * response to determine the status of the task and use [Get
     * task](#api-rest-api-3-task-taskId-get) to obtain updates.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    publishDraftWorkflowScheme: async ({
      id,
      validateOnly,
      publishDraftWorkflowScheme,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
      id: number;
      /** Whether the request only performs a validation. */
      validateOnly?: boolean;
      /**
       * Details of the status mappings.
       *
       * @example
       * {
       *   "statusMappings": [
       *     {
       *       "issueTypeId": "10001",
       *       "newStatusId": "1",
       *       "statusId": "3"
       *     },
       *     {
       *       "issueTypeId": "10001",
       *       "newStatusId": "2",
       *       "statusId": "2"
       *     },
       *     {
       *       "issueTypeId": "10002",
       *       "newStatusId": "10003",
       *       "statusId": "10005"
       *     },
       *     {
       *       "issueTypeId": "10003",
       *       "newStatusId": "1",
       *       "statusId": "4"
       *     }
       *   ]
       * }
       */
      publishDraftWorkflowScheme: PublishDraftWorkflowScheme;
    } & WithRequestOpts<TClient>): Promise<JiraResult<void>> => {
      return jiraRequest<void>({
        path: "/rest/api/3/workflowscheme/{id}/draft/publish",
        method: "POST",
        pathParams: {
          id
        },
        queryParams: {
          validateOnly
        },
        body: JSON.stringify(publishDraftWorkflowScheme),
        config,
        opts,
        isResponseAvailable: false
      });
    },

    /**
     * Sets the workflow for an issue type in a workflow scheme's draft.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "scrum workflow",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": true,
     *   "id": 17218781,
     *   "issueTypeMappings": {
     *     "10000": "jira",
     *     "10001": "jira"
     *   },
     *   "lastModified": "Today 6:38 PM",
     *   "lastModifiedUser": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": true,
     *     "applicationRoles": {
     *       "items": [],
     *       "size": 1
     *     },
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "emailAddress": "mia@example.com",
     *     "groups": {
     *       "items": [],
     *       "size": 3
     *     },
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *     "timeZone": "Australia/Sydney"
     *   },
     *   "name": "Example workflow scheme",
     *   "originalDefaultWorkflow": "jira",
     *   "originalIssueTypeMappings": {
     *     "10001": "builds workflow"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/17218781/draft"
     * }
     * ```
     */
    setWorkflowSchemeDraftIssueType: async ({
      id,
      issueType,
      issueTypeWorkflowMapping,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
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
        path: "/rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}",
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
     * Sets the default workflow for a workflow scheme's draft.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "scrum workflow",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": true,
     *   "id": 17218781,
     *   "issueTypeMappings": {
     *     "10000": "jira",
     *     "10001": "jira"
     *   },
     *   "lastModified": "Today 6:38 PM",
     *   "lastModifiedUser": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": true,
     *     "applicationRoles": {
     *       "items": [],
     *       "size": 1
     *     },
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "emailAddress": "mia@example.com",
     *     "groups": {
     *       "items": [],
     *       "size": 3
     *     },
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *     "timeZone": "Australia/Sydney"
     *   },
     *   "name": "Example workflow scheme",
     *   "originalDefaultWorkflow": "jira",
     *   "originalIssueTypeMappings": {
     *     "10001": "builds workflow"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/17218781/draft"
     * }
     * ```
     */
    updateDraftDefaultWorkflow: async ({
      id,
      defaultWorkflow,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
      id: number;
      /**
       * The object for the new default workflow.
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
        path: "/rest/api/3/workflowscheme/{id}/draft/default",
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
     * Sets the issue types for a workflow in a workflow scheme's draft. The workflow
     * can also be set as the default workflow for the draft workflow scheme. Unmapped
     * issues types are mapped to the default workflow.
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
    updateDraftWorkflowMapping: async ({
      id,
      workflowName,
      issueTypesWorkflowMapping,
      opts
    }: {
      /** The ID of the workflow scheme that the draft belongs to. */
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
        path: "/rest/api/3/workflowscheme/{id}/draft/workflow",
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
     * Updates a draft workflow scheme. If a draft workflow scheme does not exist for
     * the active workflow scheme, then a draft is created. Note that an active
     * workflow scheme can only have one draft workflow scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global
     * permission](https://confluence.atlassian.com/x/x4dKLg).
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "defaultWorkflow": "scrum workflow",
     *   "description": "The description of the example workflow scheme.",
     *   "draft": true,
     *   "id": 17218781,
     *   "issueTypeMappings": {
     *     "10000": "jira",
     *     "10001": "jira"
     *   },
     *   "lastModified": "Today 6:38 PM",
     *   "lastModifiedUser": {
     *     "accountId": "5b10a2844c20165700ede21g",
     *     "accountType": "atlassian",
     *     "active": true,
     *     "applicationRoles": {
     *       "items": [],
     *       "size": 1
     *     },
     *     "avatarUrls": {
     *       "16x16": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16",
     *       "24x24": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24",
     *       "32x32": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32",
     *       "48x48": "https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48"
     *     },
     *     "displayName": "Mia Krystof",
     *     "emailAddress": "mia@example.com",
     *     "groups": {
     *       "items": [],
     *       "size": 3
     *     },
     *     "key": "",
     *     "name": "",
     *     "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
     *     "timeZone": "Australia/Sydney"
     *   },
     *   "name": "Example workflow scheme",
     *   "originalDefaultWorkflow": "jira",
     *   "originalIssueTypeMappings": {
     *     "10001": "builds workflow"
     *   },
     *   "self": "https://your-domain.atlassian.net/rest/api/3/workflowscheme/17218781/draft"
     * }
     * ```
     */
    updateWorkflowSchemeDraft: async ({
      id,
      workflowScheme,
      opts
    }: {
      /** The ID of the active workflow scheme that the draft was created from. */
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
        path: "/rest/api/3/workflowscheme/{id}/draft",
        method: "PUT",
        pathParams: {
          id
        },
        body: JSON.stringify(workflowScheme),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
