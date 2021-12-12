const fs = require('fs');

// Open the file
const data = fs.readFileSync('input', 'UTF-8');
const lines = data.split('\n');

let largerThanPrevious = 0;
const vals = [null, null, null];

lines.forEach((line) => {
  const measure = parseInt(line);

  if (!vals[0]) {
    vals[0] = measure;
    return;
  }
  if (!vals[1]) {
    vals[1] = measure;
    return;
  }
  if (!vals[2]) {
    vals[2] = measure;
    return;
  }

  const communValues = vals[1] + vals[2];
  if ((vals[0] + communValues) < (communValues + measure)) {
    largerThanPrevious++;
  }

  vals.shift();
  vals.push(measure);
});

// Log the amount of previous
console.log(largerThanPrevious);
