import React, { useState } from 'react';

const LaunchStatusDropdown: React.FC = ({handleStatusChange,selectedStatus}) => {
 

  return (
    <div className="mt-4">
      <select
        id="launch-status"
        value={selectedStatus}
        onChange={handleStatusChange}
        className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-48"
      >
        <option value="" disabled>
          By Launch Status
        </option>
        <option value="true">Success</option>
        <option value="false">Failure</option>
      </select>
    </div>
  );
};

export default LaunchStatusDropdown;
