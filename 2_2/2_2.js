var fs = require('fs');
// Open the file
var data = fs.readFileSync('input', 'utf8');
var movements = data.split('\n');
var Submarine = /** @class */ (function () {
    function Submarine(position, depth, aim) {
        if (position === void 0) { position = 0; }
        if (depth === void 0) { depth = 0; }
        if (aim === void 0) { aim = 0; }
        this.position = position;
        this.depth = depth;
        this.aim = aim;
    }
    Submarine.prototype.move = function (move, distance) {
        if (move === 'up') {
            this.aim -= distance;
        }
        if (move === 'down') {
            this.aim += distance;
        }
        if (move === 'forward') {
            this.position += distance;
            this.depth = this.depth + (this.aim * distance);
        }
    };
    ;
    Submarine.prototype.getFinalPosition = function () {
        return this.depth * this.position;
    };
    ;
    Submarine.prototype.logInfos = function () {
        console.log("Position: ".concat(this.position, " | Depth: ").concat(this.depth, " | Aim: ").concat(this.aim));
    };
    return Submarine;
}());
;
var sub1 = new Submarine(0, 0);
movements.forEach(function (movement) {
    var action = (movement).split(' ')[0];
    var distance = Number((movement).split(' ')[1]);
    sub1.move(action, Number(distance));
});
console.log(sub1.getFinalPosition());
