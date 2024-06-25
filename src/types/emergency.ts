import { intensiceDetailrofile } from './member';

export interface emergencyRequest {
  info: string;
  elderId: number;
}
export interface emergencyRecieve {
  id: number;
  info: string;
  elder: intensiceDetailrofile;
}
