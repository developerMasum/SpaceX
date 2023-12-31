import React from 'react';

interface CardProps {
  launch: {
    flight_number: number;
    links: {
      mission_patch: string;
    };
    mission_name: string;
    launch_date_utc: string;
    rocket_id: string;
    rocket: {
      rocket_name: string;
    };
    launch_success: boolean;
  };
}

const Card: React.FC<CardProps> = ({ launch }) => {
  return (
    <div className="bg-white rounded p-4 shadow-sm text-center" key={launch.flight_number}>
      <img
        src={launch?.links?.mission_patch}
        alt={`Mission photo for ${launch.mission_name}`}
        className="mb-4 max-h-36 w-full object-contain"
      />
      <p className="text-gray-700 text-sm font-semibold">
        <span className="text-gray-500">Launch Date:</span>{' '}
        {new Date(launch.launch_date_utc).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      <h2 className="text-xl font-semibold">{launch.mission_name}</h2>
      <p className="text-gray-700 text-lg font-bold">{launch.rocket_id}</p>
      <p className="text-gray-700 text-lg font-bold">{launch.rocket.rocket_name}</p>

      <p className="text-gray-700 text-center">
        <span className="text-lg">Launch Status: </span>
        <p
          className={
            launch.launch_success
              ? 'bg-green-400 mx-auto w-20 text-white font-semibold rounded-md text-sm'
              : 'bg-red-400 mx-auto w-20 text-white font-semibold rounded-md text-sm'
          }
        >
          {launch.launch_success ? 'Successful' : 'Failed'}
        </p>
      </p>
    </div>
  );
};

export default Card;
