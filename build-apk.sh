#!/bin/bash

# Build Script for Ping Pong Game APK

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "EAS CLI is not installed. Installing now..."
    npm install -g eas-cli
fi

# Login to Expo
echo "Please login to your Expo account"
eas login

# Make sure we're using the correct Expo SDK version
echo "Verifying project dependencies..."
npm install

# Configure the build
echo "Setting up build configuration..."
eas build:configure

# Start the build process
echo "Starting APK build..."
eas build -p android --profile preview

echo "Build process initiated. You will receive a URL to monitor the build progress."
echo "When the build is complete, you can download the APK from the provided URL."
