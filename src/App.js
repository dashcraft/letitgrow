import React, { useContext, useState } from "react";
import "./App.css";
import Store from "./context/gameCtx";
import ActionsBar from "./components/ActionsBar";
import Plants from "./components/Plants";
import StatusBar from "./components/StatusBar";
import ErrorBoundary from "./ErrorBoundary";
import AddPlantModal from "./ui/AddPlantModal";
import HarvestDashboard from "./components/HarvestDashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const History = createBrowserHistory();

function App() {
  const [addPlantModal, setAddPlantModal] = useState(false);

  return (
    <BrowserRouter history={History}>
      <Store>
        <div className="App">
          <ErrorBoundary>
            <StatusBar />
          </ErrorBoundary>
          <segment className="Main-Section">
            <ErrorBoundary>
              <ActionsBar openPlantModal={() => setAddPlantModal(true)} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Switch>
                <Route exact path="/" component={Plants} />
                <Route exact path="/harvest" component={HarvestDashboard} />
              </Switch>
            </ErrorBoundary>
          </segment>
          <AddPlantModal
            isOpen={addPlantModal}
            onClose={() => setAddPlantModal(false)}
          />
        </div>
      </Store>
    </BrowserRouter>
  );
}

export default App;
