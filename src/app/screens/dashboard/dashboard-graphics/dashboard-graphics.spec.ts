import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGraphics } from './dashboard-graphics';

describe('DashboardGraphics', () => {
  let component: DashboardGraphics;
  let fixture: ComponentFixture<DashboardGraphics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGraphics],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardGraphics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
