type QueryParam<T extends Record<string, string | boolean | number | string[]>> = {
  params?: T | undefined;
  opts?: { multiple?: (keyof T)[] };
};

export const queryParamBuilder = <T extends Record<string, string | boolean | number | string[]>>({
  params,
  opts,
}: QueryParam<T>) => {
  const queryParams = new URLSearchParams();
  if (!params) return queryParams;
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    if (opts?.multiple?.includes(key as keyof T)) {
      const values = params?.[key as keyof T] as string[];
      values.forEach(v => queryParams.append(key, v));
    } else {
      queryParams.set(key, value.toString());
    }
  });
  return queryParams;
};
