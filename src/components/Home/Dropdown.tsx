import React, { useState } from 'react';

const DropDown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // State to hold the selected option

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="mt-4">
      
      <select
        id="date-range"
        value={selectedOption}
        onChange={handleOptionChange}
        className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-48"
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="last_month">Last Month</option>
        <option value="last_year">Last Year</option>
        <option value="last_week">Last Week</option>
      </select>
    </div>
  );
};

export default DropDown;
