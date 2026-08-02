import { describe, expect, it } from "vitest";
import { toAST } from "./ast";

describe("toAST", () => {
  it("builds a literal node", () => {
    expect(toAST([5])).toEqual({
      type: "Literal",
      val: 5,
    });
  });

  it("builds a simple expression", () => {
    expect(toAST([2, "+", 3])).toEqual({
      type: "BinaryExpr",
      op: "+",
      left: {
        type: "Literal",
        val: 2,
      },
      right: {
        type: "Literal",
        val: 3,
      },
    });
  });

  it("respects operator precedence", () => {
    expect(toAST([2, "+", 3, "*", 4])).toEqual({
      type: "BinaryExpr",
      op: "+",
      left: {
        type: "Literal",
        val: 2,
      },
      right: {
        type: "BinaryExpr",
        op: "*",
        left: {
          type: "Literal",
          val: 3,
        },
        right: {
          type: "Literal",
          val: 4,
        },
      },
    });
  });

  it("throws on malformed expression", () => {
    expect(() => toAST([2, "+"])).toThrow();
  });
});
