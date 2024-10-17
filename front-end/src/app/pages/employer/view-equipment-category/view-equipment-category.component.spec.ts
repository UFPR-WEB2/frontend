import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEquipmentCategoryComponent } from './view-equipment-category.component';

describe('ViewEquipmentCategoryComponent', () => {
  let component: ViewEquipmentCategoryComponent;
  let fixture: ComponentFixture<ViewEquipmentCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEquipmentCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewEquipmentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
