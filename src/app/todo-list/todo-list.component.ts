import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';

import { TodoService } from '../core/services/todo.service';
import { Subscription } from 'rxjs';
import { TodoApiService } from '../core/services/todo-api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = this.todoService.todos;
  errorMessage: string = '';

  @Input() test!: string;

  sub!: Subscription;

  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService
  ) {}

  ngOnInit(): void {
    this.sub = this.todoService.todoChanged.subscribe({
      next: (todosArray) => (this.todos = todosArray),
    });

    if (this.todos.length === 0) {
      this.todoApiService.fetchTodos().subscribe({
        error: (err) =>
          (this.errorMessage =
            'Wystąpił błąd podczas pobierania listy z serwera'),
      });
    }
  }

  addTodo(todo: string): void {
    this.todoApiService.postTodo({ name: todo, isCompleted: false }).subscribe({
      next: (value) => console.log(value),
      error: (err) => (this.errorMessage = 'Wystąpił błąd podczas dodawania'),
    });
  }

  changeTodoStatus(id: number, todo: Todo) {
    this.todoApiService
      .patchTodo(id, { isCompleted: !todo.isCompleted })
      .subscribe({
        next: (value) => console.log(value),
        error: (err) =>
          (this.errorMessage = 'Wystąpił błąd podczas zmiany wartości'),
      });
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  deleteTodoItem(id: number) {
    this.todoApiService.deleteTodo(id).subscribe({
      next: (value) => console.log(value),
      error: (err) => (this.errorMessage = 'Wystąpił błąd podczas usuwania'),
    });
  }

  ngOnDestroy(): void {
    if (this.sub !== null) {
      this.sub.unsubscribe();
    }
  }
}
