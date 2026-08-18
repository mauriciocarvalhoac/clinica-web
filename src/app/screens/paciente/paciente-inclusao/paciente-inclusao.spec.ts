import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteInclusao } from './paciente-inclusao';

describe('PacienteInclusao', () => {
  let component: PacienteInclusao;
  let fixture: ComponentFixture<PacienteInclusao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteInclusao],
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteInclusao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
