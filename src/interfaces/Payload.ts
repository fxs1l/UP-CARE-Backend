/* eslint-disable @typescript-eslint/quotes */
export default interface Payload {
  type: string;
  source: string;
  latitude: `${number}°${number}'${number}.${number}"${'N' | 'S'}`;
  longitude: `${number}°${number}'${number}.${number}"${'E' | 'W'}`;
  local_time: string;
  [key: string]: string | number;
}
