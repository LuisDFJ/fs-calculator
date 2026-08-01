package main

import (
	"errors"
	"fmt"
	"encoding/json"
	"net/http"
)

type ASTNode interface {
	Eval() (float64,error)
}

type NodeType string;
const (
	B NodeType = "BinaryExpr"
	L NodeType = "Literal"
)

type Expr struct {
	Type	NodeType	`json:"type"`
	Op		Operation `json:"op,omitempty"`
	Left	*Expr			`json:"left,omitempty"`
	Right	*Expr			`json:"right,omitempty"`
	Val		*float64	`json:"val,omitempty"`
}

type Status string
const (
	OK Status = "OK"
	ERR Status = "ERR"
)
type Response struct {
	S 	Status	`json:"status"`
	Val float64	`json:"val"`
}

func (expr Expr) Parse() (ASTNode,error) {
	switch expr.Type {
	case B:
		left,  eL := expr.Left.Parse()
		right, eR := expr.Right.Parse()
		if eL == nil && eR == nil {
			return BinaryExpr{ Op:expr.Op, Left:left, Right: right }, nil
		}
		return nil, fmt.Errorf("Error parsing %v operation - [left]: %v - [right]: %v", expr.Op, eL, eR)
	case L:
		if expr.Val != nil {
			return Literal(*expr.Val), nil
		}
		return nil, errors.New("Error parsing literal")
	default:
		return nil, errors.New("Expression Type Undefined")
	}
}

type Operation string;
const (
	Add Operation = "+"
	Sub Operation = "-"
	Mul Operation = "*"
	Div Operation = "/"
)

type BinaryExpr struct {
	Op 	 	Operation
	Left 	ASTNode
	Right ASTNode
}

type Literal float64

func (expr BinaryExpr) Eval() (float64,error) {
	switch expr.Op {
	case Add:
		return expr.evalF( func(a,b float64) float64 {return a + b} )
	case Sub:
		return expr.evalF( func(a,b float64) float64 {return a - b} )
	case Mul:
		return expr.evalF( func(a,b float64) float64 {return a * b} )
	case Div:
		right,_ := expr.Right.Eval()
		if right == 0 { return 0, errors.New("Division by 0") }
		return expr.evalF( func(a,b float64) float64 {return a / b} )
	default:
		return 0, errors.New("Unkown Operation")
	}
}


func (expr BinaryExpr) evalF( f func(a,b float64) float64 ) (float64,error) {
	right, rightError := expr.Right.Eval()
	left,  leftError  := expr.Left.Eval()
	if rightError == nil && leftError == nil {
		return f(left,right), nil
	}
	return 0, errors.New("Binary Evaluation Error")
}

func (lit Literal) Eval() (float64,error) {
	return float64(lit), nil
}



func handleSolve(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var expr Expr
	err := json.NewDecoder(r.Body).Decode(&expr)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	ast,err := expr.Parse()
	if err != nil {
		http.Error(w, "Invalid Expression", http.StatusUnprocessableEntity)
		return
	}

	val,err := ast.Eval()
	if err != nil {
		http.Error(w, "Invalid Syntax Tree", http.StatusUnprocessableEntity)
	}

	resp := Response{ S:OK, Val:val }
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc( func(w http.ResponseWriter, r *http.Request) {
		// TODO: Delimit Secure Origins for Production
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w,r)
	})
}

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("POST /solve", handleSolve)

	handler := corsMiddleware(mux)

	fmt.Println("Server starting on :8080")
	fmt.Println(http.ListenAndServe(":8080", handler))
}
