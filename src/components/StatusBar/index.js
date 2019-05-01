import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { useGameContext } from '../../context/gameCtx';


function StatusBar(){
    const [state, dispatch] = useGameContext();
    const canHarvest = (state.currentSeason.id === 2);
    return <header className="Main-Header">
        <Menu inverted attached="top">
            <Menu.Item
                name='Current Season'
            >
               Current Season: {state.currentSeason.name}
            </Menu.Item>
            <Menu.Item
                name='Available Water'
            >
               Available Water: {state.availableWater}
            </Menu.Item>
            <Menu.Item
                name='Available Fertilizer'
            >
               Available Fertilizer: {state.availableFert}
            </Menu.Item>
            {canHarvest && 
            <Menu.Item
                name='Available Fertilizer'
                color="teal"
                active={true}
                onClick={() => dispatch({type:"harvest"})}
                style={{marginLeft:0}}
            >
               Harvest Time
            </Menu.Item>}
        </Menu>
    </header>
}

export default StatusBar;