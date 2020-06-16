export interface UserDetails {
  name: string;
  mobileNumber: string;
  businessName: string;
  createdAt?: Date;
  lastOpened?: Date;
}

export interface SignupStruct {
  user: UserDetails;
}

export interface ControllerResponse {
  code: number;
  error: boolean;
  message: string;
  payload: any;
}

interface __SearchStruct {
  mobileNumber?: string;
  businessName?: string;
}

export interface SearchStruct {
  user: __SearchStruct;
}

interface __UpdateStruct {
  name: string;
  mobileNumber: string;
  businessName: string;
}

export interface UpdateStruct {
  user: __UpdateStruct;
}
