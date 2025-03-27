import "tsconfig-paths/register";
import * as coap from "coap";
import server from "./app";
import log from "@/utils/logging";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5683;
// const threadAddress = process.env.THREAD_IP_ADDRESS || "fd9b:3c63:6e6e:1:8cb6:83a1:5f52:967e";
const threadAddress = "localhost";

// Start the server
server.listen(port, threadAddress, () => {

  log.info(`CoAP server is running on ${threadAddress} on port ${port}`);
});
