import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectivityOptionsComponent } from './connectivity-options.component';

describe('ConnectivityOptionsComponent', () => {
  let component: ConnectivityOptionsComponent;
  let fixture: ComponentFixture<ConnectivityOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectivityOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectivityOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
