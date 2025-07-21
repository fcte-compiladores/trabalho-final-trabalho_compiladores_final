import type { ASTNode, BinaryOpNode, UnaryOpNode, NumberNode, VariableNode } from '../types/compiler';


export function visualizeAST(node: ASTNode, depth: number = 0, isLast: boolean = true, prefix: string = ''): string {
  const indent = prefix + (isLast ? '└── ' : '├── ');
  const nextPrefix = prefix + (isLast ? '    ' : '│   ');
  
  let result = indent + getNodeLabel(node) + '\n';
  
  const children = getChildren(node);
  
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const isLastChild = i === children.length - 1;
    result += visualizeAST(child, depth + 1, isLastChild, nextPrefix);
  }
  
  return result;
}


function getNodeLabel(node: ASTNode): string {
  switch (node.type) {
    case 'Number':
      return `NUMBER: ${(node as NumberNode).value}`;
      
    case 'Variable':
      return `VARIABLE: ${(node as VariableNode).name}`;
      
    case 'UnaryOp':
      return `UNARY_OP: ${(node as UnaryOpNode).operator}`;
      
    case 'BinaryOp':
      return `BINARY_OP: ${(node as BinaryOpNode).operator}`;
      
    default:
      return 'UNKNOWN';
  }
}


function getChildren(node: ASTNode): ASTNode[] {
  switch (node.type) {
    case 'Number':
    case 'Variable':
      return [];
      
    case 'UnaryOp':
      return [(node as UnaryOpNode).operand];
      
    case 'BinaryOp':
      const binaryNode = node as BinaryOpNode;
      return [binaryNode.left, binaryNode.right];
      
    default:
      return [];
  }
}