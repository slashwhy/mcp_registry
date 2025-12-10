# Custom MCP Registry

This repository hosts the custom Model Context Protocol (MCP) registry for our GitHub Organization. It controls which MCP tools are available to GitHub Copilot users.

## Registry URL

**`https://slashwhy.github.io/mcp_registry/registry.json`**

(This URL will be active once you enable GitHub Pages)

## Available Tools

- **Atlassian**: Integration for Jira, Confluence.
- **Figma**: Integration for Figma designs.

## Setup Instructions

### 1. Enable GitHub Pages

To serve this registry to Copilot, you must enable GitHub Pages for this repository.

1. Go to **Settings** > **Pages**.
2. Under **Build and deployment**, select **Source** as `Deploy from a branch`.
3. Select `main` as the branch and `/ (root)` as the folder.
4. Click **Save**.
5. Wait for the deployment to finish. The page URL will be displayed at the top. Append `/registry.json` to this URL to get your **Registry URL**.

### 2. Configure GitHub Copilot Policy

1. Go to your **GitHub Organization Settings**.
2. Navigate to **Copilot** > **Policies**.
3. Find the **Model Context Protocol (MCP)** section.
4. Select **Registry only**.
5. Paste your **Registry URL** (ending in `registry.json`) into the "MCP Registry URL" field.
6. Click **Save**.

## Adding New Tools

1. Edit `registry.json`.
2. Add a new entry to the `servers` array:

    ```json
    {
      "name": "Tool Name",
      "version": "1.0.0",
      "description": "Tool Description",
      "url": "https://url-to-mcp-server/sse",
      "vendor": "Vendor Name"
    }
    ```

3. Run validation: `node validate_registry.js`
4. Commit and push changes. The registry will automatically update via GitHub Pages.

## User Usage Guide

Once the registry is configured, users (developers) will need to allow and authenticate the specific tools.

### Atlassian MCP Usage

- **Requirement**: User must have an Atlassian account with access to the organization's Jira/Confluence.
- **First Run**:
    1. When Copilot tries to use the Atlassian tool (e.g., "Summarize this Jira issue"), it will prompt for authentication.
    2. The user must approve the connection (OAuth flow) in their browser.
    3. Tokens are stored locally by the MCP client (VS Code/Copilot).

### Figma MCP Usage

- **Requirement**: User must have a Figma account.
- **First Run**:
    1. Similar to Atlassian, using a Figma-related command (e.g., "Check the design specs") will trigger an auth prompt.
    2. User logs in to Figma and authorizes the "GitHub Copilot" (or generic MCP) application.
    3. Select the specific Figma Team/Project if prompted.
