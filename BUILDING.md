# Building the Ping Pong Game APK

This document provides detailed instructions for building the Ping Pong Game APK for Android phones and TV.

## Prerequisites

- Node.js and npm installed
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- An Expo account (create one at https://expo.dev/signup)

## Building the APK

### 1. Login to Expo

```bash
npx eas-cli login
```

### 2. Configure your project

The `eas.json` file is already configured for building an APK with the "preview" profile.

### 3. Build the APK

```bash
cd PingPongGame
npm run build:android
```

This will:
1. Start the build process
2. Upload your code to Expo's build service
3. Build the APK
4. Provide a URL to download the APK when complete

## Installing on Android Devices

### For Phones:
1. Download the APK from the link provided after the build completes
2. Enable "Install from Unknown Sources" in your device settings
3. Open the APK file to install

### For Android TV:
1. Download the APK to a USB drive
2. Connect the USB drive to your Android TV
3. Use a file explorer app on your TV to navigate to the APK
4. Install the APK

Alternatively, you can use apps like "Send Files to TV" to transfer the APK from your phone to your TV.

## Troubleshooting

If you encounter any issues during the build process:

1. Ensure you're logged in to your Expo account
2. Check that your `eas.json` file is correctly configured
3. Verify all dependencies are installed with `npm install`
4. Check Expo build logs for specific error messages

## Local Testing

Before building the APK, you can test the app locally:

```bash
npm start
```

Then scan the QR code with the Expo Go app on your Android device.
