import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendsUpstreamComponent } from './backends-upstream.component';

describe('BackendsUpstreamComponent', () => {
  let component: BackendsUpstreamComponent;
  let fixture: ComponentFixture<BackendsUpstreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackendsUpstreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackendsUpstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
