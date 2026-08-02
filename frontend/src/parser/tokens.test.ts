import { describe, expect, it } from "vitest";
import { toTokens } from "./tokens";

describe("toTokens", () => {
  it("parses a single number", () => {
    expect(toTokens("42")).toEqual([42]);
  });

  it("parses addition", () => {
    expect(toTokens("12+3")).toEqual([12, "+", 3]);
  });

  it("parses decimal numbers", () => {
    expect(toTokens("3.14*2")).toEqual([3.14, "*", 2]);
  });

  it("parses multiple operators", () => {
    expect(toTokens("2+3*4-5")).toEqual([
      2,
      "+",
      3,
      "*",
      4,
      "-",
      5,
    ]);
  });

  it("throws on invalid number", () => {
    expect(() => toTokens("1.2.3")).toThrow();
  });
});
