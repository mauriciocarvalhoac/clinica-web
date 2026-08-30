import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoListagem } from './acesso-listagem';

describe('AcessoListagem', () => {
  let component: AcessoListagem;
  let fixture: ComponentFixture<AcessoListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(AcessoListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
