import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewapiPageComponent } from './viewapi-page.component';

describe('ViewapiPageComponent', () => {
  let component: ViewapiPageComponent;
  let fixture: ComponentFixture<ViewapiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewapiPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewapiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
