import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JapanFoodComponent } from './japan-food.component';

describe('JapanFoodComponent', () => {
  let component: JapanFoodComponent;
  let fixture: ComponentFixture<JapanFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JapanFoodComponent]
    });
    fixture = TestBed.createComponent(JapanFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
