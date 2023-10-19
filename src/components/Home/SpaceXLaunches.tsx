import React, { useEffect, useState } from "react";
import { useSpaceXLaunches } from "../../hooks/useLaunchData";
import Card from "./Card";


interface Launch {
  flight_number: number;
  mission_name: string;
  rocket_id: string;
  launch_date_utc: string;
  launch_success: boolean;
  links: { mission_patch: string };
}

const SpaceXLaunches: React.FC = ({launches}) => {
  // const { launches } = useSpaceXLaunches();

  

  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto">
     
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {launches.map((launch) => (
            <Card key={launch.id} launch={launch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceXLaunches;
