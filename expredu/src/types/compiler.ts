export interface Token {
  type: 'NUMBER' | 'OPERATOR' | 'VARIABLE' | 'LPAREN' | 'RPAREN';
  value: string;
  position: number;
}

export interface ASTNode {
  type: 'BinaryOp' | 'UnaryOp' | 'Number' | 'Variable';
}

export interface BinaryOpNode extends ASTNode {
  type: 'BinaryOp';
  operator: string;
  left: ASTNode;
  right: ASTNode;
}

export interface UnaryOpNode extends ASTNode {
  type: 'UnaryOp';
  operator: string;
  operand: ASTNode;
}

export interface NumberNode extends ASTNode {
  type: 'Number';
  value: number;
}

export interface VariableNode extends ASTNode {
  type: 'Variable';
  name: string;
}

export interface EvaluationStep {
  expression: string;
  description: string;
  result: number;
}


export interface CompilerError {
  message: string;
  position: number;
}