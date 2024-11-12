import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamResponseManipulationComponent } from './upstream-response-manipulation.component';

describe('UpstreamResponseManipulationComponent', () => {
  let component: UpstreamResponseManipulationComponent;
  let fixture: ComponentFixture<UpstreamResponseManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpstreamResponseManipulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpstreamResponseManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
