import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { IRecipe } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILike } from './interfaces/like';
import { IComment } from './interfaces/comment';

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

  loadMyRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(`${apiUrl}/recipes?where=_ownerId%3D%22${localStorage.getItem('id')}%22&sortBy=_createdOn%20desc`);
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

  editRecipe$(recipeData: any): Observable<IRecipe> {
    return this.http
      .put<IRecipe>(`${apiUrl}/recipes/${recipeData._id}`, JSON.stringify(recipeData), { headers: 
        {'Content-Type':'application/json',['X-Authorization']: localStorage.getItem('accessToken') || ''}, observe: 'response' })
      .pipe(
        map(response => response.body as any)
      )
  }

  deleteRecipe$(recipeId: string): Observable<IRecipe> {
    return this.http
      .delete<IRecipe>(`${apiUrl}/recipes/${recipeId}`, { headers: 
        {'Content-Type':'application/json',['X-Authorization']: localStorage.getItem('accessToken') || ''}, observe: 'response' })
      .pipe(
        tap(response => {}),
        map(response => response.body as any),
        tap(user => {})
      )
  }

  likeRecipe$(recipeId: string) {
    return this.http
    .post<ILike>(`${apiUrl}/likes`, JSON.stringify({recipeId}), { headers: 
      {'Content-Type':'application/json',['X-Authorization']: localStorage.getItem('accessToken') || ''}, observe: 'response' })
    .pipe(
      tap(response => {}),
      map(response => response.body as any),
      tap(user => {})
    )
  }

  getLikes(recipeId: string): Observable<ILike[]> {
    return this.http.get<ILike[]>(`${apiUrl}/likes?where=recipeId%3D%22${recipeId}%22`);
  }

  getFavorites(): Observable<ILike[]> {
    return this.http.get<ILike[]>(`${apiUrl}/likes?where=_ownerId%3D%22${localStorage.getItem('id')}%22&sortBy=_createdOn%20desc`);
  }

  dislikeRecipe(likeId: string) {
    return this.http
    .delete(`${apiUrl}/likes/${likeId}`, { headers: 
      {'Content-Type':'application/json',['X-Authorization']: localStorage.getItem('accessToken') || ''}, observe: 'response' })
    .pipe(
      tap(response => {}),
      map(response => response.body as any),
      tap(user => {})
    )
  }

  getComments(recipeId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${apiUrl}/comments?where=recipeId%3D%22${recipeId}%22`);
  }

  postComment$(commentData: any) {
    return this.http
    .post<ILike>(`${apiUrl}/comments`, JSON.stringify(commentData), { headers: 
      {'Content-Type':'application/json',['X-Authorization']: localStorage.getItem('accessToken') || ''}, observe: 'response' })
    .pipe(
      tap(response => {}),
      map(response => response.body as any),
      tap(user => {})
    )
  }

}
