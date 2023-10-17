const { Server } = require('socket.io');
const CommentController = require('./controllers/sockets/CommentController');

let commentController;

const cors = {
    origin: '*',
};

module.exports.createConnection = (httpServer) => {
    const io = new Server(httpServer, { cors });
    commentController = new CommentController();
    commentController.connect('/comment', io);
};

module.exports.getCommentController = () => {
    return commentController;
};



