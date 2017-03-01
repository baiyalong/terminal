var exec = require('./exec')

module.exports = io => {
    io
        .on('connection', function (socket) {
            socket.on('exec', data => {
                exec.create(data.id, (err, res) => console.log(err, res))
            })
            socket.on('req', function (data) {
                console.log(data)
                socket.emit('resp', 'resp' + data);
            });
        });
}