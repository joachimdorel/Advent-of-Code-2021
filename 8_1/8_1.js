var fs = require('fs');
// Open the file
var data = fs.readFileSync('input', 'utf8');
var entries = data.split('\n');
var count = 0;
for (var i = 0; i < entries.length; i++) {
    var result = entries[i].split(' | ')[1].split(' ');
    for (var j = 0; j < result.length; j++) {
        if (result[j].length === 2 || result[j].length === 4 || result[j].length === 3 || result[j].length === 7) {
            count += 1;
        }
    }
}
console.log(count);
