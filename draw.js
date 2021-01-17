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

function Draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = Math.round( (window.innerHeight - window.innerHeight * 0.1-30) ) ; 
    alert(`[${canvas.getBoundingClientRect().x}] | [${canvas.width}]-- [${canvas.getBoundingClientRect().y}] | [${canvas.height}]`); 
    canvas.width = Math.round( (window.innerWidth - window.innerWidth * 0.1-30) ) ; 

    const circles = [
        {
          x: (canvas.width / 2),
          y: (canvas.height / 4- 5),
          radius: (canvas.height / 4- 10),
          color: 'rgb(255,0,0)',
          id: "red"
        },
        {
            x: ( (canvas.width / 2) ), 
            y: ( (canvas.height / 4 * 3 + 5) ),
            radius: ( (canvas.height / 4 - 10) ) ,
            color: 'rgb(0,255,0)',
            id: "green"
        }, 
        {
          x: 25, 
          y: 25, 
          radius: 15, 
          color: "blue", 
          id: "blue"
        }
      ];
      
        circles.forEach(circle => {
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = circle.color;
          ctx.fill();

        
      });

      canvas.addEventListener('click', (e) => {
        const CANVASpos = getMousePos(canvas, e);
        circles.forEach(circle => {
          if (isIntersect(CANVASpos, circle)) alert('click on circle: ' + circle.id);
        });
      });
}
