import { Directive, ElementRef, input, OnDestroy} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class Tooltip implements OnDestroy {
  appTooltip = input<string | null>();  
  private div: HTMLDivElement | null = null;

  constructor(private el: ElementRef) {}

  onMouseEnter() {
    const textValue = this.appTooltip(); 
    if (!textValue) return;  
    
    this.div = document.createElement('div');
    this.div.textContent = textValue;
    this.div.style.position = 'absolute';
    this.div.style.background = '#333';
    this.div.style.color = '#fff';
    this.div.style.padding = '4px 8px';
    this.div.style.borderRadius = '4px';
    this.div.style.fontSize = '12px';
    
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.div.style.top = rect.bottom + window.scrollY + 5 + 'px';
    this.div.style.left = rect.left + window.scrollX + 'px';
    
    document.body.appendChild(this.div);
  }

   onMouseLeave() {
    if (this.div) {
      this.div.remove();
      this.div = null;
    }
  }
    ngOnDestroy() {
      if (this.div) {
        this.div.remove();
        this.div = null;
    }
  }
}

