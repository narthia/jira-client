import type {
  ContainerForProjectFeatures,
  ProjectFeatureState,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents project features. Use it to get the list of features
 * for a project and modify the state of a feature. The project feature endpoint
 * is available only for Jira Software, both for team- and company-managed
 * projects.
 */
export default function projectFeatures<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns the list of features for a project.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "features": [
     *     {
     *       "feature": "jsw.classic.roadmap",
     *       "imageUri": "https://jira.atlassian.com/s/sb53l8/b/3/ab8a7691e4738b4f147e293f0864adfd5b8d3c85/_/download/resources/com.atlassian.jira.rest:classic-project-features/simple-roadmap-feature.svg",
     *       "localisedDescription": "Your roadmap is an optimized location to create and manage your epics.",
     *       "localisedName": "Roadmap",
     *       "prerequisites": [],
     *       "projectId": 10001,
     *       "state": "ENABLED",
     *       "toggleLocked": true
     *     },
     *     {
     *       "feature": "jsw.classic.backlog",
     *       "imageUri": "https://jira.atlassian.com/s/sb53l8/b/3/ab8a7691e4738b4f147e293f0864adfd5b8d3c85/_/download/resources/com.atlassian.jira.rest:classic-project-features/simple-backlog-feature.svg",
     *       "localisedDescription": "Plan and prioritize work in a dedicated space. To enable and configure the backlog for each board, go to board settings.",
     *       "localisedName": "Backlog",
     *       "prerequisites": [],
     *       "projectId": 10001,
     *       "state": "ENABLED",
     *       "toggleLocked": true
     *     }
     *   ]
     * }
     * ```
     */
    getFeaturesForProject: async ({
      projectIdOrKey,
      opts
    }: {
      /** The ID or (case-sensitive) key of the project. */
      projectIdOrKey: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ContainerForProjectFeatures>> => {
      return jiraRequest<ContainerForProjectFeatures>({
        path: "/rest/api/3/project/{projectIdOrKey}/features",
        method: "GET",
        pathParams: {
          projectIdOrKey
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Sets the state of a project feature.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "features": [
     *     {
     *       "feature": "jsw.classic.roadmap",
     *       "imageUri": "https://jira.atlassian.com/s/sb53l8/b/3/ab8a7691e4738b4f147e293f0864adfd5b8d3c85/_/download/resources/com.atlassian.jira.rest:classic-project-features/simple-roadmap-feature.svg",
     *       "localisedDescription": "Your roadmap is an optimized location to create and manage your epics.",
     *       "localisedName": "Roadmap",
     *       "prerequisites": [],
     *       "projectId": 10001,
     *       "state": "ENABLED",
     *       "toggleLocked": true
     *     },
     *     {
     *       "feature": "jsw.classic.backlog",
     *       "imageUri": "https://jira.atlassian.com/s/sb53l8/b/3/ab8a7691e4738b4f147e293f0864adfd5b8d3c85/_/download/resources/com.atlassian.jira.rest:classic-project-features/simple-backlog-feature.svg",
     *       "localisedDescription": "Plan and prioritize work in a dedicated space. To enable and configure the backlog for each board, go to board settings.",
     *       "localisedName": "Backlog",
     *       "prerequisites": [],
     *       "projectId": 10001,
     *       "state": "ENABLED",
     *       "toggleLocked": true
     *     }
     *   ]
     * }
     * ```
     */
    toggleFeatureForProject: async ({
      projectIdOrKey,
      featureKey,
      projectFeatureState,
      opts
    }: {
      /** The ID or (case-sensitive) key of the project. */
      projectIdOrKey: string;
      /** The key of the feature. */
      featureKey: string;
      /**
       * Details of the feature state change.
       *
       * @example
       * {
       *   "state": "ENABLED"
       * }
       */
      projectFeatureState: ProjectFeatureState;
    } & WithRequestOpts<TClient>): Promise<JiraResult<ContainerForProjectFeatures>> => {
      return jiraRequest<ContainerForProjectFeatures>({
        path: "/rest/api/3/project/{projectIdOrKey}/features/{featureKey}",
        method: "PUT",
        pathParams: {
          projectIdOrKey,
          featureKey
        },
        body: JSON.stringify(projectFeatureState),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
