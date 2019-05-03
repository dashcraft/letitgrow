import "./status-bar.css";
import React from "react";
import { Button, Menu } from "semantic-ui-react";
import { useGameContext } from "../../context/gameCtx";
import { Link, withRouter } from "react-router-dom";

function StatusBar(props) {
  const [state, dispatch] = useGameContext();
  const canHarvest = state.currentSeason.id === 2;
  console.log("history", props.history);
  return (
    <header className="Main-Header">
      <Menu inverted attached="top">
        <Menu.Item name="Current Season">
          Current Season: {state.currentSeason.name}
        </Menu.Item>
        <Menu.Item name="Available Water">
          Available Water: {state.availableWater}
        </Menu.Item>
        <Menu.Item name="Available Fertilizer">
          Available Fertilizer: {state.availableFert}
        </Menu.Item>
        <Menu.Item
          name="Harvest Dashboard"
          onClick={() => props.history.push("/harvest")}
        >
          Harvest Dashboard
        </Menu.Item>
        {props.history.location.pathname !== "/" && (
          <Menu.Item
            name="Back To Game"
            onClick={() => props.history.push("/")}
          >
            Back To Game
          </Menu.Item>
        )}
        {canHarvest && (
          <Menu.Item
            name="Available Fertilizer"
            color="teal"
            active={true}
            onClick={() => {
              dispatch({ type: "harvest" });
              dispatch({ type: "next_season" });
            }}
            style={{ marginLeft: 0 }}
          >
            Harvest Time
          </Menu.Item>
        )}
      </Menu>
    </header>
  );
}

export default withRouter(StatusBar);
