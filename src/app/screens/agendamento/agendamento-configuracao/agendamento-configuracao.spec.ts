import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoConfiguracao } from './agendamento-configuracao';

describe('AgendamentoConfiguracao', () => {
  let component: AgendamentoConfiguracao;
  let fixture: ComponentFixture<AgendamentoConfiguracao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendamentoConfiguracao],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentoConfiguracao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
