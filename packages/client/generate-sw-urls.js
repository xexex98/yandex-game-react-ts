import fs from 'fs';
import path from 'path';

const directoryToScan = './dist'; // Папка, в которой находятся статические файлы проекта
const staticFileExtensions = ['.html', '.css', '.js', '.png', '.jpg', '.svg'];
let urls = [];

function scanDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath);
    } else {
      const ext = path.extname(file);

      if (staticFileExtensions.includes(ext)) {
        const url = filePath.replace(/\\/g, '/').replace(/^dist\//, '/');

        urls.push(url);
      }
    }
  });
}

scanDirectory(directoryToScan);

fs.writeFileSync('dist/sw-urls.js', `const URLS = ${JSON.stringify(urls)}`);
