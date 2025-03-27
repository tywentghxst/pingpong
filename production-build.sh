#!/bin/bash

# Production Build Script for Ping Pong Game APK

# Install the specific version of EAS CLI (16.1.0) if not already installed
if ! command -v eas &> /dev/null || [[ "$(eas --version)" != "16.1.0" ]]; then
    echo "Installing EAS CLI version 16.1.0..."
    npm install -g eas-cli@16.1.0
fi

# Login to Expo (if not already logged in)
echo "Please ensure you are logged in to your Expo account"
eas whoami || eas login

# Make sure we're using the correct dependencies
echo "Verifying project dependencies..."
npm install

# Run EAS init to ensure correct project configuration
echo "Running EAS init to ensure correct configuration..."
eas init --id=26879c02-27db-45ae-ad5c-da4356716044 --non-interactive

# Start the production build process
echo "Starting production APK build..."
npx eas-cli@16.1.0 build -p android --profile production

echo "Build process initiated. You will receive a URL to monitor the build progress."
echo "When the build is complete, you can download the APK from the provided URL."
