// rules to game_state array: 
// all the inner arrays must be in the same length
// deleting a shape can be executed by changing its position to false and than redrawing
//var global_game_state = [[true, true, false, false],[true, true, false, false], [true, true, true, true], [true, false, true, true]]

var global_game_state = {
  array: [],
  shapes: [],
};

let turns = 0; // if turns % 2 === 0 than it is player 1, if not - player 2

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("resize", promptGameState());

canvas.addEventListener('click', (e) => {
  const CANVASpos = getMousePos(canvas, e);
  console.log(`CLICK CLICK, SHAPES IS ${global_game_state.shapes}`)
  for (const circle of global_game_state.shapes) {
    if (isIntersect(CANVASpos, circle) === true) {
      if (circle.i === global_game_state.array.length - 1 && circle.j === 0) {
        ctx.clearRect(0, 0, width, height);
        console.log("THE GAME HAS ENDED")
        document.getElementById("Holder").textContent = `The game has ended in ${turns} turns, Player ${turns % 2 == 0 ? 2 : 1} won! `;
        break;
      }
      else {
        turns++;
        console.log(`turns was updated. now it is ${turns}`)
        global_game_state.array = updateGameState(global_game_state.array, circle);
        updateShapesDrawStateByArray();
        //drawGameState(global_game_state);
        drawShapes(global_game_state.array);
      }

    }
  }
});


function promptGameState() {
  var matrix = [];
  for (var i = 0; i < 9; i++) {
    matrix[i] = [];
    for (var j = 0; j < 9; j++) {
      matrix[i][j] = undefined;
    }
  }

  let n = prompt("Please enter the amount of rows you want ");
  let m = prompt("Please enter the amount of columns you want ");
  let arr = []
  if (n != null && m != null) {
    for (let i = 0; i < n; i++) {
      //let arr2 = []
      arr[i] = [];
      global_game_state.array[i] = []
      for (let j = 0; j < m; j++) {
        arr[i][j] = true;
        global_game_state.array[i][j] = true;
      }
      console.log(`arr is now ${arr}\n`)
    }
    console.log(`\n\n`)
    //drawGameState(arr)
    createShapesByArray(arr)
  }
}


function updateGameStateArray(gameStateArray) {
  window.global_game_state.array = gameStateArray;
}

function updateGameStateShapes(gameStateShapes) {
  window.global_game_state.shapes = gameStateShapes;
}

class Shape {
  
  constructor(x, y, radius, i, j, shouldDraw = true) {
    this.id = `${i}-${j}`; 
    this.x = x; 
    this.y = y; 
    this.radius = radius; 
    this.i = i; 
    this.j = j; 
    this.shouldDraw = shouldDraw; 
  }


  toString() {
    return `draw is ${this.shouldDraw}, i is ${this.i}, j is ${this.j}`; 
  }

}



function fitShapesToCanvas(currGameState, height, width, rows, shapes_in_row) {
  let shapes = [];
  // for a game in which width is smaller than height
  if (height > width) {
    console.log(`height mode\n`)
    // we wish to leave 10% of the canvas for empty space padding
    let xI = Math.round(width * 0.1 / (shapes_in_row + 1)), xF = Math.round(width - xI);
    r = width * 0.9 / (2 * shapes_in_row);

    let yI = Math.round(height * 0.1 / (rows + 1)), yF = Math.round(height - yI)

    for (let i = currGameState.length - 1; i >= 0; i--) {

      curr_row = currGameState[i];
      for (let j = 0; j < curr_row.length; j++) {
        curr_shape = curr_row[j];
        if (curr_shape != null && curr_shape === true) {
          let shape = {
            x: Math.round(xI + r + j * (2 * r + xI)),
            y: Math.round(yI + r + i * (2 * r + yI)),
            radius: r,
            id: `${i}-${j}`,
            i: i,
            j: j,
            shouldDraw: true
          }

          shapes.push(shape)
        }
      }
    }
  }
  else {
    console.log(`width mode\n`)
    console.log(`curr game state is ${currGameState} len is ${currGameState.length}`)
    let xI = Math.round(width * 0.1 / (shapes_in_row + 1)), xF = Math.round(width - xI);
    let yI = Math.round(height * 0.1 / (rows + 1)), yF = Math.round(height - yI);
    rows > shapes_in_row ? r = height * 0.9 / (2 * rows) : r = height * 0.9 / (shapes_in_row * 2);

    for (let i = currGameState.length - 1; i >= 0; i--) {
      curr_row = currGameState[i];
      console.log(`curr row in i[${i}] is [${curr_row}]`)
      for (let j = 0; j < curr_row.length; j++) {
        curr_shape = curr_row[j];
        console.log(`curr shape in i[${i}] j[${j}] is [${curr_row[j]}]`)
        if (curr_shape != null && curr_shape === true) {
          let shape = {
            x: Math.round(xI + r + j * (2 * r + xI)),
            y: Math.round(yI + r + i * (2 * r + yI)),
            radius: r,
            id: `${i}-${j}`,
            i: i,
            j: j,
            shouldDraw: true
          }
          shapes.push(shape)
        }
      }

    }

  }
  window.updateGameStateShapes(shapes)
  return shapes;
}


