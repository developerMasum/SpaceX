import React, { useState, useEffect } from "react";
import LaunchStatusDropdown from "./StatusDropDown";
import DropDown from "./components/Home/Dropdown";
import SearchBar from "./components/Home/SearchBar";
import SpaceXLaunches from "./components/Home/SpaceXLaunches";
import Title from "./components/Home/Title";
import { useSpaceXLaunches } from "./hooks/useLaunchData";
import ShowIncoming from "./components/Home/ShowIncoming";

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [queryData, setQueryData] = useState<any[]>([]);

  const { launches } = useSpaceXLaunches();

  // upcoming
  const handleUpcoming = () => {
    console.log('clicked');
    const upcoming = launches.filter((launch) => launch?.upcoming === true);
    console.log(upcoming);
    setSearchResults(upcoming);
  };

  useEffect(() => {
    setLoading(true);
    setSearchResults([]);

    if (searchQuery === "") {
      setSearchResults(launches);
      setLoading(false);
    } else {
      fetch(`https://api.spacexdata.com/v3/launches?rocket_name=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSearchResults(data);
          setQueryData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [searchQuery, launches]);

  useEffect(() => {
    if (queryData.length > 0) {
      const booleanSelectedStatus = selectedStatus === "true";
      const filter = queryData.filter((ls) => ls.launch_success === booleanSelectedStatus);
      setSearchResults(filter);
    } else {
      fetch(`https://api.spacexdata.com/v3/launches?launch_success=${selectedStatus}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [selectedStatus, queryData]);

  return (
    <div className="p-4 min-h-screen">
      <Title />
      <div className="flex justify-around mb-10">
        <SearchBar
          handleSearch={() => {
            setLoading(true);
            setSearchResults([]);
            if (searchQuery === "") {
              setSearchResults(launches);
              setLoading(false);
            } else {
              fetch(`https://api.spacexdata.com/v3/launches?rocket_name=${searchQuery}`)
                .then((response) => response.json())
                .then((data) => {
                  setSearchResults(data);
                  setLoading(false);
                })
                .catch((error) => {
                  console.error("Error fetching data:", error);
                  setLoading(false);
                });
            }
          }}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          loading={loading}
          searchResults={searchResults}
        />
        <ShowIncoming handleUpcoming={handleUpcoming} />
        <DropDown />
        <LaunchStatusDropdown
          handleStatusChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const newSelectedStatus = event.target.value;
            setSelectedStatus(newSelectedStatus);
          }}
          selectedStatus={selectedStatus}
        />
      </div>
      {loading ? (
        // Render a loading indicator here
        <div>Loading...</div>
      ) : (
        <SpaceXLaunches launches={searchQuery === "" && selectedStatus === "" ? launches : searchResults} />
      )}
    </div>
  );
};

export default App;
