import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';

@Component({
  selector: 'app-search-recipes-page',
  templateUrl: './search-recipes-page.component.html',
  styleUrls: ['./search-recipes-page.component.css']
})
export class SearchRecipesPageComponent implements OnInit {

  @ViewChild('search', { static: true }) searchElement: ElementRef;

  recipeList!: IRecipe[];
  searchList!: IRecipe[];

  constructor(private recipeService: RecipeService, searchElement: ElementRef) { 
    this.searchElement = searchElement;
  }

  ngOnInit(): void {
    this.recipeService.loadRecipeList().subscribe(recipeList => {
      this.recipeList = recipeList; 
      this.searchList = recipeList;
    });
  }

  handleSearch() {
    const search = this.searchElement.nativeElement.value;
    this.searchList = [...this.recipeList].filter(x=>x.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
