# --- Build Stage
FROM golang:latest AS builder
WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
  go build -ldflags="-s -w" -o server ./src/server/main.go

# --- Runtime Stage
FROM scratch

COPY --from=builder  /app/server /server

ENV SERVER_PORT=8080
ENV ALLOWED_ORIGINS=http://localhost,http://localhost:80,http://localhost:5173

EXPOSE $SERVER_PORT
ENTRYPOINT ["/server"]
