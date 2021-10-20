import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionArtComponent } from './commission-art.component';

describe('CommissionArtComponent', () => {
  let component: CommissionArtComponent;
  let fixture: ComponentFixture<CommissionArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionArtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
