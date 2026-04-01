import { Component, signal, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ToDoItem } from '../to-do-item/to-do-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Button } from '../button/button';
import { Tooltip } from '../../directive/tooltip';

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoItem, MatInputModule, MatProgressSpinnerModule, Button, Tooltip],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit {
  tasks = signal([
    { id: 1, text: 'Wake up', description: 'Wake up at 7:00' },
    { id: 2, text: 'Wash up', description: 'Take a shower' },
    { id: 3, text: 'Breakfast', description: 'Eat breakfast' },
  ]);

  newTaskText = signal('');
  newTaskDescription = signal('');
  isLoading = signal<boolean>(true);
  selectedItemId = signal<number | null>(null);

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  deleteTask(id: number) {
      this.tasks.update(currentTasks => 
        currentTasks.filter(task => task.id !== id),
      );
    }

 addTask() {
    const text = this.newTaskText().trim();
    if (!text) {
      return;
    }

    const maxId = Math.max(0, ...this.tasks().map(task => task.id));
  
    this.tasks.update(currentTasks => [
      ...currentTasks,
      { 
        id: maxId + 1, 
        text: text, 
        description: this.newTaskDescription().trim()
      },
    ]);
  
    this.newTaskText.set('');
    this.newTaskDescription.set('');
  }

  selectTask(id: number) {
    this.selectedItemId.set(id);
  }
}
