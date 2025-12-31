# Deployment Guide for FreshCart

This guide explains how to deploy FreshCart to various platforms and configure the payment system correctly.

## Prerequisites

Before deploying, ensure:
1. All code changes are committed to your repository
2. The application builds successfully locally (`npm run build`)
3. You have an account on your chosen deployment platform

## Deployment Platforms

### Option 1: Vercel (Recommended)

Vercel is the easiest platform for deploying Vite applications.

1. **Install Vercel CLI (optional)**
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add Environment Variable:
     - Name: `VITE_LIVE_DEMO_URL`
     - Value: Your Vercel URL (e.g., `https://freshcart-main.vercel.app`)
   - Click "Deploy"

3. **Deploy via CLI**
   ```bash
   vercel
   # Follow the prompts
   # After deployment, set the environment variable:
   vercel env add VITE_LIVE_DEMO_URL
   # Enter your Vercel URL when prompted
   # Redeploy with the new environment variable:
   vercel --prod
   ```

4. **Update Environment Variable After First Deploy**
   - After the first deployment, note your Vercel URL
   - Go to Project Settings > Environment Variables
   - Update `VITE_LIVE_DEMO_URL` with your actual Vercel URL
   - Trigger a new deployment

### Option 2: GitHub Pages

GitHub Pages is free but requires a few extra configuration steps for SPAs.

1. **Update vite.config.js**
   ```javascript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   
   export default defineConfig({
     plugins: [react()],
     base: '/FreshCart-main/', // Replace with your repo name
     css: {
       postcss: "./postcss.config.js",
     },
   });
   ```

2. **Add deployment script to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Create .env for production**
   ```
   VITE_LIVE_DEMO_URL=https://yourusername.github.io/FreshCart-main
   ```

5. **Deploy**
   ```bash
   npm run deploy
   ```

6. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages section
   - Set source to `gh-pages` branch
   - Your site will be available at `https://yourusername.github.io/FreshCart-main`

### Option 3: Netlify

1. **Deploy via Netlify Dashboard**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add Environment Variable:
     - Key: `VITE_LIVE_DEMO_URL`
     - Value: Your Netlify URL (e.g., `https://freshcart.netlify.app`)
   - Click "Deploy site"

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Configure Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add `VITE_LIVE_DEMO_URL` with your Netlify URL
   - Trigger a new deployment

## Post-Deployment Configuration

After deploying to any platform:

1. **Update Environment Variable**
   - Note your deployed application URL
   - Update the `VITE_LIVE_DEMO_URL` environment variable with this URL
   - Trigger a new deployment to apply changes

2. **Test Payment Flow**
   - Add items to cart
   - Proceed to payment
   - Complete the payment process
   - Verify redirect to `/allorders` page works correctly

## Troubleshooting

### Payment redirect not working
- Ensure `VITE_LIVE_DEMO_URL` is set correctly without trailing slash
- Verify the environment variable is available during build
- Check browser console for errors
- Ensure the `/allorders` route is accessible

### Build fails
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check for TypeScript/ESLint errors: `npm run lint`

### Environment variable not loading
- For Vite, environment variables must be prefixed with `VITE_`
- Ensure `.env` file is in the root directory
- Redeploy after updating environment variables
- For local testing, create a `.env` file from `.env.example`

## Security Notes

1. Never commit `.env` files to version control
2. Keep your API tokens secure
3. Use environment variables for all sensitive configuration
4. Regularly update dependencies to patch security vulnerabilities

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/Aliaboelnasr/FreshCart-main/issues)
- Review the deployment platform's documentation
- Verify environment variables are set correctly
