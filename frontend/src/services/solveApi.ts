import { type ASTNode } from "../types/ast";

export async function solveExpression(ast : ASTNode) : Promise<number> {
  const res = await fetch(
    'http://localhost:8080/solve',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ast)
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Server Error (${res.status}): ${text}`
    );
  }

  const json = await res.json();
  if (json.val === undefined)
    throw new Error("Invalid Response");

  return json.val;
}

