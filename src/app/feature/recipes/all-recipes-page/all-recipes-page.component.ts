import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-all-recipes-page',
  templateUrl: './all-recipes-page.component.html',
  styleUrls: ['./all-recipes-page.component.css']
})
export class AllRecipesPageComponent implements OnInit {

  recipeList!: IRecipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.loadRecipeList().subscribe(recipeList => {
      this.recipeList = recipeList;
    });
  }

}
