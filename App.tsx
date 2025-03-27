import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

// Game components
import Ball from './src/entities/Ball';
import Paddle from './src/entities/Paddle';
import Border from './src/entities/Border';
import Score from './src/components/Score';

// Game systems
import Physics from './src/systems/Physics';
import Restart from './src/systems/Restart';

// Utils
import { getDeviceControls, isAndroidTV } from './src/utils/PlatformDetection';

// Types
import { GameEvent, GameState } from './src/types';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// Get device-specific controls
const deviceControls = getDeviceControls();
const BALL_SIZE = deviceControls.ballSize;
const PADDLE_WIDTH = deviceControls.paddleWidth;
const PADDLE_HEIGHT = deviceControls.paddleHeight;
const BORDER_HEIGHT = 30;

export default function App() {
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    running: true,
    player1Score: 0,
    player2Score: 0,
  });

  const isTV = isAndroidTV();

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (gameEngine) {
        gameEngine.stop();
      }
    };
  }, [gameEngine]);

  const setupWorld = () => {
    // Create a new physics engine
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    // No gravity in Ping Pong
    engine.gravity.y = 0;

    // Create game entities
    const ball = Ball(world, { x: WIDTH / 2, y: HEIGHT / 2 }, BALL_SIZE, 'white');

    const paddle1 = Paddle(
      world,
      'paddle1',
      { x: PADDLE_WIDTH, y: HEIGHT / 2 },
      { width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
      '#4285F4'
    );

    const paddle2 = Paddle(
      world,
      'paddle2',
      { x: WIDTH - PADDLE_WIDTH, y: HEIGHT / 2 },
      { width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
      '#EA4335'
    );

    const topBorder = Border(
      world,
      'topBorder',
      { x: WIDTH / 2, y: BORDER_HEIGHT / 2 },
      { width: WIDTH, height: BORDER_HEIGHT },
      '#333'
    );

    const bottomBorder = Border(
      world,
      'bottomBorder',
      { x: WIDTH / 2, y: HEIGHT - BORDER_HEIGHT / 2 },
      { width: WIDTH, height: BORDER_HEIGHT },
      '#333'
    );

    // Give the ball an initial velocity
    const xDirection = Math.random() > 0.5 ? 1 : -1;
    const yDirection = Math.random() > 0.5 ? 1 : -1;

    Matter.Body.setVelocity(ball.body, {
      x: 5 * xDirection,
      y: 3 * yDirection,
    });

    return {
      physics: { engine, world },
      ball,
      paddle1,
      paddle2,
      topBorder,
      bottomBorder,
    };
  };

  const onEvent = (e: GameEvent) => {
    if (e.type === 'update_score') {
      // Update the score based on which player scored
      if (e.player === 1) {
        setGameState(prevState => ({
          ...prevState,
          player1Score: prevState.player1Score + 1
        }));
      } else if (e.player === 2) {
        setGameState(prevState => ({
          ...prevState,
          player2Score: prevState.player2Score + 1
        }));
      }
    }
  };

  const resetGame = () => {
    setGameState({
      running: true,
      player1Score: 0,
      player2Score: 0,
    });

    if (gameEngine) {
      gameEngine.swap(setupWorld());
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        style={styles.gameContainer}
        systems={[Physics, Restart]}
        entities={setupWorld()}
        running={gameState.running}
        onEvent={onEvent}
      />

      <Score player1Score={gameState.player1Score} player2Score={gameState.player2Score} />

      <TouchableOpacity style={[styles.resetButton, isTV && styles.tvResetButton]} onPress={resetGame}>
        <Text style={[styles.resetButtonText, isTV && styles.tvResetButtonText]}>Reset Game</Text>
      </TouchableOpacity>

      {isTV && (
        <Text style={styles.tvInstructions}>
          Use touch controls to move paddles. Left side for Player 1, right side for Player 2.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  resetButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FBBC05',
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tvResetButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    bottom: 60,
  },
  tvResetButtonText: {
    fontSize: 24,
  },
  tvInstructions: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
