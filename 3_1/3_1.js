var fs = require('fs');
// Open the file
var data = fs.readFileSync('input', 'utf8');
var diagnostics = data.split('\n');
// console.log('');
var binarySum = '0';
var ones = new Array(diagnostics[0].length).fill(0);
var zeros = new Array(diagnostics[0].length).fill(0);
diagnostics.forEach(function (diagnostic) {
    for (var i = 0; i < diagnostic.length; i++) {
        ones[i] += (diagnostic[i] === '1') ? 1 : 0;
        zeros[i] += (diagnostic[i] === '0') ? 1 : 0;
    }
    // console.log(diagnostic);
    // binarySum = Math.abs(parseInt(binarySum, 2) - parseInt(diagnostic, 2)).toString(2);
    // console.log(binarySum);
});
var gamma = new Array(ones.length).fill(0);
var epsilon = new Array(ones.length).fill(1);
// console.log(gamma);
for (var i = 0; i < ones.length; i++) {
    if (ones[i] > zeros[i]) {
        gamma[i] = '1';
        epsilon[i] = '0';
    }
}
;
// console.log(Number(gamma.join('')));
// const binarySumInverted = Math.abs(parseInt(binarySum, 2) - parseInt(('1').repeat(binarySum.length), 2)).toString(2);
// console.log(binarySum);
// console.log(binarySumInverted);
console.log(parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2));
