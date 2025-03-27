# Using GitHub with Expo Build

This guide will help you configure your GitHub repository to work correctly with Expo's build service.

## Prerequisites

1. Your GitHub repository is connected to your Expo project
2. You have the correct permissions on both GitHub and Expo

## Configuration Steps

### 1. Ensure app.json is correctly configured

Make sure your `app.json` has:
- The correct `slug` that matches your Expo project
- The correct `owner` field
- The correct `projectId` from Expo

```json
{
  "expo": {
    "name": "Ping Pong Game",
    "slug": "pingpod",
    "owner": "youngtoaster",
    "version": "1.0.0",
    ...
    "extra": {
      "eas": {
        "projectId": "26879c02-27db-45ae-ad5c-da4356716044"
      }
    }
  }
}
```

### 2. Ensure eas.json has the correct build profiles

```json
{
  "cli": {
    "version": "16.1.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 3. GitHub Actions Setup

If you're using GitHub Actions, make sure your workflow file includes:

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 🏗 Checkout code
        uses: actions/checkout@v3

      - name: 🏗 Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: npm

      - name: 🏗 Install dependencies
        run: npm ci

      - name: 🏗 Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: 📱 Build Android APK
        run: npx eas-cli build -p android --profile production --non-interactive
```

### 4. Expo Token in GitHub Secrets

Make sure you've added your Expo token to GitHub secrets:

1. Generate an Expo access token: https://expo.dev/accounts/[your-username]/settings/access-tokens
2. Go to your GitHub repository → Settings → Secrets → Actions
3. Add a new secret named `EXPO_TOKEN` with your access token

### 5. Repository Connection in Expo Dashboard

Verify that your repository is correctly connected in the Expo dashboard:

1. Go to https://expo.dev/accounts/[your-username]/projects/[your-project]
2. Click on "Settings"
3. Under "GitHub Repository", make sure it's pointing to the correct repo

## Common Issues & Solutions

### Wrong slug or projectId

If you see an error like:
```
Slug for project identified by "extra.eas.projectId" (pingpod) does not match the "slug" field (ping-pong-game)
```

Make sure the slug in app.json matches what's in your Expo dashboard.

### Authentication Issues

Make sure:
1. Your Expo token is valid and has sufficient permissions
2. The token is correctly stored in GitHub secrets
3. The owner field in app.json matches your Expo username

### Build Configuration Issues

If builds fail with configuration errors:
1. Verify the EAS CLI version in your actions workflow matches what's in eas.json
2. Make sure all required fields are present in app.json and eas.json
3. Verify that your project's slug and ID are consistent across all config files

## Need More Help?

If you continue to have issues:
1. Check the build logs in Expo dashboard for detailed error messages
2. Verify your GitHub Actions logs for any authentication or configuration issues
3. Make sure your repository has all the necessary files and dependencies
