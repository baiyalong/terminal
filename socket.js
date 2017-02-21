module.exports = io => {
    io
        .on('connection', function (socket) {

            socket
                .on('req', function (data) {
                    console.log(data)
                    socket.emit('resp', 'resp' + data);
                });
        });
}