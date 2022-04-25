import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRecipesComponent } from './feature/recipes/home-recipes/home-recipes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeRecipesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
