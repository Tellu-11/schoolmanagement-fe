export interface User {
  id: number;
  nip: string;
  name: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdBy: UserCreateUpdateBy;
  updatedBy: UserCreateUpdateBy;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: number;
  name: string
}

export interface UserCreateUpdateBy {
    id: number,
    name: string
}