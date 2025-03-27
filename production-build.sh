#!/bin/bash

# Production Build Script for Ping Pong Game APK

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "EAS CLI is not installed. Installing now..."
    npm install -g eas-cli
fi

# Login to Expo (if not already logged in)
echo "Please ensure you are logged in to your Expo account"
eas whoami || eas login

# Make sure we're using the correct dependencies
echo "Verifying project dependencies..."
npm install

# Configure the build if needed
echo "Setting up build configuration..."
# Uncomment the next line if you need to reconfigure
# eas build:configure

# Start the production build process
echo "Starting production APK build..."
npm run build:android:prod

echo "Build process initiated. You will receive a URL to monitor the build progress."
echo "When the build is complete, you can download the APK from the provided URL."
