package ast

import (
	"errors"
	"fmt"
)

type Expr struct {
	Type	NodeType	`json:"type"`
	Op		Operation `json:"op,omitempty"`
	Left	*Expr			`json:"left,omitempty"`
	Right	*Expr			`json:"right,omitempty"`
	Val		*float64	`json:"val,omitempty"`
}

func (expr Expr) Parse() (ASTNode,error) {
	switch expr.Type {
	case B:
		if expr.Left == nil || expr.Right == nil {
			return nil, errors.New("binary expression missing operand")
		}
		left, err := expr.Left.Parse()
		if err != nil { return nil, err }

		right, err := expr.Right.Parse()
		if err != nil { return nil, err }

		return BinaryExpr{ Op:expr.Op, Left:left, Right: right }, nil
	case L:
		if expr.Val == nil {
			return nil, errors.New("missing literal value")
		}
		return Literal(*expr.Val), nil
	default:
		return nil, fmt.Errorf("unknown node type %q", expr.Type)
	}
}

