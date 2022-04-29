import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from 'src/app/core/recipe.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { ILike } from 'src/app/core/interfaces/like';
import { IComment } from 'src/app/core/interfaces/comment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details-page.component.html',
  styleUrls: ['./recipe-details-page.component.css']
})
export class RecipeDetailsPageComponent implements OnInit {

  recipe!: IRecipe;
  likes!: string[];
  likesInfo!: ILike[];
  comments!: IComment[];
  public isAuthor: boolean = false;
  public isLogged: boolean = false;
  public hasLiked: boolean = false;

  public commentError: string = ''

  commentFormGroup: FormGroup = this.formBuilder.group({
    text: new FormControl('', [Validators.required])
  });


  constructor(
    private activatedRoute: ActivatedRoute, 
    private recipeService: RecipeService, 
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    
    this.isLogged = this.userService.isLogged;

    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    
    this.recipeService.loadRecipeById(recipeId).subscribe({
      next: recipe => {
        this.recipe = recipe;
        this.isAuthor = recipe._ownerId === localStorage.getItem('id');
      },
      complete: () => {},
      error: (err) => {
        console.log(err.error.message);
        this.router.navigate(['404']);
      }
    });

    this.recipeService.getLikes(recipeId).subscribe({
      next: likes => {
        this.likes = likes.map(x=>x._ownerId);
        this.likesInfo = likes;
        if(this.likes.includes(localStorage.getItem('id') || 'something')) {
          this.hasLiked = true;
        }
      },
      complete: () => {},
      error: (err) => {
        if(err.error.message==='Resource not found') {
          this.likes = [];
        }
      }
    });

    this.recipeService.getComments(recipeId).subscribe({
      next: comments => {
        this.comments = comments;
      },
      complete: () => {},
      error: (err) => {
        if(err.error.message==='Resource not found') {
          this.comments = [];
        }
      }
    });
  }

  handleLike(): void {
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    
    this.recipeService.likeRecipe$(recipeId).subscribe({
      next: user => {
        const _ownerId = localStorage.getItem('id') || '';
        this.likes.push(_ownerId);
        this.likesInfo.push(user);
        this.hasLiked = true;
      },
      complete: () => {},
      error: (err) => {
        console.log('ne stana');
      }
    });
  }

  handleComment(): void {
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    const ownerName = localStorage.getItem('name');

    const commentData = {
      text: this.commentFormGroup.value.text,
      recipeId: recipeId,
      ownerName: ownerName,
    }

    this.commentError = '';
    this.recipeService.postComment$(commentData).subscribe({
      next: comment => {
        this.comments.push(comment);
        this.commentFormGroup.reset();
      },
      complete: () => {},
      error: (err) => {
        this.commentError = err.error.message;
      }
    });
  }

  handleDislike(): void {
    const likeId = this.likesInfo.find(x=>x._ownerId==localStorage.getItem('id'))?._id;

    this.recipeService.dislikeRecipe(likeId || '').subscribe({
      next: user => {
        this.likes = this.likes.filter(x=>x!=localStorage.getItem('id'));
        this.likesInfo = this.likesInfo.filter(x=>x._ownerId!=localStorage.getItem('id'));
        this.hasLiked = false;
      },
      complete: () => {},
      error: (err) => {
        console.log('ne stana');
      }
    });
  }


  handleDelete(): void {
    if(confirm("Are you sure to delete this recipe?")) {
      this.recipeService.deleteRecipe$(this.recipe._id).subscribe({
        next: user => {
          this.router.navigate(['recipes']);
        },
        complete: () => {},
        error: (err) => {
          console.log('ne stana');
        }
      });
    }
  }

}
