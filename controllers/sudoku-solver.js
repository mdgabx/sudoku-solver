class SudokuSolver {

  validate(puzzleString) {
    const validatePuzzle = /^[1-9.]{81}$/.test(puzzleString)

    return validatePuzzle
  }

  checkRowPlacement(puzzleString, row, column, value) {
    
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

