import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToDoList } from './components/to-do-list/to-do-list';

@Component({
  selector: 'app-root',
  imports: [ToDoList],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = 'ToDo List';
}
