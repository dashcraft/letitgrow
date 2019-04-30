import React from 'react';
import { useGameContext } from '../../context/gameCtx';
import PlantItem from '../../ui/PlantItem';

function Plants(){
    const [state, dispatch] = useGameContext();
    return (
        <segment className="Plants-Container">
        {state.plants.length > 0 ? state.plants.map(plant => <PlantItem plant={plant}/>) : null}
        </segment>
    )
}


export default Plants;