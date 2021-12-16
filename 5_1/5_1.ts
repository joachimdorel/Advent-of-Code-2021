const fs = require('fs');

// Open the file
const data = fs.readFileSync('input', 'utf8');
const moves = data.split('\n');

class Coordinate {
  x: number;
  y: number;
  lines: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
};

class Grid {
  grid: Array<Array<Coordinate>>;

  constructor(size: number) {
    this.grid = [];
    for (let i=0; i<size; i++) {
      const line: Array<Coordinate> = [];
      for (let j = 0; j < size; j++) {
        line.push(new Coordinate(j, i));
      }
      this.grid.push(line);
    }
  }

  display() {
    this.grid.forEach((line) => {
      let lineContent = '';
      line.forEach((coordinate) => {
        lineContent += (coordinate.lines === 0) ? '.' : coordinate.lines;
      });
      console.log(lineContent);
    });
  };

  addMove(x1: number, y1: number, x2: number, y2: number) {
    let direction;

    if (x1 === x2) {
      
    }


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
}

const grid = new Grid(10);
grid.display();

moves.forEach((move) => {
  const line = move.split(/ -> /);
  console.log(line)
  const x1 = line[0].split(',')[0];
  const y1 = line[0].split(',')[1];
  const x2 = line[1].split(',')[0];
  const y2 = line[1].split(',')[1];
  grid.addMove(x1, y1, x2, y2);
});
