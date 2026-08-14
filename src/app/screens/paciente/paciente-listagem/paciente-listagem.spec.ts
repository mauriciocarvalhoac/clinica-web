import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteListagem } from './paciente-listagem';

describe('PacienteListagem', () => {
  let component: PacienteListagem;
  let fixture: ComponentFixture<PacienteListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
