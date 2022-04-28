import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/core/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css']
})
export class AddRecipePageComponent implements OnInit {

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
    imgUrl: new FormControl(null, [Validators.required]),
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
    private recipeService: RecipeService,
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
    this.steps.splice(this.steps.indexOf(step), 1);
  }

  delIngredient(ingredient: string) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
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
      ownerName: localStorage.getItem('name')
    }

    this.recipeService.addRecipe$(recipeData).subscribe({
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
