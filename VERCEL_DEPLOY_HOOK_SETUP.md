# Vercel Deploy Hook Setup Guide

This guide explains how to set up a Vercel Deploy Hook for automatic deployments.

## What is a Deploy Hook?

A Deploy Hook is a unique URL provided by Vercel that triggers a new deployment when called via HTTP POST request. It's the simplest way to integrate external services with Vercel deployments.

## Setting Up a Deploy Hook

### Step 1: Access Your Vercel Project

1. Go to [vercel.com](https://vercel.com) and log in to your account
2. Navigate to the project you want to deploy (or create a new one)
3. Click on the project to open its dashboard

### Step 2: Create the Deploy Hook

1. In your project dashboard, click on **Settings**
2. In the left sidebar, click on **Git**
3. Scroll down to the **Deploy Hooks** section
4. Click **Create Hook**
5. Give your hook a name (e.g., "Auto Publish")
6. Select the branch to deploy from (usually `main`)
7. Click **Create**

### Step 3: Copy the Deploy Hook URL

After creating the hook, Vercel will provide you with a unique URL that looks like this:

```
https://api.vercel.com/v1/integrations/deploy/prj_xxxxxxxxxxx/xxxxxxxxxxxxx
```

Copy this URL - you'll need it for the deployment process.

## Using the Deploy Hook

To trigger a deployment, simply send a POST request to the Deploy Hook URL:

```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_xxxxxxxxxxx/xxxxxxxxxxxxx
```

Or in JavaScript:

```javascript
fetch(
  "https://api.vercel.com/v1/integrations/deploy/prj_xxxxxxxxxxx/xxxxxxxxxxxxx",
  {
    method: "POST",
  }
);
```

## How It Works with GitHub

When you use this deploy hook with GitHub:

1. Your Store Builder generates the Next.js project files
2. Files are uploaded to a GitHub repository
3. The Deploy Hook is triggered
4. Vercel automatically pulls the latest code from GitHub
5. Vercel builds and deploys the Next.js application
6. Your store goes live at `your-store-name.vercel.app`

## Security Considerations

- Keep your Deploy Hook URL secret - anyone with the URL can trigger deployments
- Deploy Hooks are tied to specific projects and branches
- You can delete and recreate Deploy Hooks if needed
- For production environments, consider using Vercel's Git integration instead

## Troubleshooting

### Common Issues:

1. **Deployment not triggering**

   - Verify the Deploy Hook URL is correct
   - Check that GitHub repository has the correct files
   - Ensure Vercel project is properly configured

2. **Build failures**

   - Check the build logs in your Vercel dashboard
   - Verify all required dependencies are in package.json
   - Ensure there are no syntax errors in your code

3. **Permission errors**
   - Verify GitHub token has the correct permissions
   - Check that the repository is accessible
   - Confirm Vercel has access to the GitHub repository

## Best Practices

1. Use descriptive names for your Deploy Hooks
2. Keep a record of your Deploy Hook URLs
3. Test deployments with a staging environment first
4. Monitor deployment logs for errors
5. Set up notifications for failed deployments