function createShapesByArray(currGameState) {
  // this could should only run once in the beginning of each game
  // it sets all values to true
  // to change the shapes from true please use the updateShapesDrawStateByArray

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.height = Math.round((window.innerHeight - window.innerHeight * 0.1 - 30));

  canvas.width = Math.round((window.innerWidth - window.innerWidth * 0.1 - 30));

  console.log(`curr game state array is ${currGameState.array}`)
  let shapes = [];
  var rows = currGameState.length;
  var shapes_in_row = currGameState[currGameState.length - 1].length;
  console.log(`shapes in row is ${shapes_in_row}`)

  shapes = fitShapesToCanvas(currGameState, canvas.height, canvas.width, rows, shapes_in_row);

  drawShapes(shapes);
}

function updateShapesDrawStateByArray() {
  for (const circle of global_game_state.shapes) {
    circle.shouldDraw = global_game_state.array[circle.i][circle.j]
  }
}


function drawShapesByGameState(currGameState) {
  console.log(`shapes is ${currGameState.shapes}`)
  for (const circle of currGameState.shapes) {
    if (circle.shouldDraw) {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "black";
      ctx.fill();
    }
  }
}

function drawShapes(shapes) {
  console.log(`shapes is ${shapes}`)
  for (const circle of shapes) {
    if (circle.shouldDraw) {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "black";
      ctx.fill();
    }
  }
}











function drawGameState(currGameState) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  height = Math.round((window.innerHeight - window.innerHeight * 0.1 - 30));

  width = Math.round((window.innerWidth - window.innerWidth * 0.1 - 30));

  console.log(`curr game state is ${currGameState}`)
  var shapes = [];
  var rows = currGameState.length;
  var shapes_in_row = currGameState[currGameState.length - 1].length;
  console.log(`shapes in row is ${shapes_in_row}`)
  // starting from the buttom left corner

  // for a game in which width is smaller than height
  if (height > width) {
    console.log(`height mode\n`)
    // we wish to leave 10% of the canvas for empty space padding
    let xI = Math.round(width * 0.1 / (shapes_in_row + 1)), xF = Math.round(width - xI);
    r = width * 0.9 / (2 * shapes_in_row);

    let yI = Math.round(height * 0.1 / (rows + 1)), yF = Math.round(height - yI)

    for (let i = currGameState.length - 1; i >= 0; i--) {

      curr_row = currGameState[i];
      for (let j = 0; j < curr_row.length; j++) {
        curr_shape = curr_row[j];
        if (curr_shape != null && curr_shape === true) {
          let shape = {
            x: Math.round(xI + r + j * (2 * r + xI)),
            y: Math.round(yI + r + i * (2 * r + yI)),
            radius: r,
            id: `${i}-${j}`,
            i: i,
            j: j,
            shouldDraw: true
          }

          shapes.push(shape)
        }
      }
    }
  }
  else {
    console.log(`width mode\n`)
    console.log(`curr game state is ${currGameState} len is ${currGameState.length}`)
    let xI = Math.round(width * 0.1 / (shapes_in_row + 1)), xF = Math.round(width - xI);
    let yI = Math.round(height * 0.1 / (rows + 1)), yF = Math.round(height - yI);
    rows > shapes_in_row ? r = height * 0.9 / (2 * rows) : r = height * 0.9 / (shapes_in_row * 2);

    for (let i = currGameState.length - 1; i >= 0; i--) {
      curr_row = currGameState[i];
      console.log(`curr row in i[${i}] is [${curr_row}]`)
      for (let j = 0; j < curr_row.length; j++) {
        curr_shape = curr_row[j];
        console.log(`curr shape in i[${i}] j[${j}] is [${curr_row[j]}]`)
        if (curr_shape != null && curr_shape === true) {
          let shape = {
            x: Math.round(xI + r + j * (2 * r + xI)),
            y: Math.round(yI + r + i * (2 * r + yI)),
            radius: r,
            id: `${i}-${j}`,
            i: i,
            j: j,
            shouldDraw: true
          }
          shapes.push(shape)
        }
      }

    }
  }

  console.log(`shapes is ${shapes}`)
  shapes.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "black";
    ctx.fill();
  })

  canvas.addEventListener('click', (e) => {
    const CANVASpos = getMousePos(canvas, e);

    for (const circle of shapes) {
      if (isIntersect(CANVASpos, circle) === true) {
        if (circle.i === rows - 1 && circle.j === 0) {
          turns++;
          ctx.clearRect(0, 0, width, height);
          console.log("THE GAME HAS ENDED")
          document.getElementById("Holder").textContent = `The game has ended in ${turns} turns, Player ${turns % 2 == 0 ? 2 : 1} won! `;
          break;
        }
        else {
          turns = turns + 1;
          console.log(`turns was updated. now it is ${turns}`)
          global_game_state = updateGameState(currGameState, circle);
          drawGameState(global_game_state);
        }

      }
    }
  });
}

function updateGameState(currGameState, circle) {
  // all shapes above and to the right should be turned to false
  console.log(`\ncircle is: ${circle.id} with x: ${circle.x} and y: ${circle.y}\n`);
  for (let i = 0; i <= circle.i; i++) {
    console.log(`curr game state in row ${i} ${currGameState[i]}`)
    curr_row = currGameState[i];
    for (let j = curr_row.length - 1; j >= circle.j; j--) {
      console.log(`curr game state in shape ${j} ${currGameState[i][j]}`)
      curr_row[j] = false;
    }
  }
  return currGameState;
}

function isIntersect(point, circle) {
  distance = Math.sqrt(Math.pow((point.x - circle.x), 2) + Math.pow((point.y - circle.y), 2))
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