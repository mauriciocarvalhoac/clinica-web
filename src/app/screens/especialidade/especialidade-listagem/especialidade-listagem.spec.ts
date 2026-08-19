import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeListagem } from './especialidade-listagem';

describe('EspecialidadeListagem', () => {
  let component: EspecialidadeListagem;
  let fixture: ComponentFixture<EspecialidadeListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadeListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(EspecialidadeListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
