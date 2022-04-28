import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRecipesPageComponent } from './all-recipes-page/all-recipes-page.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeListItemComponent } from './recipe-list-item/recipe-list-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HomeRecipesComponent } from './home-recipes/home-recipes.component';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlValidatorDirective } from './url-validator.directive';



@NgModule({
  declarations: [
    AllRecipesPageComponent,
    RecipeListItemComponent,
    RecipeListComponent,
    HomeRecipesComponent,
    RecipeDetailsPageComponent,
    AddRecipePageComponent,
    UrlValidatorDirective
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
