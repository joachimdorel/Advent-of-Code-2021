var fs = require('fs');
// Open the file
var data = fs.readFileSync('input', 'utf8');
var games = data.split('\n');
var draw = games.shift().split(',').map(Number);
var NumberGrid = /** @class */ (function () {
    function NumberGrid(value) {
        this.value = value;
        this.checked = false;
    }
    NumberGrid.prototype.isDraw = function (draw) {
        if (this.value === draw) {
            this.checked = true;
            return true;
        }
    };
    return NumberGrid;
}());
;
var Line = /** @class */ (function () {
    function Line(content) {
        var _this = this;
        // init content
        var castedContent = content.trim().split(/ +/).map(Number);
        this.content = [];
        castedContent.forEach(function (numberContent) {
            _this.content.push(new NumberGrid(numberContent));
        });
        // init checked
        this.checked = false;
    }
    Line.prototype.isChecked = function () {
        var _this = this;
        this.checked = true;
        this.content.forEach(function (numberGrid) {
            _this.checked = _this.checked && numberGrid.checked;
        });
        return this.checked;
    };
    Line.prototype.isDrawInLine = function (draw) {
        this.content.forEach(function (number) {
            number.isDraw(draw);
        });
    };
    Line.prototype.getSum = function () {
        var sum = 0;
        this.content.forEach(function (numberGrid) {
            sum += numberGrid.checked ? 0 : numberGrid.value;
        });
        return sum;
    };
    ;
    return Line;
}());
;
var Grid = /** @class */ (function () {
    function Grid(lines, id) {
        var _this = this;
        this.id = id;
        this.checked = false;
        this.content = [];
        lines.forEach(function (line) {
            if (line.length === 0) {
                return;
            }
            _this.content.push(new Line(line));
        });
    }
    ;
    Grid.prototype.checkLinesComplete = function () {
        var lineComplete = false;
        this.content.forEach(function (line) {
            if (line.isChecked()) {
                lineComplete = true;
            }
        });
        return lineComplete;
    };
    ;
    Grid.prototype.checkColumnsComplete = function () {
        for (var j = 0; j < this.content.length; j++) {
            var columnComplete = true;
            for (var i = 0; i < this.content.length; i++) {
                columnComplete = columnComplete && this.content[i].content[j].checked;
            }
            if (columnComplete) {
                return columnComplete;
            }
        }
        ;
        return false;
    };
    ;
    // Pass the value of checked numbers to true
    Grid.prototype.isDrawInGrid = function (draw) {
        this.content.forEach(function (line) {
            line.isDrawInLine(draw);
        });
    };
    ;
    Grid.prototype.sumUnmarkedNumbers = function () {
        var sum = 0;
        this.content.forEach(function (line) {
            sum += line.getSum();
        });
        return sum;
    };
    return Grid;
}());
;
var Bingo = /** @class */ (function () {
    function Bingo(grids) {
        this.content = [];
        var gridId = 0;
        while (grids.length > 0) {
            this.content.push(new Grid(grids.splice(0, 6), gridId));
            gridId += 1;
        }
    }
    Bingo.prototype.play = function (draw) {
        var _this = this;
        var worstGridID = null;
        var gridFinished = 0;
        var lastDraw;
        draw.forEach(function (d) {
            if (!worstGridID) {
                _this.content.forEach(function (grid) {
                    if (grid.checked) {
                        return;
                    }
                    grid.isDrawInGrid(d);
                    var linesComplete = grid.checkLinesComplete();
                    var columnsComplete = grid.checkColumnsComplete();
                    if (linesComplete || columnsComplete) {
                        grid.checked = true;
                        gridFinished++;
                        if (gridFinished === _this.content.length) {
                            worstGridID = grid.id;
                        }
                        lastDraw = d;
                        return;
                    }
                });
            }
        });
        var sumUnmarkedNumbers = this.content[worstGridID].sumUnmarkedNumbers();
        var result = { sumUnmarkedNumbers: sumUnmarkedNumbers, lastDraw: lastDraw };
        return result;
    };
    return Bingo;
}());
var bingo = new Bingo(games);
var bingoResult = bingo.play(draw);
console.log(bingoResult.lastDraw * bingoResult.sumUnmarkedNumbers);
