import type {
  DataClassificationLevelsBean,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/** This resource represents classification levels. */
export default function classificationLevels<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Returns all classification levels.
     *
     * **[Permissions](#permissions) required:** None.
     *
     * @returns Returned if the request is successful.
     *
     * example:
     * ```
     * {
     *   "classifications": [
     *     {
     *       "id": "ari:cloud:platform::classification-tag/5bfa70f7-4af1-44f5-9e12-1ce185f15a38",
     *       "status": "published",
     *       "name": "Restricted",
     *       "rank": 1,
     *       "description": "Data we hold that would be very damaging and would cause loss of trust with customers and present legal risk to Atlassian and/or customers if mishandled",
     *       "guideline": "Access to data must be restricted to only individuals who need access in order to perform their job duties.",
     *       "color": "RED"
     *     },
     *     {
     *       "id": "ari:cloud:platform::classification-tag/bd58e74c-c31b-41a7-ba69-9673ebd9dae9",
     *       "status": "archived",
     *       "name": "Protected",
     *       "rank": 2,
     *       "description": "Data we hold that could cause loss of trust with customers or present legal risk to Atlassian if mishandled",
     *       "guideline": "Access to systems or APIs mapping data to other identifiers must be carefully controlled.",
     *       "color": "ORANGE"
     *     },
     *     {
     *       "id": "ari:cloud:platform::classification-tag/a82d653e-1035-4aa2-b9de-4265511fd487",
     *       "status": "published",
     *       "name": "Confidential",
     *       "rank": 3,
     *       "description": "Data we hold that would likely be damaging and could cause loss of trust with our customers if mishandled",
     *       "guideline": "Data should be encrypted at rest and in transit.",
     *       "color": "BLUE"
     *     },
     *     {
     *       "id": "ari:cloud:platform::classification-tag/a82d653e-1035-4aa2-b9de-4265511fd487",
     *       "status": "published",
     *       "name": "system-tag"
     *     }
     *   ]
     * }
     * ```
     */
    getAllUserDataClassificationLevels: async ({
      status,
      orderBy,
      opts
    }: {
      /** Optional set of statuses to filter by. */
      status?: ("PUBLISHED" | "ARCHIVED" | "DRAFT")[];
      /**
       * Ordering of the results by a given field. If not provided, values will not be
       * sorted.
       */
      orderBy?: "rank" | "-rank" | "+rank";
    } & WithRequestOpts<TClient>): Promise<JiraResult<DataClassificationLevelsBean>> => {
      return jiraRequest<DataClassificationLevelsBean>({
        path: "/rest/api/3/classification-levels",
        method: "GET",
        queryParams: {
          status,
          orderBy
        },
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
