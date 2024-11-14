import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMonetizationAndGovernanceComponent } from './api-monetization-and-governance.component';

describe('ApiMonetizationAndGovernanceComponent', () => {
  let component: ApiMonetizationAndGovernanceComponent;
  let fixture: ComponentFixture<ApiMonetizationAndGovernanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiMonetizationAndGovernanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiMonetizationAndGovernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
