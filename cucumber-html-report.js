const fs = require('fs');
const path = require("path")

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
  }


const today = new Date();
const dd = today.getDate();
const mm = today.getMonth()+1; //January is 0!
const yyyy = today.getFullYear();

const folderName = './reports/'+yyyy+'-'+mm+'-'+dd+'-'+'cucumber-html-report';
    


const report = require("./reports/multiple-cucumber-html-reporter/lib/generate-report");
report.generate({
    jsonDir: "cypress/cucumber-json",  // ** Path of .json file **//
    reportPath: folderName,  // ** Path of the report **//
    metadata: {
        browser: {
            name: "chrome",
            version: "81",
        },
        device: "Local test machine",
        platform: {
            name: "mac",
            version: "Catalina",
        },
    },
});


// move the index.html file to the cucumber-html-reports folder
fs.rename(folderName+'/index.html', './reports/cucumber-html-reports'+'/'+yyyy+'-'+mm+'-'+dd+'-'+'cucumber-html-report.html', function (err) {	
    if (err) {
        console.log(err);
    } else {
        fs.readFile('./reports/cucumber-html-reports'+'/'+yyyy+'-'+mm+'-'+dd+'-'+'cucumber-html-report.html', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            } else {
                const result = data.replace(/features\//g, yyyy+'-'+mm+'-'+dd+'-'+'features/');
                fs.writeFile('./reports/cucumber-html-reports'+'/'+yyyy+'-'+mm+'-'+dd+'-'+'cucumber-html-report.html', result, 'utf8', function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        const absolutePath = path.resolve('./reports/cucumber-html-reports'+'/'+yyyy+'-'+mm+'-'+dd+'-'+'cucumber-html-report.html')
                        console.log(absolutePath)
                        updateFileList();
                    }
                });
            }
        });
        
    }
});

// move the folder folderName/features to cucumber-html-reports/yyyy-mm-dd-features
// first delete the folder if './reports/cucumber-html-reports'+'/'+yyyy+'-'+mm+'-'+dd+'-'+'features' exists
fs.rm('./reports/cucumber-html-reports'+'/'+yyyy+'-'+mm+'-'+dd+'-'+'features', { recursive: true, force: true }, function (err) {
    if (err) {
        console.log(err);
    } else {
        fs.rename(folderName+'/features', './reports/cucumber-html-reports/'+yyyy+'-'+mm+'-'+dd+'-'+'features', function (err) {
            if (err) {
                console.log(err);
            } else {
                fs.rm(folderName, { recursive: true, force: true }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    }
});


function updateFileList(){
    fs.readFile('./reports/cucumber-html-reports/fileList.js', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        } else {
            let fileList = data.split('var fileList = [');
            fileList = fileList[1].split('];');
            fileList = fileList[0].split(',');
            const newFile = '"'+yyyy+'-'+mm+'-'+dd+'-'+'cucumber-html-report.html'+'"'

            // if the file is not in the fileList, add it
            while (fileList.length > 30) {
                let fileName = fileList.pop();
                
                const fileDir = './reports/cucumber-html-reports/' + fileName.replace(/"/g, '');
                fs.unlink(fileDir, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                const date = fileName.split('-')[0] + '-' + fileName.split('-')[1] + '-' + fileName.split('-')[2];
                fs.rm('./reports/cucumber-html-reports/'+date.replace(/"/g, '')+'-features', { recursive: true, force: true }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                
            }

            if (fileList.indexOf(newFile) == -1) {
                // append it at first position
                fileList.unshift(newFile);
            }
            fileList = fileList.join(',');
            fileList = 'var fileList = ['+fileList+'];';
            fs.writeFile('./reports/cucumber-html-reports/fileList.js', fileList, 'utf8', function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

