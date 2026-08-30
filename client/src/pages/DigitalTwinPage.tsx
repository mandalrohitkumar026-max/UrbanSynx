import React from 'react';
import { DigitalTwinMap } from '../components/map/DigitalTwinMap';

export const DigitalTwinPage: React.FC = () => {
  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] overflow-hidden bg-[#070a0f]">
      {/* Living 2D/3D Digital Twin City Map Canvas */}
      <DigitalTwinMap />
    </div>
  );
};
