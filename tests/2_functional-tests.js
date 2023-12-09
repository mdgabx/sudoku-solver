const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('Functional tests for /api/solve', () => {

        test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
            const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

            chai.request(server)
                .post('/api/solve')
                .send({
                    puzzle
                })
                .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.property(res.body, 'solution')

                    done()
                })
        }).timeout(10000)

        test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
            const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..'

            chai.request(server)
                .post('/api/solve')
                .send({
                    puzzle
                })
                .end((err,res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, 'error')
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
                    
                    done();
                })
        }).timeout(10000)

        test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
            const puzzle = '82..4..6...16..89...98315.749.157....xx!12.....53..4...96.415..81..7632..3...28.51'

            chai.request(server)
                .post('/api/solve')
                .send({
                    puzzle
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")
                    assert.equal(res.body.error, "Invalid characters in puzzle")

                    done();
                })
        }).timeout(10000)

        test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
            const puzzle = '..9..5.1.85.4....2432.......'

            chai.request(server)
                .post('/api/solve')
                .send({
                    puzzle
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long")

                    done();
                })
        }).timeout(10000)

        test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
            const puzzle = '53..7....6...4..8.7...327498.........9..83.3...7.4.17.5.268.....9....5....'; // Example unsolvable puzzle

            chai.request(server)
                .post('/api/solve')
                .send({ puzzle })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")

                    done()
                })
        }).timeout(10000)
    })

    suite('Functional tests for /api/check', () => {
        const puzzle = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'

        test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {

            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle, 
                    coordinate: 'B2',
                    value: '3'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "valid")
                    assert.equal(res.body.valid, true)

                    done()
                })
        }).timeout(10000)

        test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {

            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle,
                    coordinate: 'B3',
                    value: '2'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "valid")
                    assert.property(res.body, "conflict")
                    assert.equal(res.body.valid, false)

                    done();
                })
        }).timeout(10000)


        test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {

            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle,
                    coordinate: 'C0',
                    value: '9'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")
                    assert.equal(res.body.error, 'Invalid coordinate')

                    done()
                })
        }).timeout(10000)

        test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {

            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle,
                    coordinate: 'M0',
                    value: '100'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")

                    done();
                })
        }).timeout(10000)

        test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {

            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle,
                    coordinate: '',
                    value: ''
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")
                    assert.equal(res.body.error, "Required field(s) missing")
                    done();
                })

        }).timeout(10000)

        test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {

            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle,
                    coordinate: '@#!',
                    value: '2'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")
                    assert.equal(res.body.error, "Invalid coordinate")

                    done()
                })
        }).timeout(10000)

        test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
            const incorrectLength = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71......19..6.......'

            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: incorrectLength,
                    coordinate: 'B2',
                    value: '2'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long")

                    done()
                })
        }).timeout(10000)

        test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {

            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle,
                    coordinate: 'X1',
                    value: '2'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")
                    assert.equal(res.body.error, "Invalid coordinate")

                    done()
                })
        }).timeout(10000)

        test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
            
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle,
                    coordinate: 'B3',
                    value: '110'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.property(res.body, "error")
                    assert.equal(res.body.error, "Invalid value")

                    done()
                })
        }).timeout(10000)

    })
});

