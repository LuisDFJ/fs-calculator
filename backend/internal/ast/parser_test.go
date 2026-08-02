package ast

import (
	"testing"
)

func TestParseLiteral(t *testing.T) {
	value := 15.0
	expr := Expr {
		Type: L,
		Val: &value,
	}

	node, err := expr.Parse()

	if err != nil {
		t.Fatal(err)
	}

	result, _ := node.Eval()
	if result != 15 {
		t.Fatalf("expected 15 got %v", result)
	}
}

func TestParseBinaryExpression(t *testing.T) {
    two := 2.0
    three := 3.0

    expr := Expr{
        Type: B,
        Op: Add,
        Left: &Expr{
            Type: L,
            Val: &two,
        },
        Right: &Expr{
            Type: L,
            Val: &three,
        },
    }

    node, err := expr.Parse()
    if err != nil {
        t.Fatal(err)
    }

    result, _ := node.Eval()
    if result != 5 {
        t.Fatalf("expected 5 got %v", result)
    }
}

