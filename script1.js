window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    // const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight; 
    canvas.width = window.innerWidth; 

})

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight; 
    canvas.width = window.innerWidth; 
})

function printMousePos(event) {
    document.body.textContent =
      "clientX: " + event.clientX +
      " - clientY: " + event.clientY;
}
  
document.addEventListener("click", (event) => {
    document.body.textContent =
      "clientX: " + event.clientX +
      " - clientY: " + event.clientY;
});