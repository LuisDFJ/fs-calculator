import { type Token } from "../types/ast";
import { isOperator } from "./operators";

export function toTokens( expr : string ) : Token[] {
  var list : string[] = [];

  const expr_list = [...expr];
  expr_list.forEach((char,idx) => {
    if (isOperator(char) || idx === 0) {
      list.push(char);
    } else if (!isOperator(expr_list[idx-1])) {
      list[list.length - 1] += char;
    } else {
      list.push(char);
    }
  })

  return list.map( (token : string) => {
    if (isOperator(token)) return token;

    const val = Number(token);
    if (Number.isNaN(val))
      throw new Error("Invalid Number")
    return val;
  });
}
