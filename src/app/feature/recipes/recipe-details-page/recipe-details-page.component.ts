import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details-page.component.html',
  styleUrls: ['./recipe-details-page.component.css']
})
export class RecipeDetailsPageComponent implements OnInit {

  recipe!: IRecipe;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    
    
    this.recipeService.loadRecipeById(recipeId).subscribe({
      next: recipe => {
        this.recipe = recipe;
      },
      complete: () => {},
      error: (err) => {
        console.log(err.error.message);
        this.router.navigate(['404']);
      }
    });
  }

}
