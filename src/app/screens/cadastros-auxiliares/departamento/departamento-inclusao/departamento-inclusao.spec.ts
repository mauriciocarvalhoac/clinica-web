import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoInclusao } from './departamento-inclusao';

describe('DepartamentoInclusao', () => {
  let component: DepartamentoInclusao;
  let fixture: ComponentFixture<DepartamentoInclusao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentoInclusao],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartamentoInclusao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
