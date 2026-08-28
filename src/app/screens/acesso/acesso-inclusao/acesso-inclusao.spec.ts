import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoInclusao } from './acesso-inclusao';

describe('AcessoInclusao', () => {
  let component: AcessoInclusao;
  let fixture: ComponentFixture<AcessoInclusao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoInclusao],
    }).compileComponents();

    fixture = TestBed.createComponent(AcessoInclusao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
