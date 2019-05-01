import React, { useContext, useState } from 'react';
import './App.css';
import Store from './context/gameCtx';
import ActionsBar from './components/ActionsBar';
import Plants from './components/Plants';
import StatusBar from './components/StatusBar';
import ErrorBoundary from './ErrorBoundary';
import AddPlantModal from './ui/AddPlantModal';

function App() {
  const [addPlantModal, setAddPlantModal] = useState(false);
  
  return (
   
      <Store>
        <div className="App">
          <ErrorBoundary>
            <StatusBar />
          </ErrorBoundary>
          <segment className="Main-Section">
            <ErrorBoundary>
              <ActionsBar openPlantModal={() => setAddPlantModal(true)}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <Plants />
            </ErrorBoundary>
          </segment>
          <AddPlantModal isOpen={addPlantModal} onClose={() => setAddPlantModal(false)}/>
        </div>
      </Store>
    
  );
}

export default App;
