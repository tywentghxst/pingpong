# Ping Pong Game

A simple ping pong game built with React Native, Expo, and Matter.js physics engine.

## Features

- Two-player gameplay on a single device
- Physics-based ball movement
- Score tracking
- Works on both phones and TV (Android)
- Simple touch controls

## How to Play

- Touch and drag on the left side of the screen to control the left paddle (Player 1)
- Touch and drag on the right side of the screen to control the right paddle (Player 2)
- Try to hit the ball past your opponent to score points
- Use the Reset button to start a new game

## Building the APK

To build the Android APK:

1. Make sure you have Node.js and npm installed
2. Install Expo CLI: `npm install -g expo-cli`
3. Install EAS CLI: `npm install -g eas-cli`
4. Clone this repository
5. Navigate to the project directory: `cd PingPongGame`
6. Install dependencies: `npm install`
7. Build the APK: `npm run build:android`

This will generate an APK that can be installed on Android phones and Android TV devices.

## Technologies Used

- React Native
- Expo
- Matter.js (physics engine)
- React Native Game Engine

## License

MIT
