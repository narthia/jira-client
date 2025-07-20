// Forge-specific utilities that are only loaded when needed
export async function getForgeRoute() {
  try {
    const forgeApi = await import("@forge/api");
    return forgeApi.route;
  } catch (_error) {
    return null;
  }
}
