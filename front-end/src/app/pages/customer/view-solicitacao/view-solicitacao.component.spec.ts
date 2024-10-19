import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSolicitacaoComponent } from './view-solicitacao.component';

describe('ViewSolicitacaoComponent', () => {
  let component: ViewSolicitacaoComponent;
  let fixture: ComponentFixture<ViewSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSolicitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
