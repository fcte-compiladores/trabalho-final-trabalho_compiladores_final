import { describe, test, expect } from 'vitest';
import { tokenize } from '../compiler/lexer';

describe('Lexer', () => {
  test('should tokenize simple addition', () => {
    const tokens = tokenize('2 + 3');
    expect(tokens).toEqual([
      { type: 'NUMBER', value: '2', position: 0 },
      { type: 'OPERATOR', value: '+', position: 1 },
      { type: 'NUMBER', value: '3', position: 2 }
    ]);
  });

  test('should tokenize expression with variables', () => {
    const tokens = tokenize('x + y');
    expect(tokens).toEqual([
      { type: 'VARIABLE', value: 'x', position: 0 },
      { type: 'OPERATOR', value: '+', position: 1 },
      { type: 'VARIABLE', value: 'y', position: 2 }
    ]);
  });

  test('should tokenize parentheses', () => {
    const tokens = tokenize('(2 + 3)');
    expect(tokens).toEqual([
      { type: 'LPAREN', value: '(', position: 0 },
      { type: 'NUMBER', value: '2', position: 1 },
      { type: 'OPERATOR', value: '+', position: 2 },
      { type: 'NUMBER', value: '3', position: 3 },
      { type: 'RPAREN', value: ')', position: 4 }
    ]);
  });

  test('should tokenize decimal numbers', () => {
    const tokens = tokenize('3.14 * 2');
    expect(tokens).toEqual([
      { type: 'NUMBER', value: '3.14', position: 0 },
      { type: 'OPERATOR', value: '*', position: 4 },
      { type: 'NUMBER', value: '2', position: 5 }
    ]);
  });

  test('should throw error for invalid characters', () => {
    expect(() => tokenize('2 @ 3')).toThrow('Unexpected character');
  });
});