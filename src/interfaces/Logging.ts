enum LogOrigin {
  INFLUXDB = "INFLUX_DB",
  SERVER = "COAP_SERVER",
  CAREDB = "CARE_DB",
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
