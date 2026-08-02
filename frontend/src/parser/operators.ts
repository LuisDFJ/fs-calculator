import { type Operator, VALID_OPERATORS } from "../types/ast";

export function isOperator(char: string): char is Operator {
  return VALID_OPERATORS.includes(char as any);
}

export function getPresedence(op : Operator): number {
  switch (op) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
  }
}
