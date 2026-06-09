import { Component } from '@angular/core';
import { TradingPanelComponent } from './components/trading-panel/trading-panel';

@Component({
  selector: 'app-root',
  imports: [TradingPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'MOEX Trading Client';
}