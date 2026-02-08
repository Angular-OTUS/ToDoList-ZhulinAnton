import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoItem {
  taskText = input.required<string>();    
  taskId = input.required<number>();  

  
  delete = output<number>();

  onDelete() {
    this.delete.emit(this.taskId());
  }
}
