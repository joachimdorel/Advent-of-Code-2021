const fs = require('fs');

// Open the file
const data = fs.readFileSync('input', 'utf8');
const entries = data.split('\n');

let count = 0;
for (let i=0; i<entries.length; i++) {
  const result = entries[i].split(' | ')[1].split(' ');

  for (let j=0; j<result.length; j++) {
    if (result[j].length === 2 || result[j].length === 4 || result[j].length === 3 || result[j].length === 7) {
      count += 1;
    }
  }
}

console.log(count);