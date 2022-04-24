import { RouterModule, Routes } from "@angular/router";
import { AllRecipesPageComponent } from "./all-recipes-page/all-recipes-page.component";

const routes: Routes = [
    {
        path: 'all-recipes',
        component: AllRecipesPageComponent
    }
];

export const RecipesRoutingModule = RouterModule.forChild(routes);