import { TestBed } from '@angular/core/testing';

import { CrudCategoriaService } from './crud-categoria.service';

describe('CrudCategoriaService', () => {
  let service: CrudCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
