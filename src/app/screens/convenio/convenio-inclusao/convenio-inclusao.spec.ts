import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenioInclusao } from './convenio-inclusao';

describe('ConvenioInclusao', () => {
  let component: ConvenioInclusao;
  let fixture: ComponentFixture<ConvenioInclusao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvenioInclusao],
    }).compileComponents();

    fixture = TestBed.createComponent(ConvenioInclusao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
