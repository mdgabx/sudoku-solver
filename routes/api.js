'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      //check the input
      const { puzzle } = req.body

      const ifValid = solver.validate(puzzle)

      console.log('puzzle', ifValid)
        
    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
