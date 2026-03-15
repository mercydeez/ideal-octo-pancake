import React from 'react';

export interface BallpitProps {
  className?: string;
  followCursor?: boolean;
  skills?: Array<{
    name: string;
    color: string;
    logo?: string;
  }>;
  count?: number;
  colors?: number[];
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  friction?: number;
  wallBounce?: number;
  gravity?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
  controlSphere0?: boolean;
  materialParams?: {
    metalness?: number;
    roughness?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
  };
}

declare const Ballpit: React.FC<BallpitProps>;

export default Ballpit;
