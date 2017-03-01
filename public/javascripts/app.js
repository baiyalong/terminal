console.log('app.js')

id = window
    .location
    .search
    .split('=')[1] || '5319d00b13ce'
console.log(id)

// var term = new Terminal(); term.open(document.getElementById('#terminal'));
// term.write('Hello from \033[1;3;31mxterm.js\033[0m $ ') term.fit()

var socket = io.connect();
// socket.on('news', function (data) {     console.log(data); socket.emit('my
// other event', {my: 'data'}); });
socket.on('connect', function () {
    socket.emit('exec', {id})
    term = new Terminal();

    term.on('data', function (data) {
        socket.emit('req', data);
    });

    term.open(document.getElementById('terminal'));
    // term.resize(width, height);
    term.setOption('cursorBlink', true);

    socket.on('resp', function (data) {
        term.write(data)
    })
})