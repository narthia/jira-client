const queryParamBuilder = <T extends Record<string, unknown>>(params: T | undefined) => {
  if (!params) return undefined;
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    queryParams.set(key, value?.toString() ?? "");
  });
  return queryParams;
};

const pathParamBuilder = (pathTemplate: string, params: Record<string, unknown> | undefined) => {
  if (!params) return pathTemplate;
  return pathTemplate.replace(/\{([^}]+)\}/g, (match, paramName: string) => {
    if (params.hasOwnProperty(paramName)) {
      return params[paramName]?.toString() ?? "";
    }
    return match;
  });
};

export const paramBuilder = ({
  pathTemplate,
  queryParams,
  pathParams
}: {
  pathTemplate: string;
  queryParams: Record<string, unknown> | undefined;
  pathParams: Record<string, unknown> | undefined;
}) => {
  const path = pathParamBuilder(pathTemplate, pathParams);
  const query = queryParamBuilder(queryParams);
  return query ? `${path}?${query}` : path;
};
