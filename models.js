const mongoose = require('mongoose')

const { Schema } = mongoose

const SudokuSchema = new Schema({
    puzzle: { 
        type: String
    },
    solution: {
        type: String
    }
})

const Sudoku = mongoose.model("Sudoku", SudokuSchema)

module.exports = { Sudoku }