import ws from "k6/ws";
import { check } from "k6";

export default function () {
  const url = "ws://127.0.0.1:8080/";
  const res = ws.connect(url, {}, function (socket) {
    socket.on("open", function () {
      console.log("Connected");
      socket.send("Hello server");
    });

    socket.on("message", function (message) {
      console.log("Received message:", message);
    });

    socket.on("close", () => console.log("Disconnected"));
    socket.setTimeout(() => socket.close(), 3000);
  });

  check(res, { "status is 101": (r) => r && r.status === 101 });
}
