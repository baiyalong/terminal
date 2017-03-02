var exec = require('./exec')

module.exports = io => {
    io.on('connection', socket => {
        var stream,
            c_id,
            e_id
        socket.on('init', data => {
            exec.create(c_id = data.id, (err, res) => exec.start(e_id = res.id, (err, res) => {
                stream = res
                stream.on('data', data => socket.emit('output', data.toString()))
            }))
        })
        socket.on('input', data => stream.write(data))
        socket.on('resize', data => exec.resize(e_id, data, (err, res) => null))
    });
}