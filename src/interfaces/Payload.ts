/* eslint-disable @typescript-eslint/quotes */
export interface Payload {
  type: string;
  source: string;
  local_time: string;
  [key: string]: string | number;
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
