import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './feature/pages/page-not-found/page-not-found.component';
import { HomeRecipesComponent } from './feature/recipes/home-recipes/home-recipes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeRecipesComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
