import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetuarManutencaoComponent } from './efetuar-manutencao.component';

describe('EfetuarManutencaoComponent', () => {
  let component: EfetuarManutencaoComponent;
  let fixture: ComponentFixture<EfetuarManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfetuarManutencaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfetuarManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
