import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamPoliciesComponent } from './upstream-policies.component';

describe('UpstreamPoliciesComponent', () => {
  let component: UpstreamPoliciesComponent;
  let fixture: ComponentFixture<UpstreamPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpstreamPoliciesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpstreamPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
