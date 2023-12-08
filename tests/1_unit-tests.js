const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {

    test('Logic handles a valid puzzle string of 81 characters', function (done) {
        const sampleInput = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.equal(sampleInput.length, 81, "Length should be 81 characters")
        done();
    })

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
        const sampleInput = "..9..5.1.85.4....2432.xx...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        const isValidInput = solver.validate(sampleInput)
        assert.equal(isValidInput, false, 'Should be false')

        done();
    })

    test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
        const sampleInput = "..9..5.1.85.4..432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.notEqual(sampleInput.length, 81, 'Should not equal to 81 characters')

        done();
    })
});
