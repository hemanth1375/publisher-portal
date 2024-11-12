import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewapipageComponent } from './viewapipage.component';

describe('ViewapipageComponent', () => {
  let component: ViewapipageComponent;
  let fixture: ComponentFixture<ViewapipageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewapipageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewapipageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
