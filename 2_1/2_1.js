var fs = require('fs');
// Open the file
var data = fs.readFileSync('input', 'utf8');
var movements = data.split('\n');
var Submarine = /** @class */ (function () {
    function Submarine(position, depth) {
        if (position === void 0) { position = 0; }
        if (depth === void 0) { depth = 0; }
        this.position = position;
        this.depth = depth;
    }
    Submarine.prototype.up = function (distance) {
        this.depth -= distance;
    };
    ;
    Submarine.prototype.down = function (distance) {
        this.depth += distance;
    };
    ;
    Submarine.prototype.forward = function (distance) {
        this.position += distance;
    };
    ;
    Submarine.prototype.move = function (move, distance) {
        if (move === 'up') {
            this.up(distance);
        }
        if (move === 'down') {
            this.down(distance);
        }
        if (move === 'forward') {
            this.forward(distance);
        }
    };
    ;
    Submarine.prototype.finalPosition = function () {
        console.log(this.depth * this.position);
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
sub1.finalPosition();
