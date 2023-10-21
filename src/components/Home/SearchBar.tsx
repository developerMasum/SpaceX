
const SearchBar: React.FC = ({handleSearch,loading,setSearchQuery,searchQuery,searchResults}) => {

  return (
    <div className="w-full sm:w-4/6 flex flex-col items-start justify-center sm:text-center">
  <div className="relative">
    <input
      type="text"
      placeholder="Search by Rocket Name..."
      className="w-full h-12 px-4 py-2 pr-28 text-gray-700 placeholder-gray-400 bg-white border rounded-lg focus:outline-none focus:ring focus:border-blue-300 focus:ring-blue-100"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button
      className="absolute top-0 right-0 h-12 w-12 text-blue-500"
      onClick={handleSearch}
      disabled={loading}
    >
      {loading ? "Searching..." : "Search"}
    </button>
  </div>
</div>

  );
};

export default SearchBar;
