var state = [3, 4, 3, 1, 2];
var days = 256;
function updateState(state) {
    var newValues = 0;
    for (var j = 0; j < state.length; j++) {
        if (state[j] === 0) {
            state[j] = 6;
            newValues += 1;
        }
        else {
            state[j] = state[j] - 1;
        }
    }
    // add the new values
    for (var k = 0; k < newValues; k++) {
        state.push(8);
    }
    ;
    return state;
}
var subStateSize = 3;
var subStates = [];
for (var l = 1; (l * subStateSize) <= state.length; l++) {
    var subState = state.slice((l - 1) * subStateSize, l * subStateSize);
    subStates.push(subState);
}
var lengthState = 0;
subStates.forEach(function (subState) {
    for (var i = 0; i < days; i++) {
        updateState(subState);
        lengthState += subState.length;
        console.log(i);
        console.log(lengthState);
    }
    ;
});
// for (let i = 0; i < days; i++) {
//   console.log(i);
//   const state1updated = updateState(state1);
//   lengthState1 = state1updated.length;
//   // console.log(lengthState1);
//   const state2updated = updateState(state2);
//   lengthState2 = state2updated.length;
//   const state3updated = updateState(state3);
//   lengthState3 = state3updated.length;
// };
// console.log(lengthState1 + lengthState2 + lengthState3);
