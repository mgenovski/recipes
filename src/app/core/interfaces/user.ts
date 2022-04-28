import { IBase } from './base';

export interface IUser extends IBase {
  recipes: string[];
  email: string;
  name: string;
  password: string;
  accessToken: string;
  favorites: string[];
}