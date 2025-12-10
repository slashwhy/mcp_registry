# Custom MCP Registry

This repository hosts a custom **Model Context Protocol (MCP)** registry for use with GitHub Copilot in our organization.

## 🔗 Registry URL

**`https://slashwhy.github.io/mcp_registry`**

> **Note:** Do not append anything to this URL. GitHub Copilot automatically appends `/v0.1/servers` to find the registry endpoint.

---

## 🛠️ Available Tools

Currently, this registry includes the following official MCP servers:

| Tool | Description | Vendor | Tags |
| :--- | :--- | :--- | :--- |
| **Atlassian** | Integration for Jira, Confluence, and Compass. | Atlassian | `productivity`, `management` |
| **Figma** | Integration for Figma designs. | Figma | `design`, `ui` |

---

## ⚙️ Setup Instructions

### 1. Enable GitHub Pages

To serve this registry to Copilot, you must enable GitHub Pages for this repository:

1. Go to **Settings** > **Pages**.
2. Under **Build and deployment**, select **Source** as `Deploy from a branch`.
3. Select `main` as the branch and `/ (root)` as the folder.
4. Click **Save**.
5. Wait for the deployment to finish.

### 2. Configure GitHub Copilot Policy

1. Go to your **GitHub Organization Settings**.
2. Navigate to **Copilot** > **Policies**.
3. Find the **Model Context Protocol (MCP)** section.
4. Select **Registry only**.
5. Paste the Registry URL: `https://slashwhy.github.io/mcp_registry`
6. Click **Save**.

---

## ✅ Verification in VS Code

Once configured, verify that Copilot has access to the tools:

1.  Open **VS Code**.
2.  Open **GitHub Copilot Chat**.
3.  Click the **Attach Context** (paperclip) icon or look for the **Tools** icon.
4.  You should see **Atlassian** and **Figma** listed as available tool groups.
5.  Alternatively, type `/help` or ask Copilot: *"What tools do you have access to?"*

---

## 📖 User Usage Guide

### Authenticating Atlassian (Jira/Confluence)
1.  In VS Code, try to use a Jira command (e.g., "Summarize this Jira ticket").
2.  The Atlassian MCP will prompt you to authenticate.
3.  Follow the flow to log in to your Atlassian account in the browser.
4.  Once authorized, Copilot will save the credentials locally.

### Authenticating Figma
1.  Ask Copilot a question about a design (e.g., "What colors are in this Figma file?").
2.  You will be prompted to authenticate with Figma.
3.  Log in and authorize the MCP application.
4.  You may need to associate a specific Figma Team or Project.

---

## ➕ Adding New Tools

To add a new tool to this registry:

1.  **Edit `v0.1/servers`**: Add the new server object to the JSON array.
    ```json
    {
      "name": "NewTool",
      "version": "1.0.0",
      "transport": { "type": "sse", "url": "..." }
    }
    ```
2.  **Run Validation**:
    ```bash
    node validate_registry.js
    ```
3.  **Commit and Push**:
    ```bash
    git add .
    git commit -m "Add NewTool"
    git push
    ```
4.  **Verify**: The GitHub Action will run to ensure the registry is valid.
