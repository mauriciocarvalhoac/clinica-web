import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaInclusao } from './agenda-inclusao';

describe('AgendaInclusao', () => {
  let component: AgendaInclusao;
  let fixture: ComponentFixture<AgendaInclusao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaInclusao],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaInclusao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
