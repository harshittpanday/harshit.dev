import http from "node:http";

const port = Number(process.env.MOCK_REDIS_PORT ?? 6380);
const expectedToken = process.env.MOCK_REDIS_TOKEN ?? "mock-token";
let storedValue = null;

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.method !== "POST") {
    response.statusCode = 405;
    response.end(JSON.stringify({ error: "method not allowed" }));
    return;
  }

  if (request.headers.authorization !== `Bearer ${expectedToken}`) {
    response.statusCode = 401;
    response.end(JSON.stringify({ error: "invalid token" }));
    return;
  }

  let body = "";
  request.setEncoding("utf8");
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", () => {
    let command;
    try {
      command = JSON.parse(body);
    } catch {
      response.statusCode = 400;
      response.end(JSON.stringify({ error: "invalid JSON" }));
      return;
    }

    if (command[0] === "GET") {
      response.end(JSON.stringify({ result: storedValue }));
      return;
    }

    if (command[0] === "SET") {
      storedValue = command[2];
      response.end(JSON.stringify({ result: "OK" }));
      return;
    }

    response.statusCode = 400;
    response.end(JSON.stringify({ error: "unsupported command" }));
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Mock Redis REST listening on http://127.0.0.1:${port}`);
});
