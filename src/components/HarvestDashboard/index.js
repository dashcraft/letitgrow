import React from "react";
import { useGameContext } from "../../context/gameCtx";
import { Table, Header } from "semantic-ui-react";

function HarvestDashboard() {
  const [state, dispatch] = useGameContext();

  const { harvest } = state;
  console.log("harvest", harvest);
  return harvest.length > 0
    ? renderAvailableState(harvest)
    : renderEmptyState();
}

function renderAvailableState(harvest) {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Plant Name</Table.HeaderCell>
          <Table.HeaderCell>Yield</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {harvest.map(plant => {
          return (
            <Table.Row>
              <Table.Cell>{plant.plant_name}</Table.Cell>
              <Table.Cell>{plant.yield}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

function renderEmptyState() {
  return <Header>Nothing has been harvested yet!</Header>;
}

export default HarvestDashboard;
