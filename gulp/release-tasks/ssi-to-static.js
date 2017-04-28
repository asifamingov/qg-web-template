'use strict';

// Todo: Clean this up, it's super messy

const SSI  = require('node-ssi');
const fsPath = require('fs-path');
const path = require('path');
const ssi    = new SSI({
  encoding: 'utf-8',
  baseDir: path.join('build'),
});

const folder = {
  src: path.join('/temp', 'docs'),
  exclude: [''],
  build: path.join('/release', 'docs'),
};

function fromDir (startPath) {
  fsPath.find(startPath, function (filepath, stats, filename) {
    //filters only html files and excludes folders assigned to folder.exclude
    if ((stats === 'file' && /\.html$/.test(filename)) || (stats === 'directory' && folder.exclude.indexOf(filename) < 0)) {
      return true;
    }
    return false;
  }, function (err, list) {
    if (err) return;
    list.files.forEach(function (file) {  //iterates through list of filtered files
      ssi.compileFile(file, function (err, content) {
        if (err) {
          console.log(err);
          return;
        }
        var buildFile = file.replace(folder.src, folder.build);  //builds destination filepath
        fsPath.writeFile(buildFile, content, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(buildFile + ' - Done');
          }
        });
      });
    });
    fsPath.remove('/temp', (err) => {
      if (err) return;
      console.log('ok');
    });
  });
}

fromDir(folder.src);
