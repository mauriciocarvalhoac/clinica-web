import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioInclusao } from './funcionario-inclusao';

describe('FuncionarioInclusao', () => {
  let component: FuncionarioInclusao;
  let fixture: ComponentFixture<FuncionarioInclusao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioInclusao],
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionarioInclusao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
