var Docker = require('dockerode')

var docker = new Docker()

exports.create = (c_id, callback) => {
    var c = docker.getContainer(c_id)
    c.exec({
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Cmd: ['/bin/sh']
    }, callback)
}
exports.start = (e_id, callback) => {
    var e = docker.getExec(e_id)
    e.start({
        hijack: true,
        stdin: true,
        Detach: false,
        Tty: true
    }, callback)
}
exports.resize = (e_id, callback) => {
    var e = docker.getExec(e_id)
    e.resize({}, callback)
}
exports.inspect = (e_id, callback) => {
    var e = docker.getExec(e_id)
    e.resize({}, callback)
}