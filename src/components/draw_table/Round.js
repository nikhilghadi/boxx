// Round.js
import React from 'react';
import Match from './Match';

const Round = ({ round, roundNumber }) => {
  const boutsInRound = round.matches.count
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">{round.roundName}</h2>
      <div className={`space-y-3 ${roundNumber == 0 ? 'content-end' : 'content-center'} h-full`}>
        {round.matches.map((match, index) => (
          <Match key={match.id} match={match} roundNumber={roundNumber} matchNumber={index+1} boutsInRound={boutsInRound} />
        ))}
      </div>
    </div>
  );
};

export default Round;
