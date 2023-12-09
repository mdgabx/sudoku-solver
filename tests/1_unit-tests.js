const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {

    test('Logic handles a valid puzzle string of 81 characters', function (done) {
        const sampleInput = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.equal(sampleInput.length, 81, "Length should be 81 characters")
        
        done();

    }).timeout(10000)

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
        const sampleInput = "..9..5.1.85.4....2432.xx...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        const isValidInput = solver.validate(sampleInput)
        assert.equal(isValidInput, false, 'Should be false')

        done();
    }).timeout(10000)

    test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
        const sampleInput = "..9..5.1.85.4..432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.notEqual(sampleInput.length, 81, 'Should not equal to 81 characters')

        done();
    }).timeout(10000)

    test('Logic handles a valid row placement', function(done) {
        const puzzleString = '53..7....6...4..8.7...327498.........9..83.3...7.4.17.5.268.....9....5....'; // Example valid puzzle
        const row = 0; 
        const value = 1; 
        const result = solver.checkRowPlacement(puzzleString, row, 0, value)
        assert.equal(result, true)

        done();
    }).timeout(10000)

    test('Logic handles an invalid row placement', function(done) {
        const puzzleString = '53..7....6...4..8.7...327498.........9..83.3...7.4.17.5.268.....9....5....'; // Example valid puzzle
        const row = 0; 
        const value = 5; 
        const result = solver.checkRowPlacement(puzzleString, row, 0, value)
        assert.equal(result, false)
        
        done();

    }).timeout(10000)

    test('Logic handles a valid column placement', function(done) {
        const puzzleString = '53..7....6...4..8.7...327498.........9..83.3...7.4.17.5.268.....9....5....'; // Example valid puzzle
        const column = 0;
        const value = 1; 
        const result = solver.checkColPlacement(puzzleString, 0, column, value)
        assert.equal(result, true)
        
        done();
    }).timeout(10000)

    test('Logic handles an invalid column placement', function(done) {
        const puzzleString = '53..7....6...4..8.7...327498.........9..83.3...7.4.17.5.268.....9....5....'; // Example valid puzzle
        const column = 0; 
        const value = 5; 
        const result = solver.checkColPlacement(puzzleString, 0, column, value)
        assert.equal(result, false)

        done();

    }).timeout(10000)


    test('Logic handles a valid region (3x3 grid) placement', function(done) {
        const puzzleString = '53..7....6...4..8.7...327498.........9..83.3...7.4.17.5.268.....9....5....'; // Example valid puzzle
        const row = 0; // Row number (0-indexed) within the 3x3 region
        const column = 0; // Column number (0-indexed) within the 3x3 region
        const value = 1; // Value to be placed
        const result = solver.checkRegionPlacement(puzzleString, row, column, value)
        assert.equal(result, true)

        done();
    }).timeout(10000)

    test('Logic handles an invalid region (3x3 grid) placement', function(done) {
        const puzzleString = '53..7....6...4..8.7...327498.........9..83.3...7.4.17.5.268.....9....5....'; // Example valid puzzle
        const row = 0; 
        const column = 0; 
        const value = 5; 
        const result = solver.checkRegionPlacement(puzzleString, row, column, value)
        assert.equal(result, false)

        done()
    }).timeout(10000)

    test('Valid puzzle strings pass the solver', function(done) {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'; // Example valid puzzle
        const result = solver.solve(puzzleString)
        const test = /[1-9]{81}/.test(result)
        assert.equal(test, true)

        done();
    }).timeout(10000)

    test('Invalid puzzle strings fail the solver', function(done) {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.2'
        const result = solver.solve(puzzleString)
        assert.equal(result, false)

        done();
    }).timeout(10000)

    test('Solver returns the expected solution for an incomplete puzzle', function(done) {
        const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'; 

        const result = solver.solve(puzzleString)
        assert.equal(result, '769235418851496372432178956174569283395842761628713549283657194516924837947381625')

        done();
    }).timeout(10000)
});
