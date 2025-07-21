import { describe, test, expect } from 'vitest';
import { tokenize } from '../compiler/lexer';
import { parse } from '../compiler/parser';
import type { BinaryOpNode, NumberNode } from '../types/compiler';

describe('Parser', () => {
  test('should parse simple addition', () => {
    const tokens = tokenize('2 + 3');
    const ast = parse(tokens) as BinaryOpNode;
    
    expect(ast.type).toBe('BinaryOp');
    expect(ast.operator).toBe('+');
    expect((ast.left as NumberNode).value).toBe(2);
    expect((ast.right as NumberNode).value).toBe(3);
  });

  test('should respect operator precedence', () => {
    const tokens = tokenize('2 + 3 * 4');
    const ast = parse(tokens) as BinaryOpNode;
    
    expect(ast.type).toBe('BinaryOp');
    expect(ast.operator).toBe('+');
    expect((ast.left as NumberNode).value).toBe(2);
    
    const rightNode = ast.right as BinaryOpNode;
    expect(rightNode.type).toBe('BinaryOp');
    expect(rightNode.operator).toBe('*');
    expect((rightNode.left as NumberNode).value).toBe(3);
    expect((rightNode.right as NumberNode).value).toBe(4);
  });

  test('should handle parentheses', () => {
    const tokens = tokenize('(2 + 3) * 4');
    const ast = parse(tokens) as BinaryOpNode;
    
    expect(ast.type).toBe('BinaryOp');
    expect(ast.operator).toBe('*');
    
    const leftNode = ast.left as BinaryOpNode;
    expect(leftNode.type).toBe('BinaryOp');
    expect(leftNode.operator).toBe('+');
    expect((ast.right as NumberNode).value).toBe(4);
  });

  test('should throw error for mismatched parentheses', () => {
    const tokens = tokenize('(2 + 3');
    expect(() => parse(tokens)).toThrow('Missing closing parenthesis');
  });
});