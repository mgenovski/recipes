import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRecipesComponent } from './home-recipes.component';

describe('HomeRecipesComponent', () => {
  let component: HomeRecipesComponent;
  let fixture: ComponentFixture<HomeRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRecipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
