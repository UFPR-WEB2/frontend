import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioCategoriasComponent } from './relatorio-categorias.component';

describe('RelatorioCategoriasComponent', () => {
  let component: RelatorioCategoriasComponent;
  let fixture: ComponentFixture<RelatorioCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
