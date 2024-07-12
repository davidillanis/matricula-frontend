import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfesorComponent } from './admin-profesor.component';

describe('AdminProfesorComponent', () => {
  let component: AdminProfesorComponent;
  let fixture: ComponentFixture<AdminProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
