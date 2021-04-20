var grid;
var rows = 40;
var cols = 80;

var enableBoard = false;
var timer;
var playID;
var stopID;

function startUp(){
    //create grid
    grid = new Array(rows).fill(0).map(() => new Array(col).fill(0));

    // create table
    render();
    // ensure grid is clear
    resetGrid();

    //buttons


}

// add cells to grid and checks if alive or dead then load onto webpage
// Credit: https://www.youtube.com/watch?v=deXzu0Eregs
function render(){
    var gridContainer = document.getElementById('gridContainer');

    var table = document.createElement("table");

    for (var i = 0; i < rows; i++) {
		var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {//
        	var cell = document.createElement("td");
        	cell.setAttribute("id", i + "_" + j);
        	cell.setAttribute("class", "dead");
        	cell.onclick = patternHandler;
        	tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

//count neighbors around the cell
function countNeighbors(x,y){
    var numNeighbors = 0;
    //checks cells within a 3x3 radius
    for(let i = -1; i < 2; i++){
        for(let j = -1; j<2; j++){
            if(i=== 0 && j === 0){ // excludes self cell
                continue;
            }
            var x_pos = x + i;
            var y_pos = y + j;
            // check if cell is within grid boundaries
            if(x_pos >= 0 && y_pos >= 0 && x_pos < col && y_pos < row){
                const currentNeighbor = grid[x_pos][y_pos];
                numNeighbors += currentNeighbor;
            }
        }
    }
    return numNeighbors;
}



function displayNextGen() {
    // copy grid to apply rules so we dont check the cells that we are changing and run into checking loops
    var copyGrid = grid.map(elem => elem);

    // traverse array applying rules to each cell
    for(var x_pos = 0; x_pos < grid.length; x_pos++){
        for(var y_pos = 0; y_pos < grid[x_pos].length; y_pos++){
            var nNeighbors = countNeighbors(x_pos, y_pos);
            daRules(x_pos,y_pos,nNeighbors, copyGrid);
        }
    }
    return copyGrid;
}


function makeAlive(xSpot, ySpot){
    if(xSpot <= 0 || ySpot <= 0){
		return;
	}
    if(grid[xSpot][ySpot] == 1) { //dead
		grid[xSpot][ySpot] = 0;
	} else if (grid[xSpot][ySpot] == 0) { // alive
		grid[xSpot][ySpot] = 1;
	}
}

//get mouse position on click
//Reference W3 Schools
function getMousePosition(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x,"Coordinate y: " + y);
    makeAlive(x,y);
}

// mouse click listener
let canvasElem = document.querySelector('canvas');
canvasElem.addEventListener("mousedown", function(e){getMousePosition(e);});


//rule implementations for new generation
// Any live cell with fewer than two live neighbors will DIE 
// Any live cell with more than three live neighbors will DIE
// Any live cell with two or three live neighbors live onto next generation
// Any dead cell with exactly three live neighbors becomes a live cell
function daRules(column, rows, nNeighbors, copyGrid){
    var copyGrid = grid.map(elem => elem);
    //rules
    if(grid[column][rows] == 1 && nNeighbors < 2) {
        //If current cell is alive and numNeighbors is less than 2
        //Current cell will die in the next generation due to underpopulation
        copyGrid[column][rows] = 0;
    } else if(grid[column][rows] == 1 && nNeighbors > 3){
        //If current cell is alive and numNeighbors is more than 2
        //Current cell will die in the necolumnt generation due to overpopulation
        copyGrid[column][rows] = 0;
    } else if(grid[column][rows] == 0 && nNeighbors == 3){
        //If current cell is dead and numNeighbors equals to 3
        //Current cell will become alive in the next generation
        copyGrid[column][rows] = 1;
    }
    return copyGrid;
}

// Credit: https://www.youtube.com/watch?v=tS6oP1NveoI
//stopper
function stopGame(){
    enableBoard = false;
    cancelAnimationFrame(stopID);
}

// starter
function startGame(){
    if(enableBoard){
        return;
    }
    window.requestAnimationFrame(update);
    enableBoard = true;
}
//End Credit---

//looper
function update(){
    grid = displayNextGen();
    render();
    stopID = requestAnimationFrame(update);
}

