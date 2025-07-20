# @narthia/test-new-client

A production-ready TypeScript Jira API client with dual ESM/CJS support, designed for both standard Jira REST API and Atlassian Forge applications.

## Features

- 🚀 **TypeScript First**: Full TypeScript support with comprehensive type definitions
- 🔄 **Dual Client Support**: Works with both standard Jira REST API and Atlassian Forge
- 📦 **Modern Packaging**: ESM and CommonJS dual support
- 🛡️ **Type Safe**: Fully typed API responses and requests
- ⚡ **Zero Dependencies**: No runtime dependencies for standard Jira REST API usage. `@forge/api` is an optional peer dependency only needed for Forge apps

## Installation

```bash
npm install @narthia/test-new-client
```

## Quick Start

### Standard Jira REST API Client

```typescript
import { createJiraClient } from "@narthia/test-new-client";

const client = createJiraClient({
  type: "default",
  auth: {
    email: "your-email@example.com",
    apiToken: "your-api-token",
    baseUrl: "https://your-domain.atlassian.net",
  },
});

// Get an issue
const issue = await client.issue.get({
  pathParams: { issueKeyOrId: "PROJ-123" },
  queryParams: { fields: "summary,description,status" },
});

if (issue.success) {
  console.log(issue.data.fields.summary);
}
```

### Atlassian Forge Client

```typescript
import { createJiraClient } from "@narthia/test-new-client";
import api from "@forge/api";

const client = createJiraClient({
  type: "forge",
  auth: { api },
});

// Get an issue in Forge context
const issue = await client.issue.get({
  pathParams: { issueKeyOrId: "PROJ-123" },
  opts: { as: "app" },
});

if (issue.success) {
  console.log(issue.data.fields.summary);
}
```

## API Reference

### Currently Available Methods

The client currently supports the following Jira REST API endpoints:

#### Issues (`client.issue`)

- `get` - Get issue details
- `create` - Create a new issue
- `edit` - Edit an existing issue
- `delete` - Delete an issue
- `search` - Search issues using JQL
- `count` - Get approximate count of issues
- `assign` - Assign an issue to a user
- `check` - Check if issues match JQL
- `picker` - Get issue picker suggestions

#### Projects (`client.project`)

- `get` - Get project details
- `create` - Create a new project
- `edit` - Edit an existing project
- `delete` - Delete a project

#### Statuses (`client.status`)

- `bulkGet` - Get multiple statuses
- `bulkCreate` - Create multiple statuses
- `bulkEdit` - Edit multiple statuses
- `bulkDelete` - Delete multiple statuses

#### Issue Types (`client.issueType`)

- `get` - Get issue type details
- `create` - Create a new issue type
- `edit` - Edit an existing issue type
- `delete` - Delete an issue type

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

- `Issue` - Complete issue object with all fields
- `User` - User information
- `Project` - Project information
- `Status` - Status information
- `IssueType` - Issue type information
- And more...

### Roadmap

We are actively expanding the client to cover the entire Jira Cloud REST API. More endpoints and services will be added in future releases, including:

- Comments and worklogs
- Attachments and avatars
- Users and groups
- Permissions and security
- Workflows and transitions
- And much more...

Stay tuned for regular updates as we continue to build out the complete Jira API client!

## Error Handling

The client provides robust error handling with typed responses:

```typescript
const issue = await client.issue.get({
  pathParams: { issueKeyOrId: "PROJ-123" },
});

if (issue.success) {
  // Handle successful response
  console.log(issue.data.fields.summary);
} else {
  // Handle error
  console.error("Error:", issue.error);
  console.log("Status:", issue.status);
}
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## Support

- 📧 Email: jeevanreddy1999@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/narthia/test-jira-client/issues)
- 📖 Documentation: [GitHub Repository](https://github.com/narthia/test-jira-client)
