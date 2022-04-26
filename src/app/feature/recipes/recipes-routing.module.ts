import { RouterModule, Routes } from "@angular/router";
import { AllRecipesPageComponent } from "./all-recipes-page/all-recipes-page.component";
import { HomeRecipesComponent } from "./home-recipes/home-recipes.component";
import { RecipeDetailsPageComponent } from "./recipe-details-page/recipe-details-page.component";

const routes: Routes = [
    {
        path: 'recipes',
        component: AllRecipesPageComponent,
    },
    {
        path: 'recipe/:recipeId',
        component: RecipeDetailsPageComponent,
    },

];

export const RecipesRoutingModule = RouterModule.forChild(routes);