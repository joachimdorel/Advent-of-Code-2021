const fs = require('fs');

// Open the file
const map = fs.readFileSync('input', 'utf8');
const values = map.split('\n');

let lowPointSum: number = 0;

for (let i=0; i<values.length; i++) {
  for (let j=0; j<values[0].length; j++) {
    const current = Number(values[i][j]);

    const valLeft  = (i-1 >= 0)               ? Number(values[i-1][j]) > current : true;
    const valRight = (i+1 < values.length)    ? Number(values[i+1][j]) > current : true;
    const valAbove = (j-1 >= 0)               ? Number(values[i][j-1]) > current : true;
    const valBelow = (j+1 < values[i].length) ? Number(values[i][j+1]) > current : true;

    if (valLeft && valRight && valAbove && valBelow) {
      lowPointSum += current+1; 
    }
  }
}

console.log(lowPointSum);