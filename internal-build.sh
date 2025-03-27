#!/bin/bash

# Internal Build Script for Ping Pong Game APK
# This uses the exact syntax from the error message

# Make sure we're in the right directory
cd "$(dirname "$0")"

echo "Building Ping Pong Game APK using internal build..."

# Login to Expo (if not already logged in)
echo "Please ensure you are logged in to your Expo account"
eas whoami || eas login

# Make sure we're using the correct dependencies
echo "Installing dependencies..."
npm install

# Run the exact command from the error message
echo "Starting APK build using internal build command..."
npx -y eas-cli@latest-eas-build build:internal --platform android --profile production

echo "Build process initiated. You will receive a URL to monitor the build progress."
echo "When the build is complete, you can download the APK from the provided URL."
