const fs = require('fs');
const path = 'hello.txt';

fs.writeFile(path, 'Hello2, world', (err) => {
    if (err) throw err;
})