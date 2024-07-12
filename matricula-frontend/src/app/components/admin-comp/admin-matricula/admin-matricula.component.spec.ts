import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatriculaComponent } from './admin-matricula.component';

describe('AdminMatriculaComponent', () => {
  let component: AdminMatriculaComponent;
  let fixture: ComponentFixture<AdminMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMatriculaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
