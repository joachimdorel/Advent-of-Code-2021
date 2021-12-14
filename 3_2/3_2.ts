
const fs = require('fs');

// Open the file
const data = fs.readFileSync('input', 'utf8');
const diagnostics = data.split('\n');

// Function to get the most common between 0 and 1 for a given row
function mostCommon(arrayValues: Array<string>, position: number, type?: string): string{
  let ones = 0;
  let zeros = 0;
  arrayValues.forEach((value) => {
    (value[position] === '1') ? ones+=1 : zeros+=1;
  });
  if (type === 'oxygen') {
    return (ones >= zeros) ? '1' : '0';
  }
  return (zeros <= ones  ) ? '0' : '1';
};

function getRating(type: string, diagnostics: Array<string>): string {
  let diagnostics_datas = diagnostics;
  let conserved;

  for (let i = 0; i < diagnostics[0].length && (!conserved || conserved.length > 1); i++) {
    if (conserved && conserved.length > 0) {
      diagnostics_datas = conserved;
    }
    conserved = [];
    const mostCommonBit = mostCommon(diagnostics_datas, i, type);
    for (let j = 0; j < diagnostics_datas.length; j++) {
      if (diagnostics_datas[j][i] === mostCommonBit) {
        conserved.push(diagnostics_datas[j]);
      }
    }
  }

  return conserved[0];
};

const oxygenRating = getRating('oxygen', diagnostics);
const co2Rating = getRating('co2', diagnostics);

console.log(parseInt(oxygenRating, 2) * parseInt(co2Rating, 2));
