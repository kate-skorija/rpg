// This function stores our state.

const storeState = (initialState) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const painter = storeState( {health:10, wisdom:7, strength:5, creativity:9, money:2} );
const knight = storeState( {health:10, wisdom:4, strength:9, creativity:3, money:9} );
const alchemist = storeState( {health:10, wisdom:8, strength:4, creativity:9, money:5} ) ;
const inventor = storeState( {health:10, wisdom:10, strength:6, creativity:9, money:3} );

// Function Factories

const changeState = (prop) => {
  return (value) => {
    return (state) => {
      if (state[prop] + value <= 10) {
        return{
        ...state,
        [prop]: (state[prop] || 0) + value
        } 
      } else {
        return {
          ...state,
          [prop]: (state[prop]) = 10
        }
      }
    }
  }
}

// const changeState = (prop) => {
//   return (value) => {
//     return (state) => ({...state,
//     [prop]: (state[prop] || 0) + value})
//   }
// }

const changeTwoStateProps = (prop) => {
  return (prop2) => {
    return (value) => {
      return (value2) => {
        return (state) => ({
          ...state,
          [prop] : (state[prop] || 0) + value,
          [prop2] : (state[prop2] || 0) + value2
        }) 
      }
    }
  }
}

const changeHealth = changeState("health");
const changeWisdom = changeState("wisdom");
const changeStrength = changeState("strength");
const changeCreativity = changeState("creativity");
const changeMoney = changeState("money");
const wine = changeTwoStateProps("wisdom")("creativity")(-1)(1);
  
const pizza = changeWisdom(5);
console.log(knight(pizza));
console.log(knight(pizza));