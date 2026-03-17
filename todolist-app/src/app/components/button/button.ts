import {  Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly title = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly color = input<string>('green');
}
