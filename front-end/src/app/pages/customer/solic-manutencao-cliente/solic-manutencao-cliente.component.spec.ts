import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicManutencaoClienteComponent } from './solic-manutencao-cliente.component';

describe('SolicManutencaoClienteComponent', () => {
  let component: SolicManutencaoClienteComponent;
  let fixture: ComponentFixture<SolicManutencaoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicManutencaoClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicManutencaoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
