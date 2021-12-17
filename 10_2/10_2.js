var fs = require('fs');
// Open the file
var subsytem = fs.readFileSync('input', 'utf8');
var chuncks = subsytem.split('\n');
var associations = {
    ')': { openTag: '(', value: 3 },
    '}': { openTag: '{', value: 57 },
    ']': { openTag: '[', value: 1197 },
    '>': { openTag: '<', value: 25137 }
};
var illegalParenthesis = 0;
var illegalBrackets = 0;
var illegalCurlyBraces = 0;
var illegalThanSigns = 0;
var Stack = /** @class */ (function () {
    function Stack() {
        this.size = 0;
        this.content = [];
    }
    Stack.prototype.push = function (value) {
        this.size += 1;
        this.content.push(value);
    };
    Stack.prototype.pop = function () {
        if (this.size === 0) {
            return null;
        }
        var value = this.content[this.size - 1];
        this.content.splice(-1);
        return value;
    };
    Stack.prototype.addChunckStarters = function (val) {
        var starters = ['(', '[', '{', '<'];
        if (starters.indexOf(val) !== -1) {
            this.content.push(val);
        }
    };
    Stack.prototype.isChunckEnder = function (val) {
        var enders = [')', ']', '}', '>'];
        if (enders.indexOf(val) !== -1) {
            var lastVal = this.content.pop();
            if (associations[val].openTag !== lastVal) {
                return true;
            }
            return false;
        }
        ;
    };
    return Stack;
}());
function getPoint(val) {
    var starters = {
        '(': { value: 1 },
        '[': { value: 2 },
        '{': { value: 3 },
        '<': { value: 4 }
    };
    return starters[val].value;
}
var scores = [];
for (var i = 0; i < chuncks.length; i++) {
    var stack = new Stack();
    var corrupted = false;
    for (var j = 0; j < chuncks[i].length; j++) {
        var currentVal = chuncks[i][j];
        stack.addChunckStarters(currentVal);
        if (stack.isChunckEnder(currentVal)) {
            corrupted = true;
        }
    }
    if (!corrupted && (stack.content.length !== 0)) {
        var score = 0;
        while (stack.content.length > 0) {
            var valuePoped = stack.content.splice(-1)[0];
            score = (score * 5) + getPoint(valuePoped);
        }
        scores.splice(0, 0, score);
        for (var jj = 0; jj < scores.length; jj++) {
            if (scores[jj] > scores[jj + 1]) {
                var buffer = scores[jj];
                scores[jj] = scores[jj + 1];
                scores[jj + 1] = buffer;
            }
        }
    }
}
console.log(scores[Math.floor(scores.length / 2)]);
