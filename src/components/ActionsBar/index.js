import React from 'react';
import { Button } from 'semantic-ui-react';
import { useGameContext } from '../../context/gameCtx';

function ActionsBar(){
    const [state, dispatch] = useGameContext();
    return (
        <section className="App-header">
          <Button primary onClick={() => dispatch({type:"add_plant", payload:{id:50, name:"Cool"}})}>Add Plant </Button>
          <Button secondary onClick={() => dispatch({type:"remove_plant", payload:50})}>Remove Plant </Button>
        </section>
    )
}


export default ActionsBar;