var game_state = [[true, true],[true, false], [true, true, true]]
  
  function generateTable(table, game) {
    game.forEach(minigame => {
        let row = table.insertRow();
        minigame.forEach(state => {
            let cell = row.insertCell();
            var myGameArea = {
                canvas : document.createElement("canvas"),
                start : function() {
                  this.canvas.width = 100;
                  this.canvas.height = 50;
                  this.context = this.canvas.getContext("2d");
                //    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                // document.body.insertBefore(this.canvas, cell);
                //   this.interval = setInterval(updateGameArea, 20);
                },
                clear : function() {
                  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                }
              }


              function component(width, height, color, x, y) {
                this.width = width;
                this.height = height;
                this.x = x;
                this.y = y;
                this.update = function(){
                  ctx = myGameArea.context;
                  ctx.fillStyle = color;
                  ctx.fillRect(this.x, this.y, this.width, this.height);
                }
              }
              
              function updateGameArea() {
                myGameArea.clear();
                myGamePiece.update();
              }




            // let text = document.createTextNode(element[key]);
            // cell.appendChild(text);
            cell.appendChild(myGameArea.canvas); 
            myGamePiece = new component(30, 30, "red", 10, 120);
            myGameArea.start();
        });
    });
  }

let table = document.querySelector("table");
generateTable(table, game_state); 