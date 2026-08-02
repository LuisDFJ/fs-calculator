// Supported Operations ordered by presedence
export const VALID_OPERATORS = ["+", "-", "*", "/"] as const;

export type Operator = typeof VALID_OPERATORS[number];

export type ASTNode = BinaryExpr | Literal;

export interface BinaryExpr {
  type: 'BinaryExpr';
  op: Operator;
  left: ASTNode;
  right: ASTNode;
}

export interface Literal {
  type: 'Literal';
  val: number;
}

export type Token = Operator | number;
