import React from 'react';

const Game = (props) => {
  return (
    <div>
      <h1>{props.game.name}</h1>
      <p>{props.game.summary}</p>
      <p>{props.game.price}</p>
      <p>{props.game.genres}</p>
      <img src={props.game.cover} alt={props.game.name} />
    </div>
  );
};

export default Game;
