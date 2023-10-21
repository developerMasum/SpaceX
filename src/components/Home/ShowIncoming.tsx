import React from 'react';

interface ShowIncomingProps {
  handleUpcoming: () => void;
}

const ShowIncoming: React.FC<ShowIncomingProps> = ({ handleUpcoming }) => {
  return (
    <div>
      <p>
        <input onClick={handleUpcoming} type="checkbox" id="showUpcomingOnly" />
        <label htmlFor="showUpcomingOnly">Show upcoming only</label>
      </p>
    </div>
  );
};

export default ShowIncoming;
