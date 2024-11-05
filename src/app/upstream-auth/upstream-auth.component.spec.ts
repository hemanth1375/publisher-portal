import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamAuthComponent } from './upstream-auth.component';

describe('UpstreamAuthComponent', () => {
  let component: UpstreamAuthComponent;
  let fixture: ComponentFixture<UpstreamAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpstreamAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpstreamAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
