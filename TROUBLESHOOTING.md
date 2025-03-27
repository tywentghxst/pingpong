# Troubleshooting Guide for Ping Pong Game

This guide addresses common issues that might occur when building or installing the Ping Pong Game APK.

## Build Issues

### npm install exited with non-zero code: 1

This error indicates a problem with dependency installation. Try these solutions:

1. **Fix dependency conflicts**:
   ```bash
   cd PingPongGame
   npm install --legacy-peer-deps
   ```

2. **Clear npm cache**:
   ```bash
   npm cache clean --force
   npm install
   ```

3. **Check node version**:
   ```bash
   node -v
   ```
   If you're using a very new or old version, try using Node.js v16-18 which works well with Expo.

4. **Update package.json**:
   If specific dependencies are causing problems, update the package.json with compatible versions. The current compatible configuration is:

   ```json
   "dependencies": {
     "@react-native-async-storage/async-storage": "1.18.2",
     "eas-cli": "^5.0.0",
     "expo": "~49.0.0",
     "expo-dev-client": "~2.4.0",
     "expo-status-bar": "~1.6.0",
     "matter-js": "^0.19.0",
     "react": "18.2.0",
     "react-native": "0.72.6",
     "react-native-game-engine": "^1.2.0"
   }
   ```

### EAS Build Errors

1. **Authentication issues**:
   - Make sure you're logged in: `eas login`
   - Check your Expo account status

2. **Missing build credentials**:
   ```bash
   eas credentials
   ```
   Then follow the prompts to set up your Android credentials.

3. **Build configuration errors**:
   - Ensure your eas.json is valid
   - Try reconfiguring with: `eas build:configure`

## Local Build Issues

If you're building locally without EAS:

1. **Android SDK not found**:
   - Install Android Studio
   - Set ANDROID_HOME environment variable
   - Install necessary SDKs via Android Studio's SDK Manager

2. **Gradle errors**:
   - Run `./gradlew --stacktrace assembleRelease` for more error details
   - Check for JDK compatibility (JDK 11 recommended)

3. **Keystore issues**:
   ```bash
   keytool -genkey -v -keystore android/app/debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000
   ```
   Use 'android' as the password when prompted

## Installation Issues

1. **App not installed error**:
   - Check your Android version compatibility (minimum Android 6.0)
   - Ensure you have enough storage space
   - Try uninstalling any previous version of the app

2. **Unknown sources not enabling**:
   - On newer Android (8+), you need to enable unknown sources per app
   - Go to Settings → Apps → Special access → Install unknown apps

3. **TV installation failures**:
   - Try using X-plore File Manager or similar
   - Some TVs require developer mode to be enabled first
   - Check TV's Android version (minimum 6.0 recommended)

## Running Issues

1. **Game crashes on startup**:
   - Check logcat for error details: `adb logcat`
   - Try reinstalling the app
   - Verify device compatibility

2. **Performance issues**:
   - Close other apps running in background
   - Restart your device
   - Check if your device meets minimum specs

## Getting More Help

If these solutions don't resolve your issue:

1. Create an issue on the GitHub repository
2. Include detailed steps to reproduce the issue
3. Share error logs and device information
4. Try the alternative build method (EAS vs Local)
