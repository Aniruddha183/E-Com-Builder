# Store Deployment Guide

This guide explains how to deploy stores created with the Store Builder.

## How Deployment Works

The Store Builder allows you to deploy your customized stores in two ways:

1. **Download Package** - Download a complete Next.js application that you can deploy manually
2. **Deploy to Vercel** - One-click deployment to Vercel (requires a free Vercel account)

## Deployment Methods

### 1. Download Package (Recommended for beginners)

When you click "Download Package", you'll get a ZIP file containing:

- A complete Next.js application
- All your customizations (colors, fonts, branding)
- Deployment instructions in README.md

#### Steps:

1. Click "Download Package" in the deployment modal
2. Extract the downloaded ZIP file
3. Install dependencies: `npm install`
4. Run locally to test: `npm run dev`
5. Build for production: `npm run build`
6. Deploy to any static hosting service

### 2. Deploy to Vercel (Recommended for ease of use)

Vercel is the easiest way to deploy your store with automatic SSL and continuous deployment.

#### Prerequisites:

- A free account at [vercel.com](https://vercel.com)
- A Vercel token (create one at vercel.com/account/tokens)

#### Steps:

1. Create a free Vercel account
2. Generate a token at vercel.com/account/tokens
3. Enter your token in the deployment modal
4. Click "Deploy to Vercel"
5. Visit your deployed store!

## Free Hosting Options

### Vercel (Recommended)

- **Free tier**: 100GB bandwidth, 1000+ serverless functions
- Automatic SSL certificates
- Custom domains
- Automatic deployments from Git
- Global CDN

### Netlify

- **Free tier**: 100GB bandwidth, 300 build minutes
- Automatic SSL certificates
- Custom domains
- Git integration

### GitHub Pages

- **Completely free**
- No bandwidth limits
- Requires manual deployment
- Custom domains with manual SSL setup

## Technical Details

The deployment system generates a standalone Next.js application that:

- Preserves all your custom styling
- Maintains responsive design
- Includes all necessary dependencies
- Works with static hosting providers

## Troubleshooting

### Common Issues:

1. **Deployment fails**
   - Check that all required fields are filled in the builder
   - Ensure your Vercel token is correct (if using Vercel deployment)

2. **Store looks different after deployment**
   - Clear your browser cache
   - Check that all assets are properly loaded

3. **Custom domain issues**
   - Follow your hosting provider's custom domain setup guide
   - Allow time for DNS propagation

## Support

For help with deployment:

1. Check this guide
2. Review the generated README.md in your downloaded package
3. Contact support at [your-email@example.com]
