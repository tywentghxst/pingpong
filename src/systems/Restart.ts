import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const getRandomDirection = () => {
  const directions = [-1, 1];
  return directions[Math.floor(Math.random() * directions.length)];
};

const Restart = (entities: any, { events, dispatch }: any) => {
  // Filter for score events
  const scoreEvents = events.filter((e: any) => e.type === 'score');

  if (scoreEvents.length) {
    // Process each score event
    scoreEvents.forEach((e: any) => {
      // Update the score in the game state
      dispatch({ type: 'update_score', player: e.player });

      // Reset the ball position
      if (entities.ball && entities.ball.body) {
        Matter.Body.setPosition(entities.ball.body, {
          x: WIDTH / 2,
          y: HEIGHT / 2
        });

        // Give it a random direction
        const xDirection = getRandomDirection();
        const yDirection = getRandomDirection();

        // Set velocity
        Matter.Body.setVelocity(entities.ball.body, {
          x: 5 * xDirection,
          y: 3 * yDirection
        });
      }
    });
  }

  return entities;
};

export default Restart;
