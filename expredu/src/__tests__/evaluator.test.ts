import { describe, test, expect } from 'vitest';
import { tokenize } from '../compiler/lexer';
import { parse } from '../compiler/parser';
import { evaluate, evaluateStepByStep } from '../compiler/evaluator';

describe('Evaluator', () => {
  test('should evaluate simple addition', () => {
    const tokens = tokenize('2 + 3');
    const ast = parse(tokens);
    const result = evaluate(ast);
    expect(result).toBe(5);
  });

  test('should evaluate with operator precedence', () => {
    const tokens = tokenize('2 + 3 * 4');
    const ast = parse(tokens);
    const result = evaluate(ast);
    expect(result).toBe(14);
  });

  test('should evaluate with parentheses', () => {
    const tokens = tokenize('(2 + 3) * 4');
    const ast = parse(tokens);
    const result = evaluate(ast);
    expect(result).toBe(20);
  });

  test('should evaluate with variables', () => {
    const tokens = tokenize('x + y');
    const ast = parse(tokens);
    const result = evaluate(ast, { x: 5, y: 10 });
    expect(result).toBe(15);
  });

  test('should throw error for undefined variable', () => {
    const tokens = tokenize('x + y');
    const ast = parse(tokens);
    expect(() => evaluate(ast, { x: 5 })).toThrow("Undefined variable 'y'");
  });

  test('should generate evaluation steps', () => {
    const tokens = tokenize('2 * (3 + 1)');
    const ast = parse(tokens);
    const steps = evaluateStepByStep(ast);
    
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1].result).toBe(8);
  });
});