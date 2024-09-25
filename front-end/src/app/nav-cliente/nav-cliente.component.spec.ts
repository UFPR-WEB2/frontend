import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavClienteComponent } from './nav-cliente.component';

describe('NavClienteComponent', () => {
  let component: NavClienteComponent;
  let fixture: ComponentFixture<NavClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
