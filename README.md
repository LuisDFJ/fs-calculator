# Sezzle Interview FullStack Calculator

**Author**: Luis David Fuentes Juvera

## Overview

## Architecture

## How to Setup and Run

## API Example

The REST API microservice is exposed on port `8080` and provides the following endpoint:

`POST /solve`

The request body consists of an AST-like JSON object representing an arithmetic expression. The structure is recursive and easily extensible. The currently supported expression types are `BinaryExpr` and `Literal`.

For example, the expression `23.5 + 12.5 * 2.5` is represented as:

```json
{
    "type": "BinaryExpr",
    "op": "+",
    "left": {
        "type": "Literal",
        "val": 23.5
    },
    "right": {
        "type": "BinaryExpr",
        "op": "*",
        "left": {
            "type": "Literal",
            "val": 12.5
        },
        "right": {
            "type": "Literal",
            "val": 2.5
        }
    }
}
```

Any algebraic expression can be represented using this recursive structure. More sophisticated expressions can be supported by introducing additional expression types. For example, unary operators (such as `%`) could be represented by defining a `UnaryExpr` type containing a single child expression. Likewise, the set of supported operations can be extended beyond the current operators (`+`, `-`, `*`, `/`), while preserving the conventional rules of operator precedence.

The abstract definitions for the currently supported expression types are shown below:

```typescript
{
    type:   "BinaryExpr",
    op:     Operation,
    left:   Expr,
    right:  Expr
}

{
    type:   "Literal",
    val:    number
}
```

## Tests

## Tradeoffs

## General

**Time Spent**:

**Use of AI**:

**Prompts**:
