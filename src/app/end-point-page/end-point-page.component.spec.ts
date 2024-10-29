import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndPointPageComponent } from './end-point-page.component';

describe('EndPointPageComponent', () => {
  let component: EndPointPageComponent;
  let fixture: ComponentFixture<EndPointPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndPointPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndPointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
