const fs = require('fs');

// Open the file
const data = fs.readFileSync('input', 'UTF-8');
const lines = data.split('\n');

let firstValue = null;
let largerThanPrevious = 0;

lines.forEach((line) => {
  const measure = parseInt(line);
  if (firstValue && (measure > firstValue)) {
    largerThanPrevious++;
  }
  firstValue = measure;
});

// Log the amount of previous
console.log(largerThanPrevious);
