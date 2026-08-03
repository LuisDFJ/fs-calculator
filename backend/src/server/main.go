package main

import (
	"os"
	"fmt"
	"strings"
	"net/http"
	"server/internal/server"
)

func main() {
	var port string = os.Getenv("SERVER_PORT")
	var allowedOrigins []string = strings.Split(os.Getenv("ALLOWED_ORIGINS"), ",")
	if port != "" {
		portString := fmt.Sprintf(":%s", port)
		fmt.Printf("Server starting on %s\n", portString)
		fmt.Println(http.ListenAndServe(portString, server.New(allowedOrigins)))
	}
}
