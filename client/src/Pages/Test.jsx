import { useQuery } from "@apollo/client";
import { QUERY_GAMES } from "../utils/queries";
import { useState, useEffect } from "react";
import Game from "../components/Game";

const Test = () => {
  console.log("Test");
  const { loading, data } = useQuery(QUERY_GAMES);
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (data) {
      setGames(data.games);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {games.map((game) => (
        <Game key={game._id} game={game} />
      ))}
    </div>
  );
};

export default Test;
