let path = require('path');
let fs = require('fs');
let stylePath = path.join(__dirname, 'styles');
let copyDist = path.join(__dirname, 'project-dist');
let pathCopyAsset = path.join(copyDist, 'assets');
let components = path.join(__dirname, 'components');
let assets = path.join(__dirname, 'assets');

fs.readdir(stylePath, { withFileTypes: true }, async (error, files) => {
    if (error) {
        console.log(error);
    }
    else {
        files.forEach(function (file, index) {
            let filePath = path.join(stylePath, file.name);
            if (file.isFile() && file.name.split('.')[1] === 'css') {
                fs.readFile(filePath, 'utf8', function (error, data) {
                    if (error) {
                        console.log(error);
                    } else if (index === 0) {
                        fs.writeFile(path.join(copyDist, 'style.css'), data, function (error) {
                            if (error)
                                console.log(error);
                        });
                    } else {
                        fs.appendFile(path.join(copyDist, 'style.css'), data, function (error) {
                            if (error)
                                console.log(error);
                        });
                    }
                });
            }
        });
    }
});

function recurceCopy(dir, exit) {
    fs.readdir(dir, { withFileTypes: true }, function (error, files) {
        if (error) throw error;
        files.forEach(function (file) {
            if (!file.isFile()) {
                fs.stat(path.join(exit, file.name), function (error) {
                    if (error) {
                        fs.mkdir(path.join(exit, file.name), function (error) {
                            if (error) {
                                return console.erroror(error);
                            }
                        });
                        recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
                    } else {
                        recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
                    }
                });
            } else {
                fs.copyFile(`${dir}\\${file.name}`, `${exit}\\${file.name}`, function (error) {
                    if (error) throw error;
                });
            }
        });
    });
}
fs.stat(copyDist, function (error) {
    if (error) {
        fs.mkdir(copyDist, function (error) {
            if (error) {
                return console.erroror(error);
            }
        });
        createTemplate();
    } else {
        fs.readdir(copyDist, function (error) {
            if (error)
                console.log(error);
            else {

                createTemplate();
            }
        });
    }
});

fs.stat(pathCopyAsset, function (error) {
    if (error) {
        fs.mkdir(pathCopyAsset, function (error) {
            if (error) {
                return console.erroror(error);
            }

        });
        recurceCopy(assets, pathCopyAsset);
    } else {
        recurceCopy(assets, pathCopyAsset);
    }
});

function createTemplate() {
    fs.copyFile(`${__dirname}\\template.html`, `${copyDist}\\index.html`, function (error) {
        if (error) throw error;
        fs.readFile(`${copyDist}\\index.html`, 'utf8', function (error, data) {
            if (error) throw error;
            fs.readdir(components, { withFileTypes: true }, function (error, files) {
                if (error) throw error;

                files.forEach(function (file) {
                    fs.readFile(`${components}\\${file.name}`, 'utf8', function (error, dataFile) {
                        if (error) throw error;
                        let tagName = `{{${file.name.split('.')[0]}}}`;
                        data = data.replace(tagName, dataFile);
                        fs.writeFile(`${copyDist}\\index.html`, data, function (error) {
                            if (error)
                                console.log(error);
                        });
                    });

                });

            });

        });

    });
}