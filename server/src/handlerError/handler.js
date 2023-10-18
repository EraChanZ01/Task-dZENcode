module.exports = (err, req, res) => {
    if (!err.message || !err.code) {
        res.status(500).send('Server Error');
    } else {
        res.status(err.code).send(err.message);
    }
}