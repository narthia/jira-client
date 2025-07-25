import type { DefaultJiraConfig, ForgeJiraConfig } from "../types";

/**
 * Validates a Jira configuration object to ensure it has all required properties
 * based on the configuration type.
 *
 * @param config - The configuration object to validate
 * @throws {Error} If the configuration is invalid or missing required properties
 */
export function validateJiraConfig(config: DefaultJiraConfig | ForgeJiraConfig): void {
  // Validate config has required properties
  if (!config) {
    throw new Error("Config is required");
  }

  if (!config.type) {
    throw new Error("Config must have a 'type' property");
  }

  if (!config.auth) {
    throw new Error("Config must have an 'auth' property");
  }

  // Validate based on config type
  if (config.type === "default") {
    const auth = config.auth;
    if (!auth.email) {
      throw new Error("Default config auth must have 'email' property");
    }
    if (!auth.apiToken) {
      throw new Error("Default config auth must have 'apiToken' property");
    }
    if (!auth.baseUrl) {
      throw new Error("Default config auth must have 'baseUrl' property");
    }
  } else if (config.type === "forge") {
    const auth = config.auth;
    if (!auth.api) {
      throw new Error("Forge config auth must have 'api' property");
    }
  } else {
    throw new Error(
      `Invalid config type: ${(config as unknown as { type: string }).type}. Must be 'default' or 'forge'`
    );
  }
}
