import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRecipesPageComponent } from './all-recipes-page/all-recipes-page.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeListItemComponent } from './recipe-list-item/recipe-list-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HomeRecipesComponent } from './home-recipes/home-recipes.component';



@NgModule({
  declarations: [
    AllRecipesPageComponent,
    RecipeListItemComponent,
    RecipeListComponent,
    HomeRecipesComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
