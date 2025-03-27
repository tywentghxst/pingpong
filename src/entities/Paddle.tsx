import React from 'react';
import { View } from 'react-native';
import Matter from 'matter-js';

const Paddle = (props: any) => {
  const width = props.size.width;
  const height = props.size.height;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: props.color || '#FFF',
        borderRadius: 5,
      }}
    />
  );
};

export default (
  world: Matter.World,
  label: string,
  pos: { x: number; y: number },
  size: { width: number; height: number },
  color: string,
  isStatic: boolean = true
) => {
  const paddleBody = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label,
    isStatic,
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    inertia: Infinity,
  });

  Matter.World.add(world, paddleBody);

  return {
    body: paddleBody,
    size,
    color,
    label,
    renderer: Paddle,
  };
};
