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
function getIllegalSum() {
    return illegalParenthesis * 3 + illegalBrackets * 57 + illegalCurlyBraces * 1197 + illegalThanSigns * 25137;
}
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
    Stack.prototype.addIllegal = function (val) {
        if (val === ')') {
            illegalParenthesis += 1;
        }
        if (val === ']') {
            illegalBrackets += 1;
        }
        if (val === '}') {
            illegalCurlyBraces += 1;
        }
        if (val === '>') {
            illegalThanSigns += 1;
        }
    };
    Stack.prototype.isChunckStarter = function (val) {
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
                // console.log(`Expected ${lastVal}, but found ${associations[val].openTag} instead.`)
                this.addIllegal(val);
            }
        }
        ;
    };
    return Stack;
}());
for (var i = 0; i < chuncks.length; i++) {
    var stack = new Stack();
    for (var j = 0; j < chuncks[i].length; j++) {
        var currentVal = chuncks[i][j];
        stack.isChunckStarter(currentVal);
        stack.isChunckEnder(currentVal);
    }
}
console.log(getIllegalSum());
