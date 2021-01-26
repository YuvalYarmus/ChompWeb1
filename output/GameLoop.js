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
class Game {
    constructor() {
        // rules to game_state array: 
        // all the inner arrays must be in the same length
        // deleting a shape can be executed by changing its position to false and than redrawing
        //var global_game_state = [[true, true, false, false],[true, true, false, false], [true, true, true, true], [true, false, true, true]]
        this.global_game_state = {
            array: [],
            shapes: [],
        };
        this.turns = 0; // if turns % 2 === 0 than it is player 1, if not - player 2
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        window.addEventListener("resize", this.promptGameState);
        this.canvas.addEventListener('click', (e) => {
            const CANVASpos = this.getMousePos(e);
            console.log(`CLICK CLICK, SHAPES IS ${this.global_game_state.shapes}`);
            for (const circle of this.global_game_state.shapes) {
                if (this.isIntersect(CANVASpos, circle) === true) {
                    if (circle.i === this.global_game_state.array.length - 1 && circle.j === 0) {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        console.log("THE GAME HAS ENDED");
                        document.getElementById("Holder").textContent = `The game has ended in ${this.turns} turns, Player ${this.turns % 2 == 0 ? 2 : 1} won! `;
                        break;
                    }   
                    else {
                        this.turns++;
                        console.log(`turns was updated. now it is ${this.turns}`);
                        this.global_game_state.array = this.updateGameState(this.global_game_state.array, circle);
                        this.updateShapesDrawStateByArray();
                        //drawGameState(global_game_state);
                        this.drawShapes(this.global_game_state.shapes);
                    }
                }
            }
        });
    }
    promptGameState() {
        var _a, _b;
        let n = parseInt((_a = prompt("Please enter the amount of rows you want ")) !== null && _a !== void 0 ? _a : "8");
        let m = parseInt((_b = prompt("Please enter the amount of columns you want ")) !== null && _b !== void 0 ? _b : "5");
        let arr = [];
        if (n != null && m != null) {
            for (let i = 0; i < n; i++) {
                //let arr2 = []
                arr[i] = [];
                this.global_game_state.array[i] = [];
                for (let j = 0; j < m; j++) {
                    arr[i][j] = true;
                    this.global_game_state.array[i][j] = true;
                }
                console.log(`arr is now ${arr}\n`);
            }
            console.log(`\n\n`);
            //drawGameState(arr)
            this.createShapesByArray(arr);
        }
    }
    updateGameStateArray(gameStateArray) {
        this.global_game_state.array = gameStateArray;
    }
    updateGameStateShapes(gameStateShapes) {
        this.global_game_state.shapes = gameStateShapes;
    }
    fitShapesToCanvas(height, width, rows, shapes_in_row) {
        const currGameState = this.global_game_state.array;
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
        for (const circle of this.global_game_state.shapes) {
            circle.shouldDraw = this.global_game_state.array[circle.i][circle.j];
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
    drawShapes(shapes) {
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
const windowGame = new Game();
