const mainContainer = document.getElementById("mainConatiner");
const gameBoard = document.getElementById("gameBoard");


for(let i = 0; i < 100; i++) {
    const grid = document.createElement("div")
    grid.className = "grid"
  gameBoard.appendChild(grid);
}