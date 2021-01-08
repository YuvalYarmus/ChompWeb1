var game_state = [[true, true],[true, false], [true, true, true]]
  
  function generateTable(table, game) {
    game.forEach(minigame => {
        let row = table.insertRow();
        minigame.forEach(state => {
            let cell = row.insertCell();
            let canvas = document.createElement("canvas")
            canvas.width = 100;
            canvas.height = 50;
            let ctx = canvas.getContext("2d");

            function printMousePos(event) {
                console.log(`ClientX: ${Mouse.x}, ClientY: ${Mouse.y}`)
            }
            
            const Mouse = {
                x: null,
                y: null 
            }
            
            canvas.addEventListener("mousemove", (event) => {
                Mouse.x = event.x;
                Mouse.y = event.y;
            })
            
            canvas.addEventListener("click", printMousePos)


            cell.appendChild(canvas); 

        });
    });
  }

let table = document.querySelector("table");
generateTable(table, game_state); 
