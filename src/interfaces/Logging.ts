enum LogOrigin {
  INFLUXDB = "INFLUXDB",
  SERVER = "SERVER",
  CAREDB = "CAREDB",
}

enum LogType {
  ERROR = "ERROR",
  INFO = "INFO",
}


class InfluxDBError extends Error {
  origin: LogOrigin;

  constructor(message: string) {
    super(message);
    this.name = "InfluxDBError";
    this.origin = LogOrigin.INFLUXDB;

    Object.setPrototypeOf(this, InfluxDBError.prototype);
  }
}

class CareDBError extends Error {
  origin: LogOrigin;

  constructor(message: string) {
    super(message);
    this.name = "CareDBError";
    this.origin = LogOrigin.CAREDB;

    Object.setPrototypeOf(this, InfluxDBError.prototype);
  }
}

export { LogOrigin, LogType, InfluxDBError, CareDBError };
