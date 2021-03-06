var grid;
var copyGrid;
var row = 40;
var col = 80;

var disableBoard = false;
var playID;
var stopID;

var count = 0;

function startUp(){
    //create grid
    grid = new Array(row).fill(null).map(() => new Array(col).fill(null));
    copyGrid = new Array(row).fill(null).map(() => new Array(col).fill(null));
    // create table
    render();
    // ensure grid is clear
    reset();
}

// add cells to grid and sets if alive or dead then load onto webpage
// Credit: https://codepen.io/RBSpatz/pen/rLyNLb
function render(){
    var gridContainer = document.getElementById('gridContainer');

    var table = document.createElement('table');

    for (var i = 0; i < row; i++) {
		var tr = document.createElement('tr');
        for (var j = 0; j < col; j++) {//
        	var cell = document.createElement('td');
        	cell.setAttribute('id', i + '_' + j);
        	cell.setAttribute('class', 'dead');
        	cell.onclick = patternBrush;
        	tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

// resets / wipes grid
function reset(){
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            let cell = document.getElementById(i + '_' + j).setAttribute('class', 'dead');
        }
    }

    for(let i = 0; i < row; i++){
        grid[i].fill(0);
        copyGrid[i].fill(0);
    }
    count = 0;
    document.getElementById("generations").innerHTML = "Generations: " + count;
}

// getter for preset patterns
function getPattern(){
    // lock buttons while game runs
    if(disableBoard){
        return;
    }

    //pattern data from drop down
    var pat = document.getElementById('pattern');
    return parseInt(pat.value); // parse value as int 
}

// preset pattern setter for user mouse click
function patternBrush(){
    //lock screen while game running
    if(disableBoard){
        return;
    }

    // get cords for clicked cell
    var rowColumn = this.id.split('_');
    var nRow = parseInt(rowColumn[0]);
    var nCol = parseInt(rowColumn[1]);
    var pattern  = getPattern()
    // set pattern brush
    switch(pattern) {
        case 2:
            // Still life: Block
            fillCell(grid, nRow, nCol); //top right
            fillCell(grid, nRow, nCol-1); //top left
            fillCell(grid, nRow-1, nCol); //bottom right
            fillCell(grid, nRow-1, nCol-1); // bottom left
            break;
        case 4:
            // Osci: Blinker
            fillCell(grid, nRow, nCol); // center
            fillCell(grid, nRow, nCol-1); // left
            fillCell(grid, nRow, nCol+1); // right
            break;

        case 6:
            // Osci: Toad
            fillCell(grid, nRow, nCol); // base
            fillCell(grid, nRow, nCol+1);// one right
            fillCell(grid, nRow, nCol+2); // two right

            fillCell(grid, nRow-1, nCol-1); //under and left of base
            fillCell(grid, nRow-1, nCol); // under base
            fillCell(grid, nRow-1, nCol+1);// under of right of base
            break;    
        default:
            //single dot as default (1)
            fillCell(grid,nRow,nCol);
      } 
}
//count neighbors around the cell\\
function countNeighbors(x,y){
    var numNeighbors = 0;
    //checks cells within a 3x3 radius
    if (x-1 >= 0) { // Left
		if (grid[x-1][y] == 1) numNeighbors++;
	}
	if (x-1 >= 0 && y-1 >= 0) { // top left
		if (grid[x-1][y-1] == 1) numNeighbors++;
	}
	if (x-1 >= 0 && y+1 < col) { // bottom left
		if (grid[x-1][y+1] == 1) numNeighbors++;
	}
	if (y-1 >= 0) { // upper
		if (grid[x][y-1] == 1) numNeighbors++;
	}
	if (y+1 < col) { // lower
		if (grid[x][y+1] == 1) numNeighbors++;
	}
	if (x+1 < row) { // right
		if (grid[x+1][y] == 1) numNeighbors++;
	}
	if (x+1 < row && y-1 >= 0) { // top right
		if (grid[x+1][y-1] == 1) numNeighbors++;
	}
	if (x+1 < row && y+1 < col) { // bottom right}
		if (grid[x+1][y+1] == 1) numNeighbors++;
	}
    return numNeighbors;
}



function displayNextGen() {
    // traverse array applying rules to each cell
    for(var x_pos = 0; x_pos < row; x_pos++){
        for(var y_pos = 0; y_pos < col; y_pos++){
            var nNeighbors = countNeighbors(x_pos, y_pos);
            daRules(x_pos, y_pos, nNeighbors);
        }
    }
    
    grid = copyGrid.map(arr => [...arr]);
    //Set cell dead or alive for the next generation
    for (var i = 0; i < row; i++) {
		for (var j = 0; j < col; j++) {
			if (copyGrid[i][j] == 1) {
				document.getElementById(i + '_' + j).setAttribute('class', 'live');
			} else {
				document.getElementById(i + '_' + j).setAttribute('class', 'dead');
			}
		}
	}
    count++;
    document.getElementById("generations").innerHTML = "Generations: " + count;
}

function displayGen23() {
 //iterate 23 times  
    for(var gen = 0; gen < 23; gen++){
        // traverse array applying rules to each cell
        for(var x_pos = 0; x_pos < row; x_pos++){
            for(var y_pos = 0; y_pos < col; y_pos++){
                var nNeighbors = countNeighbors(x_pos, y_pos);
                daRules(x_pos, y_pos, nNeighbors);
                
            }
        }
        
        //Set cell dead or alive for the next generation
        grid = copyGrid.map(arr => [...arr]);
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (grid[i][j] == 1) {
                    document.getElementById(i + '_' + j).setAttribute('class', 'live');
                } else {
                    document.getElementById(i + '_' + j).setAttribute('class', 'dead');
                }
            }
        }
    }
    count=count+23;
    document.getElementById("generations").innerHTML = "Generations: " + count;
}


