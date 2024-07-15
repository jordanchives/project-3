import React from 'react';

const Game = (props) => {
  return (
    <a href={`/games/${props.game._id}`} className="game-card">
      <div className="game-card-content">
        <img src={props.game.cover} alt={props.game.name} className="game-image" />
        <h1 className="game-title">{props.game.name}</h1>
        <p className="game-price">${props.game.price}</p>
      </div>
    </a>
  );
};

export default Game;