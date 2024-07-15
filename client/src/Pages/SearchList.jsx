import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES_NAME } from "../utils/queries";

function SearchList() {
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("term");
  const { loading, data } = useQuery(QUERY_GAMES_NAME, {
    variables: { name: name },
  });
  const [games, setGames] = useState([]);
  console.log(name);
  console.log(data);

  useEffect(() => {
    if (data) {
      setGames(data.games.slice(0, 25));
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {games.map((game) => (
        <li key={game._id}>
          <p>{game.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default SearchList;