//rule implementations for new generation
// Any live cell with fewer than two live neighbors will DIE 
// Any live cell with more than three live neighbors will DIE
// Any live cell with two or three live neighbors live onto next generation
// Any dead cell with exactly three live neighbors becomes a live cell
function daRules(column, rows, neighbors){

    //rules for alive
    if(grid[column][rows] == 1 && neighbors < 2) {
        //If current cell is alive and has less than 2 neighbors
        //It will die in the next generation due to underpopulation
        copyGrid[column][rows] = 0;
    } else if(grid[column][rows] == 1 && neighbors > 3){
        //If current cell is alive and has more than 3 neighbors
        //It will die in the next generation due to overpopulation
        copyGrid[column][rows] = 0;
    } else if(grid[column][rows] == 1 && neighbors == 3){
        //If current cell is alive and has 2 or 3 neighbors it will
        //live on to next generation
        copyGrid[column][rows] = 1;
    } 
    //rules for dead
    else if(grid[column][rows] == 0 && neighbors == 3){
        //If current cell is dead and neighbors equals to 3
        //Current cell will become alive in the next generation
        copyGrid[column][rows] = 1;
    } 

    return copyGrid;
}

function fillCell(aGrid, row, col){
    if(row <= 0 || col <= 0){
        return;
    }
    if(aGrid[row][col] == 1){
        var cell = document.getElementById(row + '_' + col).setAttribute('class', 'dead');
		aGrid[row][col] = 0;
	} else if (aGrid[row][col] == 0) {
		var cell = document.getElementById(row + '_' + col).setAttribute('class', 'live');
		aGrid[row][col] = 1;
	}
}

//clear the grid
function clearGrid(){
    disableBoard = false;
    cancelAnimationFrame(stopID);
    reset();
}

// Credit: https://www.youtube.com/watch?v=tS6oP1NveoI
//stopper
function stopGame(){
    disableBoard = false;
    cancelAnimationFrame(stopID);
}

// starter
function startGame(){
    if(disableBoard){
        return;
    }
    disableBoard = true;
    displayNextGen();
    window.requestAnimationFrame(update);
}
//End Credit---

//looper
function update(){
    disableBoard = true;
    displayNextGen();
    // render();
    stopID = requestAnimationFrame(update);
}

