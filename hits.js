function isIntersect(point, circle) {
    return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
  }
  
  canvas.addEventListener('click', (e) => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };
    circles.forEach(circle => {
      if (isIntersect(mousePoint, circle)) {
        alert('click on circle: ' + circle.id);
      }
      else alert(isIntersect(mousePoint, circle)); 
      
    });
  });



function WhatRegion(width, height, n, m) {
    // Assuming there is a 10% spacing on both x and y scale
    startX = width * 0.1 / n; // the total
}