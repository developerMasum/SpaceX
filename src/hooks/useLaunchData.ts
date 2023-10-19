import { useEffect, useState } from "react";
import axios from "axios";

export function useSpaceXLaunches() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.spacexdata.com/v3/launches"
        );
        setLaunches(response.data);
      } catch (error) {
        console.error("Error fetching SpaceX launches:", error);
      }
    };

    fetchData();
  }, []);

  return { launches };
}
