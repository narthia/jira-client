import type { ForgeAPI } from "@forge/api";

export type ClientType = "forge" | "default";

export interface DefaultJiraConfig {
  type: "default";
  auth: { email: string; apiToken: string; baseUrl: string };
}

// Conditional types for Forge - only used when actually needed
export interface ForgeJiraConfig {
  type: "forge";
  auth: { api: ForgeAPI };
}

export type JiraResult<TResult> =
  | {
      success: false;
      error: unknown;
      status: number;
      data?: undefined;
    }
  | {
      success: true;
      data: TResult;
      status: number;
      error?: undefined;
    };

export type RequestParams = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string | ArrayBuffer | URLSearchParams | undefined;
  isResponseAvailable: boolean;
  config: DefaultJiraConfig | ForgeJiraConfig;
  opts: DefaultRequestOpts | ForgeRequestOpts | undefined;
  isExperimental?: boolean;
  queryParams?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
};

export interface DefaultRequestOpts {
  /**
   * An object containing custom HTTP headers to include in the request. All required authentication and content-type headers are automatically managed by the client. Use this option to add additional headers or override default headers for specific requests (e.g., `{ "X-Custom-Header": "value", "Accept": "application/json" }`).
   */
  headers?: Record<string, string>;
}

export interface ForgeRequestOpts extends DefaultRequestOpts {
  /**
   * For Forge applications, requests are executed as the `"user"` by default. Set to `"app"` to execute requests with application-level permissions instead of user-level permissions.
   */
  as?: AsType;
}

export interface WithRequestOptsForge {
  /**
   * Additional options for the request. This may include:
   *
   * - **`as`**: For Forge applications, requests are executed as the `"user"` by default. Set to `"app"` to execute requests with application-level permissions instead of user-level permissions.
   * - **`headers`**: An object containing custom HTTP headers to include in the request. All required authentication and content-type headers are automatically managed by the client. Use this option to add additional headers or override default headers for specific requests (e.g., `{ "X-Custom-Header": "value", "Accept": "application/json" }`).
   *
   * @example
   * {
   *   as: "app",
   *   headers: {
   *     "X-Custom-Header": "my-value"
   *   }
   * }
   */
  opts?: ForgeRequestOpts;
}

export interface WithRequestOptsDefault {
  /**
   * Additional options for the request. This may include:
   *
   * **`headers`**: An object containing custom HTTP headers to include in the request. All required authentication and content-type headers are automatically managed by the client. Use this option to add additional headers or override default headers for specific requests (e.g., `{ "X-Custom-Header": "value", "Accept": "application/json" }`).
   *
   * @example
   * {
   *   headers: {
   *     "X-Custom-Header": "my-value"
   *   }
   * }
   */
  opts?: DefaultRequestOpts;
}

export type WithRequestOpts<TClient extends ClientType> = TClient extends "forge"
  ? WithRequestOptsForge
  : WithRequestOptsDefault;

export type RequestOpts<TClient extends ClientType> = TClient extends "default"
  ? DefaultRequestOpts
  : ForgeRequestOpts;

export type AsType = "app" | "user";
