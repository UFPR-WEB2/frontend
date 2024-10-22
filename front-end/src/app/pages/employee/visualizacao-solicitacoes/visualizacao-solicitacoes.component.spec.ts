import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoSolicitacoesComponent } from './visualizacao-solicitacoes.component';

describe('VisualizacaoSolicitacoesComponent', () => {
  let component: VisualizacaoSolicitacoesComponent;
  let fixture: ComponentFixture<VisualizacaoSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacaoSolicitacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizacaoSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
