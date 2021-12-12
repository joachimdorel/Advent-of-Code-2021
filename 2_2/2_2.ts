
const fs = require('fs');

// Open the file
const data = fs.readFileSync('input', 'utf8');
const movements = data.split('\n');

class Submarine {
  position: number;
  depth: number;
  aim: number;

  constructor(position=0, depth=0, aim=0) {
    this.position = position;
    this.depth = depth;
    this.aim = aim;
  }

  move(move: string, distance: number): void {
    if(move === 'up') {
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

  getFinalPosition() {
    return this.depth * this.position;
  };

  logInfos() {
    console.log(`Position: ${this.position} | Depth: ${this.depth} | Aim: ${this.aim}`);
  }
};

const sub1 = new Submarine(0, 0);

movements.forEach((movement) => {
  const action = (movement).split(' ')[0];
  const distance = Number((movement).split(' ')[1]);

  sub1.move(action, Number(distance));
});

console.log(sub1.getFinalPosition());

