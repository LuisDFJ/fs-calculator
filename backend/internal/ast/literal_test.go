package ast

import (
	"testing"
)

func TestLiteralEval(t *testing.T) {
	lit := Literal(42.5)
	value, err := lit.Eval()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if value != 42.5 {
		t.Fatalf("expected 42.5, got: %v", value)
	}
}

