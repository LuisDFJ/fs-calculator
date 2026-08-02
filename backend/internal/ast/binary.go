package ast

import (
	"errors"
)

type BinaryExpr struct {
	Op 	 	Operation
	Left 	ASTNode
	Right ASTNode
}

func (expr BinaryExpr) Eval() (float64,error) {
	switch expr.Op {
	case Add:
		return expr.eval( func(a,b float64) float64 {return a + b} )
	case Sub:
		return expr.eval( func(a,b float64) float64 {return a - b} )
	case Mul:
		return expr.eval( func(a,b float64) float64 {return a * b} )
	case Div:
		right,_ := expr.Right.Eval()
		if right == 0 { return 0, errors.New("division by zero") }
		return expr.eval( func(a,b float64) float64 {return a / b} )
	default:
		return 0, errors.New("unkown operation")
	}
}


func (expr BinaryExpr) eval( f func(a,b float64) float64 ) (float64,error) {
	right, err := expr.Right.Eval()
	if err != nil { return 0, err }

	left,  err  := expr.Left.Eval()
	if err != nil { return 0, err }

	return f(left,right), nil
}
