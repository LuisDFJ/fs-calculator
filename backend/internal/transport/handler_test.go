package transport

import (
    "bytes"
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestSolveEndpoint(t *testing.T) {

    body := []byte(`
{
    "type":"BinaryExpr",
    "op":"+",
    "left":{
        "type":"Literal",
        "val":2
    },
    "right":{
        "type":"Literal",
        "val":3
    }
}
`)

    req := httptest.NewRequest(http.MethodPost, "/solve", bytes.NewReader(body))
    rr := httptest.NewRecorder()

    HandleSolve(rr, req)

    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200 got %d", rr.Code)
    }
}

