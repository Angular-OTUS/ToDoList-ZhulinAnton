import { Component, OnInit, signal, computed, effect, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoexApiService } from '../../services/moex-api';
import { Security } from '../../models/security';

@Component({
  selector: 'app-trading-panel',
  imports: [FormsModule],
  templateUrl: './trading-panel.html',
  styleUrls: ['./trading-panel.css']
})
export class TradingPanelComponent implements OnInit, OnDestroy {
  // State signals
  searchQuery = signal<string>('SBER');
  security = signal<Security | null>(null);
  loading = signal<boolean>(false);
  quantity = signal<number>(1);
  error = signal<string | null>(null);
  refreshInterval = signal<number>(5000);
  isAutoRefreshEnabled = signal<boolean>(true);

  // Computed values
  totalBuyPrice = computed(() => {
    const sec = this.security();
    const qty = this.quantity();
    if (!sec || !sec.LAST) return '0.00';
    return (sec.LAST * qty).toFixed(2);
  });

  totalSellPrice = computed(() => {
    const sec = this.security();
    const qty = this.quantity();
    if (!sec || !sec.LAST) return '0.00';
    return (sec.LAST * qty).toFixed(2);
  });

  isPricePositive = computed(() => {
    const sec = this.security();
    if (!sec || !sec.LAST || !sec.PREVPRICE) return false;
    return sec.LAST > sec.PREVPRICE;
  });

  isPriceNegative = computed(() => {
    const sec = this.security();
    if (!sec || !sec.LAST || !sec.PREVPRICE) return false;
    return sec.LAST < sec.PREVPRICE;
  });

  private autoRefreshInterval: any;

  constructor(private moexApi: MoexApiService) {
    effect(() => {
      const sec = this.security();
      if (sec && sec.LAST) {
        console.log('Цена обновлена:', sec.LAST, 'руб.');
      }
    });
  }

  ngOnInit(): void {
    this.searchSecurity();
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.stopAutoRefresh();
  }

  // Public methods
  manualSearch(): void {
    this.stopAutoRefresh();
    this.security.set(null);
    this.searchSecurity();
    this.startAutoRefresh();
  }

  searchSecurity(): void {
    const query = this.searchQuery();
    if (!query.trim()) {
      this.error.set('Введите тикер');
      return;
    }

    const isInitialLoad = !this.security();
    this.loading.set(true);
    this.error.set(null);

    this.moexApi.getSecurityPrice(query.toUpperCase()).subscribe({
      next: (data: any) => {
        console.log('Данные с биржи:', data);
        
        if (!data.securities || !data.marketdata) {
          this.error.set('Неверный формат данных');
          this.loading.set(false);
          return;
        }

        const securitiesData = data.securities.data;
        const marketData = data.marketdata.data;
        
        if (securitiesData?.length > 0 && marketData?.length > 0) {
          const mappedSecurity = this.mapToSecurity(
            securitiesData[0], 
            data.securities.columns,
            marketData[0],
            data.marketdata.columns
          );
          
          this.security.set(mappedSecurity);
        } else {
          if (isInitialLoad) {
            this.error.set('Бумага не найдена');
            this.security.set(null);
          }
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Ошибка получения данных:', err);
        if (isInitialLoad) {
          this.error.set('Ошибка загрузки данных');
        }
        this.loading.set(false);
      }
    });
  }

  updateQuantity(value: number): void {
    if (value > 0) {
      this.quantity.set(value);
    }
  }

  buy(): void {
    const sec = this.security();
    if (!sec) return;
    
    const qty = this.quantity();
    const total = this.totalBuyPrice();
    
    console.log('Покупка:', {
      ticker: sec.SECID,
      quantity: qty,
      price: sec.LAST,
      total: total
    });

    alert(`✅ Покупка\n\n${qty} шт. ${sec.SECID}\nЦена: ${this.formatPrice(sec.LAST)} ₽\nИтого: ${total} ₽`);
  }

  sell(): void {
    const sec = this.security();
    if (!sec) return;
    
    const qty = this.quantity();
    const total = this.totalSellPrice();
    
    console.log('Продажа:', {
      ticker: sec.SECID,
      quantity: qty,
      price: sec.LAST,
      total: total
    });

    alert(`❌ Продажа\n\n${qty} шт. ${sec.SECID}\nЦена: ${this.formatPrice(sec.LAST)} ₽\nИтого: ${total} ₽`);
  }

  toggleAutoRefresh(): void {
    const enabled = this.isAutoRefreshEnabled();
    this.isAutoRefreshEnabled.set(!enabled);
    
    if (!enabled) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }

  // Formatting helpers
  formatPrice(price: number | undefined): string {
    if (price === undefined || price === null) return 'N/A';
    return price.toFixed(2);
  }

  formatNumber(num: number | undefined): string {
    if (num === undefined || num === null) return 'N/A';
    return num.toLocaleString('ru-RU');
  }

  formatPercentChange(): string {
    const sec = this.security();
    if (!sec || !sec.LAST || !sec.PREVPRICE) return 'N/A';
    
    const change = ((sec.LAST - sec.PREVPRICE) / sec.PREVPRICE) * 100;
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  }

  // Private methods
  private mapToSecurity(
    securitiesData: any[], 
    securitiesColumns: string[],
    marketData: any[],
    marketColumns: string[]
  ): Security {
    const obj: any = {};
    
    securitiesColumns.forEach((col, index) => {
      obj[col] = securitiesData[index];
    });
    
    marketColumns.forEach((col, index) => {
      obj[col] = marketData[index];
    });
    
    if (obj.LAST && obj.PREVPRICE) {
      obj.LASTTOPREVPRICE = ((obj.LAST - obj.PREVPRICE) / obj.PREVPRICE) * 100;
    }
    
    return obj as Security;
  }

  private startAutoRefresh(): void {
    this.stopAutoRefresh();
    
    this.autoRefreshInterval = setInterval(() => {
      if (this.security() && !this.loading() && this.isAutoRefreshEnabled()) {
        this.searchSecurity();
      }
    }, this.refreshInterval());
  }

  private stopAutoRefresh(): void {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
      this.autoRefreshInterval = null;
    }
  }
}