import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFuncionarioComponent } from './crud-funcionario.component';

describe('CrudFuncionarioComponent', () => {
  let component: CrudFuncionarioComponent;
  let fixture: ComponentFixture<CrudFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
