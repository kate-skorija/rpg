// This function stores our state.

const storeState = (initialState) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}
  
// Monsters

const automaton = storeState( {damage: 4, multiplier: 1} );

// Function Factories

const changeState = (prop) => {
  return (value) => {
    return (state) => {
      if (state[prop] + value <= 10) {
        return {
          ...state,
          [prop] : (state[prop] || 0) + value
        } 
      } else {
        return {
          ...state,
          [prop] : (state[prop]) = 10
        }
      }
    }
  }
}

const changeTwoStateProps = (prop) => {
  return (prop2) => {
    return (value) => {
      return (value2) => {
        return (state) => {
          if((state[prop] + value <= 10) && (state[prop2] + value2 <= 10)) {
            return {
              ...state,
              [prop] : (state[prop] || 0) + value,
              [prop2] : (state[prop2] || 0) + value2
            }  
          } else if ((state[prop] + value <= 10) && (state[prop2] + value2 > 10)) {
            return {
              ...state,
              [prop] : (state[prop] || 0) + value,
              [prop2] : (state[prop2]) = 10
            }
          } else if ((state[prop] + value > 10) && (state[prop2] + value2 > 10)) {
            return {
              ...state,
              [prop] : (state[prop]) = 10,
              [prop2] : (state[prop2]) = 10
            }
          } else if ((state[prop] + value > 10) && (state[prop2] + value2 <= 10)) {
            return {
              ...state,
              [prop] : (state[prop]) = 10,
              [prop2] : (state[prop2]|| 0) + value
            }
          }  
        }
      }
    }
  }
}

// This function is called immediately after the battle function
const levelUp = (playerState) => {
  if (playerState.experience >= 10) {
    return {
      ...playerState,
      creativity: (playerState.creativity) + 1,
      experience: (playerState.experience) = 1,
      health: (playerState.health) + 1,
      level: (playerState.level) + 1,
      strength: (playerState.strength) + 1,
      wisdom: (playerState.wisdom) + 1
    }
  }
}


const monsterBattle = (monsterState) => {
  return (playerProp) => {
    return (playerState) => {
      if ((playerState[playerProp] >= monsterState.damage)) {
        return { 
          ...playerState,
          experience: (playerState.experience) + monsterState.multiplier, 
          [playerProp]: (playerState[playerProp]) + 1
        }
      } else {
        return {
          ...playerState,
          health: (playerState.health) - (monsterState.multiplier * playerState.level)
        }
      }
    }
  }
}

const inventoryEquip = (inventoryItem) => {
  return (playerState) => {
    console.log(playerState)
    if (playerState.inventory.includes(inventoryItem())) {
      playerState(inventoryItem)
      return {
        ...playerState
      }
    }
  }
}



// Functions built with factories

const changeExperience = changeState("experience");
const changeHealth = changeState("health");
const changeWisdom = changeState("wisdom");
const changeStrength = changeState("strength");
const changeCreativity = changeState("creativity");
const changeMoney = changeState("money");

// Inventory Items
const paintbrush = changeCreativity(2);
const sword = changeStrength(2);
const mortarPestle = changeWisdom(2);
const crazyHair = changeCreativity(2);

// Characters
const painter = storeState( {level: 1, experience: 10, health:10, wisdom:7, strength:5, creativity:9, money:2, inventory: [paintbrush]} );
const knight = storeState( {level: 1, experience: 2, health:10, wisdom:4, strength:9, creativity:3, money:9, inventory: [sword]} );
const alchemist = storeState( {level: 1, experience: 1, health:10, wisdom:8, strength:4, creativity:9, money:5, inventory: [mortarPestle]} );
const inventor = storeState( {level: 1, experience: 1, health:10, wisdom:10, strength:6, creativity:9, money:3, inventory: [crazyHair]} );


// Health
const elixir = changeHealth(1);
const ratBite = changeHealth(-1);
const plague = changeHealth(-5);

// Strength
const featOfStrength = changeStrength(1);
const snakeBite = changeStrength(-2);

// Wisdom
const pizza = changeTwoStateProps("strength")("wisdom")(5)(5);
const sleepDeprivation = changeWisdom(-2);
const wine = changeTwoStateProps("wisdom")("creativity")(-1)(1);

// Battles
const automatonBattle = monsterBattle(automaton())("creativity");


// const newAutomatonBattle = automatonBattle(painter());
// console.log(newAutomatonBattle);
//const painterLevelUp = levelUp(painter());
//console.log(painterLevelUp);
// console.log(knight(wine));
//console.log(knight(pizza));
const painterWithBrush = inventoryEquip(paintbrush)(painter());
console.log(painterWithBrush());