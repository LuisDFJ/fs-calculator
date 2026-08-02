package transport

type Status string

const (
	OK Status = "OK"
	ERR Status = "ERR"
)

type Response struct {
	Status 	Status	`json:"status"`
	Value   float64	`json:"val,omitempty"`
	Error   string	`json:"error,omitempty"`
}

