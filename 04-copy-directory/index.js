let fs = require('fs/promises')
let path = require('path')
let dir = path.join(__dirname, 'files')
let copyDir = path.join(__dirname, 'files-copy')

fs.rm(copyDir, {
    recursive: true,
    force: true
}).finally(function () {
    fs.mkdir(copyDir, {
        recursive: true
    })
    fs.readdir(dir, {
        withFileTypes: true
    }).then(function (data) {
        data.forEach(function (item) {
            if (item.isFile()) {
                let pathItem = path.join(dir, item.name)
                let pathItemFile = path.join(copyDir, item.name)
                fs.copyFile(pathItem, pathItemFile)
            }
        })
    })
})