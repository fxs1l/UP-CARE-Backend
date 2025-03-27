export default interface Log {
  origin?: LogOrigin;
  type: LogType;
}

export enum LogOrigin {
  INFLUXDB = "INFLUXDB",
  SERVER = "SERVER",
  CAREDB = "CAREDB",
}

export enum LogType {
  ERROR = "ERROR",
  INFO = "INFO",
}
