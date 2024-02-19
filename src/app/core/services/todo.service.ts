import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // private _todos: Todo[] = JSON.parse(localStorage.getItem('todos')!) ?? [];
  private _todos: Todo[] = [];

  todoChanged = new Subject<Todo[]>();

  constructor() {}

  public get todos() {
    return this._todos.slice();
  }

  public set setTodos(arrTodos: Todo[]) {
    this._todos = [...arrTodos];
    this.todoChanged.next(this.todos);
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todoChanged.next(this.todos);
  }

  addTodo(todo: Todo): void {
    this._todos.push(todo);
    this.saveToLocalStorage();
  }

  deleteTodoItem(id: number) {
    this._todos = this.todos.filter((todo) => todo.id !== id);
    this.saveToLocalStorage();
  }

  changeTodoStatus(id: number, newTodo: Todo) {
    const index = this._todos.findIndex((todo) => todo.id === id);
    this._todos[index] = newTodo;
    this.saveToLocalStorage();
  }
}
