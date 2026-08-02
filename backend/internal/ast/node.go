package ast

type ASTNode interface {
	Eval() (float64,error)
}

type Operation string;

const (
	Add Operation = "+"
	Sub Operation = "-"
	Mul Operation = "*"
	Div Operation = "/"
)

type NodeType string;

const (
	B NodeType = "BinaryExpr"
	L NodeType = "Literal"
)

