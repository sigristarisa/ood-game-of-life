const gridBoard = document.getElementById("gridBoard");
const ctx = gridBoard.getContext("2d");


class GameOfLife {
  constructor() {
    this.grid_size = 5;
    this.grid_in_column = Math.floor( gridBoard.width / this.grid_size);
    this.grid_in_row = Math.floor( gridBoard.height / this.grid_size);
    this.active_grids = [];
    this.inactive_grids = [];

    // create grids
    this.createGrids = () => {
      for(let i = 0; i < this.grid_in_row; i++) {
        this.active_grids[i] = [];
        for(let j = 0; j < this.grid_in_column; j++) {
          this.active_grids[i][j] = 0;
        }
      } 
      this.inactive_grids = this.active_grids;
    }

  // give every grid a number of 0 or 1
   this.giveGridsRandomNum = () => {
     for(let i = 0; i < this.grid_in_row; i++) {
       for(let j = 0; j < this.grid_in_column; j++) {
         this.active_grids[i][j] = Math.random() > 0.5 ? 1 : 0;
       }
     }
   }

  // give every grid a color according to its number
  this.gridColor = () => {
    for(let i = 0; i < this.grid_in_row; i++) {
      for(let j = 0; j < this.grid_in_column; j++) {
        if(this.active_grids[i][j] === 0) {
          ctx.fillStyle = "#FFD333";
        } else {
          ctx.fillStyle = "#B633FF";
        }
       
        ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);

      }
    }
  }

  this.setGridValueHelper = (row, col) => {
    try {
        return this.active_array[row][col];
    }
    catch {
        return 0;
     }
};

this.countNeighbours = (row, col) => {
    let total_neighbours = 0;
    total_neighbours += this.setGridValueHelper(row - 1, col - 1);
    total_neighbours += this.setGridValueHelper(row - 1, col);
    total_neighbours += this.setGridValueHelper(row - 1, col + 1);
    total_neighbours += this.setGridValueHelper(row, col - 1);
    total_neighbours += this.setGridValueHelper(row, col + 1);
    total_neighbours += this.setGridValueHelper(row + 1, col - 1);
    total_neighbours += this.setGridValueHelper(row + 1, col);
    total_neighbours += this.setGridValueHelper(row + 1, col + 1);
    return total_neighbours;
}; 

this.updateGridValue = (row, col) => {
  const total = this.countNeighbours(row, col);
  // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
  if (total > 4 || total < 3) {
      return 0;
  }
  // dead cell with 3 neighbours becomes alive. 0 => 1
  else if (this.active_array[row][col] === 0 && total === 3) {
      return 1;
  }
  // or returning its status back. 0 => 0; 1 => 1
  else {
      return this.active_array[row][col];
  }

};

  // update the life cycle
  this.updateLifeCycle = () => {
    for (let i = 0; i < this.cells_in_rows; i++) {
      for (let j = 0; j < this.cells_in_column; j++) {
          let new_state = this.updateGridValue(i, j);
          this.inactive_array[i][j] = new_state;
      }
  }
  this.active_array = this.inactive_array
  }

  this.gameSetUp = () => {
    this.createGrids();
};

this.runGame = () => {
    this.updateLifeCycle();
    this.gridColor();
};
  }
}

const game = new GameOfLife();
game.gameSetUp();


window.onload = () => {
  document.getElementById("start").addEventListener("click", () => {
      game.giveGridsRandomNum();
      game.gridColor();
      window.setInterval(() => {
          game.runGame();
      }, 300)
      console.log("hi from start")
   })
 document.getElementById("stop").addEventListener("click", () => {
      game.gameSetUp();
      console.log("hi from stop")

 })
}