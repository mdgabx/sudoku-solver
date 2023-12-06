'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' });
    }

    if (puzzle.length !== 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' });
    }


    if (!/^[A-I][1-9]$/.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate format' });
    }

    if (!/^[1-9.]{81}$/.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
    }

 

    const row = coordinate.charCodeAt(0) - 'A'.charCodeAt(0);
    const col = parseInt(coordinate.charAt(1)) - 1;
    const currentValue = parseInt(puzzle[row * 9 + col]);

    if (currentValue === parseInt(value)) {
        return res.json({ valid: true });
    }

    const conflicts = [];
    if (!solver.checkRowPlacement(puzzle, row, col, parseInt(value))) {
        conflicts.push('row');
    }
    if (!solver.checkColPlacement(puzzle, row, col, parseInt(value))) {
        conflicts.push('column');
    }
    if (!solver.checkRegionPlacement(puzzle, row, col, parseInt(value))) {
        conflicts.push('region');
    }

    if (conflicts.length === 0) {
        return res.json({ valid: true });
    } else {
        return res.json({ valid: false, conflict: conflicts });
    }
});

    
  app.route('/api/solve')
    .post((req, res) => {

      const { puzzle } = req.body
      const sudokuSolution = solver.solve(puzzle)

      if(!puzzle) {
       return res.json({ error: 'Required field missing' })
      }

      if(!solver.validate(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' })
      }

      if(puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      }

      if(!sudokuSolution) {
        return res.json({ error: 'Puzzle cannot be solved' })
      }

      res.json({ solution: sudokuSolution })

    });
};
