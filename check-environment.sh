#!/bin/bash

# Environment Check Script for Ping Pong Game APK Build

# Print header
echo "===================================================="
echo "Environment Diagnostics for Ping Pong Game APK Build"
echo "===================================================="

# Check Node.js version
echo -n "Node.js version: "
if command -v node &> /dev/null; then
    node -v
else
    echo "Not installed"
fi

# Check npm version
echo -n "npm version: "
if command -v npm &> /dev/null; then
    npm -v
else
    echo "Not installed"
fi

# Check EAS CLI version
echo -n "EAS CLI version: "
if command -v eas &> /dev/null; then
    eas --version
else
    echo "Not installed"
fi

# Check Expo CLI version
echo -n "Expo CLI version: "
if command -v expo &> /dev/null; then
    expo --version
else
    echo "Not installed"
fi

# Check if logged in to Expo
echo -n "Expo login status: "
if command -v eas &> /dev/null; then
    eas whoami 2>/dev/null || echo "Not logged in"
else
    echo "EAS CLI not installed"
fi

# Print eas.json configuration
echo -e "\nCurrent eas.json configuration:"
cat eas.json

echo -e "\nCurrent app.json projectId:"
grep -A 3 "projectId" app.json

echo -e "\n===================================================="
echo "Diagnostic complete. Please share this output if asking for help."
echo "===================================================="
