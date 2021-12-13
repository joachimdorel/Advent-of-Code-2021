
const fs = require('fs');

// Open the file
const data = fs.readFileSync('input', 'utf8');
const diagnostics = data.split('\n');

const ones = new Array(diagnostics[0].length).fill(0);
const zeros = new Array(diagnostics[0].length).fill(0);

diagnostics.forEach((diagnostic) => {
  for (let i = 0; i<diagnostic.length; i++) {
    ones[i] += (diagnostic[i] === '1') ? 1 : 0;
    zeros[i] += (diagnostic[i] === '0') ? 1 : 0;
  }
});

const gamma = new Array(ones.length).fill(0);
const epsilon = new Array(ones.length).fill(1);
for (let i = 0; i < ones.length; i++) {
  if (ones[i] > zeros[i]) {
    gamma[i] = '1';
    epsilon[i] = '0';
  }
};

console.log(parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2));
