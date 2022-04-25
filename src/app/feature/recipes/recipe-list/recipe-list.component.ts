import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/core/recipe.service';
import { IRecipe } from '../../../core/interfaces';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, AfterViewInit {

  recipeList!: IRecipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.loadRecipeList().subscribe(recipeList => {
      this.recipeList = recipeList;
    });
  }

  ngAfterViewInit(): void {
    console.log('View was initialized');
  }

}
