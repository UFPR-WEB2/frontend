import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoClienteComponent } from './orcamento-cliente.component';

describe('OrcamentoClienteComponent', () => {
  let component: OrcamentoClienteComponent;
  let fixture: ComponentFixture<OrcamentoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcamentoClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
