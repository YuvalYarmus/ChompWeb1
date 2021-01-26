"use strict";
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
class GameStateObject {
    constructor() {
        this.array = [];
        this.shapes = [];
    }
}
class Game {
    constructor() {
        this.turns = 0; // if turns % 2 === 0 than it is player 1, if not - player 2
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        // this.globalGameState = {
        //   array: [],
        //   shapes: []
        // };
        this.globalGameState = new GameStateObject();
        window.addEventListener("resize", () => {
            this.drawShapes(this.globalGameState.shapes);
        });
        this.canvas.addEventListener('click', (e) => {
            const CANVASpos = this.getMousePos(e);
            console.log(`CLICK CLICK, SHAPES IS ${this.globalGameState.shapes}`);
            for (const circle of this.globalGameState.shapes) {
                if (this.isIntersect(CANVASpos, circle) === true) {
                    if (circle.i === this.globalGameState.array.length - 1 && circle.j === 0) {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        console.log("THE GAME HAS ENDED");
                        document.getElementById("Holder").textContent = `The game has ended in ${this.turns} turns, Player ${this.turns % 2 == 0 ? 2 : 1} won! `;
                        break;
                    }
                    else {
                        this.turns++;
                        console.log(`turns was updated. now it is ${this.turns}`);
                        this.globalGameState.array = this.updateGameState(this.globalGameState.array, circle);
                        this.updateShapesDrawStateByArray();
                        //drawGameState(global_game_state);
                        this.drawShapes(this.globalGameState.shapes);
                    }
                }
            }
        });
        window.addEventListener("load", this.promptGameState);
    }
    promptGameState() {
        var _a, _b;
        console.log(`globalGameState is ${this.globalGameState}`);
        console.log(`globalGameState.array is ${this.globalGameState.array} with len ${this.globalGameState.array.length}`);
        let n = parseInt((_a = prompt("Please enter the amount of rows you want ")) !== null && _a !== void 0 ? _a : "8");
        let m = parseInt((_b = prompt("Please enter the amount of columns you want ")) !== null && _b !== void 0 ? _b : "5");
        let arr = [];
        if (n != null && m != null) {
            for (let i = 0; i < n; i++) {
                //let arr2 = []
                arr.push([]); //arr[i] = [];
                this.globalGameState.array.push([]); //this.global_game_state.array[i] = []
                for (let j = 0; j < m; j++) {
                    arr[i].push(true); // arr[i][j] = true;
                    this.globalGameState.array[i].push(true); // this.global_game_state.array[i][j] = true;
                }
                console.log(`arr is now ${arr}\n`);
            }
            console.log(`\n\n`);
            //drawGameState(arr)
            this.createShapesByArray(arr);
        }
    }
    updateGameStateArray(gameStateArray) {
        this.globalGameState.array = gameStateArray;
    }
    updateGameStateShapes(gameStateShapes) {
        this.globalGameState.shapes = gameStateShapes;
    }
    fitShapesToCanvas(height, width, rows, shapes_in_row) {
        const currGameState = this.globalGameState.array;
        let shapes = [];
        // for a game in which width is smaller than height
        if (height > width) {
            console.log(`height mode\n`);
            // we wish to leave 10% of the canvas for empty space padding
            let xI = Math.round(width * 0.1 / (shapes_in_row + 1)), xF = Math.round(width - xI);
            const r = width * 0.9 / (2 * shapes_in_row);
            let yI = Math.round(height * 0.1 / (rows + 1)), yF = Math.round(height - yI);
            for (let i = currGameState.length - 1; i >= 0; i--) {
                const curr_row = currGameState[i];
                for (let j = 0; j < curr_row.length; j++) {
                    let curr_shape = curr_row[j];
                    if (curr_shape != null && curr_shape === true) {
                        const x = Math.round(xI + r + j * (2 * r + xI));
                        const y = Math.round(yI + r + i * (2 * r + yI));
                        let shape = new Shape(x, y, r, i, j, true);
                        shapes.push(shape);
                    }
                }
            }
        }
        else {
            console.log(`width mode\n`);
            console.log(`curr game state is ${currGameState} len is ${currGameState.length}`);
            let xI = Math.round(width * 0.1 / (shapes_in_row + 1)), xF = Math.round(width - xI);
            let yI = Math.round(height * 0.1 / (rows + 1)), yF = Math.round(height - yI);
            const r = height * 0.9 / (rows > shapes_in_row ? (2 * rows) : (shapes_in_row * 2));
            for (let i = currGameState.length - 1; i >= 0; i--) {
                const curr_row = currGameState[i];
                console.log(`curr row in i[${i}] is [${curr_row}]`);
                for (let j = 0; j < curr_row.length; j++) {
                    let curr_shape = curr_row[j];
                    console.log(`curr shape in i[${i}] j[${j}] is [${curr_row[j]}]`);
                    if (curr_shape != null && curr_shape === true) {
                        const x = Math.round(xI + r + j * (2 * r + xI));
                        const y = Math.round(yI + r + i * (2 * r + yI));
                        let shape = new Shape(x, y, r, i, j, true);
                        shapes.push(shape);
                    }
                }
            }
        }
        this.updateGameStateShapes(shapes);
        return shapes;
    }
    createShapesByArray(currGameState) {
        // this could should only run once in the beginning of each game
        // it sets all values to true
        // to change the shapes from true please use the updateShapesDrawStateByArray
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = Math.round((window.innerHeight - window.innerHeight * 0.1 - 30));
        canvas.width = Math.round((window.innerWidth - window.innerWidth * 0.1 - 30));
        console.log(`curr game state array is ${currGameState}`);
        let shapes = [];
        var rows = currGameState.length;
        var shapes_in_row = currGameState[currGameState.length - 1].length;
        console.log(`shapes in row is ${shapes_in_row}`);
        shapes = this.fitShapesToCanvas(canvas.height, canvas.width, rows, shapes_in_row);
        this.drawShapes(shapes);
    }
    updateShapesDrawStateByArray() {
        for (const circle of this.globalGameState.shapes) {
            circle.shouldDraw = this.globalGameState.array[circle.i][circle.j];
        }
    }
    drawShapesByGameState(currGameState) {
        console.log(`shapes is ${currGameState.shapes}`);
        for (const circle of currGameState.shapes) {
            if (circle.shouldDraw) {
                this.ctx.beginPath();
                this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = "black";
                this.ctx.fill();
            }
        }
    }
    drawShapes(shapes = this.globalGameState.shapes) {
        console.log(`shapes is ${shapes}`);
        for (const circle of shapes) {
            if (circle.shouldDraw) {
                this.ctx.beginPath();
                this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = "black";
                this.ctx.fill();
            }
        }
    }
    updateGameState(currGameState, circle) {
        // all shapes above and to the right should be turned to false
        console.log(`\ncircle is: ${circle.id} with x: ${circle.x} and y: ${circle.y}\n`);
        for (let i = 0; i <= circle.i; i++) {
            console.log(`curr game state in row ${i} ${currGameState[i]}`);
            let curr_row = currGameState[i];
            for (let j = curr_row.length - 1; j >= circle.j; j--) {
                console.log(`curr game state in shape ${j} ${currGameState[i][j]}`);
                curr_row[j] = false;
            }
        }
        return currGameState;
    }
    isIntersect(point, circle) {
        const distance = Math.sqrt(Math.pow((point.x - circle.x), 2) + Math.pow((point.y - circle.y), 2));
        return distance < circle.radius;
    }
    getMousePos(e) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            rectX: rect.x,
            eveX: e.pageX,
            rectY: rect.y,
            eveY: e.pageY,
        };
    }
}
console.clear();
const windowGame = new Game();
