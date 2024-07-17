import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_GAMES } from "../utils/queries";
import Games from "../components/Games";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export function Home() {
  const { loading, data } = useQuery(QUERY_GAMES);
  const [games2, setGames2] = useState([]);
  const [games1, setGames1] = useState([]);
  const [games3, setGames3] = useState([]);

  useEffect(() => {
    if (data) {
      setGames1(data.games.slice(0, 15));
      setGames2(data.games.slice(16, 30));
      setGames3(data.games.slice(31, 45));
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main className="">
        <div className="delay">
          <Games className="" games={games1} />
          <Games className="" games={games2} />
          <Games className="" games={games3} />
        </div>
      </main>
    </div>
  );
}

export default Home;
