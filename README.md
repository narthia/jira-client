# @narthia/jira-client

A Jira API client with dual ESM/CJS support, designed for both standard Jira REST API and Atlassian Forge applications. **This project is 100% written in TypeScript** with comprehensive type definitions and zero runtime dependencies for standard usage.

## Features

- 🚀 **TypeScript First**: Full TypeScript support with comprehensive type definitions
- 🔄 **Dual Client Support**: Works with both standard Jira REST API and Atlassian Forge
- 📦 **Modern Packaging**: ESM and CommonJS dual support
- 🛡️ **Type Safe**: Fully typed API responses and requests
- 📚 **OpenAPI Generated**: Type definitions and documentation are automatically generated from Jira's OpenAPI Schema to ensure accuracy and completeness
- ⚡ **Zero Dependencies**: No runtime dependencies for standard Jira REST API usage. `@forge/api` is an optional peer dependency required only for Forge applications

## Installation

```bash
npm install @narthia/jira-client
```

## Quick Start

### Standard Jira REST API Client

```typescript
// jiraClient.ts
import { JiraClient } from "@narthia/jira-client";

// Initialize the client once and reuse across your application
export const client = new JiraClient({
  type: "default",
  auth: {
    email: "your-email@example.com",
    apiToken: "your-api-token",
    baseUrl: "https://your-domain.atlassian.net"
  }
});

// some-file-name.ts
import { client } from "./jiraClient.ts";

const issue = await client.issues.getIssue({
  issueKeyOrId: "PROJ-123",
  fields: ["summary", "description", "status"]
});

if (issue.success) {
  console.log(issue.data.fields.summary);
}
```

### Atlassian Forge Client

```typescript
// jiraClient.ts
import { JiraClient } from "@narthia/jira-client";
import api from "@forge/api";

// Initialize the client once and reuse across your application
export const client = new JiraClient({
  type: "forge",
  auth: { api }
});

// some-file-name.ts
const issue = await client.issues.getIssue({
  issueKeyOrId: "PROJ-123",
  opts: { as: "app" } // by default its user
});

if (issue.success) {
  console.log(issue.data.fields.summary);
}
```

## Error Handling

The client provides comprehensive error handling with strongly typed responses:

```typescript
const issue = await client.issues.getIssue({
  pathParams: { issueKeyOrId: "PROJ-123" }
});

if (issue.success) {
  // Handle successful response - data is type-safe and available when success is true
  console.log(issue.data.fields.summary);
} else {
  // Handle error
  console.error("Error:", issue.error);
  console.log("Status:", issue.status);
}
```

## API Reference

### Method Parameters

All client methods accept a structured options object with the following parameters:

- **`opts`**: Additional configuration options for the request, including:
  - **`as`**: For Forge applications, requests are executed as the `"user"` by default. Set to `"app"` to execute requests with application-level permissions instead of user-level permissions.
  - **`headers`**: An object containing custom HTTP headers to include in the request. All required authentication and content-type headers are automatically managed by the client. Use this option to add additional headers or override default headers for specific requests (e.g., `{ "X-Custom-Header": "value", "Accept": "application/json" }`).

#### Example Usage

```typescript
// Get an issue with path and query parameters
const issue = await client.issues.getIssue({
  issueKeyOrId: "PROJ-123",
  fields: ["summary", "description", "status"]
});

// Use 'as' in opts for Forge-specific options
// In Atlassian Forge applications, requests are executed as the user by default.
// To execute requests with application-level permissions instead of user-level permissions,
// pass opts: { as: "app" }.
// This is particularly useful for operations requiring elevated permissions or automated processes.
const issueForge = await client.issues.getIssue({
  issueKeyOrId: "PROJ-123",
  opts: { as: "app" }
});

// Add custom headers using opts.headers
const issueWithHeaders = await client.issues.getIssue({
  pathParams: { issueKeyOrId: "PROJ-123" },
  opts: {
    headers: {
      "X-Custom-Header": "my-value"
    }
  }
});
```

### Client Configuration

#### Default Jira Config

```typescript
interface DefaultJiraConfig {
  type: "default";
  auth: {
    email: string;
    apiToken: string;
    baseUrl: string;
  };
}
```

#### Forge Jira Config

```typescript
interface ForgeJiraConfig {
  type: "forge";
  auth: {
    api: ForgeAPI;
  };
}
```

### Type Definitions

The package exports comprehensive TypeScript definitions for all Jira entities:

- `Issue` - Complete issue object with comprehensive field definitions
- `User` - User profile and account information
- `Project` - Project configuration and metadata
- `Status` - Workflow status and transition information
- `IssueType` - Issue type definitions and configurations
- And many more entity types...

### Development Roadmap

#### Completed Features

- ✅ **Jira Platform APIs** - Comprehensive implementation of core Jira platform APIs with complete TypeScript support and type safety.

#### Features Under Development

- 🔄 **Jira Software APIs** - Ongoing development of Jira Software-specific endpoints and advanced features
- 🔄 **Jira Service Management APIs** - Implementation of comprehensive service desk and ITSM functionality

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## Support

- 📧 Email: jeevanreddy1999@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/narthia/jira-client/issues)
- 📖 Documentation: [GitHub Repository](https://github.com/narthia/jira-client)
