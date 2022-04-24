import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRecipesPageComponent } from './all-recipes-page/all-recipes-page.component';
import { RecipesRoutingModule } from './recipes-routing.module';



@NgModule({
  declarations: [
    AllRecipesPageComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
