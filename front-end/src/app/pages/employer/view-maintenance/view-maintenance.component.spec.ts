import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintenanceComponent } from './view-maintenance.component';

describe('ViewMaintenanceComponent', () => {
  let component: ViewMaintenanceComponent;
  let fixture: ComponentFixture<ViewMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
