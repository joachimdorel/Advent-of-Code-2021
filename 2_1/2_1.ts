
const fs = require('fs');

// Open the file
const data = fs.readFileSync('input', 'utf8');
const movements = data.split('\n');

class Submarine {
  position: number;
  depth: number;

  constructor(position=0, depth=0) {
    this.position = position;
    this.depth = depth;
  }

  move(move: string, distance: number): void {
    if(move === 'up') {
      this.depth -= distance;
    }

    if (move === 'down') {
      this.depth += distance;
    }

    if (move === 'forward') {
      this.position += distance;
    }
  };

  getFinalPosition() {
    return this.depth * this.position;
  };

};

const sub1 = new Submarine(0, 0);

movements.forEach((movement) => {
  const action = (movement).split(' ')[0];
  const distance = Number((movement).split(' ')[1]);

  sub1.move(action, Number(distance));
});

console.log(sub1.getFinalPosition());

