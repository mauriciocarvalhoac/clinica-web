import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoListagem } from './agendamento-listagem';

describe('AgendamentoListagem', () => {
  let component: AgendamentoListagem;
  let fixture: ComponentFixture<AgendamentoListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendamentoListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentoListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
