import React, {useReducer, useContext, createContext} from 'react';

export const GameContext = createContext({});

const initialState = {
    seasons : [
        {
            id: 0,
            name: "Spring",
            water: 4000,
            sunlight: 0.7,
            availableFert: 2000
        },
        {
            id: 1,
            name: "Summer",
            water: 2800,
            sunlight: 0.9,
            availableFert: 1500
        },
        {
            id: 2,
            name: "Fall",
            water: 3400,
            sunlight: 0.6,
            availableFert: 2500
        },
        {
            id: 3,
            name: "Winter",
            water: 3000,
            sunlight: 0.4,
            availableFert: 600
        }
    ],
    currentSeason : {
        id: 0,
        name: "Spring",
        water: 4000,
        sunlight: 0.5
    },
    plants: [],
    availableWater: 3400,
    availableFert: 2000,
    usingShade: false,
    harvest: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'add_plant':
            return {...state, plants : [...state.plants, action.payload]};
        case 'remove_plant': 
            return removePlant(state, action)
        case 'allocate_water':
            return allocateResources(state, action)
        case 'allocate_fertilizer':
            return allocateResources(state, action)
        case 'next_season':  
            return proceedToNextSeason(state);
        case 'harvest':
            return harvestAllPlants(state);
        default: return state;
    }
}

function proceedToNextSeason(state){
    let seasonId = state.currentSeason.id;
    if(seasonId != 3){
        seasonId++;
    } else {
        seasonId = 0;
    }
    let nextSeason = state.seasons[seasonId];
    return { ...state, currentSeason:nextSeason, availableWater: state.availableWater+nextSeason.water, availableFert: state.availableFert+nextSeason.availableFert, plants: state.plants.map(plant => {
        let currentAllocation = parseFloat((plant.allocated_water + plant.allocated_fertilizer)/(plant.water + plant.fertilizer));
        let predictHealth = parseFloat((plant.health - (plant.health - currentAllocation))*100).toFixed(2);
        return {...plant, allocated_water:0, allocated_fertilizer:0, health: predictHealth > 100 ? 100 : predictHealth}
    })}
}

function harvestAllPlants(state){
    let currentHarvest = state.plants.map(plant => {
        let currYield = Math.floor(plant.max_yield*(plant.health/100));
        return {id : plant.id, yield: currYield}
    })
    let newHarvest = currentHarvest.filter(item => !state.harvest.find(hv => hv.id == item.id));

    let oldHarvest = state.harvest.filter(item => {
        let newItem = currentHarvest.find(x => x.id !== item.id);
        return { ...item, yield: newItem.yield + item.yield }
    })

    return {...state, plants:[], harvest : [...newHarvest, ...oldHarvest]}
}


function removePlant(state, action){
    let plantToUpdate = state.plants.find(item => item.id === action.payload);
    return { ...state, plants : state.plants.filter(plt => plt.id !== action.payload ), availableFert: state.availableFert+ plantToUpdate.allocated_fertilizer, availableWater: state.availableWater+plantToUpdate.allocated_water}
}

function allocateResources(state, action){
    let availableWater = action.type == "allocate_water" ? state.availableWater-100 : state.availableWater;
    let availableFert = action.type == "allocate_fertilizer" ? state.availableFert-100 : state.availableFert;
    
    return { ...state, plants : updatePlantsForResources(state.plants, action), ...{availableWater}, ...{availableFert} }
}

function updatePlantsForResources(plants, action){
    let indexOfPlant = plants.findIndex(item => item.id == action.payload);
    let plantToUpdate = plants.find(item => item.id === action.payload);
    switch(action.type){
        case 'allocate_water':
            return [...plants.slice(0, indexOfPlant),
                 Object.assign({}, plantToUpdate, {allocated_water : plantToUpdate.allocated_water+100}),
                ...plants.slice(indexOfPlant+1)
            ]
        case 'allocate_fertilizer':
            return [...plants.slice(0, indexOfPlant),
                 Object.assign({}, plantToUpdate, {allocated_fertilizer : plantToUpdate.allocated_fertilizer+100}),
                ...plants.slice(indexOfPlant+1)
            ]
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