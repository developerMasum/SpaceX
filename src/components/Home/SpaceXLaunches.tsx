import React from 'react';
import Card from './Card';

interface Launch {
  flight_number: number;

}

interface SpaceXLaunchesProps {
  launches: Launch[];
}

const SpaceXLaunches: React.FC<SpaceXLaunchesProps> = ({ launches }) => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {launches.map((launch) => (
            <Card key={launch.flight_number} launch={launch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceXLaunches;
