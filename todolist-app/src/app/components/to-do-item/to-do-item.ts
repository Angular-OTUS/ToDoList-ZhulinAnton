import { ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import { Button } from '../button/button';
import { Tooltip } from '../../directive/tooltip';

@Component({
  selector: 'app-to-do-item',
  imports: [Button, Tooltip],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItem {
  taskText = input.required<string>();    
  taskId = input.required<number>();  
  taskDescription = input(''); 
  
  delete = output<number>();
}
