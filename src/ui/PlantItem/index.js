import React from "react";
import { Card, Icon, Button, Image, List } from "semantic-ui-react";
import { useGameContext } from "../../context/gameCtx";

function PlantItem({ plant }) {
  const [state, dispatch] = useGameContext();

  let percentWaterAllocated = Math.floor(
    (plant.allocated_water / plant.water) * 100
  ).toFixed(2);
  let percentFertilizerAllocated = Math.floor(
    (plant.allocated_fertilizer / plant.fertilizer) * 100
  ).toFixed(2);

  return (
    <Card className="Plant-Card">
      <Card.Content>
        <Card.Header textAlign="center">{plant.plant_name}</Card.Header>
        {_renderPlantImage(plant.health)}
        <Card.Meta textAlign="center">
          <span className="date">{plant.health}</span>
        </Card.Meta>
        <Card.Description>
          <span>Allocated / Required = Percent Needs Met</span>
          <List>
            <List.Item
              icon="tint"
              header={"Water"}
              content={`${plant.allocated_water}/${
                plant.water
              } = ${percentWaterAllocated}%`}
            />
            <List.Item
              icon="recycle"
              header={"Fertilizer"}
              content={`${plant.allocated_fertilizer}/${
                plant.fertilizer
              } = ${percentFertilizerAllocated}%`}
            />
            <List.Item
              icon="medkit"
              header={"Predicted Health"}
              content={`${predictHealth(plant)}%`}
            />
          </List>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <segment className="ui three buttons">
          <Button
            basic
            icon="tint"
            color="blue"
            disabled={
              percentWaterAllocated > 100 || 0 > state.availableWater - 100
            }
            onClick={() =>
              dispatch({ type: "allocate_water", payload: plant.id })
            }
          >
            Add 100 Water
          </Button>
          <Button
            basic
            icon="recycle"
            color="green"
            disabled={
              percentFertilizerAllocated > 100 || 0 > state.availableFert - 100
            }
            onClick={() =>
              dispatch({ type: "allocate_fertilizer", payload: plant.id })
            }
          >
            Add 100 Fertilizer
          </Button>
          <Button
            basic
            icon="cancel"
            color="red"
            onClick={() =>
              dispatch({ type: "remove_plant", payload: plant.id })
            }
          >
            Remove
          </Button>
        </segment>
      </Card.Content>
    </Card>
  );
}

function _renderPlantImage(health = 0) {
  switch (true) {
    case health >= 80:
      return greenPlant();
    case health >= 60:
      return yellowPlant();
    case health >= 40:
      return brownPlant();
    case health >= 0:
      return deadPlant();
  }
}

function predictHealth(plant) {
  let currentAllocation = parseFloat(
    (plant.allocated_water + plant.allocated_fertilizer) /
      (plant.water + plant.fertilizer)
  );
  let predictHealth = parseFloat(
    (plant.health - (plant.health - currentAllocation)) * 100
  ).toFixed(2);
  return predictHealth > 100 ? 100 : predictHealth;
}

function greenPlant() {
  return (
    <Image src="https://images.unsplash.com/photo-1542127186-6e67e7d5316f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
  );
}

function yellowPlant() {
  return (
    <Image src="https://images.unsplash.com/photo-1453673310555-1ebb0fb36219?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1359&q=80" />
  );
}

function brownPlant() {
  return (
    <Image src="https://images.unsplash.com/photo-1508592979141-3726a38ebbc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80" />
  );
}

function deadPlant() {
  return (
    <Image src="https://images.unsplash.com/photo-1505707615801-f8fbba256560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=80" />
  );
}

export default PlantItem;
