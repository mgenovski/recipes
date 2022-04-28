import { IBase } from './base';

export interface IRecipe<T = string> extends IBase {
    title: string;
    _ownerId: string;
    ownerName: string;
    imgUrl: string;
    description: string;
    servings: string;
    time: string;
    difficulty: string;
    steps: string[];
    ingredients: string[];
  }
  