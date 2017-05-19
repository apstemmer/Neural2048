const colors = {
  "2" : "#eee4da",
  "4" : "#ede0c8",
  "8" : "#f2b179",
  "16" : "#f59563",
  "32" : "#f67c5f",
  "64" : "#f65e3b",
  "128" : "#edcf72",
  "256" : "#edcc61",
  "512" : "#edc850",
  "1024" : "#edc53f",
  "2048" : "#edc22e",
  "4096" : "#3e3933"
};

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




  let MainLoop = ()=>{

    //var p = new Date();
    //console.log(p.getTime());
    let move = $.ajax({
      url:"/move",
      success:function(res){
        if(res.isOk == false){
          alert(result.message);
        }},
        async:false

    }).responseText;// gets the move from server


    let tiles = document.getElementsByClassName('tile');
    let absGrid = [[],[],[],[]];
    for (let i = 0; i < tiles.length; i++){
      if(tiles[i].classList[1] == "empty") {
        absGrid[Math.floor(i/4)][i%4] = 0;
      }
      else if(typeof Number(tiles[i].classList[1].substring(4)) == "number")
      {
        absGrid[Math.floor(i/4)][i%4] = Number(tiles[i].classList[1].substring(4));
      }
    }

    if(move === "u"){


        //[[2,0,2,0],[4,0,2,2],[2,2,2,2],[4,2,0,2]];



      }
    }


    switch (move) {
      case "u":
        for(var i=0;i<tiles.length-4;i++){
          if(tiles[i].classList[1] == tiles[i+4].classList[1] && tiles[i].classList[1] != "empty"){
            //console.log("up: " + i +" "+ (i+4));
            // let topVal = $(tiles[i+4]).position().top;
            // $(tiles[i+4]).animate({top:$(tiles[i]).position().top},1000, ()=>{
            //   $(tiles[i+4]).animate({top:topVal},500);
            // });

          }
        }
        break;
      case "d":
        //console.log('d');
        break;
      case "l":
        //console.log('l');
        break;
      case "r":
        //console.log('r');
        break;
      default:
        //alert("server error");

    }

    let emptyElems = document.getElementsByClassName('empty');
    if (emptyElems.length != 0){
      let toAdjust = emptyElems[Math.floor(Math.random()*emptyElems.length)];
      setVal(toAdjust, Math.random() > 0.9 ? 4 : 2);
    }


    setTimeout(MainLoop, 1000);
  }
  MainLoop();
})

var setVal = function (obj, newVal){
  obj.innerHTML = newVal;
  obj.style.backgroundColor = colors[newVal];
  obj.classList.remove("empty");
  obj.classList.add("val-"+newVal);
}

var sortInPlace = function(arr){
  //brings all zeros to right and keeps order correct
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j< arr.length-1; j++){
      if(arr[j][0] == 0 && arr[j+1][0] != 0){
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
        arr[j][2] += 1; //one movement of elem
      }
    }
  }
  return arr;
}

var combineElems = function(arr){
  for(var i = 0; i < arr.length-1; i++){
    if(arr[i][0] === arr[i+1][0] && arr[i][0] != 0){
      arr[i][0] *= 2;
      arr[i+1][0] = 0;
      arr[i+1][2] += 1;
    }
  }
  return arr;
}

var goUp = function(grid){
  for(var i=0; i < grid.length; i++)
  {
    let tosort = [];
    for(var j=0; j<grid.length; j++)
    {
      tosort.push([absGrid[j][i],j,0]);//retrieve a column [val,start,displace]
    }
    //array with [finalval,startpos,stepstaken]
    let steps = sortInPlace(combineElems(sortInPlace(tosort)));//creates required array;

    for(var k = 0; k < grid.length; k++){
      grid[steps[k][1]][i] = {
        "fval":(steps[k][0]),
        "tox":j,
        "toy":(steps[k][1]-steps[k][2])
      }
    }
  }
  console.log(steps);
  return grid;
}
