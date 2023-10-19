import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
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
    const upcoming = launches.filter((launch) => launch?.upcoming === true);
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
        <div>Loading...</div>
      ) : (
        <SpaceXLaunches launches={cardsToDisplay} />
      )}


  {searchResults.length > 9 && (
    <div className="pagination-container flex justify-center mt-8 mb-24 text-4xl">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination-vertical"}
        // containerClassName={"pagination"}
        // subContainerClassName={"pages pagination"}
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
