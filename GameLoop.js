// rules to game_state array: 
// all the inner arrays must be in the same length
// deleting a shape can be executed by changing its position to false and than redrawing
//var global_game_state = [[true, true, false, false],[true, true, false, false], [true, true, true, true], [true, false, true, true]]
var global_game_state = [];
var turns = 0; // if turns % 2 === 0 than it is player 1, if not - player 2


// window.addEventListener("load", PromptGameState); 
// window.addEventListener("resize", DrawGameState(global_game_state) ); 

window.addEventListener("resize", PromptGameState()); 

function PromptGameState() {
  var matrix = [];
  for(var i=0; i<9; i++) {
      matrix[i] = [];
      for(var j=0; j<9; j++) {
          matrix[i][j] = undefined;
      }
  }

  let  n = prompt("Please enter the amount of rows you want ");
  let m = prompt("Please enter the amount of columns you want ");
  let arr = []
  if (n != null && m != null) {
    for (let i = 0; i < n; i++) {
      //let arr2 = []
      arr[i] = []; 
      global_game_state[i] = []
      for (let j = 0; j < m; j++) {
        arr[i][j] = true; 
        global_game_state[i][j] = true; 
      }
      //arr.push(arr2)
      //global_game_state.push(arr2);
      console.log(`arr is now ${arr}\n`) 
    }
    console.log(`\n\n`)
    DrawGameState(arr)
  }
}


function DrawGameState(curr_game_state) {
    const canvas = document.getElementById("canvas");   
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = Math.round( (window.innerHeight - window.innerHeight * 0.1-30) ) ; 
    
    canvas.width = Math.round( (window.innerWidth - window.innerWidth * 0.1-30) ) ; 

    console.log(`curr game state is ${curr_game_state}`)
    var shapes = []; 
    var rows = curr_game_state.length; 
    var shapes_in_row = curr_game_state[curr_game_state.length - 1].length; 
    console.log(`shapes in row is ${shapes_in_row}`)
    // starting from the buttom left corner

    // for a game in which width is smaller than height
    if (canvas.height > canvas.width) {
        console.log(`height mode\n`)
        // we wish to leave 10% of the canvas for empty space padding
        let xI = Math.round(canvas.width * 0.1 / (shapes_in_row + 1)), xF = Math.round(canvas.width - xI);
        r = canvas.width * 0.9 / (2 * shapes_in_row); 
        
        let yI = Math.round(canvas.height * 0.1 / (rows + 1)), yF = Math.round(canvas.height - yI)
        
        for (let i = curr_game_state.length - 1; i >= 0; i--) {
            
            curr_row = curr_game_state[i];
            for (let j = 0; j < curr_row.length; j++) {
                curr_shape = curr_row[j];
                if (curr_shape != null && curr_shape === true) {
                    let shape = {
                        
                        x: Math.round( xI + r + j *(2*r + xI) ), 
                        y: Math.round( yI +  r + i *(2*r + yI) ), 
                        
                        radius: r,
                        id: `${i}-${j}`
                    }
                    
                    shapes.push(shape)
                }
            }
            
        }
    }
    else {
        console.log(`width mode\n`)
        console.log(`curr game state is ${curr_game_state} len is ${curr_game_state.length}`)
        let xI = Math.round(canvas.width * 0.1 / (shapes_in_row + 1)), xF = Math.round(canvas.width - xI);
        let yI = Math.round(canvas.height * 0.1 / (rows + 1)), yF = Math.round(canvas.height - yI);
        rows > shapes_in_row? r = canvas.height * 0.9 / (2*rows) : r = canvas.height * 0.9 / (shapes_in_row *2); 
        
        for (let i = curr_game_state.length - 1; i >= 0; i--) {
            curr_row = curr_game_state[i];
            console.log(`curr row in i[${i}] is [${curr_row}]`)
            for (let j = 0; j < curr_row.length; j++) {
                curr_shape = curr_row[j];
                console.log(`curr shape in i[${i}] j[${j}] is [${curr_row[j]}]`)
                if (curr_shape != null && curr_shape === true) {
                    let shape = {
                        x: Math.round( xI + r + j *(2*r + xI) ), 
                        y: Math.round( yI + r + i *(2*r + yI) ), 
                        radius: r,
                        id: `${i}-${j}`,
                        i: i,
                        j: j
                    }
                    shapes.push(shape)
                }
            }
            
        }
    } 

    console.log(`shapes is ${shapes}`)
    shapes.forEach( circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        // console.log(`\ncircle is: ${circle.id} with x: ${circle.x} and y: ${circle.y}\n`)
        ctx.fillStyle = "black";
        ctx.fill();
    })

    canvas.addEventListener('click', (e) => {
        const CANVASpos = getMousePos(canvas, e);
        shapes.forEach(circle => {
          if (isIntersect(CANVASpos, circle) === true) {
            //DrawGameState( UpdateGameState(curr_game_state, circle ))
            if (circle.i === rows - 1 && circle.j === 0) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              //document.getElementById("Holder").textContent += " this has just been added";
              console.log("THE GAME HAS ENDED")
              turns % 2 == 0? document.getElementById("Holder").textContent += `The game has ended in ${turns} turns, Player 2 won! ` :
              document.getElementById("Holder").textContent += `The game has ended in ${turns} turns, Player 1 won! `
            }
            else {
              turns++; 
              console.log(`turns was updated. now it is ${turns}`)
              global_game_state = UpdateGameState(curr_game_state, circle);
              DrawGameState(global_game_state); 
            }
            
          } 
        });
      });
}

function UpdateGameState(curr_game_state, circle) {
  // all shapes above and to the right should be turned to false
  console.log(`\ncircle is: ${circle.id} with x: ${circle.x} and y: ${circle.y}\n`); 
  for (let i = 0; i <= circle.i; i++) {
    console.log(`curr game state in row ${i} ${curr_game_state[i]}`)
    curr_row = curr_game_state[i];
    for (let j = curr_row.length - 1; j >= circle.j; j--) {
        console.log(`curr game state in shape ${j} ${curr_game_state[i][j]}`)
        curr_row[j] = false; 
    }
  }
  return curr_game_state; 
}

function isIntersect(point, circle) {
    distance = Math.sqrt( Math.pow((point.x - circle.x), 2) + Math.pow((point.y - circle.y), 2) )
    return distance < circle.radius; 
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