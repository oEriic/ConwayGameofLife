//grab canvas
const canvas = document.querySelector('canvas');
//Context to type of canvas
const context = canvas.getContext('2d');

//canvas specs
const resolution = 40;
canvas.width = 400;
canvas.height = 400;

//Rows and Cols for grid
const col = canvas.width / resolution;
const row = canvas.height / resolution;
//create grid in cavas
function buildGrid(){
    //allows for itrration where for ever column we will have made a row that is filled with 0 / empty
    const buildGrid = new Array(col).fill(null)
    .map (() => new Array(row).fill(null)
        // fills cells with random numbers from 0-1 will change this to be drawn and fill with patterns
        .map(() => Math.floor(Math.random() * 2)));
    return buildGrid;
}
// add cells to grid and then load onto webpage
function render(grid){
    // double for loop to traverse each grid slot and place a cell
    for(let col = 0; col < grid.length; col++){
        for(let row = 0; row < grid[col].length; row++){
            //place cell in grid slot
            const cell = grid[col][row];

            //displays grid and cell onto webpage based on xy position and canvas height and width
            context.beginPath();
            context.rect(col*resolution, row*resolution, resolution, resolution);

            // fill cells with white or black based on number. If 1 (alive) it will be black if 0 (dead) white
            context.fillStyle = cell ? 'black' : 'white'; // checker
            context.fill(); // "painter"
        }
    }
}

//call build grid 
const grid = buildGrid();

//call render
render(grid);