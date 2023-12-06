class SudokuSolver {


  validate(puzzleString) {
    const validatePuzzle = /^[1-9.]+$/.test(puzzleString);
    return validatePuzzle;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const puzzle = this.transformStringToGrid(puzzleString);
    const rowValues = puzzle[row];
    return !rowValues.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const puzzle = this.transformStringToGrid(puzzleString);
    const colValues = puzzle.map((row) => row[column]);
    return !colValues.includes(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const puzzle = this.transformStringToGrid(puzzleString);
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (puzzle[i][j] == value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) return false;

    const puzzle = this.transformStringToGrid(puzzleString);
    if (this.solveSudoku(puzzle)) {
      return this.transformGridToString(puzzle);
    }
    return false;
  }

  transformStringToGrid(puzzleString) {
    const grid = [];
    for (let i = 0; i < 9; i++) {
      grid.push(puzzleString.slice(i * 9, (i + 1) * 9).split('').map(x => (x === '.' ? 0 : parseInt(x))));
    }
    return grid;
  }

  transformGridToString(grid) {
    return grid.map(row => row.join('')).join('');
  }

  solveSudoku(board) {
    const findEmptyCell = (board) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null; // No empty cell found, puzzle solved
    };

    const isValid = (board, row, col, num) => {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false; // Check row and column
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) {
                    return false; // Check 3x3 box
                }
            }
        }

        return true; // Valid placement
    };

    const solve = () => {
        const emptyCell = findEmptyCell(board);

        if (!emptyCell) {
            return true; // Puzzle solved
        }

        const [row, col] = emptyCell;

        for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;

                if (solve()) {
                    return true;
                }

                board[row][col] = 0; // Reset cell if no solution found
            }
        }

        return false; // Trigger backtracking
    };

    if (solve()) {
        return board; // Solved Sudoku puzzle
    } else {
        return false; // No solution exists
    }
}

}

module.exports = SudokuSolver;
