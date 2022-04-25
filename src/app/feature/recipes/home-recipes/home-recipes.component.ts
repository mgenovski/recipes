import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-home-recipes',
  templateUrl: './home-recipes.component.html',
  styleUrls: ['./home-recipes.component.css']
})
export class HomeRecipesComponent implements OnInit {

  lastRecipe!: IRecipe;

  constructor(private recipeService: RecipeService) { 

    console.log()
  }

  ngOnInit(): void {
    this.recipeService.loadRecipeList().subscribe(recipeList => {
      this.lastRecipe = recipeList[0];
    });
  }

}
