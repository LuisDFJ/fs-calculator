import {
  type ASTNode,
  type Operator,
  type Token,
} from "../types/ast";

import { getPresedence } from "./operators";

export function toAST( tokens : Token[] ) : ASTNode {
  var operators : Operator[] = []
  var nodes : ASTNode[] = []

  const buildNode = () => {
    const op = operators.pop();
    const right = nodes.pop();
    const left = nodes.pop();
    if (!op || !left || !right)
      throw new Error("Ivalid expression");

    nodes.push( {type: 'BinaryExpr', op, left, right} );
  }

  for ( const token of tokens) {
    if ( typeof token === "number" ) {
      nodes.push({type: 'Literal',val: token})
    } else {
      while (
        operators.length &&
        getPresedence(operators.at(-1)!) >= getPresedence(token)
      ){
        buildNode();
      }
      operators.push(token);
    }
  }

  while (operators.length > 0) 
    buildNode();

  if (nodes.length !== 1)
    throw new Error("Invalid Expression");

  return nodes[0];
}
