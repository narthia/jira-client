import type { ClientType, ForgeRequestOpts, RequestParams } from "../types/global";
import { createHeaders } from "./headers";
import callAndHandleError from "./callAndHandleError";
import type { Route } from "@forge/api";

const jiraRequest = async <TClient extends ClientType, TResponse>(
  requestParams: RequestParams<TClient>
) => {
  const { config, opts, isExperimental, method, path, body, isResponseAvailable } = requestParams;

  let apiCall: Promise<Response>;

  if (config.type === "default") {
    const { auth } = config;
    apiCall = fetch(`${auth.baseUrl}${path}`, {
      method,
      headers: createHeaders({ type: config.type, auth, isExperimental, headers: opts?.headers }),
      ...(body && { body }),
    });
  } else if (config.type === "forge") {
    const { auth } = config;
    const as = (opts as ForgeRequestOpts)?.as ?? "app";

    apiCall = (as === "app" ? auth.api.asApp() : auth.api.asUser()).requestJira(path as Route, {
      method,
      headers: createHeaders({ type: config.type, isExperimental, headers: opts?.headers }),
      ...(body && { body }),
    }) as Promise<Response>;
  } else {
    throw new Error("Invalid client type");
  }

  const response = await callAndHandleError<TResponse>({
    apiCall,
    isResponseAvailable,
  });

  return response;
};

export default jiraRequest;
