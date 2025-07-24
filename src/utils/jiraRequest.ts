import type { ForgeRequestOpts, RequestParams } from "../types/global";
import { createHeaders } from "./headers";
import callAndHandleError from "./callAndHandleError";
import { getForgeRoute } from "./forgeUtils";
import { paramBuilder } from "./params";

const jiraRequest = async <TResponse>(requestParams: RequestParams) => {
  const {
    config,
    opts,
    isExperimental,
    method,
    path: pathTemplate,
    body,
    isResponseAvailable,
    queryParams,
    pathParams
  } = requestParams;
  const url = paramBuilder({ pathTemplate, queryParams, pathParams });

  let apiCall: Promise<Response>;

  if (config.type === "default") {
    const { auth } = config;
    apiCall = fetch(`${auth.baseUrl}${url}`, {
      method,
      headers: createHeaders({ type: config.type, auth, isExperimental, headers: opts?.headers }),
      ...(body && { body })
    });
  } else if (config.type === "forge") {
    const { auth } = config;
    const as = (opts as ForgeRequestOpts)?.as ?? "user";

    const forgeRoute = await getForgeRoute();

    apiCall = (as === "app" ? auth.api.asApp() : auth.api.asUser()).requestJira(
      forgeRoute?.(url) as import("@forge/api").Route,
      {
        method,
        headers: createHeaders({ type: config.type, isExperimental, headers: opts?.headers }),
        ...(body && { body })
      }
    ) as Promise<Response>;
  } else {
    throw new Error("Invalid client type");
  }

  const response = await callAndHandleError<TResponse>({
    apiCall,
    isResponseAvailable
  });

  return response;
};

export default jiraRequest;
