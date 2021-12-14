var fs = require('fs');
// Open the file
var data = fs.readFileSync('input', 'utf8');
var diagnostics = data.split('\n');
// Function to get the most common between 0 and 1 for a given row
function mostCommon(arrayValues, position, type) {
    var ones = 0;
    var zeros = 0;
    arrayValues.forEach(function (value) {
        (value[position] === '1') ? ones += 1 : zeros += 1;
    });
    if (type === 'oxygen') {
        return (ones >= zeros) ? '1' : '0';
    }
    return (zeros <= ones) ? '0' : '1';
}
;
function getRating(type, diagnostics) {
    var diagnostics_datas = diagnostics;
    var conserved;
    for (var i = 0; i < diagnostics[0].length && (!conserved || conserved.length > 1); i++) {
        if (conserved && conserved.length > 0) {
            diagnostics_datas = conserved;
        }
        conserved = [];
        var mostCommonBit = mostCommon(diagnostics_datas, i, type);
        for (var j = 0; j < diagnostics_datas.length; j++) {
            if (diagnostics_datas[j][i] === mostCommonBit) {
                conserved.push(diagnostics_datas[j]);
            }
        }
    }
    return conserved[0];
}
;
var oxygenRating = getRating('oxygen', diagnostics);
var co2Rating = getRating('co2', diagnostics);
console.log(parseInt(oxygenRating, 2) * parseInt(co2Rating, 2));
