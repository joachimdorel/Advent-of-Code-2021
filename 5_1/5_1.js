var fs = require('fs');
// Open the file
var data = fs.readFileSync('input', 'utf8');
var moves = data.split('\n');
var Coordinate = /** @class */ (function () {
    function Coordinate(x, y) {
        this.lines = 0;
        this.x = x;
        this.y = y;
    }
    return Coordinate;
}());
;
var Grid = /** @class */ (function () {
    function Grid(size) {
        this.grid = [];
        for (var i = 0; i < size; i++) {
            var line = [];
            for (var j = 0; j < size; j++) {
                line.push(new Coordinate(j, i));
            }
            this.grid.push(line);
        }
    }
    Grid.prototype.display = function () {
        this.grid.forEach(function (line) {
            var lineContent = '';
            line.forEach(function (coordinate) {
                lineContent += (coordinate.lines === 0) ? '.' : coordinate.lines;
            });
            console.log(lineContent);
        });
    };
    ;
    Grid.prototype.addMove = function (x1, y1, x2, y2) {
        var direction;
        if ((x1 === x2) || (y1 === y2)) {
            if (x1 < x2) {
                direction = 'moveRight';
            }
            if (x1 > x2) {
                direction = 'moveLeft';
            }
            if (y2 > y1) {
                direction = 'moveDown';
            }
            if (y2 < y1) {
                direction = 'moveUp';
            }
            console.log(direction);
        }
    };
    ;
    return Grid;
}());
var grid = new Grid(10);
grid.display();
moves.forEach(function (move) {
    var line = move.split(/ -> /);
    console.log(line);
    var x1 = line[0].split(',')[0];
    var y1 = line[0].split(',')[1];
    var x2 = line[1].split(',')[0];
    var y2 = line[1].split(',')[1];
    grid.addMove(x1, y1, x2, y2);
});
