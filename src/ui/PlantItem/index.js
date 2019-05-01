import React from 'react';
import { Card, Icon, Button, Image, List } from 'semantic-ui-react'
import { useGameContext } from '../../context/gameCtx';



function PlantItem({ plant }){
    const [state, dispatch] = useGameContext();

    let percentWaterAllocated = Math.floor((plant.allocated_water/plant.water)*100).toFixed(2);
    let percentFertilizerAllocated = Math.floor((plant.allocated_fertilizer/plant.fertilizer)*100).toFixed(2);
    
    return <Card className="Plant-Card">
    <Card.Content>
      <Card.Header textAlign="center">{plant.plant_name}</Card.Header>
        {plant.health > 80 && greenPlant()}
      <Card.Meta textAlign="center">
        <span className='date'>{plant.health}</span>
      </Card.Meta>
      <Card.Description>
            <span>Allocated    /     Required    =    Percent Needs Met</span>
          <List>
              <List.Item icon='tint' header={"Water"} content={`${plant.allocated_water}/${plant.water} = ${percentWaterAllocated}%`}/>
              <List.Item icon='recycle' header={"Fertilizer"} content={`${plant.allocated_fertilizer}/${plant.fertilizer} = ${percentFertilizerAllocated}%`} />
              <List.Item icon='medkit' header={"Predicted Health"} content={`${predictHealth(plant)}%`} />
          </List>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <segment className='ui three buttons'>
          <Button basic icon="tint" color='blue' disabled={percentWaterAllocated > 100  || 0 > state.availableWater - 100 } onClick={() => dispatch({type:'allocate_water', payload:plant.id})}>
            Add 100 Water
          </Button>
          <Button basic icon="recycle" color='green' disabled={percentFertilizerAllocated > 100 || 0 > state.availableFert - 100 } onClick={() => dispatch({type:'allocate_fertilizer', payload:plant.id})}>
            Add 100 Fertilizer
          </Button>
          <Button basic icon="cancel" color='red' onClick={()=>dispatch({type:"remove_plant", payload:plant.id})}>
            Remove
          </Button>
        </segment>
    </Card.Content>
  </Card>
}


function predictHealth(plant){
    let currentAllocation = parseFloat((plant.allocated_water + plant.allocated_fertilizer)/(plant.water + plant.fertilizer));
    let predictHealth = parseFloat((plant.health - (plant.health - currentAllocation))*100).toFixed(2);
    return predictHealth > 100 ? 100 : predictHealth;
}

function greenPlant(){
    return <Image src='https://images.unsplash.com/photo-1505707615801-f8fbba256560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=80' />
}

function yellowPlant(){
    return <Image src='https://images.unsplash.com/photo-1505707615801-f8fbba256560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=80' />

}

function brownPlant(){
    return <Image src='https://images.unsplash.com/photo-1505707615801-f8fbba256560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=80' />
}

function deadPlant(){
    return <Image src='https://images.unsplash.com/photo-1505707615801-f8fbba256560?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=80' />
}

export default PlantItem;