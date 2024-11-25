// Match.js
import React from 'react';

const Match = ({ match, roundNumber, matchNumber, boutsInRound }) => {
  const marginTop = roundNumber > 1 ? `` : ""
  return (
    <div className="bg-gray-100  p-4 w-40 h-25 flex flex-col justify-between items-center border rounded-lg shadow-md relative">
      {/* {matchNumber} */}
      {match?.bout_number && <span className='absolute top-0 left-0 '>{match?.bout_number}.  </span> || ''}

      {match.players.map((player, index) => (
        <> 
          <div
            key={index}
            className={`w-full flex m-1 ${index === 0 ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {
             player?.draw_number  &&  <span className='ml-1'> {player?.draw_number}.  </span> || ''
            }
            <span className= 'w-full cursor-pointer' title={(player?.first_name || '') + ' ' + (player?.last_name || '')}>
            {(((player?.first_name) || (index ===0 ? "Red" : "Blue")) + " " + (player?.last_name || '')).slice(0, 10)}
            {(((player?.first_name) || (index ===0 ? "Red" : "Blue")) + " " + (player?.last_name||'')).length > 10 && "..."}
            </span>
          
          </div>
        </>
      ))}
      {/* Connectors */}
      <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-5 h-px bg-black" />
    </div>
  );
};

export default Match;
