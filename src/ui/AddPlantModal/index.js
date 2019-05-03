import React, { useState, useEffect } from "react";
import { Button, List, Icon, Modal, Select } from "semantic-ui-react";
import { useGameContext } from "../../context/gameCtx";
import { getPlants } from "../../services/PlantsService";

function AddPlantModal(props) {
  const [state, dispatch] = useGameContext();
  const [plantData, setPlantData] = useState([]);
  const [loadingPlantData, setLoadingPlantData] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    async function setStartData() {
      let returnedPlantData = await getPlants();
      let transformedData = returnedPlantData.map(plant => {
        return {
          text: plant.plant_name,
          value: plant.id,
          plant: plant,
          key: plant.id
        };
      });

      setPlantData(transformedData);
      setLoadingPlantData(false);
    }
    setStartData();
  }, [setSelectedPlant]);

  let plant = plantData.find(x => x.value === selectedPlant);

  return (
    <Modal open={props.isOpen} closeIcon onClose={props.onClose}>
      <Modal.Header>Add a Plant!</Modal.Header>
      <segment
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 40
        }}
      >
        <Modal.Content textAlign="center">
          <Select
            loading={loadingPlantData}
            placeholder="Select a plant"
            options={plantData}
            onChange={(e, { value }) => {
              setSelectedPlant(value);
            }}
          />
        </Modal.Content>
        <Modal.Description style={{ color: "black" }}>
          Plant Needs:
          {plant && (
            <List style={{ paddingTop: 10 }}>
              <List.Item
                icon="tint"
                header={"Water"}
                content={`${plant.plant.water}`}
              />
              <List.Item
                icon="recycle"
                header={"Fertilizer"}
                content={`${plant.plant.fertilizer}`}
              />
            </List>
          )}
        </Modal.Description>
      </segment>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => {
            let plant = plantData.find(x => x.value === selectedPlant);
            dispatch({
              type: "add_plant",
              payload: Object.assign({}, plant.plant, {
                allocated_water: 0,
                allocated_fertilizer: 0,
                health: 100
              })
            });
            props.onClose();
          }}
          inverted
        >
          <Icon name="checkmark" /> Add Plant
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AddPlantModal;
