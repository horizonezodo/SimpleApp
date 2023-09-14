import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFoodComponent } from './home-food.component';

describe('HomeFoodComponent', () => {
  let component: HomeFoodComponent;
  let fixture: ComponentFixture<HomeFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFoodComponent]
    });
    fixture = TestBed.createComponent(HomeFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
