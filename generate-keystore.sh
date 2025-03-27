#!/bin/bash

# Script to generate Android keystore for Expo builds

# Make sure we're in the right directory
cd "$(dirname "$0")"

echo "Generating Android keystore for Ping Pong Game..."

# Check if Java keytool is installed
if ! command -v keytool &> /dev/null; then
    echo "Error: keytool not found. Please install Java JDK."
    exit 1
fi

# Create credentials directory if it doesn't exist
mkdir -p ./credentials/android

# Generate Android keystore
echo "Generating keystore file..."
keytool -genkey -v -keystore ./credentials/android/pingpod.keystore -alias pingpod -keyalg RSA -keysize 2048 -validity 10000 \
  -dname "CN=youngtoaster, OU=Development, O=PingPong, L=Unknown, ST=Unknown, C=US" \
  -storepass pingpod123 -keypass pingpod123

if [ $? -eq 0 ]; then
    echo "Keystore generated successfully at: ./credentials/android/pingpod.keystore"
    echo ""
    echo "Keystore information for reference:"
    echo "- Keystore password: pingpod123"
    echo "- Key alias: pingpod"
    echo "- Key password: pingpod123"
    echo ""
    echo "Important: Keep this information secure! You'll need it to build your app."
    echo "Consider saving this information in a password manager."
    echo ""
    echo "Next steps:"
    echo "1. Upload the keystore to Expo (eas credentials)"
    echo "2. Or add these credentials to your GitHub repo secrets for use in GitHub Actions"
else
    echo "Error generating keystore."
fi
