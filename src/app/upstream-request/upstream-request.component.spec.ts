import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamRequestComponent } from './upstream-request.component';

describe('UpstreamRequestComponent', () => {
  let component: UpstreamRequestComponent;
  let fixture: ComponentFixture<UpstreamRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpstreamRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpstreamRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
