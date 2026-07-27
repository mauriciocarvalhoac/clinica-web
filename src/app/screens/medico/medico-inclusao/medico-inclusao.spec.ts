import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoInclusao } from './medico-inclusao';

describe('MedicoInclusao', () => {
  let component: MedicoInclusao;
  let fixture: ComponentFixture<MedicoInclusao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicoInclusao],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoInclusao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
