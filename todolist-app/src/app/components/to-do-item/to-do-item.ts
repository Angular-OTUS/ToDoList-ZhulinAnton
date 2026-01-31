import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-to-do-item',
  imports: [],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
})
export class ToDoItem {
  @Input() taskText: string = '';    
  @Input() taskId: number = 0;    
  
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.taskId);
  }
}
