import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ToDoItem } from '../to-do-item/to-do-item';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoItem, MatInputModule, MatButtonModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList {
  tasks = [
    { id: 1, text: 'Wake up' },
    { id: 2, text: 'Wash up' },
    { id: 3, text: 'Breakfast' }
  ];

  newTaskText: string = '';

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  addTask() {
    if (this.newTaskText.trim() === '') {
      return;
    }
  
    let maxId = 0;
    for (let task of this.tasks) {
      if (task.id > maxId) {
        maxId = task.id;
      }
    }
  
    const newTask = {
      id: maxId + 1,           
      text: this.newTaskText.trim() 
    };
  
    this.tasks.push(newTask);
  
    this.newTaskText = '';
  }
}
