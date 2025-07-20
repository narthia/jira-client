import type { ClientType, DefaultJiraConfig } from "../types/global";

const authHeader = (email: string, apiToken: string) => {
  return `Basic ${btoa(`${email}:${apiToken}`)}` as const;
};

type HeadersParams<T extends ClientType> = {
  headers?: Record<string, string> | undefined;
  isExperimental?: boolean | undefined;
} & (T extends "default" ? { type: T; auth: DefaultJiraConfig["auth"] } : { type: T });

export const createHeaders = <T extends ClientType>(headersParams: HeadersParams<T>) => {
  let defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (headersParams.type === "default") {
    const { email, apiToken } = headersParams.auth;
    defaultHeaders["Authorization"] = authHeader(email, apiToken);
  }

  if (headersParams.isExperimental) {
    defaultHeaders["X-ExperimentalApi"] = "opt-in";
  }

  if (headersParams.headers) {
    defaultHeaders = { ...defaultHeaders, ...headersParams.headers };
  }

  return defaultHeaders;
};
