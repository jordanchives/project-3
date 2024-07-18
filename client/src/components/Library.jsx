import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { Link } from "react-router-dom"
import auth from "../utils/auth";

function Library() {
  if(!auth.loggedIn()) {
    window.location.assign("/login");
  }
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { id: localStorage.getItem("user_id") },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data?.user || {};
  const library = userData.library || [];

  if (library.length === 0) {
    return <p>No games in your library.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Your Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {library.map((game) => (
          <Link key={game._id} to={`/games/${game._id}`} className="game-card">
            <div className="game-card-content">
              <img src={game.cover} alt={game.name} className="game-image" />
              <h2 className="library-game-title">{game.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Library;
