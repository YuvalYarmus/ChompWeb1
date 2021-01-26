interface point {
  x: number;
  y: number,
  rectX: number,
  eveX: number,
  rectY: number,
  eveY: number,
}

class Shape {
  id: string;
  x: number;
  y: number;
  radius: number;
  i: number;
  j: number;
  shouldDraw: boolean;

  constructor(x: number, y: number, radius: number, i: number, j: number, shouldDraw = true) {
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

type boolState = boolean[][];

interface GameState {
  array: boolState,
  shapes: Shape[]
}

class GameStateObject implements GameState {
  array: boolState = [];
  shapes: Shape[] = [];
}

class Game {

  // rules to game_state array: 
  // all the inner arrays must be in the same length
  // deleting a shape can be executed by changing its position to false and than redrawing
  //var global_game_state = [[true, true, false, false],[true, true, false, false], [true, true, true, true], [true, false, true, true]]
  
  globalGameState: GameState = {
    array: [],
    shapes: []
  };
  color: string; 
  turns = 0; // if turns % 2 === 0 than it is player 1, if not - player 2

  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = this.canvas.getContext("2d")!;


  constructor() {
    if ( window.matchMedia('(prefers-color-scheme: dark)').matches) {
      //document.documentElement.classList.add('dark')
      this.color = "#dbdbdb"
    }
    else this.color = "black"; 
    console.log("\n\n"); this.printState(); console.log("\n\n"); this.printState();

    window.addEventListener("resize", () => {
      console.log(`resize triggered. width: ${window.innerWidth}, height: ${window.innerHeight} `)
      this.canvas.height = Math.round((window.innerHeight - window.innerHeight * 0.1 - 30));
      this.canvas.width = Math.round((window.innerWidth - window.innerWidth * 0.1 - 30));
      this.fitShapesToCanvas(this.canvas.height, this.canvas.width, this.globalGameState.array.length, this.globalGameState.array[0].length);
      this.drawShapes(this.globalGameState.shapes)
    });
    this.canvas.addEventListener('click', (e) => {
      const CANVASpos = this.getMousePos(e);
      console.log(`CLICK CLICK, SHAPES IS ${this.globalGameState.shapes}`)
      for (const circle of this.globalGameState.shapes) {
        if (this.isIntersect(CANVASpos, circle) === true) {
          if (circle.i === this.globalGameState.array.length - 1 && circle.j === 0) {
            this.turns++;
            this.globalGameState.array = this.updateGameState(this.globalGameState.array, circle);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            console.log("THE GAME HAS ENDED")
            document.getElementById("Holder")!.textContent = `The game has ended in ${this.turns} turns, Player ${this.turns % 2 == 0 ? 2 : 1} won! `;
            break;
          }
          else {
            this.turns++;
            console.log(`turns was updated. now it is ${this.turns}`)
            this.globalGameState.array = this.updateGameState(this.globalGameState.array, circle);
            this.updateShapesDrawStateByArray();
            this.drawShapes(this.globalGameState.shapes);
          }

        }
      }
    });
    window.addEventListener("load", () => this.promptGameState());
  }
  printState() {
    console.log(`globalGameState is ${this.globalGameState}`);
    console.log(`globalGameState.array is ${this.globalGameState.array} with len ${this.globalGameState.array.length}`);
  }
  promptGameState() {
    let n = (prompt("Please enter the amount of rows you want ") || 8);
    let m = (prompt("Please enter the amount of columns you want ") || 5);
    let arr: boolean[][] = []
    if (n != null && m != null) {
      for (let i = 0; i < n; i++) {
        arr.push([]); 
        this.globalGameState.array.push([])  
        for (let j = 0; j < m; j++) {
          arr[i].push(true); 
          this.globalGameState.array[i].push(true)  
        }
      }
      console.log(`\n\n`)
      this.createShapesByArray(arr)
    }
  }


  updateGameStateArray(gameStateArray: boolState) {
    this.globalGameState.array = gameStateArray;
  }

  updateGameStateShapes(gameStateShapes: Shape[]) {
    this.globalGameState.shapes = gameStateShapes;
  }


  fitShapesToCanvas(height: number, width: number, rows: number, shapes_in_row: number) {
    const currGameState = this.globalGameState.array;
    let shapes = [];
    // for a game in which width is smaller than height
    if (height > width) {
      console.log(`height mode\n`)
      // we wish to leave 10% of the canvas for empty space padding
      let xI = Math.round(width * 0.1 / (shapes_in_row + 1)), xF = Math.round(width - xI);
      const r = width * 0.9 / (2 * shapes_in_row);

      let yI = Math.round(height * 0.1 / (rows + 1)), yF = Math.round(height - yI)

      for (let i = currGameState.length - 1; i >= 0; i--) {

        const curr_row = currGameState[i];
        for (let j = 0; j < curr_row.length; j++) {
          let curr_shape = curr_row[j];
          if (curr_shape != null) {
            const x = Math.round(xI + r + j * (2 * r + xI));
            const y = Math.round(yI + r + i * (2 * r + yI));
            let shape = new Shape(x, y, r, i, j, curr_shape);
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
      const r = height * 0.9 / (rows > shapes_in_row ? (2 * rows) : (shapes_in_row * 2));
      for (let i = currGameState.length - 1; i >= 0; i--) {
        const curr_row = currGameState[i];
        console.log(`curr row in i[${i}] is [${curr_row}]`)
        for (let j = 0; j < curr_row.length; j++) {
          let curr_shape = curr_row[j];
          console.log(`curr shape in i[${i}] j[${j}] is [${curr_row[j]}]`)
          if (curr_shape != null && curr_shape === true) {
            const x = Math.round(xI + r + j * (2 * r + xI));
            const y = Math.round(yI + r + i * (2 * r + yI))
            let shape = new Shape(x, y, r, i, j, true);
            shapes.push(shape)
          }
        }

      }

    }
    this.updateGameStateShapes(shapes)
    return shapes;
  }


  createShapesByArray(currGameState: boolState) {
    // this could should only run once in the beginning of each game
    // it sets all values to true
    // to change the shapes from true please use the updateShapesDrawStateByArray

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.height = Math.round((window.innerHeight - window.innerHeight * 0.1 - 30));

    this.canvas.width = Math.round((window.innerWidth - window.innerWidth * 0.1 - 30));

    let shapes = [];
    var rows = currGameState.length;
    var shapes_in_row = currGameState[currGameState.length - 1].length;

    shapes = this.fitShapesToCanvas(this.canvas.height, this.canvas.width, rows, shapes_in_row);

    this.drawShapes(shapes);
  }

  updateShapesDrawStateByArray() {
    for (const circle of this.globalGameState.shapes) {
      circle.shouldDraw = this.globalGameState.array[circle.i][circle.j]
    }
  }


  drawShapesByGameState(currGameState: GameState) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const circle of currGameState.shapes) {
      if (circle.shouldDraw) {
        this.ctx.beginPath();
        this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
      }
    }
  }

  drawShapes(shapes: Shape[] = this.globalGameState.shapes) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(`shapes is ${shapes} \nin draw shapes\n`)
    for (const circle of shapes) {
      if (circle.shouldDraw === true) {
        this.ctx.beginPath();
        this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        // this.ctx.fillStyle = "black";
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
      }
      else console.log("there is a false draw")
    }
  }


  updateGameState(currGameState: boolState, circle: Shape) {
    // all shapes above and to the right should be turned to false
    console.log(`\ncircle is: ${circle.id} with x: ${circle.x} and y: ${circle.y}\n`);
    for (let i = 0; i <= circle.i; i++) {
      console.log(`curr game state in row ${i} ${currGameState[i]}`)
      let curr_row = currGameState[i];
      for (let j = curr_row.length - 1; j >= circle.j; j--) {
        console.log(`curr game state in shape ${j} ${currGameState[i][j]}`)
        curr_row[j] = false;
      }
    }
    return currGameState;
  }

  isIntersect(point: point, circle: Shape) {
    const distance = Math.sqrt(Math.pow((point.x - circle.x), 2) + Math.pow((point.y - circle.y), 2))
    return distance < circle.radius;
  }

  getMousePos(e: MouseEvent) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      rectX: rect.x,
      eveX: e.pageX,
      rectY: rect.y,
      eveY: e.pageY,
    }
  }

}

console.clear();
const windowGame = new Game(); 