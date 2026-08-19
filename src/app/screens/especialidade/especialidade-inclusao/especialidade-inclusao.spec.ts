import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeInclusao } from './especialidade-inclusao';

describe('EspecialidadeInclusao', () => {
  let component: EspecialidadeInclusao;
  let fixture: ComponentFixture<EspecialidadeInclusao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadeInclusao],
    }).compileComponents();

    fixture = TestBed.createComponent(EspecialidadeInclusao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
