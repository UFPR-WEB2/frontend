import { TestBed } from '@angular/core/testing';

import { ServicoStorageService } from './servico-storage.service';

describe('ServicoStorageService', () => {
  let service: ServicoStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
