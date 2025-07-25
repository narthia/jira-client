# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | :white_check_mark: |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

**Note**: We recommend always using the latest version for the best security and feature support.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

**Email**: jeevanreddy1999@gmail.com  
**GitHub Issues**: [Create a security issue](https://github.com/narthia/jira-client/issues/new?template=security.md)

### What to Include

When reporting a vulnerability, please include:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if applicable)

### Response Timeline

We will:

- Acknowledge receipt within 48 hours
- Provide a timeline for investigation and resolution
- Keep you informed of progress
- Credit you in the security advisory (if desired)
- Release a patch as quickly as possible

## Security Features

This package is designed with security in mind:

- **Secure Authentication**: Uses industry-standard API token authentication
- **HTTPS Only**: All network requests use secure HTTPS connections
- **No Code Execution**: Does not use `eval()`, `Function()`, or other code execution methods
- **Immutable Configuration**: Configuration objects are frozen to prevent runtime modification

## Network Access

This package makes network requests only to:

- Your configured Jira instance (HTTPS only)
- Atlassian Forge API (when used in Forge applications)

All network access is for legitimate API communication with Jira services. No data is sent to third-party services.

## Security Best Practices for Users

When using this package:

1. **Secure API Tokens**: Store Jira API tokens securely using environment variables or secure credential management
2. **HTTPS Only**: Always use HTTPS URLs for your Jira baseUrl
3. **Principle of Least Privilege**: Use API tokens with minimal required permissions
4. **Regular Updates**: Keep the package updated to the latest version
5. **Token Rotation**: Regularly rotate your Jira API tokens

## Dependencies

- **Runtime Dependencies**: None (for standard usage)
- **Peer Dependencies**: `@forge/api` (optional, only for Forge applications)
- **Dev Dependencies**: All development dependencies are regularly audited for vulnerabilities

## Audit Information

This package is regularly audited for security vulnerabilities using:

- npm audit
- Manual security reviews

## Security Disclosures

Security vulnerabilities will be disclosed through:

- Package release notes
- Direct communication to affected users (for critical issues)

## Compliance

This package is designed to comply with:

- Node.js security best practices
- TypeScript security recommendations
