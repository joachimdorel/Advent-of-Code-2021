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

function getIllegalSum(): number {
  return illegalParenthesis * 3 + illegalBrackets * 57 + illegalCurlyBraces * 1197 + illegalThanSigns * 25137;
}

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

  addIllegal(val: string) {
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
  }

  isChunckStarter(val: string) {
    const starters = ['(', '[', '{', '<'];
    if (starters.indexOf(val) !== -1) {
      this.content.push(val);
    }
  }

  isChunckEnder(val: string) {
    const enders = [')', ']', '}', '>'];

    if (enders.indexOf(val) !== -1) {
      const lastVal = this.content.pop();
      if (associations[val].openTag !== lastVal) {
        // console.log(`Expected ${lastVal}, but found ${associations[val].openTag} instead.`)
        this.addIllegal(val);
      }
    };
  }
}

for (let i=0; i<chuncks.length; i++) {
  let stack = new Stack();

  for (let j=0; j<chuncks[i].length; j++) {
    const currentVal = chuncks[i][j];

    stack.isChunckStarter(currentVal);

    stack.isChunckEnder(currentVal);
  }
}

console.log(getIllegalSum());
