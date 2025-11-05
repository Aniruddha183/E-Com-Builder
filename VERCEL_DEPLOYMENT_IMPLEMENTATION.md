# Vercel Deployment Implementation Guide

This document explains how to implement actual Vercel deployment for the Store Builder.

## Current State

The current implementation simulates Vercel deployment. To implement actual deployment, you need to:

## Implementation Steps

### 1. Install Required Dependencies

```bash
npm install @vercel/client
```

### 2. Set Up Vercel API Integration

Update `utils/deployService.js` with actual Vercel API calls:

```javascript
import { createDeployment } from '@vercel/client';

static async deployToVercel(storeConfig, vercelToken) {
  try {
    // Generate the store files
    const files = this.generateStoreApp(storeConfig);

    // Create a temporary directory
    const tempDir = await FileUtils.createTempDirectory();

    try {
      // Write files to the temporary directory
      await FileUtils.writeFilesToDirectory(tempDir, files);

      // Create a zip file of the store
      const zipFile = await this.createZipFile(tempDir);

      // Deploy to Vercel using the API
      const deployment = await createDeployment({
        token: vercelToken,
        name: storeConfig.customization.business.name.toLowerCase().replace(/\s+/g, '-'),
        files: zipFile,
      });

      // Clean up the temporary directory
      await FileUtils.removeDirectory(tempDir);

      return {
        success: true,
        url: deployment.url,
        message: "Store deployed successfully to Vercel!"
      };
    } catch (error) {
      // Clean up the temporary directory even if there's an error
      await FileUtils.removeDirectory(tempDir);
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      message: "Deployment failed: " + error.message
    };
  }
}
```

### 3. Alternative Approach: GitHub Integration

For a more robust solution, consider integrating with GitHub:

1. Create a GitHub repository for each store
2. Push the generated code to the repository
3. Use Vercel's GitHub integration for automatic deployments

```javascript
static async deployToVercelViaGitHub(storeConfig, githubToken, vercelToken) {
  try {
    // Generate the store files
    const files = this.generateStoreApp(storeConfig);

    // Create GitHub repository
    const repo = await this.createGitHubRepo(
      storeConfig.customization.business.name,
      githubToken
    );

    // Push files to repository
    await this.pushToGitHubRepo(files, repo, githubToken);

    // Connect repository to Vercel
    const deployment = await this.connectToVercel(repo, vercelToken);

    return {
      success: true,
      url: deployment.url,
      message: "Store deployed successfully to Vercel!"
    };
  } catch (error) {
    return {
      success: false,
      message: "Deployment failed: " + error.message
    };
  }
}
```

### 4. Environment Variables

Make sure to handle environment variables properly:

```javascript
static generateEnvFile(customization) {
  return `# Environment Variables
NEXT_PUBLIC_PRIMARY_COLOR=${customization.colors.primary}
NEXT_PUBLIC_SECONDARY_COLOR=${customization.colors.secondary}
NEXT_PUBLIC_ACCENT_COLOR=${customization.colors.accent}
NEXT_PUBLIC_FONT_FAMILY=${customization.typography.fontFamily}
NEXT_PUBLIC_BUSINESS_NAME=${customization.business.name}
NEXT_PUBLIC_BUSINESS_TAGLINE=${customization.business.tagline}
`;
}
```

## Security Considerations

1. Never expose Vercel tokens in client-side code
2. Use API routes to handle deployment requests
3. Implement proper authentication and authorization
4. Validate all inputs to prevent injection attacks

## Error Handling

Implement comprehensive error handling:

```javascript
static async deployToVercel(storeConfig, vercelToken) {
  try {
    // Validate inputs
    if (!storeConfig || !vercelToken) {
      throw new Error('Missing required parameters');
    }

    // Validate token
    if (!await this.validateVercelToken(vercelToken)) {
      throw new Error('Invalid Vercel token');
    }

    // Generate and deploy
    const files = this.generateStoreApp(storeConfig);
    const deployment = await this.performDeployment(files, vercelToken);

    return {
      success: true,
      url: deployment.url,
      message: "Store deployed successfully!"
    };
  } catch (error) {
    // Log error for debugging
    console.error('Deployment error:', error);

    // Return user-friendly error message
    return {
      success: false,
      message: this.getUserFriendlyErrorMessage(error)
    };
  }
}
```

## Testing

1. Test with various store configurations
2. Test error scenarios (invalid tokens, network issues)
3. Test cleanup procedures
4. Verify deployed stores work correctly

## Monitoring

1. Implement deployment status tracking
2. Set up alerts for failed deployments
3. Monitor resource usage
4. Log deployment metrics

## Production Considerations

1. Rate limiting for API calls
2. Caching for generated files
3. Backup and recovery procedures
4. Scalability planning
5. Cost optimization
