import Matter from 'matter-js';

export interface Entity {
  body: Matter.Body;
  size: {
    width: number;
    height: number;
  };
  color: string;
  renderer: React.ComponentType<any>;
  [key: string]: any;
}

export interface GameEntities {
  physics: Matter.Engine;
  ball: Entity;
  paddle1: Entity;
  paddle2: Entity;
  topBorder: Entity;
  bottomBorder: Entity;
  leftBorder?: Entity;
  rightBorder?: Entity;
  [key: string]: any;
}

export interface GameState {
  running: boolean;
  player1Score: number;
  player2Score: number;
}

export interface GameEvent {
  type: 'score' | 'update_score' | 'reset' | 'pause' | 'resume';
  player?: number;
  [key: string]: any;
}

export type SystemFn = (
  entities: GameEntities,
  info: {
    time: { delta: number; current: number };
    dispatch: (gameEvent: GameEvent) => void;
    events: GameEvent[];
    touches: Array<{
      type: 'start' | 'end' | 'move' | 'press';
      event: { pageX: number; pageY: number };
    }>;
  }
) => GameEntities;
