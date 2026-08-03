import { type ASTNode } from "../types/ast";

export async function solveExpression(ast : ASTNode) : Promise<number> {
  const apiUrl = import.meta.env.VITE_SERVER_API_URL

  const res = await fetch(
    `${apiUrl}/solve`,
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

