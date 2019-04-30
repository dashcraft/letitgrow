import React, { useContext } from 'react';
import './App.css';
import Store from './context/gameCtx';
import ActionsBar from './components/ActionsBar';
import Plants from './components/Plants';
import StatusBar from './components/StatusBar';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
   
      <Store>
        <div className="App">
          <ErrorBoundary>
            <StatusBar />
          </ErrorBoundary>
          <ErrorBoundary>
            <Plants />
          </ErrorBoundary>
          <ErrorBoundary>
            <ActionsBar />
          </ErrorBoundary>
        </div>
      </Store>
    
  );
}

export default App;
