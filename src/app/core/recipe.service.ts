import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { IRecipe } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl + '/data';

@Injectable(
  { providedIn: 'root' }
)
export class RecipeService {

  constructor(private http: HttpClient) { }

  loadRecipeList(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(`${apiUrl}/recipes?sortBy=_createdOn%20desc`);
  }

  loadRecipeById(id: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${apiUrl}/recipes/${id}`);
  }

  addRecipe$(recipeData: any): Observable<IRecipe> {
    return this.http
      .post<IRecipe>(`${apiUrl}/recipes`, JSON.stringify(recipeData), { headers: 
        {'Content-Type':'application/json',['X-Authorization']: localStorage.getItem('accessToken') || ''}, observe: 'response' })
      .pipe(
        tap(response => {}),
        map(response => response.body as any),
        tap(user => {})
      )
  }

}
