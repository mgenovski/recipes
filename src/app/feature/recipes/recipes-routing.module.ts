import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { AddRecipePageComponent } from "./add-recipe-page/add-recipe-page.component";
import { AllRecipesPageComponent } from "./all-recipes-page/all-recipes-page.component";
import { EditRecipePageComponent } from "./edit-recipe-page/edit-recipe-page.component";
import { FavoriteRecipesPageComponent } from "./favorite-recipes-page/favorite-recipes-page.component";
import { HomeRecipesComponent } from "./home-recipes/home-recipes.component";
import { MyRecipesPageComponent } from "./my-recipes-page/my-recipes-page.component";
import { RecipeDetailsPageComponent } from "./recipe-details-page/recipe-details-page.component";
import { SearchRecipesPageComponent } from "./search-recipes-page/search-recipes-page.component";

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
        canActivate: [AuthGuard],
        component: AddRecipePageComponent,
    },
    {
        path: 'edit/:recipeId',
        component: EditRecipePageComponent,
    },
    {
        path: 'favorites',
        canActivate: [AuthGuard],
        component: FavoriteRecipesPageComponent,
    },
    {
        path: 'my-recipes',
        canActivate: [AuthGuard],
        component: MyRecipesPageComponent,
    },
    {
        path: 'search',
        component: SearchRecipesPageComponent,
    },

];

export const RecipesRoutingModule = RouterModule.forChild(routes);