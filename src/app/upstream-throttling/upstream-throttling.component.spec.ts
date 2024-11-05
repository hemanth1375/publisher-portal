import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamThrottlingComponent } from './upstream-throttling.component';

describe('UpstreamThrottlingComponent', () => {
  let component: UpstreamThrottlingComponent;
  let fixture: ComponentFixture<UpstreamThrottlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpstreamThrottlingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpstreamThrottlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
