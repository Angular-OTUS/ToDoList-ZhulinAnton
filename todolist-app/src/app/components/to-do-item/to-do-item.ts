import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-to-do-item',
  imports: [Button],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoItem {
  taskText = input.required<string>();    
  taskId = input.required<number>();  

  
  delete = output<number>();

}
