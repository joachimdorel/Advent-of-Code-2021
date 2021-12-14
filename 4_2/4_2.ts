const fs = require('fs');

// Open the file
const data = fs.readFileSync('input', 'utf8');

const games = data.split('\n');
const draw = games.shift().split(',').map(Number);

class NumberGrid {
  value: number;
  checked: boolean;

  constructor(value: number) {
    this.value = value;
    this.checked = false;
  }

  isDraw(draw: number) {
    if (this.value === draw) {
      this.checked = true;
      return true;
    }
  }
};

class Line {
  content: Array<NumberGrid>;
  checked: boolean;

  constructor(content: string) {

    // init content
    const castedContent = content.trim().split(/ +/).map(Number);
    this.content = [];
    castedContent.forEach((numberContent) => {
      this.content.push(new NumberGrid(numberContent));
    });

    // init checked
    this.checked = false;
  }

  isChecked() {
    this.checked = true;
    this.content.forEach((numberGrid) => {
      this.checked = this.checked && numberGrid.checked;
    });
    return this.checked;
  }

  isDrawInLine(draw: number) {
    this.content.forEach((number) => {
      number.isDraw(draw);
    });
  }

  getSum(): number {
    let sum = 0;
    this.content.forEach((numberGrid) => {
      sum += numberGrid.checked ? 0 : numberGrid.value; 
    });
    return sum;
  };
};

class Grid {
  id: number;
  checked: boolean;
  content: Array<Line>;

  constructor(lines: Array<string>, id: number) {
    this.id = id;
    this.checked = false;
    this.content = [];
    lines.forEach((line) => {
      if (line.length === 0) {
        return;
      }
      this.content.push(new Line(line));
    });
  };

  checkLinesComplete(): boolean {
    let lineComplete = false;
    this.content.forEach((line) => {
      if (line.isChecked()) {
        lineComplete = true;
      }
    });
    return lineComplete;
  };

  checkColumnsComplete(): boolean {
    for (let j=0; j < this.content.length; j++) {
      let columnComplete = true;
      for (let i=0; i<this.content.length; i++) {
        columnComplete = columnComplete && this.content[i].content[j].checked;
      }
      if (columnComplete) {
        return columnComplete;
      }
    }; 
    return false;
  };

  // Pass the value of checked numbers to true
  isDrawInGrid(draw: number) {
    this.content.forEach((line) => {
      line.isDrawInLine(draw);
    });
  };

  sumUnmarkedNumbers(): number {
    let sum = 0;
    this.content.forEach((line) => {
      sum += line.getSum();
    });
    return sum;
  }
};

interface Result {
  sumUnmarkedNumbers: number;
  lastDraw: number;
}

class Bingo {
  content: Array<Grid>;

  constructor(grids: Array<string>) {
    this.content = [];
    let gridId = 0;
    while (grids.length > 0) {
      this.content.push(new Grid(grids.splice(0, 6), gridId));
      gridId+=1;
    }
  }

  play(draw: Array<number>): Result {
    let worstGridID = null;
    let gridFinished = 0;
    let lastDraw: number;

    draw.forEach((d) => {
      if (!worstGridID) {
        this.content.forEach((grid) => {
          if (grid.checked) {
            return;
          }
          // play the draw in the grid
          grid.isDrawInGrid(d);

          const linesComplete = grid.checkLinesComplete();
          const columnsComplete = grid.checkColumnsComplete();
          if (linesComplete || columnsComplete) {
            grid.checked = true;
            gridFinished++;
            if (gridFinished === this.content.length) {
              worstGridID = grid.id;
            }
            lastDraw = d;
            return;
          }
        });
      }
    });

    const sumUnmarkedNumbers = this.content[worstGridID].sumUnmarkedNumbers();
    const result: Result = { sumUnmarkedNumbers, lastDraw };
    return result;
  }
}

const bingo = new Bingo(games);
const bingoResult = bingo.play(draw);
console.log(bingoResult.lastDraw * bingoResult.sumUnmarkedNumbers);
