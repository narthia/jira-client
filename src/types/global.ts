import type { ForgeAPI } from "@forge/api";

export type ClientType = "forge" | "default";

export interface BaseJiraConfig {
  type: ClientType;
}

export interface DefaultJiraConfig extends BaseJiraConfig {
  type: "default";
  auth: { email: string; apiToken: string; baseUrl: string };
}

// Conditional types for Forge - only used when actually needed
export interface ForgeJiraConfig extends BaseJiraConfig {
  type: "forge";
  auth: { api: ForgeAPI };
}

export type JiraRequestGeneric<
  TClient extends ClientType,
  TPathParams = undefined,
  TQueryParams = undefined,
  TBody = undefined,
> = (TPathParams extends undefined ? {} : { pathParams: TPathParams }) &
  (TQueryParams extends undefined ? {} : { queryParams?: TQueryParams }) &
  (TBody extends undefined ? {} : { body: TBody }) & { opts?: RequestOpts<TClient> };

export type JiraResponse<TResponse> =
  | {
      success: false;
      error: unknown;
      status: number;
      data?: undefined;
    }
  | {
      success: true;
      data: TResponse;
      status: number;
      error?: undefined;
    };

export interface JiraBaseRequestParams {
  isExperimental?: boolean;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string | ArrayBuffer | URLSearchParams | undefined;
  isResponseAvailable: boolean;
}

export interface JiraDefaultRequestParams extends JiraBaseRequestParams {
  config: DefaultJiraConfig;
  opts: DefaultRequestOpts;
  path: string;
}

export interface JiraForgeRequestParams extends JiraBaseRequestParams {
  config: ForgeJiraConfig;
  opts: ForgeRequestOpts;
  path: string;
}

export type RequestParams<TClient extends ClientType> = TClient extends "default"
  ? JiraDefaultRequestParams
  : JiraForgeRequestParams;

export interface DefaultRequestOpts {
  headers?: Record<string, string>;
}

export interface ForgeRequestOpts extends DefaultRequestOpts {
  as?: AsType;
}

export type RequestOpts<TClient extends ClientType> = TClient extends "default"
  ? DefaultRequestOpts
  : ForgeRequestOpts;

export type AsType = "app" | "user";
