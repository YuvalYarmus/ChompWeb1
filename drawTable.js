let mountains = [
    { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
    { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
    { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Monte Amiata", height: 1738, place: "Siena" }
  ];
  
  function generateTableHead(table, data) {
    console.log("data is: " + data)
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      console.log("current key is: " + key)
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  
  function generateTable(table, data) {
    for (let element of data) {
      console.log("data is: " + data)
      let row = table.insertRow();
      for (key in element) {
        console.log("current key is: " + key)
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  


alert("hello")
let table = document.querySelector("table");
let data = Object.keys(mountains[0]);
generateTable(table, mountains); // generate the table first
generateTableHead(table, data); // then the head