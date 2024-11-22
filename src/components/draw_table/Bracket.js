// Bracket.js
import React from 'react';
import Round from './Round';

const Bracket = ({ rounds }) => {
  return (
    <div className="flex space-x-8 overflow-x-auto p-4">
      {rounds.map((round, index) => (
        <Round key={index} round={round} roundNumber={index} />
      ))}
    </div>
  );
};

export default Bracket;
