import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDefault } from './template-default';

describe('TemplateDefault', () => {
  let component: TemplateDefault;
  let fixture: ComponentFixture<TemplateDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDefault],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDefault);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
