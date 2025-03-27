#!/bin/bash

# Simple Production Build Script for Ping Pong Game APK

# Make sure we're in the right directory
cd "$(dirname "$0")"

echo "Building Ping Pong Game APK..."

# Login to Expo (if not already logged in)
echo "Please ensure you are logged in to your Expo account"
eas whoami || eas login

# Make sure we're using the correct dependencies
echo "Installing dependencies..."
npm install

# Run the build command that matches what's being used in your environment
echo "Starting APK build..."
npx -y eas-cli build:internal --platform android --profile production

echo "Build process initiated. You will receive a URL to monitor the build progress."
echo "When the build is complete, you can download the APK from the provided URL."
