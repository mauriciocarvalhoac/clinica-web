import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoListagem } from './medico-listagem';

describe('MedicoListagem', () => {
  let component: MedicoListagem;
  let fixture: ComponentFixture<MedicoListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicoListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
