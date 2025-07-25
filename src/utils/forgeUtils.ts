// Forge-specific utilities that are only loaded when needed
// Dynamic import is used here to avoid bundling @forge/api in non-Forge environments
// This is a security-conscious approach to optional peer dependencies
export async function getForgeRoute() {
  try {
    // Only import @forge/api when actually needed in Forge applications
    // This prevents the dependency from being bundled in standard usage
    const forgeApi = await import("@forge/api");
    return forgeApi.assumeTrustedRoute;
  } catch (_error) {
    // Gracefully handle when @forge/api is not available
    return null;
  }
}
