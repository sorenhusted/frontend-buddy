import React, { useState }  from 'react';
import './App.css';

import frontenders from './data'; 

const maxIndex = frontenders.length - 1;

function App() {
  
  const [round, setRound] = useState(1);
  const [buddies, setBuddies] = useState([]);


  const createList = () => {
    // The new set of buddy pairs
    let newBuddies = [];

    // Skip the first index, as it is always used for the first pair
    const findIndex = index => index % maxIndex || maxIndex;
    
    // Round Robin tournament: https://en.wikipedia.org/wiki/Round-robin_tournament
    for (let i = 0; i < Math.floor(frontenders.length/2); i++) {
      let pair = [];
      
      // The first pair in each round follow a different pattern
      if (i === 0) {
        pair = [
          // The first person is fixed
          frontenders[0],
          frontenders[round],
        ];
      }
      else {
        pair = [
          frontenders[findIndex(i + round)],
          frontenders[findIndex(maxIndex - i + round)],
        ];
      }

      newBuddies = [
        ...newBuddies,
        pair,
      ];
    }

    // It takes (n-1) rounds to get back to the starting configuration
    setRound((round % (frontenders.length - 1)) + 1);

    setBuddies(newBuddies);
  }

  return (
    <div className="App">
      <button onClick={createList}>Get new teams</button>
      <div className="list">
        { buddies.map(pair => (
          <div className="list__pair" key={pair[0]}>
            { pair.map(member => (
              <div className="list__member" key={member}>{ member } ({ frontenders.indexOf(member) })</div>
            )) }
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
