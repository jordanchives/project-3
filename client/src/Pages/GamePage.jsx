import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GAME_ID } from '../utils/queries';
import SideBar from '../components/SideBar';

function GamePage() {
  const { gameID } = useParams();
  const [game, setGame] = useState(null);
  const { loading, data, error } = useQuery(QUERY_GAME_ID, {
    variables: { id: gameID }
  });

  useEffect(() => {
    if (data) {
      console.log('Data received:', data);
      setGame(data.gameById);
    }
    if (error) {
      console.error('Error fetching game:', error);
    }
  }, [data, error]);

  console.log('gameID:', gameID);
  console.log('game:', game);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>404 Game not found</div>;
  }

  return (
    <main className="p-4">
      <SideBar/>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
        {/* Image Container */}
        <div className="relative lg:w-1/4 md:w-1/2 sm:w-full">
          <img 
            src={game.cover} 
            alt={game.name} 
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Description Container */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
            <p className="text-lg text-black-800 mb-4">${game.price}</p>
            <p className="text-gray-700">{game.summary}</p>
          </div>
          <div className="p-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GamePage;
