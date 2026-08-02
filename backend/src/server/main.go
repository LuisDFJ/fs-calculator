package main

import (
	"fmt"
	"net/http"
	"server/internal/server"
)

func main() {
	fmt.Println("Server starting on :8080")
	fmt.Println(http.ListenAndServe(":8080", server.New()))
}
