import type { Token } from '../types/compiler';


export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let position = 0;
  
  // Remove whitespace and convert to lowercase
  const cleanInput = input.replace(/\s+/g, '');
  
  for (let i = 0; i < cleanInput.length; i++) {
    const char = cleanInput[i];
    
    // Numbers (including decimals)
    if (char.match(/[0-9]/)) {
      let numberStr = '';
      let j = i;
      
      // Collect all digits and at most one decimal point
      while (j < cleanInput.length && cleanInput[j].match(/[0-9.]/)) {
        numberStr += cleanInput[j];
        j++;
      }
      
      tokens.push({
        type: 'NUMBER',
        value: numberStr,
        position: i
      });
      
      i = j - 1; // Adjust loop counter
    }
    // Variables (letters)
    else if (char.match(/[a-zA-Z]/)) {
      let varName = '';
      let j = i;
      
      // Collect all letters and numbers for variable name
      while (j < cleanInput.length && cleanInput[j].match(/[a-zA-Z0-9]/)) {
        varName += cleanInput[j];
        j++;
      }
      
      tokens.push({
        type: 'VARIABLE',
        value: varName,
        position: i
      });
      
      i = j - 1; // Adjust loop counter
    }
    // Operators
    else if (char.match(/[+\-*/]/)) {
      tokens.push({
        type: 'OPERATOR',
        value: char,
        position: i
      });
    }
    // Parentheses
    else if (char === '(') {
      tokens.push({
        type: 'LPAREN',
        value: char,
        position: i
      });
    }
    else if (char === ')') {
      tokens.push({
        type: 'RPAREN',
        value: char,
        position: i
      });
    }
    // Unexpected character
    else {
      throw new Error(`Unexpected character '${char}' at position ${i}`);
    }
  }
  
  return tokens;
}