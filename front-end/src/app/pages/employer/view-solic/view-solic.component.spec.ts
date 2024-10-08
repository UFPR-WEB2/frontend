import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSolicComponent } from './view-solic.component';

describe('ViewSolicComponent', () => {
  let component: ViewSolicComponent;
  let fixture: ComponentFixture<ViewSolicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSolicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSolicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
