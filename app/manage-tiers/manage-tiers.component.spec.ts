import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTiersComponent } from './manage-tiers.component';

describe('ManageTiersComponent', () => {
  let component: ManageTiersComponent;
  let fixture: ComponentFixture<ManageTiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
