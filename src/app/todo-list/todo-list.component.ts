import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';

import { TodoComponent } from './todo/todo.component';
import { TodoService } from '../core/services/todo.service';
import { TestService } from '../core/services/test.service';
import { Subscription } from 'rxjs';

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

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.sub = this.todoService.todoChanged.subscribe({
      next: (todosArray) => (this.todos = todosArray),
    });
  }

  addTodo(todo: string): void {
    if (todo.length <= 3) {
      this.errorMessage = 'Zadanie powinno mieć conajmniej 4 znaki';
      return;
    }
    this.todoService.addTodo(todo);
  }

  changeTodoStatus(index: number) {
    this.todoService.changeTodoStatus(index);
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  deleteTodoItem(todoIndex: number) {
    this.todoService.deleteTodoItem(todoIndex);
  }

  ngOnDestroy(): void {
    if (this.sub !== null) {
      this.sub.unsubscribe();
    }
  }
}
