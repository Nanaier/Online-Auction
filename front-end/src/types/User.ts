export interface User {
  id: number;
  username: string;
  name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  //date_joined: string;
  phone_number: string;
  balance: number;
}
export interface UserReducer {
  users: User[];
  currentUser: User | undefined;
}

export interface UserLoginCredential {
  email: string;
  password: string;
}
