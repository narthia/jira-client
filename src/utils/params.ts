export const queryParamBuilder = <T extends Record<string, string | boolean | number | string[]>>(
  params?: T,
  multiple?: (keyof T)[]
) => {
  const queryParams = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      if (multiple?.includes(key as keyof T)) {
        const values = params?.[key as keyof T] as string[];
        values.forEach(v => queryParams.append(key, v));
      } else {
        queryParams.set(key, value.toString());
      }
    }
  });
  return queryParams;
};
