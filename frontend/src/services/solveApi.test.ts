import { describe, expect, it, vi } from "vitest";
import { solveExpression } from "./solveApi";

describe("calculatorApi", () => {
  it("returns the computed value", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ val: 42 }),
      })
    );

    const result = await solveExpression({
      type: "Literal",
      val: 42,
    });

    expect(result).toBe(42);
  });

  it("throws on server error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => "Internal Server Error",
      })
    );

    await expect(
      solveExpression({
        type: "Literal",
        val: 1,
      })
    ).rejects.toThrow();
  });
});
