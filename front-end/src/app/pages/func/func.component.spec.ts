import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FUNCComponent } from './func.component';

describe('FUNCComponent', () => {
  let component: FUNCComponent;
  let fixture: ComponentFixture<FUNCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FUNCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FUNCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
