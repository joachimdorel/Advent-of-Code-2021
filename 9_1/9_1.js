var fs = require('fs');
// Open the file
var map = fs.readFileSync('input', 'utf8');
var values = map.split('\n');
var lowPointSum = 0;
for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[0].length; j++) {
        var current = Number(values[i][j]);
        var valLeft = (i - 1 >= 0) ? Number(values[i - 1][j]) > current : true;
        var valRight = (i + 1 < values.length) ? Number(values[i + 1][j]) > current : true;
        var valAbove = (j - 1 >= 0) ? Number(values[i][j - 1]) > current : true;
        var valBelow = (j + 1 < values[i].length) ? Number(values[i][j + 1]) > current : true;
        if (valLeft && valRight && valAbove && valBelow) {
            lowPointSum += current + 1;
        }
    }
}
console.log(lowPointSum);
