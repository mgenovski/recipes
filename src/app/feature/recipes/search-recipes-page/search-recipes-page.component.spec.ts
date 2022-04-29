import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecipesPageComponent } from './search-recipes-page.component';

describe('SearchRecipesPageComponent', () => {
  let component: SearchRecipesPageComponent;
  let fixture: ComponentFixture<SearchRecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRecipesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
