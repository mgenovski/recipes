import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';
import { UserService } from 'src/app/core/user.service';
import { urlValidator } from '../util';

@Component({
  selector: 'app-edit-recipe-page',
  templateUrl: './edit-recipe-page.component.html',
  styleUrls: ['./edit-recipe-page.component.css']
})
export class EditRecipePageComponent implements OnInit {

  recipe!: IRecipe;
  public isAuthor: boolean = false;
  public isLogged: boolean = false;

  @ViewChild('ingredient', { static: true }) ingredientElement: ElementRef;
  @ViewChild('step', { static: true }) stepElement: ElementRef;
  @ViewChild('time', { static: true }) timeElement: ElementRef;
  @ViewChild('servings', { static: true }) servingsElement: ElementRef;
  @ViewChild('difficulty', { static: true }) difficultyElement: ElementRef;

  public ingredient!: string;
  public ingredients!: Array<string>;
  public step!: string;
  public steps!: Array<string>;
  public ingredientError: string = '';
  public stepError: string = '';

  public addRecipeError: string = ''

  createFormGroup: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    imgUrl: new FormControl(null, [Validators.required, urlValidator]),
    ingredient: new FormControl(null, []),
    step: new FormControl(null, [])
  });

  constructor(
    ingredientElement: ElementRef, 
    stepElement: ElementRef,
    timeElement: ElementRef,
    servingsElement: ElementRef,
    difficultyElement: ElementRef,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private recipeService: RecipeService, 
    private userService: UserService,
    private router: Router) {
      this.ingredientElement = ingredientElement;
      this.ingredients = [];
      this.stepElement = stepElement;
      this.steps = [];
      this.timeElement = timeElement;
      this.servingsElement = servingsElement;
      this.difficultyElement = difficultyElement;
     }

  ngOnInit(): void {

    this.isLogged = this.userService.isLogged;

    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    
    this.recipeService.loadRecipeById(recipeId).subscribe({
      next: recipe => {
        this.recipe = recipe;
        this.isAuthor = recipe._ownerId === localStorage.getItem('id');
        if(!this.isAuthor || !this.isLogged) {
          this.router.navigate(['404']);
        }

        this.createFormGroup.setValue({
          title : recipe.title,
          description: recipe.description,
          imgUrl: recipe.imgUrl,
          ingredient: '',
          step: '' 
        });

        this.ingredients = recipe.ingredients;
        this.steps = recipe.steps;
        this.timeElement.nativeElement.value = recipe.time;
        this.servingsElement.nativeElement.value = recipe.servings;
        this.difficultyElement.nativeElement.value = recipe.difficulty;
      },
      complete: () => {},
      error: (err) => {
        console.log(err.error.message);
        this.router.navigate(['404']);
      }
    });

  }


  addIngredient() {
    this.ingredientError = '';
    this.ingredient = this.ingredientElement.nativeElement.value.trim();
    if(this.ingredient.length < 5 ) {
      this.ingredientError = 'Ingredient must be at least 5 characters long.';
    } else {
      this.ingredients.push(this.ingredient);
      this.ingredientElement.nativeElement.value = '';
    }
  }

  addStep() {
    this.stepError = '';
    this.step = this.stepElement.nativeElement.value.trim();
    if(this.step.length < 5 ) {
      this.stepError = 'A step must be at least 5 characters long.';
    } else {
      this.steps.push(this.step);
      this.stepElement.nativeElement.value = '';
    }
  }

  delStep(step: string) {
    if(confirm("Are you sure to delete this step?")) {
      this.steps.splice(this.steps.indexOf(step), 1);
    }
  }

  delIngredient(ingredient: string) {
    if(confirm("Are you sure to delete "+ingredient)) {
      this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    }
  }

  handleCreate(): void {
    this.addRecipeError = '';

    const recipeData = {
      title: this.createFormGroup.value.title,
      description: this.createFormGroup.value.description,
      imgUrl: this.createFormGroup.value.imgUrl,
      time: this.timeElement.nativeElement.value,
      servings: this.servingsElement.nativeElement.value,
      difficulty: this.difficultyElement.nativeElement.value,
      ingredients: this.ingredients,
      steps: this.steps,
      ownerName: localStorage.getItem('name'),
      _ownerId: this.recipe._ownerId,
      _id: this.recipe._id,
      _createdOn: this.recipe._createdOn
    }

    this.recipeService.editRecipe$(recipeData).subscribe({
      next: user => {
        this.router.navigate(['']);
      },
      complete: () => {},
      error: (err) => {
        this.addRecipeError = err.error.message;
      }
    });
  }

}
