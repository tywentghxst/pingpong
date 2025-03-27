#!/bin/bash

# Local Build Script for Ping Pong Game APK
# This script generates an APK without using Expo's build service
# Requires Android SDK and NDK to be installed

# Check if necessary tools are installed
if ! command -v npx &> /dev/null; then
    echo "Error: npx is not installed. Please install Node.js and npm."
    exit 1
fi

echo "Preparing for local build..."

# Install dev dependencies
npm install

# Create the Expo prebuild files for Android
echo "Generating Android project files..."
npx expo prebuild -p android --clean

# Navigate to the Android directory
cd android

# Check if Gradle is available
if [ -f "./gradlew" ]; then
    echo "Building APK using Gradle..."

    # Build the APK using Gradle
    ./gradlew assembleRelease

    # Check if build was successful
    if [ $? -eq 0 ]; then
        APK_PATH="./app/build/outputs/apk/release/app-release.apk"

        if [ -f "$APK_PATH" ]; then
            # Copy the APK to the project root for easier access
            cp $APK_PATH ../PingPongGame.apk
            echo "Build successful! APK saved as PingPongGame.apk"
            echo "You can find the APK in: $(pwd)/../PingPongGame.apk"
        else
            echo "Error: APK file not found at expected location."
        fi
    else
        echo "Error: Build failed."
    fi
else
    echo "Error: Gradle wrapper not found. Make sure you have run 'npx expo prebuild' successfully."
fi
