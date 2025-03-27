# Android Keystore Setup Guide

This guide will help you set up the Android keystore and GitHub secrets required for building your app with GitHub Actions.

## Step 1: Generate the Android Keystore

Run the included script to generate a keystore:

```bash
./generate-keystore.sh
```

This will create a keystore file at `./credentials/android/pingpod.keystore` with the following credentials:
- Keystore password: pingpod123
- Key alias: pingpod
- Key password: pingpod123

⚠️ **IMPORTANT**: For a production app, you should use stronger, unique passwords.

## Step 2: Base64 Encode the Keystore File

You'll need to convert the keystore file to a base64 string to store it as a GitHub secret:

### On Linux/Mac:
```bash
base64 -i ./credentials/android/pingpod.keystore | tr -d '\n' > keystore-base64.txt
```

### On Windows (PowerShell):
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("./credentials/android/pingpod.keystore")) > keystore-base64.txt
```

The encoded keystore will be saved to `keystore-base64.txt`.

## Step 3: Create the Credentials JSON

Create a credentials.json file that looks like this:

```json
{
  "android": {
    "keystore": {
      "keystorePath": "credentials/android/pingpod.keystore",
      "keystorePassword": "pingpod123",
      "keyAlias": "pingpod",
      "keyPassword": "pingpod123"
    }
  }
}
```

## Step 4: Add GitHub Secrets

Go to your GitHub repository, then:
1. Navigate to Settings > Secrets and variables > Actions
2. Add the following secrets:

| Secret Name | Secret Value |
|-------------|--------------|
| `EXPO_TOKEN` | Your Expo access token |
| `ANDROID_KEYSTORE_BASE64` | Contents of `keystore-base64.txt` |
| `ANDROID_KEYSTORE_PASSWORD` | `pingpod123` |
| `ANDROID_KEY_ALIAS` | `pingpod` |
| `ANDROID_KEY_PASSWORD` | `pingpod123` |
| `EAS_LOCAL_CREDENTIALS_JSON` | Contents of the credentials.json file |

### How to Get Your Expo Token:
1. Go to https://expo.dev/accounts/[your-username]/settings/access-tokens
2. Click "Create" to generate a new token
3. Copy the token and add it as the `EXPO_TOKEN` secret

## Step 5: Push to GitHub

After setting up all the secrets, push your code to GitHub. The workflow will automatically build your APK.

## Verifying the Build

1. Go to the "Actions" tab in your GitHub repository
2. Click on the latest workflow run
3. Check the build logs for any errors
4. If successful, your APK will be available on your Expo project page

## Troubleshooting

If your build fails, check:

1. **GitHub Secrets**: Ensure all secrets are correctly added
2. **Keystore Format**: Make sure the keystore is properly base64 encoded without newlines
3. **Credentials JSON**: Check that the path to the keystore matches where the workflow places it
4. **Keystore Permissions**: The workflow should handle this, but ensure the keystore is accessible

For more help, check the GitHub Actions logs for specific error messages.
