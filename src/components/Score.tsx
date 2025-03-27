import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreProps {
  player1Score: number;
  player2Score: number;
}

const Score: React.FC<ScoreProps> = ({ player1Score, player2Score }) => {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>{player1Score}</Text>
      <Text style={styles.scoreText}>-</Text>
      <Text style={styles.scoreText}>{player2Score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  scoreText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default Score;
