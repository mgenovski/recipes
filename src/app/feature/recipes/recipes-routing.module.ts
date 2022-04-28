import { RouterModule, Routes } from "@angular/router";
import { AddRecipePageComponent } from "./add-recipe-page/add-recipe-page.component";
import { AllRecipesPageComponent } from "./all-recipes-page/all-recipes-page.component";
import { EditRecipePageComponent } from "./edit-recipe-page/edit-recipe-page.component";
import { FavoriteRecipesPageComponent } from "./favorite-recipes-page/favorite-recipes-page.component";
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
    {
        path: 'add-recipe',
        component: AddRecipePageComponent,
    },
    {
        path: 'edit/:recipeId',
        component: EditRecipePageComponent,
    },
    {
        path: 'favorites',
        component: FavoriteRecipesPageComponent,
    },

];

export const RecipesRoutingModule = RouterModule.forChild(routes);