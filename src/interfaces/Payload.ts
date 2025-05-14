/* eslint-disable @typescript-eslint/quotes */
export interface Payload {
  type: string;
  source: string;
  // latitude: `${number}°${number}'${number}.${number}"${'N' | 'S'}`;
  // longitude: `${number}°${number}'${number}.${number}"${'E' | 'W'}`;
  local_time: string;
  [key: string]: string | number;
}

export interface TrafficCountPayload {
  source: string;
  local_time: string;
  count: TrafficCount;
}

export interface TrafficFlowPayload {
  source: string;
  local_time: string;
  flow: TrafficFlow;
}

export interface TrafficFlow {
  status: "EXITED" | "ENTERED";
  direction: "NORTH" | "SOUTH" | "WEST" | "EAST";
  vehicle_id: string | number;
  vehicle_type: string;
}

export interface TrafficCount {
  car?: number;
  bus?: number;
  truck?: number;
  motorcycle?: number;
  jeep?: number;
  [key: string]: number | undefined;
}

export interface TallPayload {
  source: string;
  local_time: string;
  type: string;
  value: number;
}

export interface CareDatabaseWidePayload {
  topic: string;
  data: Payload[];
}

export interface CareDatabaseTallPayload {
  topic: string;
  data: TallPayload[];
}
