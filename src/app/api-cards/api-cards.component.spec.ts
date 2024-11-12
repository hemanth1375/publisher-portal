import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCardsComponent } from './api-cards.component';

describe('ApiCardsComponent', () => {
  let component: ApiCardsComponent;
  let fixture: ComponentFixture<ApiCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
