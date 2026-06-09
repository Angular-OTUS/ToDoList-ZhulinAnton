import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPanel } from './trading-panel';

describe('TradingPanel', () => {
  let component: TradingPanel;
  let fixture: ComponentFixture<TradingPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
