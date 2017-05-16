$(document).ready(function(){
  let grid = document.getElementsByClassName('tile-grid');
  console.log(grid);

  //place all elements on top of the plain tiles;
  for(i = 0; i < 16; i++){
    let ch = document.createElement("div");
    ch.classList.add("tile");//create an array of empty tiles
    ch.classList.add("empty");
    //a bit hacky, will update to retrieve width and margin
    let left = ((i%4)*(23 + 2)) + "%";
    let top = Math.floor(i/4)*(23 + 2) + "%";
    ch.style.top = top;
    ch.style.left = left;
    grid[0].appendChild(ch);
  }

  let tiles = document.getElementsByClassName('tile');


  let MainLoop = ()=>{
    let move = "";

    $.get("/move", function(movement) {
      move = movement;
    });

    let emptyElems = document.getElementsByClassName('empty');
    if (emptyElems.length != 0){
      let toAdjust = emptyElems[Math.floor(Math.random()*emptyElems.length)];
      toAdjust.style.backgroundColor = "blue";
      toAdjust.classList.remove("empty");
    }

    


    setTimeout(MainLoop, 1000);
  }
  MainLoop();
})
