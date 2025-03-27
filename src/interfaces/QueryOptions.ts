export enum AggregateOptions {
  MEAN = "MEAN",
  SUM = "SUM",
  MIN = "MIN",
  MAX = "MAX",
}

export default interface QueryOptions {
  parameter?: string;
  nodeId?: string;
  sensorModel?: string;
  timeRange?: string;
  aggregate?: AggregateOptions;
}


