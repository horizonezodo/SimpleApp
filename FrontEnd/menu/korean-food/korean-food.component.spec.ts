import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoreanFoodComponent } from './korean-food.component';

describe('KoreanFoodComponent', () => {
  let component: KoreanFoodComponent;
  let fixture: ComponentFixture<KoreanFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KoreanFoodComponent]
    });
    fixture = TestBed.createComponent(KoreanFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
