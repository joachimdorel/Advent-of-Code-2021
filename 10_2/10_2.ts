const fs = require('fs');

// Open the file
const subsytem = fs.readFileSync('input', 'utf8');
const chuncks = subsytem.split('\n');

const associations = {
  ')': { openTag: '(', value: 3 },
  '}': { openTag: '{', value: 57 },
  ']': { openTag: '[', value: 1197 },
  '>': { openTag: '<', value: 25137 },
};

let illegalParenthesis: number = 0;
let illegalBrackets:    number = 0;
let illegalCurlyBraces: number = 0;
let illegalThanSigns:   number = 0;

class Stack {
  content: Array<string>;
  size: number = 0;

  constructor() {
    this.content = [];
  }

  push(value: string) {
    this.size += 1;
    this.content.push(value);
  }

  pop(): string {
    if (this.size === 0) {
      return null;
    }
    const value = this.content[this.size-1];
    this.content.splice(-1);
    return value;
  }

  addChunckStarters(val: string) {
    const starters = ['(', '[', '{', '<'];
    if (starters.indexOf(val) !== -1) {
      this.content.push(val);
    }
  }

  isChunckEnder(val: string): boolean {
    const enders = [')', ']', '}', '>'];

    if (enders.indexOf(val) !== -1) {
      const lastVal = this.content.pop();
      if (associations[val].openTag !== lastVal) {
        return true;
      }
      return false;
    };
  }
}

function getPoint(val: string): number {
  const starters = {
    '(' : { value: 1 },
    '[' : { value: 2 },
    '{' : { value: 3 },
    '<' : { value: 4 },
  };
  return starters[val].value;
}

const scores = [];
for (let i=0; i<chuncks.length; i++) {
  let stack = new Stack();
  let corrupted = false;

  for (let j=0; j<chuncks[i].length; j++) {
    const currentVal = chuncks[i][j];

    stack.addChunckStarters(currentVal);
    if (stack.isChunckEnder(currentVal)) {
      corrupted = true;
    }
  }

  if (!corrupted && (stack.content.length !== 0)) {
    let score = 0;
    while (stack.content.length > 0) {
      const valuePoped = stack.content.splice(-1)[0];
      score = (score * 5) + getPoint(valuePoped);
    }

    scores.splice(0, 0, score);
    for (let jj = 0; jj < scores.length; jj++) {
      if (scores[jj] > scores[jj+1]) {
        const buffer = scores[jj];
        scores[jj]   = scores[jj+1];
        scores[jj+1] = buffer;
      }
    } 
  }
}
console.log(scores[Math.floor(scores.length / 2)]);
