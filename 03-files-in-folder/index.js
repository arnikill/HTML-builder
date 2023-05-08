let path = require('path');
let fs = require('fs');
function secretFIle(file) {
    let dat = [];
    if (file.isFile()) {
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), function (error, stats) {
            if (error) {
                return console.log(error);
            }
            dat.push(file.name.split('.').slice(0, -1).join('.'));
            dat.push(path.extname(file.name).slice(1));
            dat.push((Math.round(stats.size)) + 'Kb');
            console.log(dat.join('-'));
        });
    }
};
fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, function (error, files) {
    if (error) {
        return console.log(error);
    }
    files.forEach(item => {
        secretFIle(item);
    });
});


