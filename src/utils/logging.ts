import { LogOrigin } from "@/src/interfaces/Logging";

function toManilaISOString(date: Date) {
  // Add 8 hours in milliseconds
  const offsetMs = 8 * 60 * 60 * 1000;
  // Create a new Date adjusted to Manila time
  const manilaTime = new Date(date.getTime() + offsetMs);

  // Helper to pad numbers to 2 or 3 digits
  const pad = (num: any) => String(num).padStart(2, "0");
  const padMs = (num: any) => String(num).padStart(3, "0");

  // Using getUTC* because manilaTime is offset, so its UTC values correspond to Manila time
  const year = manilaTime.getUTCFullYear();
  const month = pad(manilaTime.getUTCMonth() + 1);
  const day = pad(manilaTime.getUTCDate());
  const hours = pad(manilaTime.getUTCHours());
  const minutes = pad(manilaTime.getUTCMinutes());
  const seconds = pad(manilaTime.getUTCSeconds());
  const milliseconds = padMs(manilaTime.getUTCMilliseconds());

  // Return an ISO-like string with the Manila offset
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

const resetColor = "\x1b[0m";

const log = {
  info(message: string, ...other: (string | object)[]): void {
    // Extract origin if any value in ...other is of type LogOrigin
    let origin = LogOrigin.SERVER; // Default value
    const filteredOther = other.filter(arg => {
      if (Object.values(LogOrigin).includes(arg as LogOrigin)) {
        origin = arg as LogOrigin;
        return false;
      }
      return true;
    });
    const timestamp = new Date();
    const color = "\x1b[0m"; // Default color for informational
    console.log(`${toManilaISOString(timestamp)} [${origin ?? LogOrigin.SERVER}]: ${color} ${message} ${resetColor}`);
    console.log(...filteredOther);
  },
  error(message: string, ...other: any[]): void {
    // Extract origin if any value in ...other is of type LogOrigin
    let origin = LogOrigin.SERVER; // Default value
    const filteredOther = other.filter(arg => {
      if (Object.values(LogOrigin).includes(arg as LogOrigin)) {
        origin = arg as LogOrigin;
        return false;
      }
      return true;
    });
    const timestamp = new Date();
    const color = "\x1b[31m"; // Red for errors
    console.log(`${toManilaISOString(timestamp)} [${origin ?? LogOrigin.SERVER}]: ${color} ${message} ${resetColor}`);
    console.log(...filteredOther);
  },
  success(message: string, ...other: any[]): void {
    // Extract origin if any value in ...other is of type LogOrigin
    let origin = LogOrigin.SERVER; // Default value
    const filteredOther = other.filter(arg => {
      if (Object.values(LogOrigin).includes(arg as LogOrigin)) {
        origin = arg as LogOrigin;
        return false;
      }
      return true;
    });
    const timestamp = new Date();
    const color = "\x1b[32m"; // Green for success
    console.log(`${toManilaISOString(timestamp)} [${origin ?? LogOrigin.SERVER}]: ${color} ${message} ${resetColor}`);
    console.log(...filteredOther);
  },
};

export default log;
