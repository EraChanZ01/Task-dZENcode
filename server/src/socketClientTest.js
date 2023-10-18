const io = require('socket.io-client');
const CONSTANTS = require('./constants');


const socket = io.connect('http://localhost:3000/comment');

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on(CONSTANTS.NEW_COMMENT, (data) => {
    console.log(data)
})