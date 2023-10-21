import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import LaunchStatusDropdown from "./StatusDropDown";
import SearchBar from "./components/Home/SearchBar";
import SpaceXLaunches from "./components/Home/SpaceXLaunches";
import Title from "./components/Home/Title";
import ShowIncoming from "./components/Home/ShowIncoming";
import { useSpaceXLaunches } from "./hooks/useLaunchData";
import DropDown from "./components/Home/Dropdown";

interface Launch {
  upcoming: boolean;
  launch_success: boolean;
  // Define other properties in your launch data
}

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Launch[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [queryData, setQueryData] = useState<Launch[]>([]);

  const { launches } = useSpaceXLaunches();
  console.log(launches);

  const cardsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToDisplay = searchResults.slice(startIndex, endIndex);
  const pageCount = Math.ceil(searchResults.length / cardsPerPage);

  const handleUpcoming = () => {
    const upcoming = launches.filter((launch) => launch.upcoming === true);
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
        .then((data: Launch[]) => {
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
        .then((data: Launch[]) => {
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
      <div className="flex flex-col items-center mb-10 md:flex-row lg:flex-row md:justify-between lg:justify-between">
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
                .then((data: Launch[]) => {
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
        <LaunchStatusDropdown
          handleStatusChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const newSelectedStatus = event.target.value;
            setSelectedStatus(newSelectedStatus);
          }}
          selectedStatus={selectedStatus}
        />
        <div className="flex flex-col mb-0 sm:mt-3">
          <ShowIncoming handleUpcoming={handleUpcoming} />
          <DropDown />
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SpaceXLaunches launches={cardsToDisplay} />
      )}
      {searchResults.length > 9 && (
        <div className="flex justify-center text-4xl flex-row">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={""}
            activeLinkClassName={"text-sm px-2 py-1 rounded-md bg-red-300 hover:bg-gray-400"}
            previousLinkClassName="text-sm px-2 py-1 rounded-md bg-gray-300 hover.bg-gray-400"
            nextLinkClassName="text-sm px-2 py-1 rounded-md bg-gray-300 hover:bg-gray-400"
            breakLinkClassName="text-sm px-2 py-1 rounded-md bg-gray-300 hover:bg-gray-400"
            pageLinkClassName="text-sm px-2 py-1 rounded-md bg-gray-300 hover:bg-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default App;
