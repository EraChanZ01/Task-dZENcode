const WebSocket = require('./WebSocket');
const CONSTANTS = require('../../constants');

class CommentController extends WebSocket {

    emitNewComment(comment) {
        this.io.emit(CONSTANTS.NEW_COMMENT, { comment });
    }

}

module.exports = CommentController;