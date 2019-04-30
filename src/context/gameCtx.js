import React, {useReducer, useContext, createContext} from 'react';

export const GameContext = createContext({});

const initialState = {
    seasons : [
        {
            id: 0,
            name: "Spring",
            water: 120000,
            sunlight: 0.5
        }
    ],
    currentSeason : {
        id: 3,
        name: "Spring",
        water: 120000,
        sunlight: 0.5
    },
    plants: [],
    availableWater: 1000,
    availableFert: 1000,
    usingShade: false,
    harvest: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'add_plant':
            return {...state, plants : [...state.plants, action.payload]};
        case 'remove_plant': 
            return {...state, plants: state.plants.filter(plant => plant.id != action.payload)};
        case 'next_season':  
            return state.currentSeason.id == 3 ? {...state, currentSeason: state.seasons[0]} : {...state, currentSeason: state.seasons[state.currentSeason.id + 1]};
        default: return state;
    }
}

const Store = ({ children }) => {
  const contextValue= useReducer(reducer, initialState);
  
  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};


export const useGameContext = () => {
    const contextValues = useContext(GameContext);
    return contextValues;
}


export default Store;