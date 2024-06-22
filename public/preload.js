function readFileAsync(filePath, encoding) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(filePath, encoding, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

window.services = {
  readFile: (inputPath, encoding = 'utf8') => {
    return readFileAsync(inputPath, encoding);
  }
};
