import { IBase } from './base';

export interface IComment extends IBase {
    _ownerId: string;
    recipeId: any;
    text: string;
    ownerName: string;
  }