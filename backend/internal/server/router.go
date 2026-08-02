package server

import (
	"net/http"
	"server/internal/middleware"
	"server/internal/transport"
)

func New() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /solve", transport.HandleSolve)
	return middleware.CORS(mux)
}

