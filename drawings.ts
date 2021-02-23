// import { GameState, boolState, GameStateObject, Shape } from "./GameLoop";

// function fitShapesToCanvas2(canvas: HTMLCanvasElement, game_state: GameState) {
//   // declaring constants
//   const width = canvas.width, height = canvas.height;
//   const rows = game_state.array.length, shapes_in_row = game_state.array[0].length;

//   // declaring an array that which include all the shapes in the end
//   let shapes = [];

//   // calculating maximum bound radius
//   const r = Math.floor(width > height ? height * 0.9 / (rows > shapes_in_row ? (2 * rows) :
//     (shapes_in_row * 2)) : width * 0.9 / (rows > shapes_in_row ? (2 * rows) : (shapes_in_row * 2)));


//   // calculating the gap between the space the shapes take and space the canvas has
//   const dx = Math.round(width - 2 * r * shapes_in_row);
//   const dy = Math.round(height - 2 * r * rows);

//   // calculating xI - the first x position we can a shape at
//   // and yI - the first y position we can a shape at
//   const xI = Math.round(width - 2 * r * shapes_in_row + r + dx / 2);
//   const yI = Math.round(height - 2 * r * rows + r + dy / 2);

//   // logs
//   console.log(`the radius is [${r}]`);
//   console.log(`dx is [${dx}], dy is [${dy}]`);
//   console.log(`xI is [${xI}], yI is ${yI}`);


//   // creating the shapes
//   for (let i = rows - 1; i >= 0; i--) {

//     const curr_row = game_state.array[i];
//     for (let j = 0; j < curr_row.length; j++) {
//       let curr_shape = curr_row[j];
//       if (curr_shape != null) {
//         const x = Math.round(xI + r + j * (2 * r + xI));
//         const y = Math.round(yI + r + i * (2 * r + yI));
//         let shape = new Shape(x, y, r, i, j, curr_shape);
//         shapes.push(shape)
//       }
//     }
//   }

//   return shapes!;
// }

// module.exports = {
//     fitShapesToCanvas2
//   };

// // export { fitShapesToCanvas2 }; 