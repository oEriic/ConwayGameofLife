var cells = document.getElementsByTagName("td");
var table = document.getElementById("gametable");
var gamestarted = 1;
for(x = 0; x <= cells.length-1; x++){
	cells[x].innerHTML = "<img src = \"blacksquare.png\" alt = \"square\"><src>"; //this code was written assuming the table will always be size 25x25, don't know what will happen if table is resized
}

for(x = 0; x <= table.rows.length-1; x++){ //For now, random elements of the grid are meant to be filled in every time the page opens
		for(y = 0; y <= table.rows[0].cells.length-1; y++){
			table.rows[Math.floor(Math.random()*table.rows.length)].cells[Math.floor(Math.random()*table.rows[0].cells.length)].style.visibility = "hidden";
		}
}

setTimeout(gamestart, 5000);//the grid should start 5 seconds after opening the page, the second argument is the number of miliseconds before the function in the first argument starts


function gamestart(){
	for(x = 0; x <= table.rows.length-1; x++){
		for(y = 0; y <= table.rows[0].cells.length-1; y++){
			var activeneighbors = 0; // every time a new cell is being looked at, this value should be reset to 0
			if(y != 0 && y != table.rows[0].cells.length-1 && x != 0 && x != table.rows.length-1){ // the code below shoudn't work if we're looking at the first/last row, or the first/last cell in a row
				if(table.rows[x].cells[y].style.visibility != "hidden"){ // If the cell that is being looked at is considered "alive"
					if(table.rows[x-1].cells[y-1].style.visibility != "hidden"){ //checking each nieghbor to see if they are alive or not, for this line, it should be alive
						activeneighbors++;
					}
					if(table.rows[x-1].cells[y].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x-1].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[y].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors < 2){ // if the alive cell has less than two alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors > 3){ // if the alive cell has more than three alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors == 2 || activeneighbors == 3){ // if the alive cell has two or three alive nieghbors, it lives
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
				else if(table.rows[x].cells[y].style.visibility == "hidden"){ // If the cell that is being looked is considered "dead"
					if(table.rows[x-1].cells[y-1].style.visibility != "hidden"){ //checking each nieghbor to see if they are alive or not
						activeneighbors++;
					}
					if(table.rows[x-1].cells[y].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x-1].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[y].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors == 3){ // if the dead cell has exactly 3 neighbors, it comes to life
						table.rows[x].cells[y].style.visibility = "visible"
					}
				}
			}
			else if(x == 0 && y == 0){ // upper left corner cell
				if(table.rows[x].cells[y].style.visibility != "hidden"){
					if(table.rows[0].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[0].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors < 2){ // if the alive cell has less than two alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors > 3){ // if the alive cell has more than three alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors == 2 || activeneighbors == 3){ // if the alive cell has two or three alive nieghbors, it lives
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
				else if(table.rows[x].cells[y].style.visibility == "hidden"){
						if(table.rows[0].cells[1].style.visibility != "hidden"){
							activeneighbors++;
						}
						if(table.rows[1].cells[0].style.visibility != "hidden"){
							activeneighbors++;
						}
						if(table.rows[1].cells[1].style.visibility != "hidden"){
							activeneighbors++;
						}
						if(activeneighbors == 3){ // if the dead cell has exactly 3 neighbors, it comes to life
							table.rows[x].cells[y].style.visibility = "visible";
						}
				}
			}
			else if(x == 0 && y == table.rows[0].cells.length-1){ // upper right corner cell
				if(table.rows[x].cells[y].style.visibility != "hidden"){
					if(table.rows[0].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[table.rows[0].cells.length-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors < 2){ // if the alive cell has less than two alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors > 3){ // if the alive cell has more than three alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors == 2 || activeneighbors == 3){ // if the alive cell has two or three alive nieghbors, it lives
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
				else if(table.rows[x].cells[y].style.visibility == "hidden"){
					if(table.rows[0].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[table.rows[0].cells.length-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors == 3){ // if the dead cell has exactly 3 neighbors, it comes to life
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
			}
			else if(x == table.rows.length-1 && y == 0){ // lower left corner cell
				if(table.rows[x].cells[y].style.visibility != "hidden"){
					if(table.rows[table.rows.length-2].cells[0].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-1].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors < 2){ // if the alive cell has less than two alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors > 3){ // if the alive cell has more than three alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors == 2 || activeneighbors == 3){ // if the alive cell has two or three alive nieghbors, it lives
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
				else if(table.rows[x].cells[y].style.visibility == "hidden"){
					if(table.rows[table.rows.length-2].cells[0].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-1].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors == 3){ // if the dead cell has exactly 3 neighbors, it comes to life
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
			}
			else if(x == table.rows.length-1 && y == table.rows[0].cells.length-1){ // lower right corner cell
				if(table.rows[x].cells[y].style.visibility != "hidden"){
					if(table.rows[table.rows.length-1].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[table.rows[0].cells.length-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors < 2){ // if the alive cell has less than two alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors > 3){ // if the alive cell has more than three alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors == 2 || activeneighbors == 3){ // if the alive cell has two or three alive nieghbors, it lives
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
				else if(table.rows[x].cells[y].style.visibility == "hidden"){
					if(table.rows[table.rows.length-1].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[table.rows[0].cells.length-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors == 3){ // if the dead cell has exactly 3 neighbors, it comes to life
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
			}
			else if(x == 0 && (y != table.rows[0].cells.length-1 || 0)){ // any cells in the first row of the grid besides the corners
				if(table.rows[x].cells[y].style.visibility != "hidden"){
					if(table.rows[0].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[y].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[0].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors < 2){ // if the alive cell has less than two alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors > 3){ // if the alive cell has more than three alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors == 2 || activeneighbors == 3){ // if the alive cell has two or three alive nieghbors, it lives
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
				else if(table.rows[x].cells[y].style.visibility == "hidden"){
					if(table.rows[0].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[y].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[1].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[0].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors == 3){ // if the dead cell has exactly 3 neighbors, it comes to life
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
			}
			else if( (x != table.rows.length-1 || 0) && y == 0){ // any cells in the first column of the grid besides the corners
				if(table.rows[x].cells[y].style.visibility != "hidden"){
					if(table.rows[x-1].cells[0].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x-1].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[0].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors < 2){ // if the alive cell has less than two alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors > 3){ // if the alive cell has more than three alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors == 2 || activeneighbors == 3){ // if the alive cell has two or three alive nieghbors, it lives
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
				else if(table.rows[x].cells[y].style.visibility == "hidden"){
					if(table.rows[x-1].cells[0].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x-1].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[0].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors == 3){ // if the dead cell has exactly 3 neighbors, it comes to life
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
			}
			else if(x == table.rows.length-1 && (y != table.rows[0].cells.length-1 || 0)){ // any cells in the last row of the grid besides the corners
				if(table.rows[x].cells[y].style.visibility != "hidden"){
					if(table.rows[table.rows.length-1].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[y].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-1].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors < 2){ // if the alive cell has less than two alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors > 3){ // if the alive cell has more than three alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors == 2 || activeneighbors == 3){ // if the alive cell has two or three alive nieghbors, it lives
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
				else if(table.rows[x].cells[y].style.visibility == "hidden"){
					if(table.rows[table.rows.length-1].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[y-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[y].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-2].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[table.rows.length-1].cells[y+1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors == 3){ // if the dead cell has exactly 3 neighbors, it comes to life
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
			}
			else if( (x != table.rows.length-1 || 0) && y == table.rows[0].cells.length-1){ // any cells in the last column of the grid besides the corners
				if(table.rows[x].cells[y].style.visibility != "hidden"){
					if(table.rows[x-1].cells[table.rows[0].cells.length-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x-1].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[table.rows[0].cells.length-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors < 2){ // if the alive cell has less than two alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors > 3){ // if the alive cell has more than three alive nieghbors, it dies
						table.rows[x].cells[y].style.visibility = "hidden";
					}
					else if(activeneighbors == 2 || activeneighbors == 3){ // if the alive cell has two or three alive nieghbors, it lives
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
				else if(table.rows[x].cells[y].style.visibility == "hidden"){
					if(table.rows[x-1].cells[table.rows[0].cells.length-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x-1].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[table.rows[0].cells.length-2].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(table.rows[x+1].cells[table.rows[0].cells.length-1].style.visibility != "hidden"){
						activeneighbors++;
					}
					if(activeneighbors == 3){ // if the dead cell has exactly 3 neighbors, it comes to life
						table.rows[x].cells[y].style.visibility = "visible";
					}
				}
			}
		}
		if(x == table.rows.length - 1){
			setTimeout(gamestart,75); //After the nested for loop is done, there is a timer set to start the next round of iterations, right now the time is set to 75 milliseconds, so it can be adjusted to make the table change faster
		}
	}
}

