import { defineConfig } from "@narthia/openapi-sdk-generator";
import {
  JIRA_PLATFORM_V2_URL,
  JIRA_PLATFORM_V3_URL,
  JIRA_SERVICE_DESK_URL,
  JIRA_SOFTWARE_URL,
} from "./jira-rest-api-urls.ts";

const auth = { basic: { usernameField: "email", passwordField: "apiToken" } };
const collisionCase = "snake_case";

export default defineConfig({
  inputs: {
    "jira-platform-v2": {
      input: JIRA_PLATFORM_V2_URL,
      collisionCase,
      name: "createPlatformV2Sdk",
    },
    "jira-platform-v3": {
      input: JIRA_PLATFORM_V3_URL,
      collisionCase,
      name: "createPlatformV3Sdk",
    },
    "jira-service-desk": {
      input: JIRA_SERVICE_DESK_URL,
      collisionCase,
      name: "createServiceDeskSdk",
    },
    "jira-software": {
      input: JIRA_SOFTWARE_URL,
      collisionCase,
      name: "createSoftwareSdk",
    },
  },
  output: "./src",
  runtime: "generate",
  transports: { http: { auth }, forge: { product: "jira", as: "app" } },
  importExtension: "ts",
  clean: "generated",
  // Drop Atlassian's volatile `-SNAPSHOT-<git-sha>` build id from the emitted
  // API-version JSDoc, so regeneration is deterministic across their deploys.
  normalizeVersion: true,
});
