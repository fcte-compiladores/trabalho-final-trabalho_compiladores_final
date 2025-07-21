import type { ASTNode, BinaryOpNode, UnaryOpNode, NumberNode, VariableNode, EvaluationStep } from '../types/compiler';

/**
 * Evaluates an AST node and returns the result
 */
export function evaluate(node: ASTNode, variables: Record<string, number> = {}): number {
  switch (node.type) {
    case 'Number':
      return (node as NumberNode).value;
      
    case 'Variable':
      const varNode = node as VariableNode;
      if (!(varNode.name in variables)) {
        throw new Error(`Undefined variable '${varNode.name}'`);
      }
      return variables[varNode.name];
      
    case 'UnaryOp':
      const unaryNode = node as UnaryOpNode;
      const operandValue = evaluate(unaryNode.operand, variables);
      switch (unaryNode.operator) {
        case '+':
          return operandValue;
        case '-':
          return -operandValue;
        default:
          throw new Error(`Unknown unary operator: ${unaryNode.operator}`);
      }
      
    case 'BinaryOp':
      const binaryNode = node as BinaryOpNode;
      const leftValue = evaluate(binaryNode.left, variables);
      const rightValue = evaluate(binaryNode.right, variables);
      
      switch (binaryNode.operator) {
        case '+':
          return leftValue + rightValue;
        case '-':
          return leftValue - rightValue;
        case '*':
          return leftValue * rightValue;
        case '/':
          if (rightValue === 0) {
            throw new Error('Division by zero');
          }
          return leftValue / rightValue;
        default:
          throw new Error(`Unknown binary operator: ${binaryNode.operator}`);
      }
      
    default:
      throw new Error(`Unknown node type: ${(node as any).type}`);
  }
}

/**
 * Evaluates an AST step by step 
 */
export function evaluateStepByStep(node: ASTNode, variables: Record<string, number> = {}): EvaluationStep[] {
  const steps: EvaluationStep[] = [];
  
  function evaluateWithSteps(node: ASTNode, expression: string): number {
    switch (node.type) {
      case 'Number':
        return (node as NumberNode).value;
        
      case 'Variable':
        const varNode = node as VariableNode;
        if (!(varNode.name in variables)) {
          throw new Error(`Undefined variable '${varNode.name}'`);
        }
        const varValue = variables[varNode.name];
        steps.push({
          expression: `${varNode.name} → ${varValue}`,
          description: `Substitui variável '${varNode.name}' pelo valor ${varValue}`,
          result: varValue
        });
        return varValue;
        
      case 'UnaryOp':
        const unaryNode = node as UnaryOpNode;
        const operandValue = evaluateWithSteps(unaryNode.operand, nodeToString(unaryNode.operand, variables));
        const unaryResult = unaryNode.operator === '+' ? operandValue : -operandValue;
        
        steps.push({
          expression: `${unaryNode.operator}${operandValue}`,
          description: `Aplica operador unário '${unaryNode.operator}'`,
          result: unaryResult
        });
        
        return unaryResult;
        
      case 'BinaryOp':
        const binaryNode = node as BinaryOpNode;
        
        // First evaluate left side if it's complex
        const leftValue = evaluateWithSteps(binaryNode.left, nodeToString(binaryNode.left, variables));
        
        // Then evaluate right side if it's complex  
        const rightValue = evaluateWithSteps(binaryNode.right, nodeToString(binaryNode.right, variables));
        
        let result: number;
        switch (binaryNode.operator) {
          case '+':
            result = leftValue + rightValue;
            break;
          case '-':
            result = leftValue - rightValue;
            break;
          case '*':
            result = leftValue * rightValue;
            break;
          case '/':
            if (rightValue === 0) {
              throw new Error('Division by zero');
            }
            result = leftValue / rightValue;
            break;
          default:
            throw new Error(`Unknown binary operator: ${binaryNode.operator}`);
        }
        
        steps.push({
          expression: `${leftValue} ${binaryNode.operator} ${rightValue}`,
          description: `Executa operação '${binaryNode.operator}' entre ${leftValue} e ${rightValue}`,
          result
        });
        
        return result;
        
      default:
        throw new Error(`Unknown node type: ${(node as any).type}`);
    }
  }
  
  evaluateWithSteps(node, nodeToString(node, variables));
  return steps;
}

/**
 * Converts an AST node back to string representation
 */
function nodeToString(node: ASTNode, variables: Record<string, number>): string {
  switch (node.type) {
    case 'Number':
      return (node as NumberNode).value.toString();
      
    case 'Variable':
      const varNode = node as VariableNode;
      return varNode.name;
      
    case 'UnaryOp':
      const unaryNode = node as UnaryOpNode;
      return `${unaryNode.operator}${nodeToString(unaryNode.operand, variables)}`;
      
    case 'BinaryOp':
      const binaryNode = node as BinaryOpNode;
      return `(${nodeToString(binaryNode.left, variables)} ${binaryNode.operator} ${nodeToString(binaryNode.right, variables)})`;
      
    default:
      return 'unknown';
  }
}