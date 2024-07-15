import React from 'react';
import { QUERY_GAMES } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';


function GamePage() {
    const { gameID } = useParams();
    const [game, setGame] = useState(null);
    const { loading, data } = useQuery(QUERY_GAMES, {
        variables: { gameID: gameID }
    });

    useEffect(() => {
        if (data&& data.games){
            console.log('games:',data.games);
        const foundGame = data.games.find(game => game._id === gameID);
        setGame(foundGame);
         } else if (data) {
            console.log('data:', data);
        }
        
    }, [data, gameID]);

console.log('gameID:',gameID);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!game) {
        return <div>404 Game not found</div>
    }
    
        
    return (
        <main>
            <SearchBar />
  <div className="game-card">
    <div className="game-card-content">
     
      <div className="game-image-container">
      <h2 className="game-title">{game.name}</h2>
        <img className="game-image" src={game.cover} alt={game.name} />
        <p className="game-price">{game.price}</p>
      </div>
      <div className="">
        <p className="">{game.description}</p>
      </div>
    </div>
  </div>
  <div className="pt-5">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Add to Cart
    </button>
  </div>
  <Footer/>
</main>
            );
        }
    

        export default GamePage;
