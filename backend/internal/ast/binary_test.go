package ast

import (
	"testing"
)

func TestBinaryEval(t *testing.T) {
	tests := []struct {
		name string
		expr BinaryExpr
		expected float64
	}{
		{
			"addition",
			BinaryExpr{
				Op:Add,
				Left: Literal(2),
				Right: Literal(3),
			},
			5,
		},
		{
			"substraction",
			BinaryExpr{
				Op:Sub,
				Left: Literal(7),
				Right: Literal(4),
			},
			3,
		},
		{
			"multiplication",
			BinaryExpr{
				Op:Mul,
				Left: Literal(6),
				Right: Literal(8),
			},
			48,
		},
		{
			"division",
			BinaryExpr{
				Op:Div,
				Left: Literal(10),
				Right: Literal(2),
			},
			5,
		},
		{
			"nested",
			BinaryExpr{
				Op:Div,
				Left: BinaryExpr{
					Op: Add,
					Left: Literal(10),
					Right: Literal(2),
				},
				Right: Literal(2),
			},
			6,
		},
	}

	for _,tt := range tests {
		value,err := tt.expr.Eval()
		if err != nil {
			t.Errorf("%s: unexpected error %v", tt.name, err)
			continue
		}
		if value != tt.expected {
			t.Errorf("%s: expected %v got %v", tt.name, tt.expected, value)
		}
	}
}

func TestDivisionByZero(t *testing.T) {
    expr := BinaryExpr{
        Op: Div,
        Left: Literal(10),
        Right: Literal(0),
    }

    _, err := expr.Eval()

    if err == nil {
        t.Fatal("expected error")
    }
}
