export interface elderProfile {
  id: number;
  name: string;
  idNumber: string;
  phone: string;
  gender: string;
  bloodType: string;
  nation: string;
  city: string;
  district: string;
  detailAddress?: string;
  etc?: string;
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
  password: string;
  name: string;
  phone: string;
  position: string;
  birth: string;
  institutionNumber: string;
}

export interface masterProfile {
  id: string;
  password: string;
  name: string;
  institutionNumber: string;
}
