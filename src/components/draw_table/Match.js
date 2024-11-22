// Match.js
import React from 'react';

const Match = ({ match, roundNumber, matchNumber, boutsInRound }) => {
  const marginTop = roundNumber > 1 ? `` : ""
  return (
    <div className="bg-gray-100  p-4 w-40 h-25 flex flex-col justify-between items-center border rounded-lg shadow-md relative">
      {/* {matchNumber} */}
      {match.players.map((player, index) => (
        <> 
          <div
            key={index}
            className={`w-full text-center m-1 ${index === 0 ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {player.first_name + " " + player.last_name}
          </div>
        </>
      ))}
      {/* Connectors */}
      <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-5 h-px bg-black" />
    </div>
  );
};

export default Match;
