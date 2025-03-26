import "tsconfig-paths/register";
import * as coap from "coap";
import server from "./app";

// Start the server
server.listen(5683,"fd9b:3c63:6e6e:1:8cb6:83a1:5f52:967e", () => {
  console.log("CoAP server is running");
});
