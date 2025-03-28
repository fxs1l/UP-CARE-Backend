import "tsconfig-paths/register";
import server from "./app";
import log from "@/utils/logging";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5683;
const threadAddress = process.env.THREAD_IP_ADDRESS;

// Start the server
server.listen(port, threadAddress, () => {

  log.info(`CoAP server is running on ${threadAddress} on port ${port}`);
});
