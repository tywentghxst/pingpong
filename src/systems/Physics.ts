import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const MAX_VELOCITY = 15;

const Physics = (entities: any, { time, touches, dispatch }: any) => {
  const { engine } = entities;

  // Update the physics engine
  Matter.Engine.update(engine, time.delta);

  // Get the ball entity
  const ball = entities.ball;

  // Handle ball velocity cap to prevent it from going too fast
  if (ball && ball.body) {
    const velocity = ball.body.velocity;

    // Cap the velocity
    if (Math.abs(velocity.x) > MAX_VELOCITY) {
      Matter.Body.setVelocity(ball.body, {
        x: Math.sign(velocity.x) * MAX_VELOCITY,
        y: velocity.y
      });
    }

    if (Math.abs(velocity.y) > MAX_VELOCITY) {
      Matter.Body.setVelocity(ball.body, {
        x: velocity.x,
        y: Math.sign(velocity.y) * MAX_VELOCITY
      });
    }

    // Check if ball is out of bounds (left or right side)
    if (ball.body.position.x < 0) {
      // Player 2 scores
      dispatch({ type: 'score', player: 2 });
    } else if (ball.body.position.x > WIDTH) {
      // Player 1 scores
      dispatch({ type: 'score', player: 1 });
    }
  }

  // Handle touches for player 1 paddle (left side)
  touches
    .filter((t: any) => t.type === 'move' && t.event.pageX < WIDTH / 2)
    .forEach((t: any) => {
      if (entities.paddle1 && entities.paddle1.body) {
        const newY = Math.max(
          entities.paddle1.size.height / 2,
          Math.min(HEIGHT - entities.paddle1.size.height / 2, t.event.pageY)
        );

        Matter.Body.setPosition(entities.paddle1.body, {
          x: entities.paddle1.body.position.x,
          y: newY
        });
      }
    });

  // Handle touches for player 2 paddle (right side)
  touches
    .filter((t: any) => t.type === 'move' && t.event.pageX > WIDTH / 2)
    .forEach((t: any) => {
      if (entities.paddle2 && entities.paddle2.body) {
        const newY = Math.max(
          entities.paddle2.size.height / 2,
          Math.min(HEIGHT - entities.paddle2.size.height / 2, t.event.pageY)
        );

        Matter.Body.setPosition(entities.paddle2.body, {
          x: entities.paddle2.body.position.x,
          y: newY
        });
      }
    });

  return entities;
};

export default Physics;
