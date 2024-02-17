import { Injectable } from '@angular/core';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos: Todo[] = JSON.parse(localStorage.getItem('todos')!) ?? [];

  constructor() {}

  public get todos() {
    return this._todos.slice();
  }

  log() {
    console.log('Im injected');
  }

  addTodo(name: string): void {
    let newTodo: Todo = { name, isCompleted: false };
    this._todos.push(newTodo);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodoItem(todoIndex: number) {
    this._todos = this.todos.filter((todo, index) => index !== todoIndex);
    this.saveToLocalStorage();
  }

  changeTodoStatus(index: number) {
    this._todos[index] = {
      ...this.todos[index],
      isCompleted: !this.todos[index].isCompleted,
    };
    this.saveToLocalStorage();
  }
}
