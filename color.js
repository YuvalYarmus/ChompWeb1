function isIntersect(point, circle) {
    distance = Math.sqrt( Math.pow((point.x - circle.x), 2) + Math.pow((point.y - circle.y), 2) )
    console.log(`canvasX[${point.rectX}] | CanvasY[${point.rectY}] | MouseX[${point.eveX}] | MouseY[${point.eveY}]`)
    console.log(`point is x[${point.x}] y[${point.y}]`)
    console.log(`circle is x[${circle.x}] y[${circle.y}] radius[${circle.radius}] id[${circle.id}]`)
    console.log( "distance is " + distance )
    if (distance <= circle.radius) console.log("true true true true true true true true true true true true true true")
    console.log(`\n`)
    
    return distance <= circle.radius; 
    // return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) <= circle.radius;
  }

  function isNotWhite(mousePos) {
    return getPixelColor(mousePos) != `rgb(0,0,0)`
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
          ctx.fillStyle = "black";
          ctx.fillRect( circle.x - 1, circle.y - 1, 2, 2 );
          ctx.beginPath();
          ctx.moveTo(0, circle.y);
          ctx.fillStyle = "red";

          ctx.lineTo(circle.x, circle.y)
          ctx.beginPath();
          ctx.fillStyle = "black";
          ctx.moveTo(0, 0);
          ctx.lineTo(200, 400 );
        
      });

      canvas.addEventListener('click', (e) => {
        const CANVASpos = getMousePos(canvas, e);
        if ( isNotWhite(CANVASpos) ) {
            closest = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth; 
            closestCircle = null
            circles.forEach(circle => {
                if ( distanceFromCircle(CANVASpos, circle) < closest ) {
                    closest = distanceFromCircle(CANVASpos, circle); 
                    closestCircle = circle; 
                }
                // if (isIntersect(CANVASpos, circle)) alert('click on circle: ' + circle.id);
            });
            alert(`circle id: ${closestCircle.id} | circle radius: ${closestCircle.radius} | distance: ${closest} | color: ${getPixelColor(CANVASpos)}`);
        }
        else console.log(getPixelColor(CANVASpos))
        
      });
}

window.addEventListener("load", Draw ); 
window.addEventListener("resize", Draw ); 

function distanceFromCircle(point, circle) {
    return Math.sqrt( Math.pow((point.x - circle.x), 2) + Math.pow((point.y - circle.y), 2) )
}
function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    rectX: rect.x, 
    eveX: e.clientX,
    rectY: rect.y, 
    eveY: e.clientY,
    x: ( (e.clientX - rect.x) ) ,
    y: ( (e.clientY - rect.y) )
  };

}


function getPixelColor(mousePos) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
    // get pixel under cursor
    const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;

    // create rgb color for that pixel
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    return color; 
}

