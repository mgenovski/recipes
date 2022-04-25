import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipe!: IRecipe;

  constructor() { }

  ngOnInit(): void {
    console.log(this.recipe);
  }

}
