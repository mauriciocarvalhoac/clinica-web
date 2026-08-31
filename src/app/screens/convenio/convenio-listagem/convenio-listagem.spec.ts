import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenioListagem } from './convenio-listagem';

describe('ConvenioListagem', () => {
  let component: ConvenioListagem;
  let fixture: ComponentFixture<ConvenioListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvenioListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(ConvenioListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
