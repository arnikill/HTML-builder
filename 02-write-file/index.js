let fs = require('fs')
let path = require('path')
let writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'))
let { stdin, stdout, exit } = require('process')
stdout.write('привет напиши анекдот:  ')
stdin.on('data', (data) => {
    if (data.toString().trim() === exit) {
        endFile()
    }
    writeStream.write(data)
})
process.on('SIGINT', endFile)
function endFile() {
    stdout.write('   покеда!');
    exit();
}