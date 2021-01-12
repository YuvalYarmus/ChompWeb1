const n; // number of shapes in each row
const m; // number of columns 
// the shapes array has m rows with n shapes in each row => n*m

// rules to game_state array: 
// all the inner arrays must be in the same length
// deleting a shape can be executed by changing its position to false and than redrawing
var game_state = [[true, true, false],[true, true, false], [true, true, true]]

function CreateGameState(n, m) {
    var game_state = new Array(m);
    game_state.forEach(row => {
        row = new Array(n); 
        row.forEach(cell => {
            cell = true; 
        })
    });
    return game_state; 
}

function DrawGame(n, m) {
    let game_state = CreateGameState(n,m); 

}

function DrawGame(game_state) {
    var shapes_array = [,]
}
