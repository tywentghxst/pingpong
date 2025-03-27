# Quick Installation Guide

## Setting Up Prerequisites

1. **Install Node.js and npm**:
   - Download and install from [nodejs.org](https://nodejs.org/)
   - Verify installation with `node -v` and `npm -v`

2. **Install Expo CLI and EAS CLI**:
   ```bash
   npm install -g expo-cli
   npm install -g eas-cli
   ```

3. **Create an Expo Account**:
   - Sign up at [expo.dev](https://expo.dev/signup)
   - Remember your username and password

## Building the APK

1. **Navigate to the project directory**:
   ```bash
   cd PingPongGame
   ```

2. **Log in to your Expo account**:
   ```bash
   npx eas-cli login
   ```
   Enter your Expo username and password when prompted.

3. **Start the build**:
   ```bash
   npm run build:android
   ```
   This command will:
   - Upload your project to Expo's build service
   - Start the Android build process
   - Provide a link to track the build progress

4. **Wait for the build to complete**:
   - This typically takes 5-10 minutes
   - When complete, you'll receive a download link for your APK

## Installing on Your Android Device

1. **Download the APK** from the link provided after the build completes

2. **Enable installation from unknown sources**:
   - Go to Settings > Security (or Privacy)
   - Toggle on "Install from Unknown Sources" or "Install Unknown Apps"
   - On newer Android versions, you may need to enable this per app (for your browser)

3. **Install the APK**:
   - Open the downloaded APK file
   - Tap "Install" when prompted
   - Wait for installation to complete
   - Tap "Open" to launch the game

## For Android TV Installation

1. **Transfer the APK to a USB drive**

2. **Connect the USB drive to your Android TV**

3. **Use a file explorer app** on your TV to navigate to the APK file

4. **Install the APK** by selecting it and following the on-screen instructions

Alternatively, use apps like "Send Files to TV" to transfer the APK wirelessly from your phone to your TV.

## Troubleshooting

- If the build fails, check the error logs and ensure all dependencies are installed
- If installation fails, make sure "Install from Unknown Sources" is enabled
- For TV installation issues, try installing a file explorer app from the Play Store first
