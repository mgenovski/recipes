import { IBase } from './base';

export interface IRecipe<T = string> extends IBase {
    title: string;
    _owenrId: string;
  }
  