import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todoList: TodoItem[] = [];
  newTask: string = '';

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false,
      };
      this.todoList.push(newTodoItem);
      this.newTask = '';
      this.saveToLocalStorage();
    }
  }

  toggleCompleted(id: number): void {
    const todoItem = this.todoList.find((item) => item.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.saveToLocalStorage();
    }
    console.log('succesfully toggled', this.todoList);
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter((item) => item.id !== id);
    console.log('succesfully deleted', this.todoList);
    this.saveToLocalStorage();
  }

  // Save todoList to localStorage
  saveToLocalStorage(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  // Get todoList from localStorage
  ngOnInit(): void {
    const savedTasks = localStorage.getItem('todoList');
    if (savedTasks) {
      this.todoList = JSON.parse(savedTasks);
    }
  }
}
