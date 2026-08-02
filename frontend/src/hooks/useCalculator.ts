import { useState } from "react"
import { toTokens } from "../parser/tokens"
import { toAST } from "../parser/ast"
import { solveExpression } from "../services/solveApi"

export function useCalculator() {
  const [expr, setExpr]  = useState('')
  const [error,setError] = useState('')

  async function solve() {
    try {
      const tokens = toTokens(expr);
      const ast = toAST(tokens);
      const value = await solveExpression(ast);
      setExpr(String(value));
      setError("");
    } catch(e) {
      if (e instanceof Error)
        setError(e.message);
    }
  }

  return {
    expr,
    error,

    append(key: string) {
      setExpr( (prev) => prev + key )
      setError('')
    },

    clear() {
      setExpr('')
      setError('')
    },

    delete() {
      setExpr( (prev) => prev.slice(0,-1) )
      setError('')
    },

    solve,
  };
}


