import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaListagem } from './agenda-listagem';

describe('AgendaListagem', () => {
  let component: AgendaListagem;
  let fixture: ComponentFixture<AgendaListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
