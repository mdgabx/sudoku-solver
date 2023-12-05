'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      //check the input
      const { puzzle, coordinate, value } = req.body
 
      // sample data in form
//       {
//         coordinate : "B3",
//         puzzle : "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
//         value : "3"
//       }

    });
    
  app.route('/api/solve')
    .post((req, res) => {

      const { puzzle } = req.body

      const sudokuSolution = solver.solve(puzzle)

      res.json({ solution: sudokuSolution })

    });
};
