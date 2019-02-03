const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const dataDir = path.join(__dirname + '/../data/');
const baseDir = path.join(__dirname + '/../');
const dbFileName = 'db.json';

function getDataFromFile(file) {
  return readFile(dataDir + file, 'utf-8');
}

function collectData(files) {
  return new Promise(resolve => {
    const promises = [];
    files.forEach(file => promises.push(getDataFromFile(file)));

    Promise.all(promises).then(dataList => {
      const db = {};
      dataList.forEach((data, index) => {
        const key = files[index].replace('.json', '');
        const parsedData = JSON.parse(data).map(record => {
          if (!record.id && record._id) {
            return { ...record, id: record._id };
          } else {
            return record;
          }
        });
        db[key] = parsedData;
      });

      resolve(db);
    });
  });
}

function writeDb(data) {
  writeFile(path.join(baseDir + dbFileName), JSON.stringify(data))
    .then(() => console.log('DB file ' + dbFileName + ' successfully created!'))
    .catch(error => console.log(error));
}

readdir(dataDir)
  .then(files => {
    const dataFiles = files.filter(file => file.indexOf('.json') > -1);
    collectData(dataFiles)
      .then(data => writeDb(data))
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));

readdir(dataDir);
