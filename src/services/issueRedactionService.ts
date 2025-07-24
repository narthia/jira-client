import type {
  BulkRedactionRequest,
  RedactionJobStatusResponse,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/** This resource represents Issue Redaction. Provides APIs to redact issue data. */
export default function issueRedaction<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * Retrieves the current status of a redaction job ID.
     *
     * The jobStatus will be one of the following:
     *
     *  *  IN\_PROGRESS - The redaction job is currently in progress
     *  *  COMPLETED - The redaction job has completed successfully.
     *  *  PENDING - The redaction job has not started yet
     *
     * @returns Returned if the job status is successfully retrieved.
     */
    getRedactionStatus: async ({
      jobId,
      opts
    }: {
      /** Redaction job id */
      jobId: string;
    } & WithRequestOpts<TClient>): Promise<JiraResult<RedactionJobStatusResponse>> => {
      return jiraRequest<RedactionJobStatusResponse>({
        path: "/rest/api/3/redact/status/{jobId}",
        method: "GET",
        pathParams: {
          jobId
        },
        config,
        opts,
        isResponseAvailable: true
      });
    },

    /**
     * Submit a job to redact issue field data. This will trigger the redaction of the
     * data in the specified fields asynchronously.
     *
     * The redaction status can be polled using the job id.
     *
     * @returns Returned if the job submission is successful. The response contains the job id.
     */
    redact: async ({
      bulkRedactionRequest,
      opts
    }: {
      /** List of redaction requests */
      bulkRedactionRequest: BulkRedactionRequest;
    } & WithRequestOpts<TClient>): Promise<JiraResult<string>> => {
      return jiraRequest<string>({
        path: "/rest/api/3/redact",
        method: "POST",
        body: JSON.stringify(bulkRedactionRequest),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
