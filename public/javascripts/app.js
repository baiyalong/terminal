var query = window
        .location
        .search
        .split('?')[1]
        .split('='),
    name = query[0],
    id = query[1]

if (name && id && id.length >= 12) {
    document.title = name
    var socket = io.connect();
    socket.on('connect', function () {
        socket.emit('init', {id})
        term = new Terminal();
        term.open(document.getElementById('terminal'));
        term.setOption('cursorBlink', true);

        term.on('data', function (data) {
            socket.emit('input', data);
        });
        socket.on('output', function (data) {
            term.write(data)
        })

        function resize() {
            var size = {
                h: window.innerHeight,
                w: window.innerWidth
            }
            // term.resize(size.w / 10, size.h)
            socket.emit('resize', size)
        }
        window.onresize = resize
        resize()
    })
}
