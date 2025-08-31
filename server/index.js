const WebSocket = require("ws");
const express = require("express");
const client = require("prom-client");

const app = express();
const port = process.env.PORT || 8080;

// ---- Prometheus metrics ----
const register = new client.Registry();

client.collectDefaultMetrics({ register });

// Custom WebSocket metrics
const activeConnections = new client.Gauge({
  name: "websocket_active_connections",
  help: "Number of active WebSocket connections",
});
const messagesReceived = new client.Counter({
  name: "websocket_messages_received_total",
  help: "Total number of messages received",
});
const messagesSent = new client.Counter({
  name: "websocket_messages_sent_total",
  help: "Total number of messages sent",
});

// Register custom metrics
register.registerMetric(activeConnections);
register.registerMetric(messagesReceived);
register.registerMetric(messagesSent);

app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// ---- WebSocket handling ----
const server = app.listen(port, () => {
  console.log(`🚀 WebSocket server running on port ${port}`);
});

const wss = new WebSocket.Server({ server });

let clients = new Set();

wss.on("connection", (ws) => {
  console.log("New client connected");
  clients.add(ws);
  activeConnections.set(clients.size);

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
    messagesReceived.inc();

    // broadcast to all
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
        messagesSent.inc();
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
    activeConnections.set(clients.size);
  });
});
