import { Region } from './nation';

export interface elderProfile {
  id?: number;
  name: string;
  idNumber: string;
  phone: string;
  gender: string;
  bloodType: string;
  nationId: number;
  cityId?: number | null;
  districtId: number;
  detailAddress: string;
  etc?: string;
}

export interface majorElderProfile extends elderProfile {
  id: number;
  info: string;
  grade: string;
}
export interface intensiceCareProfile extends majorElderProfile {
  elder: intensiceDetailrofile;
}
export interface intensiceDetailrofile {
  id: number;
  name: string;
  idNumber: string;
  phone: string;
  gender: string;
  bloodType: string;
  nation: Region;
  city: {
    id: number;
    name: string;
    nation: Region;
  };
  district: {
    id: number;
    name: string;
    nation: Region;
    city: {
      id: number;
      name: string;
      nation: Region;
    };
  };
  detailAddress: string;
  etc: string;
}

export interface helperProfile {
  id: string;
  password: string;
  name: string;
  phone: string;
  idNumber: string;
  elderList?: elderProfile[];
}

export interface doctorProfile {
  id: string;
  password?: string;
  name: string;
  phone: string;
  position: string;
  role?: string;
  birth: string;
  institutionNumber: string;
}

export interface masterProfile {
  id: string;
  password: string;
  name: string;
  institutionNumber: string;
}
