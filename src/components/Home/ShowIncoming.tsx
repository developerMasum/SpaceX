

const ShowIncoming = ({handleUpcoming}) => {
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
