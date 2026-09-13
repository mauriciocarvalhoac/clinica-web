import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosAuxiliares } from './cadastros-auxiliares';

describe('CadastrosAuxiliares', () => {
  let component: CadastrosAuxiliares;
  let fixture: ComponentFixture<CadastrosAuxiliares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrosAuxiliares],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrosAuxiliares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
