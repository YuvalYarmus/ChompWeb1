

// rules to game_state array: 
// all the inner arrays must be in the same length
// deleting a shape can be executed by changing its position to false and than redrawing
var game_state = [[true, true, false],[true, true, false], [true, true, true], [true, false, true]]

var turns = 0; // if turns % 2 === 0 than it is player 1, if not - player 2

window.addEventListener("load", function(){
    DrawGameState(game_state)
});
// window.addEventListener("load", DrawGameState(game_state) ); 
window.addEventListener("resize", DrawGameState(game_state) ); 

function DrawGameState(curr_game_state) {
    console.log(`curr game state is ${curr_game_state}`)
    console.log(`game state is ${game_state}, length is ${game_state.length}`)
    const canvas = document.getElementById("canvas");   
    const ctx = canvas.getContext("2d");
    canvas.height = Math.round( (window.innerHeight - window.innerHeight * 0.1-30) ) ; 
    //alert(`[${canvas.getBoundingClientRect().x}] | [${canvas.width}]-- [${canvas.getBoundingClientRect().y}] | [${canvas.height}]`); 
    canvas.width = Math.round( (window.innerWidth - window.innerWidth * 0.1-30) ) ; 

    let shapes = []; 
    let rows = curr_game_state.length; 
    let shapes_in_row = curr_game_state[curr_game_state.length - 1].length; 
    // starting from the buttom left corner

    // for a game in which width is smaller than height
    if (canvas.height > canvas.width) {
        // we wish to leave 10% of the canvas for empty space padding
        let xI = Math.round(canvas.width * 0.1 / (shapes_in_row + 1)), xF = Math.round(canvas.width - xI), r = canvas.width * 0.9 / (2*shapes_in_row);
        // 2r = canvas.width * 0.9 / n
        let yI = Math.round(canvas.height * 0.1 / (rows + 1)), yF = Math.round(canvas.height - yI)
        for (let i = curr_game_state.length - 1; i >= 0; i--) {
            console.log(`curr game state in position ${i} ${curr_game_state[i]}`)
            curr_row = curr_game_state[i];
            for (let j = 0; j < curr_row.length; j++) {
                curr_shape = curr_row[j];
                if (curr_shape != null && curr_shape === true) {
                    let shape = {
                        // x: Math.round( (window.innerWidth - window.innerWidth * 0.1-30) ),
                        x: Math.round( xI + j *(2*r + xI) ), 
                        y: Math.round( yI + i *(2*r + yI) ), 
                        //radius: Math.floor( canvas.width * 0.9 / (2n) )
                        radius: r,
                        id: `${i}-${j}`
                    }
                    shapes.push(shape)
                }
            }
            
        }
    }
    else {
        let xI = Math.round(canvas.width * 0.1 / (shapes_in_row + 1)), xF = Math.round(canvas.width - xI);
        // 2r = canvas.width * 0.9 / n
        let yI = Math.round(canvas.height * 0.1 / (rows + 1)), yF = Math.round(canvas.height - yI), r = canvas.height * 0.9 / (2*rows); 
        for (let i = curr_game_state.length - 1; i >= 0; i--) {
            console.log(`curr game state in position ${i} ${curr_game_state[i]}`)
            curr_row = curr_game_state[i];
            for (let j = 0; j < curr_row.length; j++) {
                curr_shape = curr_row[j];
                if (curr_shape != null && curr_shape === true) {
                    let shape = {
                        // x: Math.round( (window.innerWidth - window.innerWidth * 0.1-30) ),
                        x: Math.round( xI + r + j *(2*r + xI) ), 
                        y: Math.round( yI + r + i *(2*r + yI) ), 
                        //radius: Math.floor( canvas.width * 0.9 / (2n) )
                        radius: r,
                        id: `${i}-${j}`
                    }
                    shapes.push(shape)
                }
            }
            
        }
    }



    shapes.forEach( circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        console.log(`\ncircle is: ${circle.id} with x: ${circle.x} and y: ${circle.y}\n`)
        ctx.fillStyle = "black";
        ctx.fill();
    })
    canvas.addEventListener('click', (e) => {
        const CANVASpos = getMousePos(canvas, e);
        shapes.forEach(circle => {
          if (isIntersect(CANVASpos, circle)) alert(`clicked circel: id[${circle.id}] x[${circle.x}] y[${circle.y}]`);
        });
      });
    // game_state.forEach(row => {
    //     row.forEach(shape => {
    //         if (shape != null && shape === true) {
                
    //         }
    //     });
    // });
}

function UpdateGameState() {

}

function isIntersect(point, circle) {
    distance = Math.sqrt( Math.pow((point.x - circle.x), 2) + Math.pow((point.y - circle.y), 2) )
    return distance <= circle.radius; 
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

function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left, 
    y: e.clientY - rect.top,
    rectX: rect.x, 
    eveX: e.pageX,
    rectY: rect.y, 
    eveY: e.pageY,
  }
}

// window.addEventListener("load", Draw ); 
// window.addEventListener("resize", Draw ); 


