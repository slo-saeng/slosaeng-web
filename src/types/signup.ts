export interface hospitalProfile {
  id: string;
  password: string;
  hospitalName: string;
  institutionNumber: string;
}

export interface doctorProfile {
  id: string;
  password: string;
  idNumber: string;
  phone: string;
  affiliatedHospital: string;
  agreement: string;
  agreed: boolean;
}

export interface guardianProfile {
  id: string;
  password: string;
  idNumber: string;
  phone: string;
  agreement: string;
  agreed: boolean;
}
