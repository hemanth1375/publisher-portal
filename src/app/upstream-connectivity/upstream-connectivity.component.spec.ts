import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamConnectivityComponent } from './upstream-connectivity.component';

describe('UpstreamConnectivityComponent', () => {
  let component: UpstreamConnectivityComponent;
  let fixture: ComponentFixture<UpstreamConnectivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpstreamConnectivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpstreamConnectivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
