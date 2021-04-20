//grab canvas
const canvas = document.querySelector('canvas');
//Context to type of canvas
const context = canvas.getContext('2d');

//canvas specs
const resolution = 10;
canvas.width = 800;
canvas.height = 800;

var grid;

var enableBoard = false;
var timer;

//Rows and Cols for grid
const col = canvas.width / resolution;
const row = canvas.height / resolution;
//create grid in cavas
function buildGrid(){
    //allows for itrration where for ever column we will have made a row that is filled with 0 / empty
    const newGrid = new Array(col).fill(null)
    .map (() => new Array(row).fill(null));
    return newGrid;

}

// add cells to grid and then load onto webpage
// Credit: https://www.youtube.com/watch?v=deXzu0Eregs
function render(grid){
    // double for loop to traverse each grid slot and place a cell
    for(let x = 0; x < grid.length; x++){
        for(let y = 0; y < grid[x].length; y++){
            //place cell in grid slot
            const cell = grid[x][y];

            //displays grid and cell onto webpage based on xy position and canvas height and width
            context.beginPath();
            context.rect(x*resolution, y*resolution, resolution, resolution);

            // fill cells with white or black based on number. If 1 (alive) it will be black if 0 (dead) white
            context.fillStyle = cell ? 'white' : 'black'; // checker
            context.fill(); // "painter"
        }
    }
}

//count neighbors around the cell
function countNeighbors(x,y,grid){
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



function displayNextGen(grid) {
    // copy grid to apply rules so we dont check the cells that we are changing and run into checking loops
    var copyGrid = grid.map(elem => elem);

    // traverse array applying rules to each cell
    for(var x_pos = 0; x_pos < grid.length; x_pos++){
        for(var y_pos = 0; y_pos < grid[x_pos].length; y_pos++){
            var nNeighbors = countNeighbors(x_pos, y_pos,grid);
            daRules(x_pos,y_pos,nNeighbors, copyGrid);
        }
    }
    return copyGrid;
}


function makeAlive(arr, xSpot, ySpot){
    if(xSpot <= 0 || ySpot <= 0){
		return;
	}
    if(arr[xSpot][ySpot] == 1) {
		var cell = document.getElementById(xSpot + "_" + ySpot);
		arr[xSpot][ySpot] = 0;
	} else if (arr[xSpot][ySpot] == 0) {
		var cell = document.getElementById(xSpot + "_" + ySpot);
		arr[xSpot][ySpot] = 1;
	}
}
//get mouse position on click
//Reference W3 Schools
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x,"Coordinate y: " + y);
    makeAlive(grid,x,y);
}

// mouse click listener
let canvasElem = document.querySelector('canvas');
canvasElem.addEventListener("mousedown", function(e){getMousePosition(canvasElem, e);});


//rule implementations for new generation
// Any live cell with fewer than two live neighbors will DIE 
// Any live cell with more than three live neighbors will DIE
// Any live cell with two or three live neighbors live onto next generation
// Any dead cell with exactly three live neighbors becomes a live cell
function daRules(column, rows, nNeighbors, grid){
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

//stopper
function stopGame(){
    enableBoard = false;
    clearTimeout(timer);
}

// starter
function startGame(){
    if(enableBoard){
        return;
    }

    enableBoard = true;
    play();
}

//play-er
function play(){
    enableBoard = true;
    displayNextGen();
    timer = setTimeout(play, 100);
}

//call build grid 
grid = buildGrid();

//requestAnimationFrame(update);

// function update(){
//     grid = displayNextGen(grid);
//     render(grid);
//     requestAnimationFrame(update);
// }

