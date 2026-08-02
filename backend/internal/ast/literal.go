package ast

type Literal float64

func (l Literal) Eval() (float64,error) {
	return float64(l), nil
}
