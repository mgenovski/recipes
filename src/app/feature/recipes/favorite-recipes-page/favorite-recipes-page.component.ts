import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';
import { ILike } from 'src/app/core/interfaces/like';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-favorite-recipes-page',
  templateUrl: './favorite-recipes-page.component.html',
  styleUrls: ['./favorite-recipes-page.component.css']
})
export class FavoriteRecipesPageComponent implements OnInit {

  favoriteList!: ILike[];
  recipeList: IRecipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getFavorites().subscribe(favoriteList => {
      this.favoriteList = favoriteList.filter(x=>x._ownerId==localStorage.getItem('id'));
      for(let favorite of this.favoriteList) {
        this.recipeService.loadRecipeById(favorite.recipeId).subscribe(recipe => {
          this.recipeList.push(recipe);
        });
      }
    });
    
  }

}
