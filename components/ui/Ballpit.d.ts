import React from 'react';

export interface BallpitProps {
  className?: string;
  followCursor?: boolean;
  skills?: Array<{
    name: string;
    color?: string;
    logo?: string;
  }>;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  minSize?: number;
  maxSize?: number;
  // Physics config props supported by createBallpit opts
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
  size0?: number;
}

declare const Ballpit: React.FC<BallpitProps>;

export default Ballpit;
