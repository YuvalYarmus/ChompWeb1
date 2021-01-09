function getElementPosText(element) {
    if (element !== null) {
        rect = element.getBoundingClientRect(element); 
        text = ""
        for (var key in rect) {
            if(typeof rect[key] !== 'function') {
            //   let para = document.createElement('p');
            //   para.textContent  = `${ key } : ${ rect[key] }`;
            //   document.body.appendChild(para);
            text += `${ key } : ${ rect[key] } `
            }
          }
        return text; 
    } 
    else return null; 
}

function getElementPosList(element) {
    if (element !== null) {
        rect = element.getBoundingClientRect(element); 
        text = ""
        for (var key in rect) {
            if(typeof rect[key] !== 'function') {
            text += `${ key } : ${ rect[key] } `
            }
          }
          var list_text = text.replace(/:/g, "").split(" ")
          var li = []
          list_text.forEach(cell => {
              if (cell !== null && cell !== "") li.push(cell)
          });
          console.log("li is: " + li)
        return li; 
    } 
    else return null; 
}

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    // const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight - window.innerHeight * 0.1-30; 
    canvas.width = window.innerWidth - window.innerWidth * 0.1-30; 

})

window.addEventListener("resize", () => {
    const canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight - window.innerHeight * 0.1-30; 
    canvas.width = window.innerWidth - window.innerWidth * 0.1-30; 
    console.log("new canvas pos is: " + getElementPosText(canvas))
})

function printMousePos(event) {
    console.log(`ClientX: 1 ${Mouse.x}, ClientY: ${Mouse.y}`)
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
