import React, { useState, useEffect } from 'react';

interface LaunchData {
  // Define the structure of each launch item here
  flight_number: number;
  // Add other properties as needed
}

const DropDown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [launchData, setLaunchData] = useState<LaunchData[]>([]); // Specify the type of launchData
  const [loading, setLoading] = useState<boolean>(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectedOption) {
      setLoading(true);
      const today = new Date();
      fetch(`https://api.spacexdata.com/v3/launches`)
        .then((response) => response.json())
        .then((data: LaunchData[]) => { // Use the LaunchData type
          const formattedData = data.filter((launch) => {
            const launchDate = new Date(launch.launch_date_utc);
            if (selectedOption === "last_month") {
              return launchDate > new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            } else if (selectedOption === "last_year") {
              return launchDate > new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
            } else if (selectedOption === "last_week") {
              const oneWeekAgo = new Date(today);
              oneWeekAgo.setDate(today.getDate() - 7);
              return launchDate > oneWeekAgo;
            }
            return true;
          });
          setLaunchData(formattedData);
          console.log(formattedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [selectedOption]);

  return (
    <div className="mt-4">
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-48"
      >
        <option value="" disabled>
          By Launch Date
        </option>
        <option value="last_month">Last Month</option>
        <option value="last_year">Last Year</option>
        <option value="last_week">Last Week</option>
      </select>
    </div>
  );
};

export default DropDown;
