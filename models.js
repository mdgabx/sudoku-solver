const mongoose = require('mongoose')

const { Schema } = mongoose

const SudokuSchema = new Schema({
    puzzle: { 
        type: String, 
        maxLength: [81, 'only 81 characters are allowed']
    },
    solution: {
        type: String,
        maxLength: [81, 'only 81 characters are allowed']
    }
})

const Sudoku = mongoose.model("Sudoku", SudokuSchema)

module.exports = { Sudoku }