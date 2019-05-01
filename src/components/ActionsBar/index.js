import React from 'react';
import { Button } from 'semantic-ui-react';
import { Icon, Menu } from 'semantic-ui-react'
import { useGameContext } from '../../context/gameCtx';


function ActionsBar(props){
    const [state, dispatch] = useGameContext();

    return (
        <Menu compact inverted icon='labeled' vertical className="Actions-Bar">
            <Menu.Item name='Plant' active={true} onClick={props.openPlantModal}>
                <Icon name='plus' />
                Add Plant
            </Menu.Item>
            <Menu.Item name='End Season' active={true} onClick={() => dispatch({type:"next_season"})}>
                <Icon name='arrow right' />
                End Season
            </Menu.Item>
        </Menu>
    )
}


export default ActionsBar;