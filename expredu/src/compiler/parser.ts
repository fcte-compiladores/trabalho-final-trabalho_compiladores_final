import type { Token, ASTNode, BinaryOpNode, UnaryOpNode, NumberNode, VariableNode } from '../types/compiler';


export class Parser {
  private tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): ASTNode {
    const result = this.expression();
    
    if (this.current < this.tokens.length) {
      throw new Error(`Unexpected token '${this.tokens[this.current].value}' at position ${this.tokens[this.current].position}`);
    }
    
    return result;
  }

  private expression(): ASTNode {
    let node = this.term();

    while (this.current < this.tokens.length && 
           this.tokens[this.current].type === 'OPERATOR' && 
           (this.tokens[this.current].value === '+' || this.tokens[this.current].value === '-')) {
      const operator = this.tokens[this.current].value;
      this.current++;
      const right = this.term();
      
      node = {
        type: 'BinaryOp',
        operator,
        left: node,
        right
      } as BinaryOpNode;
    }

    return node;
  }

  private term(): ASTNode {
    let node = this.factor();

    while (this.current < this.tokens.length && 
           this.tokens[this.current].type === 'OPERATOR' && 
           (this.tokens[this.current].value === '*' || this.tokens[this.current].value === '/')) {
      const operator = this.tokens[this.current].value;
      this.current++;
      const right = this.factor();
      
      node = {
        type: 'BinaryOp',
        operator,
        left: node,
        right
      } as BinaryOpNode;
    }

    return node;
  }

  private factor(): ASTNode {
    const token = this.tokens[this.current];

    if (!token) {
      throw new Error('Unexpected end of expression');
    }

    // Unary operators
    if (token.type === 'OPERATOR' && (token.value === '+' || token.value === '-')) {
      this.current++;
      const operand = this.factor();
      return {
        type: 'UnaryOp',
        operator: token.value,
        operand
      } as UnaryOpNode;
    }

    // Numbers
    if (token.type === 'NUMBER') {
      this.current++;
      const value = parseFloat(token.value);
      if (isNaN(value)) {
        throw new Error(`Invalid number '${token.value}' at position ${token.position}`);
      }
      return {
        type: 'Number',
        value
      } as NumberNode;
    }

    // Variables
    if (token.type === 'VARIABLE') {
      this.current++;
      return {
        type: 'Variable',
        name: token.value
      } as VariableNode;
    }

    // Parentheses
    if (token.type === 'LPAREN') {
      this.current++;
      const node = this.expression();
      
      if (this.current >= this.tokens.length || this.tokens[this.current].type !== 'RPAREN') {
        throw new Error('Missing closing parenthesis');
      }
      
      this.current++;
      return node;
    }

    throw new Error(`Unexpected token '${token.value}' at position ${token.position}`);
  }
}

export function parse(tokens: Token[]): ASTNode {
  const parser = new Parser(tokens);
  return parser.parse();
}