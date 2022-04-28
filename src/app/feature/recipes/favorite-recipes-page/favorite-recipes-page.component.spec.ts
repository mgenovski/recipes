import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRecipesPageComponent } from './favorite-recipes-page.component';

describe('FavoriteRecipesPageComponent', () => {
  let component: FavoriteRecipesPageComponent;
  let fixture: ComponentFixture<FavoriteRecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteRecipesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
