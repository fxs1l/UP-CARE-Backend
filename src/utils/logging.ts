import { LogType, LogOrigin } from "@/types/Logger";

const log = {
  info(message: string, origin?: LogOrigin): void {
    const timestamp = new Date();
    const color = "\x1b[0m"; // Default color for informational
    const resetColor = "\x1b[0m";
    const philippineTime = new Date(timestamp.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    console.log(`${philippineTime.toISOString()} [${origin ?? LogOrigin.SERVER}]: ${color} ${message} ${resetColor}`);
  },
  error(message: string, origin?: LogOrigin): void {
    const timestamp = new Date();
    const color = "\x1b[31m"; // Red for errors
    const resetColor = "\x1b[0m";
    const philippineTime = new Date(timestamp.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    console.log(`${philippineTime.toISOString()} [${origin ?? LogOrigin.SERVER}]: ${color} ${message} ${resetColor}`);
  },
  success(message: string, origin?: LogOrigin): void {
    const timestamp = new Date();
    const color = "\x1b[32m"; // Green for success
    const resetColor = "\x1b[0m";
    const philippineTime = new Date(timestamp.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    console.log(`${philippineTime.toISOString()} [${origin ?? LogOrigin.SERVER}]: ${color} ${message} ${resetColor}`);
  },
};

export default log;
