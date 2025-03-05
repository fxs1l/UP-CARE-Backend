import "tsconfig-paths/register";
import * as coap from "coap";
import server from "./app";

// Start the server
server.listen(() => {
  console.log("CoAP server is running");
});
