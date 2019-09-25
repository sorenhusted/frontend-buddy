import React, { useState }  from 'react';
import './App.css';

import frontenders from './data'; 

const halfSize = Math.floor(frontenders.length/2);

function App() {
  
  const [offset, setOffset] = useState(0);
  const [buddies, setBuddies] = useState([]);


  const createList = () => {
    let newBuddies = [];
    const list = [...frontenders];

    const getNextPair = iteration => {
      const nextPair = [
        list[0],
        list[1],
      ];
    }
    
    for (let i = 0; i < halfSize; i++) {
      newBuddies = [
        ...newBuddies,
        [
          frontenders[i],
          frontenders[((i + offset + halfSize) % frontenders.length)],
        ],
      ];
    }

    setOffset((offset + 1) % halfSize);
    setBuddies(newBuddies);
  }

  return (
    <div className="App">
      <button onClick={createList}>Get new teams</button>
      <div className="list">
        { buddies.map(pair => (
          <div className="list__pair" key={pair[0]}>
            { pair.map(member => (
              <div className="list__member" key={member}>{ member }</div>
            )) }
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
