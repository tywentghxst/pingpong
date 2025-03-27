import React from 'react';
import { View } from 'react-native';
import Matter from 'matter-js';

const Ball = (props: any) => {
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
        borderRadius: width / 2,
        backgroundColor: props.color || 'white',
      }}
    />
  );
};

export default (world: Matter.World, pos: { x: number; y: number }, size: number, color: string) => {
  const ballBody = Matter.Bodies.circle(pos.x, pos.y, size / 2, {
    label: 'ball',
    restitution: 1.0,
    frictionAir: 0,
    friction: 0,
    inertia: Infinity,
    density: 0.001,
  });

  Matter.World.add(world, ballBody);

  return {
    body: ballBody,
    size: { width: size, height: size },
    color: color,
    renderer: Ball,
  };
};
