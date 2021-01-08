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

    canvas.height = window.innerHeight - window.innerHeight * 0.05; 
    canvas.width = window.innerWidth - window.innerWidth * 0.05; 

})

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight - window.innerHeight * 0.05; 
    canvas.width = window.innerWidth - window.innerWidth * 0.05; 
    console.log("new canvas pos is: " + getElementPosText(canvas))
})

function printMousePos(event) {
    document.body.textContent +=
      "clientX: " + event.clientX +
      " - clientY: " + event.clientY;
}


  
document.addEventListener("click", (event) => {
    // document.body.textContent +=
    //   "clientX: " + event.clientX +
    //   " - clientY: " + event.clientY;
    console.log("clientX: " + event.clientX +
    " - clientY: " + event.clientY); 
});