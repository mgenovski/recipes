import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-my-recipes-page',
  templateUrl: './my-recipes-page.component.html',
  styleUrls: ['./my-recipes-page.component.css']
})
export class MyRecipesPageComponent implements OnInit {

  recipeList!: IRecipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.loadMyRecipes().subscribe(recipeList => {
      this.recipeList = recipeList;
    });
  }

}
