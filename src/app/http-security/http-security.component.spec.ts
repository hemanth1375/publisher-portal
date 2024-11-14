import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpSecurityComponent } from './http-security.component';

describe('HttpSecurityComponent', () => {
  let component: HttpSecurityComponent;
  let fixture: ComponentFixture<HttpSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HttpSecurityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HttpSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
