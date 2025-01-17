/* --- PRINCIPLE OF GAME OF LIFE --- */
/* if a living grid has more than three neighbors, it dies
if a living grid has less than three neighbors, it dies
if a dead grid has exactly three neighbors — it comes to life
in other cases, the grid remains in its state */

// Get the HTML elements
const gridBoard = document.getElementById("gridBoard");
const ctx = gridBoard.getContext("2d");

// Create a class Game of Life
class GameOfLife {
  constructor() {
    this.grid_size = 5;
    this.grid_in_column = Math.floor(gridBoard.width / this.grid_size);
    this.grid_in_row = Math.floor(gridBoard.height / this.grid_size);
    this.active_grids = [];
    this.inactive_grids = [];
  }

  // function to create grids
  createGrids = () => {
    for (let i = 0; i < this.grid_in_row; i++) {
      this.active_grids[i] = [];
      for (let j = 0; j < this.grid_in_column; j++) {
        this.active_grids[i][j] = 0;
      }
    }
    this.inactive_grids = this.active_grids;
    // console.log(this.inactive_grids);
    // console.log(this.active_grids);
  };

  // function to give every grid a number of 0 or 1
  giveGridsRandomNum = () => {
    for (let i = 0; i < this.grid_in_row; i++) {
      for (let j = 0; j < this.grid_in_column; j++) {
        this.active_grids[i][j] = Math.random() > 0.5 ? 1 : 0;
      }
    }
    // console.log(this.active_grids);
  };

  // function to give every grid a color according to its number
  gridColor = () => {
    for (let i = 0; i < this.grid_in_row; i++) {
      for (let j = 0; j < this.grid_in_column; j++) {
        this.active_grids[i][j] === 0
          ? (ctx.fillStyle = "#641215")
          : (ctx.fillStyle = "#e3a31f");
        ctx.fillRect(
          i * this.grid_size,
          j * this.grid_size,
          this.grid_size,
          this.grid_size
        );
      }
    }
  };

  setGridValue = (row, col) => {
    try {
      return this.active_grids[row][col];
    } catch {
      return 0;
    }
  };

  // function to count neighbours
  countNeighbours = (row, col) => {
    let total_neighbours = 0;
    total_neighbours += this.setGridValue(row - 1, col - 1);
    total_neighbours += this.setGridValue(row - 1, col);
    total_neighbours += this.setGridValue(row - 1, col + 1);
    total_neighbours += this.setGridValue(row, col - 1);
    total_neighbours += this.setGridValue(row, col + 1);
    total_neighbours += this.setGridValue(row + 1, col - 1);
    total_neighbours += this.setGridValue(row + 1, col);
    total_neighbours += this.setGridValue(row + 1, col + 1);
    return total_neighbours;
  };

  // function that takes row and column to return 0 or 1 according to its neighbors
  //  0: dead 1: alive
  updateGridValue = (row, col) => {
    const total = this.countNeighbours(row, col);
    // grid with more than 4 or less then 3 neighbours dies
    // 1 becomes 0; 0 remains 0
    if (total > 4 || total < 3) {
      return 0;
    }
    // dead grid with 3 neighbours becomes alive
    // 0 becomes 1
    else if (this.active_grids[row][col] === 0 && total === 3) {
      return 1;
    }
    //returning its status back
    //  0 remains 0; 1 remains 1
    else {
      return this.active_grids[row][col];
    }
  };

  // update the life cycle
  updateLifeCycle = () => {
    for (let i = 0; i < this.grid_in_row; i++) {
      for (let j = 0; j < this.grid_in_column; j++) {
        let new_state = this.updateGridValue(i, j);
        this.inactive_grids[i][j] = new_state;
      }
    }
    this.active_grids = this.inactive_grids;
    console.log(this.active_grids);
  };

  // set the game
  gameSetUp = () => {
    this.createGrids();
    this.giveGridsRandomNum();
    this.gridColor();
  };
}

const game = new GameOfLife();
game.gameSetUp();

// adding event listener to button to launch actions
document.getElementById("start").addEventListener("click", () => {
  console.log("hello from start button");
  setInterval(() => {
    game.updateLifeCycle();
    game.gridColor();
  }, 300);
});
