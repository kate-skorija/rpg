// This function stores our state.

const storeState = (initialState) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

// Characters

const painter = storeState( {experience: 1, health:10, wisdom:7, strength:5, creativity:9, money:2} );
const knight = storeState( {experience: 2, health:10, wisdom:4, strength:9, creativity:3, money:9} );
const alchemist = storeState( {experience: 0, health:10, wisdom:8, strength:4, creativity:9, money:5} );
const inventor = storeState( {experience: 0, health:10, wisdom:10, strength:6, creativity:9, money:3} );

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
            return{
              ...state,
              [prop] : (state[prop] || 0) + value,
              [prop2] : (state[prop2] || 0) + value2
            }  
          } else if ((state[prop] + value <= 10) && (state[prop2] + value2 > 10)) {
            return{
              ...state,
              [prop] : (state[prop] || 0) + value,
              [prop2] : (state[prop2]) = 10
            }
          } else if ((state[prop] + value > 10) && (state[prop2] + value2 > 10)) {
            return{
              ...state,
              [prop] : (state[prop]) = 10,
              [prop2] : (state[prop2]) = 10
            }
          } else if ((state[prop] + value > 10) && (state[prop2] + value2 <=10)) {
            return{
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

const changeExperience = changeState("experience");
const changeHealth = changeState("health");
const changeWisdom = changeState("wisdom");
const changeStrength = changeState("strength");
const changeCreativity = changeState("creativity");
const changeMoney = changeState("money");

const gainExp = changeExperience(1);

const elixir = changeHealth(1);
const ratBite = changeHealth(-1);
const plague = changeHealth(-5);

const featOfStrength = changeStrength(1);
const snakeBite = changeStrength(-2);

const pizza = changeTwoStateProps("strength")("wisdom")(5)(5);
const sleepDeprivation = changeWisdom(-2);

const wine = changeTwoStateProps("wisdom")("creativity")(-1)(1);

// const changeState = (prop) => {
//   return (value) => {
//     return (state) => ({...state,
//     [prop]: (state[prop] || 0) + value})
//   }
// }

const monsterBattle = (monsterState) => {
  return (playerProp) => {
    return (playerState) => {
      if ((playerState()[playerProp] >= monsterState().damage)) {
        return {
          ...playerState(),
          experience: (playerState().experience) + monsterState().multiplier,
          [playerProp]: (playerState()[playerProp]) + 1
        }
      } else {
        return {
          ...playerState(),
          health: (playerState().health) - (monsterState().multiplier * playerState().experience)
        }
      }
    }
  }
}

const automatonBattle = monsterBattle(automaton)("creativity");

//console.log(painter());
const newAutomatonBattle = automatonBattle(knight);
console.log(newAutomatonBattle);
//console.log(painter());


// console.log(knight(wine));
//console.log(knight(pizza));