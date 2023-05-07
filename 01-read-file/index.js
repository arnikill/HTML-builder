let fs = require('fs');
let path = require('path')
let readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
let data = ''
readStream.on("data", partData => data += partData)
readStream.on("end", () => process.stdout.write(data))