import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoListagem } from './departamento-listagem';

describe('DepartamentoListagem', () => {
  let component: DepartamentoListagem;
  let fixture: ComponentFixture<DepartamentoListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentoListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartamentoListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
