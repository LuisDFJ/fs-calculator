package transport

import (
	"encoding/json"
	"net/http"
	"server/internal/ast"
)

func HandleSolve(w http.ResponseWriter, r *http.Request) {
	var expr ast.Expr

	if err := json.NewDecoder(r.Body).Decode(&expr); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	tree,err := expr.Parse()
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	value,err := tree.Eval()
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(Response{
		Status: OK,
		Value: value,
	})
}

