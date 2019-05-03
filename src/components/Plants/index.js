import React from "react";
import { Grid } from "semantic-ui-react";
import { useGameContext } from "../../context/gameCtx";
import PlantItem from "../../ui/PlantItem";

function Plants() {
  const [state] = useGameContext();

  if (state.plants.length === 0) {
    return returnEmptyState();
  }

  return returnMainGrid(state.plants);
}

function returnEmptyState() {
  return (
    <segment className="Plants-Container Empty">
      <h2>No Plants!</h2>
      <p>Take some time and add some plants!!!</p>
    </segment>
  );
}

function returnMainGrid(plants) {
  let rowsObj = plants.reduce((acc, plant, index) => {
    let key = Math.ceil((index + 1) / 4);
    if (acc[key]) {
      acc[key] = [...acc[key], plant];
    } else {
      acc[key] = [plant];
    }
    return acc;
  }, {});

  return (
    <Grid className="Plants-Container Grid-Pad" columns={4}>
      {Object.keys(rowsObj).map(key => {
        return renderRow(rowsObj[key]);
      })}
    </Grid>
  );
}

function renderRow(plants) {
  return plants.map(plant => {
    return (
      <Grid.Column>
        <PlantItem plant={plant} />
      </Grid.Column>
    );
  });
}

export default Plants;
