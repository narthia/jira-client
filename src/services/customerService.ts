import type {
  UserDto,
  CustomerCreateDto,
  ClientType,
  DefaultJiraConfig,
  ForgeJiraConfig,
  WithRequestOpts,
  JiraResult
} from "../types";
import jiraRequest from "../utils/jiraRequest";

/**
 * This resource represents Jira Service Management customers. Use it to:
 *
 * * create customers
 * * manage customer information
 */
export default function customer<TClient extends ClientType>(
  config: DefaultJiraConfig | ForgeJiraConfig
) {
  return {
    /**
     * This method adds a customer to the Jira Service Management instance by passing
     * a JSON file including an email address and display name. The display name does
     * not need to be unique. The record's identifiers, `name` and `key`, are
     * automatically generated from the request details.
     *
     * **[Permissions](#permissions) required**: Jira Administrator Global permission
     *
     * @returns Returns the customer details.
     *
     * example:
     * ```
     * {
     *   "accountId": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *   "name": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *   "key": "qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *   "emailAddress": "fred@example.com",
     *   "displayName": "Fred F. User",
     *   "active": true,
     *   "timeZone": "Australia/Sydney",
     *   "_links": {
     *     "jiraRest": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b",
     *     "avatarUrls": {
     *       "16x16": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue",
     *       "24x24": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue",
     *       "32x32": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue",
     *       "48x48": "https://avatar-cdn.atlassian.com/9bc3b5bcb0db050c6d7660b28a5b86c9?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F9bc3b5bcb0db050c6d7660b28a5b86c9%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue"
     *     },
     *     "self": "https://your-domain.atlassian.net/rest/api/2/user?username=qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b"
     *   }
     * }
     * ```
     */
    createCustomer: async ({
      strictConflictStatusCode,
      customerCreateDto,
      opts
    }: {
      /**
       * Optional boolean flag to return 409 Conflict status code for duplicate customer
       * creation request
       */
      strictConflictStatusCode?: boolean;
      /**
       * @example
       * {
       *   "displayName": "Fred F. User",
       *   "email": "fred@example.com"
       * }
       */
      customerCreateDto: CustomerCreateDto;
    } & WithRequestOpts<TClient>): Promise<JiraResult<UserDto>> => {
      return jiraRequest<UserDto>({
        path: "/rest/servicedeskapi/customer",
        method: "POST",
        queryParams: {
          strictConflictStatusCode
        },
        body: JSON.stringify(customerCreateDto),
        config,
        opts,
        isResponseAvailable: true
      });
    }
  };
}
