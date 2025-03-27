import React from 'react';
import { View } from 'react-native';
import Matter from 'matter-js';

const Border = (props: any) => {
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
        backgroundColor: props.color || 'transparent',
      }}
    />
  );
};

export default (
  world: Matter.World,
  label: string,
  pos: { x: number; y: number },
  size: { width: number; height: number },
  color: string = 'transparent',
  isSensor: boolean = false
) => {
  const borderBody = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label,
    isStatic: true,
    isSensor,
    restitution: 1,
  });

  Matter.World.add(world, borderBody);

  return {
    body: borderBody,
    size,
    color,
    renderer: Border,
  };
};
